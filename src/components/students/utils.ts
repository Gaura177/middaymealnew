import { Student, SortConfig } from "./types";

const FIRST_NAMES = [
  "Aarav",
  "Diya",
  "Arjun",
  "Zara",
  "Kabir",
  "Anaya",
  "Vihaan",
  "Aisha",
  "Rohan",
  "Priya",
  "Ishaan",
  "Riya",
  "Dev",
  "Mira",
  "Arnav",
];

const LAST_NAMES = [
  "Sharma",
  "Patel",
  "Kumar",
  "Singh",
  "Verma",
  "Mehta",
  "Malhotra",
  "Kapoor",
  "Gupta",
  "Shah",
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(1));
}

function generateRandomName(): string {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${firstName} ${lastName}`;
}

export function generateSampleData(count: number): Student[] {
  return Array.from({ length: count }, (_, index) => {
    const height = randomFloat(100, 180); // cm
    const childWeight = randomFloat(20, 80); // kg
    const bmi = Number((childWeight / Math.pow(height / 100, 2)).toFixed(1));

    return {
      id: `student-${index + 1}`,
      name: generateRandomName(),
      childWeight,
      foodWeight: randomFloat(0.2, 1.0), // kg
      height,
      bmi,
      // Add missing properties with default/random values
      class: `Class ${randomInt(1, 12)}`,
      section: String.fromCharCode(65 + randomInt(0, 3)), // A, B, C, D
      roll_number: `R-${randomInt(1, 50)}`,
      school_id: `school-${randomInt(1, 5)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
}

export function sortStudents(
  data: Student[],
  sortConfig: SortConfig
): Student[] {
  return [...data].sort((a, b) => {
    const { field, order } = sortConfig;
    const multiplier = order === "asc" ? 1 : -1;

    if (field === "name") {
      return multiplier * a[field].localeCompare(b[field]);
    }
    // Add type assertion for numeric fields
    return multiplier * ((a[field] as number) - (b[field] as number));
  });
}

export function paginateData(
  data: Student[],
  currentPage: number,
  itemsPerPage: number
): Student[] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
}
