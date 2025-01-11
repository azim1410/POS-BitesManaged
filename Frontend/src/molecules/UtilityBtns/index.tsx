import { Box, Button } from '@mui/material'
import { PRIMARY_CLR } from '../../assets/colors'

type UtilityProps = {
    save: () => void,
    kot:() => void,
    reset: () => void,
}

const UtilityBtns = ({save, kot, reset}: UtilityProps) => {
    return (
        <Box>
            <Button variant="contained" onClick={save}
                sx={{
                    backgroundColor: PRIMARY_CLR,
                    borderRadius: "8px",
                    boxShadow: "none",
                    marginRight: '0.5rem'
                }}>Save</Button>
            <Button variant="contained" onClick={kot}
                sx={{
                    backgroundColor: PRIMARY_CLR,
                    borderRadius: "8px",
                    boxShadow: "none",
                    marginRight: '0.5rem'
                }}>KOT</Button>
            <Button variant="contained" onClick={reset}
                sx={{
                    backgroundColor: PRIMARY_CLR,
                    borderRadius: "8px",
                    boxShadow: "none",
                }}>Reset</Button>
        </Box>
    )
}

export default UtilityBtns