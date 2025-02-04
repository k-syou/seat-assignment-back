/* eslint-env node */
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import connectDB from './config/db.js'
import seatingLayouts from './routes/seatingLayouts.js'
import studentsRouter from './routes/students.js'
import connectDB from './schemas/index.js'

dotenv.config()
connectDB();
const app = express()


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())

app.get('/my-ip', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.json({ ip });
});
// 테스트 라우트 추가
app.get('/test', (req, res) => {
  res.json({ message: 'API is working!' })
})

app.use('/seating-layouts', seatingLayouts)
app.use('/students', studentsRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// module.exports = app;