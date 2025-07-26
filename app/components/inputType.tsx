type InputProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

export default function Input({ id, label, type = "text", placeholder = "", required = false }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
