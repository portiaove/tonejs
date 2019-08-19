import React from 'react'
import './808.css'


class Step extends React.Component {

  handleStyle = (drum) => {
    if (drum === 'kick') {
      return 'Kick Step-Active'
    } else if (drum === 'snare') {
      return 'Snare Step-Active'
    } else if (drum === 'clHat') {
      return 'ClHat Step-Active'
    } else if (drum === 'opHat') {
      return 'OpHat Step-Active'
    } else if(drum === 'loTom') {
      return 'LoTom Step-Active'
    } else if (drum === 'hiTom') {
      return 'HiTom Step-Active'
    } else {
      return 'Black Step'
    }
  }

  
  render() {
    const { onClick, activeMode, index, counter, activeDrum } = this.props
    const activeStep = index === counter

    // console.log('Step Render')


    return(
      <div className={`Step ${activeMode && this.handleStyle(activeDrum)}`}>
        <button onClick={onClick} className='Stp-Btn'>
          <div className='Little-Step'>
            <div className='Active-Step' style={{background: `${activeStep ? 'red' : 'black'}`}}></div>
            <p>{index+1}</p>
          </div>
        </button>
      </div>
    )
  }
}

export default Step