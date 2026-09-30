import { FieldError } from 'react-hook-form';

type formInputProps = {
  error: FieldError | undefined;
  register: any;
  name: string;
  children?: React.ReactNode;
  variant?: 'textarea' | 'select';
  validation?: {};
  placeholder?: string;
  customClass?: string;
  disabled?: boolean;
};

const defaultClass =
  'rounded-xl bg-gray-300 px-2 py-1 text-lg text-black focus:outline-none';
const textAreaClass = 'h-[8lh]! rounded-2xl! py-1.5!';
const errorClass = 'border-3 border-solid border-red-700 bg-red-200';

export default function FormInput({
  error,
  placeholder,
  customClass,
  name,
  register,
  validation,
  variant,
  children,
  disabled = false,
}: formInputProps) {
  if (variant === 'textarea') {
    return (
      <textarea
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, validation)}
        className={`${customClass} ${textAreaClass} ${defaultClass} ${error && errorClass} }`}
      />
    );
  }

  if (variant === 'select') {
    return (
      <select
        {...register(name, validation)}
        disabled={disabled}

        className={`${customClass} ${defaultClass} ${error && errorClass} }`}
      >
        {children}
      </select>
    );
  }

  return (
    <input
      placeholder={placeholder}
      disabled={disabled}
      {...register(name, validation)}
      className={`${customClass} ${defaultClass} ${error && errorClass} }`}
    />
  );
}
