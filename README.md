# App Ricette di Cucina

Un'applicazione web moderna per gestire le tue ricette di cucina preferite.

## Requisiti di Sistema

- Node.js (versione 16 o superiore)
- npm (Node Package Manager)
- MongoDB

## Setup del Progetto

1. Installa Node.js da [https://nodejs.org/](https://nodejs.org/)
2. Verifica l'installazione eseguendo:
   ```bash
   node --version
   npm --version
   ```
3. Clona il repository
4. Installa le dipendenze:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
5. Avvia l'applicazione:
   ```bash
   # Terminale 1 - Backend
   cd backend
   npm run dev
   
   # Terminale 2 - Frontend
   cd frontend
   npm install
   rm -rf node_modules/.vite
   npm run dev
   ```

## Tecnologie Utilizzate

- Frontend:
  - React + TypeScript
  - Vite
  - TailwindCSS
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Multer (per la gestione delle immagini)

## Funzionalità

- Creazione e modifica di ricette
- Upload di immagini per ogni ricetta
- Categorizzazione delle ricette
- Ricerca delle ricette
- Interfaccia utente moderna e responsive 
