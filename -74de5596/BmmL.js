import { gql, useMutation } from '@apollo/client';
import { Combobox } from '@headlessui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

function Collection({handleOnChange, id, setTrait}) {
  const collections = [{name: 'Any', collectionId: 0}]
  const [selectedCollection, setSelectedCollection] = useState(collections[0])
  const [query, setQuery] = useState('')
  const [filteredCollection, setfilteredCollection] = useState(collections)

      useEffect(() => {
          async function fetchCollection() {
           try{
      
            const response = await axios.get(`http://localhost:4411/api/v1/collections/search/?name=${query}&limit=5`)
      console.log(response.data)
            if(response.data.status) {
                let collections = query === '' ? ['Any'] : ['Any', ...response.data.nfts.map((collection) => ({name: collection.name, collectionId: collection.id}))]
                setfilteredCollection(collections)
            }else{
              toast.error('Internal Server Error. Failed to fetch collections')
            }
           }catch(err) {
             toast.error('Internal Server Error')
           }
          }
      
          fetchCollection()
        }, [query])
  
      useEffect(() => {
        console.log("HELLO")
        handleOnChange({target: {name: 'collection', value: selectedCollection, collectionId: selectedCollection.collectionId}}, id)
        
      }, [selectedCollection])

  return <div className='text-black'>
     <Combobox value={selectedCollection} onChange={setSelectedCollection}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options className="text-black">
        {filteredCollection.map(({name}) => (
          <Combobox.Option key={name} value={name}>
            {name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  </div>
}

function Trait({handleOnChange, id, collectionId}) {
  const collections = ['Any']
  const [selectedTrait, setSelectedTrait] = useState(collections[0])
  const [query, setQuery] = useState('')
  const [filteredTrait, setfilteredTrait] = useState(collections)

      useEffect(() => {
          async function fetchTraits() {
           try{
            console.log(collectionId)
            const response = await axios.get(`http://localhost:4411/api/v1/collection/traits/:uniqueIdentity=${collectionId}`)
            console.log(response.data)
            if(response.data.status) {
                let traits = query === '' ? ['Any'] : ['Any', ...response.data.traits.map((trait) => trait.trait)]
                setfilteredTrait(traits)
            }else{
              toast.error('Internal Server Error. Failed to fetch traits')
            }
           }catch(err) {
             console.log(err)
             toast.error('Internal Server Error')
           }
          }
      
          fetchTraits()
        }, [query])
  
      useEffect(() => {
        handleOnChange({target: {name: 'trait', value: selectedTrait}}, id)
      }, [selectedTrait])

  return <div className='text-black'>
     <Combobox value={selectedTrait} onChange={setSelectedTrait}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options className="text-black">
        {filteredTrait.map((trait) => (
          <Combobox.Option key={trait} value={trait}>
            {trait}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  </div>
}

const searchBox = ({boxType, currItemName, collection, setCollection}) => {
  const [selectedItem, setSelectedItem] = useState(currItemName)
  const [query, setQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([currItemName])

  useEffect(() => {
    const fetchData = async () => {
      if(boxType === 'collection') {
        try{
          const response = await axios.get(`http://localhost:4411/api/v1/collections/search/?name=${query}&limit=5`)
        
              if(response.data.status) {
                  let collectionNames = query === '' ? [currItemName] : [currItemName, ...response.data.map((collection) => collection.name)]
  
                  setFilteredItems(collectionNames)
                  setCollection({id: response.data.nfts[0].id})
              }else{
                throw new Error('Internal Server Error. Failed to fetch collections')
              }
  
        }catch(err) {
          toast.error(err.message || 'Internal Server Error. Failed to fetch collections')
        }
      }
  
      if(boxType === 'trait') {
        try{
          const response = await axios.get(`http://localhost:4411/api/v1/collection/traits/:uniqueIdentity=${collection.id}`)      
              if(response.data.status) {
                  let traits = query === '' ? [currItemName] : [currItemName, ...response.data.map((trait) => trait.trait)]
  
                  setFilteredItems(traits)
              }else{
                throw new Error('Internal Server Error. Failed to fetch collections')
              }
  
        }catch(err) {
          toast.error(err.message || 'Internal Server Error. Failed to fetch collections')
        }
      }
    }

    fetchData()
  }, [query])
}


const HoldingRequirment = ({
  dataId,
  numOfNFT,
  trait,
  collectionId,
  handleOnChange,
  handleOnClick,
}) => {
  
  const [traits, setTraits] = useState(['Any'])
  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">Holding Requirements</h2>
      <div className="bg-gray-200 p-4 rounded-md">
        <div className="flex">
          <div className="flex-1 mb-4">
            <label for="nft" className="block font-bold mb-1 text-gray-700">
              NFT
            </label>

            <input
              type="number"
              name="nft"
              className="w-full px-4 py-2 border border-gray-300 rounded text-black"
              value={numOfNFT}
              onChange={(event) => handleOnChange(event, dataId)}
            />
          </div>

          <div className="flex-1 ml-4 mb-4">
            <label
              for="collection"
              className="block font-bold mb-1  text-black"
            >
              Collection
            </label>
            {/* <select
              name="collection"
              className="w-full px-4 py-2 border border-gray-300 rounded text-black"
              value={collection}
              onChange={(event) => handleOnChange(event, dataId)}
            >
              <option value="Any">Any</option>
              <option value="okay bears">okay bears</option>
              <option value="moonly">moonly</option>
            </select> */}
            <Collection handleOnChange={handleOnChange} id = {dataId} setTraits={setTraits}/>
          </div>

          <div className="flex-1 ml-4 mb-4">
            <label for="trait" className="block font-bold mb-1 text-gray-700">
              Trait
            </label>
            <select
              name="trait"
              className="w-full px-4 py-2 border border-gray-300 rounded text-black"
              value={trait}
              onChange={(event) => handleOnChange(event, dataId)}
            >
              {
                traits.map((trait) => {
                  return <option value="any">{trait}</option>
                })
              }
            </select>

          </div>

          <div>
            <button
              type="button"
              className="text-gray-500   hover:text-gray-700 rounded-sm w-6 h-6"
              onClick={(event) => handleOnClick(event, dataId)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>{' '}
          </div>
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
          className="block font-bold mb-1 text-gray-s700"
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
  );
};

const Page = () => {
  const [spaceUrl, setSpaceUrl] = useState('');
  const [numOfWinners, setNumOfWinners] = useState('');
  const [minTimeInSpace, setMinTimeInSpace] = useState('');
  const [timeFormat, setTimeFormat] = useState('minute');
  const [userType, setUserType] = useState('');
  const [followHost, setFollowHost] = useState(false);

  const [giveawayPriceName, setGiveawayPriceName] = useState('');
  let [holdingRequirements, setHoldingRequirements] = useState([
    { id: uuidv4(), numOfNFT: 1, collectionName: 'Any', trait: 'Any' },
  ]);

  const INIT_SPACE_GIVEAWAY = gql`
  mutation InitSpaceGiveaway(
    $spaceId: String!
    $minTimeInSec: Float!
    $eligableUserTypes: [Role!]!
    $followHostRequired: Boolean!
    $holdingRequirements: [HoldingRequirement!]!
    $prizeName: String!
  ) {
    initGiveaway(
      spaceId: $spaceId
      minTimeInSec: $minTimeInSec
      eligableUserTypes: $eligableUserTypes
      followHostRequired: $followHostRequired
      holdingRequirements: $holdingRequirements
      prizeName: $prizeName
    )
  }
`;


  const [initGiveaway] = useMutation(INIT_SPACE_GIVEAWAY, {
    onCompleted: spaceId => {
      toast.success('Giveaway Initiated for this space successfully')
    },
    onError: error => {
      console.log(error)
      toast.error(
        error.message || 'Something went wrong! Maybe your input was not correct.'
      )
    }
  }) 

  const handleOnChange = (event, eventTargetId) => {
    if (event.target.name === 'twitter-url') {
      setSpaceUrl(event.target.value);
    } else if (event.target.name === 'num-winners') {
      setNumOfWinners(event.target.value);
    } else if (event.target.name === 'min-time') {
      setMinTimeInSpace(event.target.value);
    } else if (event.target.name === 'time-format') {
      setTimeFormat(event.target.value);
    } else if (event.target.name === 'user-type') {
      setUserType(event.target.value);
    } else if (event.target.name === 'follow-host') {
      setFollowHost(!followHost);
    } else if (
      event.target.name === 'nft' ||
      event.target.name === 'collection' ||
      event.target.name === 'trait'
    ) {
      holdingRequirements.forEach((requirement, index) => {

        if (requirement.id === eventTargetId) {
          if (event.target.name === 'nft') {
            setHoldingRequirements((prevState) => {
              prevState[index] = {
                ...requirement,
                numOfNFT: event.target.value,
              };
              return [...prevState];
            });
            return;
          }

          if (event.target.name === 'collection') {
            setHoldingRequirements((prevState) => {
              prevState[index] = {
                ...requirement,
                collectionName: event.target.value,
                collectionId: event.target.collectionId
              };
              return [...prevState];
            });
            return;
          }

          if (event.target.name === 'trait') {
            setHoldingRequirements((prevState) => {
              prevState[index] = {
                ...requirement,
                trait: event.target.value,
              };
              return [...prevState];
            });
            return;
          }
        }
      });
    } else if (event.target.name === 'giveaway-price') {
      setGiveawayPriceName(event.target.value);
    }
  };

  const handleOnClick = (event, eventTargetId) => {

    event.preventDefault();
    if (event.target.name === 'add-rule') {
      setHoldingRequirements((prevState) => [
        ...prevState,
        { id: uuidv4(), numOfNFT: 1, collection: 'Moonly', trait: 'Any' },
      ]);
    } else if (
      event.target.nodeName === 'svg' ||
      event.target.nodeName === 'path'
    ) {
      setHoldingRequirements((prevState) => {
        prevState.forEach((requirement, index) => {
          console.log('Requirement Id = ', requirement.id)
          console.log('Event Id = ', event.target.id)
          if (requirement.id === eventTargetId) {
            prevState.splice(index, 1);
            return;
          }
        });

        return [...prevState];
      });
    }
    else if(event.target.name === 'create-giveaway') {
      console.log({spaceUrl, minTimeInSpace, numOfWinners, timeFormat, followHost, holdingRequirements})

    //   const regex = /\/(\w+)$/;
    //   const match = regex.exec(spaceUrl);
    //   let spaceId, minTimeInSec, numberOfWinners, followHostRequired, eligableUserTypes, prizeName
    //   if (match) {
    //     spaceId = match[1];
    //   }
    
    //   if(timeFormat === 'minute') {
    //     minTimeInSec = minTimeInSpace * 60
    //   }
    
    //   if(timeFormat === 'second') {
    //     minTimeInSec = minTimeInSpace * 3600
    //   }
    
    //   numberOfWinners = numOfWinners
    //   followHostRequired = followHost
    //   prizeName = giveawayPriceName
    //   eligableUserTypes = []
    //   userType.toLowerCase()
    
    //   if(userType.includes('co-host')) {
    //     eligableUserTypes.push('CO_HOST')
    //   }
    
    //   if(userType.includes('speaker')) {
    //     eligableUserTypes.push('SPEAKER')
    //   }
    
      
    //   if(userType.includes('listener')) {
    //     eligableUserTypes.push('LISTENER')
    //   }
    
    //  holdingRequirements = holdingRequirements.map((requirement) => {
    //   return {
    //     numOfNFT: requirement.numOfNFT,
    //     collectionName: requirement.collectionName,
    //     trait: requirement.trait
    //   }
    //  })
    
    //   const giveawayDetails = {
    //     spaceId, 
    //     minTimeInSec, 
    //     followHostRequired,
    //     numberOfWinners,
    //     holdingRequirements,
    //     prizeName,
    //     eligableUserTypes,
    
    //   }
    //   console.log(giveawayDetails)
    //   console.log("HELLo")
    //   console.log({
    //     spaceId,
    //     minTimeInSec,
    //     followHost,
    //     eligableUserTypes,
    //     holdingRequirements,
    //     prizeName
    //   })
    //   try{
    //     initGiveaway({variables: {
    //       ...giveawayDetails
    //     }})
    //   }catch(err) {
    //     console.log(err)
    //   }
    }
  };

  return (
    <div className="min-h-screen text-brand-white-900 bg-no-repeat bg-gradient-to-b from-[#22212D] to-[#030304]">
      <header className="bg-green-500 rounded-md shadow-md py-2 px-4 flex justify-between items-center">
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
              <a href="#" className="text-black no-underline px-2 py-1 rounded">
                Home
              </a>
            </li>
            <li className="inline-block mr-4">
              <a href="#" className="text-black no-underline px-2 py-1 rounded">
                Tools
              </a>
            </li>
            <li className="inline-block mr-4">
              <a href="#" className="text-black no-underline px-2 py-1 rounded">
                Market Data
              </a>
            </li>
            <li className="inline-block">
              <a href="#" className="text-black no-underline px-2 py-1 rounded">
                Blog
              </a>
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
              >
                Twitter Spaces URL
              </label>
              <input
                type="text"
                required
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
              >
                Number of winners
              </label>
              <input
              required
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
              <label
                for="min-time"
                className="block font-bold mb-1 text-gray-700"
              >
                Minimum Time in spaces
              </label>
              <input
              required
                type="text"
                id="min-time"
                name="min-time"
                value={minTimeInSpace}
                onChange={handleOnChange}
                className="w-full px-4 py-2 border border-gray-300 rounded text-black"
              />
            </div>

            <div className="flex-1 ml-4">
              <label
                for="time-format"
                className="block font-bold mb-1 text-gray-700"
              >
                Time
              </label>
              <select
                name="time-format"
                id="time-format"
                onChange={handleOnChange}
                className="w-full px-4 py-2 border border-gray-300 rounded text-black"
                value={timeFormat}
              >
                <option value="minute" className="text-black">
                  minute
                </option>
                <option value="second" className="text-black">
                  second
                </option>
                <option value="hour" className="text-black">
                  hour
                </option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label
                for="user-type"
                className="block font-bold mb-1 text-gray-700"
              >
                User types
              </label>
              <input
                required
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
            >
              Follow host required?
            </label>
            <label className="switch">
              <input
                type="checkbox"
                name="follow-host"
                className="toggle-switch"
                checked={followHost}
                onChange={handleOnChange}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div>
            {holdingRequirements.map((requirement) => {
              console.log(requirement.id);
              return (
                <HoldingRequirment
                  numOfNFT={requirement.numOfNFT}
                  collectionId={requirement.collectionId}
                  key={requirement.id}
                  dataId={requirement.id}
                  handleOnChange={handleOnChange}
                  handleOnClick={handleOnClick}
                />
              );
            })}
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
              >
                Giveaway Price Name
              </label>
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
              name='create-giveaway'
              type="submit"
              value="Create Space Giveaway"
              className="px-4 py-2 bg-purple-600 text-white font-bold rounded"
              onClick={handleOnClick}
            >
              Create Space Giveaway
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

function MyComponent () {

}

export default Page;