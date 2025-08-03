import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

const CareerForm = dynamic(() => import('./CareerForm'));

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) {
    redirect('/login');
  };

  return <CareerForm />;
}
