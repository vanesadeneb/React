import PropTypes from "prop-types";

export const FirstApp = ({title, subTitle}) => {

    if(!title){
        throw new Error("El title no existe");
    }
    
    return (
        <>
            <h1>{ title }</h1>
            <p>{ subTitle }</p>
        </>
    );
}

FirstApp.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.number.isRequired,
}

FirstApp.defaultProps = {
    title: "No hay titulo "
}