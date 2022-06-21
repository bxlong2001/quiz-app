const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const adminRouter = require('./routes/admin')
const authRouter = require('./routes/auth')
const examRouter = require('./routes/exam')
const resultRouter = require('./routes/result')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')
const path = require('path')


const app = express()

//environment variable
dotenv.config()

//connect mongodb
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wg2ih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

app.use(express.json())
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit:50000
}))

//routes
app.use('/admin', adminRouter)
app.use('/auth', authRouter)
app.use('/exams', examRouter)
app.use('/results', resultRouter)
app.use('/me', userRouter)
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
