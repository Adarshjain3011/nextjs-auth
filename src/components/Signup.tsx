// Make sure to import React

"use client "

import React, { useState } from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for useRouter

import axios from "axios";

export default function Signup() { // Corrected component name to start with uppercase letter

    const router = useRouter();
    const [userData, setUserData] = useState("");

    async function logoutHandler() {
        try {
            const response = await axios.get("http://localhost:3000/api/auth/logout");
            console.log(response);
            router.push("/signup");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function getUserInfo(){
            try {
                const userData = await axios.get("http://localhost:3000/api/auth/me");
                console.log("userData: ", userData?.data?.data);
                setUserData(userData?.data?.data?._id);
            } catch (error) {
                console.log(error);
            }
        }
        getUserInfo();
    }, []);

    return (
        <div>
            <h1>Welcome to signup page</h1>
            <h2 className="bg-yellow-600 text-xl">
                {userData === "" ? "Nothing" : userData}
            </h2>
            <button className="w-[200px] bg-red-600" onClick={logoutHandler}>Logout</button>
        </div>
    );
}

