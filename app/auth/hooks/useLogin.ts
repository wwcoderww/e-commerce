'use client';
import { getAuthEmail } from '@/lib/auth/actions/useAuth';
import { InputFieldType } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  async function onLogin(data: InputFieldType, setError: any) {
    try {
      const response = await getAuthEmail(data.email, data.password);
      // If success
      if (response.success === true) {
        toast.success('Logged in');
        router.push('/');
        // Errors
      } else {
        // If invalid email
        if (response.error.message === 'INVALID_EMAIL') {
          toast.error('Invalid Email');
          setError('email', { type: 'manual', message: 'invalid email' });
          return;
        }
        // If incorrect password
        if (response.error.message === 'INVALID_EMAIL_OR_PASSWORD') {
          toast.error('Incorrect Password');
          setError('password', {
            type: 'manual',
            message: 'incorrect password',
          });
          return;
        }
        // If error is unknown
        console.log(response);
        throw new Error('Unknown. Check Network Response');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error! Check console');
    } finally {
      setLoading(false);
    }
  }

  return { loading, onLogin };
}
