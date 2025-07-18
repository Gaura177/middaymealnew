import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios"; // Removed unused import
import { StudentFormData } from "../validations/student";
import { GrowthChartDataPoint, Student } from "@/components/students/types"; // Added Student
import { apiClient } from "./client";

export const useRegisterStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: StudentFormData) => {
      console.log("[Debug] API Request:", {
        endpoint: "/api/students",
        payload: data
      });

      try {
        const response = await apiClient.post("/api/students", data);
        console.log("[Debug] API Response:", {
          status: response.status,
          data: response.data
        });
        return response;
      } catch (error: unknown) { // Changed any to unknown
        console.error("[Debug] API Error:", {
          status: (error as { response?: { status?: number } })?.response?.status,
          message: (error as { response?: { data?: { message?: string } } })?.response?.data?.message,
          error
        });
        throw error;
      }
    },
    onSuccess: () => {
      console.log("[Debug] Invalidating students cache");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: Error) => { // Changed any to Error
      // Log structured error info
      console.error("[Debug] Mutation Error:", {
        name: error.name,
        message: error.message,
        response: {
          status: (error as { response?: { status?: number } })?.response?.status,
          statusText: (error as { response?: { statusText?: string } })?.response?.statusText,
          data: (error as { response?: { data?: unknown } })?.response?.data
        }
      });
      throw error;
    }
  });
}

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<StudentFormData> & { image?: File | string } }) => { // Changed any to a more specific type
      let response;
      if (data.image && data.image instanceof File) {
        const fd = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (key === "image" && value instanceof File) {
            fd.append("image", value);
          } else if (key !== "image" && value !== undefined && value !== null) {
            fd.append(key, String(value));
          }
        });
        response = await apiClient.put(`/api/students/${id}`, fd);
      } else {
        const payload = { ...data };
        if (typeof payload.image === 'string') {
          // keep image_url as is
        } else {
          delete payload.image; 
        }
        response = await apiClient.put(
          `/api/students/${id}`,
          payload,
        );
      }
      return response.data;
    },
    onSuccess: (_data: unknown, variables) => { // Changed any to unknown
      queryClient.invalidateQueries({ queryKey: ["students"] });
      if (variables && variables.id) {
        queryClient.invalidateQueries({ queryKey: ["students", variables.id] });
      }
    },
  });
};

// Fetch a single student by ID
export const getStudentById = async (id: string): Promise<Partial<Student>> => { 
  const response = await apiClient.get(`/api/students/${id}`);
  const raw: { data?: Student } | Student | { studentName?: string, school_name?: string, imageUrl?: string, rollNumber?: string } = response.data as any; // Added 'as any'
  let student: Partial<Student>;
  if (raw && typeof raw === "object" && "data" in raw && raw.data) {
    student = raw.data;
  } else {
    student = raw as Student;
  }

  return {
    name: student.name || (student as any).studentName || "",
    class: student.class || "",
    section: student.section || "",
    roll_number: student.roll_number || (student as any).rollNumber || "",
    schoolName: student.schoolName || (student as any).school_name || "",
    image_url: student.image_url || (student as any).imageUrl || "",
  };
};

// Fetch student growth chart data by ID, optionally filtered by date
export const getStudentGrowthChartData = async (
  id: string,
  startDate?: string,
  endDate?: string
): Promise<GrowthChartDataPoint[]> => {
  const params = new URLSearchParams();
  if (startDate) {
    params.append("startDate", startDate);
  }
  if (endDate) {
    params.append("endDate", endDate);
  }

  const queryString = params.toString();
  const url = `/api/students/${id}/growth-chart${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await apiClient.get<GrowthChartDataPoint[] | { data: GrowthChartDataPoint[] }>(url); 
    const rawData = response.data; 
    return Array.isArray(rawData) ? rawData : (rawData as {data: GrowthChartDataPoint[]})?.data || [];
  } catch (error) {
    console.error(`[Debug] Error fetching growth chart data for student ${id}:`, error);
    throw error; 
  }
};