import RegisterButton from '../components/RegisterButton';

function EventDetailPage() {
  return (
      <div className="container-fluid d-flex justify-content-center flex-column p-4 mx-auto w-100 bg-light shadow rounded">
        <div>
          <img className='rounded-3 w-100' src="https://fakeimg.pl/750x300/ECF5FF?text=750x300" />
        </div>
        <div className="d-flex flex-column flex-grow-1 p-4">
          <h2 className="mb-3 mt-3 mt-md-0"><strong>活動標題</strong></h2>
          <div className="mb-3 d-flex justify-content-between text-secondary">
              <span>📅 活動日期：</span>
              <span>📍 地點：</span>
              <span>📅 報名截止日期：</span>
          </div>
          <div className="p-3 mb-3 bg-white rounded-3 shadow-sm events-color">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet alias ratione, saepe quasi aliquid earum laboriosam ipsam cupiditate error, totam pariatur modi! Molestias vel qui vero quibusdam reprehenderit culpa, quia cumque ratione eaque dolorem excepturi dolor, optio unde et fuga assumenda nemo error deleniti tempora in recusandae aut dignissimos! Quia explicabo autem, rerum commodi distinctio laborum? Ad, vitae illum. Quod iusto delectus fugit dolore. Quas porro obcaecati velit beatae ipsam ad harum molestiae, maxime labore similique voluptates. Nihil dolorum et laboriosam? Debitis quaerat facere, est ratione soluta enim autem reiciendis magni nostrum fugiat necessitatibus perferendis ea iure laboriosam quo iste!
          </div>
          <div className='d-flex flex-column mt-md-auto'>
            <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
              <p className="ms-md-auto mb-0">報名人數 0/40</p>
            </div>
            <div className="d-flex flex-column flex-md-row gap-1 ms-md-auto">
              <RegisterButton eventId={event.id} />
              <button className="btn btn-outline-secondary">收藏❤</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default EventDetailPage