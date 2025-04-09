import * as React from "react";
import { Link } from "react-router-dom"; // <- Import Link
import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-[#fff] text-primary-foreground shadow hover:bg-[#F4ECFE]/90",
  destructive:
    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
  outline:
    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  secondary:
    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeStyles = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  to?: string; // <- For navigation
  replace?: boolean; // <- Optional: same as Link replace prop
  animated?: boolean; // <- Optional: for animation
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      to,
      replace,
      animated = true,
      ...props
    },
    ref
  ) => {
    const animatedStyles = animated
      ? "hover:scale-[1.15] transition-transform duration-[450ms] ease-out"
      : "";
    const buttonClassName = cn(
      baseStyles,
      animatedStyles, // <-- apply conditionally
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    // If "to" is provided, render a Link
    if (to) {
      return (
        <Link
          to={to}
          replace={replace}
          className={buttonClassName}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    // Otherwise, render a button
    return <button className={buttonClassName} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

const buttonVariants = ({
  variant = "default",
  size = "default",
  className = "",
}: {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  className?: string;
} = {}) => {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
};

export { Button, buttonVariants };
