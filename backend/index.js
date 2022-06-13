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


const app = express()

//environment variable
dotenv.config()

//connect mongodb
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,
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
    extended: true
}))

//routes
app.use('/admin', adminRouter)
app.use('/auth', authRouter)
app.use('/exams', examRouter)
app.use('/results', resultRouter)
app.use('/me', userRouter)

const PORT = 8000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
