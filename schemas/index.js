import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const mongoURI = process.env.MONGODB_URI.replace('${MONGODB_PASSWORD}', process.env.MONGODB_PASSWORD)

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...')
    console.log('Connection URI:', mongoURI) // 디버깅용 (실제 배포 시에는 제거)
    
    const conn = await mongoose.connect(mongoURI, {
      dbName: "seat-data",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('MongoDB connection error:')
    console.error(error)
    process.exit(1)
  }
}

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
  connectDB(); // 연결 재시도
});

export default connectDB;