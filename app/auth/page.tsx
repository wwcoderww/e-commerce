'use client';
import Buttons from '@/components/auth/Buttons';
import FormInput from '@/components/FormInput';
import { useCheckRole } from '@/hooks/useCheckRole';
import { useRedirectHome } from '@/hooks/useRedirectHome';
import { useAuthForm } from './hooks/useAuthForm';

const labelClass = 'text-3xl w-65 inline-block text-center';
const inputClass = '!text-3xl';

export default function page() {
  // Redirects logged in users
  const isSignedIn = useCheckRole();
  useRedirectHome(!!isSignedIn);

  const {
    newAccount,
    setNewAccount,
    register,
    errors,
    handleSubmit,
    onSuccess,
    onError,
    clearErrors,
  } = useAuthForm();

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
      <Buttons
        newAccount={newAccount}
        clearErrors={clearErrors}
        setNewAccount={setNewAccount}
      />
    </form>
  );
}
