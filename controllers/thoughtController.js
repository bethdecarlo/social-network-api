const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.status(200).json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Thought not found.' })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
            message: 'User not found.',
          })
          : res.status(200).json('Success! Thought posted.')
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // PUT request to update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Thought not found.' })
          : res.status(200).json(thought)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // DELETE a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Thought not found.' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
      )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'User not found.' })
          : res.status(200).json({ message: 'Success! Thought deleted.' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST a reaction to a thought
  // use $addToSet
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found.' })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE reaction from post
  //use $pull 
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found.' })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};


module.exports = thoughtController