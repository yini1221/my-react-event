import { useNavigate } from 'react-router-dom';

function RegisterButton({ eventId, className = "btn btn-primary px-4", label = '報名'}) {
    const navigate = useNavigate();

    const goToRegisterPage = (eventId) => {
        navigate(`/user/events/register/${eventId}`);
    };

    return(
        <button onClick={goToRegisterPage} className={className}>
            {label}
        </button>
    )
}

export default RegisterButton