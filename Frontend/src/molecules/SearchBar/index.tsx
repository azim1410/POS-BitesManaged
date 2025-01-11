import { Box, TextField } from '@mui/material'

type SearchbarProps = {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
const SearchBar = ({value, onChange}: SearchbarProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding:'1rem' }}>

        <TextField
          value={value}
          onChange={onChange}
          id="search"
          label="🔍 Search"
          variant="outlined"
          sx={{
            backgroundColor: "white",
            width: "60%",
            marginBottom: "1rem",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#e8e8e8",
                borderWidth: "2px",
                borderRadius: '10px'
              },
              "&:hover fieldset": {
                borderColor: "#aaaaaa",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#e8e8e8",
                borderWidth: "2px",
              },
            },
          }}
        />

      </Box>
  )
}

export default SearchBar