import React, { ChangeEvent, FocusEvent, ReactNode } from "react";

interface InputProps<T extends string | number> {
  type?: string;
  bclass?: string;
  placeholder?: string;
  label?: ReactNode;
  value?: T;
  onChange?: (value: T) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export function Input<T>({
  type,
  placeholder,
  bclass,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
}: InputProps<string | number>) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const typedValue = event.target.value as unknown as T;
      if (typeof typedValue === "string" || typeof typedValue === "number") {
        onChange(typedValue);
      }
    }
  };

  return (
    <div>
      {label && <label className="form-label">{label}</label>}
      <input
        className={bclass || ""}
        type={type || ""}
        placeholder={placeholder || ""}
        value={value === undefined ? "" : value}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
}

//export default Input;
