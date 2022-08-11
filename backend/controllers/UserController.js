const User = require('../models/User')
const fs = require('fs')

const UserController = {
    updateInfo: async (req, res) => {
        const {fullname} = req.body
        try {
            const updateInfo = await User.findOneAndUpdate({_id: req.id}, {fullname: fullname}, {new: true}).select('fullname')
            if(!updateInfo)
                return res.status(401).json({success: false, message: 'Sửa thất bại'})
            res.json({success: true, message: 'Thay đổi thành công', info: updateInfo})
        }catch(error){
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },
    updateAvatar: async(req, res) => {
        const file = req.file

        if(!file)
            return res.status(401).json({success: false, message: 'Không tìm thấy hình ảnh tải lên'})
        
        try {
            const findAvt = await User.findOne({_id: req.id})
            
            if(!findAvt)
                return res.status(401).json({success: false, message: 'Sửa thất bại'})

            if(findAvt.avt !== 'uploads\\no-avatar.png')
                fs.unlinkSync(findAvt.avt, error => {
                    return res.status(401).json({success: false, message: error})
                })
            
            const update = await User.findOneAndUpdate({_id: req.id},{avt: file.path},{new: true}).select('avt')

            if(!update)
                return res.status(401).json({success: false, message: 'Sửa thất bại'})
            res.json({success: true, message: 'Thay đổi thành công', info: update})
        }catch(error){
            console.log(error)
            res.status(500).json({ success: false, message: 'Lỗi server' })
        }
    },
    updatePassword: async(req, res, next) => {
        try {
            
            res.json({success: true, message: 'Thay đổi thành công'})
        }catch(error){
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },

    showRank: async(req, res) => {
        try {
            const rankPoint = await User.find().select('-password').sort({point: -1}).limit(10)
            let rank = 0
            let point = 0
            rankPoint.find((item, index) => {
                rank = index + 1
                point = item.point
                return item.id === req.id
            })
            const rankInfo = {rank, point}
            res.status(200).json({success:true, rankInfo})
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}

module.exports = UserController