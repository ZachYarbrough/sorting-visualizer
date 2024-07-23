
/**
 * 
 * @param {number[]} array unsorted array of numbers
 * @returns {any[]} array of animations for visualizing the sort method
 * 
 * Merge sort
 * 
 * Time Complexity - O(nlogn)
 * Space Complexity - O(n)
 */
export const mergeSort = (arr: number[]): any[] => {
    const midIndex = Math.floor(arr.length / 2)

    const leftArr: number[] = arr.slice(0, midIndex)
    const rightArr: number[] = arr.slice(midIndex, arr.length - 1)

    return merge(mergeSort(leftArr), mergeSort(rightArr))
}

const merge = (leftArr: number[], rightArr: number[]) => {
    const sortedArr: number[] = []

    while(leftArr.length > 0 && rightArr.length > 0) {
        if(leftArr[0] > rightArr[0]) {
            sortedArr.push(leftArr.shift()!)
        } else {
            sortedArr.push(rightArr.shift()!)
        }
    }

    return [...sortedArr, ...leftArr, ...rightArr]
}