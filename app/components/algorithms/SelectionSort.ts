
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
export const selectionSort = (arr: number[]): any[] => {
    const animArr: any = []
    const unsortedArr = [...arr]

    let currentIndex = 0
    let startingIndex = 0

    for(let i = 0; i < unsortedArr.length; i++) {
        currentIndex = i
        for(let j = i; j < unsortedArr.length; j++) {
            animArr.push([j, currentIndex])
            if (unsortedArr[j] < unsortedArr[currentIndex]) {
                currentIndex = j
            }
        }
        animArr.push([currentIndex, startingIndex, true])

        animArr.push([currentIndex, currentIndex])

        const temp = unsortedArr[startingIndex]
        unsortedArr[startingIndex] = unsortedArr[currentIndex]
        unsortedArr[currentIndex] = temp
        startingIndex++
    }

    return animArr
}
