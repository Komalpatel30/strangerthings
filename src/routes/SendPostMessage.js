import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';


const SendPostMessage = (props) => {
    console.log("props", props)
    // const editData = localStorage.getItem('editData')
    // console.log("editdata", JSON.parse(editData))

    let history = useHistory();
    const { postID } = useParams();
    console.log(postID)
    const [post, setPost] = useState({
        Title: "",
    })
    const [error, setError] = useState({
        Title: false,
    })

    const [successMessage, setSuccessMessage] = useState("")

    const [success, setSuccess] = useState(false)

    const validatePost = () => {
        let formError = {};
        let valid = true;

        if ((post.Title).length < 3) {
            valid = false;
            formError = { ...formError, Title: true }
        }
        setError(formError)
        if (valid) {
            submitForm()
        }
    }

    useEffect(() => {
        // let editData = localStorage.getItem('editData')
        // const editData2 = JSON.parse(editData);
        // console.log("editdata", JSON.parse(editData));
        // if (editData && editData.length > 0) {
        setPost({
            Title: props.Details.title,
        })
        // }
    }, [props])

    console.log('post', post);
    const submitForm = () => {

        const ID = props.Details._id


        fetch(`http://strangers-things.herokuapp.com/api/2010-UNF-HY-WEB-PT/posts/${ID}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                message: {
                    content: post.Title
                }
            })
        }).then(response => response.json())
            .then(result => {
                console.log("result22", result);
                if (result.success) {
                    setSuccessMessage("Your message is successfully posted")
                    setSuccess(true)
                }
                else {
                    setSuccessMessage(result.error.message)
                    setSuccess(true)
                }
            })
            .catch(console.error);

    }

    return (
        <div style={{ padding: '2rem' }}>
            <div>
                <h1>Send Message</h1>
                <label>Message</label>
                <input
                    onChange={(e) => {
                        setPost({ ...post, Title: e.target.value })
                    }}
                    type="text"
                    id="keywords"
                    placeholder="Message..."
                    value={post.Title} /><br />
                {error.Title ? "Please enter message" : null}<br />
                {error.submitError ? error.errorMessage : null}<br />
                <button onClick={validatePost}>Send Message</button><br />
                {success ? successMessage : null}
            </div >

        </div >
    )
}

export default SendPostMessage;


