import { useState } from 'react';

const Page = () => {
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
    console.log(inputs);
  };

  return (
    <div className="flex justify-center items-center h-screen">
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
              className="border rounded py-2 px-3 mr-2 leading-tight focus:outline-none focus:shadow-outline"
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
  );
};

export default Page;
