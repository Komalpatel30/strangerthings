import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';




const Header = (props) => {
    console.log(props)

    const history = useHistory()

    const [token, setToken] = useState(props.token || "");

    console.log("condition", token && token.length > 0)

    console.log("inRender", token)

    useEffect(() => {
        console.log("token201", token)
        setToken(localStorage.getItem("token"))
    }, [props])


    return (
        <div className="headercontainer">
            <h1>Stranger's Things</h1>
            <h2><Link to="/profile">Home</Link></h2>
            <h2><Link to="/posts">Posts</Link></h2>
            {token && token.length > 0 ?
                <h2><Link to="#"
                    onClick={() => {
                        localStorage.setItem("token", "");
                        history.push({
                            pathname: `/login`,
                        })
                    }}>Log Out</Link></h2>
                : <h2><Link to="/login">Login</Link></h2>}
            {/* <h2><Link to="/login">Login</Link></h2> */}
            {token && token.length > 0 ?
                <h2><Link to="/profile">Profile</Link></h2>
                : null}
        </div>
    )
}


export default Header;

// <div className="logo">
// <div className="contents"></div>