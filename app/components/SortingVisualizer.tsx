"use client"
import { useEffect, useState } from "react"
import './SortingVisualizer.css'

const COLORS = {
    PRIMARY: 'white',
    SORTING: 'green',
    SORTED: '#32CD32'
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

        for(let i = 0; i < count; i++) {
            array.push([Math.floor(Math.random() * 100) + 5, i])
        }
        setCounts(array)
        return array
    }

    /**
     * 
     * @param {number[]} array unsorted array of numbers
     * @returns {number[]} sorted array of numbers
     * 
     * The merge sort algorithm follows the divide and conquer approach.
     * It works by recursively dividing the input array into smaller sub arrays and sorting, then merging them back together.
     * 
     * Time Complexity - O(nlogn)
     * Space Complexity - O(n)
     */
    const mergeSort = (array: any[]): any[] => {
        if (array.length <= 1) return array
        const mid = Math.floor(array.length / 2)
        const end = array.length

        const leftArr = array.slice(0, mid)
        const rightArr = array.slice(mid, end)

        return merge(mergeSort(leftArr), mergeSort(rightArr))
    }

    /**
     * 
     * @param {number[]} leftArr unsorted array of numbers (0, mid) of original array
     * @param {number[]} rightArr unsorted array of numbers (mid, end) of original array
     * @returns  {number[]} sorted array of numbers
     * 
     * Helper function for merge sort that sorts the split arrays together
     */
    const merge = (leftArr: any[], rightArr: any[]) => {
        const sortedArr: any[] = []
        while(leftArr.length && rightArr.length) {
            if (leftArr[0][0] <= rightArr[0][0]) {
                // The bang (!) is a non-null asserter to prevent typescript errors
                sortedArr.push(leftArr.shift()!)
            } else {
                sortedArr.push(rightArr.shift()!)
            }
        }

        return [...sortedArr, ...leftArr, ...rightArr]
    }

    const bubbleSort = (arr: any[]) => {
        const animArr: any[] = []

        for(let i = 1; i < arr.length; i++) {
            for (let j = 1; j < arr.length; j++) {
                animArr.push([arr[j - 1], arr[j], false])
                if (arr[j - 1][0] > arr[j][0]) {

                    animArr.push([arr[j - 1], arr[j], true])
                    
                    let temp: number = arr[j - 1]
    
                    arr[j - 1] = arr[j]
                    arr[j] = temp
                }
            }
        }

        handleAnimations(animArr)
        return arr
    }

    const handleAnimations = (animArr: any[]) => {
        animArr.forEach((anim, i) => {
            const firstIndex: number = anim[0][1]
            const secondIndex: number = anim[1][1]

            const firstElement: any = document.getElementById(firstIndex.toString())
            const secondElement: any = document.getElementById(secondIndex.toString())

                setTimeout(() => {
                    firstElement.style.backgroundColor = COLORS.SORTING
                    secondElement.style.backgroundColor = COLORS.SORTING
                    setTimeout(() => {
                        firstElement.style.backgroundColor = COLORS.PRIMARY
                        secondElement.style.backgroundColor = COLORS.PRIMARY

                        // TO DO - Fix this issue
                        if (anim[2]) {
                            firstElement.style.height = `${anim[1][1]}px`
                        }
                    }, 8)
                }, i * 10)
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
            }}>Bubble Sort</button>
      </div>
        <div className='chart'>
        {counts.map((num: any) => (
            <div key={num[1]} id={num[1].toString()} className='bar' style={{
                backgroundColor: COLORS.PRIMARY,
                height: `${num[0]}px`,
              }} />
        ))}
      </div>
      </>
    )
  }
  