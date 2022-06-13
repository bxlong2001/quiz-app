const Result = require('../models/Result')

const ResultController = {
    save: async(req,res) => {
        const {examName, result, timeWork} = req.body
        
        try {
            const findResult = await Result.find({idUser: req.id, examName: examName}).sort({frequency: -1})

            const newResult = new Result({
                idUser: req.id,
                examName,
                frequency: findResult ? findResult[0].frequency+1 : 1, 
                result, 
                timeWork
            })
            
            await newResult.save()

            res.json({success: true, message: 'Lưu kết quả thành công', result: newResult})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal server error"})
        }
        
    },

    show: async(req, res) => {
        try {
            const results = await Result.find({idUser: req.id}).sort({updatedAt: -1})
            res.json({success: true, results})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },

    rank: async(req, res) => {
        const {slug} = req.params
        try {
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