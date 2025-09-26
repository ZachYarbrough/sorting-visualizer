import { useState, useEffect, useRef } from 'react'
import { SORT_TYPE } from '../utils/config'
import { BubbleSort, InsertionSort, SelectionSort, QuickSort, MergeSort } from '../utils/algorithms'

type AnimationState = {
    arr: number[]
    active: [number, number] | null
    completed: number[]
}

const Chart = ({ toggleCRTStyle }: any) => {
    const [chartData, setChartData] = useState<AnimationState>({
	arr: [],
	active: null,
	completed: []
    })
    const [oldChartData, setOldChartData] = useState<number[]>([])
    const [selectedSort, setSelectedSort] = useState<string>(SORT_TYPE.BUBBLE_SORT)
    const [complexityData, setComplexityData] = useState<any>({
	best: 'O(n)',
	worst: 'O(n²)',
	space: 'O(1)'
    })
    const [description, setDescription] = useState<string>('Bubble sort is a simple sorting algorithm that works by repeatedly comparing and swapping adjacent elements if they are out of order. On each pass through the list, the largest remaining element “bubbles up” to its correct position at the end, much like bubbles rising to the surface. This process continues until no more swaps are needed, meaning the list is sorted. Although it is easy to understand and implement, bubble sort is inefficient for large datasets because its average and worst-case time complexity is O(n²), making it practical only for small or nearly sorted lists.')

    const [speed, setSpeed] = useState<number>(250) // delay in ms

    // Refs are used to dynamically update the chart mid visualization
    const cancelRef = useRef(false)
    const sortingRef = useRef<Promise<void> | null>(null)
    const speedRef = useRef(speed)

    useEffect(() => { speedRef.current = speed }, [speed])
    useEffect(() => { generateNewChartData() }, [])

    const resetChart = async () => {
	cancelRef.current = true
	await sortingRef.current	    
	setChartData({ arr: [...oldChartData], active: null, completed: [] })
    }

    const generateNewChartData = async () => {
	cancelRef.current = true
	await sortingRef.current
	const newArr = Array.from({ length: 25 }, () => Math.floor(Math.random() * 20) + 1)
	setChartData({ arr: newArr, active: null, completed: [] })
	setOldChartData(newArr)
    }

    const SelectSortType = (sortType: string) => {
	resetChart()
	setSelectedSort(sortType)

	switch (sortType) {
	    case SORT_TYPE.BUBBLE_SORT: {
		setComplexityData({
		    best: 'O(n)',
		    worst: 'O(n²)',
		    space: 'O(1)'
		})
		setDescription('Bubble sort is a simple sorting algorithm that works by repeatedly comparing and swapping adjacent elements if they are out of order. On each pass through the list, the largest remaining element “bubbles up” to its correct position at the end, much like bubbles rising to the surface. This process continues until no more swaps are needed, meaning the list is sorted. Although it is easy to understand and implement, bubble sort is inefficient for large datasets because its average and worst-case time complexity is O(n²), making it practical only for small or nearly sorted lists.')
		    break
	    }
	    case SORT_TYPE.INSERTION_SORT: {
		setComplexityData({
		    best: 'O(n)',
		    worst: 'O(n²)',
		    space: 'O(1)'
		})
		setDescription('Insertion sort is a simple algorithm that builds a sorted list one element at a time by repeatedly taking the next element and inserting it into its correct position relative to the already sorted portion. It works similarly to how people often sort playing cards in their hands. This makes it efficient for small datasets or nearly sorted data, where it can achieve close to linear time performance. However, for large or randomly ordered lists, its time complexity is O(n²), making it less practical than more advanced algorithms. Still, insertion sort is valued for its simplicity, stability, and usefulness in special cases.')
		break
	    }
	    case SORT_TYPE.SELECTION_SORT: {		
		setComplexityData({
		    best: 'O(n²)',
		    worst: 'O(n²)',
		    space: 'O(1)'
		})
		setDescription('Selection sort is a straightforward sorting algorithm that works by repeatedly finding the smallest (or largest) element in the unsorted portion of the list and swapping it with the first element of that portion. This process continues, shrinking the unsorted section and growing the sorted section until the entire list is ordered. While easy to understand and implement, selection sort performs poorly on large datasets, with a time complexity of O(n²) regardless of input order. It is not stable but requires only constant additional space, making it a simple though inefficient sorting method.')
		break
	    }
	    case SORT_TYPE.QUICK_SORT: {
		setComplexityData({
		    best: 'O(n log n)',
		    worst: 'O(n log n)',
		    space: 'O(log n)'
		})
		setDescription('Quick sort is a fast, divide-and-conquer sorting algorithm that works by selecting a "pivot" element from the list and partitioning the other elements into two groups: those less than the pivot and those greater than the pivot. It then recursively sorts the two groups and combines them with the pivot to form the sorted list. This approach allows quick sort to efficiently narrow down the problem, often leading to very fast performance. Its average time complexity is O(n log n), though in the worst case (poor pivot choices) it can degrade to O(n²). Despite this, quick sort is widely used because it is efficient, works in-place, and usually outperforms simpler algorithms.')
		break
	    }
	    case SORT_TYPE.MERGE_SORT: {
		setComplexityData({
		    best: 'O(n log n)',
		    worst: 'O(n log n)',
		    space: 'O(n)'
		})
		setDescription('Merge sort is a stable, divide-and-conquer sorting algorithm that works by recursively splitting the list into smaller sublists until each sublist contains only one element. It then merges these sublists in a way that results in a sorted list. By combining smaller sorted lists step by step, merge sort efficiently produces a fully sorted array. This approach guarantees consistent performance regardless of the initial order of the elements. Although it requires additional memory for the temporary arrays used during merging, merge sort is widely valued for its predictability and stability, making it suitable for large datasets and applications where maintaining the original order of equal elements is important.')
		break
	    }
	    default:
		break
	}
    }

    const SortChartData = async (sortType: string) => {
	// cancel any ongoing sort
	cancelRef.current = true
	// wait for current sort step to complete
	await sortingRef.current	    
    cancelRef.current = false

    let arr = [...oldChartData]
    let animations: AnimationState[] = []
    let completed: number[] = []

    switch (sortType) {
	case SORT_TYPE.BUBBLE_SORT: {
	    BubbleSort(arr, animations, completed)
	    break
	}
	case SORT_TYPE.INSERTION_SORT: {
	    InsertionSort(arr, animations, completed)
	    break
	}
	case SORT_TYPE.SELECTION_SORT: {
	    SelectionSort(arr, animations, completed)
	    break
	}
	case SORT_TYPE.QUICK_SORT: {
	    QuickSort(arr, animations, completed)
	    break
	}
	case SORT_TYPE.MERGE_SORT: {
	    MergeSort(arr, animations, completed)
	    break
	}
	default:
	    break

    }

    // store the active loop so we can await cancellation later
    sortingRef.current = (async () => {
	for (let k = 0; k < animations.length; k++) {
	    if (cancelRef.current) return 
		await new Promise((res) => setTimeout(res, speedRef.current))
	    setChartData(animations[k])
	}
    })()

    await sortingRef.current // wait for this run to finish
    }

return (
    <div id="chart">
    <div style={{ margin: '0 auto', alignSelf: 'center', width: '100%' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
    <div className="sm-display-none" style={{ width: '100%', display: 'flex'}}>
    <button style={{ border: selectedSort === SORT_TYPE.BUBBLE_SORT ? 'solid 1px white' : '', color: 'white', marginRight: '0.5rem' }} onClick={() => SelectSortType(SORT_TYPE.BUBBLE_SORT)}>Bubble Sort</button>
    <button style={{ border: selectedSort === SORT_TYPE.INSERTION_SORT ? 'solid 1px white' : '', color: 'white', marginRight: '0.5rem' }} onClick={() => SelectSortType(SORT_TYPE.INSERTION_SORT)}>Insertion Sort</button>
    <button style={{ border: selectedSort === SORT_TYPE.SELECTION_SORT ? 'solid 1px white' : '', color: 'white', marginRight: '0.5rem' }} onClick={() => SelectSortType(SORT_TYPE.SELECTION_SORT)}>Selection Sort</button>
    <button style={{ border: selectedSort === SORT_TYPE.QUICK_SORT ? 'solid 1px white' : '', color: 'white', marginRight: '0.5rem' }} onClick={() => SelectSortType(SORT_TYPE.QUICK_SORT)}>Quick Sort</button>
    <button style={{ border: selectedSort === SORT_TYPE.MERGE_SORT ? 'solid 1px white' : '', color: 'white', marginRight: '0.5rem' }} onClick={() => SelectSortType(SORT_TYPE.MERGE_SORT)}>Merge Sort</button>
    </div>
    <button className='sm-display-none' style={{ marginRight: '0.5rem', width: '13rem' }} onClick={() => toggleCRTStyle()}>Toggle CRT Filter</button>
    </div>
    {/* Mobile / smaller screens */}
    <div className="sm-display" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
      <button
	style={{
	  color: 'white',
	  width: '100%'
	}}
	onClick={() => toggleCRTStyle()}
      >
	Toggle CRT Filter
      </button>
      <button
	style={{
	  border: selectedSort === SORT_TYPE.BUBBLE_SORT ? 'solid 1px white' : '',
	  color: 'white',
	  width: '100%'
	}}
	onClick={() => SelectSortType(SORT_TYPE.BUBBLE_SORT)}
      >
	Bubble Sort
      </button>
      <button
	style={{
	  border: selectedSort === SORT_TYPE.INSERTION_SORT ? 'solid 1px white' : '',
	  color: 'white',
	  width: '100%'
	}}
	onClick={() => SelectSortType(SORT_TYPE.INSERTION_SORT)}
      >
	Insertion Sort
      </button>
      <button
	style={{
	  border: selectedSort === SORT_TYPE.SELECTION_SORT ? 'solid 1px white' : '',
	  color: 'white',
	  width: '100%'
	}}
	onClick={() => SelectSortType(SORT_TYPE.SELECTION_SORT)}
      >
	Selection Sort
      </button>
      <button
	style={{
	  border: selectedSort === SORT_TYPE.QUICK_SORT ? 'solid 1px white' : '',
	  color: 'white',
	  width: '100%'
	}}
	onClick={() => SelectSortType(SORT_TYPE.QUICK_SORT)}
      >
	Quick Sort
      </button>
      <button
	style={{
	  border: selectedSort === SORT_TYPE.MERGE_SORT ? 'solid 1px white' : '',
	  color: 'white',
	  width: '100%'
	}}
	onClick={() => SelectSortType(SORT_TYPE.MERGE_SORT)}
      >
	Merge Sort
      </button>
    </div>
    <div className='sm-display-none' style={{ margin: '0.5rem 0 1rem 0', display: 'flex', width: '100%', justifyContent: 'space-between' }}>
    {description != '' && <div style={{ width: '60%', textAlign: 'start', padding: '0.5rem' }}>
	<h1 style={{ margin: '0'}}>{selectedSort.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}</h1>
	<p>{description}</p>
	</div>}
	{complexityData.best != '' && <div style={{ width: '30%', textAlign: 'start', padding: '0.5rem', marginTop: '0.5rem' }}>
	    <h1 style={{ marginTop: '0' }}>Complexity</h1>
	    <div style={{ display: 'flex' }}>
	    <div style={{ margin: '0 0.5rem 0 0', padding: '0 1rem 0 0', borderRight: '3px dashed white' }}>
	    <p>Best Case</p>
	    <p>Worst Case</p>
	    <p>Space Complexity</p>
	    </div>
	    <div style={{ marginLeft: '0.5rem' }}>
	    <p>{complexityData.best}</p>
	    <p>{complexityData.worst}</p>
	    <p>{complexityData.space}</p>
	    </div>
	    </div>
	    </div>}
	    </div>
	    <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', height: '20rem' }}>
	    {chartData.arr.map((col: number, index: number) => {
		let bg = 'white'
		if (chartData.active && chartData.active.includes(index)) {
		    bg = '#60A5FA'
		} else if (chartData.completed.includes(index)) {
		    bg = '#34D399'
		}
		return (
		    <div
		    key={index}
		    style={{
			height: `${col}rem`,
			backgroundColor: bg,
			minWidth: '5px',
			maxWidth: '30px',
			margin: 'auto 0.25rem 0 0.25rem',
			flex: '1 1 0',
			transition: 'height 0.1s ease'
		    }}
		    />
		)
	    })}
	    </div>
	    <div className='sm-display-none' style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
	    <button style={{ color: 'white', marginRight: '0.5rem' }} onClick={generateNewChartData}>Generate New Chart</button>
	    <button style={{ color: 'white' }} onClick={resetChart}>Reset Chart</button>
	    <div style={{ height: '2rem', margin: '0.5rem', borderRight: '3px dashed white'}}></div>
	    <button style={{ color: 'white', marginRight: '0.5rem' }} onClick={() => SortChartData(selectedSort)}>Run Visualization</button>
	    <label>
	    Slow 
	    <input
	    type="range"
	    min="10"
	    max="500"
	    step="10"
	    value={speed}
	    onChange={(e) => setSpeed(Number(e.target.value))}
	    style={{ transform: 'rotateY(180deg)', margin: '0 0.5rem', width: '10rem' }}
	    />
	    Fast	    
	    </label>
	    </div>
	    {/* Mobile / smaller screens */}
	    <div className="sm-display" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', marginTop: '1rem', alignItems: 'center' }}>
	      <button style={{ color: 'white', width: '100%' }} onClick={generateNewChartData}>
		Generate New Chart
	      </button>
	      <button style={{ color: 'white', width: '100%' }} onClick={resetChart}>
		Reset Chart
	      </button>
	      <div style={{ width: '100%', height: '0.5rem', borderTop: '3px dashed white', margin: '0.5rem 0 0 0' }}></div>
	      <button style={{ color: 'white', width: '100%' }} onClick={() => SortChartData(selectedSort)}>
		Run Visualization
	      </button>
	      <label style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '0.5rem', color: 'white' }}>
		Slow
		<input
		  type="range"
		  min="10"
		  max="500"
		  step="10"
		  value={speed}
		  onChange={(e) => setSpeed(Number(e.target.value))}
		  style={{ flex: '1', width: '100%' }}
		/>
		Fast
	      </label>
	    </div>
	    </div>
    <div className='sm-display' style={{ margin: '0.5rem 0 1rem 0', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
    {complexityData.best != '' && <div style={{padding: '0.5rem', marginTop: '0.5rem' }}>
	    <h1 style={{ textAlign: 'start', marginTop: '0' }}>Complexity</h1>
	    <div style={{ display: 'flex' }}>
	    <div style={{ margin: '0 0.5rem 0 0', padding: '0 1rem 0 0', borderRight: '3px dashed white' }}>
	    <p>Best Case</p>
	    <p>Worst Case</p>
	    <p>Space Complexity</p>
	    </div>
	    <div style={{ marginLeft: '0.5rem' }}>
	    <p>{complexityData.best}</p>
	    <p>{complexityData.worst}</p>
	    <p>{complexityData.space}</p>
	    </div>
	    </div>
	    </div>}

    {description != '' && <div style={{ textAlign: 'center', padding: '0.5rem' }}>
	<h1 style={{ margin: '0'}}>{selectedSort.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}</h1>
	<p>{description}</p>
	</div>}
	</div>

	    </div>
)
}

export default Chart

