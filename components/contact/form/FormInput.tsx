import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

type formInputProps = {
  error: FieldError | undefined;
  placeholder?: string;
  isTextarea?: boolean;
};

const defaultClass =
  'rounded-xl bg-gray-300 px-2 py-1 text-lg text-black focus:outline-none';
const errorClass = 'border-3 border-solid border-red-700 bg-red-200';

const FormInput = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  formInputProps
>(function FormInput({ isTextarea, error, placeholder = '', ...props }, ref) {
  if (isTextarea) {
    return (
      <textarea
        ref={ref}
        placeholder={placeholder}
        className={`h-[8lh]! rounded-2xl! py-1.5! ${defaultClass} ${error && errorClass} }`}
        {...props}
      />
    );
  }

  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className={`${defaultClass} ${error && errorClass} }`}
      {...props}
    />
  );
});

export default FormInput;
