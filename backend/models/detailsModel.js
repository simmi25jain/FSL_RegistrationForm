import mongoose from "mongoose";

const DetailSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    guardianName: { type: String,  },
    guardianPhone: { type: Number,  },
    localAddress: { type: String, required: true },
    permanentAddress: { type: String,  },
    status: { type: String, required: true },
    student: { type: String, default: "student", required: true },
    qualification: { type: String,  },
    designation: { type: String,  },
    company: { type: String, },
    year: { type: Number,  },
    college: { type: String,  },
    course: { type: String, required: true },
    source: { type: String, required: true },
}, { timestamps: true });

const DetailModel = mongoose.model("detail", DetailSchema)

export default DetailModel