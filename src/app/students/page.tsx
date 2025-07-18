'use client';

import React, { useState, useMemo, useCallback } from 'react';
import DataTable from '@/components/students/data-table';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Pagination from '@/components/students/pagination';
import { sortStudents } from '@/components/students/utils';
import { useStudents } from '@/components/students/hooks/use-students';
import { SortField } from '@/components/students/types';
import { SortConfig } from '@/components/students/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const INITIAL_SORT: SortConfig = { field: 'name', order: 'asc' };
const INITIAL_PAGE = 1;
const INITIAL_ITEMS_PER_PAGE = 10;

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(INITIAL_SORT);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [itemsPerPage, setItemsPerPage] = useState(INITIAL_ITEMS_PER_PAGE);

  // Fetch students data
  const { data, isLoading, error } = useStudents({
    page: currentPage,
    limit: itemsPerPage
  });

  const handleSort = (field: SortField) => {
    setSortConfig(prevConfig => ({
      field,
      order: prevConfig.field === field && prevConfig.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Filter and sort students
  const displayedStudents = useMemo(() => {
    if (!data) return [];
    if (!searchTerm) return data.students;
    
    const filtered = data.students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return sortStudents(filtered, sortConfig);
  }, [data, searchTerm, sortConfig]);

  // Handle search
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when search changes
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Student Data</h2>
          <p className="text-sm text-muted-foreground">
            Monitor student health metrics and nutrition data.
          </p>
        </div>
        <Button asChild size="lg" className="bg-primary text-white shadow-lg hover:bg-primary/90">
          <Link href="/students/add">
            Add Student
          </Link>
        </Button>
      </div>

      <div className="bg-background rounded-lg shadow-sm border">
        {error ? (
          <div className="p-4 text-red-600">
            Error loading students. Please try again later.
          </div>
        ) : (
          <>
            <div className="px-4 py-3 border-b dark:border-border">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by student name..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>
            </div>

            <DataTable
              data={displayedStudents}
              sortConfig={sortConfig}
              onSort={handleSort}
              isLoading={isLoading}
            />
            
            <div className="border-t dark:border-border">
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={data?.total ?? 0}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}