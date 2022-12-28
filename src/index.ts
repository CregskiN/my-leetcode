type PeopleType = '+' | '-';
type PeopleMap = PeopleType[][];

class Graph {
  private _map: PeopleMap;
  private _width: number;
  private _height: number;
  constructor(width: number, height: number, map: PeopleMap) {
    this._width = width;
    this._height = height;
    this._map = map;
  }

  public next() {
    for (let x = 0; x < this._map.length; x++) {
      for (let y = 0; y < this._map[x].length; y++) {
        const numOfAlivedNeibors = this._countAlivedNeibor(x, y);
        if (numOfAlivedNeibors < 2 || numOfAlivedNeibors > 3) {
          this._die(x, y);
        } else if (numOfAlivedNeibors === 3 && this._getStatus(x, y) === '-') {
          this._reborn(x, y);
        }
      }
    }
  }

  /**
   * 计算 [x][y] 的邻居存活的数量
   * @param {*} x 
   * @param {*} y 
   * @returns 
   */
  private _countAlivedNeibor(x: number, y: number) {
    let count = 0;
    if (this._getStatus(x - 1, y) === '+') ++count; // top
    if (this._getStatus(x, y + 1) === '+') ++count; // right
    if (this._getStatus(x + 1, y) === '+') ++count; // bottom
    if (this._getStatus(x, y - 1) === '+') ++count; // left
    if (this._getStatus(x - 1, y - 1) === '+') ++count; // leftTop
    if (this._getStatus(x - 1, y + 1) === '+') ++count; // rightTop
    if (this._getStatus(x + 1, y - 1) === '+') ++count; // leftBottom
    if (this._getStatus(x + 1, y + 1) === '+') ++count; // rightBottom
    return count;
  }

  public print(): void {
    let str: string;
    for (const row of this._map) {
      str = '';
      for (const val of row) {
        str = str + " " + val;
      }
      console.log(str);
    }
  }

  private _getStatus(x: number, y: number): PeopleType {
    if (x === -1 || y === -1 || y === this._height || x === this._width) {
      return '-';
    }
    return this._map[x][y];
  }

  private _reborn(x: number, y: number) {
    this._map[x][y] = '+';
  }

  private _die(x: number, y: number) {
    this._map[x][y] = '-';
  }

}



const map: PeopleMap = [
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '+', '-', '-', '-'],
  ['-', '-', '-', '+', '+', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-']
];
const graph = new Graph(map.length, map[0].length, map);
graph.next();
graph.print();
console.log(' ');
graph.next();
graph.print();
console.log(' ');