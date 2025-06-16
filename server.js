import express from 'express';
import cors from 'cors';
import { PrismaClient } from './src/generated/prisma/index.js';

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/api/category', async (req, res) => {
    try {
        const category = await prisma.category.findMany();
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: " category tidak ditemukan"});
    }
});

app.get('/api/menu-item', async (req, res) => {
    try {
        const menuItem = await prisma.menuItem.findMany();
        res.json(menuItem);
    } catch (error) {
        res.status(500).json({ error: "menu-item tidak ditemukan"});
    }
});

app.get('/api/')

app.listen(4000, () => {
  console.log('API Server running on http://localhost:4000');
});
