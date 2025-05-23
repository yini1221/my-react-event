import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

function HomePage() {
  const images = [
    'https://fakeimg.pl/300x200/ECF5FF?text=Image+1',
    'https://fakeimg.pl/300x200/D2E9FF?text=Image+2',
    'https://fakeimg.pl/300x200/C4E1FF?text=Image+3',
    'https://fakeimg.pl/300x200/ACD6FF?text=Image+4',
    'https://fakeimg.pl/300x200/97CBFF?text=Image+5',
    'https://fakeimg.pl/300x200/84C1FF?text=Image+6',
    'https://fakeimg.pl/300x200/66B3FF?text=Image+7',
    'https://fakeimg.pl/300x200/46A3FF?text=Image+8',
    'https://fakeimg.pl/300x200/2894FF?text=Image+9',
  ];

  return (
    <>
      <div className="position-relative w-100 ms-auto">
        <img
          src="https://fakeimg.pl/1920x1080/e3f2fd?text=1920x1080"
          alt="Banner"
          className="w-100 object-fit-cover img-banner"
        />
      </div>

      {/* Swiper 輪播 */}
      <div className="container my-5">
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
            768: {
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
                <img src={img} className="img-fluid" alt={`Slide ${index}`} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default HomePage;