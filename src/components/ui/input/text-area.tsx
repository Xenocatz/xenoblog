import { forwardRef } from "react";

interface TextAreaProps {
  label?: string;
  defaultValue?: string;
}
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, defaultValue, ...rest }, ref) => {
    return (
      <>
        <label className="flex flex-col gap-1">
          <span className="text-sm">{label}</span>
          <textarea
            ref={ref}
            rows={3}
            {...rest}
            defaultValue={defaultValue}
            className="w-full resize-none rounded-lg bg-zinc-900 p-2 text-sm text-white outline-none focus:ring-2 focus:ring-white/30"
          ></textarea>
        </label>
      </>
    );
  },
);
