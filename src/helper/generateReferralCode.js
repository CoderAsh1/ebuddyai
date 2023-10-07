import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export async function generateReferralCode() {
    await connect()
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let referralCode = '';
  
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralCode += characters.charAt(randomIndex);
    }

    let user = User.findOne({referralCode})

    if(!user){
        return referralCode.toUpperCase();
    }
    generateReferralCode()
  }