import { ReactNode, useState } from "react"
import { Control, FieldValues, Path, useController } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { LocationSelect } from "@/components/ui/location-select"
import { Eye, EyeOff } from "lucide-react"

interface Option {
  id: string
  name: string
}

interface AuthFormFieldProps<T extends FieldValues> {
  control?: Control<T>
  name: Path<T>
  label: string
  type?: string
  placeholder?: string
  icon?: ReactNode
  id?: string
  error?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  value?: string
  options?: Option[]
  disabled?: boolean
  autoComplete?: string
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search"
}

export function AuthFormField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  icon, // This icon is for non-password fields, or for the initial display of password field.
  id,
  error,
  onChange,
  onBlur,
  value,
  options = [],
  disabled = false,
  autoComplete,
  inputMode,
}: AuthFormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  // Determine the actual input type for password fields
  const actualType = type === "password" ? (showPassword ? "text" : "password") : type

  // If control is provided, use react-hook-form controller
  if (control) {
    const {
      field,
      fieldState: { error: fieldError },
    } = useController({
      name,
      control,
    })

    return (
      <div className="space-y-2">
        <label htmlFor={id || name} className="text-sm font-medium">
          {label}
        </label>
        <div className="relative">
          {type === "select" ? (
            <LocationSelect
              value={field.value}
              onChange={field.onChange}
              options={options}
              placeholder={placeholder}
              disabled={disabled}
              error={!!fieldError}
              className={fieldError ? "border-red-500" : ""}
            />
          ) : (
            <>
              <Input
                {...field}
                id={id || name}
                type={actualType} // Use actualType here
                placeholder={placeholder}
                autoComplete={autoComplete}
                inputMode={inputMode}
                className={fieldError ? "border-red-500 pr-10" : "pr-10"}
              />
              {type === "password" ? (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2.5 text-muted-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              ) : (
                icon && <div className="absolute right-3 top-2.5">{icon}</div>
              )}
            </>
          )}
        </div>
        {fieldError && (
          <p className="text-sm text-red-500">{fieldError.message}</p>
        )}
      </div>
    )
  }

  // If no control, use as uncontrolled input
  return (
    <div className="space-y-2">
      <label htmlFor={id || name} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id || name}
          name={name}
          type={actualType} // Use actualType here
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          className={error ? "border-red-500 pr-10" : "pr-10"}
        />
        {type === "password" ? (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2.5 text-muted-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        ) : (
          icon && <div className="absolute right-3 top-2.5">{icon}</div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}