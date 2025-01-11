import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
type NavBtn = {
    title: string,
    nav: string,
    icon: JSX.Element | null;
}
const NavBtn = ({title, nav, icon}: NavBtn) => {
    const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(`${nav}`)}
    
    sx={{
      color: '#3b4966',
      justifyContent: 'flex-start',
      textAlign: 'left', 
      width: '100%', 
      borderRadius: 4,
      padding: '0.6rem',
      ":hover":{
        backgroundColor:'rgba(233, 244, 255, 0.47)',
      }
    }}>
      <Typography sx={{marginRight:'1rem', fontSize:25}}>{icon}</Typography>
      <Typography sx={{fontSize:'1rem', fontWeight: 600}}>{title}</Typography>

    </Button>
  )
}

export default NavBtn