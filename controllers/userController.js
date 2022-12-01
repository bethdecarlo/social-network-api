const { User, Thought } = require('../models');

//GET all users
const userController = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single user
  // populates friends and thoughts
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'User not found.' })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // PUT update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'User not found' })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE a user and thoughts for that user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.status(200).json({ message: 'User and user thoughts have been successfully deleted.' }))
      .catch((err) => res.status(500).json(err));
  },

  // POST a friend
  // use $addToSet
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found.' })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE a friend
  //use $pull 
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found.' })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;