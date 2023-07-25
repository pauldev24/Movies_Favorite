import express from 'express'
import morgan from 'morgan'
import userRouter from './routes/user.routes.js'
import movieRouter from './routes/movie.routes.js'
import cookieParser from 'cookie-parser'


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use("/api", userRouter)
app.use("/api", movieRouter)


export default app
