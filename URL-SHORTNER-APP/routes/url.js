const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleRedirectToOriginalURL
} = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortid", handleGetAnalytics);

router.get('/:shortId', handleRedirectToOriginalURL);

module.exports = router;
