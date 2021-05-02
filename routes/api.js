const router = require("express").Router();
const Workout = require("../models/workout.js");

// Post new workout
router.post("/api/workout", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Get all workouts
router.get("/api/workout", (req, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Update a workout
router.put("/api/workout/:id", (req, res) => {
  Workout.findOneAndUpdate(
    { _id: mongojs.ObjectId(req.params.id) },
    {
      $push: {
        exercises: req.body,
      },
    }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
