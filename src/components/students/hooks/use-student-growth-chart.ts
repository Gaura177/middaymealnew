import { useQuery } from "@tanstack/react-query";
import { getStudentGrowthChartData } from "@/lib/api/students";

/**
 * Hook to fetch student growth chart data.
 * @param id - The ID of the student.
 * @param startDate - Optional start date filter (ISO string).
 * @param endDate - Optional end date filter (ISO string).
 */
export const useStudentGrowthChart = (
  id: string,
  startDate?: string,
  endDate?: string
) => {
  return useQuery({
    // Query key includes id and date filters to refetch when they change
    queryKey: ["studentGrowthChart", id, startDate, endDate],
    queryFn: () => getStudentGrowthChartData(id, startDate, endDate),
    // Only run the query if the id is provided
    enabled: !!id,
    // Optional: Configure staleTime or cacheTime if needed
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });
};