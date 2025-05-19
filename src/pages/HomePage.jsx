import Swiper from 'swiper';

function HomePage()
{

  const swiper = new Swiper('.swiper', {
    // 分頁   
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // 左右箭頭    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // 滾動條
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
  });  

  const images = [
    'https://fakeimg.pl/300x200/000?text=Image+1',
    'https://fakeimg.pl/300x200/000?text=Image+2',
    'https://fakeimg.pl/300x200/000?text=Image+3',
    'https://fakeimg.pl/300x200/000?text=Image+4',
    'https://fakeimg.pl/300x200/000?text=Image+5',
    'https://fakeimg.pl/300x200/000?text=Image+6',
    'https://fakeimg.pl/300x200/000?text=Image+7',
    'https://fakeimg.pl/300x200/000?text=Image+8',
    'https://fakeimg.pl/300x200/000?text=Image+9',
  ];

  const groupedImages = [];
  for (let i = 0; i < images.length; i += 3) {
    groupedImages.push(images.slice(i, i + 3));
  }

  return (
    <>

      <div className="position-relative w-100 ms-auto">
        <img
          src="https://fakeimg.pl/1920x1080/000?text=1920x1080"
          alt="Banner"
          className="w-100 object-fit-cover img-banner" />
      </div>      
      {/* Bootstrap 5 輪播圖 */}
      <div className="container my-5">
        <div id="multiImageCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {groupedImages.map((group, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <div className="d-flex justify-content-center gap-3">
                  {group.map((imgSrc, idx) => (
                    <img key={idx} src={imgSrc} className="img-fluid" alt={`Slide ${idx}`} style={{ width: '30%' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 控制箭頭 */}
          <button className="carousel-control-prev" type="button" data-bs-target="#multiImageCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#multiImageCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>


    </>
  );
}

export default HomePage