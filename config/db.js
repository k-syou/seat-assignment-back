/* eslint-env node */
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI.replace('${MONGODB_PASSWORD}', process.env.MONGODB_PASSWORD)
    console.log('Attempting to connect to MongoDB...')
    console.log('Connection URI:', mongoURI) // 디버깅용 (실제 배포 시에는 제거)
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('MongoDB connection error:')
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
