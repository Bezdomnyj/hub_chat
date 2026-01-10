import 'dotenv/config'
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { prisma } from './prisma/prisma.js'

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", ws => {
    try {
        console.log(prisma.user.findFirst());

        prisma.user.fields
    } catch (error) {
        prisma.$disconnect();
    }
    ws.on("message", msg => console.log("Messaggio ricevuto:", msg.toString()));
    ws.send("Benvenuto dal server WS!");
});

server.listen(3200, () => {
    console.log("Server backend su http://localhost:3200")
});
