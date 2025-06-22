import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import '../css/homePage.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8084/home'; // 後台 API

function HomePage() {

  const [eventCategories, setEventCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);

  // 讀取分類資料
  const fetchEventCategories = async() => {
    try {
        const res = await fetch(`${API_URL}/categories`, {
            credentials: "include"
        });
        const result = await res.json();
        console.log('API 回傳內容：', result);
        setEventCategories(result.data || []);
    } catch (err) {
        console.error('讀取錯誤:', err);
    }
  }

  const fetchEvents = async(categoryId) => {
    try {
      const id = categoryId !== 'all' ? `/${categoryId}` : '';
      const res = await fetch(`${API_URL}${id}`, {
        credentials: "include"
      });
      const result = await res.json();
      console.log('API 回傳內容：', result);
      setEvents(result.data || []);
    } catch (err) {
        console.error('讀取錯誤:', err);
    }
  }

  const fetchBannerImage = async (e) => {
    try {
      const res = await fetch(`${API_URL}/random-banner`, {
        credentials: 'include'
      });
      const result = await res.json();
      console.log('API 回傳內容:', result);
      setBannerImage(result.data || null);
    } catch (err) {
        console.error('讀取錯誤:', err);
    }
  }

  useEffect(() => {
    fetchEvents(selectedCategory);
    fetchEventCategories();
    if (selectedCategory === 'all') {
      fetchBannerImage();
    } else {
      setBannerImage(null);
    }
  }, [selectedCategory]);


  const handleCategoryClick = (categoryId, e) => {
    e.preventDefault();
    setSelectedCategory(categoryId);
  }


  const formatDateTime = (datetime, type) => {
      if (!datetime) return 'N/A';
      if (type === 'startTime' || type === 'endTime') {
          return dayjs(datetime).format('YYYY-MM-DD HH:mm');
          }
      return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');
  };

  return (<>
    <div className='container-fluid shadow mb-3 '>
        <ul style={{'maxWidth': '1080px'}} className="flex-wrap btn-group w-100 list-unstyled my-0 mx-auto" role="group">
          <li 
            key='all' 
            className={`category-nav w-25 ${selectedCategory ==='all' ? 'category-active' : ''}`}
            onClick={(e) => handleCategoryClick('all', e)}>
            <button type='button' className='h-100 w-100 rounded-0 border-0 d-flex align-items-center justify-content-center position-relative category'>
              <img src={`${import.meta.env.BASE_URL}images/event.png`}/>
              <span className='align-middle category-fs'>所有活動</span>
            </button>
          </li>
          {eventCategories.map((eventCategory) => (
            <li
              key={eventCategory.id}
              className={`category-nav w-25 ${selectedCategory === eventCategory.id ? 'category-active' : ''}`}
              onClick={(e) => handleCategoryClick(eventCategory.id, e)}>
              <button type='button' className='h-100 w-100 rounded-0 border-0 d-flex align-items-center justify-content-center position-relative category'>
                <img src={`${import.meta.env.BASE_URL}images/event.png`}/>
                <span className='align-middle category-fs'>{eventCategory.name}</span>
              </button>
            </li>
          ))}
        </ul>
    </div>
    <div className="container-fluid container-lg px-3">
      <div className="bg-light mt-0 mx-auto" style={{'maxWidth': '1080px'}}>
        { selectedCategory === 'all' ? (
          <div>
              { bannerImage && bannerImage.imageBase64 ? (
                <div className='w-100'>
                    <Link to={`/events/${bannerImage.id}`}>
                      <img
                        src={`data:image/jpeg;base64,${bannerImage.imageBase64}`}
                        alt={bannerImage.title || "Banner"}
                        className="w-100 object-fit-cover img-banner rounded-4"
                        style={{height: 'auto'}}
                      />
                    </Link>
                </div>
              ) : (''
              )}
            {/* Swiper 輪播 */}
            <div className='d-block pb-4 mt-3'>
              <h2 className='mb-0 py-3 fs-5 text-start'>熱門推薦</h2>
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={24}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  breakpoints={{
                    // 螢幕寬度 >= 0px 時（手機）
                    0: {
                      slidesPerView: 1,
                      slidesPerGroup: 1,
                    },
                    // >= 768px（平板）
                    576: {
                      slidesPerView: 2,
                      slidesPerGroup: 2,
                    },
                    // >= 992px（桌機）
                    992: {
                      slidesPerView: 3,
                      slidesPerGroup: 3,
                    },
                  }}
                >
                  {events.map((event) => (
                  <SwiperSlide key={event.id}>
                      <Link to={`/events/${event.id}`} className='h-100'>
                        <div className='card p-0 card-rounded h-100'>
                          <img src={`data:image/jpeg;base64,${event.imageBase64}`} className="card-img-top card-img-rounded" alt={`Slide ${event.id}`} />
                          <div className='card-body text-start'>
                            <p className="card-text m-0 time-text ">
                              {formatDateTime(event.startTime, 'startTime')} - {formatDateTime(event.endTime, 'endTime')}
                            </p>
                            <p className="card-title fs-5 text-start text-dark">{event.title}</p>
                            <div className="location">
                              <img src={`${import.meta.env.BASE_URL}images/location.png`}/>
                              <span className='align-middle location-text'>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
            </div>
          </div>
          )
          : (
            <div className="container overflow-hidden mb-3">
              <div className="row gy-5">
                {events.map((event) => (
                <div className="col-md-4 col-sm-6 h-card" key={event.id}>
                  <Link to={`/events/${event.id}`} className='h-100'>
                  <div className='card h-100 p-0 card-rounded'>
                    <img src={`data:image/jpeg;base64,${event.imageBase64}`} className="card-img-top card-img-rounded" alt={`Slide ${event.id}`} />
                    <div className='card-body text-start'>
                      <p className="card-text m-0 time-text ">
                        {formatDateTime(event.startTime, 'startTime')} - {formatDateTime(event.endTime, 'endTime')}
                      </p>
                      <p className="card-title fs-5 text-start text-dark">{event.title}</p>
                      <div className="location">
                        <img src={`${import.meta.env.BASE_URL}images/location.png`}/>
                        <span className='align-middle location-text'>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
                ))}
              </div>
            </div>
          )
        }
      </div>
    </div>
  </>);
}

export default HomePage;
