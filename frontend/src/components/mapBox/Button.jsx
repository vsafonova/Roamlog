import { Button as TailwindButton } from "@material-tailwind/react";

export default function Button({children, onClick}) {
  return (
    <TailwindButton
      className="flex items-center gap-2 rounded-full w-1/2 h-14 bg-white text-gray-600"
      onClick={onClick}
    >
      {children}
    </TailwindButton>
  );
}
