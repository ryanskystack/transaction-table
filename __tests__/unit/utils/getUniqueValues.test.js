import { getUniqueValues } from "../../../src/utils";

describe("utils - getUniqueValues", () => {
  it("should return unique values for a given key", () => {
    const array = [
      { name: "Alice", age: 20 },
      { name: "Bob", age: 20 },
      { name: "Charlie", age: 30 },
      { name: "Alice", age: 40 },
    ];

    const uniqueNames = getUniqueValues(array, "name");
    const uniqueAges = getUniqueValues(array, "age");

    expect(uniqueNames).toEqual(["Alice", "Bob", "Charlie"]);
    expect(uniqueAges).toEqual([20, 30, 40]);
  });

  it("should return an empty array if the array is empty", () => {
    const array = [];

    const uniqueNames = getUniqueValues(array, "name");

    expect(uniqueNames).toEqual([]);
  });

  it("should return an empty array if the key does not exist", () => {
    const array = [
      { name: "Alice", age: 20 },
      { name: "Bob", age: 20 },
      { name: "Charlie", age: 30 },
      { name: "Alice", age: 40 },
    ];

    const uniqueValues = getUniqueValues(array, "nonexistentKey");

    expect(uniqueValues).toEqual([]);
  });
});
