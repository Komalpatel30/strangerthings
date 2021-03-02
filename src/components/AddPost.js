import React from 'react';

const AddPost = ({posts, setPosts}) => {
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [price, setPrice] = useState([]);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log('title, description: ', title, description);
        const response = await fetch('https://strangers-things.herokuapp.com/api/2010-UNF-HY-WEB-PT/posts/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer TOKEN_STRING_HERE'
            },
            body: JSON.stringify({ title, description, price })         
    });
    const data = await response.json();
    console.log('data: ', data);
    setPosts([data,...posts]);
    setTitle('');
    setBody('');
}

return <>
    <h3>
        Add a Post
    </h3>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="title" value={title} onChange={(ev) => setTitle(ev.target.value)}></input>
        <input type="text" placeholder="description" value={description} onChange={(ev) => setDescription(ev.target.value)}></input>
        <input type="text" placeholder="price" value={price} onChange={(ev) => setPrice(ev.target.value)}></input>
        <button type="submit" className="btn
        btn-outline=primary">Submit</button>
    </form>
    </>
}

export default AddPost;