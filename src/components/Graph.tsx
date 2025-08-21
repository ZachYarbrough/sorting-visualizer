import React, { useState, useEffect } from 'react'

const Chart = () => {
    const [chartData, setChartData] = useState<number[]>([])

    useEffect(() => {
	setChartData(Array.from({ length: 10 }, () => Math.floor(Math.random() * (10 - 1 + 1)) + 1 ))
    }, [])

    return (
	<div>
	    {chartData.map((col: number, index: number) => {
		return (
		    <div key={index}>{col}</div>
		)
	    })}
	</div>
    )
}

export default Chart
