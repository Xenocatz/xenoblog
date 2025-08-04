"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function InputForm({
  name,
  placeholder,
  type,
  required = false,
  autoComplete = "off",
}: {
  name?: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const [toggleVisible, setToggleVisible] = useState(false);
  return (
    <label className="flex flex-col gap-1 text-xs lg:text-sm">
      <span>{name}</span>

      {type === "password" ? (
        <div className="flex items-center gap-2 rounded-lg bg-zinc-900 px-3 focus-within:ring-2 focus-within:ring-white/30">
          <input
            type={toggleVisible ? "text" : "password"}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
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
          type={type}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className="autofill:shadow-0 w-full rounded-lg bg-zinc-900 p-3 outline-none autofill:bg-transparent autofill:text-current focus:ring-2 focus:ring-white/30"
        />
      )}
    </label>
  );
}
