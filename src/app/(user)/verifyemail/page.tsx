
"use client"

import React,{useState,useEffect} from "react";

import axios from "axios";

import Link from "next/link";

import { useRouter } from "next/navigation";

export default function VerifyEmailPage(){

    const router = useRouter();

    const [token,setToken] = useState("");

    const [verified,setVerified] = useState("");

    const [error,setError] = useState(false);

    async function verifyEmail(token:any){


        try{

            console.log("token data ",token);

            let response = await axios.post("http://localhost:3000/api/auth/verifyemail",{ token });
    
            console.log(response);

            router.push("/login");



        }catch(error:any){

            console.log(error.message);

        }


    }



    useEffect(()=>{

        const token = window.location.search.split("=")[1]; // for to fetch the token from frontend url 

        setToken(token);

    },[]);


    useEffect(()=>{

        if(token.length >0){

            verifyEmail(token);

        }


    },[token || ""]);



    return <div>

        <h1>welcome to verify email page </h1>


        <p className="text-2xl bg-zinc-700 w-[300px]">{token?.length >0 ? token :"not token "}</p>

    </div>
    
}

