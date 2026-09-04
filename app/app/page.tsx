import { PHeading, PText } from "@porsche-design-system/components-react/ssr";
import { RockPaperScissorsGame } from "@/components/RockPaperScissorsGame";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PHeading size="2xl">Rock Paper Scissors</PHeading>
        <PText color="contrast-medium">Pick your hand and see if you beat the computer.</PText>
        <RockPaperScissorsGame />
      </main>
    </div>
  );
}
