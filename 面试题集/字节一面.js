// 示例：

//   实现 fn(arr,6)    使结果输出[1,4,5,6]

const arr = [{
  id: 2,
  child: [
    {
      id: 7,
    },
  ],
}, {
  id: 1,
  child: [
    { id: 3 },
    {
      id: 4,
      child: [
        {
          id: 5,
          child: [{ id: 6 }],
        },
      ],
    },
  ],
},];

const stack = [];
const route = [];
let isFinish = false;

search(arr, 6)

function search(arr, target) {
  // 顶层顺序处理
  arr.forEach((node, index) => {
    stack.push(node);
    node.child && _search(node.child, target);
    if (isFinish === true) {
      return;
    } else {
      stack.pop();
    }
  })
  console.log(stack);
}

function _search(arr, target) {
  // 非顶层递归处理
  arr.forEach((node, index) => {
    stack.push(node);
    if (node.id === target) {
      isFinish = true;
      return;
    } else {
      if (node.child) {
        _search(node.child, target);
      } else {
        stack.pop();
      }
    }
  })
}

