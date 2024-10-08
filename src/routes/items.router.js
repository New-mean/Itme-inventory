import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import authMiddleware from '../middleware/middleware.js';

const router = express.Router();

//** 아이템 생성 API */
router.post('/items', async (req, res, next) => {
  const { itemcode, item_name, item_stat, item_price } = req.body;
  const itme = await prisma.items.create({
    data: {
      itemcode: itemcode,
      item_name: item_name,
      item_stat: item_stat,
      item_price: item_price,
    },
  });
  return res.status(201).json({ message: '아이템이 생성되었습니다.' });
});

//** 아이템 수정 API */
router.put('/itmes/:itemcode', async (req, res, next) => {
  const { itemcode } = req.params;
  const { item_name, item_stat } = req.body;

  const unitem = await prisma.items.findUnique({
    where: {
      itemcode: +itemcode,
    },
  });
  if (!unitem) return res.status(400).json({ message: '아이템이 존재하지 않습니다.' });

  const updateItem = await prisma.items.update({
    where: {
      itemcode: +itemcode,
    },
    data: {
      item_name: item_name,
      item_stat: { atk: item_stat.atk, hp: item_stat.hp },
    },
  });
  return res.status(200).json({ message: '아이템이 수정되었습니다.' });
});

//** 아이템 목록 조회 API */
router.get('/items', authMiddleware, async (req, res, next) => {
  const item = await prisma.items.findMany({
    select: {
      itemcode: true,
      item_name: true,
      item_price: true,
    },
  });
  return res.status(200).json({ data: item });
});

//** 아이템 상세 조회 API */
router.get('/items/:itemcode', async (req, res, next) => {
  const { itemcode } = req.params;
  const item = await prisma.items.findFirst({
    where: {
      itemcode: +itemcode,
    },
    select: {
      itemcode: true,
      item_name: true,
      item_price: true,
      item_stat: true,
    },
  });
  return res.status(200).json({ data: item });
});
export default router;
