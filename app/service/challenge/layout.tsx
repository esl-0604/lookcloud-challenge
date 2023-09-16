"use client"

import { useRouter, useSearchParams } from "next/navigation"
import LocalStorage from "../../utils/localstorage"
import { useRecoilState } from "recoil"
import { userProfileState } from "@/app/utils/atoms/serviceGlobalState"
import { useEffect } from "react"

export default function ChallengeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
