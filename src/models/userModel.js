import moment from "moment";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        unique : false
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
    },
    phone:{
        type: String,
    },
    image:{
        type: String,
    },
    isSubscribed : {
        type : Boolean,
        default : false
    },
    subscriptionId:String,
    subscriptionName: String,
    subscriptionRenewsOn :Date,

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
        enum :["SSC", "JEE","NEET","OTHER"],
    },
    freeTill :{
        type : Number,
        default : moment().add(15,"d").unix(),
    },

    referralCode: String,
    refferedTo:[String],
    refferedBy : String,
    
    forgotPasswordToken: Number,
    forgotPasswordTokenExpiry: Number,
    verifyToken: Number,
    verifyTokenExpiry: Number,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;