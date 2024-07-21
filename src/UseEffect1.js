import {useEffect, useState} from "react";

const URL = 'https://geek.itheima.net/V1_0/channels'

function APP() {
    const [channelList, setChannelList] = useState([])

    useEffect(() => {
        async function getChannels() {
            const res = await fetch(URL)
            const resJson = await res.json()
            console.log(resJson.data.channels)
            setChannelList(resJson.data.channels)
        }
        getChannels()
    }, [])

    return(
        <div>
            <span>This is APP</span>
            <ul>
                {channelList.map(channel => <li key={channel.id}>{channel.name}</li> )}
            </ul>
        </div>
    )
}

export default APP