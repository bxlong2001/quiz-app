const Result = require('../models/Result')

const ResultController = {
    save: async(req,res) => {
        const {examName, result, timeWork} = req.body
        
        try {
            const newResult = new Result({
                idUser: req.id,
                examName, 
                result, 
                timeWork
            })
            
            await newResult.save()

            res.json({success: true, message: 'Save result success', result: newResult})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal server error"})
        }
        
    },

    show: async(req, res) => {
        try {
            const results = await Result.find({idUser: req.id})
            res.json({success: true, results})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }
}

module.exports = ResultController