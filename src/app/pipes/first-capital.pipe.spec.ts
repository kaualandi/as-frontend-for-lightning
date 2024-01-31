import { FirstCapitalPipe } from './first-capital.pipe';

describe('FirstCapitalPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstCapitalPipe();
    expect(pipe).toBeTruthy();
  });
});
