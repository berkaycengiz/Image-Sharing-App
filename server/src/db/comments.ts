import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
    postId: {type: Schema.Types.ObjectId, ref: "Post", required: true},
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    content: {type: String, required: true},
}, {timestamps: true});

export const CommentModel = mongoose.model('Comment', CommentSchema);

export const getCommentsByPostId = (postId: string) => CommentModel.find({postId}).populate("userId", "username").sort({createdAt: -1});
export const createComment = (values: Record<string, any>) => new CommentModel(values).save().then((comment) => comment.toObject());
export const deleteCommentById = (id: string) => CommentModel.findOneAndDelete({_id: id});