import React, {useState} from "react";

export interface FlippableCardProps
{
	frontComponent: React.ReactElement<
	{
		size?: number;
	}>;
	backComponent: React.ReactElement<
	{
		size?: number;
	}>;
	size?: number;
	className?: string;
}

export const FlippableCard: React.FC<FlippableCardProps> = ({
	frontComponent,
	backComponent,
	size = 200,
	className = "",
}) =>
{
	const [isFlipped, setIsFlipped] = useState(false);

	const handleClick = () =>
	{
		setIsFlipped(!isFlipped);
	};

	const clonedFrontComponent = React.cloneElement(
		frontComponent,
		{
			size,
		},
	);
	const clonedBackComponent = React.cloneElement(
		backComponent,
		{
			size,
		},
	);

	return (
		// oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- Mouse and touch only today; keyboard support would be a behavior change.
		<div
			className={className}
			onClick={handleClick}
			style={
			{
				width: size,
				height: size * 1.4,
				perspective: "1000px",
				cursor: "pointer",
				display: "inline-block",
			}}
		>
			<div
				style={
				{
					position: "relative",
					width: "100%",
					height: "100%",
					transformStyle: "preserve-3d",
					transition: "transform 0.6s",
					transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
				}}
			>
				<div
					style={
					{
						position: "absolute",
						width: "100%",
						height: "100%",
						backfaceVisibility: "hidden",
					}}
				>
					{clonedFrontComponent}
				</div>
				<div
					style={
					{
						position: "absolute",
						width: "100%",
						height: "100%",
						backfaceVisibility: "hidden",
						transform: "rotateY(180deg)",
					}}
				>
					{clonedBackComponent}
				</div>
			</div>
		</div>
	);
};
