"use client";

import { useState } from "react"; // Added useState
import { useParams } from "next/navigation";
import { StudentRegistrationForm } from "@/components/students/registration/form";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useStudent } from "@/components/students/hooks/use-student";
import { useUpdateStudent } from "@/lib/api/students";
import { StudentGrowthChart } from "@/components/students/growth-chart"; // Added Chart Component
import { useStudentGrowthChart } from "@/components/students/hooks/use-student-growth-chart"; // Added Chart Hook
import { DatePicker } from "@/components/ui/date-picker"; // Added DatePicker (assuming path)
import { Label } from "@/components/ui/label"; // Added Label
import { Alert, AlertDescription } from "@/components/ui/alert"; // Added Alert
import { Button } from "@/components/ui/button"; // Added Button

// Basic ISO 8601 validation (adjust regex if more specific format needed)
const isValidISODateString = (dateString: string | undefined): boolean => {
  if (!dateString) return true; // Allow undefined
  // Simple check: YYYY-MM-DDTHH:mm:ss.sssZ
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/;
  return isoRegex.test(dateString);
};


export default function UpdateStudentPage() {
  const params = useParams();
  const router = useRouter();
  const { mutate: updateStudent, isPending: isUpdating } = useUpdateStudent();
  const id = params.id as string;
  const { data: studentData, isLoading: isLoadingStudent, error: studentError } = useStudent(id); // Renamed data/loading/error

  // State for date filters
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startDateISO, setStartDateISO] = useState<string | undefined>();
  const [endDateISO, setEndDateISO] = useState<string | undefined>();
  const [dateError, setDateError] = useState<string | null>(null);

  // Fetch growth chart data
  const { data: growthData, isLoading: isLoadingChart, error: chartError } = useStudentGrowthChart(id, startDateISO, endDateISO);

  const handleDateChange = (type: 'start' | 'end', date: Date | undefined) => {
    let isoString: string | undefined = undefined;
    let currentError: string | null = null;

    if (date) {
      try {
        isoString = date.toISOString();
        if (!isValidISODateString(isoString)) {
           // This case should ideally not happen if date object is valid, but good practice
           isoString = undefined;
           currentError = "Invalid date format generated.";
        }
      } catch (_error) { // Changed e to _error
        isoString = undefined;
        currentError = "Failed to convert date.";
      }
    }

    if (type === 'start') {
      setStartDate(date);
      setStartDateISO(isoString);
    } else {
      setEndDate(date);
      setEndDateISO(isoString);
    }

    // Basic validation: end date should not be before start date
    const currentStartDate = type === 'start' ? date : startDate;
    const currentEndDate = type === 'end' ? date : endDate;
    if (currentStartDate && currentEndDate && currentEndDate < currentStartDate) {
        currentError = "End date cannot be before start date.";
        // Optionally reset the problematic date ISO string
        if (type === 'start') setStartDateISO(undefined);
        if (type === 'end') setEndDateISO(undefined);
    }

    setDateError(currentError);
  };

  const clearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setStartDateISO(undefined);
    setEndDateISO(undefined);
    setDateError(null);
  }

  if (studentError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto"> {/* Increased max-width */}
          <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-lg mb-6"> {/* Added margin */}
            {studentError instanceof Error
              ? studentError.message
              : "Failed to load student data"}
          </div>
        </div>
      </div>
    );
  }

  // Separate loading for student data
  if (isLoadingStudent || !studentData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto"> {/* Increased max-width */}
          {/* Skeleton for form */}
          <Skeleton className="h-[400px] w-full mb-6" />
          {/* Skeleton for chart */}
          <Skeleton className="h-[350px] w-full" />
        </div>
      </div>
    );
  }

  const handleUpdate = (formData: any) => {
    updateStudent(
      { id, data: formData },
      {
        onSuccess: () => {
          router.push("/students");
          router.refresh();
        },
        onError: () => {
          alert("Failed to update student");
        },
      }
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8"> {/* Increased max-width and added spacing */}
        {/* Student Update Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Update Student Details</h2>
          <StudentRegistrationForm
            schoolName={studentData.schoolName || ""}
            initialData={{
              name: studentData.name || "",
              class: studentData.class || "",
              section: studentData.section || "",
              roll_number: studentData.roll_number || "",
              image_url: studentData.image_url || "",
            }}
            onSubmit={handleUpdate}
            submitLabel={isUpdating ? "Updating..." : "Update Student"}
            // disabled={isUpdating} // Removed disabled prop as it's not accepted by the component
          />
        </div>

        {/* Growth Chart Section */}
        <div className="space-y-4">
           <h2 className="text-2xl font-semibold">Growth Chart</h2>

           {/* Date Filters */}
           <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end p-4 border rounded-lg">
             <div className="grid gap-2">
               <Label htmlFor="start-date">Start Date</Label>
               <DatePicker date={startDate} onDateChange={(d: Date | undefined) => handleDateChange('start', d)} id="start-date" />
             </div>
             <div className="grid gap-2">
               <Label htmlFor="end-date">End Date</Label>
               <DatePicker date={endDate} onDateChange={(d: Date | undefined) => handleDateChange('end', d)} id="end-date" />
             </div>
             <Button variant="outline" onClick={clearDates} className="mt-auto">Clear Dates</Button>
           </div>

           {/* Date Validation Error */}
           {dateError && (
             <Alert variant="destructive">
               <AlertDescription>{dateError}</AlertDescription>
             </Alert>
           )}

           {/* Chart Display */}
           {isLoadingChart && (
             <Skeleton className="h-[350px] w-full" />
           )}
           {chartError && (
             <Alert variant="destructive">
               <AlertDescription>
                 {chartError instanceof Error
                   ? chartError.message
                   : "Failed to load chart data"}
               </AlertDescription>
             </Alert>
           )}
           {!isLoadingChart && !chartError && (
             <StudentGrowthChart data={growthData || []} />
           )}
        </div>
      </div>
    </div>
  );
}
