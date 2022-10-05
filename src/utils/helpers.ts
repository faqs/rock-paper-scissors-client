export function formResultMessage(nickname: string, instance: string, winner: string): string {
  let resultMessage = '';
  if (winner === 'Draw') {
    const capitalizedInstance = instance.slice(0, 1).toUpperCase() + instance.slice(1);
    resultMessage = `${capitalizedInstance} ended in a draw`;
  } else {
    const result = winner === nickname ? 'won' : 'lost';
    resultMessage = `You ${result} ${instance}`;
  }

  return resultMessage;
}
