import React, { useEffect, useRef, useState } from "react";
import { Error } from "./error";
import clsx from "clsx";

const sizes = {
  xSmall: "h-6 text-xs rounded-md",
  small: "h-8 text-sm rounded-md",
  mediumSmall: "h-10 text-sm rounded-md",
  medium: "h-10 text-sm rounded-md",
  large: "h-12 text-base rounded-lg",
};

interface InputProps {
  placeholder?: string;
  size?: keyof typeof sizes;
  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
  prefixStyling?: boolean | string;
  suffixStyling?: boolean | string;
  disabled?: boolean;
  error?: string | boolean;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: React.RefObject<HTMLInputElement | null>;
  className?: string;
  wrapperClassName?: string;
}

export const Input = ({
  placeholder,
  size = "medium",
  prefix,
  suffix,
  prefixStyling = true,
  suffixStyling = true,
  disabled = false,
  error,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  ref,
  className,
  wrapperClassName,
  ...rest
}: InputProps) => {
  const [_value, set_value] = useState(value || "");
  const internalRef = useRef<HTMLInputElement>(null);
  const _ref = ref ?? internalRef;

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_value(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      set_value(value);
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-2" onClick={() => _ref.current?.focus()}>
      {label && (
        <div className="capitalize text-[13px] text-m3-on-surface-variant">{label}</div>
      )}
      <div
        className={clsx(
          "flex items-center duration-150 font-sans",
          error
            ? "shadow-error-input hover:shadow-error-input-hover"
            : "border border-m3-outline/40 hover:border-m3-outline/50 focus-within:border-transparent focus-within:shadow-focus-input",
          sizes[size],
          disabled ? "cursor-not-allowed bg-m3-surface-dim" : "bg-m3-surface",
          wrapperClassName
        )}
      >
        {prefix && (
          <div
            className={clsx(
              "text-m3-on-surface-variant fill-m3-on-surface-variant h-full flex items-center justify-center",
              prefixStyling === true
                ? "bg-m3-surface-container-low border-r border-m3-outline/40 px-3"
                : `pl-3${!prefixStyling ? "" : ` ${prefixStyling}`}`,
              size === "large" ? "rounded-l-lg" : "rounded-l-md"
            )}
          >
            {prefix}
          </div>
        )}
        <input
          className={clsx(
            "w-full inline-flex appearance-none placeholder:text-m3-on-surface-variant placeholder:opacity-70 outline-none",
            size === "xSmall" || size === "mediumSmall" ? "px-2" : "px-3",
            disabled
              ? "cursor-not-allowed bg-m3-surface-dim text-m3-on-surface-variant"
              : "bg-m3-surface text-m3-on-surface",
            className
          )}
          placeholder={placeholder}
          disabled={disabled}
          value={_value}
          onChange={_onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={_ref}
          {...rest}
        />
        {suffix && (
          <div
            className={clsx(
              "text-m3-on-surface-variant fill-m3-on-surface-variant h-full flex items-center justify-center",
              suffixStyling === true
                ? "bg-m3-surface-container-low border-l border-m3-outline/40 px-3"
                : `pr-3${!suffixStyling ? "" : ` ${suffixStyling}`}`,
              size === "large" ? "rounded-r-lg" : "rounded-r-md"
            )}
          >
            {suffix}
          </div>
        )}
      </div>
      {typeof error === "string" && (
        <Error size={size === "large" ? "large" : "small"}>{error}</Error>
      )}
    </div>
  );
};
