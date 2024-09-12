import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import authMiddleware from '../middleware/middleware.js';

const router = express.Router();

/** 캐릭터 생성 API **/
router.post('/characters', authMiddleware, async (req, res, next) => {
  const { userId } = req.user;
  const { character_name } = req.body;
  const isCharacter = await prisma.characters.findFirst({
    where: {
      character_name,
    },
  });
  if (isCharacter) return res.status(400).json({ messgae: '이미 존재하는 캐릭터입니다.' });

  const character = await prisma.characters.create({
    data: {
      userId,
      character_name,
      character_health: 500,
      character_power: 200,
      character_money: 10000,
    },
    select: {
      userId: true,
      characterId: true,
      character_name: true,
    },
  });

  return res.status(201).json({ data: { character } });
});

//** 캐릭터 상세 조회 API */
router.get('/characters/:characterId', async (req, res, next) => {
  const { characterId } = req.params;
  const character = await prisma.characters.findFirst({
    where: {
      characterId: +characterId,
    },
    select: {
      characterId: true,
      character_name: true,
      character_name: true,
      character_health: true,
      character_power: true,
      character_money: true,
      character_createdAt: true,
    },
  });

  return res.status(200).json({ data: character });
});

//** 캐릭터 삭제 API */
router.delete('/characters/:characterId', async (req, res, next) => {
  const { characterId } = req.params;

  const uncharacter = await prisma.characters.findUnique({
    where: {
      characterId: +characterId,
    },
  });
  if (!uncharacter) return res.status(400).json({ message: '캐릭터가 존재하지 않습니다.' });

  const character = await prisma.characters.delete({
    where: {
      characterId: +characterId,
    },
    select: {
      character_name: true,
    },
  });
  return res.status(200).json({ message: character });
});

export default router;
