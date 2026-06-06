import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path } = body;

    // 1. Security Check: Ensure the request is coming from your WordPress site
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
    }

    // 2. Revalidate a specific path if provided (e.g., "/services/mri-scan")
    if (path) {
      revalidatePath(path, "page");
      return NextResponse.json({ revalidated: true, path, now: Date.now() });
    }

    // 3. Fallback: If no specific path is given, clear the cache for ALL services
    revalidatePath("/services", "layout");
    return NextResponse.json({ 
      revalidated: true, 
      message: "All services revalidated", 
      now: Date.now() 
    });

  } catch (error) {
    console.error("Revalidation Error:", error);
    return NextResponse.json({ message: "Error parsing request body" }, { status: 500 });
  }
}