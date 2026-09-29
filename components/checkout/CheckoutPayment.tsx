import { FieldErrors, useForm } from 'react-hook-form';
import FormInput from '../contact/form/FormInput';
import { toast } from 'sonner';

type formData = {
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

export default function CheckoutPayment() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formData>();

  function onSubmit(data: formData) {
    toast.success('Sent!');
  }

  function onError(errors: FieldErrors<formData>) {
    const allErrors = Object.values(errors).map((item) => item.message);
    allErrors.forEach((errorMsg) => toast.error(errorMsg));
  }
  return (
    <form className="mx-auto flex flex-col gap-4">
      <FormInput
        placeholder="Card #"
        customClass=""
        error={errors?.cardNumber}
      />
      <div className="flex gap-4">
        <div className="w-1/3">Month</div>
        <div className="w-1/3">Year</div>
        <div className="w-1/3">CVV</div>
      </div>
      <div className="flex gap-4">
        <FormInput
          placeholder="First Name"
          error={errors?.firstName}
          customClass="w-1/2"
        />
        <FormInput
          placeholder="Last Name"
          error={errors?.lastName}
          customClass="w-1/2"
        />
      </div>
      <FormInput placeholder="Address" error={errors?.address} />
      <FormInput placeholder="Address 2" error={errors?.address2} />
      <div className="flex gap-4">
        <FormInput
          placeholder="Zipcode"
          error={errors?.zip}
          customClass="w-1/2"
        />
        <FormInput
          placeholder="City"
          error={errors?.city}
          customClass="w-1/2"
        />
      </div>
      <div className="flex gap-4">
        <FormInput
          placeholder="Country"
          error={errors?.country}
          customClass="w-1/2"
        />
        <FormInput
          placeholder="State"
          error={errors?.state}
          customClass="w-1/2"
        />
      </div>
      <FormInput placeholder="Email" error={errors?.email} />
      <div className="flex gap-4">
        <div className="w-1/2">Use above for shipping</div>
        <div className="w-1/2">Contine</div>
      </div>
    </form>
  );
}
