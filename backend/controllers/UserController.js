const User = require('../models/User')
const fs = require('fs')

const UserController = {
    updateInfo: async (req, res) => {
        const {id} = req.params
        const {fullname} = req.body
        try {
            const updateInfo = await User.findOneAndUpdate({_id: id}, {fullname: fullname})
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
        console.log(req)
        if(!file)
            return res.status(401).json({success: false, message: 'Không tìm thấy hình ảnh tải lên'})
        
        try {
            const findAvt = await User.findOneAndUpdate({_id: id},{avt: file.filename})
            
            if(!findAvt)
                return res.status(401).json({success: false, message: 'Sửa thất bại'})
            
            if(findAvt.avt !== 'no-avatar.png')
                fs.unlinkSync( '../frontend/public/img/' + findAvt.avt, error => {
                    console.log(error);
                })
            res.json({success: true, message: 'Thay đổi thành công'})
        }catch(error){
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
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