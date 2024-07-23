import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment, addTo, reset} from "./store/modules/counterStore";
import {fetchChannelList} from "./store/modules/channelStore";
import {useEffect} from "react";

function App() {
    const {count} = useSelector(state => state.counter);
    const {channelList} = useSelector(state => state.channel);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchChannelList())
    }, [dispatch]);

    return (
    <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        {count}
        <button onClick={() => dispatch(increment())}>+</button>
        <div>
            <button onClick={() => dispatch(reset())}>Reset</button>
            <button onClick={() => dispatch(addTo(10))}>Add to 10</button>
            <button onClick={() => dispatch(addTo(20))}>Add to 20</button>
        </div>
        <ul>
            {channelList.map(channel => <li key={channel.id}>{channel.name}</li>)}
        </ul>
    </div>
    );
}

export default App;
