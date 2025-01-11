import { Box, Button, Modal, Typography } from '@mui/material'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import PageHeader from '../components/PageHeader'
import AddProductBtn from '../molecules/AddProduct'
import { CONTAINER_BG_CLR } from '../assets/colors'
import CategoryTable from '../components/CategoryTable'
import TextInp from '../molecules/InputFeilds'
import { supabase } from '../database/supabaseClient'

const Categories = () => {
    const [openModal, setOpenModal] = useState(false);
    const [newCategory, setNewCategory] = useState({
        category_name: '',
    })
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCategory((prev) => ({
          ...prev,
          [name]:  value,
        }));
      };

     const handleAddCategory = async () => {
         const { error } = await supabase
           .from("Category")
           .insert([newCategory]);
     
         if (error) {
           console.error("Error adding product:", error);
         } else {
           handleCloseModal();
         }
       };
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Navbar />
            <Box sx={{ width: "80%", height: "90vh", padding: "2rem", borderRadius: '20px', backgroundColor: CONTAINER_BG_CLR, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <PageHeader title="Category" />
                    <AddProductBtn title='Add Category' onChange={handleOpenModal} />
                </Box>
                <CategoryTable />

                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            borderRadius: "8px",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1b2f47' }}>
                            Add New Category
                        </Typography>

                        <TextInp label='Category Name' name="category_name" value={newCategory.category_name}
                            onChange={handleChange} />

                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            <Button
                                variant="contained"
                                sx={{ marginRight: 1, backgroundColor: '#1b2f47', boxShadow: 'none' }}
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#1b2f47', boxShadow: 'none' }}
                                onClick={handleAddCategory}
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>

        </Box>
    )
}

export default Categories