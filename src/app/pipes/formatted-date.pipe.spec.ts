import { FormattedDatePipe } from "./formatted-date.pipe";

describe("FormatedDataPipe", () => {
  it("create an instance", () => {
    const pipe = new FormattedDatePipe();
    expect(pipe).toBeTruthy();
  });
});
