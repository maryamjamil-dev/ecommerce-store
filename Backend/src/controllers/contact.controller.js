const Contact = require("../model/contact.model");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const getOptionalUserId = async (req) => {
  const token = req.cookies?.token;

  if (!token) return null;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  return user._id;
};

const getAdmin = async (req) => {
  const token = req.cookies?.token;

  if (!token) {
    const error = new Error("Please login first");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  if (user.role !== "admin") {
    const error = new Error("Admin access required");
    error.statusCode = 403;
    throw error;
  }

  return user;
};

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject and message are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (
      name.trim().length > 100 ||
      normalizedEmail.length > 254 ||
      subject.trim().length > 150 ||
      message.trim().length > 3000
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more fields exceed the allowed length.",
      });
    }

    const userId = await getOptionalUserId(req);

    const contact = await Contact.create({
      name: name.trim(),
      email: normalizedEmail,
      subject: subject.trim(),
      message: message.trim(),
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully.",
      contact: {
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        status: contact.status,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {

    if (error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError") {
      try {
        const { name, email, subject, message } = req.body;
        const normalizedEmail =
          typeof email === "string" ? email.trim().toLowerCase() : "";

        if (
          typeof name !== "string" ||
          typeof subject !== "string" ||
          typeof message !== "string" ||
          !name.trim() ||
          !subject.trim() ||
          !message.trim() ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
          name.trim().length > 100 ||
          normalizedEmail.length > 254 ||
          subject.trim().length > 150 ||
          message.trim().length > 3000
        ) {
          return res.status(400).json({
            success: false,
            message: "Please check all fields and try again.",
          });
        }

        const contact = await Contact.create({
          name: name.trim(),
          email: normalizedEmail,
          subject: subject.trim(),
          message: message.trim(),
          user: null,
        });

        return res.status(201).json({
          success: true,
          message: "Your message has been submitted successfully.",
          contact: {
            _id: contact._id,
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            message: contact.message,
            status: contact.status,
            createdAt: contact.createdAt,
          },
        });
      } catch (fallbackError) {
        return res.status(500).json({
          success: false,
          message: "Unable to submit your message right now.",
        });
      }
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message:
        error.statusCode ? error.message : "Unable to submit your message right now.",
    });
  }
};

// Admin: get all contact messages
exports.getContacts = async (req, res) => {
  try {
    await getAdmin(req);

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .populate("user", "username email");

    return res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: update message status
exports.updateContactStatus = async (req, res) => {
  try {
    await getAdmin(req);

    const { contactId } = req.params;
    const { status } = req.body;

    if (!/^[0-9a-fA-F]{24}$/.test(contactId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID.",
      });
    }

    if (!["new", "read", "resolved"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be new, read, or resolved.",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact status updated successfully.",
      contact,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: delete a contact message
exports.deleteContact = async (req, res) => {
  try {
    await getAdmin(req);

    const { contactId } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(contactId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID.",
      });
    }

    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};