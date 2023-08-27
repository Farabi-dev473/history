import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const HoldingRequirment = ({dataId, numOfNFT, collection, trait, handleOnChange, handleOnClick}) => {
  return   <div className="mb-4">
  <h2 className="text-xl mb-2">Holding Requirements</h2>
  <div className="bg-gray-200 p-4 rounded-md">
    <div className="flex">

      <div className="flex-1 mb-4">
        <label for="nft" className="block font-bold mb-1 text-gray-700"
          >NFT</label
        >
       
        <input
          type="number"
          name='nft'
          id={dataId}
          placeholder="1"
          className="w-full px-4 py-2 border border-gray-300 rounded text-black"
          value={numOfNFT}
          onChange={handleOnChange}
        />
      </div>

      <div className="flex-1 ml-4 mb-4">
        <label
          for="collection"
          className="block font-bold mb-1 text-gray-700"
          >Collection</label
        >
        <select
          name="collection"
          id={dataId}
          className="w-full px-4 py-2 border border-gray-300 rounded text-black"
          value={collection}
          onChange={handleOnChange}
        >
          <option value="Any">Any</option>
          <option value="okay bears">okay bears</option>
          <option value="moonly">moonly</option>
        </select>
      </div>

      <div className="flex-1 ml-4 mb-4">
        <label for="trait" className="block font-bold mb-1 text-gray-700"
          >Trait</label
        >
        <select
          name="trait"
          id={dataId}
          className="w-full px-4 py-2 border border-gray-300 rounded text-black"
          value={trait}
          onChange={handleOnChange}
        >
          <option value="any">Any</option>
          <option value="crown">Crown</option>
        </select>
      </div>

      <div>
      <button type="button"  id={dataId} className="text-gray-500   hover:text-gray-700 rounded-sm w-6 h-6" onClick={handleOnClick} >
<svg id={id} 
xmlns="http://www.w3.org/2000/svg"
className="h-6 w-6"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
>
<path id={dataId}
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth={2}
  d="M6 18L18 6M6 6l12 12"
/>
</svg>
</button>              </div>
    </div>
    {/* <div className="flex"> */}

      {/* <div className="flex-1 mb-4">
        <label for="nft" className="block font-bold mb-1 text-gray-700"
          >NFT</label
        >
        <input
          type="number"
          id="nft"
          className="w-full px-4 py-2 border border-gray-300 rounded text-black"
        />
      </div>

      <div className="flex-1 ml-4 mb-4">
        <label
          for="collection"
          className="block font-bold mb-1 text-gray-700"
          >Collection</label
        >
        <select
          name="collection"
          id="collection"
          className="w-full px-4 py-2 border border-gray-300 rounded text-black"
        >
          <option value="moonly">moonly</option>
          <option value="okay bears">okay bears</option>
        </select>
      </div>

      <div className="flex-1 ml-4 mb-4">
        <label for="trait" className="block font-bold mb-1 text-gray-700"
          >Trait</label
        >
        <select
          name="trait"
          id="trait"
          className="w-full px-4 py-2 border border-gray-300 rounded text-black"
        >
          <option value="any">Any</option>
          <option value="crown">Crown</option>
        </select>
      </div> */}
    {/* </div> */}
  </div>
</div>
}

