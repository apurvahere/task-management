import type { ReactNode, InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  prefixIcon?: ReactNode;
  postfixIcon?: ReactNode;
};

const InputField = ({
  prefixIcon,
  postfixIcon,
  className,
  ...props
}: InputProps) => {
  return (
    <div className="relative flex items-center w-full">
      {prefixIcon && (
        <span className="absolute left-3 text-gray-400">{prefixIcon}</span>
      )}

      <input
        {...props}
        className={clsx(
          "w-full border border-gray-300 p-3 rounded-lg transition",
          "focus:outline-none focus:ring-2 focus:ring-blue-400",
          {
            "pl-10": prefixIcon,
            "pr-10": postfixIcon,
          },
          className,
        )}
      />

      {postfixIcon && (
        <span className="absolute right-3 text-gray-400">{postfixIcon}</span>
      )}
    </div>
  );
};

export default InputField;
