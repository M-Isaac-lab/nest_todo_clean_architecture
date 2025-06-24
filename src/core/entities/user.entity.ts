import { Todo } from './todo.entity';

export class User {
  user_id: string
  firstName: string
  lastName: string
  year: number | null
  email: string
  password : string
  token: string | null
  activate : boolean
  createdAt : Date
  updateAt  : Date
}
