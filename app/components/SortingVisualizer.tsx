"use client"
import { useEffect, useState } from "react"
import './SortingVisualizer.css'


const COLORS = {
    PRIMARY: 'white',
    SORTING: 'green',
    SORTED: 'blue'
}


export default function SortingVisualizer() {
    const [counts, setCounts] = useState<number[]>([])

    /**
     * 
     * @param {number} count number of bars in the chart
     * @returns {number[]} array of random numbers from 5 to 100
     */
    const generateNumbers = (count: number): number[] => {
        const array: number[] = []

        for(let i = 0; i < count; i++) {
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
     * The merge sort algorithm follows the divide and conquer approach.
     * It works by recursively dividing the input array into smaller sub arrays and sorting, then merging them back together.
     * 
     * Time Complexity - O(nlogn)
     * Space Complexity - O(n)
     */
    const mergeSort = (array: number[]): number[] => {
        if (array.length <= 1) return array
        const mid = Math.floor(array.length / 2)
        const end = array.length
        return merge(mergeSort(array.splice(0, mid)), mergeSort(array.splice(mid, end)))
    }

    /**
     * 
     * @param {number[]} leftArr unsorted array of numbers (0, mid) of original array
     * @param {number[]} rightArr unsorted array of numbers (mid, end) of original array
     * @returns  {number[]} sorted array of numbers
     * 
     * Helper function for merge sort that sorts the split arrays together
     */
    const merge = (leftArr: number[], rightArr: number[]) => {
        const sortedArr: number[] = []
        while(leftArr.length && rightArr.length) {
            if (leftArr[0] <= rightArr[0]) {
                // The bang (!) is a non-null asserter to prevent typescript errors
                sortedArr.push(leftArr.shift()!)
            } else {
                sortedArr.push(rightArr.shift()!)
            }
        }

        return [...sortedArr, ...leftArr, ...rightArr]
    }


    useEffect(() => {
        generateNumbers(100)
    }, [])

    return (
      <>
      <div>
        <button onClick={() => mergeSort(counts)}>Merge Sort</button>
      </div>
        <div className='chart'>
        {counts.map((num) => (
            <div key={num} className='bar' style={{
                backgroundColor: COLORS.PRIMARY,
                height: `${num}px`,
              }} />
        ))}
      </div>
      </>
    )
  }
  