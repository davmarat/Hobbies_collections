import React from 'react';
import './index.scss';

import { Collection } from './Collection';

const cats = [
  { name: 'Все' },
  { name: 'Комиксы' },
  { name: 'Аниме, мультсериалы' },
  { name: 'Кино, сериалы' },
  { name: 'Покемоны' },
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setisLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    setisLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';
    
    
    fetch(`https://63173ac8cb0d40bc414f88e6.mockapi.io/collection?page=${page}&limit=6&${category}`)
      .then((res) => res.json())
      .then((obj) => {
        setCollections(obj);
      })
      .catch((err) => {
        console.warn(err);
        alert(err, 'Ошибка при получении данных');
      })
      .finally(() => setisLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Мои хобби</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''}
              key={obj.name}>
              {' '}
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading</h2>
        ) : (
          collections
            .filter((obj) => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase());
            })
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(2)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
