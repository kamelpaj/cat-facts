import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'
import axios from "axios";
import './App.css'


export default function App() {

  const [index, setIndex] = useState(0);
  const [catFact, setCatFact] = useState('');

  const catEmoji = <span role="img" aria-label="Cat emoji">😺</span>;

  const pages = [
    ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}>{catEmoji}{catFact}{catEmoji}</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}>{catEmoji}{catFact}{catEmoji}</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightgreen' }}>{catEmoji}{catFact}{catEmoji}</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightcoral' }}>{catEmoji}{catFact}{catEmoji}</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightcyan' }}>{catEmoji}{catFact}{catEmoji}</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightsalmon' }}>{catEmoji}{catFact}{catEmoji}</animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: 'lightseagreen' }}>{catEmoji}{catFact}{catEmoji}</animated.div>,
  ];

  const LandingPage = ({ style }) => <animated.div style={{ ...style, background: 'lightgreen' }}>{catEmoji}Press anywhere on the screen to generate a cat fact!{catEmoji}</animated.div>;

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
          const Page = pages[item];
          if (catFact === '') {
            return <LandingPage />
          } else {
            return <Page key={key} style={props} />
          }
        })}
      </div>
  )
}