"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

const SideNav = () => {
	return (
		<>
			<Button size={"icon"} variant={"ghost"} asChild>
				<Link href={`/blog`}>
					<ArrowLeft size={20} />
				</Link>
			</Button>
		</>
	);
};

export default SideNav;
