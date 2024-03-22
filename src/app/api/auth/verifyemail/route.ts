import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(req: NextRequest) {
    try {
        console.log("Inside email verification");
        const reqBody = await req.json();
        console.log(reqBody);
        const { token } = reqBody;
        console.log("Token for email verification: ", token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() } // Corrected token expiry comparison
        });

        console.log("User found for email verification: ", user);

        if (!user) {
            return NextResponse.json({
                error: "Invalid token"
            }, { status: 400 });
        }

        console.log("Updating user's email verification status...");
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        console.log("User email verified successfully:", user._id);
        const updatedUser = await User.findById(user._id);

        return NextResponse.json({
            message: "Email verified successfully",
            data: updatedUser
        }, { status: 200 });
    } catch (error: any) {
        console.log("Error during email verification:", error.message);
        return NextResponse.json({
            error: "Email verification failed",
            message: error.message
        }, { status: 400 });
    }
}



