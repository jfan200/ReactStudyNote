import {useEffect} from "react";
import {getBasicAuth, request} from "@/utils"

const Layout = () => {
    useEffect(() => {
        console.log(request.get('/GetAllBuildings'))
    }, []);
    return (<div>Layout page</div>);
}

export default Layout;