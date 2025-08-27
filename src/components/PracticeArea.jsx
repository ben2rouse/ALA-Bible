import React, { useEffect, useMemo, useState } from 'react'

// difficulty 1..5 -> percent hidden
const DIFFICULTY_MAP = {
  1: 0.12,
  2: 0.25,
  3: 0.40,
  4: 0.60,
  5: 0.80
}

function normalizeWord(w){
  return w.replace(/[^\p{L}\p{N}'’-]+/gu, '')
           .toLowerCase()
}

export default function PracticeArea({verseText, reference, difficulty}){
  const [seed, setSeed] = useState(0)
  // split by spaces but keep punctuation attached; we'll normalize when comparing
  const tokens = useMemo(()=> verseText.split(/\s+/).filter(Boolean), [verseText])

  const toHideCount = Math.max(1, Math.round(tokens.length * DIFFICULTY_MAP[difficulty]))

  const [hiddenIndices, setHiddenIndices] = useState([])
  const [inputs, setInputs] = useState({})
  const [results, setResults] = useState({})

  useEffect(()=>{
    // when verseText or difficulty or seed changes, pick hidden indices
    const rng = (n)=> Math.floor(Math.random()*n)
    const candidates = tokens.map((t,i)=> ({t,i})).filter(x=> normalizeWord(x.t).length>0)
    const chosen = new Set()
    while(chosen.size < Math.min(toHideCount, candidates.length)){
      const pick = candidates[rng(candidates.length)].i
      // avoid first and last tokens being hidden if small length
      if(pick===0 || pick===tokens.length-1) continue
      chosen.add(pick)
    }
    const arr = Array.from(chosen).sort((a,b)=>a-b)
    setHiddenIndices(arr)
    setInputs({})
    setResults({})
  }, [verseText, difficulty, seed])

  function handleChange(idx, value){
    setInputs(prev=> ({...prev, [idx]: value}))
  }

  function handleSubmit(idx){
    if(results[idx]!==undefined) return // already attempted
    const correct = normalizeWord(tokens[idx])
    const given = normalizeWord(inputs[idx] || '')
    const ok = (given === correct)
    setResults(prev=> ({...prev, [idx]: {ok, correct}}))
  }

  function renderToken(token, i){
    if(!hiddenIndices.includes(i)){
      return <span key={i} className="token">{token} </span>
    }

    const res = results[i]
    if(res){
      return (
        <span key={i} className={`token result ${res.ok? 'ok':'bad'}`}>
          {res.ok ? tokens[i] : <><span className="correct">{tokens[i]}</span></>} 
          {' '}
        </span>
      )
    }

    return (
      <span key={i} className="token blank">
        <input
          type="text"
          value={inputs[i] || ''}
          onChange={e=>handleChange(i, e.target.value)}
          onBlur={()=>handleSubmit(i)}
          onKeyDown={e=>{ if(e.key==='Enter') { e.preventDefault(); handleSubmit(i) } }}
          aria-label={`blank-${i}`}
        />
        {' '}
      </span>
    )
  }

  return (
    <section className="practice">
      <div className="practice-controls">
        <div className="reference">{reference}</div>
        <div className="actions">
          <button onClick={()=> setSeed(s=>s+1)}>New hide</button>
        </div>
      </div>

      <div className="verse">
        {tokens.map((t,i)=> renderToken(t,i))}
      </div>

      <div className="legend">
        <span className="legend-item ok">Correct</span>
        <span className="legend-item bad">Incorrect (answer shown)</span>
      </div>

    </section>
  )
}
