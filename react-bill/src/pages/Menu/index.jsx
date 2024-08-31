import {useNavigate} from "react-router-dom";
import {Button} from "antd-mobile";

const Menu = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Button onClick={() => navigate('/')}>Month</Button>
            <Button color='primary' onClick={() => navigate('/new')}>New</Button>
            <Button color='primary' onClick={() => navigate('/year')}>Year</Button>
        </div>
    )
}

export default Menu