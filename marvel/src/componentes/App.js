import React, { useEffect, useState } from 'react';
import logo from '../../src/logo.svg';
import '../../src/App.css';
import md5 from 'md5';

function App() {
  const [comics, setComics] = useState([]);
  const publicKey = 'b7108e93f592d7562af350a0b288893e';
  const privateKey = '6b7fc9eff7a08e31abccadc9c2e1db7189c46f69';
  const ts = 1; // Usamos un timestamp fijo para este ejemplo
  const hash = md5(ts + privateKey + publicKey);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await fetch(`https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        const data = await response.json();
        setComics(data.data.results);
      } catch (error) {
        console.error('Error fetching data from Marvel API', error);
      }
    };

    fetchComics();
  }, [ts, publicKey, hash]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h2>Marvel Comics</h2>
        <ul>
          {comics.map(comic => (
            <li key={comic.id}>
              <p>ID: {comic.id}</p>
              <p>Title: {comic.title}</p>
              <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;