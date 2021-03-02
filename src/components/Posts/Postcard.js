import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Create from '../../routes/Create';
import AddPost from '../../routes/Create'


const Postcard = ({ data }) => {
    console.log("data", data)

    const [token, setToken] = useState(localStorage.getItem("token"))

    let history = useHistory();

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        console.log("token23", token)
    }, [localStorage.getItem('token')]);

    const handleDelete = (ID) => {
        console.log("token3", `Bearer ${token}`)
        console.log(ID)
        console.log("link", `https://strangers-things.herokuapp.com/api/2010-UNF-HY-WEB-PT/posts/${ID}`)
        fetch(`https://strangers-things.herokuapp.com/api/2010-UNF-HY-WEB-PT/posts/${ID}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json())
            .then(result => {
                console.log(result);
            })
            .catch(console.error);
    }

    return (
        <div className="postcard">
            <h2>{data.title}</h2>
            <h3>{data.description}</h3>
            <h4>{data.price}</h4>
            <h2>Seller:{data.author.username}</h2>
            <h4>Location:{data.location}</h4>
            <div>
                <button
                    onClick={() => {
                        console.log("inpostcard", localStorage.setItem('editData', data))
                        history.push({
                            pathname: `/posts/${data.author._id}`,
                            state: data
                        })
                    }}
                >View</button>
                {data.isAuthor
                    ?
                    <>
                        <button
                            onClick={() => {
                                console.log("inpostcard", localStorage.setItem('editData', data))
                                history.push({
                                    pathname: `/posts/${data.author._id}`,
                                    state: data
                                })
                            }}>
                            Edit
          </button>
                        <button
                            onClick={() => handleDelete(data.author._id)}>Delete</button>
                    </>
                    : null}
            </div>
            {data.messages.length > 0 ?

                data.messages.map((item, index) => {
                    return (
                        <>
                            <div style={{ fontSize: "20px", padding: "0.5rem", flexDirection: "column" }}>
                                Content: {item.content}
                            </div>
                            <div style={{ fontSize: "20px", padding: "0.5rem", flexDirection: "column" }}>
                                From: {item.fromUser.username}
                            </div>
                        </>
                    )
                })


                : null}
        </div >
    )
}

export default Postcard;



//  localStorage.setItem('editData', JSON.stringify(data));
// history.push(`/posts/${data.author._id}`)