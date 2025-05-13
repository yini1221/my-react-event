function EventsPage()
{
  return (
    <div className="container mt-4">
      <div id="multiImageCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="d-flex justify-content-center gap-3">
              <img src="https://fakeimg.pl/300x200/000?text=Image+1" className="img-fluid" style={{ width: '30%' }} />
              <img src="https://fakeimg.pl/300x200/000?text=Image+2" className="img-fluid" style={{ width: '30%' }} />
              <img src="https://fakeimg.pl/300x200/000?text=Image+3" className="img-fluid" style={{ width: '30%' }} />
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex justify-content-center gap-3">
              <img src="https://fakeimg.pl/300x200/000?text=Image+4" className="img-fluid" style={{ width: '30%' }} />
              <img src="https://fakeimg.pl/300x200/000?text=Image+5" className="img-fluid" style={{ width: '30%' }} />
              <img src="https://fakeimg.pl/300x200/000?text=Image+6" className="img-fluid" style={{ width: '30%' }} />
            </div>
          </div>
        </div>

        {/* 控制按鈕 */}
        <button className="carousel-control-prev" type="button" data-bs-target="#multiImageCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#multiImageCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default EventsPage