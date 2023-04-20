import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Task } from 'src/tasks/tasks.schema';

@Schema({
  timestamps: true,
})
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({ unique: true, type: 'string' })
  username: string;

  @Prop()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task' })
  tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);
