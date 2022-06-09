const argon2 = require('argon2')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const AuthController = {
    register: async(req, res) => {
        // const {username, email, password} = req.body
        const {username, fullname, password} = req.body
        

        // if(!username || !password || !email)
        if(!username || !password || !fullname)
            return res.status(400).json({success: false, message: 'Vui lòng nhập đầy đủ thông tin'})

        try {
            //check existing username
            const user = await User.findOne({username})
            
            if(user)
                return res.status(400).json({success: false, message: 'Tài khoản đã được sử dụng'})

            //check existing email
            // const mail = await User.findOne({email})
            
            // if(mail)
                // return res.status(400).json({success: false, message: 'Email already taken'})

            //hash password
            const hashPass = await argon2.hash(password)
            // const newUser = new User({username, email, password: hashPass})
            const newUser = new User({username, fullname, password: hashPass})
            await newUser.save()

            //json web token
            const accessToken = jwt.sign({
                id: newUser._id,
                admin: newUser.admin
            }, process.env.ACCESS_TOKEN_SECRET)

            res.status(200).json({success: true, newUser,accessToken})
        } catch (error) {
            res.status(500).json(error)
        }
    },
    
    login: async(req, res) => {
        const {username, password} = req.body
        
        if(!username || !password)
            return res.status(400).json({success: false, message: 'Vui lòng nhập tài khoản/ mật khẩu'})
        
        try {
            const user = await User.findOne({username})

            if(!user)
                return res.status(400).json({success: false, message: 'Tài khoản/ mật khẩu không chính xác'})

            const isPass = await argon2.verify(user.password, password)
            if(!isPass)
                return res.status(400).json({success: false, message: 'Tài khoản/ mật khẩu không chính xác'})
            
            //json web token
            const accessToken = jwt.sign({
                id: user._id,
                admin: user.admin
            }, process.env.ACCESS_TOKEN_SECRET)

            res.status(200).json({success: true, user, accessToken})
        } catch (error) {
            res.status(500).json(error)
        }
    },

    check: async (req, res) => {
        try {
            const user = await User.findById(req.id).select('-password')
            if(!user)
                return res.status(400).json({success: false, message: 'Không tìm thấy người dùng'})
            res.json({success: true, user})

        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Lỗi server'})
        }
    }
}

module.exports = AuthController