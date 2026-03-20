import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null); // Состояние для файла

  const API_URL = 'https://wishlist-api-7vms.onrender.com/items';

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(data => setWishlist(data));
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (!name) return;

    // Используем FormData для отправки файлов
    const formData = new FormData();
    formData.append('name', name);
    formData.append('link', link);
    if (image) formData.append('image', image);

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData // Заголовки Content-Type ставить НЕ нужно, браузер сделает это сам
    });

    const newItem = await response.json();
    setWishlist([...wishlist, newItem]);
    setName('');
    setLink('');
    setImage(null);
    document.getElementById('file-input').value = ""; // Очистка поля файла
  };

  return (
    <div className="container">
      <h1> Мой Виш-лист</h1>
      <form onSubmit={addItem} className="wish-form">
        <input placeholder="Что подарить?" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Ссылка" value={link} onChange={(e) => setLink(e.target.value)} />
        {/* Старый инпут заменяем на эту конструкцию */}
<div className="file-upload">
  <input 
    id="file-input" 
    type="file" 
    accept="image/*" 
    onChange={(e) => setImage(e.target.files[0])} 
    className="hidden-input"
  />
  <label htmlFor="file-input" className="file-label">
    {image ? `📸 ${image.name}` : "Выбрать фото"}
  </label>
</div>
        <button type="submit">Добавить</button>
      </form>

      <div className="wish-list">
        {wishlist.map(item => (
          <div key={item.id} className="wish-item card">
            {item.image && <img src={item.image} alt={item.name} className="item-img" />}
            <div className="item-info">
              <span>{item.name}</span>
              {item.link && <a href={item.link} target="_blank" rel="noreferrer">Купить</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App