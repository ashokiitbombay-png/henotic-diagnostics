import Link from "next/link";

export default function AllServicesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-center">
      <h1 className="text-5xl font-bold text-blue-900 mb-6">Our Diagnostic Services</h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Browse our comprehensive range of advanced diagnostic and imaging services.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Link href="/services/blood-test" className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all">
          <h2 className="text-xl font-semibold text-blue-800">Blood Tests</h2>
          <p className="text-gray-500 text-sm mt-2">Comprehensive pathology and lab tests.</p>
        </Link>
        <Link href="/services/mri-scan" className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all">
          <h2 className="text-xl font-semibold text-blue-800">MRI Scans</h2>
          <p className="text-gray-500 text-sm mt-2">Advanced 3T MRI imaging services.</p>
        </Link>
        <Link href="/services/full-body-check-up" className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all">
          <h2 className="text-xl font-semibold text-blue-800">Health Check-ups</h2>
          <p className="text-gray-500 text-sm mt-2">Preventive and executive body screens.</p>
        </Link>
      </div>
    </main>
  );
}