import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Drum from './Drum';
import Step from './Step';
// import BeatService from '../../services/BeatService';
import './808.css'
import playIcon from '../../images/play.svg'
import pauseIcon from '../../images/pause.svg'
import saveIcon from '../../images/FloppyDisk.svg'
import saveIcon2 from '../../images/FloppyDisk2.svg'
import saveIcon3 from '../../images/FloppyDisk3.svg'
import goBack from '../../images/GoBack.svg'
import Tone from 'tone'



const EMPTY_BEAT = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

let start = null


class MachineDrum extends React.Component {
  state = {
    sounds: {},
    drums: {
      kick: [...EMPTY_BEAT],
      snare: [...EMPTY_BEAT],
      clHat: [...EMPTY_BEAT],
      opHat: [...EMPTY_BEAT],
      hiTom: [...EMPTY_BEAT],
      loTom: [...EMPTY_BEAT]
    },
    bpm: 120,
    activeDrum: 'kick',
    counter: 0,
    name: '',
    nameIt: false,
    redirect: false,
    play: false
  }

  handleActiveDrum = (e) => {
    const activeDrum = e.target.name
    console.log(e.target.name)
    this.setState({
      activeDrum
    })
  }

  handleStep = (index, e) => {
    const { activeDrum, drums } = this.state
    const newArr = drums[activeDrum].slice()
    newArr[index] = !drums[activeDrum][index]

    this.setState({
      drums: {
        ...drums,
        [activeDrum]: newArr
      }             
    })
  }
  
  handleStart = () => {
    const { bpm, play } = this.state

    if (!start) {
      this.setState({ counter: 0, play: true }, () => {
        start = setInterval(this.count, Math.round((60000/bpm)/4)) //NOT WORKING
      })
    } else {
      clearInterval(start);
      start = null;
      this.setState({ play: false })
    }
  }

  count = () => {
    const { counter, drums, sounds } = this.state
    
    drums.kick[counter] && sounds.kick.start()
    drums.snare[counter] && sounds.snare.start()
    drums.clHat[counter] && sounds.clHat.start()
    drums.opHat[counter] && sounds.opHat.start()
    drums.loTom[counter] && sounds.loTom.start()
    drums.hiTom[counter] && sounds.hiTom.start()

    this.setState({
      counter: counter > 14 ? 0 : counter + 1
    })
  }

  handleBpm = (e) => {
    let bpm = Number(e.target.value)
    if (!start) {
      this.setState({
        bpm: bpm
      })
    } else {
    this.setState({
      bpm: bpm
    }, () => {
      clearInterval(start)
      start = setInterval(this.count, Math.round((60000/bpm)/4))
    })}
  }

  // saveBeat = (e) => {
  //   e.preventDefault()

  //   const { bpm, name } = this.state
  //   const data = {...this.state.drums, bpm, name}

  //   BeatService.saveBeat(data).then(
  //     (response) => {
  //       this.setState({ redirect: true })
  //     },
  //     error => {}
  //   )
  // }

  closeNameBeatOutside = ({ target }) => {
    if (!this.wrapperRef.contains(target)) {
      const { nameIt } = this.state
      this.setState({ nameIt: !nameIt, play: false })
    }
  }

  closeNameBeat = (e) => {
    const { nameIt } = this.state
    this.setState({ nameIt: !nameIt, play: false })
  }

  nameBeat = (e) => {
    e.preventDefault()
    const { nameIt, play } = this.state
    clearInterval(start)
    this.setState({ nameIt: !nameIt, play: false })
  }

  handleName = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  componentDidMount() {
    let kick = new Tone.Player('/kick.mp3').toMaster()
    let clHat = new Tone.Player('/clHat.mp3').toMaster()
    let hiTom = new Tone.Player('/hiTom.mp3').toMaster()
    let loTom = new Tone.Player('/loTom.mp3').toMaster()
    let opHat = new Tone.Player('/opHat.mp3').toMaster()
    let snare = new Tone.Player('/snare.mp3').toMaster()
    this.setState({ sounds: {kick, clHat, hiTom, loTom, opHat, snare} })
  }

  render() {
    const { activeDrum, nameIt, name, play } = this.state
    const { kick } = this.state.drums

    // console.log('808 Render')

    if (this.state.redirect) {
      return < Redirect to="/home" />
    }

    const Steps = kick.map((el, index) => {
      return < Step 
        activeMode={this.state.drums[activeDrum][index]} 
        activeDrum={activeDrum}
        counter={this.state.counter}
        kick={this.state.drums.kick[index]}
        snare={this.state.drums.snare[index]}
        clHat={this.state.drums.clHat[index]}
        opHat={this.state.drums.opHat[index]}
        hiTom={this.state.drums.hiTom[index]}
        loTom={this.state.drums.loTom[index]}
        onClick={this.handleStep.bind(this, index)} 
        index={index} key={index} />
    })

    return (
      <div className='Machine-Drum'>
        <div className="Instruments">
          < Drum activeDrum={activeDrum} onClick={this.handleActiveDrum} title="Kick" name="kick"/>
          < Drum activeDrum={activeDrum} onClick={this.handleActiveDrum} title="Snare" name="snare"/>
          < Drum activeDrum={activeDrum} onClick={this.handleActiveDrum} title="Closed Hat" name="clHat"/>
          < Drum activeDrum={activeDrum} onClick={this.handleActiveDrum} title="Open Hat" name="opHat"/>
          < Drum activeDrum={activeDrum} onClick={this.handleActiveDrum} title="Low Tom" name="loTom"/>
          < Drum activeDrum={activeDrum} onClick={this.handleActiveDrum} title="High Tom" name="hiTom"/>
        </div>
        <div className='Controllers'>
          <div className='Bpm-Controllers'>
            <div className='Bpm-Info'>
              <h3>{this.state.bpm}</h3><h3>bpm</h3>
            </div>
            <form className='Input-Form'>
              <input onChange={this.handleBpm} value={this.state.bpm} type="range" name="bpm" min="56" max="240" step="0.5"/>
            </form>
          </div>

          {/* <button onClick={this.handleStart}>Start</button>   */}

          <img onClick={this.handleStart} className='Play-Pause-Machine' src={play ? pauseIcon : playIcon} alt='playBtn' />

          {
            nameIt && 
            <div className="modal" onClick={this.closeNameBeatOutside}>
              <div className="modal-content" ref={(node) => this.wrapperRef = node}>
                <span onClick={this.closeNameBeat} className="close-btn">&times;</span>
                <form className='Inputs'>
                  {/* <label>Name it!</label> */}
                  <input onChange={this.handleName} name='name' value={name} placeholder='Name it!'></input>
                  <button className='btn-Submit' onClick={this.saveBeat}>Save</button>
                </form>
              </div>
            </div>
          }

          {/* <button onClick={this.nameBeat}>Save</button> */}
          <img onClick={this.nameBeat} className='Save-Btn' src={saveIcon3} alt='playBtn' /> {/* saveIcon2 */ }
          < Link to='/home'><img className='Save-Btn' src={goBack} alt='goBack' /></Link>        
        </div>

        <div className='Markers'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="Steps">

          {Steps}

        </div>
      </div>
    )
  }
}

export default MachineDrum