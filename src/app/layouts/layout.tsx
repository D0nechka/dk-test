import { ChakraProvider } from '@chakra-ui/react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: [ 'latin' ], });

export const metadata: Metadata = {
  title: 'Dk-test',
  description: 'Test task',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <main>
        <title>DK TEST</title>
      </main>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </div>
  );
}
