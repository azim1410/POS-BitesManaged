import { Box, Stack } from '@mui/material'
import NavLogo from '../../atoms/Navlogo'
import NavBtn from '../../atoms/NavBtn'
import { PiHamburger } from "react-icons/pi";
import { PiNewspaperClippingLight } from "react-icons/pi";
import { GrAnalytics } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { IoPricetagOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <Box sx={{ width:'15%', height:'100vh',  padding:'1rem',overflow:'hidden'}}>
        <NavLogo companyName="BitesManaged 🍕"/>
        <Box sx={{ marginTop:'2rem'}}>
        <Stack spacing={2} direction="column">
            <NavBtn title="POS" nav="/" icon={<PiNewspaperClippingLight />} />
            <NavBtn title="Orders" nav="/orders" icon={<BsCart2 />}/>
            <NavBtn title="Products" nav="/inventory" icon={<PiHamburger /> }/>
            <NavBtn title='Category' nav="/category" icon={<IoPricetagOutline />}/>
            <NavBtn title='Analytics' nav="/analytics" icon={<GrAnalytics />}/>
            <NavBtn title='Account' nav='/' icon={<IoSettingsOutline />}/>
        </Stack>
        </Box>
    </Box>
  )
}

export default Navbar