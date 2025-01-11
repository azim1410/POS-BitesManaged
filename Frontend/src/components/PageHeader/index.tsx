import { Box, Typography } from '@mui/material';
import { HEADER_TXT_CLR } from '../../assets/colors';
type PageHeaderProps = {
  title: string;
};

const PageHeader = ({ title}: PageHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <Typography variant="h4" sx={{fontWeight: 600, color: HEADER_TXT_CLR}}>{title}</Typography>
    </Box>
  );
};

export default PageHeader;
