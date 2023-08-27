import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

const FormComponent = () => {
  const [inputs, setInputs] = useState(['']);

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or data processing here
    const PROCESS_YOUTUBE_VIDEOS = gql`
      mutation Process_Youtube_Videos($videos: [Video!]!) {
        processVideos(videos: $videos)
      }
    `;
    const youtubeUrlRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|music\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const videos = inputs.map((url) => ({
      id: youtubeUrlRegex.exec(url)?.[1],
    }));

    const [initGiveaway] = useMutation(INIT_SPACE_GIVEAWAY, {
      onCompleted: (spaceId) => {
        toast.success('Giveaway Initiated for this space successfully');
      },
      onError: (error) => {
        console.log(error);
        toast.error(
          error.message ||
            'Something went wrong! Maybe your input was not correct.'
        );
      },
    });

    const [] = useMutation(PROCESS_YOUTUBE_VIDEOS, {
      onCompleted: (processed) => {
        toast.success(
          process ? 'Videos has been processed' : "Vidoes couldn't processed"
        );
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {inputs.map((input, index) => (
            <div className="mb-4" key={index}>
              <input
                type="text"
                value={input}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Enter YouTube video URL"
                className="text-black border rounded py-2 px-3 mr-2 leading-tight focus:outline-none focus:shadow-outline"
              />
              {index === inputs.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddInput}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  +
                </button>
              )}
              {index !== inputs.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveInput(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  -
                </button>
              )}
            </div>
          ))}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Process Videos
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
