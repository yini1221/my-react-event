import { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterButton from '../components/RegisterButton';
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
      <div className="btn-group w-100 mb-2" role="group">
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
          <div className="row justify-content-center flex-column flex-md-row p-4 mb-4 mx-auto w-100 bg-light shadow rounded">
            <div className='col-md-6 col-lg-4'>
              <img className='rounded-3 w-100' src="https://fakeimg.pl/350x300/ECF5FF?text=350x300" />
            </div>
            <div className="col-md-6 col-lg-8 d-flex flex-column flex-grow-1 px-4">
              <h2 className="mb-3 mt-3 mt-md-0"><strong>活動標題</strong></h2>
              <div className="mb-3 d-md-flex justify-content-md-between text-secondary">
                  <span>📅 日期</span><br />
                  <span>📍 地點</span>
              </div>
              <div className="p-3 mb-3 bg-white rounded-3 shadow-sm events-color overflow-auto text-height">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet alias ratione, saepe quasi aliquid earum laboriosam ipsam cupiditate error, totam pariatur modi! Molestias vel qui vero quibusdam reprehenderit culpa, quia cumque ratione eaque dolorem excepturi dolor, optio unde et fuga assumenda nemo error deleniti tempora in recusandae aut dignissimos! Quia explicabo autem, rerum commodi distinctio laborum? Ad, vitae illum. Quod iusto delectus fugit dolore. Quas porro obcaecati velit beatae ipsam ad harum molestiae, maxime labore similique voluptates. Nihil dolorum et laboriosam? Debitis quaerat facere, est ratione soluta enim autem reiciendis magni nostrum fugiat necessitatibus perferendis ea iure laboriosam quo iste!
              </div>
              <div className='d-flex flex-column mt-md-auto'>
                <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
                  <Link to="/events/{id}" className="btn btn-outline-secondary">閱讀全文...</Link>
                  <p className="ms-md-auto mb-0">報名人數 0/40</p>
                </div>
                <div className="d-flex flex-column flex-md-row gap-1 ms-md-auto">
                  <RegisterButton eventId={event.id} />
                  <button className="btn btn-outline-secondary">收藏❤</button>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="row justify-content-center flex-column flex-md-row p-4 mx-auto w-100 bg-light shadow rounded">
            <div className='col-md-6 col-lg-4'>
              <img className='rounded-3 w-100' src="https://fakeimg.pl/350x250/D2E9FF?text=350x250" />
            </div>
            <div className="col-md-6 col-lg-8 d-flex flex-column flex-grow-1 px-4">
              <h2 className="mb-3 mt-3 mt-md-0"><strong>活動標題</strong></h2>
              <div className="mb-3 d-md-flex justify-content-md-between text-secondary">
                  <span>📅 日期</span><br />
                  <span>📍 地點</span>
              </div>
              <div className="p-3 mb-3 bg-white rounded-3 shadow-sm events-color overflow-auto text-height">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet alias ratione, saepe quasi aliquid earum laboriosam ipsam cupiditate error, totam pariatur modi! Molestias vel qui vero quibusdam reprehenderit culpa, quia cumque ratione eaque dolorem excepturi dolor, optio unde et fuga assumenda nemo error deleniti tempora in recusandae aut dignissimos! Quia explicabo autem, rerum commodi distinctio laborum? Ad, vitae illum. Quod iusto delectus fugit dolore. Quas porro obcaecati velit beatae ipsam ad harum molestiae, maxime labore similique voluptates. Nihil dolorum et laboriosam? Debitis quaerat facere, est ratione soluta enim autem reiciendis magni nostrum fugiat necessitatibus perferendis ea iure laboriosam quo iste!
              </div>
              <div className='d-flex flex-column mt-md-auto'>
                <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
                  <Link to="/events/{id}" className="btn btn-outline-secondary">閱讀全文...</Link>
                  <p className="ms-md-auto mb-0">報名人數 0/40</p>
                </div>
                <div className="d-flex flex-column flex-md-row gap-1 ms-md-auto">
                  <button className="btn btn-primary px-4">報名</button>
                  <button className="btn btn-outline-secondary">收藏❤</button>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="row justify-content-center flex-column flex-md-row p-4 mx-auto w-100 bg-light shadow rounded">
            <div className='col-md-6 col-lg-4'>
              <img className='rounded-3 w-100' src="https://fakeimg.pl/350x250/C4E1FF?text=350x250" />
            </div>
            <div className="col-md-6 col-lg-8 d-flex flex-column flex-grow-1 px-4">
              <h2 className="mb-3 mt-3 mt-md-0"><strong>活動標題</strong></h2>
              <div className="mb-3 d-md-flex justify-content-md-between text-secondary">
                  <span>📅 日期</span><br />
                  <span>📍 地點</span>
              </div>
              <div className="p-3 mb-3 bg-white rounded-3 shadow-sm events-color overflow-auto text-height">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet alias ratione, saepe quasi aliquid earum laboriosam ipsam cupiditate error, totam pariatur modi! Molestias vel qui vero quibusdam reprehenderit culpa, quia cumque ratione eaque dolorem excepturi dolor, optio unde et fuga assumenda nemo error deleniti tempora in recusandae aut dignissimos! Quia explicabo autem, rerum commodi distinctio laborum? Ad, vitae illum. Quod iusto delectus fugit dolore. Quas porro obcaecati velit beatae ipsam ad harum molestiae, maxime labore similique voluptates. Nihil dolorum et laboriosam? Debitis quaerat facere, est ratione soluta enim autem reiciendis magni nostrum fugiat necessitatibus perferendis ea iure laboriosam quo iste!
              </div>
              <div className='d-flex flex-column mt-md-auto'>
                <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
                  <Link to="/events/{id}" className="btn btn-outline-secondary">閱讀全文...</Link>
                  <p className="ms-md-auto mb-0">報名人數 0/40</p>
                </div>
                <div className="d-flex flex-column flex-md-row gap-1 ms-md-auto">
                  <button className="btn btn-primary px-4">報名</button>
                  <button className="btn btn-outline-secondary">收藏❤</button>
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