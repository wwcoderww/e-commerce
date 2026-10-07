import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Address from './payment/Address';
import CardInputs from './payment/CardInputs';
import CustomerInfo from './payment/CustomerInfo';
import { useState } from 'react';
import Button from '../Button';

export type formData = {
  cardNumber: string;
  month: string;
  year: string;
  cvv: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  shippingAddress?: string;
  shippingAddress2?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingZip?: string;
};

export type childProps = {
  errors: FieldErrors<formData>;
  register: any;
};

export default function CheckoutPayment() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>({ defaultValues: { country: 'United States' } });

  const [shipping, setShipping] = useState(false);

  function onSubmit(data: formData) {
    console.log(data);
    toast.success('Sent!');
    reset();
  }

  function onError(errors: FieldErrors<formData>) {
    const allErrors = Object.values(errors).map((item) => item.message);
    allErrors.forEach((errorMsg) => toast.error(errorMsg));
  }

  return (
    <div>
      <div className="pb-12 text-center text-5xl font-bold">
        Shipping/Billing
      </div>
      <form
        className="mx-auto flex flex-col gap-4 rounded-xl bg-gray-200/30 p-2"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <CardInputs errors={errors} register={register} />
        <CustomerInfo errors={errors} register={register} />
        <div className="border"></div>
        <Address errors={errors} register={register} />
        <div className="flex">
          <input
            type="checkbox"
            defaultChecked={true}
            onClick={() => setShipping(!shipping)}
          />
          <div className="">Use above for shipping</div>
        </div>
        {shipping && <Address errors={errors} register={register} shipping />}
        <div className="mx-auto">
          <Button name="Purchase" />
        </div>
      </form>
    </div>
  );
}
