import ChallengeHeader from "../header";
import ChallengeParticipantMain from "./main";

export default function Participate() {
    return (
        <main className="flex flex-col justify-center items-center absolute w-[100%] min-h-[100%] bg-black">
            <ChallengeHeader />
            <ChallengeParticipantMain />
        </main>
    );
}
