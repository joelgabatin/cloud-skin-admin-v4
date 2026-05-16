import LoginForm from '@/components/Auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - Cloud Skin Admin',
  description: 'Sign in to your Cloud Skin Admin Portal',
};

export default function LoginPage() {
  return <LoginForm />;
}
