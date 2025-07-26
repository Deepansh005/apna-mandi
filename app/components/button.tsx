type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

export default function Button({ children, onClick, type = "button", className = "" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
