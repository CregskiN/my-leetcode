/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
 var prefixCount = function (words, pref) {
  var count = 0;
  for (word of words) {
    if (word.indexOf(pref) === 0) {
      count++;
    }
  }
  return count;
};