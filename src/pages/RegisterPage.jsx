import { Link, useParams, useNavigate } from 'react-router-dom';
import '../css/registerPage.css';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8084/user/events/register'; // 後台 API

function RegisterPage() {
    const { eventId } = useParams();
    const [registrationId, setRegistrationId] = useState(null);
    const [event, setEvent] = useState(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    const fetchEvent = async() => {
        try {
            const res = await fetch(`${API_URL}/${eventId}`, {
            credentials: 'include',
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        console.log('API 回傳內容：', result);
        setEvent(result.data);
        } catch (err) {
        console.error('讀取錯誤:', err);
        }
    }

    const fetchRegistrationStatus = async() => {
        try {
            const res = await fetch(`${API_URL}/status`, {
              method: 'POST',
              headers: { 'Content-Type': `application/json`},
              credentials: 'include',
              body: JSON.stringify({ userId, eventId })
            });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        console.log('API 回傳內容：', result);
        if (result.data && result.data.status) {
            setStatus(result.data.status);
            setMessage(result.data.status === 'pending' ? '已申請，請靜待審核' :
                       '報名成功，請準時前往 !'
                      );
            setRegistrationId(result.data.id);
        } else {
            setStatus('');
        }
        } catch (err) {
            console.error('讀取錯誤:', err);
        }
    }

    useEffect(() => {
        if(eventId) {
            fetchEvent();
            fetchRegistrationStatus();
        } else {
            console.error('缺少 eventId 參數');
        }

    }, [userId, eventId]);
   
    const handleSubmit = async() => {
        if (!window.confirm('確定要報名嗎？')) return;
        try {
            const res = await fetch(`${API_URL}/${eventId}`, {
              method: 'POST', 
              headers: { 'Content-Type': `application/json`},
              credentials: 'include',
              body: JSON.stringify({ userId, eventId })
            });
            const result = await res.json();
            if (!res.ok) {
                console.error('後端錯誤回應:', result.message);
                setMessage(result.message || '報名失敗');
            }         
            if (res.ok) {
                setMessage(result.message || '已申請，請靜待審核');
                if (result.data && result.data.status) {
                setStatus(result.data.status);
                setRegistrationId(result.data.id)
                }
            } else {
                setMessage(result.message || '報名失敗');
            }
        } catch (err) {
            setMessage('發生錯誤：' + err.message);
            console.error('提交錯誤:', err);
        }
    }

    const handleCancel = async() => {
        if (!window.confirm('確定要取消報名嗎？')) return;
        console.log('registrationId: ', registrationId)
        try {
            const res = await fetch(`${API_URL}/cancel/${registrationId}`,{
                method : 'PUT',
                headers: { 'Content-Type': `application/json`},
                credentials: "include",
                body: JSON.stringify()
            });
            const result = await res.json();
            if (res.ok) {
                setStatus('');
                alert('取消成功');
            } else {
                alert(result.message || '取消失敗');
            }
        } catch (err) {
            console.error('刪除錯誤', err);
            alert('取消失敗，請稍後再試');
        }
    }

    if (!event) return <p>載入中...</p>;

    return(
      <div className="container-fluid d-flex justify-content-center flex-column p-4 mx-auto w-100 bg-light shadow rounded">
        <div className="mx-auto bg-white rounded-4 row py-3" style={{'maxWidth': '1080px'}}>
            <div className="col-md-3">
                <img className='rounded-3 w-100 mb-3' src={`data:image/jpeg;base64,${event.imageBase64}`} />
                <Link to={`/events/${event.id}`} className='event-link'>
                   <p className="mb-3 mt-3 mt-md-0 text-start fs-6"><strong>{event.title}</strong></p>
                </Link>
                <div className='mb-2 d-flex align-items-center gap-1'>
                    <div>
                        <img src={`${import.meta.env.BASE_URL}images/clock.png`} style={{width: '30px', height: '30px'}}/>
                    </div>
                    <span className='fs-14 text-gray'>{event.startTime} 開始<br />{event.endTime} 結束</span>
                </div>
                <div className='mb-2 text-start'>
                    <img src={`${import.meta.env.BASE_URL}images/placeholder.png`} style={{width: '30px'}}/>
                    <span className='fs-14 text-gray'>{event.location}</span>
                </div>
            </div>
            <div className="col-md-9 d-flex flex-column flex-grow-1">
                <form onSubmit={handleSubmit}>
                    <ul className="list-unstyled">
                        <li>
                            <div className="border bg-secondary bg-gradient d-inline-block rounded-3 w-25 mb-1" style={{'--bs-bg-opacity': '.4'}}>聲明與切結</div>
                            <div className="border border-1 rounded-3 bg-white p-2 mb-2 fs-14 text-start text-gray">
                                Yi起Join 活動報名系統由一起動力行銷有限公司（以下簡稱「本公司」）設立，提供運動賽事及相關活動報名、商品購買及收取報名費用之服務。<br />
一、資訊提供與責任聲明<br />
本系統所刊登之所有活動相關資訊（包括價格、圖樣、規格、期間限定及其他約定事項）、服務及商品，均由活動主辦單位或相關廠商提供。本公司不負審查義務，對於內容是否涉及違法或侵害他人權益，恕不承擔任何責任。消費者於報名或購買前，應自行謹慎評估並承擔風險。<br />
二、交易與爭議處理<br />
消費者與廠商間因款項、商品品質（規格、圖樣）、活動舉辦、商品運送、發票開立等契約義務產生爭議，應由雙方自行協商解決，本公司不負任何保證或瑕疵擔保責任。<br />
三、系統處理費<br />
消費者完成訂單送出後，系統將產生「系統處理費」。繳費完成即視為同意支付該費用。系統完成對帳及造冊後，即視為本公司已成功完成交易服務。若發生退費，系統處理費不予退還，且已開立之發票不作廢。<br />
四、風險評估與責任限制<br />
消費者於報名參加活動或購買商品前，應自行審慎評估風險並決定是否參加或購買。若因契約爭議，消費者不得向本公司追究民事或刑事責任，亦不得對本公司帳戶或資產申請假扣押、假處分等保全程序。若因此造成本公司損害，消費者應負完全賠償責任。<br />
五、禁止行為<br />
使用偽造身分證件或冒用他人身份報名，將構成刑法上偽造文書罪，並破壞報名公平性。經查證屬實者，將取消報名資格且費用不予退還。
將名額轉讓或以不正當利益圖利他人，可能觸犯刑法第三百六十條，相關當事人須負相應法律責任，若造成本公司商譽損害，應負完全賠償責任。<br />
六、資料使用<br />
本平台得於未經消費者另行要求前，使用消費者所提供之電子資料進行行銷活動。<br />
七、未成年使用者<br />
若您未滿二十歲，應由您的法定代理人閱讀、理解並同意本聲明內容後，方得使用本服務。您選取同意本聲明，即視為已取得法定代理人同意。<br />
                            </div>
                            <div className="form-check text-start">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required/>
                                <label className="form-check-label fs-14" htmlFor='flexCheckDefault'>
                                    我同意而且己經詳細閱讀上述的報名注意事項與活動簡章內容。
                                </label>
                            </div>
                            <div className="form-check text-start">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" required/>
                                <label className="form-check-label fs-14" htmlFor='flexCheckChecked'>
                                    我同意而且保證會確實遵活動簡章內容，對於活動中需自行負擔的危險性及責任都了解，並同意活動畫面提供大會無償使用 
                                </label>
                            </div>
                            <div className="form-check text-start">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2" required />
                                <label className="form-check-label fs-14" htmlFor='flexCheckChecked2'>
                                    我同意而且己經詳細閱讀一起報名!活動報名系統的特別聲明。
                                </label>
                            </div>
                        </li>
                        <li>
                            {
                                status === '' ? 
                                <button type="submit" className="btn btn-blue text-white">立即報名</button>
                                :   
                                <div>
                                    <button type="button" className="btn btn-blue text-white me-3" disabled>已報名</button>
                                    <button onClick={() => handleCancel()} type="button" className="btn btn-blue text-white">取消報名</button>
                                    {message && <p className='fs-6 align-middle' style={{ color: message.includes('成功') ? 'green' : 'red' }}>{message}</p>}
                                </div>
                            }
                        </li>
                    </ul>
                </form>
            </div>
        </div>
      </div>
    )
}
export default RegisterPage