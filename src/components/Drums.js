import React from 'react'
import Tone from 'tone'
import {Link} from 'react-router-dom'


class Drums extends React.Component {

  state = {
  }

  handleKick = (e) => {
    const {name} = e.target
    console.log(name)
    this.state[name].start()
  }

  componentDidMount() {
    let kick = new Tone.Player('/kick.mp3').toMaster()
    let clHat = new Tone.Player('/clHat.mp3').toMaster()
    let hiTom = new Tone.Player('/hiTom.mp3').toMaster()
    let loTom = new Tone.Player('/loTom.mp3').toMaster()
    let opHat = new Tone.Player('/opHat.mp3').toMaster()
    let snare = new Tone.Player('/snare.mp3').toMaster()
    this.setState({ kick, clHat, hiTom, loTom, opHat, snare })
  }

  render() {
    return (
      <div className='Drums'>
        <h1>THE ULTIMATE DRUM SOUNDS</h1>
        <Link to='/'>TONES N STUFF</Link>
        <div>
          <button name='kick' onClick={this.handleKick}>CAN I KICK IT?</button>
          <button name='snare' onClick={this.handleKick}>CAN I KICK IT?</button>
          <button name='clHat' onClick={this.handleKick}>CAN I KICK IT?</button>
          <button name='opHat' onClick={this.handleKick}>CAN I KICK IT?</button>
          <button name='loTom' onClick={this.handleKick}>CAN I KICK IT?</button>
          <button name='hiTom' onClick={this.handleKick}>CAN I KICK IT?</button>
        </div>
      </div>
    )
  }
}

export default Drums