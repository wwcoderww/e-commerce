import FormInput from '@/components/FormInput';
import { childProps } from '../CheckoutPayment';
import allStates from '@/utils/allStates';

type addressType = {
  shipping?: boolean;
};

export default function Address({
  errors,
  register,
  shipping = false,
}: childProps & addressType) {
  const addressType = shipping ? 'shipping' : 'address';

  return (
    <>
      <FormInput
        placeholder="Address"
        error={shipping ? errors?.shippingAddress : errors?.address}
        name={shipping ? 'shippingAddress' : 'address'}
        register={register}
        validation={{
          required: addressType
            ? 'Shipping Address is required'
            : 'Address is required',
        }}
      />
      <FormInput
        placeholder="Address 2"
        error={shipping ? errors?.shippingAddress2 : errors?.address2}
        name="address2"
        register={register}
      />
      <div className="flex gap-4">
        <FormInput
          placeholder="Zipcode"
          error={shipping ? errors?.shippingZip : errors?.zip}
          customClass="w-1/2"
          name={shipping ? 'shippingZip' : 'zip'}
          register={register}
          validation={{
            required: 'Zipcode is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Zipcode: Please enter numbers only',
            },
          }}
        />
        <FormInput
          placeholder="City"
          error={shipping ? errors?.shippingCity : errors?.city}
          customClass="w-1/2"
          name={shipping ? 'shippingCity' : 'city'}
          register={register}
          validation={{ required: 'City is required' }}
        />
      </div>
      <div className="flex gap-4">
        <FormInput
          placeholder="Country"
          error={errors?.country}
          customClass="w-1/2"
          name="country"
          register={register}
          disabled={true}
        />
        <FormInput
          error={shipping ? errors?.shippingState : errors?.state}
          customClass="w-1/2 capitalize"
          name={shipping ? 'shippingState' : 'state'}
          register={register}
          variant="select"
        >
          {allStates.map((item, index) => (
            <option key={index} value={item.toLocaleLowerCase()}>
              {item}
            </option>
          ))}
        </FormInput>
      </div>
    </>
  );
}
