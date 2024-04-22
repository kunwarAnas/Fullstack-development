// arithmetic.js

// Operation map containing functions for each arithmetic operation

interface operationMap {
    add: (a: number, b: number) => number;
    subtract: (a: number, b: number) => number;
    multiply: (a: number, b: number) => number;
    divide: (a: number, b: number) => number | string;
    percentage: (a: number, b: number) => number;
}

const operationMap: operationMap = {
    add: (a, b) => {
        return a + b;
    },
    subtract: (a, b) => {
        return a - b;
    },
    multiply: (a, b) => {
        return a * b;
    },
    divide: (a, b) => {
        if (b === 0) {
            return "Cannot divide by zero";
        }
        return a / b;
    },
    percentage: (a, b) => {
        return (a * b) / 100;
    },
};

// Export the operation map
export default operationMap;
