import { authClient } from '@/lib/auth/auth-client';
import { cartItemType } from '@/types/cartItemType';
import { formData } from '../checkout-payment';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, listCart } from '@/state/slices/cartSlice';

export default function useHandleForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    reset,
  } = useForm<formData>({
    defaultValues: {
      country: 'United States',
      shippingCountry: 'United States',
    },
  });
  const dispatch = useDispatch();
  const cart = useSelector(listCart());

  async function onSuccess(data: formData) {
    const { data: session } = await authClient.getSession();
    const userId = session?.user?.id ?? null;
    // Reformat cart for db
    const reformatCart = cart.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      productId: item.id,
      image: item.image,
      category: item.category,
    }));
    // Reformat customer info for db
    const customerInfo = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.shippingAddress ?? data.address,
      address2: data.shippingAddress2 ?? data.address2,
      city: data.shippingCity ?? data.city,
      state: data.shippingState ?? data.state,
      zip: data.shippingZip ?? data.zip,
      country: data.shippingCountry ?? data.country,
    };
    // POST to database
    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/history`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          purchases: reformatCart,
          customerInfo,
        }),
      },
    );
    // On Failure
    if (apiResponse.status !== 200) {
      toast.error('Server Error. Please try again later');
      return;
    }
    // On Success
    toast.success('Sent!');
    reset();
    dispatch(clearCart());
    const apiResponseBody = await apiResponse.json();
    return console.log(apiResponseBody.data);
  }

  function onError(errors: FieldErrors<formData>) {
    const allErrors = Object.values(errors).map((item) => item.message);
    allErrors.forEach((errorMsg) => toast.error(errorMsg));
  }

  return {
    register,
    errors,
    handleSubmit,
    onSuccess,
    onError,
    clearErrors,
  };
}
