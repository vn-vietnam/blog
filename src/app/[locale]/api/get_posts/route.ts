import { NextResponse } from "next/server";
import { getPostsData } from "@/app/[locale]/server-utils";

export function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    const posts = getPostsData(locale);
    console.log(posts);
    return NextResponse.json({
        code: 200,
        message: "ok",
        data: posts
    });
}