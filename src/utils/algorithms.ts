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
	[arr[arr.length - 1 - i], arr[curIndex]] = [arr[curIndex], arr[arr.length - i - 1]]
	completed.unshift(arr.length - 1 - i)
	animations.push({ arr: [...arr], active: null, completed: [...completed] })
    }
}

