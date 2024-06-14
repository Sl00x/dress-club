import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  serveClient: false,
  cors: {
    origin: `*`,
  },
  maxHttpBufferSize: 1e8,
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly messageService: MessagesService,
  ) {}

  @SubscribeMessage('connectChat')
  async handleJoinChat(
    @MessageBody('userId') userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit(
      `connectChat`,
      await this.messageService.getUsersInvolvedInMessages(userId),
    );
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { userId: string; receiverId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    client.join(this.getRoomName(data.userId, data.receiverId));
    const messages = await this.messageRepository.find({
      where: [
        { authorId: data.userId, receiverId: data.receiverId },
        { authorId: data.receiverId, receiverId: data.userId },
      ],
      relations: { author: true, receiver: true },
      order: {
        created_at: 'ASC',
      },
    });

    client.emit('messages', messages);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody()
    createMessageDto: { authorId: string; receiverId: string; message: string },
    //@ConnectedSocket() client: Socket,
  ): Promise<void> {
    const message = await this.messageRepository.save(createMessageDto);
    const room = this.getRoomName(
      createMessageDto.authorId,
      createMessageDto.receiverId,
    );
    this.server.to(room).emit('messageReceived', message);
  }

  // @SubscribeMessage('deleteMessage')
  // async handleDeleteMessage(
  //   @MessageBody() deleteMessageDto: DeleteMessageDto,
  //   @ConnectedSocket() client: Socket,
  // ): Promise<void> {
  //   await this.messagesService.deleteMessage(deleteMessageDto.messageId);
  //   const room = this.getRoomName(
  //     deleteMessageDto.authorId,
  //     deleteMessageDto.receiverId,
  //   );
  //   this.server.to(room).emit('messageDeleted', deleteMessageDto.messageId);
  // }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  private getRoomName(authorId: string, receiverId: string): string {
    return [authorId, receiverId].sort().join('_');
  }
}
