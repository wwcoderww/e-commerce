import FormInput from '@/components/FormInput';
import { childProps } from '../CheckoutPayment';

export default function Address({ errors, register }: childProps) {
  return (
    <>
      <FormInput
        placeholder="Address"
        error={errors?.address}
        name="address"
        register={register}
      />
      <FormInput
        placeholder="Address 2"
        error={errors?.address2}
        name="address2"
        register={register}
      />
      <div className="flex gap-4">
        <FormInput
          placeholder="Zipcode"
          error={errors?.zip}
          customClass="w-1/2"
          name="zip"
          register={register}
        />
        <FormInput
          placeholder="City"
          error={errors?.city}
          customClass="w-1/2"
          name="city"
          register={register}
        />
      </div>
      <div className="flex gap-4">
        <FormInput
          placeholder="Country"
          error={errors?.country}
          customClass="w-1/2"
          name="country"
          register={register}
        />
        <FormInput
          placeholder="State"
          error={errors?.state}
          customClass="w-1/2"
          name="state"
          register={register}
        />
      </div>
    </>
  );
}
