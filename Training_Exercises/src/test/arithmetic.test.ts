import operationMap from "../utils/arithmetic";

describe('arithmetic Testing...', () => {
  test('add', () => {
    expect(operationMap.add(1, 2)).toBe(3);
  });

  test('subtract', () => {
    expect(operationMap.subtract(3, 1)).toBe(2);
  });

  test('multiply', () => {
    expect(operationMap.multiply(3, 3)).toBe(9);
  });

  test('divide', () => {
    expect(operationMap.divide(10, 5)).toBe(2);
  });
  test('percentage', () => {
    expect(operationMap.percentage(100, 20)).toBe(20);
  });
});