import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import RegisterButton from '../components/registerButton';
import { Link, useParams } from 'react-router-dom';
import EventReviews from '../pages/EventReviews';
import '../css/eventDetailPage.css';

const API_URL = 'http://localhost:8084/events'; // 後台 API
const FAVORITE_URL = 'http://localhost:8084/user/favorites'; // 收藏 API

function EventDetailPage() {

  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [registrationCount, setRegistrationCount] = useState(0);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;

  const fetchEvent = async() => {
    try {
      const res = await fetch(`${API_URL}/${eventId}`, {
        credentials: 'include',
      })
      const result = await res.json();
      setEvent(result.data);
    } catch (err) {
      console.error('讀取錯誤:', err);
    }
  };

  const fetchRandomEvents = async(categoryId) => {
    if (!categoryId) return;
    try {
      const res = await fetch(`${API_URL}/random-events/${categoryId}`, {
        credentials: "include"
      });
      const result = await res.json();
      setEvents(result.data || []);
    } catch (err) {
        console.error('讀取錯誤:', err);
    }
  };

  const checkFavorite = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${FAVORITE_URL}/check/${userId}/${eventId}`, {
         credentials: 'include' 
        });
      const result = await res.json();
      setIsFavorited(result.data);
    } catch (err) {
      console.error('收藏錯誤:', err);
    }
  };

  const toggleFavorite = async () => {
    if (!userId) {
      setErrorMessage('登入後即可收藏');
      setTimeout(() =>{
        setErrorMessage('');
      }, 3000)
      return;
    }
    try {
      let res;
      if (isFavorited) {
        res = await fetch(`${FAVORITE_URL}/${userId}/${eventId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        setIsFavorited(false);
      } else {
        res = await fetch(`${FAVORITE_URL}/${userId}/${eventId}`, {
          method: 'POST',
          credentials: 'include',
        });
      }
      if (!res.ok) {
        const result = await res.json();
        console.error('API 錯誤:', result);
        alert('操作失敗，請稍後再試');
        return;
     }
      setIsFavorited(!isFavorited)
    } catch (err) {
      console.error('切換收藏錯誤:', err);
    }
  };

  const fetchRegistrationCount = async() => {
    try {
      const res = await fetch(`${API_URL}/${eventId}/registration-count`, {
        credentials: "include"
      })
      const result = await res.json();
      if(res.ok) {
        setRegistrationCount(result.data)
      } else {
        console.error('取得報名人數錯誤：', result.message);
      }
    } catch (err) {
        console.error('讀取錯誤:', err);      
    }
  };

  useEffect(() => {
    fetchEvent();
    fetchRegistrationCount();
  },[eventId])

  useEffect(() => {
    if (event && event.eventCategory && event.eventCategory?.id) {
      fetchRandomEvents(event.eventCategory.id);
    }
  }, [event]);

  useEffect(() => {
    checkFavorite();
  }, [eventId, userId]);

  const formatDateTime = (datetime, type) => {
  if (!datetime) return 'N/A';
  if (type === 'startTime' || type === 'endTime') {
      return dayjs(datetime).format('YYYY-MM-DD HH:mm');
      }
  return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');
  };

  if (!event) return <p>載入中...</p>;
  
  const eventStarted = new Date(event.startTime) <= new Date();

  return (
      <div className="container-fluid d-flex justify-content-center flex-column p-4 mx-auto">
        <div className='mx-auto bg-white rounded-4' style={{'maxWidth': '1080px'}}>
          <div className='shadow mb-4'>
            <div>
              <img className='w-100 rounded-3' src={`data:image/jpeg;base64,${event.imageBase64}`}/>
            </div>
            <div className='row p-4'>
              <div className='col-lg-8'>
                <div className='text-start mb-2'>
                  <span className="p-2 btn-blue badge" style={{ userSelect: 'none', cursor: 'default' }}>
                    {event.eventCategory?.name}
                  </span>
                  </div>
                <h2 className="mb-3 mt-3 mt-md-0 text-start"><strong>{event.title}</strong></h2>
                <div className='border rounded-4 shadow-sm p-4'>
                  <div className="mb-3 text-secondary text-start">
                    <div className='mb-2'>
                      <img className='me-3' src={`${import.meta.env.BASE_URL}images/clock.png`} style={{width: '25px'}}/>
                      {formatDateTime(event.startTime, 'startTime')} - {formatDateTime(event.endTime, 'endTime')}
                    </div>
                    <div className='mb-2'>
                      <img className='me-3' src={`${import.meta.env.BASE_URL}images/placeholder.png`} style={{width: '25px'}}/>
                      {event.location}
                    </div>
                  </div>
                  <div className="p-3 text-secondary border rounded-5 ">
                      {event.description}
                  </div>
                </div>
              </div>
              <div className='col-lg-4'>
                <div className='rounded-3 shadow-sm py-5 px-4'>                  
                  <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
                    <p className="">目前報名人數 {registrationCount}/{event.maxParticipants}</p>
                  </div>
                  <div className="d-flex flex-column flex-md-row gap-1 ms-md-auto">
                    <RegisterButton eventId={event.id} />
                    <button className={`btn btn-heart ${isFavorited ? 'bg-heart' : ''}`}
                    onClick={() => toggleFavorite()}>
                      <img src={`${import.meta.env.BASE_URL}images/heart.png`} className='me-2' style={{width: '25px'}}/>
                    {isFavorited ? 
                      <span className='fs-6 align-middle'>已收藏</span>
                    : <span className='fs-6 align-middle'>加入收藏</span>}
                    </button>
                  </div>
                  {errorMessage && (
                    <div className="alert alert-danger mt-2 py-2 px-3" role="alert">
                      {errorMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
            {eventStarted ? (
              <EventReviews eventId={eventId} user={user} />
            ) : (
                <p className='p-3'>活動尚未開始，暫時無法發表心得分享。</p>
            )}
          <div>
            <h2>你可能會喜歡這些活動</h2>
            <div className="container mb-3">
              <div className="row gy-5">
                {events.map((event) => (
                <div key={event.id} className="col-lg-4 col-md-6">
                  <Link to={`/events/${event.id}`} className='h-100'>
                  <div className='card h-100 p-0 card-rounded'>
                    <img src={`data:image/jpeg;base64,${event.imageBase64}`} className="card-img-top card-img-rounded" />
                    <div className='card-body text-start'>
                      <p className="card-text m-0 time-text ">
                        {event.startTime} - {event.endTime}
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
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default EventDetailPage