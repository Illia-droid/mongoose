const mongoose = require("mongoose");
const { Schema } = mongoose;
const { contentSchema } = require("../utils/validationSchemas");
const commentSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      validate: {
        validator: (value) => contentSchema.isValid(value),
        message: (props) => `${props.value} is not empty!`,
      },
    },
    like: {
      type: Number,
      default: 0,
    },
    taskId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Task",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
