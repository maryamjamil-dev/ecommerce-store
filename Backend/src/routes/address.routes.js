const express = require("express");
const router = express.Router();

const {
  createAddress,
  getMyAddresses,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controller");

router.post("/", createAddress);
router.get("/", getMyAddresses);
router.put("/:addressId", updateAddress);
router.delete("/:addressId", deleteAddress);

module.exports = router;
