import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Comments from "./comments";


function NewsDetails() {
    const location = useLocation();
    const navigateToHome = useNavigate();

    return (
        <div className="container mx-auto p-4">
            {/* Marquee Section */}
            <div className="w-full overflow-hidden bg-gray-700 text-white py-2 rounded-lg mb-4">
                <marquee  direction="left" className="text-sm font-semibold">
                    💬 Engage with others! Leave a comment on your favorite news story! |
                    🗣️ Share your thoughts and see what others think! |
                    🏆 Highlight top comments and join trending discussions! |
                    ❤️ React to comments and let your voice be heard! |
                    🔥 Stay updated with the latest buzz in the community! |
                    ✍️ Your opinion matters – be part of the conversation! |
                    🤝 Connect with like-minded people and start meaningful discussions!
                </marquee>
            </div>

            <button
                onClick={() =>navigateToHome('/')}
                className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
            >
                ⬅ Back
            </button>

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
                        className="w-full h-96 object-cover rounded-lg shadow-md"
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
                    <Comments url={location.state.data.url}/>
                </div>
            </div>
        </div>
    );
}
export default NewsDetails;