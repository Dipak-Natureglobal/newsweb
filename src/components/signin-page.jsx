import React from "react";
import font from '../images/news.jpg'
import logo from '../videos/singup.gif'
import googleIcon from '../images/gooleIcon.png'
import { signInWithPopup } from 'firebase/auth'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { auth, googleProvider } from "../firebase/setup"
import dayjs from 'dayjs';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SingIn() {


    const navigateToHome = useNavigate();

    const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            auth.currentUser && navigateToHome("/")
        }
        catch (err) {
            toast.error("Oops! Something went wrong. Try again later.");
            console.log(err)
        }

    }
    console.log(auth)
    return (


        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#0d1114] min-h-[100vh] relative">
            <div className="text-center">
                <marquee direction="left" className="text-lg font-semibold bg-gradient-to-r text-white/70 mt-0">
                    Stay updated with the latest news, connect with others, share your thoughts in real-time, and be part of the conversation!
                </marquee>


                <img src={logo} className="h-24 mx-auto mt-32" />
                <h1 className="text-white/60 text-3xl font-semibold mt-5">InsightPress</h1>
                <p className="text-white/60 text-lg">Get the Headlines. Share Your Thoughts.</p>
                <p className="text-white/60 text-xs">Where News Meets Conversation.</p>
                <button
                    onClick={googleSignIn}
                    type="button"
                    className="mt-14 text-lg text-gray-900 bg-gradient-to-r from-red-300 via-red-300 to-yellow-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-200 font-bold rounded-lg px-5 py-2.5 text-center me-2 mb-2 h-14 xl:w-96 lg:w-96 w-48"
                >
                    Sign up
                </button>

                <span className="flex items-center justify-center space-x-2 mt-7 flex-col xl:flex-row lg:flex-row ">
                    <img src={googleIcon} width={50} height={50} className="xl:my-0 lg:my-1 my-2" />
                    <h2 className="text-white/60">
                        Already have an account?
                        <strong onClick={googleSignIn} className="text-blue-700 underline cursor-pointer mx-1">Sign in</strong>
                    </h2>
                </span>
                <div className="mb-36 mt-4">
                    <Link to="/"> <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-300 via-red-300 to-yellow-300 group-hover:from-red-300 group-hover:via-red-300 group-hover:to-yellow-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-200">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Take me home
                        </span>
                    </button>
                    </Link>
                </div>


            </div>


            <div className="hidden md:flex justify-end">
                <img src={font} alt="" className="h-screen object-cover" />
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 text-white/60 text-xs p-4 w-full bg-[#0d1114] z-10">
                <div className="flex xl:items-start xl:justify-start lg:items-start lg:justify-start items-center justify-center space-x-2">
                    <p>Copyright © {dayjs().year()} Dipak Mourya</p>
                    <p>•</p>
                    <p>Developed by <a href="https://dipakdev.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-500 font-bold">Dipak</a></p>
                </div>
            </div>
            <ToastContainer
                autoClose={4000}
                position="bottom-right"
                className="mb-6 mr-6" />
        </div>

    )
}

export default SingIn;