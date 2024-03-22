
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(req:NextRequest){

    const path = req.nextUrl.pathname;

    console.log("pathname",path)

    const isPUblicPath = path === "/login" || path === "/signup" || path ==="verifyemail" ;  // thse are the public path


    let token = req.cookies.get("token")?.value || "";

    console.log("token",token);

    if(isPUblicPath && token){

        return NextResponse.redirect(new URL("/",req.nextUrl));

        // return NextResponse.redirect(new URL("/",req.nextUrl));


    }

    if(!isPUblicPath && !token){

        
        return NextResponse.redirect(new URL("/login",req.nextUrl));


    }



}



// see the matching paths 

export const config = {

    matcher:[

        "/",
        "/profile",
        "/login",
        "/signup",
        "/verifyemail"

    ]
    
}