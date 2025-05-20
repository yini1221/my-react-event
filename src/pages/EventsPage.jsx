import { useState } from 'react';
import '../css/eventsPage.css';

function EventsPage() {

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: '所有活動' },
    { id: 'sports', label: '運動' },
    { id: 'art', label: '藝文' },
    { id: 'learning', label: '學習' }
  ];  

  return (
    <div className='container-fluid'>
      <div className="btn-group w-100 " role="group">
        {categories.map((category) => (
          <a
            key={category.id}
            type="button"
            className={`btn btn-outline-secondary btn-radius ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </a>
        ))}
      </div> 
        <ul className='list-unstyled'>
          <li>
            <div className="row justify-content-center flex-column flex-md-row p-4 mt-4 mx-auto w-100 bg-light shadow rounded">
              <div className='col-md-6 col-lg-4'>
                <img className='rounded-3 w-100' src="https://fakeimg.pl/350x250/ECF5FF?text=350x250" />
              </div>
              <div className="col-md-6 d-flex flex-column flex-grow-1 px-4">
                <h2 className="mb-3 mt-3 mt-md-0"><strong>活動標題</strong></h2>
                <div className="mb-3 d-md-flex justify-content-md-between text-secondary">
                    <span>📅 日期</span><br />
                    <span>📍 地點</span>
                </div>
                <div className="p-3 mb-3 bg-white rounded-3 shadow-sm events-color">
                    Lorem ipsum dolor sit amet.
                </div>
                <div className="d-flex flex-column justify-content-end mt-md-auto ms-md-auto">
                  <p className="mb-2 ms-md-auto">報名人數 0/40</p>
                  <div className="d-flex flex-column flex-md-row gap-1 justify-content-center">
                    <button className="btn btn-primary px-4">報名</button>
                    <button className="btn btn-outline-secondary px-4">收藏❤</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="row justify-content-center flex-column flex-md-row p-4 mt-4 mx-auto w-100 bg-light shadow rounded">
              <div className='col-md-6 col-lg-4'>
                <img className='rounded-3 w-100' src="https://fakeimg.pl/350x250/D2E9FF?text=350x250" />
              </div>
              <div className="col-md-6 d-flex flex-column flex-grow-1 px-4">
                <h2 className="mb-3 mt-3 mt-md-0"><strong>活動標題</strong></h2>
                <div className="mb-3 d-md-flex justify-content-md-between text-secondary">
                    <span>📅 日期</span><br />
                    <span>📍 地點</span>
                </div>
                <div className="p-3 mb-3 bg-white rounded-3 shadow-sm events-color">
                    Lorem ipsum dolor sit amet.
                </div>
                <div className="d-flex flex-column justify-content-end mt-md-auto ms-md-auto">
                  <p className="mb-2 ms-md-auto">報名人數 0/40</p>
                  <div className="d-flex flex-column flex-md-row gap-1 justify-content-center">
                    <button className="btn btn-primary px-4">報名</button>
                    <button className="btn btn-outline-secondary px-4">收藏❤</button>
                  </div>
                </div>
              </div>
            </div>
          </li>          
          <li>
            <div className="row justify-content-center flex-column flex-md-row p-4 mt-4 mx-auto w-100 bg-light shadow rounded">
              <div className='col-md-6 col-lg-4'>
                <img className='rounded-3 w-100' src="https://fakeimg.pl/350x250/C4E1FF?text=350x250" />
              </div>
              <div className="col-md-6 d-flex flex-column flex-grow-1 px-4">
                <h2 className="mb-3 mt-3 mt-md-0"><strong>活動標題</strong></h2>
                <div className="mb-3 d-md-flex justify-content-md-between text-secondary">
                    <span>📅 日期</span><br />
                    <span>📍 地點</span>
                </div>
                <div className="p-3 mb-3 bg-white rounded-3 shadow-sm events-color">
                    Lorem ipsum dolor sit amet.
                </div>
                <div className="d-flex flex-column justify-content-end mt-md-auto ms-md-auto">
                  <p className="mb-2 ms-md-auto">報名人數 0/40</p>
                  <div className="d-flex flex-column flex-md-row gap-1 justify-content-center">
                    <button className="btn btn-primary px-4">報名</button>
                    <button className="btn btn-outline-secondary px-4">收藏❤</button>
                  </div>
                </div>
              </div>
            </div>
          </li>          
        </ul>
      </div>
  );
}

export default EventsPage