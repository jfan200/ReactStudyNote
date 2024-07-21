import {useState} from "react";

function useToggle(value) {
    const [state, setState] = useState(value)
    const toggle = () => setState(!state)
    return [state, toggle]
}

function App() {
    const [state, toggle] = useToggle(true)

    return (
        <div>
            {state && <div>This is div</div>}
            <button onClick={toggle}>Toggle</button>
        </div>
    )
}

export default App