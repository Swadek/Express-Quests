require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? process.env.APP_PORT ?? 5000;
const userHandlers = require("./userHandlers");
const movieHandlers = require("./movieHandlers");

const {
  hashPassword,
  getUserByEmailWithPasswordAndPassToNext,
  verifyPassword,
  verifyToken,
  verifyTokenId,
} = require("./auth");

app.get("/", movieHandlers.welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/login", getUserByEmailWithPasswordAndPassToNext, verifyPassword);
app.post("/api/users", hashPassword, userHandlers.postUser);

app.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.put("/api/users/:id", verifyTokenId, hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id", verifyTokenId, userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
