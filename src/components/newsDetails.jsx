import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Comments from "./comments";
import LoginIcon from '@mui/icons-material/Login';
import dayjs from "dayjs";
import { auth } from "../firebase/setup";
import { signOut } from "firebase/auth";
import LogoutIcon from '@mui/icons-material/Logout';



function NewsDetails() {
    const location = useLocation();
    const navigateToHome = useNavigate();
    const navigateToSingup = useNavigate();
    useEffect(() => {
        if (!location.state || !location.state.data) {
            navigateToHome("/");
        }
    }, [location, navigateToHome]);

    if (!location.state || !location.state.data) {
        return null; // Don't render anything while redirecting
    }
    const logout = async () => {
            try {
                await signOut(auth);
                navigateToSingup('/singup');
            } catch (err) {
                console.log(err);
            }
        };
    

    return (
        <div className="container mx-auto p-4">
            {/* Marquee Section */}
            <div className="w-full overflow-hidden bg-gray-700 text-white py-2 rounded-lg mb-4">
                <marquee direction="left" className="text-sm font-semibold">
                    💬 Engage with others! Leave a comment on your favorite news story! |
                    🗣️ Share your thoughts and see what others think! |
                    🏆 Highlight top comments and join trending discussions! |
                    ❤️ React to comments and let your voice be heard! |
                    🔥 Stay updated with the latest buzz in the community! |
                    ✍️ Your opinion matters – be part of the conversation! |
                    🤝 Connect with like-minded people and start meaningful discussions!
                </marquee>
            </div>
            <div className="flex flex-row justify-between">
                <button
                    onClick={() => navigateToHome('/')}
                    className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
                >
                    ⬅ Back
                </button>
                {auth.currentUser ===null && <button
                    onClick={() => navigateToSingup('/singup')}
                    className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
                >
                    <LoginIcon color="success" /> Login
                </button>}
                {auth.currentUser !==null && <button
                    onClick={logout}
                    className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
                >
                    <LogoutIcon color="error" /> Logout
                </button>}
               
               
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-5 bg-white shadow-lg rounded-lg animate-fadeIn">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {location.state.data.title}
                    </h1>
                    <h4 className="text-lg text-gray-600 mb-4">
                        {location.state.data.description}
                    </h4>
                    <img
                        src={location.state.data.urlToImage || "/placeholder.jpg"}
                        alt={location.state.data.title}
                        className="w-full h-66 object-cover rounded-lg shadow-md"
                    />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(location.state.data.url, "_blank");
                        }}
                        className="my-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-transform transform hover:scale-105"
                    >
                        Read more
                        <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </button>
                </div>

                <div className="p-5 bg-gray-100 shadow-lg rounded-lg animate-fadeIn min-h-[40vh]">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
                    <Comments url={location.state.data.url} />
                </div>
            </div>

            <div className="w-full text-center mt-12">
                <p className="text-gray-500 text-sm">© {dayjs().year()} InsightPress. All rights reserved.</p>
            </div>
        </div>
    );
}
export default NewsDetails;