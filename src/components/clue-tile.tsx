import { Clue } from '../types';

interface ClueTileProps {
    clue: Clue;
    currentClue?: Clue;
    handleClueClick: (id: string) => void;
    answeringQuestion: boolean;
}

export function ClueTile({
  clue,
  currentClue,
  handleClueClick,
  answeringQuestion,
}: ClueTileProps) {
  let borderStyle
    if(currentClue && currentClue.id === clue.id && answeringQuestion === true) {
        borderStyle={border: "solid yellow"}
    } else {
        borderStyle={border: "solid black"}
    }
  return (
    <div
      onClick={() => handleClueClick(clue.id)}
      className="clue-tile"
      style={borderStyle}
    >
        <p>{clue.answered ? null : clue.value}</p>
    </div>
  )
}