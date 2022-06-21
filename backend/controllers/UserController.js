const User = require('../models/User')
const fs = require('fs')

const UserController = {
    updateInfo: async (req, res) => {
        const {id} = req.params
        const {fullname} = req.body
        try {
            const updateInfo = await User.findOneAndUpdate({_id: id}, {fullname: fullname}, {new: true}).select('fullname')
            if(!updateInfo)
                return res.status(401).json({success: false, message: 'Sửa thất bại'})
            res.json({success: true, message: 'Thay đổi thành công', info: updateInfo})
        }catch(error){
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
    updateAvatar: async(req, res, next) => {
        const {id} = req.params
        const file = req.file

        if(!file)
            return res.status(401).json({success: false, message: 'Không tìm thấy hình ảnh tải lên'})
        
        try {
            const findAvt = await User.findOne({_id: id})
            
            if(!findAvt)
                return res.status(401).json({success: false, message: 'Sửa thất bại'})

            if(findAvt.avt !== 'uploads\\no-avatar.png')
                fs.unlinkSync(findAvt.avt, error => {
                    return res.status(401).json({success: false, message: error})
                })
            
            const update = await User.findOneAndUpdate({_id: id},{avt: file.path},{new: true}).select('avt')
            console.log(update);
            if(!update)
                return res.status(401).json({success: false, message: 'Sửa thất bại'})
            res.json({success: true, message: 'Thay đổi thành công', info: update})
        }catch(error){
            console.log(error)
            res.status(500).json({ success: false, message: 'Lỗi server' })
        }
    },
    updatePassword: async(req, res, next) => {
        const {id} = req.params
        
        try {
            
            res.json({success: true, message: 'Thay đổi thành công'})
        }catch(error){
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}

module.exports = UserController