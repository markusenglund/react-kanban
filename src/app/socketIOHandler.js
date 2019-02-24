import socketIOClient from 'socket.io-client';

const socket = socketIOClient("/");

export default socket;