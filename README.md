# 🍽️ Forkify - Recipe Search & Management App

Forkify is a modern recipe application where users can search for recipes, view detailed cooking instructions, bookmark favorites, and even upload their own recipes. Built using **HTML**, **SCSS**, **JavaScript (ES6+)**, and the **MVC architecture**, this app is fully responsive and interactive.

---

## 🚀 Live Demo

https://forkify83.netlify.app/

---



## 🔍 Features

* **Search Recipes**: Type any keyword (e.g. "pasta", "burger") to fetch recipes using the Forkify API.
* **View Recipe Details**: Click any recipe to see full details including ingredients, servings, and time.
* **Update Servings**: Increase/decrease servings and the ingredients will auto-update.
* **Bookmarks**: Save your favorite recipes and revisit them anytime (data saved in localStorage).
* **Upload Your Own Recipe**: Add custom recipes using a form. They’ll be saved and auto-bookmarked.
* **Responsive UI**: Clean, mobile-friendly interface with spinners, error messages, and smooth transitions.

---

## 🧠 How It Works

The app follows a **Model-View-Controller (MVC)** pattern:

```
Search Input ─► Controller ─► Model ─► API Call ─► Update State
                                     │
                               View renders results
```

* **Model**: Handles data fetching, state management, and logic.
* **Views**: Handle UI rendering and user interactions (searchView, recipeView, paginationView, etc).
* **Controller**: Connects views with model logic and manages the app flow.

---

## 🧱 Technologies Used

* JavaScript ES6+ (async/await, modules)
* SCSS for styling
* Parcel for bundling
* Forkify API ([https://forkify-api.herokuapp.com/v2](https://forkify-api.herokuapp.com/v2))
* localStorage for persistent bookmarks

---


---

## ✅ How to Use

1. **Search** for a recipe by typing into the search bar.
2. **Click** on a result to view full recipe details.
3. **Adjust servings** with the + / - buttons.
4. **Bookmark** recipes using the bookmark icon.
5. **Upload** your own recipe using the form (click the '+' icon).

---

## 🛠️ Future Improvements

* Add filters (e.g. vegan, gluten-free)
* Integrate a shopping list feature
* Allow users to edit or delete uploaded recipes
* Backend for saving user-uploaded recipes in a real database

---

## 🙌 Acknowledgments

Built as part of **The Complete JavaScript Course** by *Jonas Schmedtmann*. This project is an advanced JavaScript capstone that teaches DOM manipulation, async programming, and modular development.

---



