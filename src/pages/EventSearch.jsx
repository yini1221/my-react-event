import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Link, useSearchParams } from 'react-router-dom';

const API_URL = 'http://localhost:8084/home/search';

function EventSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?keyword=${encodeURIComponent(keyword)}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      setEvents(result.data || []);
    } catch (err) {
      console.error('搜尋錯誤:', err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword.trim() === '') {
      setEvents([]);
      return;
    }
    fetchEvents();
  }, [keyword]);

    const formatDateTime = (datetime, type) => {
        if (!datetime) return 'N/A';
        if (type === 'startTime' || type === 'endTime') {
            return dayjs(datetime).format('YYYY-MM-DD HH:mm');
            }
        return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');
    };

  return (
    <div className='container-fluid overflow-hidden mt-3 mb-3'>
        <div className='mx-auto' style={{'maxWidth': '1080px'}}>
                <div className='mx-auto my-3 p-1 alert alert-light rounded-5 shadow overflow-hidden'>
                    <span className='fs-4'>搜尋結果 ' {keyword} '</span>
                </div>
                {loading && <p>搜尋中...</p>}
                {!loading && events.length === 0 ? <p className='p-2'>找不到相關活動</p> :
            <div className="row gy-5">
                {events.map((event) => (
                    <div className="col-md-4 col-sm-6 h-card" key={event.id}>
                        <Link to={`/events/${event.id}`} className='h-100'>
                        <div className='card h-100 p-0 card-rounded'>
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
                    </div>
                ))}
            </div>}
        </div>
    </div>
  );
}

export default EventSearch;
