const { User } = require('../models');

module.exports = {
  //get em all
  getUsers(req, res) {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
  },
  //get user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) => 
        !user 
          ? res.status(404).json({ message: 'No user with this ID' })
          : res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //create
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(course))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //update
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => 
        !user
          ? res.status(400).json({ message: 'No user with this ID' })
          : res.json({ message: 'user deleted'})
      )
      .catch((err) => {
        res.status(500).json(err)
    })
  },
  //add friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId }},
      { new: true }
    )
      .then((friend) => 
      !friend
        ? res.status(404).json({ message: 'No user with this ID' })
        : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },

  //delete friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json('Friend removed!')
      )
      .catch((err) => res.status(500).json(err));
  },
}