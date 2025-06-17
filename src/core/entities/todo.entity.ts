import { Image } from './image.entity';


export class Todo {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  Images : Image[];
}
