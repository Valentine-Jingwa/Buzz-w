import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';


export const metadata: Metadata = {
title: 'Buzz — Find events with friends',
description: 'Discover nearby events, RSVP, and plan with friends.',
manifest: '/manifest.webmanifest',
icons: [{ rel: 'icon', url: '/icon.png' }],
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>
<Nav />
<main className="container py-6">{children}</main>
</body>
</html>
);
}