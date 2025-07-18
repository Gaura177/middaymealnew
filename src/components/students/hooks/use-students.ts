import { useQuery } from "@tanstack/react-query";
import { ApiResponse, ApiStudent, Student, StudentParams } from "../types";
import { apiClient } from "@/lib/api/client";

// Function to generate random health metrics
const addHealthMetrics = (student: ApiStudent): Student => {
  const weight = 20 + Math.random() * 40; // 20-60 kg
  const height = 120 + Math.random() * 50; // 120-170 cm
  const foodWeight = 0.2 + Math.random() * 0.3; // 0.2-0.5 kg
  const bmi = weight / Math.pow(height / 100, 2);

  return {
    ...student,
    childWeight: weight,
    height: height,
    foodWeight: foodWeight,
    bmi: bmi,
  };
};

// Fetch and transform students data
const fetchStudents = async ({
  page,
  limit,
}: StudentParams): Promise<{
  students: Student[];
  total: number;
}> => {
  const response = await apiClient.get<ApiResponse<ApiStudent>>(
    `/api/students?page=${page}&limit=${limit}`
  );
  const students = response.data.data.map(addHealthMetrics);
  const total = response.data.meta?.total ?? 0;

  return {
    students,
    total,
  };
};

export const useStudents = (params: StudentParams) => {
  return useQuery({
    queryKey: ["students", params],
    queryFn: () => fetchStudents(params),
    placeholderData: (oldData) => oldData, // Keep old data while fetching new data
    staleTime: 5000, // Consider data fresh for 5 seconds
  });
};
