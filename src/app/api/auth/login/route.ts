import User from "@/models/userModel";
// import {connect} from "@/dbConfig/dbConfig";

import {connect} from "@/dbConfig/dbConfig"

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(req: NextRequest) {
    try {
        // Fetch the data
        const userData = await req.json();
        const { email, password } = userData;

        console.log(email,password);

        if (!email || !password) {
            const response = NextResponse.json({
                message: "All fields are not fulfilled",
                status: 400
            });
            return response;
        }

        const user = await User.findOne({ email });

        if (!user) {
            const response = NextResponse.json({
                message: "User not found",
                status: 401
            });
            return response;
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log("password is ",isPasswordValid);


        if (!isPasswordValid) {
            const response = NextResponse.json({
                message: "Invalid password",
                status: 401
            });
            return response;
        }

        // Create the token
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        const tokenSecret = process.env.token_secret || 'default_secret';

        const token = jwt.sign(tokenData, tokenSecret, { expiresIn: "4d" });


        console.log("token value ",token);

        const response = NextResponse.json({
            message: "Authentication successful",
            status: 200
        });


        console.log("")

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error:any) {

        console.error(error.message);

        const response = NextResponse.json({
            message: "Internal Server Error",
            status: 500
        });
        return response;
    }
}






