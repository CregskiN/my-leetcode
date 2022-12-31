type PeopleType = number;
type PeopleMap = PeopleType[][];

class Graph {
  private _lastMap: PeopleMap;
  private _originalMap: PeopleMap;
  private numOfCol: number;
  private numOfRow: number;

  constructor(numOfRow: number, numOfCol: number, map: PeopleMap) {
    this.numOfCol = numOfCol;
    this.numOfRow = numOfRow;
    this._originalMap = map;

    const tem: PeopleMap = [];
    for (let row = 0; row < this._originalMap.length; row++) {
      tem.push([]);
      for (let col = 0; col < this._originalMap[0].length; col++) {
        tem[row].push(this._originalMap[row][col]);
      }
    }
    this._lastMap = tem;
  }

  public next() {
    // 1. 根据 lastMap 更改 originalMap
    for (let row = 0; row < this._originalMap.length; row++) {
      for (let col = 0; col < this._originalMap[row].length; col++) {
        const lastStatus = this._getStatus(row, col); // lastMap[row][col] 状态
        const numOfAlivedNeibors = this._countAlivedNeibor(row, col); // lastMap[row][col] 邻居存活数量
        if (numOfAlivedNeibors < 2 || numOfAlivedNeibors > 3) {
          this._die(row, col);
        } else if ((numOfAlivedNeibors === 2 || numOfAlivedNeibors === 3) && lastStatus === 1) {
          this._reborn(row, col); // 本来就活着，接着活着
          // continue;
        } else if (numOfAlivedNeibors === 3 && lastStatus === 0) {
          this._reborn(row, col);
        }
      }
    }
    // 2. originalMap 深拷贝到 lastMap，便于下次逻辑执行
    // this._cloneMap(this._lastMap, this._originalMap);
  }

  private _cloneMap(mapA: PeopleMap, mapB: PeopleMap) {
    for (let row = 0; row < mapB.length; row++) {
      for (let col = 0; col < mapB[0].length; col++) {
        mapA[row][col] = mapB[row][col];
      }
    }
  }

  /**
   * 计算 lastMap 中 [row][col] 邻居存活数量
   * @param row 
   * @param col 
   * @returns 
   */
  private _countAlivedNeibor(row: number, col: number) {
    let count = 0;
    if (this._getStatus(row - 1, col) === 1) ++count; // top
    if (this._getStatus(row, col + 1) === 1) ++count; // right
    if (this._getStatus(row + 1, col) === 1) ++count; // bottom
    if (this._getStatus(row, col - 1) === 1) ++count; // left

    if (this._getStatus(row - 1, col - 1) === 1) ++count; // leftTop
    if (this._getStatus(row - 1, col + 1) === 1) ++count; // rightTop
    if (this._getStatus(row + 1, col - 1) === 1) ++count; // leftBottom
    if (this._getStatus(row + 1, col + 1) === 1) ++count; // rightBottom
    return count;
  }

  /**
   * 获取 lastMap 中 [row][col] 存活状态
   * @param row 
   * @param col 
   * @returns 
   */
  private _getStatus(row: number, col: number): PeopleType {
    if (row === -1 || col === -1 || row === this.numOfRow || col === this.numOfCol) {
      return 0;
    }
    return this._lastMap[row][col];
  }

  private _reborn(x: number, y: number) {
    this._originalMap[x][y] = 1;
  }

  private _die(x: number, y: number) {
    this._originalMap[x][y] = 0;
  }

}

/**
 Do not return anything, modify board in-place instead.
 */
function gameOfLife(board: number[][]): void {
  const graph = new Graph(board.length, board[0].length, board);
  graph.next();
};

// 写个export 模块，形成局部作用域，避免成为全局变量
export {}