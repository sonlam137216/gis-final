const feedbackModel = require('../models/feedback.model')
const userModel = require('../models/user.model')

const FeedbackCtrl = {
    create: async (req, res) => {
        try {
            const { content, userId = "", name = "" } = req.body

        if(!content) {
            return res.status(400).json({ success: false, message: 'Missing params' })
        }
        if(userId) {
            const existingUser = await userModel.findOne({ _id: userId })
            
            if(!existingUser) {
                return res.status(404).json({ success: false, message: "Not found user!" })
            }
            const feedback = new feedbackModel({ content, userId, name })
    
            await feedback.save()
    
            return res.json({
                success: true,
                message: "Create feedback successfully!",
                feedback
            })
        } else {
            const feedback = new feedbackModel({ content, name })
    
            await feedback.save()
    
            return res.json({
                success: true,
                message: "Create feedback successfully!",
                feedback
            })
        }

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: "Internal server error!" })
        }
    },

    getAll: async (req, res) => {
        try {
            const feedbacks = await feedbackModel.find().sort({ 'createdAt': 1 }).populate('userId')

            return res.json({ success: true, message: "Get feedbacks successfully!", feedbacks })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: "Internal server error!" })
        }
    }
}

module.exports = FeedbackCtrl