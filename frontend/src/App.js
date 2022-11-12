import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {
    const [ArticleID, setArticleID] = useState('');
    const [Title, setTitle] = useState('');
    const [Author, setAuthor] = useState('');
    const [Date, setDate] = useState('');
    const [PublicationID, setPublicationID] = useState('');
    const [Likes, setLikes] = useState('');
    const [Dislikes, setDislikes] = useState('');
    const [articleList, setArticleList] = useState([]);
    const [newArticle, setNewArticle] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:3002/api/get').then((response) => {
            setArticleList(response.data);
        })
    }, [])

    const searchArticle = () => {

    }

    const submitArticle = () => {
        Axios.post('http://localhost:3002/api/insert', {
            ArticleID: ArticleID,
            Title: Title,
            Author: Author,
            Date: Date,
            PublicationID: PublicationID,
            Likes: Likes,
            Dislikes: Dislikes
        });

        setArticleList([
            ...articleList,
            {
                ArticleID: ArticleID,
                Title: Title,
                Author: Author,
                Date: Date,
                PublicationID: PublicationID,
                Likes: Likes,
                Dislikes: Dislikes
            }
        ]);
    };

    const deleteArticle = (ArticleID) => {
        Axios.delete(`http://localhost:3002/api/delete/${ArticleID}`);
    };

    const updateArticle = (ArticleID, Title) => {
        Axios.put(`http://localhost:3002/api/update`, {
            ArticleID: ArticleID,
            Title: Title
        });
        setNewArticle("")
    };


    return (
        <div className="App">
            <h1>CRUD APPLICATIONS</h1>

            <div className='form'>
                <label>ArticleID:</label>
                <input type="text" name="ArticleID" onChange={(e) => {
                    setArticleID(e.target.value)
                }}/>
                <label>Title:</label>
                <input type="text" name="Title" onChange={(e) => {
                    setTitle(e.target.value)
                }}/>
                <label>Author:</label>
                <input type="text" name="Author" onChange={(e) => {
                    setAuthor(e.target.value)
                }}/>
                <label>Date:</label>
                <input type="text" name="Date" onChange={(e) => {
                    setDate(e.target.value)
                }}/>
                <label>PublicationID:</label>
                <input type="text" name="PublicationID" onChange={(e) => {
                    setPublicationID(e.target.value)
                }}/>
                <label>Likes:</label>
                <input type="text" name="Likes" onChange={(e) => {
                    setLikes(e.target.value)
                }}/>
                <label>Dislikes:</label>
                <input type="text" name="Dislikes" onChange={(e) => {
                    setDislikes(e.target.value)
                }}/>

                <button onClick={submitArticle}> Submit</button>
                {articleList.map((val) => {
                    return (
                        <div className="card">
                            <h1> ArticleID: {val.ArticleID}</h1>
                            <p> Title: {val.Title}</p>
                            <p> Author: {val.Author}</p>
                            <p> Date: {val.Date}</p>
                            <p> PublicationID: {val.PublicationID}</p>
                            <p> Likes: {val.Likes}</p>
                            <p> Dislikes: {val.Dislikes}</p>
                            <button onClick={() => {
                                deleteArticle(val.ArticleID)
                            }}> Delete
                            </button>
                            <button onClick={() => {
                                updateArticle(val.ArticleID, val.Title)
                            }}> Update
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;

// to run npm start
