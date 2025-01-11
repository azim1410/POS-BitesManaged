import { TextField } from '@mui/material'

type TxtFeildProps = {
    label: string,
    name: string,
    value: string | number | null,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const TextInpSmall = ({ label, name, value, onChange }: TxtFeildProps) => {
    return (
        <TextField
            label={label}
            name={name}
            margin="normal"
            value={value}
            onChange={onChange}
            size="small"
            sx={{
                margin: 0,
                padding: 0,
                fontSize: '0.8rem',
                '& .MuiInputBase-root': {
                    height: '30px',
                },
                '& .MuiInputBase-input': {
                    padding: '5px',
                },
                '& .MuiFormLabel-root': {
                    fontSize: '0.75rem',
                },
            }}
        />
    )
}

export default TextInpSmall