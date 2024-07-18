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

    /**
     * 
     * @param {number} count number of bars in the chart
     * @returns {number[]} array of random numbers from 5 to 100
     */
    const generateNumbers = (count: number): any[] => {
        const array: any[] = []

        for (let i = 0; i < count; i++) {
            array.push(Math.floor(Math.random() * 100) + 5)
        }

        setCounts(array)
        return array
    }

    /**
     * 
     * @param {number[]} array unsorted array of numbers
     * @returns {number[]} sorted array of numbers
     * 
     * TO DO - fill out Description, time complexity, and space complexity
     * 
     * Time Complexity - O(nlogn)
     * Space Complexity - O(n)
     */
    const bubbleSort = (arr: number[]): void => {
        const animArr: any[] = []

        for(let i = 0; i < arr.length - 1; i++) {
            for(let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    animArr.push([j, j + 1])
                    // Swap elements
                    let temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
            animArr.push([arr.length - i - 1, arr.length - i - 1])
            if (arr.length - 2 === i) animArr.push([0, 0])
        }

        handleAnimations(animArr)
    }

    const handleAnimations = (animArr: any[]): void => {
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
                    }, 8)
                } else {
                    firstElement.style.backgroundColor = COLORS.SORTED
                }
            }, index * 10)
        })
    }

    useEffect(() => {
        generateNumbers(100)
    }, [])

    return (
        <>
            <div>
                <button onClick={() => {
                    bubbleSort(counts)
                }}>
                    Bubble Sort
                </button>
            </div>
            <div className='array-container'>
                {counts.map((num: any, index: any) => (
                    <div key={num} id={index} className='array-bar' style={{
                        backgroundColor: COLORS.PRIMARY,
                        height: `${num}px`,
                    }} />
                ))}
            </div>
        </>
    )
}
