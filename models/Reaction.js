
//Reaction will not be a model, but rather will be used at the reaction field's subdocument schema in the thought model 

const { Schema, Types } = require('mongoose');
const { formatDate } = require('../utils/helpers');

const reactionSchema = new Schema(
  {
//reactionID must use mongoose's ObjectID data type
//Default value is set to a new ObjectID
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
//reactionBody must be a string, required, 280 character maximum
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
//username must be a string, required
    username: {
      type: String,
      required: true,
    },
//createdAt must be a date, set default value to the current timestamp 
// use a getter method to format the timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        return formatDate(date)
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
