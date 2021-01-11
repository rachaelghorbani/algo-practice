// Algo practice methods

// 1. Frequency Counter Pattern
// this can be used to determine whether two arrays/strings have the same number and amount of characters.

// 1. Determine if two strings are anagrams of each other, i.e. do they contain the same amount and same number of letters?
// ex. validAnagram("dog", "god") => true
//      validAnagram("dogg", "gode") => false

function validAnagram(str1, str2) {
	if (str1.length !== str2.length) {
		return false;
	}

	const returnObjectOfLetterCount = (str, obj) => {
		for (let letter of str) {
			if (obj[letter]) {
				obj[letter]++;
			} else {
				obj[letter] = 1;
			}
		}
		return obj;
	};
	const strObj1 = returnObjectOfLetterCount(str1, {});
	const strObj2 = returnObjectOfLetterCount(str2, {});

	for (let key in strObj1) {
		if (!strObj2[key]) {
			return false;
		}
		if (strObj1[key] !== strObj2[key]) {
			return false;
		}
	}
	return true;
}

// 2. Determine if every value in the first array is squared in the second array
// ex. sameSquared([1, 2, 2, 4], [1, 4, 4, 16 ]) => true
//     sameSquared([1, 2, 3, 4], [1, 4, 6, 16]) => false

const sameSquared = (arr1, arr2) => {
	if (arr1.length !== arr2.length) {
		return false;
	}

	const returnObjectOfNumberCount = (arr, obj) => {
		for (let num in arr) {
			if (obj[num]) {
				obj[num]++;
			} else {
				obj[num] = 1;
			}
		}
	};
	const arrObj1 = returnObjectOfNumberCount(arr1, {});
	const arrObj2 = returnObjectOfNumberCount(arr2, {});

	for (let key in arrObj1) {
		//if arrObj2 doesn't have the squared key of arrObj1, return false
		if (!(key ** 2 in arrObj2)) {
			return false;
		}
		//if the value of the two corresponding keys don't match, return false i.e. arrObj1[4] = 1 and arrObj2[16] = 3
		if (arrObj2[key ** 2] !== arrObj1[key]) {
			return false;
		}
	}
	return true;
};

// 2. Multiple Pointer Patterns
// This is often used to search for some set of values, usually in pairs. Only works on ordered data. Basically either goes in from the two ends of the array to the middle, or from one end to the other comparing values as it goes

//  1. find the two values in an array that add up to a certain number and return them in an array
// ex. sumZero([-4, -3, -2, 4, 5, 7]) => [-4, 4]

const sumZero = (arr) => {
	let left = 0;
	let right = arr.length - 1;

	while (left < right) {
		let sum = arr[left] + arr[right];
		if (sum === 0) {
			return [ arr[left], arr[right] ];
		} else if (sum > 0) {
			right--;
		} else {
			left++;
		}
	}
};

// 2. find the number of unique elements in an array
// ex. uniqueVals([1,1,1,1,1,2]) => 2
//     uniqueVals([1,2,3,4,4,4,7,7,12,12,13]) => 7
// pretty sure you could also just iterate through the array and put them in a set. since set's only hold unique values, it will disregard duplicates. can get set.size() at the end and this should be the # of unique chars

const uniqueVals = (arr) => {
	if (arr.length === 0) {
		return 0;
	}
	let totalUniq = 1;
	let farRight = arr.length - 1;
	let right = arr.length - 2;

	while (right >= 0) {
		if (arr[farRight] !== arr[right]) {
			totalUniq++;
			farRight--;
			right--;
		} else {
			farRight--;
			right--;
		}
	}
	return totalUniq;
};
// 3. check to see whether the characters in the first string form a subsequence of characters in the seconds string. The function should check whetehr the characters in the first string appear somewhere in the second string IN ORDER ex. abc, abracadabra => true

const isSubsequence = (substr, mainstr) => {
	if (mainstr.length < substr.length) {
		return false;
	}
	let i = 0;
	let j = 0;

	while (i < mainstr.length) {
		if (substr[j] === mainstr[i]) {
			i++;
			j++;
		}
		if (substr[j] !== mainstr[i]) {
			i++;
		}
		if (j === substr.length) {
			return true;
		}
	}
	return false;
};

