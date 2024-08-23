import { TopNavigation } from '../../../components/Navigation/TopNavigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='h-full w-full flex flex-col'>
      <TopNavigation />
      <div className='flex-1 overflow-y-auto'>{children}</div>
    </div>
  );
}
