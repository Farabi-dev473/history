import { Combobox } from '@headlessui/react'
import { useEffect, useState } from 'react'

function Page() {
  const [selectedPerson, setSelectedPerson] = useState('Any')
  const [query, setQuery] = useState('')
  const [people, setPeople] = useState([])
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(() => {
    const fetchData = () => {
      // Make the API request here using the entered query
      // Replace the API_URL with the actual endpoint you want to fetch data from
      const API_URL = `https://api.example.com/people?q=${query}`

      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          setPeople(data)
        })
        .catch(error => {
          console.error('Error fetching people:', error)
        })
    }

    const debounceSearch = () => {
      clearTimeout(timeoutId)
      setTimeoutId(setTimeout(fetchData, 1000)) // Adjust the debounce delay as needed (e.g., 1000ms)
    }

    if (query !== '') {
      debounceSearch()
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [query, timeoutId])

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options>
        {people.map((person) => (
          <Combobox.Option key={person} value={person}>
            {person}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}


export default Page