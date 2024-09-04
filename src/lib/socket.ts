// lib/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000'); // Adjust the URL to your backend

export default socket;
