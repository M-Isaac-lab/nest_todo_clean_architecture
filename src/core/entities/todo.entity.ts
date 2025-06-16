import { User } from './user.entity';
import { Image } from './image.entity';

export class Todo {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  Image: Image;
  user: User;
}
