import React from 'react'
import Tone from 'tone'
import {Link} from 'react-router-dom'

class Tonee extends React.Component {
  state = {
    play: false
  }

  playSound = () => {
    // Tone.Transport.cancel()    
    if (!this.state.play) {
      
      this.setState({play: true})
    }
    const synth = new Tone.Synth().toMaster()
    const notes = ['C4', 'E4', 'G4', 'C5', 'E5', 'G5']
    let index = 0

    Tone.Transport.bpm.value = 190

    Tone.Transport.scheduleRepeat(time => {
      repeat(time)
    }, '8n')

    function repeat (time) {
      console.log(time)
      let note = notes[index % notes.length]
      synth.triggerAttackRelease(note, '8n', time)
      index++
    }
    Tone.Transport.start()
  }

  stopSound = () => {
    Tone.Transport.cancel()
    Tone.Transport.stop()
    this.setState({ play: false})
  }

  render() {
    console.log(this.state.play)
    return(
      <div className='Tone'>
        <h1>DIZ IZ DA TONE MAISTAA</h1>
        <Link to='/drums'>DRUMS</Link>
        <div>
          <button onClick={this.playSound}>Play that shittt</button>
          <button onClick={this.stopSound}>Stop that shittt</button>
        </div>
      </div>
    )
  }
}

export default Tonee