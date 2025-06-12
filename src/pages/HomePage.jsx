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

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);

  const fetchEvents = async (e) => {
    try {
      const res = await fetch(API_URL, {
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
      fetchEvents();
      fetchBannerImage();
  }, []);

  const formatDateTime = (datetime, type) => {
      if (!datetime) return 'N/A';
      if (type === 'startTime' || type === 'endTime') {
          return dayjs(datetime).format('YYYY-MM-DD HH:mm');
          }
      return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');
  };
  
  const categories = [
    { id: 'all', icon: `${import.meta.env.BASE_URL}images/event.png`, label: '所有活動' },
    { id: 'sports', icon: `${import.meta.env.BASE_URL}images/running.png`, label: '運動' },
    { id: 'art', icon: `${import.meta.env.BASE_URL}images/palette.png`, label: '藝文' },
    { id: 'learning', icon: `${import.meta.env.BASE_URL}images/book.png`, label: '學習' }
  ];

  return (<>
  <div className='container-fluid shadow mb-3'>
      <ul style={{'maxWidth': '1080px'}} className="flex-wrap btn-group w-100 list-unstyled my-0 mx-auto category-nav" role="group">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`w-25 h-100 ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}>
            <a href="#" className='d-flex align-items-center justify-content-center position-relative category h-100'>
              <img src={category.icon} alt={`${category.label} icon`}/>
              <span className='align-middle category-fs'>{category.label}</span>
            </a>
          </li>
        ))}
      </ul>
  </div>
    <div className="container-fluid container-lg px-3">
      <div className="bg-light mt-0 mx-auto" style={{'maxWidth': '1080px'}}>
        <div className='w-100'>
          { bannerImage && bannerImage.imageBase64 ? (
            <Link to={`/events/${bannerImage.id}`}>
              <img
                src={`data:image/jpeg;base64,${bannerImage.imageBase64}`}
                alt={bannerImage.title || "Banner"}
                className="w-100 object-fit-cover img-banner rounded-4"
                style={{height: 'auto'}}
              />
            </Link>
          ) : (
            <div>載入中或無圖片</div>
          )}
        </div>
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
                  <Link to={`/events/${event.id}`}>
                    <div className='card p-0 card-rounded'>
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


              {/* {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <Link to={`/events/${index}`}>
                    <div className='card p-0 card-rounded'>
                      <img src={img.img} className="card-img-top card-img-rounded" alt={`Slide ${index}`} />
                      <div className='card-body text-start'>
                        <p className="card-text m-0 time-text ">{img.time}</p>
                        <p className="card-title fs-5 text-start text-dark">{img.title}</p>
                        <div className="location">
                          <img src={`${import.meta.env.BASE_URL}images/location.png`}/>
                          <span className='align-middle location-text'>{img.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper> */}
        </div>
      </div>
    </div>
  </>);
}

export default HomePage;
