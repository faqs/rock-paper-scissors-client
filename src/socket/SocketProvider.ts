import { io, Socket } from 'socket.io-client';
import { SERVICE_URL } from '@/config';
import { ServerToClientEvents } from '@/api/interfaces/socket.interface';

const socket: Socket<ServerToClientEvents> = io(SERVICE_URL);

export default socket;
