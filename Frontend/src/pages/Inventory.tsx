// import { Box, Button, Modal, Typography } from '@mui/material'
// import Navbar from '../components/Navbar'
// import PageHeader from '../components/PageHeader'
// import { CONTAINER_BG_CLR } from '../assets/colors'
// import AddProductBtn from '../molecules/AddProduct'
// import { useState } from 'react'
// import InventoryTable from '../components/InventoryTable'
// import { supabase } from '../database/supabaseClient'
// import TextInp from '../molecules/InputFeilds'

// const Inventory = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     category: "",
//     quantity: "",
//     price: "",
//   });

//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewProduct((prev) => ({
//       ...prev,
//       [name]: name === "quantity" || name === "price" ? Number(value) : value,
//     }));
//   };

//   const handleAddProduct = async () => {
//     const { error } = await supabase
//       .from("inventory")
//       .insert([newProduct]);

//     if (error) {
//       console.error("Error adding product:", error);
//     } else {
//       handleCloseModal();
//     }
//   };
//   return (
//     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//       <Navbar />
//       <Box sx={{ width: "80%", height: "90vh", padding: "2rem", borderRadius: '20px', backgroundColor: CONTAINER_BG_CLR, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <PageHeader title="Products" />
//           <AddProductBtn title='Add Products' onChange={handleOpenModal} />
//         </Box>
//         <InventoryTable />
//         <Modal open={openModal} onClose={handleCloseModal}>
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: 400,
//               bgcolor: "background.paper",
//               borderRadius: "8px",
//               boxShadow: 24,
//               p: 4,
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 600, color: '#1b2f47' }}>
//               Add New Product
//             </Typography>
//             <TextInp label='Name' value={newProduct.name}
//               onChange={handleChange} name='name' />

//             <TextInp label='category' name="category" value={newProduct.category}
//               onChange={handleChange} />

//             <TextInp label="Quantity"
//               name="quantity" value={newProduct.quantity}
//               onChange={handleChange} />

//             <TextInp label="Price"
//               name="price" value={newProduct.price}
//               onChange={handleChange} />
//             <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//               <Button
//                 variant="contained"
//                 sx={{ marginRight: 1, backgroundColor: '#1b2f47', boxShadow: 'none' }}
//                 onClick={handleCloseModal}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 sx={{ backgroundColor: '#1b2f47', boxShadow: 'none' }}
//                 onClick={handleAddProduct}
//               >
//                 Add
//               </Button>
//             </Box>
//           </Box>
//         </Modal>
//       </Box>
//     </Box>
//   )
// }

// export default Inventory


import { Box, Button, Modal, Typography, MenuItem, Select } from '@mui/material';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import { CONTAINER_BG_CLR } from '../assets/colors';
import AddProductBtn from '../molecules/AddProduct';
import { useEffect, useState } from 'react';
import InventoryTable from '../components/InventoryTable';
import { supabase } from '../database/supabaseClient';
import TextInp from '../molecules/InputFeilds';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getCategoryData } from '../features/Category/CategoryService';
import { setCategoryData } from '../features/Category/CategorySlice';

const Inventory = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    category: '',
    quantity: '',
    price: '',
  });

  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.category.categories);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: any }>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name!]: name === 'quantity' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('InventoryTable')
        .insert([
          {
            id: newProduct.id,
            name: newProduct.name,
            category: newProduct.category,
            quantity: newProduct.quantity,
            price: newProduct.price,
          },
        ])
        .select();
  
      if (error) {
        console.error('Error adding product:', error);
        return;
      }
  
      console.log('Inserted data:', data); // Optional: Log the inserted data
      handleCloseModal(); // Close the modal after successful insertion
      setNewProduct({
        id: '',
        name: '',
        category: '',
        quantity: '',
        price: '',
      });
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };
  


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoryData();
        dispatch(setCategoryData(response));
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
  
    fetchCategories();
  }, [dispatch]);


  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Navbar />
      <Box
        sx={{
          width: '80%',
          height: '90vh',
          padding: '2rem',
          borderRadius: '20px',
          backgroundColor: CONTAINER_BG_CLR,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <PageHeader title="Products" />
          <AddProductBtn title="Add Products" onChange={handleOpenModal} />
        </Box>
        <InventoryTable />

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: '8px',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1b2f47' }}>
              Add New Product
            </Typography>
            <TextInp label="ID" value={newProduct.id} onChange={handleChange} name="id" />
            <TextInp label="Name" value={newProduct.name} onChange={handleChange} name="name" />
            <Typography sx={{ mt: 2, mb: 1 }}>Category</Typography>
            <Select
              value={newProduct.category}
              onChange={(e) =>
                handleChange({
                  target: { name: 'category', value: e.target.value },
                })
              }
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              {categories.map((category: { id: number; category_name: string }) => (
                <MenuItem key={category.id} value={String(category.id)}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
            <TextInp
              label="Quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleChange}
            />
            <TextInp label="Price" name="price" value={newProduct.price} onChange={handleChange} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
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
                onClick={handleAddProduct}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Inventory;
