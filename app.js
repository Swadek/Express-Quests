const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.APP_PORT ?? 5000;
const movieHandlers = require("./movieHandlers");

app.get("/", movieHandlers.welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
