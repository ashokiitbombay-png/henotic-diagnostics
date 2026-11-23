import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Operations Dashboard | Henotic Diagnostics',
  description: 'Internal diagnostic operations dashboard for leads, payments, reminders, and runtime diagnostics.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
