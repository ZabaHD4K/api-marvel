import React, { useEffect, useState } from 'react';
import logo from '../../src/logo.svg';
import '../../src/App.css';
import md5 from 'md5';

function App() {
  const [comics, setComics] = useState([]);
  const [selectedOption, setSelectedOption] = useState('all');
  const publicKey = 'b7108e93f592d7562af350a0b288893e';
  const privateKey = '6b7fc9eff7a08e31abccadc9c2e1db7189c46f69';
  const ts = 1; // Usamos un timestamp fijo para este ejemplo
  const hash = md5(ts + privateKey + publicKey);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await fetch(`https://gateway.marvel.com/v1/public/comics?orderBy=-modified&ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        const data = await response.json();
        setComics(data.data.results);
      } catch (error) {
        console.error('Error fetching data from Marvel API', error);
      }
    };

    fetchComics();
  }, [ts, publicKey, hash]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFavoriteToggle = (comicId) => {
    setComics(prevComics =>
      prevComics.map(comic =>
        comic.id === comicId ? { ...comic, isFavorite: !comic.isFavorite } : comic
      )
    );
  };

  const filteredComics = selectedOption === 'favorites' ? comics.filter(comic => comic.isFavorite) : comics;

  return (
    <div>
      <header className='App-header'>
        <h2>Marvel Comics</h2>
        <select value={selectedOption} onChange={handleOptionChange} style={{ borderRadius: '5px', padding: '5px' }}>
          <option value="all">Todos los comics</option>
          <option value="favorites">Favoritos</option>
        </select>
      </header>

      <div className='seccin-comics'>
        {filteredComics.map(comic => (
          <div key={comic.id}>
            <h3>{comic.title}</h3>
            <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
            <button onClick={() => handleFavoriteToggle(comic.id)}>
              {comic.isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

}

export default App;