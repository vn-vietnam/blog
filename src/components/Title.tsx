"use client";

import { blogConfig } from "@/config/blog.config";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import React, { Suspense } from "react";

function TitleInner() {
	const t = useTranslations("Title");
	const router = usePathname();
	const nameArr = router.split("/");
	const name = nameArr[nameArr.length - 1];
	const data = name ? blogConfig[name] : blogConfig.title;
	if (name === "blog" || name === "tags" || name === "project") {
		return (
			<div className={"container pt-8"}>
				<h1 className="text-3xl font-bold mb-4">{t(data?.title)}</h1>
			</div>
		);
	}
}

function Title() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<TitleInner />
		</Suspense>
	);
}

export default Title;
