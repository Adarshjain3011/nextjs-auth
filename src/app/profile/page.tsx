"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation"

export default function(){


    const router = useRouter();


    const [userData,setUserData] = useState("");



    async function logoutHandler() {

        try {

            const response = await axios.get("http://localhost:3000/api/auth/logout");

            console.log(response);

            router.push("/signup");


        }

        catch (error) {

            console.log(error);

        }

    }


    useEffect(()=>{

        async function getUserInfo(){


            let userData = await axios.get("http://localhost:3000/api/auth/me");

            console.log("userData: " , userData?.data?.data);

            setUserData(userData?.data?.data?._id);

        }


        getUserInfo();
        


    },[]);

    return <div>

        <h1>welcome to profile page </h1>

        <h2 className=" bg-yellow-600 text-xl">

            {userData === "" ? "Nothing" : <Link href={`/profile/${userData}`}>{userData}</Link>} 

        </h2>

        <button className="w-[200px] bg-red-600" onClick={logoutHandler}>Logout</button>

    </div>
}




