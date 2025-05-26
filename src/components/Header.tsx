"use client";
import { blogConfig } from "@/config/blog.config";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { SheetContent } from "./ui/sheet";
import { SheetTrigger } from "./ui/sheet";
import { Sheet } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Github } from "lucide-react";
import { Separator } from "./ui/separator";
import SearchPlugin from "@/plugins/search";
import { useTranslations } from "next-intl";

function Header() {
	const { routes, logo, githubRepo } = blogConfig;
	const pathname = usePathname();
	const router = useRouter();
	const currentLocale = pathname.split('/')[1];

	const active = routes.find(
		(item: any) => item.value === "/" + pathname.split("/")[2]
	)?.name;

	const { theme, setTheme } = useTheme();
	const [open, setOpen] = useState(false);

	const switchLocale = () => {
		const newLocale = currentLocale === 'en' ? 'vi' : 'en';
		const segments = pathname.split('/');
		segments[1] = newLocale;
		const newPath = segments.join('/') + (window.location.search || '');
		router.push(newPath);
	};

	const t = useTranslations("Header");

	return (
		<div
			className={
				"w-full sticky top-0 border-b border-gray-600 backdrop-blur-md shadow-sm z-10 min-h-20"
			}
		>
			<header className={"container flex justify-between py-4"}>
				<div className={"flex justify-center items-center"}>
					<Link className={"flex justify-center items-center mr-4"} href={`/${currentLocale}`}>
						{logo?.text && (
							<div className={"ml-1 text-lg font-semibold"}>{logo?.text}</div>
						)}
					</Link>
					<div className={"hidden md:block space-x-1"}>
						{routes.map((route: any) => (
							<Link key={route.name} href={`/${currentLocale}${route.value}`}>
								<Button
									variant={active === route.name ? "secondary" : "ghost"}
									className={"text-base"}
								>
									{t(route.name)}
								</Button>
							</Link>
						))}
					</div>
				</div>
				<div className={"flex justify-center items-center space-x-1"}>
					<div className={"md:hidden block"}>
						<Sheet
							open={open}
							onOpenChange={() => {
								setOpen(!open);
							}}
						>
							<SheetTrigger>
								<Button size={"icon"} variant={"ghost"}>
									<Menu size={20} />
								</Button>
							</SheetTrigger>
							<SheetContent
								side={"top"}
								className={"w-full space-y-4 p-12 text-sm"}
							>
								{routes.map((route: any, index: number) => (
									<div className={"space-y-4"} key={route.name}>
										<Link
											href={`/${currentLocale}${route.value}`}
											onClick={() => {
												setOpen(false);
											}}
										>
											<Button
												variant={active === route.name ? "secondary" : "ghost"}
												className={"text-base w-full"}
											>
												{t(route.name)}
											</Button>
										</Link>
										{index !== routes.length - 1 && <Separator />}
									</div>
								))}
							</SheetContent>
						</Sheet>
					</div>
					<SearchPlugin/>
					<Link href={githubRepo}>
						<Button size={"icon"} variant={"ghost"}>
							<Github size={20} />
						</Button>
					</Link>
					<Button
						size={"icon"}
						variant={"ghost"}
						onClick={switchLocale}
						className="font-medium"
					>
						{currentLocale === 'en' ? 'VI' : 'EN'}
					</Button>
					<Button
						size={"icon"}
						variant={"ghost"}
						onClick={() => {
							setTheme(theme === "light" ? "dark" : "light");
						}}
					>
						{theme === "light" && <Sun size={20} />}
						{theme === "dark" && <Moon size={20} />}
					</Button>
				</div>
			</header>
		</div>
	);
}

export default Header;
