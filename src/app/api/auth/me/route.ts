
import {connect} from "@/dbConfig/dbConfig";

import { NextRequest,NextResponse } from "next/server";

import User from "@/models/userModel";

import {getDataFromToken} from "@/helpers/accessDataFromToken";

connect();

export async function GET(req:NextRequest){


    try{

        const userId = await getDataFromToken(req);

        // find the user by using user id

        const userData = await User.findById(userId).select("-password");

        if(!userData){

            NextResponse.json({

                 status: 404,
                 message: "User not found"

            })

        }

        return NextResponse.json({

            message:"user data fetch successfully ",
            status:200,
            data:userData
        })

    }catch(error:any){

        console.log(error.message);

        return NextResponse.json({

            message:"some error occur while fetching user data",
            status:500,

        })

    }
}