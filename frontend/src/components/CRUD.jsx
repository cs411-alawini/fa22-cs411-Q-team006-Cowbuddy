import React, {useState, useEffect} from "react";
import Axios from 'axios';

function CRUD() {
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

    const [Username, setUsername] = useState('');
    const [UserID, setUserID] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const [Content, setContent] = useState('');

    const [LoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setArticleList(response.data);
        })
    }, [])

    const checkUsernamePassword = () => {
        Axios.post(`http://localhost:3001/api/login`, {
            Username: Username,
            Password: Password
        }).then((response) => {
            if (0 !== response.data.length) {
                setUserID(response.data);
                setLoggedIn(true);
                console.log(response.data);
            } else {
                console.log("Incorrect username/password!");
            }
        }).catch(error => {
            console.error(error);
        });
    };

    const setUsernamePassword = () => {
        Axios.post(`http://localhost:3001/api/register/`, {
            Username: Username,
            Email: Email,
            Password: Password
        }).then((response) => {
            if (0 !== response.data.length) {
                setUserID(response.data);
                setLoggedIn(true);
                console.log(response.data);
            } else {
                console.log("Failed to register!")
            }
        }).catch(error => {
            console.error(error)
        });
    };

    const postLike = () => {
        if (UserID === '') {
            console.error("Not logged in!");
            return;
        }
        Axios.post(`http://localhost:3001/api/like`, {
            UserID: UserID,
            ArticleID: ArticleID
        }).then((response) => {
            console.log(response.data);
        });
    };

    const postDislike = () => {
        if (UserID === '') {
            console.error("Not logged in!");
            return;
        }
        Axios.post(`http://localhost:3001/api/dislike`, {
            UserID: UserID,
            ArticleID: ArticleID
        }).then((response) => {
            console.log(response.data);
        });
    };

    const postUndoLike = () => {
        if (UserID === '') {
            console.error("Not logged in!");
            return;
        }
        Axios.post(`http://localhost:3001/api/undoLike`, {
            UserID: UserID,
            ArticleID: ArticleID
        }).then((response) => {
            console.log(response.data);
        });
    };

    const postUndoDislike = () => {
        if (UserID === '') {
            console.error("Not logged in!");
            return;
        }
        Axios.post(`http://localhost:3001/api/undoDislike`, {
            UserID: UserID,
            ArticleID: ArticleID
        }).then((response) => {
            console.log(response.data);
        });
    };

    const postComment = () => {
        if (UserID === '') {
            console.error("Not logged in!");
            return;
        }
        Axios.post(`http://localhost:3001/api/comment`, {
            UserID: UserID,
            ArticleID: ArticleID,
            Content: Content,
        }).then((response) => {
            console.log(response.data);
        });
    };

    const postUnComment = () => {
        if (UserID === '') {
            console.error("Not logged in!");
            return;
        }
        Axios.post(`http://localhost:3001/api/uncomment`, {
            UserID: UserID,
            ArticleID: ArticleID,
            Content: Content,
        }).then((response) => {
            console.log(response.data);
        });
    };

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

    const resetUserInfo = () => { // handles logout which is just clearing all inputs
        setUserID('');
        setLoggedIn(false);
    };


    return (
        <div className="App">
            <h1>CRUD APPLICATIONS</h1>

            <h2>User Login/Register</h2>
            <h1>{LoggedIn ? <img src={require("./yes.png")} width={"100px"} alt="Yes"/> : <img src={require("./no.png")} width={"100px"} alt="No"/>}</h1>
            <div className='form'>
                <input type="text" placeholder="Username" onChange={(e) => {
                    setUsername(e.target.value)
                }}/>
                <input type="text" placeholder="Email" onChange={(e) => {
                    setEmail(e.target.value)
                }}/>
                <input type="password" placeholder="Password" onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
                <div className="center">
                    <button type="submit" onClick={setUsernamePassword}>Register</button>
                    <button type="submit" onClick={checkUsernamePassword}>Login</button>
                    <button type="submit" onClick={resetUserInfo}>Logout</button>
                </div>
            </div>

            <h2>SEARCH Article</h2>
            <div className='form'>
                <input type="text" name="searchID" placeholder="Article ID" onChange={(e) => {
                    setSearchID(e.target.value)
                }}/>
                <div className="center">
                    <button onClick={searchArticle}> Submit</button>
                </div>
                <br/>
                {searchArticleList.map((val) => {
                    return (
                        <div className="card">
                            <h1> ArticleID: {val.ArticleID}</h1>
                            <p> Title: {val.Title}</p>
                            <p> Author: {val.Author}</p>
                            <p> Date: {val.Date.substring(0, 10)}</p>
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
                <br/>
                <br/>

                <div className="center">
                    <button onClick={postLike}>Like</button>
                    <button onClick={postDislike}>Dislike</button>
                    <button onClick={postUndoLike}>UnLike</button>
                    <button onClick={postUndoDislike}>UnDislike</button>
                </div>
                <br/>
                <br/>
                <input type="text" name="searchID" placeholder="Comment Here" onChange={(e) => {
                    setContent(e.target.value)
                }}/>
                <div className="center">
                    <button onClick={postComment}>Comment</button>
                    <button onClick={postUnComment}>Uncomment</button>
                </div>


            </div>

            <h2>Advanced Queries</h2>
            <div className='form center'>
                <button onClick={advQuery1}> Run Advanced Query 1</button>
                <br/>
                <br/>
                <button onClick={advQuery2}> Run Advanced Query 2</button>
            </div>

            <h2>INSERT Article</h2>
            <div className='form'>
                <input type="text" name="ArticleID" placeholder="Article ID" onChange={(e) => {
                    setArticleID(e.target.value)
                }}/>
                <input type="text" name="Title" placeholder="Title" onChange={(e) => {
                    setTitle(e.target.value)
                }}/>
                <input type="text" name="Author" placeholder="Author" onChange={(e) => {
                    setAuthor(e.target.value)
                }}/>
                <input type="text" name="Date" placeholder="Date" onChange={(e) => {
                    setDate(e.target.value)
                }}/>
                <input type="text" name="PublicationID" placeholder="PublicationID" onChange={(e) => {
                    setPublicationID(e.target.value)
                }}/>
                <input type="text" name="Likes" placeholder="Likes" onChange={(e) => {
                    setLikes(e.target.value)
                }}/>
                <input type="text" name="Dislikes" placeholder="Dislikes" onChange={(e) => {
                    setDislikes(e.target.value)
                }}/>

                <div className="center">
                    <button onClick={submitArticle}> Submit</button>
                </div>
                <br/>
                <br/>
                <br/>
                {articleList.map((val) => {
                    return (
                        <div className="card">
                            <h1> ArticleID: {val.ArticleID}</h1>
                            <p> Title: {val.Title}</p>
                            <p> Author: {val.Author}</p>
                            <p> Date: {val.Date.substring(0, 10)}</p>
                            <p> PublicationID: {val.PublicationID}</p>
                            <p> Likes: {val.Likes}</p>
                            <p> Dislikes: {val.Dislikes}</p>
                            <br/>
                            <button onClick={() => {
                                deleteArticle(val.ArticleID)
                            }}> Delete
                                <br/>
                            </button>
                            <br/>
                            <br/>
                            <input type="text" id='updateInput' placeholder="New Title" onChange={(e) => {
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
    );
}

export default CRUD;