interface InputProps {
  label: string;
  error?: string;
  options: React.InputHTMLAttributes<HTMLInputElement>;
}

const Input = ({ label, error, options }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={options?.id ?? ""}
        className="text-gray-500 font-bold mb-2 text-xs"
      >
        {label}
      </label>
      <input
        className={`border rounded py-2 px-3 outline-none appearance-none  focus:border-purple-700 w-[100px] font-bold text-lg ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...options}
      />
      <p className="text-red-500 text-xs italic h-2">{error}</p>
    </div>
  );
};

export default Input;