const Page = () => {
      console.log('Rendered')

  const [spaceUrl, setSpaceUrl] = useState('')
  const [numOfWinners, setNumOfWinners] = useState('')
  const [minTimeInSpace, setMinTimeInSpace] = useState('')
  const [timeFormat, setTimeFormat] = useState('minutes')
  const [userType, setUserType] = useState('')
  const [followHost, setFollowHost] = useState(false)
  const [numOfNFT, setNumOfNFT] = useState(1)
  const [collection, setCollection] = useState('Any')
  const [trait, setTrait] = useState('Any')
  const [giveawayPriceName, setGiveawayPriceName] = useState('')
  const [holdingRequirements, setHoldingRequirements] = useState([{id: uuidv4(),
    numOfNFT: 1,
    collection: 'Moonly',
    trait: 'Any'}])

  const handleOnChange = (event) => {
    if(event.target.name === 'twitter-url') {
      setSpaceUrl( event.target.value)
    }

    else if(event.target.name === 'num-winners') {
      setNumOfWinners(event.target.value)
    }

    else if(event.target.name === 'min-time') {
      setMinTimeInSpace(event.target.value)
    }

    else if(event.target.name === 'time-format') {
      setTimeFormat(event.target.value)
    }

    else if(event.target.name === 'user-type') {
      setUserType(event.target.value)
    }

    else if(event.target.name === 'follow-host') {
      setFollowHost(!followHost)
    }

    else if(event.target.name === 'nft' || event.target.name === 'collection' || event.target.name === 'trait') {
     console.log(event.target.name, event.target.value)
      holdingRequirements.forEach((requirement, index) => {
        // console.log(requirement.id, event.target.id, event.target.name)
        console.log([
          requirement.id,
          event.target.id, 
          event.target.data
        ])
        console.log(event.target.name)
        if(requirement.id === event.target.id) {
          if(event.target.name === 'nft') {
            setHoldingRequirements((prevState) => {
              prevState[index] = {...requirement, numOfNFT: event.target.value}
              return [...prevState]
            })
            return
          }

          if(event.target.name === 'collection') {

            setHoldingRequirements((prevState) => {
              prevState[index] = {...requirement, collection: event.target.value}
              return [...prevState]
            })
            return
          }

          if(event.target.name === 'trait') {
           setHoldingRequirements((prevState) => {
              prevState[index] = {...requirement, collection: event.target.value}
              return [...prevState]
            })
            return
          }
        }
      })
    }
  
    else if(event.target.name === 'giveaway-price') {
      setGiveawayPriceName(event.target.value)
    }
  }

  const handleOnClick = (event) => {
    console.log("HELLO")
  event.preventDefault()
  if(event.target.name === 'add-rule') {
      setHoldingRequirements((prevState) => [...prevState,{id: uuidv4(),
        numOfNFT: 1,
        collection: 'Moonly',
        trait: 'Any'}])
  }

  else if(event.target.nodeName === 'svg' || event.target.nodeName === 'path') {

    setHoldingRequirements((prevState) => {
      prevState.forEach((requirement, index) => {
        if(requirement.id === event.target.id) {
          prevState.splice(index, 1)
          return
        }
      })

      return [...prevState]
    })
  }
  }

  return (
    <div className="boom">
    <header
      className="bg-green-500 rounded-md shadow-md py-2 px-4 flex justify-between items-center"
    >
      <div className="logo flex items-center">
        <img
          src="./img/moon-logo.png"
          alt="Moonly Logo"
          className="w-5 h-5 mr-2"
        />
        <p className="font-bold">Moonly</p>
      </div>
      <nav className="font-bold">
        <ul className="inline-block">
          <li className="inline-block mr-4">
            <a href="#" className="text-black no-underline px-2 py-1 rounded"
              >Home</a
            >
          </li>
          <li className="inline-block mr-4">
            <a href="#" className="text-black no-underline px-2 py-1 rounded"
              >Tools</a
            >
          </li>
          <li className="inline-block mr-4">
            <a href="#" className="text-black no-underline px-2 py-1 rounded"
              >Market Data</a
            >
          </li>
          <li className="inline-block">
            <a href="#" className="text-black no-underline px-2 py-1 rounded"
              >Blog</a
            >
          </li>
        </ul>
      </nav>
    </header>

    <main className="mt-4 px-4 py-4 bg-white rounded-md shadow-md">
      <h1 className="text-2xl mb-8">Space Giveaway Creation</h1>

      <form>
        <div className="mb-4">
          <div>
            <label
              for="twitter-url"
              className="block font-bold mb-1 text-gray-700"
              >Twitter Spaces URL</label
            >
            <input
              type="text"
              id="twitter-url"
              name="twitter-url"
              value={spaceUrl}
              onChange={handleOnChange}
              placeholder="https://twitter.com/i/spaces/1nAJErZzNbOxL"
              className="w-full px-4 py-2 border border-gray-300 rounded text-black"
            />
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label
              for="num-winners"
              className="block font-bold mb-1 text-gray-700"
              >Number of winners</label
            >
            <input
              type="number"
              id="num-winners"
              name="num-winners"
              placeholder="10"
              value={numOfWinners}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border border-gray-300 rounded text-black"
            />
          </div>
        </div>

        <div className="flex mb-4">

          <div className="flex-1">
            <label for="min-time" className="block font-bold mb-1 text-gray-700"
              >Minimum Time in spaces</label
            >
            <input
              type="text"
              id="min-time"
              name="min-time"
              value={minTimeInSpace}
              onClick={handleOnChange}
              className="w-full px-4 py-2 border border-gray-300 rounded text-black"
            />
          </div>

          <div className="flex-1 ml-4">
            <label for="time-format" className="block font-bold mb-1 text-gray-700"
              >Time</label
            >
            <select
              name="time-format"
              id="time-format"
              onChange={handleOnChange}
              className="w-full px-4 py-2 border border-gray-300 rounded text-black"
              value={timeFormat}
            >
              <option value="minute" className="text-black">minute</option>
              <option value="second" className="text-black">second</option>
              <option value="hour" className="text-black">hour</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label for="user-type" className="block font-bold mb-1 text-gray-700"
              >User types</label
            >
            <input
              type="text"
              id="user-type"
              name="user-type"
              placeholder="co-host, speaker, listener"
              value={userType}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border border-gray-300 rounded text-black"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            for="follow-host"
            className="block font-bold mb-1 text-gray-700"
            >Follow host required?</label
          >
          <label className="switch">
            <input type="checkbox" name="follow-host" className="toggle-switch" checked={followHost} onChange={handleOnChange} />
            <span className="slider round"></span>
          </label>
        </div>

        <div>
          {
            holdingRequirements.map((requirement) => {
              console.log(requirement.id)
              return <HoldingRequirment numOfNFT={requirement.numOfNFT} collection={requirement.collection} trait={requirement.trait} key={requirement.id} id={requirement.id} handleOnChange={handleOnChange} handleOnClick={handleOnClick}/>
            })
          }
        </div>


        <div className="text-right mb-4">
          <button
            id="add-rule"
            name="add-rule"
            className="px-4 py-2 bg-purple-600 text-white font-bold rounded"
            onClick={handleOnClick}
          >
            Add Rule
          </button>
        </div>

        <div className="mb-4">
          <div>
            <label
              for="giveaway-price"
              className="block font-bold mb-1 text-gray-700"
              >Giveaway Price Name</label
            >
            <input
              type="text"
              id="giveaway-price"
              name="giveaway-price"
              value={giveawayPriceName}
              onChange={handleOnChange}
              placeholder="10 WL Spots"
              className="w-full px-4 py-2 border border-gray-300 rounded text-black"
            />
          </div>
        </div>

        {/* <div className="container mb-4">
          <div className="gray-box p-2 rounded">
            <div className="rule flex items-center gap-2 mb-2">
              <label for="rule" className="flex-basis-100">Giveaway Price</label>
              <input
                type="text"
                id="rule"
                name="rule"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            {/* <div className="rule flex items-center gap-2">
              <label for="rule" className="flex-basis-100">Rule</label>
              <input
                type="text"
                id="rule"
                name="rule"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div> */}
          {/* </div> */}
        {/* </div> } */}


        <div className="text-right">
          <button
            type="submit"
            value="Create Space Giveaway"
            className="px-4 py-2 bg-purple-600 text-white font-bold rounded"
          >
            Create Space Giveaway
          </button>
        </div>
      </form>
    </main>
  </div>
  )
};

export default Page


