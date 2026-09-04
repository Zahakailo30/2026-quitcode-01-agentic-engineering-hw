"use client";

import { useEffect, useState } from "react";
import { PButton, PTag, PText } from "@porsche-design-system/components-react/ssr";
import type { TagVariant } from "@porsche-design-system/components-react/ssr";
import styles from "./RockPaperScissorsGame.module.css";

type Choice = "rock" | "paper" | "scissors";
type Result = "win" | "lose" | "draw";

type Round = {
  player: Choice;
  computer: Choice;
  result: Result;
};

type Score = Record<Result, number>;

const CHOICES: { value: Choice; label: string; emoji: string }[] = [
  { value: "rock", label: "Rock", emoji: "✊" },
  { value: "paper", label: "Paper", emoji: "✋" },
  { value: "scissors", label: "Scissors", emoji: "✌️" },
];

const CHOICE_DISPLAY: Record<Choice, string> = Object.fromEntries(
  CHOICES.map(({ value, emoji, label }) => [value, `${emoji} ${label}`])
) as Record<Choice, string>;

const BEATS: Record<Choice, Choice> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const RESULT_VARIANT: Record<Result, TagVariant> = {
  win: "success",
  lose: "error",
  draw: "warning",
};

const RESULT_LABEL: Record<Result, string> = {
  win: "You win!",
  lose: "You lose!",
  draw: "Draw!",
};

function getResult(player: Choice, computer: Choice): Result {
  if (player === computer) return "draw";
  return BEATS[player] === computer ? "win" : "lose";
}

const INITIAL_SCORE: Score = { win: 0, lose: 0, draw: 0 };

export function RockPaperScissorsGame() {
  const [round, setRound] = useState<Round | null>(null);
  const [score, setScore] = useState<Score>(INITIAL_SCORE);

  const handlePlay = (player: Choice) => {
    // False positive: PButton wraps a custom element, so the compiler can't tell onClick is an event handler.
    // eslint-disable-next-line react-hooks/purity
    const computer = CHOICES[Math.floor(Math.random() * CHOICES.length)].value;
    const result = getResult(player, computer);
    setRound({ player, computer, result });
    setScore((prev) => ({ ...prev, [result]: prev[result] + 1 }));
  };

  const handleReset = () => {
    setRound(null);
    setScore(INITIAL_SCORE);
  };

  useEffect(() => {
    if (!round) return;
    const timer = setTimeout(() => setRound(null), 3000);
    return () => clearTimeout(timer);
  }, [round]);

  return (
    <div className={styles.game}>
      <div className={styles.choices}>
        {CHOICES.map(({ value, label, emoji }) => (
          <PButton key={value} variant="secondary" onClick={() => handlePlay(value)}>
            {emoji} {label}
          </PButton>
        ))}
      </div>

      {round && (
        <div className={styles.round}>
          <PText>You: {CHOICE_DISPLAY[round.player]}</PText>
          <PText>Computer: {CHOICE_DISPLAY[round.computer]}</PText>
          <PTag variant={RESULT_VARIANT[round.result]}>{RESULT_LABEL[round.result]}</PTag>
        </div>
      )}

      <div className={styles.score}>
        <PTag compact variant="success">
          Wins: {score.win}
        </PTag>
        <PTag compact variant="error">
          Losses: {score.lose}
        </PTag>
        <PTag compact variant="warning">
          Draws: {score.draw}
        </PTag>
      </div>

      <PButton variant="secondary" onClick={handleReset}>
        Reset score
      </PButton>
    </div>
  );
}
