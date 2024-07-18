"use client"
import { useEffect, useState } from "react"
import './SortingVisualizer.css'

const COLORS = {
    PRIMARY: 'white',
    SORTING: '#f39c12',
    SORTED: '#3498db'
}

export default function SortingVisualizer() {
    const [counts, setCounts] = useState<number[]>([])
    const [buttonVisibility, setButtonVisibility] = useState<boolean>(false)
    const [generateArrButtonVisiblity, setGenerateArrButtonVisiblity] = useState<boolean>(false)

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
     * @param {number[]} array unsorted array of numbers
     * @returns {number[]} sorted array of numbers
     * 
     * Bubble Sort is the simplist sorting algorithm that works by repeatedly swapping the elements if they are in the wrong order.
     * 
     * Time Complexity - O(n^2)
     * Space Complexity - O(1)
     */
    const bubbleSort = (arr: number[]): void => {        
        const animArr: any[] = []
        const unsortedArr = [...arr]

        for(let i = 0; i < unsortedArr.length - 1; i++) {
            for(let j = 0; j < unsortedArr.length - i - 1; j++) {
                if (unsortedArr[j] > unsortedArr[j + 1]) {
                    animArr.push([j, j + 1])
                    // Swap elements
                    let temp = unsortedArr[j]
                    unsortedArr[j] = unsortedArr[j + 1]
                    unsortedArr[j + 1] = temp
                }
            }
            animArr.push([unsortedArr.length - i - 1, unsortedArr.length - i - 1])
            if (unsortedArr.length - 2 === i) animArr.push([0, 0])
        }

        handleAnimations(animArr)
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
                    }, 18)
                } else {
                    firstElement.style.backgroundColor = COLORS.SORTED
                    if (index === animArr.length - 1) toggleButtons(false)
                }
            }, index * 20)
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
                <button onClick={() => bubbleSort(counts)} disabled={buttonVisibility}>
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
