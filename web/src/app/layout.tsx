'use client';
import { Provider } from 'react-redux';
import { store } from '../../features/store/root-store';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode | React.ReactNode[];
}>) {
  return (
    <html lang='fr'>
      <Provider store={store}>
        <body className='h-screen w-screen overflow-hidden'>{children}</body>
      </Provider>
    </html>
  );
}
