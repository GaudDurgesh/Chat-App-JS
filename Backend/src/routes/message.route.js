import express from "express";

const router = express.Router();

// Define your message routes here
router.get("/send", (req, res) => {
    res.send("Send message endpoint");
});

export default router;