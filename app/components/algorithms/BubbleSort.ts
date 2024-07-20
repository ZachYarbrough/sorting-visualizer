    /**
     * 
     * @param {number[]} array unsorted array of numbers
     * @returns {any[]} array of animations for visualizing the sort method
     * 
     * Bubble Sort is the simplist sorting algorithm that works by repeatedly swapping the elements if they are in the wrong order.
     * 
     * Time Complexity - O(n^2)
     * Space Complexity - O(1)
     */
    export const bubbleSort = (arr: number[]): any[] => {        
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

        return animArr
    }