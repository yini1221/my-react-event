import Swiper from 'swiper';

function ProfilePage() {
  
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

  return (
    <>
      <div className="container mt-4">
        <h1>個人資訊</h1>
        <p>這裡會顯示您的個人資訊和報名紀錄。</p>
      </div>
      <div class="container">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="card">
              <img src="https://github.com/hexschool/2022-web-layout-training/blob/main/2023web-camp/tool1.png?raw=true" alt="" />
              <h3>1</h3>
              <p>content 1</p>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card">
              <img src="https://github.com/hexschool/2022-web-layout-training/blob/main/2023web-camp/tool1.png?raw=true" alt="" />
              <h3>2</h3>
              <p>content 2</p>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card">
              <img src="https://github.com/hexschool/2022-web-layout-training/blob/main/2023web-camp/tool1.png?raw=true" alt="" />
              <h3>3</h3>
              <p>content 3</p>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card">
              <img src="https://github.com/hexschool/2022-web-layout-training/blob/main/2023web-camp/tool1.png?raw=true" alt="" />
              <h3>4</h3>
              <p>content 4</p>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card">
              <img src="https://github.com/hexschool/2022-web-layout-training/blob/main/2023web-camp/tool1.png?raw=true" alt="" />
              <h3>5</h3>
              <p>content 5</p>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card">
              <img src="https://github.com/hexschool/2022-web-layout-training/blob/main/2023web-camp/tool1.png?raw=true" alt="" />
              <h3>6</h3>
              <p>content 6</p>
            </div>
          </div>
        </div>
        
      <div class="swiper-pagination"></div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <div class="swiper-scrollbar"></div>
      </div>
    </div>
    </>
  );
}

export default ProfilePage