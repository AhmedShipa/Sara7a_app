import { Message } from "../../models/message.model.js";

// add message
const addMessage = async (req, res) => {
  const message = await Message.insertMany(req.body);
  res.status(201).json({ message: `message added successfully`, message });
};

// getMessages
const getMessages = async (req, res) => {
  const message = await Message.find({
    receiverId: req.receiverId.userId,
  }).populate("receiverId", "userName");
  console.log(message);
  res.json({ message });
};

// updateMessage
const updateMessage = async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.status(200).json({ message: `message updated successfully`, message });
};

// deleteMessage
const deleteMessage = async (req, res) => {
  await Message.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json({ message: `message deleted successfully` });
};

export { getMessages, addMessage, updateMessage, deleteMessage };
