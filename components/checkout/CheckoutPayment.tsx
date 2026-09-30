import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Address from './payment/Address';
import CardInputs from './payment/CardInputs';
import CustomerInfo from './payment/CustomerInfo';

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
    setValue,
    formState: { errors },
  } = useForm<formData>({ defaultValues: { country: 'United States' } });

  function onSubmit(data: formData) {
    toast.success('Sent!');
    console.log(data);
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
        <div className="w-1/2">Use above for shipping</div>
        <div className="w-1/2">
          <button>Contine</button>
        </div>
      </div>
    </form>
  );
}
