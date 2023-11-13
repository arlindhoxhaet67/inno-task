/* 
Filename: complexScript.js
Description: A complex JavaScript code demonstrating a text analysis tool that counts the frequency of words 
in a given document and provides useful statistics and insights.
*/

// Function to remove stopwords from the text
function removeStopwords(text) {
  const stopwords = ['the', 'and', 'or', 'is', 'are', 'for', 'in', 'to', 'a', 'an', 'of'];

  return text
    .split(' ')
    .filter(word => !stopwords.includes(word.toLowerCase()))
    .join(' ');
}

// Function to analyze the text
function analyzeText(text) {
  // Remove special characters and convert to lowercase
  text = text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();

  // Remove stopwords from the text
  text = removeStopwords(text);

  // Split the text into individual words
  const words = text.split(' ');

  // Count the frequency of each word
  const wordCount = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  // Get the total number of words
  const totalWords = Object.keys(wordCount).length;

  // Get the most frequent word(s)
  let maxFrequency = 0;
  let mostFrequentWords = [];
  for (const word in wordCount) {
    if (wordCount[word] > maxFrequency) {
      maxFrequency = wordCount[word];
      mostFrequentWords = [word];
    } else if (wordCount[word] === maxFrequency) {
      mostFrequentWords.push(word);
    }
  }

  // Calculate the average word length
  let totalWordLength = 0;
  words.forEach(word => {
    totalWordLength += word.length;
  });
  const averageWordLength = totalWordLength / totalWords;

  // Create a word cloud with scaled font size
  const wordCloud = {};
  for (const word in wordCount) {
    const fontSize = Math.floor((wordCount[word] / maxFrequency) * 20) + 10;
    wordCloud[word] = fontSize;
  }

  // Return the analysis results
  return {
    wordCount,
    totalWords,
    mostFrequentWords,
    averageWordLength,
    wordCloud
  };
}

// Example usage
const document =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
  "Vivamus ultricies mollis mi, vel dapibus justo malesuada eget. " +
  "Sed sit amet elit ac nunc convallis pulvinar. " +
  "Sed ullamcorper commodo felis, et viverra urna pulvinar et. " +
  "Duis ante felis, vulputate ac malesuada sed, convallis ac tellus. " +
  "Donec sagittis, nunc at ullamcorper vulputate, elit nunc lobortis velit, quis aliquam ex co " +
  "ex elit, ac aliquet tellus mollis non. Ut metus nisi, convallis hendrerit quam vitae, porta pellentesque turpis.";

const analysisResult = analyzeText(document);
console.log(analysisResult);
