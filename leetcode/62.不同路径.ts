
/**
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
 * 问总共有多少条不同的路径？
 * 链接：https://leetcode.cn/problems/unique-paths
 * @param m 
 * @param n 
 * @returns 
 */
function uniquePaths(m: number, n: number): number {
  /**
   * 机器人从起点到 [row][col] 的路径条数，为到 [row-1][col] + [row][col-1] 之和
   */
  const dp = new Array(m).fill(new Array(n).fill(1));
  for (let row = 1; row < m; ++row) {
    for (let col = 1; col < n; ++col) {
      dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
    }
  }
  return dp[m - 1][n - 1];
};

export {}