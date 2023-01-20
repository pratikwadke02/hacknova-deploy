import Post from "../models/Post.js";
import User from "../models/User.js";
import { check, validationResult } from "express-validator";
import { cloudinaryUploadImage } from "../middleware/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!req.file) {
      return res.status(400).send({
        message: "Article image can not be empty",
      });
    }
    const localPath = `uploads/${req.file.filename}`;
    const uploadedImg = await cloudinaryUploadImage(localPath);
    console.log(uploadedImg.url);
    const newPost = new Post({
      title: req.body.title,
      name: user.name,
      image: uploadedImg.url,
      user: req.params.id,
      desc: req.body.desc,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const addComment = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment = new Post({
      title: req.body.text,
      name: user.name,
      image: user.image,
      user: req.body.id,
    });
    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};
