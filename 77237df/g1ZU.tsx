// import { useQuery } from "@apollo/client"
// import { toast } from "react-toastify"

// const PHRASE_SEARCH=gql`
//   mutation PHRASE_SEARCH(
//     $phrase: String
//   ){
//     mutation searchPhrase(
//         phrase: $phrase
//     )
//   }
// `

// const [searchPhrase] = useQuery(PHRASE_SEARCH, {
//     onCompleted: matchedVideos => {
//         setMatchedVideos(matchedVideos)
//     },

//     onError: err => {
//         console.log(err)
//         toast.error(err.message)
//     }
// })

import { useState } from 'react';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the searchQuery value, such as making an API call
    console.log('Search Query:', searchQuery);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded-lg p-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="search"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Search:
          </label>
          <input
            type="text"
            id="search"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your search query"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex justify-center items-center h-screen">
        {currentVideoIndex < videos.length ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">
              Video {currentVideoIndex + 1}
            </h1>
            <div>
              {/* Render the YouTube video player here */}
              {/* Replace the placeholder iframe with your actual video player component */}
              <iframe
                title="YouTube Video Player"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videos[currentVideoIndex].id}?start=${currentTimestamp}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <form onSubmit={handleLoadVideoWithTimestamp} className="mt-4">
              <label
                htmlFor="timestamp"
                className="block text-gray-700 text-lg font-bold mb-2"
              >
                Load Video with Timestamp:
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="timestamp"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter the timestamp (e.g., 1m30s)"
                  value={currentTimestamp}
                  onChange={handleTimestampChange}
                />
                <button
                  type="submit"
                  className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                >
                  Load
                </button>
              </div>
            </form>
          </div>
        ) : (
          <h1 className="text-2xl font-bold">No more videos to load</h1>
        )}
      </div>
    </div>
  );
};

export default Page;
