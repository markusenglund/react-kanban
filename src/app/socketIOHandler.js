import socketIOClient from 'socket.io-client';

const socket = socketIOClient("localhost:8200");

export default socket;