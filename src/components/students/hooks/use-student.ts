import { useQuery } from "@tanstack/react-query";
import { getStudentById } from "@/lib/api/students";

export const useStudent = (id: string) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudentById(id),
    enabled: !!id,
    staleTime: 5000,
  });
};