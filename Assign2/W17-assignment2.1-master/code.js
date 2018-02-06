//
// this is just a stub for a function you need to implement
// Modified by: Kusamdeep Brar, 10125311
// Can be found in https://kusamkaur16.github.io/Assign2/W17-assignment2.1-master/index.html
function getStats(txt) {
    /*
     * This function is used to calculate the total number of chars for the passed in string
     */
    var numChars = function(text) {
        if (text === "") {
            return 0;
        }
        return text.length;
    };

    /*
     * This function removes all empty strings from an array
     */
    var removeEmpty = function(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "") {
                arr.splice(i, 1);
            }
        }
        return arr;
    };

    /*
     * This function calculates the total number of words in a string
     */
    var numWords = function(text) {
        //replace all non letter and non number characters with a space
        if (text === "") {
            return 0;
        }
        let textParse = text.replace(/[^A-Za-z0-9]/g, ' ');
        textParse = textParse.replace('_', ' ');
        textParse = textParse.trim();

        //split on multiple spaces
        let words = textParse.split(/\s*\s/);

        //remove all empty string from the array
        words = removeEmpty(words);

        return {
            wordLen: words.length,
            wordArray: words
        }
    };

    /*
     * This function calculates the total number of lines in the passed in string
     */
    var numLines = function(text) {
        //if text is empty, return 0
        if (text.length === 0) {
            return 0;
        }
        //split on newline
        let lines = text.split(/\n/);
        return {
            lineCount: lines.length,
            lines: lines
        }

    };

    /*
     * This function determines the total number of non empty lines in the passed in string
     */
    var numNonEmptyLines = function(text) {
        let nonEmptyCounter = 0;
        if (text === "") {
            return 0;
        }

        //Find the total number of lines
        lines = numLines(text).lines;
        for (let i = 0; i < lines.length; i++) {
            // After taking out the spaces, check to see if there is anything in the line
            if (lines[i].replace(/\s*\s/, "") !== "") {
                nonEmptyCounter++;
            }
        }
        return nonEmptyCounter;
    };

    /*
     * This function calculates the average length of all the words that are in the text
     */
    var averageWordLength = function(text) {
        //if we have an empty word list
        if (text === "") {
            return new Array();
        }

        //get all the words in the string
        let words = numWords(text).wordArray;
        let wordsLength = words.length;
        let wordLengthSum = 0;

        if (wordsLength == 0) {
            return 0;
        }

        for (let i = 0; i < wordsLength; i++) {
            if (words[i] !== "") {
                let word = words[i];
                wordLengthSum += word.length;
            }
        }
        return wordLengthSum / wordsLength;
    };

    /*
     * Calculate the largest line length
     */
    var maxLineLength = function(text) {
        if (text === "") {
            return 0;
        }
        let max = 0;
        //get all lines in the text
        let lines = numLines(text).lines;

        for (let i = 0; i < lines.length; i++) {
            if (lines[i] !== "") {
                let lineCount = lines[i];
                if (lineCount.length > max) {
                    max = lineCount.length
                }
            }
        }
        return max;

    };

    /*
     * This function finds all the palindromes in the text
     */
    var palindromeMaker = function(text) {
        if (text === "") {
            return new Array();
        }
        //get the list of words
        let words = numWords(txt).wordArray;
        let wordNum = words.length;
        let palindromes = [];

        for (let i = 0; i < wordNum; i++) {
            if (words[i] !== "") {
                let reverseOfWord;
                let tempArray;
                let word = words[i];
                //split the string into characters
                tempArray = word.split('');
                //reverse the order of characters
                tempArray.reverse();
                //append the reversed characters and append them into a single string
                reverseOfWord = tempArray.join('');

                //check to see if the word is a palindrome
                if ((reverseOfWord.toLowerCase() === word.toLowerCase()) && (reverseOfWord.length > 2)) {
                    if (palindromes.indexOf(reverseOfWord) === -1)
                        palindromes.push(word.toLowerCase());
                }
            }
        }
        return palindromes;
    };

    /*
     * This function is used to find the top 10 longest words
     */
    var findLongestWords = function(text) {
        let allWords = numWords(text).wordArray;
        //if we have an empty word list
        if (text === "") {
            return new Array();
        }

        let wordMaxList = [];
        for (let i = 0; i < allWords.length; i++) {
            if (wordMaxList.indexOf(allWords[i]) === -1) {
                wordMaxList.push(allWords[i].toLowerCase());
            }
        }

        // Sort the list so the longest word is first
        sortFunction = function(b, a) {
            if (a > b) {
                return 1;
            } else if (b < a) {
                return -1;
            } else {
                return 0;
            }
        };
        wordMaxList.sort(sortFunction);
        let returnArray = wordMaxList.splice(0, 10);

        return returnArray;
    };

    /*
     * Get the list of all words and how many times they appear in the array
     */
    var findDuplicates = function(arr, arrCopy) {
        let duplicates = {};
        let duplicateCount = 0;
        for (let i = 0; i < arr.length; i++) {
            duplicateCount = 1;
            for (let j = 0; j < arrCopy.length; j++) {
                if (i !== j) {
                    if (arr[i].toLowerCase() === arrCopy[j].toLowerCase()) {
                        duplicateCount++;
                    }
                }
            }

            //make the frequency of occurence they key
            let key = "\'" + duplicateCount + "\'";
            if (duplicates[key] !== undefined) {
                var tmp = duplicates[key];
                //if the key exists but the current word is not in its list, add it
                if (tmp.indexOf(arr[i].toLowerCase()) === -1) {
                    tmp.push(arr[i].toLowerCase());
                    tmp.sort();
                    duplicates[key] = tmp;
                }
            } else {
                // if this is a new frequency add it to the list with its word
                var tmpArray = new Array();
                tmpArray.push(arr[i].toLowerCase());
                duplicates[key] = tmpArray;
            }
        }
        return duplicates;

    };

    /*
     * This function is used to find the words that happen most frequently
     */
    var findMostFrequentWords = function(text) {
        if (text === "") {
            return new Array();
        }
        let allWords = numWords(text).wordArray;
        let wordFrequencyList = [];

        let list = findDuplicates(allWords, allWords);
        let sortable = [];

        // get the list of keys and convert the key value pairs into an array so its easier to
        // traverse and manipulate
        for (let key in list) {
            let newKey = key.replace("\'", "");
            newKey = newKey.replace("\'", "");
            sortable.push([newKey, list[key]]);
        }

        //sort the list in reverse order to get the most frequent words at the top
        sortable.sort(function(a, b) {
            return b[0] - a[0];
        });

        //return the top 10 results
        let counter = 0;
        for (let i = 0; i < sortable.length; i++) {
            if (counter < 10) {
                wordList = sortable[i];
                for (words in wordList[1]) {
                    let finalWord = wordList[1][words] + "(" + wordList[0] + ")";
                    wordFrequencyList.push(finalWord);
                    counter++;
                    if (counter > 9) {
                        break;
                    }
                }
            }
        }

        return wordFrequencyList;
    };

    return {
        nChars: numChars(txt),
        nWords: numWords(txt).wordLen,
        nLines: numLines(txt).lineCount,
        nNonEmptyLines: numNonEmptyLines(txt),
        maxLineLength: maxLineLength(txt),
        averageWordLength: averageWordLength(txt),
        palindromes: palindromeMaker(txt),
        longestWords: findLongestWords(txt),
        mostFrequentWords: findMostFrequentWords(txt)
    };
}
