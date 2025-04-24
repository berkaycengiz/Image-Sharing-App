import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new mongoose.Schema({
    photo: {type: String, required: true},
    description: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "User", required: true},
    viewCount: {type: Number, default: 0},
    likeCount: {type: Number, default: 0}
}, {timestamps: true});

export const PostModel = mongoose.model('Post', PostSchema);

export const getPosts = () => PostModel.find().populate("postedBy", "username profilePic");
export const getPostById = (id: string) => PostModel.findById(id).populate("postedBy", "username profilePic");
export const createPost = (values: Record<string, any>) => new PostModel(values).save().then((post) => post.toObject());
export const updatePostById = (id: string, values: Record<string, any>) => PostModel.findByIdAndUpdate(id, values);
export const deletePostById = (id: string) => PostModel.findOneAndDelete({_id: id});