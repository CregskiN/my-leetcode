/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function (s) {
  if (s.length === 1) {
    return 1;
  }

  let max = 0;
  let left = 0, right = 0;
  const set = new Set();
  while (right < s.length) {
    // 1. 窗口内没有的元素，添加
    if (!set.has(s[right])) {
      set.add(s[right]);
      right++;
    } else {
      // 2.1 窗口内有的元素，从左侧逐个删除，直到该已有元素也被删除
      while (s[left] !== s[right]) {
        set.delete(s[left]);
        left++;
      }
      set.delete(s[left]);
      left++;
      // 2.2 添加新元素
      set.add(s[right]);
      right++;
    }
    // 3. 更新 max
    if (max < set.size) {
      max = set.size;
    }
  }
  return max;
};
// console.log(lengthOfLongestSubstring("au"));
// console.log(lengthOfLongestSubstring("pwwkew"));