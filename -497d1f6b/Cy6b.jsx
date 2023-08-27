import { useEffect, useState } from "react"

const Component = () => {
    const [count, setCount] = useState(0)
    const [time, setTime] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
      setTimeout(() => setTime(new Date().toLocaleDateString()), 1000)
    }, [])

    useEffect(() => {
        document.title = `Clicked ${count} times`
    }, [count])

    return <div>
       <h1>{time}</h1>
       <button onClick={() => setCount((prevState) => prevState + 1)}>Click Me</button>
    </div>
}

export default Component