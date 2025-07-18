// API Types
export interface ApiStudent {
  id: string;
  name: string;
  class: string;
  section: string;
  roll_number: string;
  school_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T[];
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

// Extended Student type with health metrics
export interface Student extends ApiStudent {
  childWeight: number;
  foodWeight: number;
  height: number;
  bmi: number;
  schoolName?: string; // Added optional schoolName
  image_url?: string; // Added optional image_url
}

// Sorting
export type SortField = keyof Student;
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

// API Parameters
export interface StudentParams {
  page: number;
  limit: number;
}

// Pagination
export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
export interface GrowthChartDataPoint {
  timestamp: string; // ISO 8601 format string
  weightKg: number;
  heightCm: number;
  bmi: number;
}