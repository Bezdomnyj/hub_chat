# 🚀 Chat System — Real-Time Messaging Platform

Un sistema completo di **messaggistica istantanea** sviluppato con **React 19**, **TypeScript**, **Node.js**, **MongoDB**, **WebSocket**, **SSE**, **Nginx**, **Prisma** e **Vite**.  
L’app include chat in tempo reale, canali tematici, chiamate vocali, condivisione schermo e file sharing.

---

## Caratteristiche principali

### Chat in tempo reale
- Messaggistica istantanea con WebSocket
- Canali pubblici, privati e one-to-one
- Notifiche in tempo reale
- Indicatori *online/offline* e *sta scrivendo…*

### Condivisione di file
- Upload/download di documenti, immagini, video
- Preview diretta in-app
- Storage ottimizzato lato server

### Condivisione schermo
- Condivisione totale o finestra specifica
- WebRTC per bassa latenza

### Videochiamate
- Audio e video in tempo reale tramite WebRTC
- Sistema di sala / canali vocali

### Autenticazione e sicurezza
- Login tramite JWT
- Refresh token
- Ruoli utenti e permessi
- Rate limiting su Nginx

### Aggiornamenti real-time
- **WebSocket** per messaggi e presenza
- **Server-Sent Events (SSE)** per notifiche leggere
- **Fetch API** per operazioni REST

---

## Stack Tecnologico

### **Frontend**
| Tecnologia | 
|-----------|
| **React 19** | 
| **TypeScript** |
| **Vite** |
| **SCSS Modules** |
| **WebRTC** |

### **Backend**
| Tecnologia |
|-----------|
| **Node.js (TypeScript)** |
| **WebSocket** |
| **SSE** |
| **Fetch/REST** |
| **Prisma** | 
| **MongoDB** | 

### **Infrastruttura**
- HTTPS supportato
- Route separate per:
  - `/api` → backend Node
  - `/static` → file statici
  - `/ws` → WebSocket

