import "./global.css"
import type { Metadata } from "next"
import RecoilRootWrapper from "@/app/recoilWrapper"

export const metadata: Metadata = {
	title: "Lookcloud",
	description: "Find your Style",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<RecoilRootWrapper>
			<html>
				<head>
					<meta
						httpEquiv="Content-Security-Policy"
						content="upgrade-insecure-requests"
					/>
				</head>

				<body className="overflow-hidden overscroll-none">
					<div className="flex justify-center items-center w-screen h-screen">
						<div className="relative w-[100%] h-[100%] max-w-[480px] select-none">
							{children}
						</div>
					</div>
				</body>
			</html>
		</RecoilRootWrapper>
	)
}
