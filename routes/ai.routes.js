import express from 'express';
import generateAIResponse from '../services/aiServices.js';

const router = express.Router();
router.post('/generate', async (req,res) => {
    const {prompt,mode} = req.body;
    if(!prompt || !mode) { 
        return res.status(400).json({ message : "any of the values is empty"});
    }

    const allowedMode = ["explain", "mcq", "summarize", "improve"];

    if(!allowedMode.includes(mode)) {return res.status(400).json({ message : "please enter the valid mode for the result"}); }

    try {
        const answer = await generateAIResponse(mode,prompt);
        res.status(200).json({message : "the result has been fetched", result : answer});
    } catch (err) {
        return res.status(500).json({ message : err.message});
    }

})

export default router;