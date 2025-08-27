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

      <div className="row range-row">
        <label>Difficulty</label>
        <input
          type="range"
          min="1"
          max="5"
          value={difficulty}
          onChange={e=>onDifficultyChange(Number(e.target.value))}
        />
        <span className="difficulty-label">Level {difficulty}</span>
      </div>
    </section>
  )
}
