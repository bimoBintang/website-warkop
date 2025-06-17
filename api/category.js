import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const category = await prisma.category.findMany();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Category tidak ditemukan' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
