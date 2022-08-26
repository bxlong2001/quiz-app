const argon2 = require('argon2')
const User = require('../models/User')

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
        console.log('file: ', file);

        if(!file)
            return res.status(401).json({success: false, message: 'Không tìm thấy hình ảnh tải lên'})
        
        try {

            // console.log(uploadedResponse);
            const findAvt = await User.findOne({_id: req.id}).select('avt')
            
            if(!findAvt)
                return res.status(401).json({success: false, message: 'Sửa thất bại'})

            // if(findAvt.avt !== 'https://res.cloudinary.com/aptestcloud/image/upload/v1660753640/img/no-avatar.png')
            //     cloudinary.uploader.destroy()
            
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
            const {oldPassword, newPassword} = req.body
            const user = await User.findOne({_id: req.id}).select('password')
            
            const isPass = await argon2.verify(user.password, oldPassword)

            if(!isPass)
                return res.status(400).json({success: false, message: 'Mật khẩu cũ không chính xác'})

            const hashPass = await argon2.hash(newPassword)
            
            await User.findOneAndUpdate({_id: req.id}, {password: hashPass})
                
            res.json({success: true, message: 'Thay đổi thành công'})
        }catch(error){
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },

    showRank: async(req, res) => {
        try {
            const rankPoint = await User.find().select('point').sort({point: -1})
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