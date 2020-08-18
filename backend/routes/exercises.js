const router = require('express').Router()

let Exercise = require('../models/exercise.model')

// get all exercises
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err))
})

// add exercise
router.route('/add').post((req, res) => {
  const username = req.body.username
  const description = req.body.description
  const duration = Number(req.body.duration)
  const date = Date(req.body.date)

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  })

  newExercise.save()
    .then(() => res.json('Exercise added'))
    .catch(err => res.status(400).status('Error: ' + err))
})

// get exercise by ID
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err))
})

// delete exercise by ID
router.route('/delete/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json(`Exercise ${req.params.id} deleted`))
    .catch(err => res.status(400).json('Error: ' + err))
})

// update exercise by ID
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username
      exercise.description = req.body.description
      exercise.duration = Number(req.body.duration)
      exercise.date = Date.parse(req.body.date)

      exercise.save()
        .then(() => res.json(`Exercise ${req.params.id} updated`))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router