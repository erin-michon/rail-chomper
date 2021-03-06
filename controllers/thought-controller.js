const { User, Thought} = require('../models');

const thoughtController ={

    // GET all thoughts at /api/thoughts
       getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-_v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //POST at /api/thoughts/:userId
    createThought ({ params, body }, res) {
        console.log(body)
        Thought.create(body)
          .then(({ _id }) => {
            console.log(_id);
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            )
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' })
              return
            }
            res.json(dbUserData)
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
    })
    },    

    //GET one thought at /api/thoughts/:id
    getThoughtById({params},res) {
        Thought.findOne({_id: params.id})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No thought found with this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //PUT at /api/thoughts/:id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err))
    },

    //DELETE at /api/thoughts/:id
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No thought found with this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //POST at /api/thoughts/:thoughtId/reactions to create a reaction
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body} },
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'No thought found with that id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    //DELETE at /api/thoughts/:thoughtId/reactions/:reactionId to delete a reaction
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: { reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;