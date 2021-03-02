import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SendPostMessage from './SendPostMessage';
import UpdatePost from './UpdatePost';


function PostDetail() {

    const { id } = useParams()   // ctrl + space after function to auto import any react file
    console.log("idandData", id)
    const location = useLocation()
    const state = location.state
    console.log("state:", state)

    const [postDetail, setPostDetail] = useState(state)
    // title: state && state.title ? state.title : "",
    // description: state && state.description ? state.description : "",
    // price: state && state.price ? state.price : "",
    // place: state && state.location ? state.location : "",
    // username: state && state.author && state.author.username ? state.author.username : "",

    useEffect(() => {
        console.log("location/state", location.state)
        if (location && location.state) {
            setPostDetail(location.state)
            // title: state && state.title ? state.title : "",
            // description: state && state.description ? state.description : "",
            // price: state && state.price ? state.price : "",
            // place: state && state.location ? state.location : "",
            // username: state && state.author && state.author.username ? state.author.username : "",
        }

    }, [])

    return (
        <div className='postdetail'>
            <h3>Title: {postDetail.title}</h3>
            <p>Description: {postDetail.description}</p>
            <p>Price: {postDetail.price}</p>
            <p>Location: {postDetail.place}</p>
            <h3>Seller: {postDetail.author.username}</h3>
            <div className="postdetailbtn">
                <div className="UpdateDetail">
                    {postDetail.isAuthor ?
                        <div>
                            <button>
                                Edit
                </button>
                            <button>
                                Delete
                </button>
                            <UpdatePost
                                Details={postDetail}
                            />
                        </div>
                        : null}
                </div>
                <div className="sendMessage">
                    <SendPostMessage
                        Details={postDetail}
                    />
                </div>
            </div>
        </div>
    )
}





export default PostDetail;
