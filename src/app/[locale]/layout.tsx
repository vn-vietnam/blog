import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProviderTheme from "@/provider/provider-theme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Title from "@/components/Title";
import Analytics from "@/plugins/analytics";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { getMessages } from "next-intl/server";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "BLog Simple",
	description: "Blog Simple Nextjs 15",
	icons: {
		icon: "/icon.png",
	},
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { locale: string };
}>) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}
	setRequestLocale(locale);

	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<ProviderTheme>
					<body
						suppressHydrationWarning
						className={`${geistSans.variable} relative min-h-screen font-mono flex flex-col justify-between ${geistMono.variable} antialiased`}
					>
						<div className={"flex-1"}>
							<Header />
							<main
								className={
									"md:mb-12 mb-8 min-w-full prose md:prose-lg dark:prose-invert"
								}
							>
								<Title />
								{children}
							</main>
							<Footer />
						</div>
						<BackToTop />
						<Analytics />
					</body>
				</ProviderTheme>
			</NextIntlClientProvider>
		</html>
	);
}
