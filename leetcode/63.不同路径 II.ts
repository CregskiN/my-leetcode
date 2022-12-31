function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) {
    return 0;
  }

  const dp = new Array(m).fill([]).map(() => new Array(n).fill(0));

  for (let col = 0; col < n; ++col) {
    if (obstacleGrid[0][col] === 1) break;
    dp[0][col] = 1;

  }

  for (let row = 0; row < m; ++row) {
    if (obstacleGrid[row][0] === 1) break;
    dp[row][0] = 1;
  }



  for (let row = 1; row < m; ++row) {
    for (let col = 1; col < n; ++col) {
      if (obstacleGrid[row][col] === 1) {
        dp[row][col] = 0;
      } else {
        dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
      }
    }
  }
  return dp[m - 1][n - 1];
};

export {}