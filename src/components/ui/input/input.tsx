"use client";

import { Eye, EyeClosed } from "lucide-react";
import { forwardRef, useState } from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  type: string;
  autoComplete?: string;
}

export const InputForm = forwardRef<
  HTMLInputElement,
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, placeholder, type, autoComplete = "off", ...rest }, ref) => {
  const [toggleVisible, setToggleVisible] = useState(false);
  return (
    <label className="flex flex-col gap-1 text-xs lg:text-sm">
      <span>{label}</span>

      {type === "password" ? (
        <div className="flex items-center gap-2 rounded-lg bg-zinc-900 px-3 focus-within:ring-2 focus-within:ring-white/30">
          <input
            ref={ref}
            type={toggleVisible ? "text" : "password"}
            placeholder={placeholder}
            autoComplete={autoComplete}
            {...rest}
            className="w-full rounded-lg py-3 outline-none"
          />
          <button
            type="button"
            onClick={() => setToggleVisible(!toggleVisible)}
            className="cursor-pointer"
          >
            {toggleVisible ? <Eye /> : <EyeClosed />}
          </button>
        </div>
      ) : (
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...rest}
          className="autofill:shadow-0 w-full rounded-lg bg-zinc-900 p-3 outline-none autofill:bg-transparent autofill:text-current focus:ring-2 focus:ring-white/30"
        />
      )}
    </label>
  );
});
