import { blogConfig, pluginConfig } from "@/config/blog.config";
import React from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Label } from "./ui/label";
import SocialList from "./SocialList";
import Newsletter from "@/plugins/newsletter";

function Footer() {
	const {
		author,
		footer: { isShow, isShowPoweredBy },
	} = blogConfig;

	const { title, description, position } = pluginConfig.newsletter;
	return (
		isShow && (
			<div>
				<Separator />
				<footer className={"container py-8 space-y-8"}>
					{position.footer && (
						<div
							className={
								"flex justify-between items-center flex-col md:flex-row space-y-4 md:space-y-0"
							}
						>
							<div
								className={
									"flex justify-center  items-center md:items-start flex-col"
								}
							>
								<Label className={"text-base"}>
									{title && "Subscribe to the newsletter"}
								</Label>
								{description && (
									<p className={"text-sm text-gray-500 text-center"}>
										{description}
									</p>
								)}
							</div>
							<Newsletter  />
						</div>
					)}
					<div
						className={
							"w-full flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0"
						}
					>
						<div className={"md:hidden block"}>
							<SocialList isFooter={true} />
						</div>
						<div>
							{`© ${new Date().getFullYear()} ${author}`}
						</div>
						<div className={"md:block hidden"}>
							<SocialList isFooter={true} />
						</div>
					</div>
				</footer>
			</div>
		)
	);
}

export default Footer;
