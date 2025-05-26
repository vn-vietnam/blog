import BlogContent from "@/components/blog-content";
import PageContainer from "@/components/page-container";
import React from "react";
import { getPostsData } from "@/app/[locale]/server-utils";

type Props = {
	params: Promise<{ locale: string }>;
}

async function Blog({ params }: Props) {
	const { locale } = await params;
	const posts = getPostsData(locale);
	
	return (
		<PageContainer>
			<BlogContent posts={posts} />
		</PageContainer>
	);
}

export default Blog;




