import { supabase } from "../../database/supabaseClient";



export const calculateTodaysSales = async (): Promise<number> => {
    try {
        const todayStart = new Date().toISOString().split("T")[0];
        const tomorrowStart = new Date(new Date().setDate(new Date().getDate() + 1))
            .toISOString()
            .split("T")[0];

        const { data, error } = await supabase
            .from("Orders")
            .select("order->>total", { count: "exact" }) // Select only the "total" field from the JSON
            .gte("created_at", todayStart)
            .lt("created_at", tomorrowStart);

        if (error) {
            throw new Error(`Error calculating today's sales: ${error.message}`);
        }

        if (!data || data.length === 0) {
            return 0; // No sales today
        }

        // Sum the "total" field
        const totalSales = data.reduce((sum, order) => sum + parseFloat(order.total), 0);

        return totalSales;
    } catch (error) {
        console.error("Error occurred while calculating today's sales:", error);
        return 0;
    }
};


export const calculateSales = async (): Promise<{ past7Days: number; pastMonth: number; pastYear: number }> => {
    try {
        const todayStart = new Date().toISOString();  // Include time for accurate filtering
        const tomorrowStart = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();

        // Calculate the start date for 7 days ago, 1 month ago, and 1 year ago
        const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();
        const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();

        // Helper function to calculate sales for a given time period
        const calculatePeriodSales = async (startDate: string, endDate: string): Promise<number> => {
            const { data, error } = await supabase
                .from("Orders")
                .select("order->>total", { count: "exact" }) // Select only the "total" field from the JSON
                .gte("created_at", startDate)
                .lt("created_at", endDate);

            if (error) {
                throw new Error(`Error calculating sales for period ${startDate} to ${endDate}: ${error.message}`);
            }

            if (!data || data.length === 0) {
                return 0; // No sales for this period
            }

            // Sum the "total" field
            const totalSales = data.reduce((sum, order) => {
                const total = parseFloat(order.total);  // Ensure the total is a valid number
                return isNaN(total) ? sum : sum + total; // Ignore invalid totals
            }, 0);

            return totalSales;
        };

        // Calculate sales for past 7 days, 1 month, and 1 year
        const past7DaysSales = await calculatePeriodSales(sevenDaysAgo, tomorrowStart);
        const pastMonthSales = await calculatePeriodSales(oneMonthAgo, tomorrowStart);
        const pastYearSales = await calculatePeriodSales(oneYearAgo, tomorrowStart);

        return {
            past7Days: past7DaysSales,
            pastMonth: pastMonthSales,
            pastYear: pastYearSales,
        };
    } catch (error) {
        console.error("Error occurred while calculating sales:", error);
        return { past7Days: 0, pastMonth: 0, pastYear: 0 };
    }
};


export const calculateSalesPerDayLast7Days = async (): Promise<number[]> => {
    try {
        const todayStart = new Date().toISOString(); // Include time for accurate filtering
        const tomorrowStart = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();
        
        // Helper function to calculate sales for a specific day
        const calculateDaySales = async (startDate: string, endDate: string): Promise<number> => {
            const { data, error } = await supabase
                .from("Orders")
                .select("order->>total", { count: "exact" }) // Select only the "total" field from the JSON
                .gte("created_at", startDate)
                .lt("created_at", endDate);

            if (error) {
                throw new Error(`Error calculating sales for date ${startDate}: ${error.message}`);
            }

            if (!data || data.length === 0) {
                return 0; // No sales for this day
            }

            // Sum the "total" field
            const totalSales = data.reduce((sum, order) => {
                const total = parseFloat(order.total);  // Ensure the total is a valid number
                return isNaN(total) ? sum : sum + total; // Ignore invalid totals
            }, 0);

            return totalSales;
        };

        // Get the sales per day for the last 7 days
        const salesPerDay = [];

        for (let i = 0; i < 7; i++) {
            const dayStart = new Date(new Date().setDate(new Date().getDate() - i)).toISOString();
            const dayEnd = new Date(new Date().setDate(new Date().getDate() - i + 1)).toISOString();

            const dailySales = await calculateDaySales(dayStart, dayEnd);
            salesPerDay.push(dailySales);
        }

        return salesPerDay.reverse();  // Reverse the array to show sales from oldest to newest
    } catch (error) {
        console.error("Error occurred while calculating sales per day for the last 7 days:", error);
        return [];
    }
};