// 3. Sliding Window Pattern
// this is often used when you have some data, usually an array or string and we want some set of subdata that we're looking for that is continuous. For example, find the set of 3 numbers that add up to the largest value from a certain array of numbers
// 1. find the maximum sum from a subarray of n length
// ex. maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3) => 17, [6, 9, 2]

const maxSubarraySum = (arr, num) => {
	if (num > arr.length) {
		return null;
	}

	let maxSum = 0;
	let tempSum = 0;

	//set maxSum to first num number of values
	for (let i = 0; i < num; i++) {
		maxSum += arr[i];
	}

	//now want to iterate through the whole thing starting from num and subtract/add on every iteration to crawl the "window" up
	for (let i = num; i < arr.length; i++) {
		tempSum = tempSum - arr[i - num] + arr[i];
		if (tempSum > maxSum) {
			maxSum = tempSum;
		}
	}
	return maxSum;
};
// 4. Binary search using two pointers and a middle number to return index
    const binarySearch = (arr, num) => {
        let startIndex = 0;
        let endIndex = arr.length - 1;
        let middleIndex = Math.floor((startIndex + endIndex) / 2);

        while (arr[middleIndex] !== num && startIndex <= endIndex) {
            if (num < arr[middleIndex]) {
                endIndex = middleIndex - 1;
            } else {
                startIndex = middleIndex + 1;
            }
            middleIndex = Math.floor((startIndex + endIndex) / 2);
        }
        if (arr[middleIndex] === num) {
            return middleIndex;
        } else {
            return -1;
        }
    };
    // 5. I think this would return the actual number or true via binary search
    const recursive = (arr, num) => {
        let middleIndex = Math.floor(arr.length / 2)
        let left = arr.slice(0, middleIndex)
        let right = arr.slice(middleIndex + 1)
    
        if (num === arr[middleIndex]) {
          return num
        } else if (num < arr[middleIndex]) {
          return recursive(left, num)
        } else if (num > arr[middleIndex]) {
          return recursive(right, num)
        }
      
      let foundNum = recursive(arr, num)
      if (foundNum) {
        return true
      } else {
        return -1
      }
    }



///////////////////////////////////////////////////////////////////////////////////


    // const sumThing = (array, target) => {
//   if(array.length < 2 ){
//     return false
//   }
//   const arrMap = new Map()

//   for(i = 0; i < array.length; i++){
//     arrMap.set(array[i], i)
//   }


//  arrMap.forEach((value, key) => {
//     if(key < target){
//       let diff = target - key
//       if(arrMap.has(diff)){
//         // console.log([arrMap.get(key), arrMap.get(diff)])
//         return [arrMap.get(key), arrMap.get(diff)]
//       }


//     }
//   })



//   //go through and create an object for the array with the index as the key and value as the value. then loop through the object and check to see if a value exists for target - current value in object

// }

// sumThing([2,7,11,15], 9)

// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16

// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16
//want to call the product and then slie the array one and pass it back in and multiply it to the sum thing
const binarySearch = (arr, num) => {


    // let middleIndex = Math.floor(arr.length/2)
    // console.log(middleIndex)
  
    // let left = arr.slice(0, middleIndex)
    // console.log(left)
    // // console.log(left)
    // let right = arr.slice(middleIndex + 1)
    // console.log(right)
    // console.log(right)
    const recursive = (arr, num) => {
      let middleIndex = Math.floor(arr.length / 2)
      let left = arr.slice(0, middleIndex)
      let right = arr.slice(middleIndex + 1)
  
      if (num === arr[middleIndex]) {
        return num
      } else if (num < arr[middleIndex]) {
        return recursive(left, num)
      } else if (num > arr[middleIndex]) {
        return recursive(right, num)
      }
    }
    let foundNum = recursive(arr, num)
    if (foundNum) {
      return foundNum
    } else {
      return -1
    }// if(recursive() !== -1){
    //   return arr.indexOf(recursive())
    // }
  
  
    //all the stuff from arr[middle + 1] - arr.length - 1
    //get middle element
    //if element is equal to middle element, return middle element, otherwise
    //chec if num is greater than or less than and reset the arr to that
    //recursive
  
  
  }
  const binary2 = (arr, num) => {
  
    let startIndex = 0
    let endIndex = arr.length - 1
    let middleIndex = Math.floor((startIndex + endIndex) / 2)
    while (arr[middleIndex] !== num && startIndex <= endIndex) {
  
      // console.log("mid", middleIndex, "Start", startIndex, "end", endIndex)
      if (num < arr[middleIndex]) {
        endIndex = middleIndex - 1
      } else {
        startIndex = middleIndex + 1
      }
          middleIndex = Math.floor((startIndex + endIndex) / 2)
  
  
      }
      // console.log(middleIndex)
      if(arr[middleIndex] === num){
        return middleIndex
      } else {
        return -1
      }
  }
  binarySearch([1, 4, 5, 6, 7, 9, 20, 23, 34, 45, 67], -9)
  
  const stringCompare = (str1, str2) => {
  
    let counter = 0 
    let arrToCheck = []
    
    for(let i = 0; i < str2.length; i++){
      arrToCheck[i] = str1[i]
    }
  
   for(let i = str2.length; i < str1.length; i++){      if(arrToCheck.join("") === str2){
        counter++
        console.log("match", arrToCheck)
        arrToCheck = [...arrToCheck.slice(1).concat(str1[i])] 
        console.log("after match", arrToCheck)
     } else {
        arrToCheck = [...arrToCheck.slice(1).concat(str1[i])]
        console.log("no match", arrToCheck) 
        }
      }
   return counter
  }
  
  // stringCompare("hellohelo", "hello")
  const stringComp2 = (str1, str2) => {
    let counter = 0
  
    for(let i = 0; i < str1.length; i++){
      for(let j = 0; j < str2.length; j++){
        if(str2[j] !== str1[i + j]){
          break
        } 
        if(j === str2.length - 1){
          counter++
        }
        
      }
  
    }
    return counter
  }
  const bubbleSort = arr => {
    // const swap = (arr, index1, index2) => {
    //   let temp = arr[index1]
    //   arr[index1] = arr[index2]
    //   arr[index2] = temp
    // }
    let noSwaps
    for(let i = arr.length; i >0; i--){
      console.log("i",i)
      noSwaps = true
      for(j=0; j < i; j++){
        console.log("j",j)
        if(arr[j]> arr[j+1] ){
          noSwaps = false
          let smaller = arr[j+1]
          let larger = arr[j]
          arr[j] = smaller
          arr[j+1] = larger
        }
      }
      if(noSwaps){
        break
      }
    }
  return arr
  }
  // bubbleSort([1, 2, 3, 3, 4,8, 5])
  
  const selectionSort = (arr) => {
    //finds the smallest number on each pass as sets it to the beginning of the unsorted array
    // let min = arr[0]
    let noSwaps;
  
    for(let i = 0; i <arr.length; i++){
      let noSwaps = true
      let min = i
      // let min = arr[i] //min = i
  
      for(let j = i + 1; j < arr.length; j++){
        if(arr[j]< arr[min]){
          min = j
          // min = arr[j] //min = j
          // arr[j] = arr[i]
          // arr[i] = min
          console.log("swapping")
          noSwaps = false
        }
      if(noSwaps){
        break
      }
      }
      if(i !== min){
   let temp = arr[i]
      arr[i] = arr[min]
      arr[min] = temp
      }
     
    }
    // console.log(arr)
  }
  // selectionSort([1 ,2, 28, 3, 24, 22, 3, 4,8, 5])
  
  const insertionSort = (arr) => {
      var currentVal;
      for(var i = 1; i < arr.length; i++){
          currentVal = arr[i];
          for(var j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
              arr[j+1] = arr[j]
          }
          arr[j+1] = currentVal;
      }
      return arr;
  }
  // insertionSort([5 ,10, 2, 33, 24, 22, 3, 4,8, 5])
  
  
  // binarySearch([1, 4, 5, 6, 7, 9, 20, 23, 34, 45, 67], 20)
  // linearSearch([3,1,7,11,2,9,8,21,62,33,19], 52)
  // stringComp2("hellolo", "hel")
  
  
  const merge = (arr1, arr2) => {
      let results = [];
      let i = 0;
      let j = 0;
      while(i < arr1.length && j < arr2.length){
          if(arr2[j] > arr1[i]){
              results.push(arr1[i]);
              i++;
          } else {
              results.push(arr2[j])
              j++;
          }
      }
      while(i < arr1.length) {
          results.push(arr1[i])
          i++;
      }
      while(j < arr2.length) {
          results.push(arr2[j])
          j++;
      }
      return results;
  }
  
  // merge([1, 10, 50, 205], [101,102, 114, 149, 201])
  
  
  const mergeSort = (arr) => {
     if(arr.length <=1){
      return arr
    } 
  
    let middle = Math.floor(arr.length/2)
    let left = mergeSort(arr.slice(0, middle))
    let right = mergeSort(arr.slice(middle))
    return merge(left, right)
    // console.log(left)
    // console.log("left", left.length,"right", right)
   
  
    // if(arr.length > 1 || arr.length > 1){
    //   console.log("left", left, left.length, "right", right, right.length)
    // // while(left.length > 1 || right.length >1){
    // // if(left.length <= 1 && right.length <= 1){
    // // } else{
    //   // console.log(mergeSort(right))
    //   mergeSort(left)
    //   mergeSort(right)
    // }
    // } else{
    //   let i = 0
    //   while(i < arr.length){
    //   merge(left, right)
    //   i++
    //   }
    // }
  // return arr
  
    //need to check if left.length and right .length are = 1
  }
  
  // mergeSort([10, 12, 88, 4])
  // [10, 2, 4][9, 3, 5]
  // [10][2,4]  [9][3,5]
  
  const pivot = (arr, start = 0, end = arr.length - 1) => {
    //pick an element from the array as a pivot
    //need a counter to count how many elements are smaller than the pivot
    //if an element is smaller than pivot, they go to the left of the pivot. will need to swap the pivot with the element at the counter index
        let counter = 0
        let pivot = arr[start]
  
    for(let i = start + 1; i < end; i++){
      // console.log(arr, "counter", counter)
      if(arr[i] < pivot){
        counter ++
        let temp = arr[counter]
        arr[counter] = arr[i]
        arr[i] = temp
      }
    }
    let temp = arr[counter]
    // console.log(pivot)
    arr[counter] = pivot
    arr[start] = temp
    // console.log(counter)
    return counter
  }
  
  // pivot([10, 44, 7, 16, 22, 10, 4, 12, 3, 18])
  
   const getDigit = (num, index) => {
     const numString = num.toString().reverse()
    //  console.log(numString)
     if(index < 0 || index > numString.length){
       return -1
     }
      return parseInt(numString[index])
   }
  //  getDigit(34521, 0)
  
  const romanToInt = string => {
      //need to iterate through the string
      //have two pointers, i = arr.length, j = arr.length - 1. if arr.length is X, V, L, ,C, D, M check if the character in front is one of the special characters that uses subtractions
      let sum = 0
      let i = string.length - 1
      let j = string.length - 2
      while(i >= 0){
  
        if(string[i] === "V" && string[j] === "I"){
          sum += 4;
          i-= 2;
          j-= 2
        } else if (string[i] === "X" && string[j] === "I"){
          sum += 9
          i-= 2;
          j-= 2
        } else if (string[i] === "L" && string[j] === "X"){
          sum += 40
          i -= 2
          j -=2
        } else if (string[i] === "C" && string[j] === "X"){
          sum += 90
          i -= 2
          j -=2
        } else if (string[i] === "D" && string[j] === "C"){
          sum += 400
          i -= 2
          j -=2
  
        } else if (string[i] === "M" && string[j] === "C"){
          sum += 900
          i -= 2
          j -=2
          
        } else if(string[i] === "I"){
          sum++
          i--;
          j--
        } else if(string[i] === "V"){
          sum+=5
          i--;
          j--
        }else if(string[i] === "X"){
          sum+=10
          i--;
          j--
        }else if(string[i] === "L"){
          sum+=50
          i--;
          j--
        }else if(string[i] === "C"){
          sum+=100
          i--;
          j--
        }else if(string[i] === "D"){
          sum+=500
          i--;
          j--
        }else if(string[i] === "M"){
          sum+=1000
          i--;
          j--
        }
      
      }
      return sum
  };
  
  // romanToInt("DCXIII")
  
  class Node{
    constructor(val){
      this.val = val;
      this.next = null
    }
  }
  
  let firstNode = new Node("hi")
  
  class SinglyLinkedList{
    constructor(){
      this.head = null;
      this.tail = null;
      this.length = 0
    }
  
    push(val){
      let newNode = new Node(val)
      if(!this.head){
        this.head = newNode;
        this.tail = newNode;
        
      } else {
        this.tail.next = newNode;
        this.tail = newNode
      }
      this.length++
      return newNode
    }
  
    pop(){
      if(!this.head){
        return undefined
      }
      if(this.length === 1){
        let oldNode = this.head
        this.head = null
        this.tail = null
        this.length = 0
        return oldNode
      }
  
      let current = this.head
      while(current.next){
        if(!current.next.next){
          let oldTail = current.next
          this.tail = current
          current.next = null
          this.length--
          return oldTail.val
        } else {
        current = current.next
        }
      }
    }
  
    shift(){
      if(!this.head){
        return undefined
      }
      if(this.length === 1){
        let oldNode = this.head
        this.head = null;
        this.tail = null;
        this.length = 0
        return oldNode
      }
      let current = this.head
      this.head = current.next
      current.next = null
      this.length--
      return current
    }
    get(index){
      if(index < 0 || index >= this.length ){
        return undefined
      }
      let i = 0
      let current = this.head
      while(i !== index){
        current = current.next
        i++
      }
      return current
    }
  
    set(index, value){
      let foundNode = this.get(index)
      if(foundNode){
        foundNode.val = value
        return true
      } else{
      return false
      }
    }
  
    insert(index, value){
      if(index < 0 || index > this.length) return false
    
    if(index === this.length){
      this.push(val)
    }
    if(index === 0){
      // this.unshift(val)
    }
        let newNode = new Node(value)
  
    let nodeToInsertAfter = this.get(index - 1)
    let nodeToInsertBefore = nodeToInsertAfter.next
    nodeToInsertAfter.next = newNode
    newNode.next = nodeToInsertBefore
    this.length++
    return true
    }
  
    reverse(){
      if(this.length === 1 || this.length === 0){
        return this
      }
      let i = 0
      while(i <= this.length){
        let current = this.shift()
        this.push(current.val)
        i++
        console.log(i, this)
      }
      // return this
      // console.log(this.length)
    }
  }
  
  // let firstLinkedList = new SinglyLinkedList()
  // firstLinkedList.push("one")
  // firstLinkedList.push("two")
  // firstLinkedList.push("three")
  //one two three
  //fir
  // "two, three, one"
  //three, one two,
  
  // firstLinkedList.set(4, "four")
  // firstLinkedList.reverse()
  // console.log(firstLinkedList)
  
  // firstLinkedList.push("three")
  // console.log(firstLinkedList.head.next.next)
  
  var reverseString = function(s) {
    let start = 0
    let end = s.length - 1
    while(start < end){
      let charAtStart = s[start]
      let charAtEnd = s[end]
      s[start] = charAtEnd
      s[end] = charAtStart
      start++
      end--
    }
    return s
  };
  
  var isPalindrome = function(s) {
    //if not an alphanumeric character increment, otherwise check for a match
    let lowercased = s.toLowerCase()
    let start = 0;
    let end = s.length - 1
    while(start < end){
      console.log(start, end)
      if(!lowercased[start].match(/[a-z0-9]/)){
        start++
      } else if(!lowercased[end].match(/[a-z0-9]/)){
        end--
      } else if(lowercased[start] !== lowercased[end]){
         console.log("start bad",lowercased[start], "end bad",lowercased[end])
        return false
      }  else if(lowercased[start] === lowercased[end]){
         console.log("start",lowercased[start], lowercased[end])
        start++
        end--
        }
      }
    return true
  
    //   let stringArr = s.toLowerCase().split("")
    //   let lettersArr = []
    //   for(let i = 0; i < stringArr.length; i++){
    //      if(stringArr[i].match(/[a-z0-9]/)){
    //        lettersArr.push(stringArr[i])
    //     }
    //   }
    //   console.log(lettersArr)
    //   let i = 0;
    //   let j = lettersArr.length - 1
    //   while(i < j){
    //     if(lettersArr[i] !== lettersArr[j]){
    //       return false
    //     }
    //     i++;
    //     j--
    //   }
    //  return true
      // for(let i = 0)
  };
  
  // isPalindrome("A man, a plan, a  dcanal: Panama")
  // reverseString(["H","a","n","v","n","a","h"])
  var isPalindrome = function(head) {
      let ble = ["blah"]
      console.log(ble.next)
  };
  
  const stringReverse = str => {
    let newStr = ""
    //two pointers at each end, move in and reverse as you go//
  
   for(let i = str.length - 1; i >= 0; i--){
     newStr += str[i]
   }
    return newStr
  }
  flightToMovie = (flightLength, moviesArr) => {
    for(let i = 0; i < moviesArr.length; i++){
      for(let j = 0; j < moviesArr.length; j++){
        if(j === i){
          continue
        }
        if(moviesArr[i]+ moviesArr[j] === flightLength){
          return true
        }
      }
    }
    return false
  
  }
  
  flightToMovie2 = (flightLength, moviesArr) => {
    let moviesSet = new Set()
    for(let i = 0; i < moviesArr.length; i++){
      firstMovie = moviesArr[i]
      let secondMovie = flightLength - firstMovie
      if(moviesSet.has(secondMovie)){
        return true
      }
      moviesSet.add(firstMovie)
    }
  return `${2}, nums = ${[1, 2, 3,4]}`
  }
  
  // flightToMovie(476, [124, 187, 238, 120, 400])
  // flightToMovie2(476, [124, 187, 238, 120, 400])
  
  var removeElement = function(nums, val) {
      //need to iterate through the array 
      //if the element !== val, add one to counter, and delete the element
      
      for(let i = 0; i < nums.length; i++){
        if(nums[i] === val){
          nums.splice(i, 1)
        }
      }
      return `${nums.length}, nums = [${nums}]`
      
  };
  // removeElement([3, 2, 2, 3], 3)
  
  const twoSum = (numArr, target) => {
    let numObj = {}
    for(let i = 0; i < numArr.length; i++){
      numObj[numArr[i]] = i
    }
    for(let i = 0; i < numArr.length; i++){
      let diff = target - numArr[i]
      console.log("diff", diff, "numObj", numObj, "numObj[diff]", numObj[diff], "i", i)
      if(numObj[diff] && numObj[diff] !== i){
        return [i, numObj[diff]]
      }
      }
  }
  // twoSum([1,3,4,2], 6)
  
  const lemonadeChange = (bills) => {
    let totalChange = 0
    for(let i = 0; i < bills.length; i++){
      console.log("i", i, "bills[i]", bills[i],"totalChange",totalChange)
      if(bills[i]===5){
        totalChange += 5
      } else if(bills[i] - 5 <= totalChange){
        totalChange += bills[i]
        totalChange -= bills[i] - 5
      } else {
        return false
      }
    }
    return true
    
      //have a counter
      //iteratere though bills
      //if bills[i] === 5, add to counter and continue
      //if(bills[i]) > 5, see if theres enough so that when we subtract from bills[i], the remaineder is 5. then subtract that amount from the sum
      //so if bills{i} - 5 - sum >= 0, sumbract sills[i] - 5 from total
      
  };
  
  // lemonadeChange([5,5,5,10,20])
  //5
  //10
  //15
  //10
  //5 
  const palindrome = str =>{
    if(str.length <=1) return str
    if(str[0] === str[str.length - 1]){
      console.log(str.slice(1, str.length - 1))
      return palindrome(str.slice(1, str.length - 1))
    }else{
      return false
    } 
  }
  palindrome("helleh")

const canMakePalindrome = str => {
    let charObj = {
    }
    for(let char of str){
        if(charObj[char]){
            charObj[char]++
        } else {
            charObj[char] = 1
        }
    }
    let oddCharCount = 0

    for(let key in charObj){
        if(charObj[key] % 2 === 1){
            oddCharCounter++
        }
        if(oddCharCounter > 1){
            return false
        }
    }
    return true

} 