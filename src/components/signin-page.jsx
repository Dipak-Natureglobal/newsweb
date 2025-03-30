import React from "react";
import font from '../images/news.jpg'
import logo from '../videos/singup.gif'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from "../firebase/setup"

function SingIn() {
    const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        }
        catch (err) {
            console.log(err)
        }
       
    }
    console.log(auth)
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#0d1114] h-screen">
        <div className="text-center">
            <img src={logo} className="h-20 mx-auto mt-32" />
            <h1 className="text-white text-3xl font-semibold mt-7">Sign In</h1>
            <button 
                onClick={googleSignIn} 
                type="button" 
                className="mt-14 text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 h-14 xl:w-96 lg:w-96 w-48">
                Sign In
            </button>
            <h2 className="text-blue-600 underline mt-7">Sign In Now</h2>
        </div>
    
        <div className="hidden md:flex justify-end">
            <img src={font} alt="" className="h-screen object-cover" />
        </div>
    </div>
    
    )
}

export default SingIn;