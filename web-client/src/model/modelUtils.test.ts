import { getIsTitleInvalid, getIsContentInvalid } from './modelUtils';

describe('model utils', () => {
  it('should validate the title correctly', () => {
    expect(getIsTitleInvalid('')).toBeTruthy();
    expect(getIsTitleInvalid('-')).toBeFalsy();
    expect(getIsTitleInvalid('sample title')).toBeFalsy();
  });

  it('should validate the content correctly', () => {
    expect(getIsContentInvalid('')).toBeTruthy();
    expect(getIsContentInvalid('-')).toBeFalsy();
    expect(getIsContentInvalid('sample title')).toBeFalsy();
  });
});
