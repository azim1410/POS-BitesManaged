import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchBar from '../../molecules/SearchBar';
import { PRIMARY_CLR } from '../../assets/colors';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { getCategoryData } from '../../features/Category/CategoryService';
import { setCategoryData } from '../../features/Category/CategorySlice';
import { useDispatch } from 'react-redux';


type CategoryTableProps = {
    id: number,
    category_name: string,
}

const CategoryTable = () => {
  const dispatch = useDispatch();
      const [data, setData] = useState<CategoryTableProps[]>([]);
      const [searchQuery, setSearchQuery] = useState<string>("");
      const [editedData, setEditedData] = useState<CategoryTableProps[]>([]);
      const [editItem, setEditItem] = useState<CategoryTableProps | null>(null);
      const [openEditDialog, setOpenEditDialog] = useState(false);

      const onChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    
        const filteredData = data.filter(
          (item) =>
            item.category_name.toLowerCase().includes(query)
        );
    
        setEditedData(filteredData);
      };

       useEffect(() => {
          const getData = async () => {
            const response = await getCategoryData();
            if (response.every(item => 'id' in item && 'category_name' in item)) {
                setData(response);
                setEditedData(response);
                dispatch(setCategoryData(response));
            } else {
                console.error('Invalid data structure received from API');
            }
        };
          getData();
        }, [dispatch]);
  return (
    <Box>
        <SearchBar value={searchQuery} onChange={onChangeData}/>
        <Box sx={{ padding: 2 }}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: '60vh',
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            boxShadow: "none",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow >
                <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>ID</TableCell>
                <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>Name</TableCell>
                <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ fontSize: '1rem' }}>{item.id}</TableCell>
                  <TableCell sx={{ fontSize: '1rem' }}>{item.category_name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="medium"
                    //   onClick={() => handleEdit(item)}
                    >
                      <MdModeEdit />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="medium"
                    //   onClick={() => handleDelete(item.id)}
                      sx={{ marginLeft: "0.5rem" }}
                    >
                      <MdDeleteForever />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {editedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No matching records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {editItem && (
        <Modal open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
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
              Edit Item
            </Typography>

            <TextField
              label="Category"
              fullWidth
              margin="normal"
              value={editItem.category_name}
              onChange={(e) =>
                setEditItem({ ...editItem, category_name: e.target.value })
              }
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                sx={{ marginRight: 1, backgroundColor: '#1b2f47', boxShadow: 'none' }}
                onClick={() => setOpenEditDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#1b2f47', boxShadow: 'none' }}
                // onClick={handleEditSave}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Modal>

      )}
    </Box>
  )
}

export default CategoryTable