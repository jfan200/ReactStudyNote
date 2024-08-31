const Icon = ({type}) => {
    return (
        <img
            src={`https://raw.githubusercontent.com/jfan200/Resources/main/react-bill/ka/${type}.svg`}
            alt="icon"
            style={{
                width: 20,
                height: 20,
            }}
        />
    )
}


export default Icon