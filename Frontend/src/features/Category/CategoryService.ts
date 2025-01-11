import { supabase } from "../../database/supabaseClient";
import { CategoryItem } from "./CategorySlice";

export const getCategoryData = async (): Promise<CategoryItem[]> => {
    try {
        const { data, error } = await supabase
            .from("Category")
            .select("*");

        if (error) {
            throw new Error(`Error fetching inventory data: ${error.message}`);
        }

        if (!Array.isArray(data)) {
            throw new Error("Invalid Category data format received");
        }

        // Validate each item in the array
        return data.map((item) => ({
            id: item.id,
            category_name: item.category_name
        })) as CategoryItem[];
    } catch (error) {
        console.error("Error occurred while fetching inventory data:", error);
        return [];
    }
};