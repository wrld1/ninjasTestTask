const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Superhero = require("./superhero");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.get("/api/superheroes", (req, res) => {
  Superhero.find()
    .then((superheroes) => {
      res.json(superheroes);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve superheroes" });
    });
});

app.get("/api/superheroes/:id", (req, res) => {
  const superheroId = req.params.id;

  Superhero.findById(superheroId)
    .then((superhero) => {
      if (!superhero) {
        return res.status(404).json({ error: "Superhero not found" });
      }
      res.json(superhero);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve superhero" });
    });
});

app.post("/api/superheroes", (req, res) => {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  } = req.body;

  const newSuperhero = new Superhero({
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  });

  newSuperhero
    .save()
    .then((savedSuperhero) => res.json(savedSuperhero))
    .catch((err) =>
      res.status(500).json({ error: "Failed to create superhero" })
    );
});

app.put("/api/superheroes/:id", (req, res) => {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  } = req.body;
  const superheroId = req.params.id;

  Superhero.findByIdAndUpdate(
    superheroId,
    {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images,
    },
    { new: true }
  )
    .then((updatedSuperhero) => {
      if (!updatedSuperhero) {
        return res.status(404).json({ error: "Superhero not found" });
      }
      res.json(updatedSuperhero);
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to update superhero" })
    );
});

app.delete("/api/superheroes/:id", (req, res) => {
  const superheroId = req.params.id;

  Superhero.findByIdAndDelete(superheroId)
    .then((deletedSuperhero) => {
      if (!deletedSuperhero) {
        return res.status(404).json({ error: "Superhero not found" });
      }
      res.json({ message: "Superhero deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to delete superhero" })
    );
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
