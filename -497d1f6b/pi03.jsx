import { useState } from "react"

const Component = () => {
    const [todo, setTodo] = useState({title: '', description: ''})

    return <div>
        <input type="text" value={todo.title} onChange={(e) => setTodo({title: e.target.value})}/> <br />
        <input type="text" value={todo.description} onChange={(e) => setTodo({description: e.target.value})}/> 
    </div>
}

const Button = () => {
    const [count, setCount] = useState(0)

    return <div>
        {/* <button onClick={() => setCount((count) => count + 1)}>Clicked {count} times</button> */}
        <Component />
    </div>
}

export default Button