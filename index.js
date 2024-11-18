const express = require("express");
const { resolve } = require("path");
let cors = require("cors");
let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");

const app = express();
const port = 3010;

app.use(express.static("static"));
app.use(cors());
app.use(express.json());
let db;

(async () => {
  try {
    db = await open({
      filename: "./BD4EXCERCISE/database.sqlite",
      driver: sqlite3.Database,
    });
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
})();

// Excercise 1

async function getAllRestaurants() {
  let query = "SELECT * FROM restaurants";

  let response = await db.all(query, []);

  return { restaurants: response };
}

app.get("/restaurants", async (req, res) => {
  try {
    let result = await getAllRestaurants();

    if ((result.restaurants.lenght = h == 0)) {
      return res.status(404).json({ message: "No restaurants found!" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Excercise 2

async function getRestaurantById(id) {
  let query = "SELECT * FROM restaurants WHERE id = ?";
  let response = await db.all(query, [id]);
  return { restaurant: response };
}

app.get("/restaurants/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    let result = await getRestaurantById(id);

    if (!result.restaurant.length) {
      return res
        .status(404)
        .json({ message: `Restaurant with ID ${id} not found!` });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Excercise 3

async function getRestaurantsByCuisine(cuisine) {
  let query = "SELECT * FROM restaurants WHERE cuisine = ?";
  let response = await db.all(query, [cuisine]);
  return { restaurants: response };
}

app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  let cuisine = req.params.cuisine;

  try {
    let result = await getRestaurantsByCuisine(cuisine);

    if (!result.restaurants.length) {
      return res
        .status(404)
        .json({ message: `Restaurants with ${cuisine} Cuisine not found!` });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Excercise 4

async function filterRestaurants(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    "SELECT * FROM restaurants WHERE isVeg = ? AND  hasOutdoorSeating = ? AND isLuxury = ?";
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}

app.get("/restaurants/filter", async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;

  try {
    let result = await filterRestaurants(isVeg, hasOutdoorSeating, isLuxury);

    if (!result.restaurants.length) {
      return res.status(404).json({ message: `Restaurants not found!` });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Excercise 5

async function sortByRating() {
  let query = "Select * from restaurants ORDER BY rating DESC";

  let response = await db.all(query, []);

  return { restaurants: response };
}

app.get("/restaurants/sort-by-rating", async (req, res) => {
  try {
    let result = await sortByRating();

    if (!result.restaurants.length) {
      return res.status(404).json({ message: `Restaurants not found!` });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Excercise 6

async function getAllDishes() {
  let query = "SELECT * FROM dishes";

  let response = await db.all(query, []);

  return { dishes: response };
}

app.get("/dishes", async (req, res) => {
  try {
    let result = await getAllDishes();

    if (result.dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found!" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Excercise 7

async function getDishById(id) {
  let query = "SELECT * FROM dishes WHERE id = ?";
  let response = await db.all(query, [id]);
  return { dish: response };
}

app.get("/dishes/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    let result = await getDishById(id);

    if (!result.dish.length) {
      return res.status(404).json({ message: `Dish with ID ${id} not found!` });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Excercise 8

async function filterDishes(isVeg) {
  let query = "SELECT * FROM dishes WHERE isVeg = ?";
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}

app.get("/dishes/filter", async (req, res) => {
  let isVeg = req.query.isVeg;

  try {
    let result = await filterDishes(isVeg);

    if (!result.dishes.length) {
      return res.status(404).json({ message: `Dishes not found!` });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Excercise 9

async function sortByPrice() {
  let query = "Select * from dishes ORDER BY price";

  let response = await db.all(query, []);

  return { dishes: response };
}

app.get("/dishes/sort-by-price", async (req, res) => {
  try {
    let result = await sortByPrice();

    if (!result.dishes.length) {
      return res.status(404).json({ message: `dishes not found!` });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
