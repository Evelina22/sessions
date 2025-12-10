
import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [state, setState] = useState(0)
  const [count, setCount] = useState(0)


  useEffect(() => {
    console.log('component did mount');

  }, [state])
  console.log(state);
  function OLOLOLOLOLOO() {
    setState(state + 1)
  }

  return (
    <>
      {state}
      <button onClick={OLOLOLOLOLOO}>onClik</button>
    </>
  )
}

export default App
