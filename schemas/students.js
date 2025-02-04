import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: false,
    unique: true,
  }
})

export default mongoose.model('Students', studentSchema)