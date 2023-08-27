import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Videos = ({ searchQuery }: any) => {
  const PHRASE_SEARCH = gql`
    query ($phrase: String!) {
      searchPhrase(phrase: $phrase) {
        videoId
        timeInSec
      }
    }
  `;

  const { data, error, loading } = useQuery(PHRASE_SEARCH, {
    variables: { phrase: searchQuery },
  });

  if (loading) return null;
  console.log('HELLO');
  if (error) {
    toast.error(error.message);
  }

  console.log(data);
  return (
    <div>
      {data.searchPhrase.map((video: any) => {
        return <Video videoId={video.id} startTimeInSec={video.timeInSec} />;
      })}
    </div>
  );
};
const Video = ({ videoId, startTimeInSec }: any) => {
  return (
    <div key={videoId} className="mb-1">
      {/* Render the YouTube video player here */}
      {/* Replace the placeholder iframe with your actual video player component */}
      <iframe
        width="300"
        height="200"
        src={`https://www.youtube.com/embed/${videoId}?start=${startTimeInSec}`}
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  );
};

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loadVidoes, setLoadVidoes] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoadVidoes(true);
    // Do something with the searchQuery value, such as making an API call
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
        {loadVidoes ? <Videos searchQuery={searchQuery} /> : null}
      </div>
    </div>
  );
};

export default Page;
