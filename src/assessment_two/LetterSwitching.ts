export function LetterSwitching(input: string) {
  const ans: string[] = [];
  input.split('').forEach((char) => {
    const code = char.toLowerCase().charCodeAt(0);
    // If the character code is within the range of letters, otherwise ignore
    if (code >= 97 && code <= 122) {
      const position = code - 97;
      const newPosition = 122 - position;
      ans.push(String.fromCharCode(newPosition));
    }
  });
  return ans.join('');
}
