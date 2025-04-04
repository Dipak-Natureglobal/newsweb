import React, { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, InputAdornment, TextField, Button } from "@mui/material";
import NoData from "../images/noData.svg";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close'; 
import ErrorImage from "../images/error.svg"
import { database } from "../firebase/setup";
import { doc, setDoc } from "firebase/firestore";
import DNews1 from "../images/dnews1.png"
import DNews2 from "../images/dnews2.png"
import DNews3 from "../images/dnews3.png"
import DNews4 from "../images/dnews4.png"
import DNews5 from "../images/dnews5.png"
import DNews6 from "../images/dnews6.png"
import DNews7 from "../images/dnews7.png"
import DNews8 from "../images/dnews8.png"
import DNews9 from "../images/dnews9.png"
import DNews10 from "../images/dnews10.png"

function Home(props) {

    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");




    const addnews = async (data) => {
        const newsDoc = doc(database, "News", `${data.url.substr(-10, 10)}`);
        try {
            await setDoc(newsDoc, {
                title: data.title,
                description: data.description
            })

        } catch (err) {
            console.log(err)
        }

    }
    const defaultImages = [DNews1, DNews2, DNews3, DNews4, DNews5, DNews6, DNews7, DNews8, DNews9, DNews10];
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
            "6a761d803b88960eb9b2c6d072258a71",
            "795145d25e6093880ccc57917f7aa80b",
            "081b56565f1f5872e9cfc85418fd43c9",
            "7e1c9d6ae1f6579fdebc152d81421517",
            "6a73a3731038924162174c6fad7b411e",
            "1297fcca79837da77470e200f8a58373",
            "eac0f172d397b0352f6f89ae176aa8c4",
            "45455d3fbd5be312f48a7f15d614458a",
            "959507aa4e8f45c66321fef7796e3649",
            "5bd9a64bd15a97319547339ee0fe6511",
            "153d6c68a3d28e7ab463b0d16a700672",
            "4797987e22ced41a9856acdf8333d58a",


        ];
        const getRandomApiKey = () => {
            const randomIndex = Math.floor(Math.random() * apiKeys.length);
            return apiKeys[randomIndex];
        };
        const apiKey = getRandomApiKey();
        fetch(`https://api.mediastack.com/v1/news?keywords=${props?.menu ? props.menu : "all"}&access_key=${apiKey}`)
            .then(res => res.json())
            .then(json => {
                if (json.status === 'error' && json.code === 'usage_limit_reached') {

                    setError("Oops! You've hit the request limit. Please try again in a few minutes.");
                } else {
                    setNewsData(json.data);
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
                <div className="flex justify-center mb-4">
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
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <CloseIcon
                          onClick={() => handleSearchChange({ target: { value: "" } })}
                          className="cursor-pointer"
                          style={{ color: "#1976d2" }}
                        />
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
                ) : !newsData  ? (
                    <div className="col-span-3 text-center">
                        <img src={ErrorImage} alt="No Data Found" width={400} height={400} className="mx-auto mb-0  xl:mt-0 lg:mt-0 mt-[5.5rem]" />
                        <p className="text-xl font-semibold text-red-500">Oops! You&rsquo;ve hit the request limit. Please try again in a few minutes.</p>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={getNews}
                            sx={{
                                mt: 1,
                                mb:10,
                                backgroundColor: "#000000",  // Black background color
                                '&:hover': {
                                    backgroundColor: "#333333",  // Slightly lighter black for the hover effect
                                }
                            }}

                        >
                            Retry
                        </Button>
                    </div>
                ) : (
                    filteredNews && filteredNews.map((data, index) => (

                        <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

                            <img
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(data.url, "_blank");
                                }}
                                className="rounded-t-lg w-full h-48 object-cover cursor-pointer"
                                src={data.image !== null ? data.image : defaultImages[Math.floor(Math.random() * defaultImages.length)]}

                                alt={data.title}
                            />

                            <div className="p-5">

                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {data?.title ?? ""}
                                </h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {data?.description ?? ""}
                                </p>
                                <Link onClick={() => addnews(data)} to="/details" key={index} state={{ data: data }}>
                                    <button


                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        View Comments
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
                                </Link>
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
