import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Postcard from '../components/Posts/Postcard';


const Posts = () => {

    const [post, setPost] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [token, setToken] = useState(localStorage.getItem('token'))


    // 'https://strangers-things.herokuapp.com/api/COHORT-NAME/users/me'

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        console.log("token", token)
        if (token && token.length > 0) {
            submitForm()
        }
    }, [localStorage.getItem('token')]);

    const submitForm = () => {
        console.log("token2", `Bearer ${token}`)
        fetch('https://strangers-things.herokuapp.com/api/2010-UNF-HY-WEB-PT/posts', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                setPost(result.data.posts)
            })
            .catch(console.error);
    }

    const handleSearch = (name) => {
        let newArray = [];
        if (name.length <= 0) {
            newArray = post
        } else {
            post.map((item) => {
                if ((item.title).includes(name)) {
                    newArray = [...newArray, item]
                }
            })
        }
        setPost(newArray)
    }

    return (
        <div>
            <div className="postcardsearch">
                <h1>Posts</h1>
                <div className="searchinput"><label>Search Posts</label>
                    <input
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                            handleSearch(e.target.value)
                        }}
                        type="text"
                        placeholder="Search your favorite post..."
                        value={searchInput} /><br />
                </div>
                {/* {error.userName ? "Please enter valid username" : null}<br/> */}
                <Link to="posts/add">(ADD POST)</Link>
            </div>
            {post.map((postcard, index) => (
                <Postcard
                    data={postcard}
                    key={index}
                />
            ))}
        </div>
    )
}

export default Posts;


//  <Link to="posts/add/:postID">(ADD POST)</Link>


