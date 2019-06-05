import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'
import axios from "axios";
import './App.css'


export default function App() {

  const [index, setIndex] = useState(0);
  const [catFact, setCatFact] = useState('');

  const pages = [
    ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}>{catFact}</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}>{catFact}</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightgreen' }}>{catFact}</animated.div>,
  ]

 function getRandomCatFact() {
  axios.get('https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts/random').then(response => {
    const newCatFact = response.data.text;
    setCatFact(newCatFact);
    setIndex(index => (index + 1) % 3);
  })
};
  
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  return (
      <div className="colorfulMain" onClick={getRandomCatFact}>
        {transitions.map(({ item, props, key }) => {
          const Page = pages[item]
          return <Page key={key} style={props} />
        })}
      </div>
  )
}