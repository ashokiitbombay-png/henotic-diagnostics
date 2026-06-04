export default async function ServiceHubPage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const formattedService = resolvedParams.service.replace(/-/g, ' ');
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-8 text-center">
      <h1 className="text-4xl font-bold capitalize text-blue-900">{formattedService} Regions</h1>
    </main>
  );
}