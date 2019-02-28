import socketIOClient from 'socket.io-client';
import {SOCKETLOCATION} from "../constants";

const socket = socketIOClient(SOCKETLOCATION);

export default socket;