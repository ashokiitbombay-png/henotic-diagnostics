import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Reports | Henotic Diagnostics',
  description: 'Access and download your diagnostic reports securely online.',
  alternates: {
    canonical: 'https://henoticdiagnostics.com/reports',
  },
};

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
