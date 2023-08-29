import express from 'express'
import morgan from 'morgan'
import userRouter from './routes/user.routes.js'
import movieRouter from './routes/movie.routes.js'
import cookieParser from 'cookie-parser'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const app = express()

const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(morgan('dev'))
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use("/api", userRouter)
app.use("/api", movieRouter)

//Para llamar la vista cliente
app.use(express.static(join(_dirname, "../client/dist")));

export default app
