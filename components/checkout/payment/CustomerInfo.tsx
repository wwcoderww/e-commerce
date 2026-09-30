import FormInput from '@/components/FormInput';
import { childProps } from '../CheckoutPayment';

export default function CustomerInfo({ errors, register }: childProps) {
  return (
    <>
      <div className="flex gap-4">
        <FormInput
          placeholder="First Name"
          error={errors?.firstName}
          customClass="w-1/2"
          name="firstName"
          register={register}
          validation={{ required: 'First Name is required' }}
        />
        <FormInput
          placeholder="Last Name"
          error={errors?.lastName}
          customClass="w-1/2"
          name="lastName"
          register={register}
          validation={{ required: 'Last Name is required' }}
        />
      </div>
      <FormInput
        placeholder="Email"
        error={errors?.email}
        name="email"
        register={register}
        validation={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid E-mail Format',
          },
        }}
      />
    </>
  );
}
