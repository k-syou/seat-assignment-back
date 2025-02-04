import mongoose from 'mongoose'

const seatingLayoutSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 배치도 이름
  layout: { type: Map, of: String, required: true }, // 좌석 배치 데이터
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('SeatingLayout', seatingLayoutSchema)
