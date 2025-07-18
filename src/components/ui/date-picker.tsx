"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  id?: string; // Optional id for label association
  className?: string; // Allow passing additional classes
}

export function DatePicker({ date, onDateChange, id, className }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          id={id} // Assign id to the trigger button
          className={cn(
            "w-[240px] justify-start text-left font-normal", // Adjusted width
            !date && "text-muted-foreground",
            className // Apply additional classes
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange} // Use the passed handler
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}