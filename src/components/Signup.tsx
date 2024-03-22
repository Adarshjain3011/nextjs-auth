
"use client"

import axios from "axios";

import React, { useState } from "react";


import { useRouter } from 'next/navigation'



import Link from 'next/link';


export default function singnup(){
    
    
    const router = useRouter();

    const [UserDetails,SetUserDetails] = useState({userName :"",email:"" ,password:""});


    async function SingnUpHandler(){


        try{

            const response = await axios.post("https://nextjs-auth-vert-theta.vercel.app/api/auth/signup",UserDetails);
    
            console.log(response);

            router.push("/login");


        }

        catch(error){

            console.log(error);

        }


    }


    // const router = useRouter();


    return <div className="m-auto flex justify-center items-center min-h-screen">

        <div className="flex w-[300px] h-[250px] flex-col jus-center items-center gap-3 border-2 border-black p-3">

            <input type="text" placeholder="enter your name" value={UserDetails.userName}
             className="p-3 pl-4" onChange={(e)=> SetUserDetails({...UserDetails,userName:e.target.value})}/>

            <input type="email" value={UserDetails.email}
                    placeholder="enter your email" onChange={(e)=>SetUserDetails({...UserDetails,email:e.target.value})}/>

            <input type="password" placeholder="enter your password" value={UserDetails.password} onChange={(e)=>SetUserDetails({...UserDetails,password:e.target.value})}/>


            <button className="bg-blue-600 w-[150px] p-2" onClick={SingnUpHandler}>Sin in </button>
            
            <Link href="/login">

                <div className="bg-blue-600 w-[150px] p-2">Move to login</div>

            </Link>

            
        </div>      


    </div>
}






