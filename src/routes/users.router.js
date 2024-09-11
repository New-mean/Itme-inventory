import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/middleware.js';

const router = express.Router();

/** 사용자 회원가입 API **/
router.post('/signup', async (req, res, next) => {
  const { id, password, repassword, name } = req.body;
  if (!/^[a-z0-9]+$/.test(id))
    return res
      .status(400)
      .json({ message: '아이디는 영문과 숫자의 조합이어야 합니다.' });

  if (password.length < 6)
    return res.status(409).send({ message: '비밀번호를 다시 작성해주세요.' });

  const isExistUser = await prisma.users.findFirst({
    where: {
      id,
    },
  });
  if (!id || !password)
    return res
      .status(400)
      .json({ message: 'id, password는 필수입력 사항입니다.' });
  if (isExistUser) {
    return res.status(409).json({ message: '이미 존재하는 아이디입니다.' });
  }

  if (password !== repassword) {
    return res.status(409).send({ message: '비밀번호가 일치하지 않습니다.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: { id, password: hashedPassword, repassword: hashedPassword, name },
  });

  return res.status(201).json({ data: { id, name } });
});

//** 로그인 API **/
router.post('/login', async (req, res, next) => {
  const { id, password } = req.body;
  const user = await prisma.users.findFirst({ where: { id } });

  if (!user)
    return res.status(401).json({ message: '존재하지 않는 이메일입니다.' });
  else if (!(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });

  const token = jwt.sign(
    {
      userId: user.userId,
    },
    'custom-secret-key',
  );

  // authotization 쿠키에 Berer 토큰 형식으로 JWT를 저장합니다.
  res.cookie('authorization', `Bearer ${token}`);
  return res.status(200).json({ message: '로그인 되었습니다.' });
});

/** User 조회 API */
router.get('/users', authMiddleware, async (req, res, next) => {
  const { userId } = req.user;

  const user = await prisma.users.findFirst({
    where: { userId: +userId },
    select: {
      userId: true,
      id: true,
      name: true,
      createdAt: true,
    },
  });
  return res.status(200).json({ data: user });
});
export default router;
