import { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string | string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2" htmlFor={id}>
        {label}:
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="border border-gray-300 rounded-md px-4 py-2 w-full text-black"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
