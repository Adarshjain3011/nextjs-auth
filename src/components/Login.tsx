
"use client"

import React, { useState } from "react";

import axios from "axios";

import { useRouter } from 'next/navigation'

import Link from 'next/link';

export default function () {


    const router = useRouter();

    async function loginHandler() {

        try {

            const response = await axios.post("http://localhost:3000/api/auth/login", userDetails);

            console.log(response);

            router.push("/", { });


        }

        catch (error) {

            console.log(error);

        }
    }


    // async function logoutHandler() {

    //     try {

    //         const response = await axios.get("http://localhost:3000/api/auth/logout");

    //         console.log(response);

    //         router.push("/signup");


    //     }

    //     catch (error) {

    //         console.log(error);

    //     }

    // }

    const [userDetails, setUserDetails] = useState({ email: "", password: "" });

    return <div className="m-auto flex justify-center items-center min-h-screen">

        <div className="flex w-[300px] h-[250px] flex-col jus-center items-center gap-3 border-2 border-black p-3">

            <input type="email"
                placeholder="enter your email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />

            <input type="password" placeholder="enter your password" value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />


            <button className="bg-blue-600 w-[150px] p-2" onClick={loginHandler}>Login </button>

            <Link href="/signup">

                <div className="bg-blue-600 w-[150px] p-2">Move to Signup</div>

            </Link>

            {/* <Link href="/">

                <div className="bg-blue-600 w-[150px] p-2" onClick={logoutHandler}>Move to Logout</div>

            </Link> */}

        </div>


    </div>
}


