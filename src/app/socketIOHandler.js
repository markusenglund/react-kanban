import socketIOClient from 'socket.io-client';
const socketLocation = "localhost:8200/";

const socket = socketIOClient(socketLocation);

export default socket;