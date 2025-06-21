import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8084/events'; // 後台 API

function StarRating({ rating, setRating }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div style={{ display: 'flex', gap: '4px', cursor: 'pointer' }}>
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          onKeyDown={(e) => { if (e.key === 'Enter') setRating(star); }}
          role="button"
          tabIndex={0}
          aria-label={`${star} 星`}
          style={{ fontSize: '24px', color: star <= rating ? '#ffc107' : '#e4e5e9' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function StarDisplay({ rating }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <span style={{ color: '#ffc107', fontSize: '18px' }}>
      {stars.map((star) => (
        <span key={star} style={{ fontSize: '20px', color: star <= rating ? '#ffc107' : '#e4e5e9' }}>
          ★
        </span>
      ))}
    </span>
  );
}

function EventReviews({ eventId, user }) {
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  // 讀取心得列表
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/${eventId}/reviews`);
      const result = await res.json();
      setReviews(result.data || []);
    } catch (err) {
      console.error('讀取心得錯誤', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [eventId]);

  // 提交心得
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('請輸入心得內容');
      return;
    }
    if (!user) {
      alert('請先登入');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${eventId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          username: user.username,
          content,
          rating,
        }),
        credentials: 'include',
      });
      const result = await res.json();
      if(res.status === '403') {
        alert('尚未報名此活動，無法發表心得')
        return;
      }
      if (res.ok) {
        setContent('');
        setRating(5);
        fetchReviews();
      } else {
        alert(result.message || '發表失敗');
      }
    } catch (err) {
      console.error('提交心得錯誤', err);
    }
    setLoading(false);
  };

  return (
    <div className='text-start p-4'>
      <h4 className='mb-3'>活動評價</h4>
      {reviews.length === 0 && <p>尚無心得，快來發表吧！</p>}
      <ul className='list-unstyled'>
        {reviews.map((rev) => (
          <li key={rev.id} className='row border-bottom mb-2'>
            <div className='col-1'>
              <img src={`${import.meta.env.BASE_URL}images/user.png`} className='ms-4' style={{'width': '40px'}}/>
            </div>
            <div className='col-11'>
              <strong>{rev.username}</strong> ({new Date(rev.createdAt).toLocaleString()}) - 評分：{rev.rating ? <StarDisplay rating={rev.rating} /> : '無'}
              <p>{rev.content}</p>
            </div>
          </li>
        ))}
      </ul>
      <h5>{user.username} ! 分享你的感想</h5>
      <div className='row '>
        <div className='col-1'>
          <img src={`${import.meta.env.BASE_URL}images/user.png`} className='ms-4' style={{'width': '40px'}}/>
        </div>
        <form onSubmit={handleSubmit} className='col-10'>
          <div className='d-flex align-items-center'>
              <label>評分：</label>
              <StarRating rating={rating} setRating={setRating} />
          </div>
          <textarea
            className='form-control mb-2'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="寫下你的心得..."
            required
          />
          <button type="submit" disabled={loading}>{loading ? '發表中...' : '發表心得'}</button>
        </form>
      </div>
    </div>
  );
}

export default EventReviews;
