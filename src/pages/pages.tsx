import React from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import PageCards, {type PageItem} from "@site/src/components/PageCards";

const pages: PageItem[] = [
	{
		title: "Portfolio",
		description: "Professional work, open source projects, and talks",
		link: "/portfolio",
		emoji: "💼",
	},
	{
		title: "Sick Picks",
		description: "Personal recommendations for tools, products, and resources",
		link: "/sick-picks",
		emoji: "🎧",
	},
	{
		title: "Games",
		description: "Puzzles, party games, and strategy games",
		link: "/games",
		emoji: "🎮",
	},
	{
		title: "Mnemonica Stack",
		description: "Interactive card magic trainer for memorizing deck positions",
		link: "/mnemonica-stack",
		emoji: "🃏",
	},
];

export default function PagesIndex()
{
	return (
		<Layout title="Pages" description="Explore all pages on motlin.com">
			<main className="container margin-vert--lg">
				<Heading as="h1">📑 Pages Index</Heading>
				<p className="text--lg margin-bottom--lg">Explore the tools, games, and resources on this site.</p>

				<PageCards pages={pages} buttonLabel="Visit Page" />
			</main>
		</Layout>
	);
}
