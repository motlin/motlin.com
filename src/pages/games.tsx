import React from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import PageCards, {type PageItem} from "@site/src/components/PageCards";

const games: PageItem[] = [
	{
		title: "QuartoBot",
		description: "Play Quarto against a perfect-play opponent with move annotations",
		link: "https://quarto.motlin.com/",
		iconUrl: "/img/quarto-favicon.svg",
		previewUrl: "https://quarto.motlin.com/og.jpg",
	},
	{
		title: "Elemental Arena",
		description: "A hot-seat tactical card game played on a grid of fusing elemental terrain",
		link: "https://elemental-arena.motlin.com/",
		iconUrl: "/img/elemental-arena-favicon.svg",
		previewUrl: "https://elemental-arena.motlin.com/og.jpg",
	},
	{
		title: "Neighbors",
		description: "A logic puzzle where every building must agree with the neighbors touching it",
		link: "https://neighbors.motlin.com/",
		iconUrl: "/img/neighbors-favicon.svg",
		previewUrl: "https://neighbors.motlin.com/og.jpg",
	},
	{
		title: "Cublitz",
		description: "A rolling paint puzzle where every roll turns a new face of your cube to the floor",
		link: "https://cublitz.motlin.com/",
		iconUrl: "/img/cublitz-favicon.svg",
		previewUrl: "https://cublitz.motlin.com/og.png",
	},
	{
		title: "Animal Kingdom",
		description: "A turn-based battle for 2 to 6 players where the last animal standing wins",
		link: "https://animal-kingdom.motlin.com/",
		iconUrl: "/img/animal-kingdom-icon.png",
		previewUrl: "https://animal-kingdom.motlin.com/og.jpg",
	},
	{
		title: "Who's That?",
		description: "A face-memory game: study a face, then pick it out, spot what changed, or build it back",
		link: "https://whos-that.motlin.com/",
		iconUrl: "/img/whos-that-favicon.svg",
		previewUrl: "https://whos-that.motlin.com/og.jpg",
	},
	{
		title: "The L Game",
		description: "Edward de Bono's blocking game, against a friend or a computer that has solved it",
		link: "https://l-game.motlin.com/",
		iconUrl: "/img/l-game-favicon.svg",
		previewUrl: "https://l-game.motlin.com/og.jpg",
	},
	{
		title: "Dragon Code",
		description:
			"A block-coding game where you play the dragon: read the knights' code and write a spell to burn them all",
		link: "https://dragon-code.motlin.com/",
		iconUrl: "/img/dragon-code-favicon.svg",
		previewUrl: "https://dragon-code.motlin.com/og.jpg",
	},
	{
		title: "Build It!",
		description: "A party platformer: take turns placing blocks and traps, then race to the flag",
		link: "https://build-it.motlin.com/",
		iconUrl: "/img/build-it-favicon.svg",
		previewUrl: "https://build-it.motlin.com/og.jpg",
	},
	{
		title: "Grid Lines",
		description: "A puzzle game where you draw lines through all connections on a grid",
		link: "/lines",
		emoji: "🎮",
		previewUrl: "/img/grid-lines-og.jpg",
	},
];

export default function GamesIndex()
{
	return (
		<Layout title="Games" description="Games you can play on motlin.com">
			<main className="container margin-vert--lg">
				<Heading as="h1">🎮 Games</Heading>
				<p className="text--lg margin-bottom--lg">
					Puzzles, party games, and strategy games you can play in the browser.
				</p>

				<PageCards pages={games} buttonLabel="Play" />
			</main>
		</Layout>
	);
}
