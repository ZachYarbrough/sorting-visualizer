import './App.css'
import Chart from './components/Chart'
import { useState } from 'react'

function App() {
    const [crtStyle, setCRTStyle] = useState<string>("on")

    const toggleCRTStyle = () => {
	setCRTStyle(crtStyle === 'on' ? '' : 'on')
    }

    return (
	<div id="monitor" className={crtStyle}>
	    <div id="crt" className={crtStyle}>
		<div id="scanline" className={crtStyle}></div>
		<Chart toggleCRTStyle={toggleCRTStyle} />
	    </div>
	</div>
    )
}

export default App
