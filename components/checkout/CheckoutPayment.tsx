import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Address from './payment/Address';
import CardInputs from './payment/CardInputs';
import CustomerInfo from './payment/CustomerInfo';
import { useState } from 'react';

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
    <form
      className="mx-auto flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <CardInputs errors={errors} register={register} />
      <CustomerInfo errors={errors} register={register} />
      <div className="border"></div>
      <Address errors={errors} register={register} />
      <div className="flex gap-4">
        <div className="flex w-1/2 gap-2">
          <input
            type="checkbox"
            defaultChecked={true}
            onClick={() => setShipping(!shipping)}
          />
          <div className="">Use above for shipping</div>
        </div>
        <div className="w-1/2">
          <button>Contine</button>
        </div>
      </div>
    </form>
  );
}
