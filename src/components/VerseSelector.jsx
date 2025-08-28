import React from 'react'

export default function VerseSelector({verses, selectedId, onSelect, versionKey, onVersionChange, difficulty, onDifficultyChange}){
  const selectedVerse = verses.find(v=>v.id===selectedId)
  const versions = Object.keys(selectedVerse.versions)

  return (
    <section className="selector">
      <div className="row">
        <label>Verse</label>
        <select value={selectedId} onChange={e=>onSelect(e.target.value)}>
          {verses.map(v=> (
            <option key={v.id} value={v.id}>{v.reference} — {v.title || ''}</option>
          ))}
        </select>
      </div>

      <div className="row">
        <label>Version</label>
        <select value={versionKey} onChange={e=>onVersionChange(e.target.value)}>
          {versions.map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>

      <div className="row level-row">
        <label>Level</label>
        <div className="levels">
          {[1,2,3,4,5,6].map(l => (
            <button
              key={l}
              type="button"
              className={"level-btn" + (difficulty===l ? ' active':'')}
              onClick={()=> onDifficultyChange(l)}
              aria-pressed={difficulty===l}
            >{l}</button>
          ))}
        </div>
        <span className="difficulty-label">{difficulty===6? 'All hidden (punctuation too)' : `Level ${difficulty}`}</span>
      </div>
    </section>
  )
}
