const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/date");

const ReactionSch = new Schema(
  {
    reactionId: {
      // Mongoose ObjectId data type
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 300,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      // Set default value to the current timestamp.
      default: Date.now,
      // Use a get method to format the date.
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const ThoughtSch = new Schema(
  {
    thoughtText: {
      type: String,
      required: "A Thought is Required",
      minlength: 1,
      maxlength: 300,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      // Use a getter method to format the timestamp on query
      get: (timestamp) => dateFormat(timestamp),
    },

    username: {
      type: String,
      required: true,
    },

    // array of nested documents created with the ReactionSch
    ReactionSch: [ReactionSch],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSch.virtual("reactionCount").get(function () {
  return this.ReactionSch.length;
});

const Thought = model("Thought", ThoughtSch);

module.exports = Thought;