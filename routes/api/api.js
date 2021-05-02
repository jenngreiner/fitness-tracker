const router = require("express").Router();
const Workout = require("../../models/workout.js");

// Post new workout
router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Get all workouts
router.get("/workouts", (req, res) => {
  Workout.find({})
    .sort({ day: "asc" })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Update a workout
router.put("/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    { $push: {
        exercises: req.body,
      }
    },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get all workouts
router.get("/workouts/range", (req, res) => { Workout.aggregate([
  {
    $addFields: {
      totalDuration: { $sum: "$exercises.duration" },
    },
  },
])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
