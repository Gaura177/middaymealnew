"use client"

import * as React from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Input } from "./input"

interface Option {
  id: string
  name: string
}

interface LocationSelectProps {
  options: Option[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  error?: boolean
}

export function LocationSelect({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  className,
  error,
}: LocationSelectProps) {
  const [search, setSearch] = React.useState("")
  
  const filteredOptions = React.useMemo(() => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [options, search])

  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectPrimitive.Trigger
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500",
          className
        )}
        disabled={disabled}
      >
        <SelectPrimitive.Value placeholder={placeholder}>
          {value ? options.find((opt) => opt.id === value)?.name : placeholder}
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80"
          position="popper"
          sideOffset={5}
        >
          <div className="flex items-center border-b px-3 py-2">
            <Search className="h-4 w-4 opacity-50" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 border-0 focus-visible:ring-0"
            />
          </div>
          <SelectPrimitive.Viewport className="max-h-[200px] overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-2">
                No results found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <SelectPrimitive.Item
                  key={option.id}
                  value={option.id}
                  className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <Check className="h-4 w-4" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText>{option.name}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))
            )}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}