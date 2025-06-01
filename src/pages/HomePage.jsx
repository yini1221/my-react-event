import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import '../css/homePage.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

function HomePage() {

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', icon: 'event.png', label: '所有活動' },
    { id: 'sports', icon: 'running.png', label: '運動' },
    { id: 'art', icon: 'palette.png', label: '藝文' },
    { id: 'learning', icon: 'book.png', label: '學習' }
  ];

  const images = [
    {img: 'event5.jpg', time: '2025.06.05 (四) 19:30 - 06.19 (四) 21:30', title: '春之藝術行政專業系列課程', location: '台北市'},
    {img: 'event4.jpg', time: '2025.05.30 (五) 10:00 - 06.08 (日) 17:30', title: '牽手 | 城市藝廊攝影聯展', location: '新北市'},
    {img: 'event1.jpg', time: '2025.07.05 (六) 09:00 - 12:00', title: '森活四季，療癒之旅｜夏日限定・台塑楊梅有機生態農場', location: '桃園市'},
    {img: 'event2.jpg', time: '2025.07.04 (五) 13:30 - 07.12 (六) 16:00', title: '【夏日限定】金箔大理石海螺×生命靈數精油茶燭', location: '台北市'},
    {img: 'event3.jpg', time: '2025.06.05 (四) 14:00 - 17:00', title: '🏮老靈魂新玩法！文化創新超展開🎯｜活動通了沒 #7 (台中場)', location: '台中市'}
  ];

  return (
    <>
      <div className="position-relative w-100">
        <ul className="btn-group w-100 mb-2 list-unstyled" role="group">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`w-100 shadow ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}>
              <a href="#" className='d-block position-relative category '>
                <img src={category.icon} alt={`${category.label} icon`}/>
                <span className='align-middle'>{category.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Swiper 輪播 */}
      <div className="container-fluid mt-2 bg-light">
        <div>
          <img
            src='simple3.jpg'
            alt="Banner"
            className="w-100 object-fit-cover img-banner rounded-4"
            style={{height: '47vw'}}
            />
        </div>      
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
                
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <Link to={`/events/${index}`}>
                    <div className='card p-0 card-rounded'>
                      <img src={img.img} className="card-img-top card-img-rounded" alt={`Slide ${index}`} />
                      <div className='card-body text-start'>
                        <p className="card-text m-0 time-text ">{img.time}</p>
                        <p className="card-title fs-5 text-start text-dark">{img.title}</p>
                        <div className="location">
                          <img src="location.png"/>
                          <span className='align-middle location-text'>{img.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
        </div>
      </div>
    </>
  );
}

export default HomePage;