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
    const [searchArticleList, setSearchArticleList] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [searchID, setSearchID] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setArticleList(response.data);
        })
    }, [])

    const searchArticle = () => {
        Axios.get(`http://localhost:3001/api/search/${searchID}`).then((response) => {
            setSearchArticleList(response.data);
        });
    };

    const advQuery1 = () => {
        Axios.get(`http://localhost:3001/api/adv1`).then((response) => {
            console.log(response.data);
        });
    }

    const advQuery2 = () => {
        Axios.get(`http://localhost:3001/api/adv2`).then((response) => {
            console.log(response.data);
        });
    }

    const submitArticle = () => {
        Axios.post('http://localhost:3001/api/insert', {
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
        Axios.delete(`http://localhost:3001/api/delete/${ArticleID}`);
    };

    const updateArticle = (ArticleID, newTitle) => {
        Axios.put(`http://localhost:3001/api/update`, {
            ArticleID: ArticleID,
            Title: newTitle
        });
        setNewTitle("")
    };


    return (
        <div className="App">
            <h1>CRUD APPLICATIONS</h1>

            <h2>SEARCH Article</h2>
            <div className='form'>
                <label>ArticleID:</label>
                <input type="text" name="searchID" onChange={(e) => {
                    setSearchID(e.target.value)
                }}/>

                <button onClick={searchArticle}> Submit</button>
                {searchArticleList.map((val) => {
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
                            <input type="text" id='updateInput' onChange={(e) => {
                                setNewTitle(e.target.value)
                            }}/>
                            <button onClick={() => {
                                updateArticle(val.ArticleID, newTitle)
                            }}> Update
                            </button>
                        </div>
                    );
                })}

            </div>

            <h2>Advanced Queries</h2>
            <div className='form'>
                <button onClick={advQuery1}> Run Advanced Query 1</button>

                <br/>
                <button onClick={advQuery2}> Run Advanced Query 2</button>
            </div>

            <h2>INSERT Article</h2>
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
                            <input type="text" id='updateInput' onChange={(e) => {
                                setNewTitle(e.target.value)
                            }}/>
                            <button onClick={() => {
                                updateArticle(val.ArticleID, newTitle)
                            }}> Update
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
        ;
}

export default App;

// to run npm start
