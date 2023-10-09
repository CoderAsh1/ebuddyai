import moment from "moment";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    phone:{
        type: String,
        required: [true, "Please provide a phone number"],
    },
    isSubscribed : {
        type : Boolean,
        default : false
    },
    subscriptionExpiresOn : {
        type : Date
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    hasCompanion : {
        type : Boolean,
        default : false
    },
    companion :{
        type : String,
        enum :["SSC", "JEE","NEET"],
    },
    freeTill :{
        type : Number,
        default : moment().add(10,"d").unix(),
    },
    referralCode: String,
    refferedTo:[String],
    refferedBy : String,
    
    forgotPasswordToken: Number,
    forgotPasswordTokenExpiry: Number,
    verifyToken: Number,
    verifyTokenExpiry: Number,
})

const User = mongoose?.models?.users || mongoose.model("users", userSchema);

export default User;