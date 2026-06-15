import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
    try {
        const settings = await prisma.siteSetting.findUnique({
            where: { id: "global" },
        });

        if (!settings) {
            // Return defaults if not found
            return NextResponse.json({
                siteName: "University of East Capital",
                metaDescription: "Unleashing potential, fostering excellence.",
                metaKeywords: "university, education, UEC",
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session || (session.user as any).role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await req.json();
        const settings = await prisma.siteSetting.upsert({
            where: { id: "global" },
            update: {
                siteName: data.siteName,
                metaDescription: data.metaDescription,
                metaKeywords: data.metaKeywords,
                contactEmail: data.contactEmail,
                contactPhone: data.contactPhone,
                address: data.address,
            },
            create: {
                id: "global",
                siteName: data.siteName,
                metaDescription: data.metaDescription,
                metaKeywords: data.metaKeywords,
                contactEmail: data.contactEmail,
                contactPhone: data.contactPhone,
                address: data.address,
            },
        });

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
