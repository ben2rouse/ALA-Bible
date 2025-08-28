import React, { useState } from 'react'
import verses from './data/verses.json'
import VerseSelector from './components/VerseSelector'
import PracticeArea from './components/PracticeArea'

export default function App(){
  const [selectedId, setSelectedId] = useState(verses[0].id)
  const selectedVerseObj = verses.find(v => v.id === selectedId)
  const [versionKey, setVersionKey] = useState(Object.keys(selectedVerseObj.versions)[0])
  const [difficulty, setDifficulty] = useState(3) // 1..5

  // when verse changes reset version to first available
  function handleVerseChange(id){
    setSelectedId(id)
    const v = verses.find(x=>x.id===id)
    setVersionKey(Object.keys(v.versions)[0])
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Memory Verse Practice</h1>
        <p className="subtitle">Select a verse and difficulty, then practice on the same page.</p>
      </header>

      <main className="main">
        <VerseSelector
          verses={verses}
          selectedId={selectedId}
          onSelect={handleVerseChange}
          versionKey={versionKey}
          onVersionChange={setVersionKey}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />

        <PracticeArea
          verseText={selectedVerseObj.versions[versionKey]}
          reference={selectedVerseObj.reference}
          difficulty={difficulty}
        />
      </main>
    </div>
  )
}
