import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, Button, TableBody } from '@mui/material'
import { getOrdersData, OrderItem } from '../../features/orders/OrderServices';
import { PRIMARY_CLR } from '../../assets/colors';
import { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import SearchBar from '../../molecules/SearchBar';


const OrderDetail = () => {
    const [allOrders, setAllOrders] = useState<OrderItem[]>([]);
    const [editedData, setEditedData] = useState<OrderItem[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    useEffect(() => {
        const getAllOrders = async () => {
            const response = await getOrdersData();
            setEditedData(response);
            setAllOrders(response);
        }
        getAllOrders();
    }, []);

    const onChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filteredData = allOrders.filter(
            (item) =>
                item.customer_name.toLowerCase().includes(query) ||
                item.created_at.toLowerCase().includes(query)
        );

        setEditedData(filteredData);
    };
    return (
        <Box sx={{ justifyContent: 'space-between' }}>
            <SearchBar value={searchQuery} onChange={onChangeData}/>

            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: '60vh',
                    backgroundColor: "#ffffff",
                    borderRadius: "15px",
                    boxShadow: "none",
                    overflowY:'scroll',
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>OID</TableCell>
                            <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>Date</TableCell>
                            <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>Name</TableCell>
                            <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>Status</TableCell>
                            <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>Amount</TableCell>
                            <TableCell sx={{ color: PRIMARY_CLR, fontWeight: 600, fontSize: '1.3rem' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {editedData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell sx={{ fontSize: '1rem' }}>{item.id}</TableCell>
                                <TableCell sx={{ fontSize: '1rem' }}>{item.created_at.slice(0, 10)}</TableCell>
                                <TableCell sx={{ fontSize: '1rem' }}>{item.customer_name}</TableCell>
                                <TableCell sx={{ fontSize: '1rem' }}>{item.status}</TableCell>
                                <TableCell sx={{ fontSize: '1rem', fontWeight: 600 }}>₹ {item.order.total}</TableCell>
                                <TableCell>
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
    )
}

export default OrderDetail