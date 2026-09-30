import FormInput from '@/components/FormInput';
import { childProps } from '../CheckoutPayment';

const currentYear = new Date().getFullYear();
const months = [
  ['01', 'January'],
  ['02', 'February'],
  ['03', 'March'],
  ['04', 'April'],
  ['05', 'May'],
  ['06', 'June'],
  ['07', 'July'],
  ['08', 'August'],
  ['09', 'September'],
  ['10', 'October'],
  ['11', 'November'],
  ['12', 'December'],
];

export default function CardInputs({ errors, register }: childProps) {
  return (
    <>
      <FormInput
        placeholder="Card #"
        name="cardNumber"
        error={errors?.cardNumber}
        register={register}
        validation={{
          required: 'Card number is required',
          minLength: { value: 12, message: 'Invalid Card Number' },
          maxLength: { value: 19, message: 'Invalid Card Number' },
          pattern: {
            value: /^[0-9]+$/, // 👈 Enforces digits 0-9 only
            message: 'CardNumber: Please enter numbers only',
          },
        }}
      />
      <div className="flex gap-4">
        <FormInput
          customClass="w-1/3"
          name="month"
          error={errors?.month}
          register={register}
          variant="select"
        >
          {months.map((item) => (
            <option key={item[0]} value={item[0]}>
              {item[1]}
            </option>
          ))}
        </FormInput>
        <FormInput
          customClass="w-1/3"
          name="year"
          error={errors?.year}
          register={register}
          variant="select"
        >
          {Array.from({ length: 11 }, (_, i) => (
            <option key={i}>{currentYear + i}</option>
          ))}
        </FormInput>
        <FormInput
          customClass="w-1/3"
          placeholder="CVV"
          name="cvv"
          error={errors?.cvv}
          register={register}
          validation={{
            required: 'cvv is required',
            minLength: { value: 3, message: 'Invalid CVV Number' },
            maxLength: { value: 4, message: 'Invalid CVV Number' },
            pattern: {
              value: /^[0-9]+$/, // 👈 Enforces digits 0-9 only
              message: 'CVV: Please enter numbers only',
            },
          }}
        />
      </div>
    </>
  );
}
