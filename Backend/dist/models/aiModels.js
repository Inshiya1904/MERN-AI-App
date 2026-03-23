import mongoose from "mongoose";
const aiSchema = new mongoose.Schema({
    prompt: { type: String, required: true },
    response: { type: String, required: true },
}, { timestamps: true });
const AI = mongoose.model("AI", aiSchema);
export default AI;
