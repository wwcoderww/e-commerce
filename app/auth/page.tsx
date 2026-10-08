'use client';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreate } from './hooks/useCreate';
import { useLogin } from './hooks/useLogin';

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
  function switchView() {
    clearErrors();
    setNewAccount(!newAccount);
  }

  const { loading, onLogin } = useLogin(setError);
  const { loading: loading1, onCreate } = useCreate(setError);

  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <FormInput name="email" register={register} error={errors.email} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <FormInput
            name="password"
            register={register}
            error={errors.password}
            type="password"
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
