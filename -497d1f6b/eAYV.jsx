import { useState } from "react"

const Button = () => {
    const [count, setCount] = useState(0)

    return <div>
        <button onClick={() => setCount((count) => count + 1)}>Clicked {count} times</button>
    </div>
}

export default But