import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RegisterButton from '../components/RegisterButton';
import '../css/favoritesPage.css';

const API_URL = 'http://localhost:8084/user/favorites'; // 後台 API

function FavoritesPage() {

  const { userId } = useParams();
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    console.log('userId: ', userId)
      try {
        const res = await fetch(`${API_URL}/${userId}`, {
            credentials: "include"
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        console.log('API 回傳內容：', result);
        setFavorites(result.data || []);
      } catch (error) {
          console.error('讀取錯誤:', error);
      }
  };

    const handleDelete = async (id) => {
        console.log('eventId: ', id)
    if (!window.confirm('確定要取消收藏嗎？')) return;
    try {
        const res = await fetch(`${API_URL}/${userId}/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        const result = await res.json();
        if(res.ok) {
            fetchFavorites();
        } else {
            alert(result.message || '取消失敗');
        }
    } catch (err) {
      console.error('取消錯誤:', err);
    }
  };

  useEffect(() => {
    if(userId) {
        fetchFavorites();
    }
  }, [userId]);

  return (
        <div className="container-fluid">
            <div className='px-3 mx-auto' style={{'maxWidth': '1080px'}}>
                <div className="p-4 d-flex flex-column align-items-center bd-registration position-relative w-100">
                    <div className='d-flex mb-3 gap-1'>
                        <span>
                            <img src={`${import.meta.env.BASE_URL}images/admin.png`} style={{ width: '40px' }} />
                        </span> 
                        <h2>我的收藏</h2>
                    </div>
                    <div className='w-100'>
                        <ul className='list-unstyled w-100'>
                            {
                                favorites.map((favorite, index) => (
                                
                                <li key={favorite.id} className={`row w-100 py-3 position-relative ${index !== favorites.length - 1 ? 'border-bottom' : ''}`}>
                                    <div className='col-md-5' style={{backgroundColor: '#faf6f3'}}>
                                        <img className='rounded-4' src={`data:image/jpeg;base64,${favorite.imageBase64}`}/>
                                    </div>
                                    <div className='col-md-7 text-start p-3 h-100' style={{backgroundColor: '#faf6f3'}}>
                                        <div>
                                            <Link to={`/events/${favorite.id}`} className='event-link'>
                                                <h3>{favorite.title}</h3>
                                            </Link>
                                            <p className='m-1'>{favorite.startTime}</p>
                                            <div className='mb-3 mb-md-0'>{favorite.location}</div>
                                        </div>
                                        <div className='position-absolute bottom-0 end-0 translate-middle-y'>
                                            <RegisterButton eventId={favorite.id} />
                                            <button onClick={() => handleDelete(favorite.id)} className='btn btn-sm btn-red text-white' >取消收藏</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                            <div>目前共載入 {favorites.length} 筆資料</div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default FavoritesPage