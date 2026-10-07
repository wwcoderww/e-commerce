'use client';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from './hooks/useLogin';
import { useCreate } from './hooks/useCreate';

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
  } = useForm<inputFieldType>();
  const [newAccount, setNewAccount] = useState<boolean>(false);

  const { loading, onLogin } = useLogin();
  const { loading: loading1, onCreate } = useCreate();

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
        <div onClick={() => setNewAccount(!newAccount)}>
          {newAccount ? 'Log in instead' : 'Create new account'}
        </div>
      </form>
    </div>
  );
}
