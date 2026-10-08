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
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<inputFieldType>();
  const [newAccount, setNewAccount] = useState<boolean>(false);
  // Submit Functions
  const { loading, onLogin } = useLogin(setError);
  const { loading: loading1, onCreate } = useCreate(setError);
  // Check for errors on useForm and toast them
  useEffect(() => {
    Object.values(errors).forEach((item) => {
      if (item?.message) {
        toast.error(item.message);
      }
    });
  }, [errors]);
  // Switch view Button at bottom of ui
  function switchView() {
    clearErrors();
    setNewAccount(!newAccount);
  }

  return (
    <div>
      <form>
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
                required: 'Password is required',
                minLength: { value: 9, message: 'Minimum length is 9' },
              }}
            />
          </div>
        )}
        <Button
          name={`${newAccount ? 'Create' : 'Login'}`}
          type="button"
          onClick={newAccount ? handleSubmit(onCreate) : handleSubmit(onLogin)}
        />
        <div onClick={() => switchView()}>
          {newAccount ? 'Log in instead' : 'Create new account'}
        </div>
      </form>
    </div>
  );
}
