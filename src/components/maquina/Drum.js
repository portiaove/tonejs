import React from 'react'
import './808.css'

class Drum extends React.Component {

  handleStyle = (drum) => {
    if (drum === 'kick') {
      return 'Kick'
    } else if (drum === 'snare') {
      return 'Snare'
    } else if (drum === 'clHat') {
      return 'ClHat'
    } else if (drum === 'opHat') {
      return 'OpHat'
    } else if(drum === 'loTom') {
      return 'LoTom'
    } else if (drum === 'hiTom') {
      return 'HiTom'
    } else {
      return 'Black'
    }
  }

  render() {
    const { activeDrum, name, onClick, title } = this.props
    console.log('Drum Render')
  return(
    <div className="Instrument" onClick={() => onClick({ target: { name }})}>
      <div className={(activeDrum === name) ? this.handleStyle(name) : 'Black'} style={{width: "30px", height: "6px"}}></div>
      <div>
        <h4>{title}</h4>
      </div>
    </div>
  )
  }
}

export default Drum