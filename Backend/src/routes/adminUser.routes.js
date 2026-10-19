const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/adminUser.controller");

;

router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;