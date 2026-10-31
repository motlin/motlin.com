import React from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	to?: string;
}

const Link: React.FC<LinkProps> = ({href, to, children, ...props}) => {
	// oxlint-disable-next-line typescript/prefer-nullish-coalescing -- An empty href falls through like the real Link.
	const url = href || to || "#";

	return (
		// eslint-disable-next-line @docusaurus/no-html-links
		<a href={url} {...props}>
			{children}
		</a>
	);
};

export default Link;
