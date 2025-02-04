import express from 'express'
import SeatingLayout from '../models/SeatingLayout.js'

const router = express.Router()

// 모든 배치도 조회
router.get('/', async (req, res) => {
  try {
    const layouts = await SeatingLayout.find().sort({ createdAt: -1 })
    res.json(layouts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// 새로운 배치도 저장
router.post('/', async (req, res) => {
  const layout = new SeatingLayout({
    name: req.body.name,
    layout: req.body.layout,
  })

  try {
    const newLayout = await layout.save()
    res.status(201).json(newLayout)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post('/init', async (req, res) => {
  try {
    await SeatingLayout.deleteMany({})
    
    const seatingLayout_lst = [
      // 전체 학생 이름 작성
      ['1-1', '김수빈'], ['1-3', '한진경'], ['1-4', '김종수'], ['1-5', '천명준'], ['1-6', '황지민'], 
      ['2-2', '전상우'], ['2-3', '이대연'], ['2-4', '오서로'], ['2-5', '김세은'], ['2-6', '심은수'],
      ['3-1', '박승규'], ['3-2', '노민수'], ['3-4', '박정현'], ['3-5', '장은지'], ['3-6', '이우경'],
      ['4-1', '신승민'], ['4-3', '박주희'], ['4-4', '전윤지'], ['4-5', '김정택'], ['4-6', '김권수'],
      ['5-2', '한영균'], ['5-3', '황선영'], ['5-4', '이지우'], ['5-6', '하재민'],
    ]
    let seatingLayout_map = new Map(seatingLayout_lst);
    await SeatingLayout.create({ name: '초기 배치도', layout: seatingLayout_map })

    res.status(201).json(seatingLayout_map)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// 특정 배치도 조회
router.get('/:id', async (req, res) => {
  try {
    const layout = await SeatingLayout.findById(req.params.id)
    if (layout) {
      res.json(layout)
    } else {
      res.status(404).json({ message: '배치도를 찾을 수 없습니다' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
