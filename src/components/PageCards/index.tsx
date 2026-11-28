import React from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

export interface PageItem
{
	title: string;
	description: string;
	link: string;
	emoji?: string;
	iconUrl?: string;
	previewUrl?: string;
}

interface PageCardsProps
{
	pages: PageItem[];
	buttonLabel: string;
}

export default function PageCards({pages, buttonLabel}: PageCardsProps)
{
	return (
		<div className="row">
			{pages.map((page) => (
				<div key={page.title} className={`col col--6 margin-bottom--lg ${styles.column}`}>
					<div className={`card shadow--md ${styles.card}`}>
						{page.previewUrl && (
							<div className="card__image">
								<img
									src={page.previewUrl}
									alt=""
									width={1200}
									height={630}
									loading="lazy"
									className={styles.preview}
								/>
							</div>
						)}
						<div className="card__header">
							<Heading as="h2">
								{page.iconUrl && (
									<img
										src={page.iconUrl}
										alt=""
										width={32}
										height={32}
										className="margin-right--sm"
										style={
										{
											verticalAlign: "middle",
										}}
									/>
								)}
								{page.emoji && <span className="margin-right--sm">{page.emoji}</span>}
								{page.title}
							</Heading>
						</div>
						<div className={`card__body ${styles.body}`}>
							<p>{page.description}</p>
						</div>
						<div className="card__footer">
							<Link className="button button--primary button--block" to={page.link}>
								{buttonLabel}
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
