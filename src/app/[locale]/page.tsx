import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
	params,
}: {
	params: { locale: string };
}) {
	const { locale } = await params;
	// Enable static rendering
	setRequestLocale(locale);

	const t = await getTranslations("Home");
	return (
		<>
			<div className={"container"}>{t("title")}</div>
		</>
	);
}
