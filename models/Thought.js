const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const { formatDate } = require('../utils/helpers');

const thoughtSchema = new Schema(
  // thoughtText must be a string, required, must be between 1 and 280 characters
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    //createdAt must be a date, set default value to the current timestamp
    // use a getter method to format the timestap on query
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        return formatDate(date)
      },
    },
    //username must be a string and requred
    username: {
      type: String,
      required: true,
    },
    //reactions must be an array of nested documents created with the reactionSchema
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// virtual for reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;
