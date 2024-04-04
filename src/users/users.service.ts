import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  register(name: string) {
    return name;
  }

  startPlay(player: { bet_points: number; predicted_multiplier: number }) {
    function generateBiasedRandomMultiplier() {
      const bias = 1;
      return Math.pow(Math.random(), bias) * 10;
    }

    function generateRandomBet() {
      const betPoints = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
      const predictedMultiplier = parseFloat((Math.random() * 10).toFixed(2)); // Random multiplier from 0.01 to 10.00
      return {
        bet_points: betPoints,
        predicted_multiplier: predictedMultiplier,
      };
    }

    // Generate bets for 4 CPU players
    const cpuPlayers = Array.from({ length: 4 }, () => generateRandomBet());

    const actualPrediction = +parseFloat(
      generateBiasedRandomMultiplier().toFixed(2),
    );

    // Determine if the human player wins
    const playerWinStatus = player.predicted_multiplier < actualPrediction;
    const playerWinnings = playerWinStatus
      ? player.bet_points * player.predicted_multiplier
      : 0;

    // Determine outcomes for CPU players
    const cpuResults = cpuPlayers.map((cpuPlayer) => {
      const winStatus = cpuPlayer.predicted_multiplier < actualPrediction;
      const winnings = winStatus
        ? cpuPlayer.bet_points * cpuPlayer.predicted_multiplier
        : 0;
      return {
        ...cpuPlayer,
        win_status: winStatus,
        actualPrediction,
        winnings,
      };
    });

    return {
      player: {
        win_status: playerWinStatus,
        actualPrediction,
        winnings: playerWinnings,
        bet_points: player.bet_points,
        predicted_multiplier: player.predicted_multiplier,
      },
      cpuPlayers: cpuResults,
    };
  }
}
