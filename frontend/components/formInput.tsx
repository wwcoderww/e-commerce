import { input } from 'better-auth';
import { useState } from 'react';
import { FieldError } from 'react-hook-form';
import Button from './button';

export type formInputProps = {
  error: FieldError | undefined;
  register: any;
  name: string;
  children?: React.ReactNode;
  variant?: 'textarea' | 'select' | 'file';
  validation?: {};
  placeholder?: string | null;
  customClass?: string;
  disabled?: boolean;
  type?: string;
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
  type,
  disabled = false,
}: formInputProps) {
  const combinedClass = `${customClass} ${defaultClass} ${error && errorClass}`;

  if (variant === 'textarea') {
    return (
      <textarea
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, validation)}
        className={`${textAreaClass} ${combinedClass}`}
      />
    );
  }

  if (variant === 'select') {
    return (
      <select
        {...register(name, validation)}
        disabled={disabled}

        className={`${combinedClass}`}
      >
        {children}
      </select>
    );
  }

  if (variant === 'file') {
    return (
      <div className="flex gap-12 overflow-x-scroll">
        <p className="scrollbar-thin overflow-x-scroll whitespace-nowrap">
          {placeholder}
        </p>
        <input
          type="file"
          accept="image/*"
          {...register(name)}
          className="text-right"
        />
      </div>
    );
  }

  return (
    <>
      <input
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, validation)}
        className={`${combinedClass}`}
        type={type}
      />
    </>
  );
}
