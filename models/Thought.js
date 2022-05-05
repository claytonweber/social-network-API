const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
)

const thoughtSchema = new Schema( 
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //getter method to format the timestamp on query

    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

//reactionCount retrieves length of the thought's reactions 
thoughtSchema
  .virtual("reactionCount")
  .get(function() {
    return this.reaction.length;
});

const Thought = model('thought', thoughtSchema);

modeule.exports = Thought;