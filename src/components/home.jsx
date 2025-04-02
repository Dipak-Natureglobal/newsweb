import React, { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, InputAdornment, TextField, Button } from "@mui/material";
import NoData from "../images/noData.svg";
import { Link } from "react-router-dom";
import ErrorImage from "../images/error.svg"
import { database } from "../firebase/setup";
import { doc, setDoc } from "firebase/firestore";

function Home(props) {

    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");

    

    const addnews = async (data) => {
        const newsDoc=doc(database, "News",`${data.url.substr(-10,10)}`);
        try {
            await setDoc(newsDoc,{
                title:data.title,
                description:data.description
            })

        } catch (err) {
            console.log(err)
        }

    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredNews = newsData?.filter((data) =>
        data.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getNews = useCallback(() => {
        setLoading(true);
        setError("");
        const apiKeys = [
            "f4f24631b8794156aeea0bec12b39c6a",
            "4e07be5763c44a839f58df9c4f8f7ede",
            "ebb6c92a82fd42e983aabce9baea7916"
        ];
        const getRandomApiKey = () => {
            const randomIndex = Math.floor(Math.random() * apiKeys.length);
            return apiKeys[randomIndex];
        };
        const apiKey = getRandomApiKey();
        fetch(`https://newsapi.org/v2/everything?q=${props?.menu ? props.menu : "default"}&sortBy=popularity&apiKey=${apiKey}`)
            .then(res => res.json())
            .then(json => {
                if (json.status === 'error' && json.code === 'rateLimited') {

                    setError("Oops! You've hit the request limit. Please try again in a few minutes.");
                } else {
                    setNewsData(json.articles);
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(err ?? "Something went wrong. Please try again later.");
                setLoading(false);
            });
    }, [props.menu]);

    useEffect(() => {
        getNews();
    }, [getNews]);

    return (
        <div className="bg-white/70 mt-36 mb-16 mx-auto px-4 sm:px-6 lg:px-[6rem]">
            {!loading && !error && (
                <div className="flex justify-center mb-4 ">
                    <TextField
                        variant="outlined"
                        placeholder="Filter articles by title..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        className="max-w-lg rounded-lg shadow-white bg-white/70"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "20px",
                            },
                            "& .MuiInputAdornment-root": {
                                color: "#1976d2",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#1976d2",
                            },
                        }}
                    />
                </div>
            )}

            {/* News Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:min-h-[80vh] lg:min-h-[80vh] md:min-h-[70vh] min-h-[60vh]">
                {loading ? (
                    <div className="col-span-3 flex justify-center items-center xl:mt-[15rem] lg:mt-[15rem] mt-[10rem] ">
                        <div className="text-center ">
                            <CircularProgress />
                            <p className="font-bold">Loading...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="col-span-3 text-center">
                        <img src={ErrorImage} alt="No Data Found" width={400} height={400} className="mx-auto mb-0  xl:mt-0 lg:mt-0 mt-[5.5rem]" />
                        <p className="text-xl font-semibold text-red-500">{error}</p>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={getNews}
                            sx={{
                                mt: 2,
                                backgroundColor: "#000000",  // Black background color
                                '&:hover': {
                                    backgroundColor: "#333333",  // Slightly lighter black for the hover effect
                                }
                            }}

                        >
                            Retry
                        </Button>
                    </div>
                ) : filteredNews && filteredNews.length === 0 ? (
                    <div className="col-span-3 text-center">
                        <img src={NoData} alt="No Data Found" width={450} height={450} className="mx-auto mb-2 xl:mt-0 lg:mt-0 mt-6" />
                        <p className="text-xl font-semibold">No results found based on your filter criteria.</p>
                    </div>
                ) : (
                    filteredNews && filteredNews.map((data, index) => (

                        <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <Link onClick={()=>addnews(data)} to="/details" key={index} state={{ data: data }}>
                                <img
                                    className="rounded-t-lg w-full h-48 object-cover"
                                    src={data.urlToImage}
                                    alt={data.title}
                                />
                            </Link>
                            <div className="p-5">

                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {data?.title ?? ""}
                                </h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {data?.content ?? ""}
                                </p>

                                <button

                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(data.url, "_blank");
                                    }}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                        </div>

                    ))
                )}
            </div>
        </div >
    );
}

Home.propTypes = {
    menu: PropTypes.string
};

export default Home;
