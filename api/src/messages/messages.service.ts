import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly userService: UserService,
  ) {}
  create(message: string, authorId: string, receiverId: string) {
    return this.messageRepository.save({ message, authorId, receiverId });
  }

  async getUsersInvolvedInMessages(userId: string): Promise<any[]> {
    console.log('uuid', userId);
    const messagesSent = await this.messageRepository.find({
      where: { authorId: userId },
      select: ['receiverId'],
    });

    const messagesReceived = await this.messageRepository.find({
      where: { receiverId: userId },
      select: ['authorId'],
    });

    const uniqueUserIds = new Set([
      ...messagesSent.map((message) => message.receiverId),
      ...messagesReceived.map((message) => message.authorId),
    ]);

    uniqueUserIds.delete(userId); // Exclude the current user's id

    const users = await Promise.all(
      Array.from(uniqueUserIds).map(async (id) => {
        return await this.userService.findOne(id);
      }),
    );

    return users.filter((user) => user);
  }
}
