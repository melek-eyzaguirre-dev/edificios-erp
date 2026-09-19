import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
          variant === 'primary' && 'bg-ink-800 text-white hover:bg-ink-900',
          variant === 'secondary' && 'bg-ink-100 text-ink-800 hover:bg-ink-200',
          variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
