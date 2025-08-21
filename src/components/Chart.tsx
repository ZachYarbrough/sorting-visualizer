import React, { useState, useEffect, useRef } from 'react'
import { SORT_TYPE } from '../utils/config'
import { BubbleSort } from '../utils/algorithms'

type AnimationState = {
    arr: number[]
    active: [number, number] | null
    completed: number[]
}

const Chart = () => {
    const [chartData, setChartData] = useState<AnimationState>({
	arr: [],
	active: null,
	completed: []
    })
    const [oldChartData, setOldChartData] = useState<number[]>([])

    const [speed, setSpeed] = useState<number>(100) // delay in ms

    // cancel flag (persists across renders without re-rendering)
    const cancelRef = useRef(false)

    const speedRef = useRef(speed)
    useEffect(() => { speedRef.current = speed }, [speed])

    useEffect(() => {
	generateNewChartData()
    }, [])

    const resetChart = async () => {
	cancelRef.current = true
	await sortingRef.current // ✅ wait for the old loop to really stop
	setChartData({ arr: [...oldChartData], active: null, completed: [] })
    }

    const generateNewChartData = async () => {
	cancelRef.current = true
	await sortingRef.current // ✅ wait for the old loop to really stop
	const newArr = Array.from({ length: 25 }, () => Math.floor(Math.random() * 20) + 1)
	setChartData({ arr: newArr, active: null, completed: [] })
	setOldChartData(newArr)
    }

    const sortingRef = useRef<Promise<void> | null>(null)

    const SortChartData = async (sortType: string) => {
	// cancel any ongoing sort
	cancelRef.current = true
	await sortingRef.current // ✅ wait for the old loop to really stop
	cancelRef.current = false
	
	let arr = [...oldChartData]
	let animations: AnimationState[] = []
	let completed: number[] = []

	switch (sortType) {
	    case SORT_TYPE.BUBBLE_SORT: {
		BubbleSort(arr, animations, completed)
		break
	    }
	    default:
		break
		
	}

	// store the active loop so we can await cancellation later
	sortingRef.current = (async () => {
	    for (let k = 0; k < animations.length; k++) {
		if (cancelRef.current) return // ✅ exit cleanly
		    await new Promise((res) => setTimeout(res, speedRef.current))
		setChartData(animations[k])
	    }
	})()

	await sortingRef.current // wait for this run to finish
    }

return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    {chartData.arr.map((col: number, index: number) => {
	let bg = 'white'
	if (chartData.active && chartData.active.includes(index)) {
	    bg = '#60A5FA'
	} else if (chartData.completed.includes(index)) {
	    bg = '#34D399'
	}
	return (
	    <div
	    key={index}
	    style={{
		height: `${col}rem`,
		backgroundColor: bg,
		width: '20px',
		margin: 'auto 0.25rem 0 0.25rem',
		transition: 'height 0.1s ease'
	    }}
	    />
	)
    })}
    </div>
    <div style={{ marginTop: '1rem' }}>
    <button onClick={generateNewChartData}>Generate New Chart</button>
    <button onClick={resetChart}>Reset Chart</button>
    <button onClick={() => SortChartData(SORT_TYPE.BUBBLE_SORT)}>Bubble Sort</button>
    <div style={{ marginTop: '1rem' }}>
    <label>
    Speed: 
	<input
    type="range"
    min="10"
    max="250"
    step="10"
    value={speed}
    onChange={(e) => setSpeed(Number(e.target.value))}
    />
    {speed}ms
    </label>
    </div>
    </div>
    </div>
)
}

export default Chart

