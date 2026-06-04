export default async function RegionHubPage({ params }: { params: Promise<{ service: string, region: string }> }) {
  const resolvedParams = await params;
  const formattedService = resolvedParams.service.replace(/-/g, ' ');
  const formattedRegion = resolvedParams.region.replace(/-/g, ' ');
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-8 text-center">
      <h1 className="text-4xl font-bold capitalize text-blue-900">
        {formattedService} Locations in {formattedRegion}
      </h1>
    </main>
  );
}