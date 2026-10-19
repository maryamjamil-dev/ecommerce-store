
const express = require("express");
const router = express.Router();

const {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getSubscribers,
  deleteSubscriber,
} = require("../controllers/newsletter.controller");


router.post("/subscribe", subscribeNewsletter);
router.post("/unsubscribe", unsubscribeNewsletter);


router.get("/", getSubscribers);
router.delete("/:subscriberId", deleteSubscriber);

module.exports = router;
