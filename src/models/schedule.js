import mongoose from "mongoose";


const scheduleSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  schedules: [{
    day: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6],// 0 is Sunday
      required: true
    },
    startTime: {
      type: Number,
      required: true
    },
    endTime: {
      type: Number,
      required: true
    }
  }]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
