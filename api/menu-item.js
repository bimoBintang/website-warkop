import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const menuItem = await prisma.menuItem.findMany();
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(500).json({ error: 'Menu item tidak ditemukan' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
