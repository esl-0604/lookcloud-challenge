import ChallengeHeader from "../header";
import ChallengeLeaderBoardMain from "./main";

export default function ChallengeLeaderBoard() {
  return (
    <main className="flex flex-col justify-start items-center absolute w-[100%] min-h-[100%]">
      <ChallengeHeader />
      <ChallengeLeaderBoardMain />
    </main>
  );
}
