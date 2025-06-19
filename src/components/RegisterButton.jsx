import { useNavigate } from 'react-router-dom';

function RegisterButton({ eventId, className = "btn btn-blue px-4 text-white", label = '我要報名'}) {

    const navigate = useNavigate();

    const goToRegisterPage = () => {
        navigate(`/user/events/register/${eventId}`);
    };

    return(
        <button onClick={goToRegisterPage} type='button' className={className}>
            {label}
        </button>
    )
}

export default RegisterButton