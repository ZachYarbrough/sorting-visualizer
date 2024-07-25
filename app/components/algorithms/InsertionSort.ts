
/**
 * 
 * @param {number[]} arr - Unsorted array of numbers
 * @returns {Array<[number, number, boolean?]>} - Array of animations for visualizing the sort method
 * 
 * Insertion Sort
 * 
 * Time Complexity - O(n^2)
 * Space Complexity - O(1)
 */
export const insertionSort = (arr: number[]): any[] => {
    const animArr: any = []
    const unsortedArr = [...arr]

    for (let i = 1; i < unsortedArr.length; i++) {
        let currentValue = unsortedArr[i]
        let j = i - 1
        animArr.push([i, j])

        while(j >= 0 && unsortedArr[j] >= currentValue) {
            animArr.push([j + 1, j, true])
            unsortedArr[j + 1] = unsortedArr[j];
            j--;
        }

        animArr.push([j + 1, j + 1])
        unsortedArr[j + 1] = currentValue;

        if (i === unsortedArr.length - 1) {
            animArr.push([i, i])
        }
    }

    return animArr
}