import { supabase } from "../../database/supabaseClient";

export type orderSingleItem = {
    name: string,
    price: string,
    quantity: string,
}



export type OrderItem = {
    id: string; // Assuming 'id' is a string (or number) from Supabase
    created_at: string;
    customer_name: string;
    ph_number: number;
    order: {
        items: Array<{
            name: string;
            price: string; // Price is stored as a string in the database
            quantity: string; // Quantity is stored as a string in the database
        }>;
        total: string;
    };
    status: string;
};
  

export const getOrdersData = async (): Promise<OrderItem[]> => {
    try {
        const { data, error } = await supabase
        .from("Orders")
        .select("*")
        .gte("created_at", new Date().toISOString().split("T")[0]) // Start of today
        .lt("created_at", new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]); 

        if (error) {
            throw new Error(`Error fetching orders data: ${error.message}`);
        }

        if (!Array.isArray(data)) {
            throw new Error("Invalid orders data format received");
        }

        return data.map((order) => ({
            id: order.id,
            created_at: order.created_at,
            customer_name: order.customer_name,
            ph_number: order.ph_number,
            order: {
                items: order.order.items.map((item: orderSingleItem) => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                total: order.order.total,
            },
            status: order.status,
        })) as OrderItem[];
    } catch (error) {
        console.error("Error occurred while fetching orders data:", error);
        return [];
    }
};


