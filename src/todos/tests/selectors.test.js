import { expect } from "chai";

import { getCompletedTodos, getCompleteTodos } from "../selectors";

describe("getCompletedTodos selector", () => {
  it("returns only completed todos", () => {
    const fakeTodos = [
      {
        text: "Hello",
        isCompleted: true,
      },
      {
        text: "Bye",
        isCompleted: false,
      },
      {
        text: "Go to the moon",
        isCompleted: false,
      },
    ];

    const expected = [
      {
        text: "Hello",
        isCompleted: true,
      },
    ];

    const actual = getCompleteTodos.resultFunc(fakeTodos);

    expect(actual).to.deep.equal(expected);
  });
});
