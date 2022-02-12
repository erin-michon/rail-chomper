const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

//set up GET all at /api/thoughts
router
  .route('/')
  .get(getAllThought)

//set up POST at /api/thought/:userId

router
    .route('/:userId')
    .post(createThought);
  
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
    
//set up DELETE at /api/thoughts/:reactionId to delete a reaction
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;