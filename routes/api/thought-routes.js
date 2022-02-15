const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//set up GET all at /api/thoughts
router
  .route('/')
  .get(getAllThought)
  .post(createThought);

// set up POST for thoughts /api/thoughts/:userId
router
.route('/:userId')
.post(createThought)

//set up Get one, PUT and DELETE at /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

//set up POST at /api/thoughts/:thoughtId/reactions to create a reaction
router 
    .route('/:thoughtId/reactions')
    .post(createReaction)
    
//set up DELETE at /api/:thoughtId/reactions/:reactionId to delete a reaction
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;