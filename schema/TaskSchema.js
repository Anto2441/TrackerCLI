import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Task name is required'],
      trim: true,
      minlength: [3, 'Task name must be at least 3 characters long'],
    },
    detail: {
      type: String,
      required: [true, 'Task detail is required'],
      trim: true,
      maxlength: [500, 'Task detail cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: ['completed', 'pending'],
      default: 'pending',
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => nanoid(10),
    },
  },
  { timestamps: true }
);

// Add a status index to optimize searches
TaskSchema.index({ status: 1 });

const Tasks = mongoose.model('Tasks', TaskSchema);

export default Tasks;
