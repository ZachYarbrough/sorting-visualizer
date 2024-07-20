"use client"
import { useEffect, useState } from "react"
import './SortingVisualizer.css'
import { bubbleSort } from "./algorithms/BubbleSort"
import { mergeSort } from "./algorithms/MergeSort"

const COLORS = {
    PRIMARY: '#ffffff',
    SORTING: '#f39c12',
    SORTED: '#3498db',
    PARTIALLY_SORTED: '#'
}

export default function SortingVisualizer() {
    const [counts, setCounts] = useState<number[]>([])
    const [buttonVisibility, setButtonVisibility] = useState<boolean>(false)
    const [generateArrButtonVisiblity, setGenerateArrButtonVisiblity] = useState<boolean>(false)
    const [animSpeed, setAnimSpeed] = useState<number>(10)

    /**
     * 
     * @param {number} count number of bars in the chart
     * @returns {number[]} array of random numbers from 5 to 100
     */
    const generateNumbers = (count: number): any[] => {
        const array: any[] = []

        for (let i = 0; i < count; i++) {
            array.push(Math.floor(Math.random() * 100) + 5)
            const curElement: any = document.getElementById(i.toString())
            if (curElement)
                curElement.style.backgroundColor = COLORS.PRIMARY
        }

        setCounts(array)
        setButtonVisibility(false)
        return array
    }

    /**
     * 
     * @param {any[]} animArr array of animation events
     * 
     * Loop through the animation array and update the bar chart accordingly via color changes and re-sizing
     */
    const handleAnimations = (animArr: any[]): void => {
        toggleButtons(true)

        animArr.forEach((anim, index) => {
            setTimeout(() => {
                const [firstIndex, secondIndex] = anim
                const firstElement: any = document.getElementById(firstIndex.toString())
                const secondElement: any = document.getElementById(secondIndex.toString())

                if (firstIndex !== secondIndex) {
                    firstElement.style.backgroundColor = COLORS.SORTING
                    secondElement.style.backgroundColor = COLORS.SORTING

                    setTimeout(() => {
                        const firstHeight = firstElement.style.height
                        const secondHeight = secondElement.style.height

                        firstElement.style.height = secondHeight
                        secondElement.style.height = firstHeight

                        firstElement.style.backgroundColor = COLORS.PRIMARY
                        secondElement.style.backgroundColor = COLORS.PRIMARY

                        if (index === animArr.length - 1) {
                            toggleButtons(false);
                        }
                    }, 12)
                } else {
                    firstElement.style.backgroundColor = COLORS.SORTED
                    if (index === animArr.length - 1) toggleButtons(false)
                }
            }, index * 15)
        })
    }

    const toggleButtons = (visibility: boolean) => {
        setGenerateArrButtonVisiblity(visibility)
        setButtonVisibility(true)
    }

    useEffect(() => {
        generateNumbers(50)
    }, [])
    
    return (
        <>
            <div>
                <button onClick={() => generateNumbers(50)} disabled={generateArrButtonVisiblity}>
                    Generate New Array
                </button>
                <button onClick={() => {
                    const animArr: any[] = bubbleSort(counts)
                    handleAnimations(animArr)
                }} disabled={buttonVisibility}>
                    Bubble Sort
                </button>
                <button onClick={() => {
                    const animArr: any[] = mergeSort(counts)
                    handleAnimations(animArr)
                }} disabled={buttonVisibility}>
                    Bubble Sort
                </button>
            </div>
            <div className='array-container'>
                {counts.map((num, index) => (
                    <div key={index} id={index.toString()} className='array-bar' style={{
                        backgroundColor: COLORS.PRIMARY,
                        height: `${num}px`,
                    }} />
                ))}
            </div>
        </>
    );
}
