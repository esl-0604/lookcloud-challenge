import ChallengeProfileHeader from "./header";
import ChallengeProfileMain from "./main";

export default function ChallengeProfile() {
    return (
        <main className="flex flex-col justify-start items-center absolute w-[100%] min-h-[100%] bg-black">
            <ChallengeProfileHeader />
            <ChallengeProfileMain />
        </main>
    );
}
