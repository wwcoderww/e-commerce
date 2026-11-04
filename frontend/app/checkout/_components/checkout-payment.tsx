import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Address from './payment/checkout-payment-address';
import CardInputs from './payment/checkout-payment-cardInputs';
import CustomerInfo from './payment/checkout-payment-customerInfo';
import { useState } from 'react';
import Button from '@/components/button';

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
    <div className="rounded-xl pb-4 sm:px-20 lg:pt-10 lg:pb-15">
      <div className="pb-12 text-center text-5xl font-extrabold">
        <span className="hidden sm:block">Shipping/Billing</span>
        <span className="sm:hidden">Payment</span>
      </div>
      <form
        className="mx-auto flex flex-col gap-4 rounded-lg bg-primary/70 px-5 py-4 pt-6"
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
          <div className="pt-1 pl-2 text-lg font-bold text-gray-200">
            Use above for shipping
          </div>
        </div>
        {shipping && <Address errors={errors} register={register} shipping />}
        <div className="mx-auto py-4 font-extrabold">
          <Button
            name="Purchase"
            customClass="sm:text-6xl !bg-green-500/60 !border-green-400"
          />
        </div>
      </form>
    </div>
  );
}
