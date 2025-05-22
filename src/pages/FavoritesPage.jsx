import RegisterButton from '../components/RegisterButton';
import '../css/favoritesPage.css';

function FavoritesPage() {
  return (
    <div className="container-fluid mt-4">
      <h1>我的收藏</h1>
      <ul className='list-unstyled'>
        <li className='bg-light p-4 rounded-3'>
          <div className='d-flex justify-content-between align-items-center active'>
            <h2>活動名稱</h2>
            <button className="btn btn-primary px-3">刪除</button>
          </div>
          <div className='row mt-3'>
            <div className='col-6'>
              <img className='rounded-3' src="https://fakeimg.pl/350x250/ECF5FF?text=350x250" alt="" />
            </div>
            <div className='col-6 d-flex flex-column'>
              <div className="p-3 mb-3 bg-white rounded-3 shadow-sm events-color overflow-auto p-height">
                  Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.
              </div>                
              <div className='d-flex flex-column mt-md-auto'>
                <div className='d-flex justify-content-between'>
                  <span>📅 2025/7/1</span>
                  <span>📍 新北市中山區</span>
                </div>
                <RegisterButton eventId={event.id} />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default FavoritesPage