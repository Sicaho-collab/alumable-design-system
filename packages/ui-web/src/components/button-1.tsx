import React from "react";
import { Spinner } from "./spinner-1";
import clsx from "clsx";

const sizes = [
  {
    tiny: "px-1.5 h-6 text-sm",
    small: "px-1.5 h-8 text-sm",
    medium: "px-2.5 h-10 text-sm",
    large: "px-3.5 h-12 text-base",
  },
  {
    tiny: "w-6 h-6 text-sm",
    small: "w-8 h-8 text-sm",
    medium: "w-10 h-10 text-sm",
    large: "w-12 h-12 text-base",
  },
];

const types = {
  primary: "bg-m3-on-surface hover:bg-m3-on-surface/90 text-m3-surface fill-m3-surface",
  secondary: "bg-m3-surface hover:bg-m3-outline-variant/20 text-m3-on-surface fill-m3-on-surface border border-m3-outline/40",
  tertiary: "bg-none hover:bg-m3-outline-variant/20 text-m3-on-surface fill-m3-on-surface",
  error: "bg-m3-error hover:bg-m3-error/90 text-m3-on-error fill-m3-on-error",
  warning: "bg-m3-tertiary hover:bg-m3-tertiary-container text-m3-on-tertiary fill-m3-on-tertiary",
};

const shapes = {
  square: { tiny: "rounded", small: "rounded-md", medium: "rounded-md", large: "rounded-lg" },
  circle: { tiny: "rounded-[100%]", small: "rounded-[100%]", medium: "rounded-[100%]", large: "rounded-[100%]" },
  rounded: { tiny: "rounded-[100px]", small: "rounded-[100px]", medium: "rounded-[100px]", large: "rounded-[100px]" },
};

export interface ButtonProps {
  size?: keyof (typeof sizes)[0];
  type?: keyof typeof types;
  variant?: "styled" | "unstyled";
  shape?: keyof typeof shapes;
  svgOnly?: boolean;
  children?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  shadow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: React.Ref<HTMLButtonElement>;
  className?: string;
  "aria-label"?: string;
}

export const Button = ({
  size = "medium",
  type = "primary",
  variant = "styled",
  shape = "square",
  svgOnly = false,
  children,
  prefix,
  suffix,
  shadow = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  ref,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      onClick={onClick}
      tabIndex={0}
      className={clsx(
        "flex justify-center items-center gap-0.5 duration-150",
        sizes[+svgOnly][size],
        disabled || loading
          ? "bg-m3-surface-dim text-m3-on-surface-variant border border-m3-outline-variant cursor-not-allowed"
          : types[type],
        shapes[shape][size],
        shadow && "shadow-border-small border-none",
        fullWidth && "w-full",
        variant === "unstyled"
          ? "outline-none px-0 h-fit bg-transparent hover:bg-transparent text-m3-on-surface"
          : "focus:shadow-focus-ring focus:outline-0",
        className
      )}
      {...rest}
    >
      {loading ? <Spinner size={size === "large" ? 24 : 16} /> : prefix}
      <span
        className={clsx(
          "relative overflow-hidden whitespace-nowrap overflow-ellipsis font-sans",
          size !== "tiny" && variant !== "unstyled" && "px-1.5"
        )}
      >
        {children}
      </span>
      {!loading && suffix}
    </button>
  );
};
