import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
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
    subscriptionExpireOn : {
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
    createdAt :{
        type : Date,
        default : new Date()

    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;