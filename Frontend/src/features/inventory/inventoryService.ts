// import { supabase } from "../../database/supabaseClient";

// // Define the InventoryItem type
// export type InventoryItem = {
//     id: number;
//     name: string;
//     category: string;
//     quantity: number;
//     price: number;
// };

// export const getInventoryData = async (): Promise<InventoryItem[]> => {
//     try {
//         const { data: inventory, error } = await supabase
//             .from("inventory")
//             .select("*");

//         if (error) {
//             throw new Error(`Error fetching inventory data: ${error.message}`);
//         }

//         return (inventory as InventoryItem[]) || [];
//     } catch (error) {
//         console.error("Error occurred while fetching inventory data:", error);
//         return [];
//     }
// };


import { supabase } from "../../database/supabaseClient";

// Define the InventoryItem type
export type InventoryItem = {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
};

export const getInventoryData = async (): Promise<InventoryItem[]> => {
    try {
        const { data, error } = await supabase
            .from("inventory")
            .select("*");

        if (error) {
            throw new Error(`Error fetching inventory data: ${error.message}`);
        }

        if (!Array.isArray(data)) {
            throw new Error("Invalid inventory data format received");
        }

        // Validate each item in the array
        return data.map((item) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            price: item.price,
        })) as InventoryItem[];
    } catch (error) {
        console.error("Error occurred while fetching inventory data:", error);
        return [];
    }
};
