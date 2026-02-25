import { WebSocketServer } from 'ws';
import net from 'net';

const wss = new WebSocketServer({ port: 3000 });
let figmaSocket = null;

wss.on('connection', (ws) => {
  console.log('✅ Figma Plugin Connected');
  figmaSocket = ws;
});

// Start a TCP server that OpenCode can 'pipe' into
const tcpServer = net.createServer((socket) => {
  socket.on('data', (data) => {
    if (figmaSocket) {
      figmaSocket.send(data.toString());
      console.log('🚀 Code sent to Figma');
    } else {
      console.log('❌ Figma Plugin not connected');
    }
  });
});

tcpServer.listen(3001, '127.0.0.1'); // OpenCode talks to this port
console.log('Bridge active. Plugin on 3000, OpenCode on 3001');