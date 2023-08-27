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
  const [matchedVideos, setMatchedVideos] = useState([
    'https://www.youtube.com/watch?v=zzwRbKI2pn4&ab_channel=CarryMinati',
  ]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the searchQuery value, such as making an API call
    console.log('Search Query:', searchQuery);
  };

  return (
    <div>
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
      </div>

      <div className="flex justify-center items-center h-screen">
        <div>
          {matchedVideos.map((url, index) => (
            <div key={index} className="mb-1">
              {/* Render the YouTube video player here */}
              {/* Replace the placeholder iframe with your actual video player component */}
              <iframe width="420" height="315" src={url}></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
