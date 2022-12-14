//API routes for /api/users
//GET all users
//GET all users by its _id and populated thought and friend data
//POST a new user
//POST to add a new friend from user's friend list
// DELETE to remove a friend from a user's friend list

const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');


router.route('/')
  .get(getUsers)
  .post(createUser);


router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);


router.route('/:userId/friends')
  .post(addFriend);


router.route('/:userId/friends/:friendId')
  .delete(removeFriend);

module.exports = router;
