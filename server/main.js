import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.get('/', async (req, res) => {
    res.status(200).json({status: "OK"})
})