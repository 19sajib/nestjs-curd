import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from './task-status.enum';
import mongoose from 'mongoose';
import { User } from 'src/auth/user.schema';
import { Exclude } from 'class-transformer';

@Schema({
  timestamps: true,
})
export class Task {
  _id: mongoose.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: TaskStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Exclude({ toPlainOnly: true })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
