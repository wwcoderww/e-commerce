'use client';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { useRedirectHome } from '@/hooks/useRedirectHome';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreate } from './hooks/useCreate';
import { useLogin } from './hooks/useLogin';
import { useCheckRole } from '@/hooks/useCheckRole';

const labelClass = 'text-3xl w-65 inline-block text-center';
const inputClass = '!text-3xl';

type inputFieldType = {
  email: string;
  password: string;
  verifyPassword: string;
};

export default function page() {
  // Redirects logged in users
  // Guard clause
  const isSignedIn = useCheckRole();
  useRedirectHome(!!isSignedIn);
  // Form
  const [newAccount, setNewAccount] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<inputFieldType>();
  // Form: Submit Functions
  const { onLogin } = useLogin();
  const { onCreate } = useCreate();
  // Form: Success  function
  function onSuccess(data: inputFieldType) {
    if (newAccount) {
      onCreate(data, setError);
    } else {
      onLogin(data, setError);
    }
  }
  // Form: Error function
  function onError(freshErrors: typeof errors) {
    console.log(errors);
    Object.values(freshErrors).forEach((item) => {
      if (item?.message) {
        toast.error(item.message);
      }
    });
  }
  // Switch view Button at bottom of ui
  function switchView() {
    clearErrors();
    setNewAccount(!newAccount);
  }

  return (
    <form
      onSubmit={handleSubmit(onSuccess, onError)}
      className="flex h-full flex-col items-center justify-center gap-8"
    >
      <div>
        <label htmlFor="email" className={labelClass}>
          Email:
        </label>
        <FormInput
          name="email"
          register={register}
          error={errors.email}
          validation={{
            required: 'Email is required...',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid E-mail Format',
            },
          }}
          customClass={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Password:
        </label>
        <FormInput
          name="password"
          register={register}
          error={errors.password}
          type="password"
          validation={{
            required: 'Password is required',
            minLength: { value: 9, message: 'Minimum length is 9' },
          }}
          customClass={inputClass}
        />
      </div>
      {newAccount && (
        <div>
          <label htmlFor="password" className={labelClass}>
            Verify Password:
          </label>
          <FormInput
            name="verifyPassword"
            register={register}
            error={errors.verifyPassword}
            type="password"
            validation={{
              required: 'Verify password is required',
              minLength: { value: 9, message: 'Minimum length is 9' },
            }}
            customClass={inputClass}
          />
        </div>
      )}
      <Button
        name={`${newAccount ? 'Create' : 'Login'}`}
        type="submit"
        customClass="text-5xl py-4 px-12 bg-primary/50 hover:bg-primary/70"
      />
      <div
        onClick={() => switchView()}
        className="eas-in-out text-lg underline transition duration-300 hover:-translate-y-1 hover:cursor-pointer"
      >
        {newAccount ? 'Log in instead' : 'Create new account'}
      </div>
    </form>
  );
}
