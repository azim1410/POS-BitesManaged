import { useEffect, useState } from "react";
import { supabase } from "../../database/supabaseClient.ts";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { PRIMARY_CLR } from "../../assets/colors/index.ts";
import { getInventoryData } from "../../features/inventory/inventoryService.ts";
import { useDispatch } from "react-redux";
import { setInventoryData } from "../../features/inventory/inventorySlice.ts";
import SearchBar from "../../molecules/SearchBar/index.tsx";

type InventoryDatatype = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
};

const InventoryTable = () => {
  const [data, setData] = useState<InventoryDatatype[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editedData, setEditedData] = useState<InventoryDatatype[]>([]);
  const [editItem, setEditItem] = useState<InventoryDatatype | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const dispatch = useDispatch();
  // Handle Search Query
  const onChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );

    setEditedData(filteredData);
  };


  useEffect(() => {
    const getData = async () => {
      const response = await getInventoryData();
      if (response.every(item => 'id' in item && 'name' in item && 'category' in item)) {
          setData(response);
          setEditedData(response);
          dispatch(setInventoryData(response));
      } else {
          console.error('Invalid data structure received from API');
      }
  };
    getData();
  }, [dispatch]);

  // Delete Item
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("inventory").delete().eq("id", id);
    if (error) {
      console.error("Error deleting item:", error);
    } else {
      setData((prev) => prev.filter((item) => item.id !== id));
      setEditedData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Open Edit Dialog
  const handleEdit = (item: InventoryDatatype) => {
    setEditItem(item);
    setOpenEditDialog(true);
  };

  // Handle Edit Save
  const handleEditSave = async () => {
    if (!editItem) return;

    const { error } = await supabase
      .from("inventory")
      .update({
        name: editItem.name,
        category: editItem.category,
        quantity: editItem.quantity,
        price: editItem.price,
      })
      .eq("id", editItem.id);

    if (error) {
      console.error("Error updating item:", error);
    } else {
      setData((prev) =>
        prev.map((item) => (item.id === editItem.id ? editItem : item))
      );
      setEditedData((prev) =>
        prev.map((item) => (item.id === editItem.id ? editItem : item))
      );
      setOpenEditDialog(false);
      setEditItem(null);
    }
  };

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
                <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>Category</TableCell>
                <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>Quantity</TableCell>
                <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>Price</TableCell>
                <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ fontSize: '1rem' }}>{item.id}</TableCell>
                  <TableCell sx={{ fontSize: '1rem' }}>{item.name}</TableCell>
                  <TableCell sx={{ fontSize: '1rem' }}>{item.category}</TableCell>
                  <TableCell sx={{ fontSize: '1rem' }}>{item.quantity}</TableCell>
                  <TableCell sx={{ fontSize: '1rem', fontWeight: 600 }}>₹ {item.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="medium"
                      onClick={() => handleEdit(item)}
                    >
                      <MdModeEdit />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="medium"
                      onClick={() => handleDelete(item.id)}
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

      {/* Edit Dialog */}
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
              label="Name"
              fullWidth
              margin="normal"
              value={editItem.name}
              onChange={(e) =>
                setEditItem({ ...editItem, name: e.target.value })
              }
            />

            <TextField
              label="Category"
              fullWidth
              margin="normal"
              value={editItem.category}
              onChange={(e) =>
                setEditItem({ ...editItem, category: e.target.value })
              }
            />

            <TextField
              label="Quantity"
              type="number"
              fullWidth
              margin="normal"
              value={editItem.quantity}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  quantity: parseInt(e.target.value) || 0,
                })
              }
            />

            <TextField
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              value={editItem.price}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  price: parseFloat(e.target.value) || 0,
                })
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
                onClick={handleEditSave}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Modal>

      )}
    </Box>
  );
};

export default InventoryTable;
