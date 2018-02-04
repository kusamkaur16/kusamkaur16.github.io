//
// this is just a stub for a function you need to implement
//
function getStats(txt) {
    //Calculate the number of chars in the text
    var numChars = function(text) {
        return text.length;
    };

    //calculate the number of words in the text
    //TODO
    var numWords = function(text) {
        //replace all non letter and non number characters with a space
        var textParse = text.replace(/[^A-Za-z0-9]/g, " ");
        textParse = textParse.trim();

        //split on multiple spaces
        var words = textParse.split(/\s*\s/);

        return {
            wordLen: words.length,
            wordArray: words
        }
    };

    //calculate the number of lines in the text
    var numLines = function(text) {
        //if text is empty, return 0
        if (text.length === 0) {
            return 0;
        }
        //split on newline
        var lines = text.split(/\n/);
        return {
            lineCount: lines.length,
            lines: lines
        }

    };

    //calculate the number of nNonEmptyLines in the text
    var numNonEmptyLines = function(text) {
        var nonEmptyCounter = 0;

        lines = numLines(text).lines;
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].replace(/\s*\s/, "") !== "") {
                nonEmptyCounter++;
            }
        }
        return nonEmptyCounter;

    };

    //calculate the averageWordLength in the text
    var averageWordLength = function(text) {

        var words = numWords(text).wordArray;
        var wordsLength = words.length;
        var wordLengthSum = 0;

        for (var i = 0; i < wordsLength; i++) {
            if (words[i] !== "") {
                var word = words[i];
                wordLengthSum += word.length;
            }
        }

        return wordLengthSum / wordsLength;

    };

    //calculate the maxLineLength
    var maxLineLength = function(text) {
        var max = 0;
        var lines = numLines(text).lines;

        for (var i = 0; i < lines.length; i++) {
            if (lines[i] !== "") {
                var lineCount = lines[i];
                if (lineCount.length > max) {
                    max = lineCount.length
                }
            }
        }

        return max;

    };

    //find the palindromes
    var palindromeMaker = function(text) {
        //get the list of words
        var words = numWords(txt).wordArray;
        var wordNum = words.length;
        var palindromes = [];

        for (var i = 0; i < wordNum; i++) {
            if (words[i] !== "") {
                var reverseOfWord;
                var tempArray;
                var word = words[i];
                //split the string into characters
                tempArray = word.split('');
                //reverse the order of characters
                tempArray.reverse();
                //append the reversed characters and append them into a single string
                reverseOfWord = tempArray.join('');

                //check to see if the word is a palindrome
                if ((reverseOfWord.toLowerCase() === word.toLowerCase()) && (word.length !== 1)) {
                    palindromes.push(word.toLowerCase());
                }
            }
        }
        return palindromes;
    };

    //find the 10 longest words
    var findLongestWords = function(text) {
        var allWords = numWords(text).wordArray;
        var wordCountList = [];
        var wordCounts = new Array();

        for (let i = 0; i < allWords.length; i++) {
            let word = allWords[i].toLowerCase();
            let wordCount = word.length;
            let key = "\'" + wordCount + "\'";
            if (wordCountList[key] != undefined) {

                let array = wordCountList[key];
                if (array.indexOf(word) === -1) {
                    array.push(word);
                    array.sort();
                    wordCountList[key] = array;
                }
            } else {
                let tempArray = new Array();
                tempArray.push(word);
                wordCountList[key] = tempArray;
            }
        }

        var keys = Object.keys(wordCountList);
        for (let i = 0; i < keys.length; i++) {
            let temp = keys[i];
            temp = temp.replace("\'", "");
            temp = temp.replace("\'", "");
            keys[i] = temp;

        }

        keys.sort(function(a, b) {
            return b - a
        });


        for (let j = 0; j < keys.length; j++) {

            if (wordCounts.length <= 10) {
                let x = "\'" + keys[j] + "\'";
                let array2 = wordCountList[x];

                for (let k = 0; k < array2.length; k++) {
                    let value = array2[k];
                    wordCounts.push(value);
                }
            }
        }

        let returnedAnswer = wordCounts.splice(0, 10);

        return returnedAnswer;

    };

    //find the most frequent words
    var findMostFrequentWords = function(text) {
        //find all the unique words
        var allWords = numWords(text).wordArray;
        var uniqueWords = {};

        //find how often the word occurs in the string
        for (let i = 0; i < allWords.length; i++) {
            let word = allWords[i].toLowerCase();
            console.log(allWords.indexOf(word));

            if (uniqueWords[word] != undefined) {
                uniqueWords[word] = uniqueWords[word] + 1;
            } else {
                uniqueWords[word] = 1;
            }
        }

        //---------Change this section of the code
        var sortable = [];
        for (var key in uniqueWords) {
            if (uniqueWords.hasOwnProperty(key)) {
                sortable.push([key, uniqueWords[key]]); // each item is an array in format [key, value]
              }

        }

        // sort items by value
        sortable.sort(function(a, b) {
            return b[1] - a[1]; // compare numbers
        });
        //--------------------------

        let tempArray = sortable.splice(0, 10);

        let returnArray = [];

        for (let key in tempArray) {
            let val = tempArray[key][0] + "(" + tempArray[key][1] + ")";
            returnArray.push(val)
        }



        return returnArray;
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
