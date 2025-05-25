"use client";

import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import React from "react";
import { blogConfig, pluginConfig } from "@/config/blog.config";
import { ArrowRight } from "lucide-react";
import { Badge } from "lucide-react";
import { Button } from "./ui/button";
import { CardDescription, CardTitle } from "./ui/card";
import Time from "./Time";
import Link from "next/link";
import Pagination from "@/plugins/pagination";

function BlogContent({ posts }: any) {
	posts = posts.filter((post: any) => dayjs(post.date).isBefore(dayjs()));

	const searchParams = useSearchParams();

	const currentTag = searchParams.get("tag");
	if (currentTag) {
		posts = [...posts.filter((post: any) => post.tags.includes(currentTag))];
	}

	const allPostCount = posts.length || 0;

	  const page: any = Number(searchParams.get('page')) || 1
	  const {engine, pageSize} = pluginConfig.pagination
	  if (engine) {
		  if (engine === 'default') {
			  posts = posts.slice((page - 1) * pageSize, page * pageSize)
		  }
		  if (engine === 'loadMore') {
			  posts = posts.slice(0, page * pageSize)
		  }
	  }

	const generateHref = (page: number) => {
		if (currentTag) {
			return `/blog?tag=${currentTag}&page=${page}`;
		} else {
			return `/blog?page=${page}`;
		}
	};

	return (
		<>
			{posts.map((post: any, index: number) => (
				<div className={"space-y-4"} key={index}>
					<div className={"space-y-4"}>
						<div className={"block md:hidden"}>
							<Time date={post?.date} />
						</div>
						<CardTitle
							className={"not-prose space-x-4 flex justify-start items-center"}
						>
							<Link
								className={"hover:underline hover:underline-offset-8"}
								href={`/blog/${post.id}`}
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
								{post?.tags?.map((tag: string, index: number) => (
									<Link
										key={index}
										href={`/blog?tag=${tag}`}
										className="no-underline"
									>
										<div
											key={index}
											className={
												currentTag == tag
													? "bg-secondary text-sm"
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
							<Link href={`/blog/${post.id}`} className="no-underline">
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

export default BlogContent;
