import mongoose from "mongoose";
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  user_id: { type: String },
  meetingCode: { type: String, required: true },
  date: { type: Date, default: Date.now, require: true },
});

const Meeting = mongoose.model("Meeting", meetingSchema);

export { Meeting };
