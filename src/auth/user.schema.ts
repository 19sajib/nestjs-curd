import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
    timestamps: true,
})
export class User {  
    _id: mongoose.Types.ObjectId;

    @Prop({ unique: true, type: 'string'})
    username: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)