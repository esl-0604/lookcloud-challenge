import React from "react"

export default React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
	function Boundary(props, ref) {
		return (
			<div
				{...props}
				ref={ref}
				className={
					"relative h-64 overflow-hidden bg-black dark:bg-[#121212]" +
					props.className
				}
			/>
		)
	},
)
