import { useState } from 'react'
import Puzzle from './puzzle/components/Puzzle'
import './App.css'
import { samplePuzzles } from './utils/testPuzzles'

function App() {
    const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number|null>(null);

  return (
      <>
          {selectedPuzzleIndex == null && samplePuzzles.map((puzzle, index) => <button onClick={() => setSelectedPuzzleIndex(index)} >Puzzle #{index + 1}</button>) }
          {selectedPuzzleIndex != null && <Puzzle cellValues={samplePuzzles[selectedPuzzleIndex]} />}
    </>
  )
}

export default App
