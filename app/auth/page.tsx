'use client';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

  const login = async (formData: inputFieldType) => {
    console.log(formData);
    const { data: response, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });
    console.log(response);
    console.log(error);
  };

  const createAccount = async (formData: inputFieldType) => {
    console.log('Test');
    const { data: response, error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.email,
      role: '',
    });
    console.log(response);
    console.log(error);
  };

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
          onClick={
            newAccount ? handleSubmit(createAccount) : handleSubmit(login)
          }
        />
        <div onClick={() => setNewAccount(!newAccount)}>
          {newAccount ? 'Log in instead' : 'Create new account'}
        </div>
      </form>
    </div>
  );
}
