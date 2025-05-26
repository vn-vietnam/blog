import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function Home() {
	const t = await getTranslations("Home");
	return (
		<div className="flex w-full justify-center items-center h-[calc(100vh-324px)] flex-col">
			<h1 className="text-2xl font-bold">{t("title")}</h1>
			<p className="py-6 text-center md:w-[50%] w-full">
				{t("description")}
			</p>
			<Button className="btn btn-primary">{t("button")}</Button>
		</div>
	);
}
