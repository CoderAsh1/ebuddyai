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
    isSubscribed : {
        type : Boolean,
        default : false
    },
    subscriptionExpiresOn : {
        type : Date
    },
    isVerfied: {
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
    referralCode:{
        type : String,
        default : generateReferralCode()
    },
    refferedTo:[String],
    forgotPasswordToken: Number,
    forgotPasswordTokenExpiry: Number,
    verifyToken: Number,
    verifyTokenExpiry: Number,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;