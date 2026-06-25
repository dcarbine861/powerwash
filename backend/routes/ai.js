// routes/ai.js
// Maps URLs to controller functions — no business logic here

const express = require("express");
const router = express.Router();
const { suggestService } = require("../controllers/aiController");

router.post("/suggest", suggestService);

module.exports = router;
