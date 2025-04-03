import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { auth, database } from "../firebase/setup";
import { ToastContainer, toast } from "react-toastify";
import defaultProfile from "../images/defaultProfile.png"

function Comments(props) {
    const [comments, setComments] = useState("");
    const [newsComments, setNewsComments] = useState([]);
    const [error, setError] = useState("");

    // Add comment handler
    const handleAddComment = () => {
        if (comments.trim() === "") {
            setError("Please enter a comment.");
            return;
        }
        setError("");
        addComment();
    };

    // Function to add a comment to Firestore
    const addComment = async () => {
        if (auth.currentUser === null) {
            toast.error("Please log in to continue. Kindly log in to access this feature.");
            return;
        }

        const newsDoc = doc(database, "News", `${props.url.substr(-10, 10)}`);
        const commentsRef = collection(newsDoc, "Comments");

        try {
            await addDoc(commentsRef, {
                comments: comments,
                name: auth.currentUser.displayName,
                profileImg: auth.currentUser.photoURL
            });

            toast.success("Your comment has been posted successfully!");
            setComments(""); 
            showAllComments();
        } catch (err) {
            console.log(err);
            toast.error("Failed to post comment. Please try again.");
        }
    };

    const showAllComments = async () => {
        const newsDoc = doc(database, "News", `${props.url.substr(-10, 10)}`);
        const commentsRef = collection(newsDoc, "Comments");

        try {
            const data = await getDocs(commentsRef);
            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setNewsComments(filterData);
        } catch (err) {
            console.log(err);
            toast.error("Failed to load comments. Please try again.");
        }
    };

    useEffect(() => {
        if (props.url) {
            showAllComments();
        }
    }, [props.url]); 

    return (
        <div className="grid grid-row-2">
            {console.log(newsComments)}
            <div className="mb-4">
                <label htmlFor="comment" className="block mb-2 text-lg font-semibold text-gray-700">
                    📝 Share Your Thoughts
                </label>
                <div className="flex flex-row gap-2">
                    <input
                        onChange={(e) => setComments(e.target.value)}
                        type="text"
                        id="comment"
                        className="bg-white border text-sm rounded-lg focus:ring-blue-500 
                        block w-2/3 p-3 shadow-sm"
                        placeholder="Write your comment here..."
                        required
                        value={comments}
                    />
                    <button
                        onClick={handleAddComment}
                        type="button"
                        className="text-white text-sm rounded-lg focus:ring-blue-500 
                        block p-3 shadow-sm bg-blue-600 hover:bg-blue-700"
                    >
                        ADD
                    </button>
                    
                </div>
                {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
            </div>

            <div className="p-5 bg-white shadow-md rounded-lg">
                {newsComments.length > 0 ? (
                    newsComments.map((data, index) => (
                        <div key={index} className="flex items-start space-x-4 border-b py-3">
                            {/* Profile Image */}
                            <div className="relative">
                                <img
                                    className="w-12 h-12 rounded-full border border-gray-300 shadow-sm object-cover"
                                    src={data?.profileImg ?? defaultProfile}
                                    alt="User Profile"
                                />
                                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                            </div>

                            {/* Comment Content */}
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>
                                <p className="text-gray-700 text-sm bg-gray-100 p-3 rounded-lg shadow-sm">
                                    {data.comments}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
                )}
            </div>

            <ToastContainer autoClose={6000} position="bottom-right" className="!bottom-5 !right-5" />
        </div>
    );
}

Comments.propTypes = {
    url: PropTypes.string.isRequired
};

export default Comments;
