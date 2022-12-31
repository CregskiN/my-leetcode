function findCircleNum(isConnected: number[][]): number {
  const g = new Graph(isConnected);
  return g.findCircleNum();
};

class Graph {
  private visitedMap: boolean[] = [];
  private isConnected: number[][];
  private queue: number[] = [];

  constructor(isConnected: number[][]) {
    this.isConnected = isConnected;
    this._initVisitedMap();
  }

  private _initVisitedMap() {
    for (let i = 0; i < this.isConnected.length; ++i) {
      this.visitedMap.push(false);
    }
  }

  public findCircleNum(): number {
    let count = 0;
    let ptr = -1;

    for (let cur = 0; cur < this.visitedMap.length; ++cur) {
      // 对每个未被访问的城市，执行如下操作
      if (!this.visitedMap[cur]) {
        // 1. 入队
        this.queue.push(cur);
        this.visitedMap[cur] = true;
        while (this.queue.length !== 0) {
          // 2. 出队
          ptr = this.queue.shift() as number;
          // 3. 对每个出队元素，visitedMap 置 true、将有连接&&未被访问过的入队
          for (let target = 0; target < this.isConnected[ptr].length; ++target) {
            if (this.isConnected[ptr][target] === 1 && this.visitedMap[target] === false) {
              this.queue.push(target);
              this.visitedMap[target] = true;
            }
          }
        }
        count++;
      }
    }
    return count;
  }
}

const input = [[1, 1, 0], [1, 1, 0], [0, 0, 1]];
findCircleNum(input);

export {}