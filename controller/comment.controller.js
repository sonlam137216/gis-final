const commentModel = require('../models/comment.model')
const userModel = require('../models/user.model')

const CommentCtrl = {
    create: async (req, res) => {
        try {
            let comment = {}
            const { content, userId = "", name = "" } = req.body

        if(!content) {
            return res.status(400).json({ success: false, message: 'Missing params' })
        }
        if(userId) {
            const existingUser = await userModel.findOne({ _id: userId })
            
            if(!existingUser) {
                return res.status(404).json({ success: false, message: "Not found user!" })
            }
            comment = new commentModel({ content, userId, name })

            await comment.save()
    
            return res.json({
                success: true,
                message: "Create comment successfully!",
                comment
            })
        } else {
            comment = new commentModel({ content, name })

            await comment.save()
    
            return res.json({
                success: true,
                message: "Create comment successfully!",
                comment
            })
        }

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: "Internal server error!" })
        }
    },

    getAll: async (req, res) => {
        try {
            const comments = await commentModel.find().populate('userId')

            return res.json({ success: true, message: "Get comments successfully!", comments })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: "Internal server error!" })
        }
    }
}

module.exports = CommentCtrl