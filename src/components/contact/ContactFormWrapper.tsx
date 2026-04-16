'use client';

import { useSession } from '@/lib/auth-client';
import ContactForm from './ContactForm';

export default function ContactFormWrapper() {
  const { data: session } = useSession();
  return (
    <ContactForm
      defaultName={session?.user.name ?? ''}
      defaultEmail={session?.user.email ?? ''}
      userId={session?.user.id}
    />
  );
}
