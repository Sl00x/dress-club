import { User } from '@/interfaces/user.interface';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  author: User;
  receiver: User;
  authorId: string;
  receiverId: string;
  message: string;
  createdAt: Date;
}

interface CreateMessageDto {
  authorId: string;
  receiverId: string;
  message: string;
}

interface ChatContextProps {
  users: User[];
  messages: Message[];
  sendMessage: (createMessageDto: CreateMessageDto) => void;
  joinRoom: (receiverId: string) => void;
  socket: Socket | null;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

const useProvideChat = (userId: string | undefined): ChatContextProps => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const newSocket = io(process.env.EXPO_PUBLIC_WS_URL || '');
      setSocket(newSocket);

      newSocket.emit('connectChat', { userId });

      newSocket.on('connectChat', (usersInvolved: User[]) => {
        setUsers(usersInvolved);
        setIsLoading(false);
      });

      newSocket.on('messageReceived', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      newSocket.on('messages', (newMessages: Message[]) => {
        setMessages(newMessages);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [userId]);

  const joinRoom = useCallback(
    (receiverId: string) => {
      if (socket) {
        socket.emit('joinRoom', { userId, receiverId });
        setMessages([]);
      }
    },
    [socket, userId]
  );

  const sendMessage = useCallback(
    (createMessageDto: CreateMessageDto) => {
      if (socket) {
        socket.emit('sendMessage', createMessageDto);
      }
    },
    [socket]
  );

  return { users, messages, sendMessage, joinRoom, socket, isLoading };
};

export const ChatProvider: React.FC<{
  userId: string;
  children: ReactNode;
}> = ({ userId, children }) => {
  const chat = useProvideChat(userId);
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
