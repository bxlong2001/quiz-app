const Result = require('../models/Result')
const User = require('../models/User')

const ResultController = {
    save: async(req,res) => {
        const {examName, result, timeWork} = req.body
        
        try {
            const findResult = await Result.find({idUser: req.id, examName: examName}).sort({frequency: -1})
            
            const newResult = new Result({
                idUser: req.id,
                examName,
                frequency: findResult.length!==0 ? findResult[0].frequency+1 : 1, 
                result, 
                timeWork
            })
            
            await User.findOneAndUpdate({_id: req.id}, { $inc: {point: result} })

            await newResult.save()

            res.json({success: true, message: 'Lưu kết quả thành công', result: newResult})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal server error"})
        }
        
    },

    showAll: async(req, res) => {
        try {
            const results = await Result.find({idUser: req.id}).sort({createdAt: -1})
            res.json({success: true, results})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },

    show: async(req, res) => {
        try {
            const result = await Result.find({idUser: req.id}).sort({createdAt: -1}).limit(5)
            res.json({success: true, result})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },

    rank: async(req, res) => {
        const {slug} = req.params
        console.log(slug);
        try {
            if(slug === 'all'){
                const rankPoint = await User.find().select('-password').sort({point: -1}).limit(10)
                return res.json({success: true, results: rankPoint})
            }
            const results = await Result.aggregate(
                [
                    {
                        $match: {examName: slug, frequency: 1}
                    },
                    {
                        $project: {
                            idUser: 1,
                            maxResult: {$max: '$result'},
                            minTimeWork: {$min: '$timeWork'}                     }
                    },
                    {
                        $sort: {maxResult: -1, minTimeWork: 1}
                    },
                    {   
                        $lookup: {
                            from: 'users',
                            localField: 'idUser',
                            foreignField: '_id',
                            pipeline: [
                                {
                                    $project: {username: 1, fullname: 1}
                                }
                            ],
                            as: 'infoUser'
                        }
                    },
                    
                ]
            )
            res.json({success: true, results})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }
}

module.exports = ResultController