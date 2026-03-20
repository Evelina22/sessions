import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);

  // Твоя ссылка на бэкенд (убедись, что она верная!)
  const API_URL = 'https://wishlist-api-7vms.onrender.com/items';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setWishlist(data))
      .catch(err => console.error("Ошибка загрузки:", err));
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!name) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('link', link);
    if (image) formData.append('image', image);

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData 
    });

    const newItem = await response.json();
    setWishlist([...wishlist, newItem]);
    setName('');
    setLink('');
    setImage(null);
    document.getElementById('file-input').value = ""; 
  };

  // --- НОВАЯ ФУНКЦИЯ УДАЛЕНИЯ ---
  const deleteItem = async (id) => {
    if (!window.confirm('Удалить это желание?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setWishlist(wishlist.filter(item => item.id !== id));
      } else {
        alert('Ошибка при удалении');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  return (
    <div className="container">
      <h1>🌱 Мой Виш-лист</h1>
      <form onSubmit={addItem} className="wish-form">
        <input placeholder="Что подарить?" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Ссылка (необязательно)" value={link} onChange={(e) => setLink(e.target.value)} />
        
        <div className="file-upload">
          <input 
            id="file-input" 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
            className="hidden-input"
          />
          <label htmlFor="file-input" className="file-label">
            {image ? `✅ ${image.name.substring(0, 15)}...` : "📸 Добавить фото"}
          </label>
        </div>
        <button type="submit">Добавить</button>
      </form>

      <div className="wish-list">
        {wishlist.map(item => (
          <div key={item.id} className="wish-item card">
            {item.image && <img src={item.image} alt={item.name} className="item-img" />}
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="buy-link">Купить</a>}
            </div>
            
            {/* Кнопка удаления */}
            <button className="delete-btn" onClick={() => deleteItem(item.id)}>×</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;