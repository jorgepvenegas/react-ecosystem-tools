import { expect } from "chai";
import { getBorderStyleForDate } from "../TodoListItem";

describe("getBorderStyleForDate", () => {
  it("returns none when the date is less than 5 days ago", () => {
    const today = Date.now();
    const recentDate = new Date(Date.now() - 8_640_000 * 3);

    const expected = "2px #ddd solid";
    const actual = getBorderStyleForDate(recentDate, today);

    expect(actual).to.equal(expected);
  });
  it("returns a border when the date is more than 5 days ago", () => {
    const today = Date.now();
    const recentDate = new Date(Date.now() - 8_640_000 * 7);

    const expected = "2px solid #fd9d9d";
    const actual = getBorderStyleForDate(recentDate, today);

    expect(actual).to.equal(expected);
  });
});
