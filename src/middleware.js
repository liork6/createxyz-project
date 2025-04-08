import { NextResponse } from "next/server";

export function middleware(request) {
    const userAgent = request.headers.get("user-agent") || "";
    const platformHeader = request.headers.get("sec-ch-ua-platform");

    // Return a 406 Not Acceptable if:
    // 1. The "sec-ch-ua-platform" header does not exist
    // 2. The User-Agent does not contain "curl"
    if (!platformHeader && !userAgent.includes("curl")) {
        return new NextResponse(
            "Access denied: Your request has been flagged as automated. If you believe this is an error, please contact support with your Cloudflare Ray ID.",
            {
                status: 406,
            }
        );
    }

    // Allow the request to proceed
    return NextResponse.next();
}
