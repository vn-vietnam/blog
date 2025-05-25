import BlogContent from "@/components/blog-content";
import PageContainer from "@/components/page-container";
import React from "react";
import { getPostsData } from "../server-utils";

function Blog() {
	return (
		<PageContainer>
			<BlogContent posts={getPostsData()} />

		</PageContainer>
	);
}

export default Blog;
