import mongoose from "mongoose";
const Schema = mongoose.Schema;


const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  title: { type: String, required: true },
  desc: {type: String},
  name: { type: String },
  image: { type: String },
  likes: [{ user: { type: Schema.Types.ObjectId, ref: 'users' } }],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'users' },
      title: { type: String, required: true },
      name: { type: String },
      image: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
  crop: { type: String },
  location: { type: String },
});

export default mongoose.model('posts', PostSchema);

