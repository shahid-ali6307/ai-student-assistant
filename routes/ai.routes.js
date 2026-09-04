import express from 'express';

const router = express.Router();
router.post('/generate', (req,res) => {
    const {prompt,mode} = req.body;
    if(!prompt || !mode) { 
        return res.status(403).json({ message : "any of the values is empty"});
    }

    const allowedMode = ["explain", "mcq", "summarize", "improve"];

    if(!allowedMode.includes(mode)) {return res.status(403).json({ message : "please enter the valid mode for the result"}); }

    res.status(200).json({ message : "test"});

})

export default router;