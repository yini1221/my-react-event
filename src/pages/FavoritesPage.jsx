import { useState, useEffect } from 'react';
import RegisterButton from '../components/RegisterButton';
import '../css/favoritesPage.css';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

useEffect(() => {
  // 模擬假資料
  const fakeData = [
    {
      id: 1,
      title: "春季馬拉松",
      imageUrl: "https://fakeimg.pl/350x300/ECF5FF?text=350x300",
      date: "2025-05-30",
      location: "台北市",
      description: "一場健康又歡樂的路跑活動",
      registeredCount: 12,
      capacity: 40,
    },
    {
      id: 2011,
      title: "【茶香繚繞・仕紳雅聚】手作茶香袋體驗",
      imageUrl: "https://fakeimg.pl/350x300/D2E9FF?text=350x300",
      date: "2025-06-7",
      location: "台灣台北市大同區民生西路309號",
      description: "過期茶包也能很有品味？香包袋用完就丟太可惜？來場結合環保設計與香氣美學的體驗，為生活注入溫度與儀式感。本次選用『猴子設計』以大稻埕風景為靈感的手作布袋，搭配大稻埕名店『聯通漢芳』嚴選的天然香草原料，讓茶葉與茶包不再只是廢棄物，而是有故事、有風格的香氣祝福。",
      registeredCount: 25,
      capacity: 50,
    },
    {
      id: 2,
      title: "AI 藝術展",
      imageUrl: "https://fakeimg.pl/350x300/D2E9FF?text=350x300",
      date: "2025-06-10",
      location: "華山文創園區",
      description: "人工智慧與藝術的交織",
      registeredCount: 25,
      capacity: 50,
    }
  ];
  setFavorites(fakeData);
}, []);

  return (
    <div className="container-fluid mt-4">
      <h1>我的收藏</h1>
      <ul className='list-unstyled'>
        {favorites.map((event) => (
          <li className='bg-light p-4 rounded-3'>
            <div className='d-flex justify-content-between align-items-center active'>
              <h2>{event.title}</h2>
              <button className="btn btn-sm btn-outline-danger px-3">X</button>
            </div>
            <div className='row mt-3'>
              <div className='col-6'>
                <img className='rounded-3' src={event.imageUrl} alt={event.title} />
              </div>
              <div className='col-6 d-flex flex-column'>
                <div className="p-3 mb-3 bg-white rounded-3 shadow-sm events-color overflow-auto p-height">
                    {event.description}
                </div>                
                <div className='d-flex flex-column mt-md-auto'>
                  <div className='d-flex justify-content-between'>
                    <span>📅 {event.date}</span>
                    <span>📍 {event.location}</span>
                  </div>
                  <RegisterButton eventId={event.id} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage