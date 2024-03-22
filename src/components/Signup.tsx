
"use client"

import axios from "axios";

import React, { useState } from "react";


import { useRouter } from 'next/navigation';



import Link from 'next/link';


export default function singnup(){


    const router = useRouter();


    async function singnUpHandler(){


        try{

            const response = await axios.post("http://localhost:3000/api/auth/signup",userDetails);
    
            console.log(response);

            router.push("/login");


        }

        catch(error){

            console.log(error);

        }


    }


    // const router = useRouter();

    const [userDetails,setUserDetails] = useState({userName :"",email:"" ,password:""});

    return <div className="m-auto flex justify-center items-center min-h-screen">

        <div className="flex w-[300px] h-[250px] flex-col jus-center items-center gap-3 border-2 border-black p-3">

            <input type="text" placeholder="enter your name" value={userDetails.userName}
             className="p-3 pl-4" onChange={(e)=> setUserDetails({...userDetails,userName:e.target.value})}/>

            <input type="email" value={userDetails.email}
                    placeholder="enter your email" onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/>

            <input type="password" placeholder="enter your password" value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/>


            <button className="bg-blue-600 w-[150px] p-2" onClick={singnUpHandler}>Sin in </button>
            
            <Link href="/login">

                <div className="bg-blue-600 w-[150px] p-2">Move to login</div>

            </Link>

            
        </div>      


    </div>
}






