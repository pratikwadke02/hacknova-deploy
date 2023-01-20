import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

export default mongoose.model('user', UserSchema);
