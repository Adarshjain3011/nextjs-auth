import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { sendEmail } from "@/helpers/mailer";

console.log(connect());

export async function POST(req: NextRequest) {
    
    try {
        const reqBody = await req.json();

        const { userName, email, password } = reqBody;

        // Check if user already exists


        const isExists = await User.findOne({ email });
        if (isExists) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Increase the salt rounds for better security

        // Create a new user


        const newUser = new User({
            name: userName,
            email: email,
            password: hashedPassword, // Store the hashed password

        });


        const savedUser = await newUser.save();

        console.log(newUser);


        // send verfication email notification

        await sendEmail(email,"VERIFY",savedUser._id);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,

        });
        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Something went wrong while creating the user",
                error: error.message, // Include the error message in the response
            },
            { status: 500 }
        );
    }
}








