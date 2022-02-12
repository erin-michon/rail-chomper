const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

//set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);


//set up Get one, PUT and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//set up POST and DELETE at /api/users/:userId/friends/:friendId to add/remove a friend from a users friend list
router 
.route('/:userId/friends/:friendsId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;