import { useEffect, useState } from "react"

const Component = () => {
    const [count, setCount] = useState(0)
    const [time, setTime] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
      const intervalId = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
      return () => {
          clearInterval(intervalId)
      }
    }, [])

    useEffect(() => {
        document.title = `Clicked ${count} times`
    }, [count])

    return <div>
       <h1>{time}</h1>
       <button onChange={() => }>Remove Clock</button>
       <button onClick={() => setCount((prevState) => prevState + 1)}>Click Me</button>
    </div>
}

export default Component