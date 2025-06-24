import { Image } from './image.entity';


export class Todo {
  todo_id  : string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  Images : Image[];
}
