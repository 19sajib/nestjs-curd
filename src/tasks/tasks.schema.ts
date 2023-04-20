import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from './task-status.enum';
import mongoose from 'mongoose';

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
    status: TaskStatus
}

export const TaskSchema = SchemaFactory.createForClass(Task)