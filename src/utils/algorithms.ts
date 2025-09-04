type AnimationState = {
    arr: number[]
    active: [number, number?] | null
    completed: number[]
}

export const BubbleSort = (
    arr: number[], 
    animations: AnimationState[], 
    completed: number[]
) => {
    for (let i = 0; i < arr.length; i++) {
	for (let j = 0; j < arr.length - i - 1; j++) {
	    animations.push({ arr: [...arr], active: [j, j + 1], completed: [...completed] })

	    if (arr[j] > arr[j + 1]) {
		[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
		animations.push({ arr: [...arr], active: [j, j + 1], completed: [...completed] })
	    }
	}
	completed.unshift(arr.length - 1 - i)
	animations.push({ arr: [...arr], active: null, completed: [...completed] })
    }
}


export const InsertionSort = (
    arr: number[],
    animations: AnimationState[],
    completed: number[]
) => {
    for (let i = 1; i < arr.length; i++) {
	const key = arr[i]
	let j = i - 1

	// highlight the key
	if (i === 1) {
	    animations.push({ arr: [...arr], active: [i, i - 1], completed: [...completed] })
	} else {
	    animations.push({ arr: [...arr], active: [i], completed: [...completed] })
	}
	// shift elements to the right
	while (j >= 0 && arr[j] > key) {
	    arr[j + 1] = arr[j]
	    arr[j] = key
	    animations.push({ arr: [...arr], active: [j], completed: [...completed] })
	    j--
	}

	    // mark all elements up to i as completed
	    completed = Array.from({ length: i + 2 }, (_, idx) => idx)
    }
    animations.push({ arr: [...arr], active: null, completed: [...completed] })
}

export const SelectionSort = (
    arr: number[],
    animations: AnimationState[],
    completed: number[]
) => {
    let curIndex;
    for (let i = 0; i < arr.length; i++) {
	curIndex = 0;
	for (let j = 0; j < arr.length - i; j++) {
	    animations.push({ arr: [...arr], active: [j, curIndex], completed: [...completed] })

	    if (arr[j] > arr[curIndex]) {
		curIndex = j 
		animations.push({ arr: [...arr], active: [j, curIndex], completed: [...completed] })
	    }
	}

	// swap the current index with the last non completed col and set it to completed
	[arr[arr.length - 1 - i], arr[curIndex]] = [arr[curIndex], arr[arr.length - i - 1]]
	completed.unshift(arr.length - 1 - i)
	animations.push({ arr: [...arr], active: null, completed: [...completed] })
    }
}

export const QuickSort = (
    arr: number[], 
    animations: AnimationState[], 
    completed: number[]
) => {

    function quickSortHelper(low: number, high: number) {
        if (low < high) {
            const pivotPos = partition(low, high)

            // mark pivot as done
            completed.push(pivotPos)
            animations.push({ arr: [...arr], active: null, completed: [...completed] })

            // sort left and right partitions
            quickSortHelper(low, pivotPos - 1)
            quickSortHelper(pivotPos + 1, high)
        } else if (low === high) {
            // one element, trivially sorted
            if (!completed.includes(low)) {
                completed.push(low)
                animations.push({ arr: [...arr], active: null, completed: [...completed] })
            }
        }
    }

    function partition(low: number, high: number): number {
        const pivot = arr[high]
        let i = low - 1

        for (let j = low; j < high; j++) {
            // highlight comparison
            animations.push({ arr: [...arr], active: [j, high], completed: [...completed] })

            if (arr[j] <= pivot) {
                i++
                ;[arr[i], arr[j]] = [arr[j], arr[i]] // semicolon is necessary here
                animations.push({ arr: [...arr], active: [i, j], completed: [...completed] })
            }
        }

        // put pivot in correct spot
        ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
        animations.push({ arr: [...arr], active: [i + 1, high], completed: [...completed] })

        return i + 1
    }

    quickSortHelper(0, arr.length - 1)

    // mark anything missed
    for (let k = 0; k < arr.length; k++) {
        if (!completed.includes(k)) completed.push(k)
    }
    animations.push({ arr: [...arr], active: null, completed: [...completed] })
}


export const MergeSort = (
  arr: number[],
  animations: AnimationState[],
  completed: number[]
) => {
  function mergeSortHelper(start: number, end: number) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(start, mid);
    mergeSortHelper(mid + 1, end);
    merge(start, mid, end);
  }

  function merge(start: number, mid: number, end: number) {
    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      animations.push({ arr: [...arr], active: [k], completed: [...completed] });

      if (left[i] <= right[j]) {
        arr[k] = left[i++];
      } else {
        arr[k] = right[j++];
      }

      animations.push({ arr: [...arr], active: [k], completed: [...completed] });
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i++];
      animations.push({ arr: [...arr], active: [k], completed: [...completed] });
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j++];
      animations.push({ arr: [...arr], active: [k], completed: [...completed] });
      k++;
    }
  }

  mergeSortHelper(0, arr.length - 1);

  // Mark all elements as completed **after full sort**
  for (let k = 0; k < arr.length; k++) {
    completed.push(k);
  }
  animations.push({ arr: [...arr], active: null, completed: [...completed] });
};

