import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
    todo: string;
}

const TodoSchema = new Schema<ITodo>({
    todo: { type: String, required: true }
}, { timestamps: true });
export const Todo = mongoose.model<ITodo>('Todo', TodoSchema);
