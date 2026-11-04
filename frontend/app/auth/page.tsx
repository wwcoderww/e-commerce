'use client';
import Buttons from '@/app/auth/_components/auth-buttons';
import FormInput from '@/components/formInput';
import { useCheckRole } from '@/hooks/useCheckRole';
import { useRedirectHome } from '@/hooks/useRedirectHome';
import { useAuthForm } from './hooks/useAuthForm';

const containerClass = 'flex flex-col items-center gap-2 sm:flex-row';
const labelClass = 'text-3xl inline-block text-center w-40';
const inputClass = '!text-3xl max-w-80';

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
      {/* Email */}
      <div className={containerClass}>
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
      {/* Password */}
      <div className={containerClass}>
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
        // Verify Password
        <div className={containerClass}>
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
