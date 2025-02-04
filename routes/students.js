import express from 'express'
// import Student from '../models/Student.js'
import Students from '../schemas/students.js'

const router = express.Router()

// GET 모든 학생 조회
// router.get('/', async (req, res) => {
//   try {
//     const students = await Student.find()
//     res.json(students)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })
router.get('/', async (req, res, next) => {
  try {
    const students = await Students.find({})
    res.json(students)
  } catch (err) {
    console.error(err)
    next(err)
  }
})
  .post('/', async(req, res, next) => {
    try {
      const student = await Students.create({
        name: req.body.name,
      });
      console.log(student);
      res.status(201).json(student)
    } catch (err) {
      console.error(err)
      next(err)
    }
  })

// 학생 목록 초기화
router.post('/init', async (req, res) => {
  try {
    await Students.deleteMany({})
    
    const studentNames = [
      // 전체 학생 이름 작성
    ]

    const students = await Promise.all(
      studentNames.map(name => Students.create({ name }))
    )

    res.status(201).json(students)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
