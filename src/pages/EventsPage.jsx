import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegisterButton from '../components/RegisterButton';
import '../css/eventsPage.css';
import axios from 'axios';

function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);

  const categories = [
    { id: 'all', label: '所有活動' },
    { id: 'sports', label: '運動' },
    { id: 'art', label: '藝文' },
    { id: 'learning', label: '學習' }
  ];

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
  setEvents(fakeData);
}, [selectedCategory]);


/*
  useEffect(() => {
    axios
      .get(`/api/events${selectedCategory === 'all' ? '' : `?category=${selectedCategory}`}`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, [selectedCategory]);
  */

  return (
    <div className='container-fluid'>
      <div className="btn-group w-100 mb-2" role="group">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`btn btn-radius shadow-sm ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <ul className='list-unstyled'>
        {events.map((event) => (
          <li key={event.id}>
            <div className="row justify-content-center flex-column flex-md-row p-4 mb-4 mx-auto w-100 bg-light shadow rounded">
              <div className='col-md-6 col-lg-4'>
                <img className='rounded-3 w-100' src={event.imageUrl} alt={event.title} />
              </div>
              <div className="col-md-6 col-lg-8 d-flex flex-column flex-grow-1 px-4">
                <h2 className="mb-3 mt-3 mt-md-0"><strong>{event.title}</strong></h2>
                <div className="mb-3 d-md-flex justify-content-md-between text-secondary">
                  <span>📅 {event.date}</span><br />
                  <span>📍 {event.location}</span>
                </div>
                <div className="p-3 mb-3 bg-white rounded-3 shadow-sm events-color overflow-auto text-height">
                  {event.description}
                </div>
                <div className='d-flex flex-column mt-md-auto'>
                  <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
                    <Link to={`/events/${event.id}`} className="btn btn-outline-secondary">閱讀全文...</Link>
                    <p className="ms-md-auto mb-0">報名人數 {event.registeredCount}/{event.capacity}</p>
                  </div>
                  <div className="d-flex flex-column flex-md-row gap-1 ms-md-auto">
                    <RegisterButton eventId={event.id} />
                    <button className="btn btn-outline-secondary">收藏❤</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
