const express = require("express");
const router = express.Router();

const {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contact.controller");

router.post("/", createContact);


router.get("/", getContacts);
router.patch("/:contactId/status", updateContactStatus);
router.delete("/:contactId", deleteContact);

module.exports = router;