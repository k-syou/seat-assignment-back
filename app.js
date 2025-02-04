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


app.use(cors())

app.use(express.json())

app.get('/my-ip', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.json({ ip });
});
// 테스트 라우트 추가
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' })
})

app.use('/api/seating-layouts', seatingLayouts)
app.use('/api/students', studentsRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// module.exports = app;