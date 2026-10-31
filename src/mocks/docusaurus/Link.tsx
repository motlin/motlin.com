import React from "react";

interface LinkProps {
	href?: string;
	to?: string;
	children: React.ReactNode;
	className?: string;
	onClick?: (e: React.MouseEvent) => void;
	[key: string]: any;
}

const Link: React.FC<LinkProps> = ({href, to, children, ...props}) => {
	const url = href || to || "#";

	return (
		// eslint-disable-next-line @docusaurus/no-html-links
		<a href={url} {...props}>
			{children}
		</a>
	);
};

export default Link;
