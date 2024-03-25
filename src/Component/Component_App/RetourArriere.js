import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RetourArriere = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <ArrowBackIcon onClick={goBack}/>
    </div>
  );
};

export default RetourArriere;
