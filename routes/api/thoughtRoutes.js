//api/thoughts
//GET to get all thoughts
//GET to get a single thought by its _id
//POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
//PUT tpo update a thought by its _id
//DELETE tp remove a thought by its _id

const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

router.route('/')
  .get(getThoughts)
  .post(createThought);


router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//POST to create a . reaction stored in a single thought's reactions array field
//DELETE to pull and remove a reaction by the reaction's reactionID value 

router.route('/:thoughtId/reactions')
  .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
