import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
}, { _id: false });

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [optionSchema], required: true },
  category: { type: String, default: 'general' },
  difficulty: { type: String, enum: ['easy','medium','hard'], default: 'easy' }
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
