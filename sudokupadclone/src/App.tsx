import { useEffect, useState } from 'react'
import { MdPause, MdPlayArrow } from 'react-icons/md'
import Puzzle from './puzzle/components/Puzzle'
import './App.css'
import { samplePuzzles } from './utils/testPuzzles'
import { getDifficultyName } from './puzzle/enums'

function App() {
    const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState(true);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                setSeconds(seconds + 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    });

    const handleSelectPuzzle = (index: number) => {
        setSelectedPuzzleIndex(index);
        setSeconds(0);
        setIsPaused(false);
    }

    const handleQuitPuzzle = () => {
        setSelectedPuzzleIndex(null);
        setIsPaused(true);
        setSeconds(0);
    }

    const getFormattedElapsedTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

  return (
      <>
          {selectedPuzzleIndex == null && samplePuzzles.map((_, index) =>
              <div className='sample-puzzle' key={`samplePuzzle${index}`} >
                  <div><strong>Name:</strong> {samplePuzzles[index]?.name}</div>
                  <div><strong>Difficulty:</strong> {getDifficultyName(samplePuzzles[index]?.difficulty)}</div>
                  <button onClick={() => handleSelectPuzzle(index)}>Play now!</button>
              </div>)}
          {selectedPuzzleIndex !== null &&
              <>
              <div className="columns-container">
                  <span><button className='return-to-menu-button' onClick={() => handleQuitPuzzle()}>Return to menu</button></span>
                  <span>{seconds > 0 && getFormattedElapsedTime(seconds)}</span>
                  <span>
                      {!isPaused && <MdPause onClick={() => setIsPaused(true)} />}
                      {isPaused && <MdPlayArrow onClick={() => setIsPaused(false)} />}
                  </span>
              </div>
              <Puzzle cellValues={samplePuzzles[selectedPuzzleIndex]?.cellValues} isPaused={isPaused} />
              </>}
    </>
  )
}

export default App
