import React, { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { CircularProgress } from "@mui/material";

function Home(props) {

    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status

    const getNews = useCallback(() => {
        setLoading(true); // Set loading to true when fetching starts
        fetch(`https://newsapi.org/v2/everything?q=${props?.menu ? props.menu : "default"}&sortBy=popularity&apiKey=4e07be5763c44a839f58df9c4f8f7ede`)
            .then(res => res.json())
            .then(json => {
                setNewsData(json.articles);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(() => {
                setLoading(false); // Ensure loading is set to false even if there's an error
            });
    }, [props.menu]);

    useEffect(() => {
        getNews();
    }, [getNews]);

    return (
        <div className="bg-white/70 mt-36 mb-16 mx-auto px-4 sm:px-6 lg:px-[6rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (  
                <div className="col-span-3 text-center xl:mt-[16rem] lg:mt-[15rem] mt-[20rem]">
                    <CircularProgress />
                    <p className="font-bold">Loading...</p>
                </div>
            ) : (
                newsData && newsData.map((data, index) => {
                    return (
                        <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <img className="rounded-t-lg w-full h-48 object-cover" src={data.urlToImage} alt={data.title} />
                            <div className="p-5">
                                <a href={data.url}>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data?.title ?? ""}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data?.content ?? ""}</p>
                                <a href={data.url} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
Home.propTypes = {
    menu: PropTypes.string
};
export default Home;