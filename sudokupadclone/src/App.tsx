import { useState } from 'react'
import Puzzle from './puzzle/components/Puzzle'
import './App.css'
import { samplePuzzles } from './utils/testPuzzles'
import { getDifficultyName } from './puzzle/enums'

function App() {
    const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number|null>(null);

  return (
      <>
          {selectedPuzzleIndex == null && samplePuzzles.map((_, index) =>
              <div className='sample-puzzle'>
                  <div><strong>Name:</strong> {samplePuzzles[index]?.name}</div>
                  <div><strong>Difficulty:</strong> {getDifficultyName(samplePuzzles[index]?.difficulty)}</div>
                  <button onClick={() => setSelectedPuzzleIndex(index)}>Play now!</button>
              </div>)}
          {selectedPuzzleIndex != null &&
              <>
              <button className='return-to-menu-button' onClick={() => setSelectedPuzzleIndex(null)}>Return to menu</button>
                <Puzzle cellValues={samplePuzzles[selectedPuzzleIndex]?.cellValues} />
              </>}
    </>
  )
}

export default App
