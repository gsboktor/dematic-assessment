import { FrequencyMap } from '../src/assessment_two/FrequencyMap';
import { LetterSwitching } from '../src/assessment_two/LetterSwitching';

describe('LetterSwitching', () => {
  it('should correctly encode basic letter sequences', () => {
    expect(LetterSwitching('acp')).toBe('zxk');
  });

  it('should preserve non-alphabet characters', () => {
    expect(LetterSwitching('hello123!')).toBe('svool123!');
  });

  it('should handle empty string and single characters', () => {
    expect(LetterSwitching('')).toBe('');
    expect(LetterSwitching('a')).toBe('z');
    expect(LetterSwitching('z')).toBe('a');
  });
});

describe('FrequencyMap', () => {
  it('should count frequencies of lowercase letters correctly', () => {
    const result = FrequencyMap('hello');
    expect(result['h']).toBe(1);
    expect(result['e']).toBe(1);
    expect(result['l']).toBe(2);
    expect(result['o']).toBe(1);
  });

  it('should handle mixed case letters', () => {
    const result = FrequencyMap('HeLLo');
    expect(result['h']).toBe(1);
    expect(result['e']).toBe(1);
    expect(result['l']).toBe(2);
    expect(result['o']).toBe(1);
  });

  it('should initialize all letters with zero count', () => {
    const result = FrequencyMap('');
    // Check a few random letters
    expect(result['a']).toBe(0);
    expect(result['m']).toBe(0);
    expect(result['z']).toBe(0);
  });

  it('should ignore non-alphabet characters', () => {
    const result = FrequencyMap('hello123!');
    expect(result['h']).toBe(1);
    expect(result['e']).toBe(1);
    expect(result['l']).toBe(2);
    expect(result['o']).toBe(1);
  });
});
