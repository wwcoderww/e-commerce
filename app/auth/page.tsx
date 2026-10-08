'use client';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreate } from './hooks/useCreate';
import { useLogin } from './hooks/useLogin';
import { minLength } from 'better-auth';
import { toast } from 'sonner';

type inputFieldType = {
  email: string;
  password: string;
  verifyPassword: string;
};

export default function page() {
  const [newAccount, setNewAccount] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<inputFieldType>();
  // Submit Functions
  const { onLogin } = useLogin();
  const { onCreate } = useCreate();
  // Success form function
  function onSuccess(data: inputFieldType) {
    if (newAccount) {
      onCreate(data, setError);
    } else {
      onLogin(data, setError);
    }
  }
  // Error form function
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
    <div>
      <form onSubmit={handleSubmit(onSuccess, onError)}>
        <div>
          <label htmlFor="email">Email</label>
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
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <FormInput
            name="password"
            register={register}
            error={errors.password}
            type="password"
            validation={{
              required: 'Password is required',
              minLength: { value: 9, message: 'Minimum length is 9' },
            }}
          />
        </div>
        {newAccount && (
          <div>
            <label htmlFor="password">Verify Password</label>
            <FormInput
              name="verifyPassword"
              register={register}
              error={errors.verifyPassword}
              type="password"
              validation={{
                required: 'Verify password is required',
                minLength: { value: 9, message: 'Minimum length is 9' },
              }}
            />
          </div>
        )}
        <Button name={`${newAccount ? 'Create' : 'Login'}`} type="submit" />
        <div onClick={() => switchView()}>
          {newAccount ? 'Log in instead' : 'Create new account'}
        </div>
      </form>
    </div>
  );
}
