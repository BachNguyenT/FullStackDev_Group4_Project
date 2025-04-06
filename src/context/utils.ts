import { twMerge } from "tailwind-merge"

type ClassValue = string | number | boolean | undefined | null | Record<string, boolean | undefined | null>

export function cn(...inputs: ClassValue[]): string {
  // Replace clsx functionality with custom implementation
  const classes = inputs.reduce<string[]>((result, input) => {
    if (input === undefined || input === null || input === false) {
      return result
    }

    // Handle string/number inputs
    if (typeof input === 'string' || typeof input === 'number') {
      result.push(input.toString())
      return result
    }

    // Handle object inputs (conditionally apply classes)
    if (typeof input === 'object') {
      for (const key in input) {
        const value = input[key]
        if (value) {
          result.push(key)
        }
      }
    }

    return result
  }, [])

  // Join all classes with spaces and merge with tailwind-merge
  return twMerge(classes.join(' '))
}
