import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: '*' })

// @WebSocketGateway(8001, {
//   cors: { origin: 'https://guessing-game-frontend.onrender.com' },
// })
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: { name: string; message: string },
  ): void {
    // console.log(message);
    this.server.emit('message', message);
  }
}
