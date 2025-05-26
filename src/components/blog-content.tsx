"use client";

import dayjs from "dayjs";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { pluginConfig } from "@/config/blog.config";
import { ArrowRight } from "lucide-react";
import { Badge } from "lucide-react";
import { Button } from "./ui/button";
import { CardDescription, CardTitle } from "./ui/card";
import Time from "./Time";
import Link from "next/link";
import Pagination from "@/plugins/pagination";

interface Post {
	id: string;
	title: string;
	date: string;
	summary?: string;
	draft?: boolean;
	pinned?: number;
	tags: string[];
	locale: string;
}

function BlogContentInner({ posts }: { posts: Post[] }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const locale = pathname.split("/")[1]; // Get locale from path

	// Filter posts by current date and locale
	posts = posts.filter((post) => 
		dayjs(post.date).isBefore(dayjs()) && 
		post.locale === locale
	);

	const currentTag = searchParams.get("tag");
	if (currentTag) {
		posts = posts.filter((post) => post.tags.includes(currentTag));
	}

	const allPostCount = posts.length || 0;

	const page: number = Number(searchParams.get('page')) || 1;
	const {engine, pageSize} = pluginConfig.pagination;
	
	if (engine) {
		if (engine === 'default') {
			posts = posts.slice((page - 1) * pageSize, page * pageSize);
		}
		if (engine === 'loadMore') {
			posts = posts.slice(0, page * pageSize);
		}
	}

	const generateHref = (page: number) => {
		if (currentTag) {
			return `blog?tag=${currentTag}&page=${page}`;
		} else {
			return `blog?page=${page}`;
		}
	};

	return (
		<>
			{posts.map((post, index) => (
				<div className={"space-y-4"} key={index}>
					<div className={"space-y-4"}>
						<div className={"block md:hidden"}>
							<Time date={post.date} />
						</div>
						<CardTitle
							className={"not-prose space-x-4 flex justify-start items-center"}
						>
							<Link
								className={"hover:underline hover:underline-offset-8"}
								href={`${pathname}/${post.id}`}
							>
								{post.title}
							</Link>
							{post.pinned && <Badge>Pinned</Badge>}
						</CardTitle>
						<div className={"flex flex-col md:flex-row md:space-x-4"}>
							<div className={"hidden md:block"}>
								<Time date={post.date} />
							</div>
							<div className={"space-x-2 flex flex-wrap"}>
								{post.tags?.map((tag, index) => (
									<Link
										key={index}
										href={`${pathname}?tag=${tag}`}
										className="no-underline"
									>
										<div
											className={
												currentTag === tag
													? "bg-secondary text-sm border p-1"
													: "border p-1 text-sm"
											}
										>
											#{tag}
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>
					<CardDescription className={"text-base"}>
						{post.summary}
					</CardDescription>
					<div className={"flex justify-end"}>
						<Button asChild>
							<Link href={`${pathname}/${post.id}`} className="no-underline">
								Read More
								<ArrowRight size={16} className={"ml-2"} />
							</Link>
						</Button>
					</div>
				</div>
			))}
			<Pagination allCount={allPostCount} generateHref={generateHref}/>
		</>
	);
}

function BlogContent({ posts }: { posts: Post[] }) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<BlogContentInner posts={posts} />
		</Suspense>
	);
}

export default BlogContent;
