const { User, Thought } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID' })
          : res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(req.body);
        return User.findOneAndUpdate(
          { userId: req.body.userId },
          { $addToSet: { thoughtData: thought } },
          { new: true }
        );
      })
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with this ID' })
          : res.json(user))
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => 
        !thought
          ?res.status(404).json({ message: 'No thought with this ID' })
          :res.json(thought)
          )
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID' })
          : res.json('Thought deleted')
      )
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body }},
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate( 
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId }} },
      { runValidators: true, new: true}
    )
      .then((reaction) => 
        !reaction
          ? res.status(404).json({ message: 'No reaction with thus ID'})
          : res.json('Deleted reaction ')
      )
      .catch((err) => res.status(500).json(err));
  }

}