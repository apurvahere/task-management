import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "link";
  loading?: boolean;
  prefixIcon?: ReactNode;
  postfixIcon?: ReactNode;
};

const Button = ({
  children,
  variant = "primary",
  loading = false,
  prefixIcon,
  postfixIcon,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "flex items-center justify-center gap-2 w-max px-3 py-2 rounded-lg font-medium transition shadow-sm cursor-pointer",
        {
          "bg-blue-500 hover:bg-blue-600 text-white": variant === "primary",
          "bg-gray-200 hover:bg-gray-300 text-gray-800":
            variant === "secondary",
          "bg-red-500 hover:bg-red-600 text-white": variant === "danger",
          "text-gray-800 !shadow-none": variant === "link",
          "opacity-60 cursor-not-allowed": disabled || loading,
        },
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="animate-pulse">Loading...</span>
      ) : (
        <>
          {prefixIcon}
          {children}
          {postfixIcon}
        </>
      )}
    </button>
  );
};

export default Button;
