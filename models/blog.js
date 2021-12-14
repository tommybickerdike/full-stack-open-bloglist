const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	title: { type: String, required: true },
	author: String,
	url: { type: String, required: true },
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	comments: { type: Array, required: true },
});

blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;

		returnedObject.likes === undefined
			? (returnedObject.likes = 0)
			: returnedObject.likes;

		returnedObject.comments === undefined
			? (returnedObject.comments = [])
			: returnedObject.comments;
	},
});

module.exports = mongoose.model("Blog", blogSchema);
