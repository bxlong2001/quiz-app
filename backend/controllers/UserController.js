const User = require('../models/User')

const UserController = {
    updateInfo: async (req, res) => {
        const {id} = req.params
        const {fullname} = req.body
        try {
            const updateInfo = await User.findOneAndUpdate({_id: id}, {fullname: fullname})
            if(!updateInfo)
                return res.status(401).json({success: false,message: 'Sửa thất bại'})
            res.json({success: true, message: 'Thay đổi thành công', info: updateInfo})
        }catch(error){
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
    updateAvatar: async(req, res, next) => {
        const file = req.file
        

    }
}

module.exports = UserController