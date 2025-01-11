import { Box, Typography } from '@mui/material'
type CardProps = {
    title: string,
    salesfigure: string | number | undefined,
}

const SalesCard = ({ title, salesfigure }: CardProps) => {
    return (
        <Box sx={{ width: '20%', borderRadius: 2, textAlign: 'left', padding: '1rem', boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'}}>
            <Typography sx={{ fontWeight: 600, color: 'rgba(24, 24, 24, 0.48)' }}>{title}</Typography>
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.69)', fontWeight: 600, fontSize: '1.7rem', alignItems:'center' }}> ₹{salesfigure}</Typography>
        </Box>
    )
}

export default SalesCard