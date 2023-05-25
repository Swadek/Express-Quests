const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const port = process.env.APP_PORT ?? 5000;
const movieHandlers = require("./movieHandlers");

app.get("/", movieHandlers.welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUserById);

app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", movieHandlers.postUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
