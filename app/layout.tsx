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
					<link rel="manifest" href="/manifest.json" />
					<link
						href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;600&family=IBM+Plex+Sans:wght@100&family=Jacques+Francois&display=swap"
						rel="stylesheet"
					></link>
				</head>

				<body className="overscroll-y-none">
					<div className="flex justify-center items-center w-screen h-screen">
						<div className="relative w-full h-full max-w-[480px] select-none">
							{children}
						</div>
					</div>
				</body>
			</html>
		</RecoilRootWrapper>
	)
}
