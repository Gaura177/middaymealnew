'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { Student, SortConfig, SortField } from './types';
import { cn } from "@/lib/utils";

interface DataTableProps {
  data: Student[];
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  isLoading?: boolean;
}

const getBmiStatus = (bmi: number) => {
  if (bmi < 18.5) return {
    label: 'Underweight',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  };
  if (bmi >= 18.5 && bmi < 25) return {
    label: 'Normal',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  };
  if (bmi >= 25 && bmi < 30) return {
    label: 'Overweight',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
  };
  return {
    label: 'Obese',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };
};

const DataTable: React.FC<DataTableProps> = ({ data, sortConfig, onSort, isLoading = false }) => {
  const router = useRouter();
  const renderSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) return null;
    return sortConfig.order === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const SortButton: React.FC<{ field: SortField; children: React.ReactNode }> = ({
    field,
    children,
  }) => (
    <Button
      variant="ghost"
      onClick={() => onSort(field)}
      className="flex items-center font-semibold hover:bg-muted/80"
    >
      {children}
      {renderSortIcon(field)}
    </Button>
  );

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent bg-muted/50">
            <TableHead className="w-[200px]">
              <SortButton field="name">Name</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="childWeight">Child Weight</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="foodWeight">Food Weight</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="height">Height (cm)</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="bmi">BMI Status</SortButton>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`loading-${index}`}>
                <TableCell><Skeleton className="h-4 w-[180px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-6 w-[100px] rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-9 w-[70px]" /></TableCell>
              </TableRow>
            ))
          ) : (
            data.map((student, index) => {
              const bmiStatus = getBmiStatus(student.bmi);
              return (
                <TableRow 
                  key={student.id}
                  className={cn(
                    "transition-colors hover:bg-muted/50",
                    index % 2 === 0 ? "bg-muted/20" : ""
                  )}
                >
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.childWeight.toFixed(1)} kg</TableCell>
                  <TableCell>{student.foodWeight.toFixed(1)} kg</TableCell>
                  <TableCell>{student.height.toFixed(1)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={cn(
                        "flex w-fit items-center",
                        bmiStatus.color
                      )}
                    >
                      {`${student.bmi.toFixed(1)} - ${bmiStatus.label}`}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/students/${student.id}`)}
                      className="flex items-center gap-1 hover:bg-muted"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;