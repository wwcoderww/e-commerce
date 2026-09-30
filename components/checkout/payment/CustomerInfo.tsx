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
        />
        <FormInput
          placeholder="Last Name"
          error={errors?.lastName}
          customClass="w-1/2"
          name="lastName"
          register={register}
        />
      </div>
      <FormInput
        placeholder="Email"
        error={errors?.email}
        name="email"
        register={register}
      />
    </>
  );
}
