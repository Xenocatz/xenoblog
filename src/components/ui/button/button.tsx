"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "red";
  children: React.ReactNode;
}
export const Button = ({
  children,
  variant = "primary",
  ...rest
}: ButtonProps) => {
  const variants = {
    primary:
      "gap-2 rounded-lg text-xs bg-light-green-500 hover:bg-light-green-600 text-charcoal-100 ",
    secondary: "gap-2 rounded-lg bg-jet-600 text-xs  hover:bg-jet-500 ",
    red: "gap-2 rounded-lg bg-red-soft text-xs hover:bg-red-600 ",
  };
  return (
    <>
      <button
        className={`${variants[variant]} flex w-fit cursor-pointer items-center px-3 py-2 text-xs duration-200 select-none active:translate-0.5`}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};
