
import { CreateLinkForm } from '@/components/CreateLinkForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gray-50">
       <h1 className="text-4xl font-bold mb-8 text-gray-800">OmniPay Link</h1>
       <CreateLinkForm />
    </main>
  );
}