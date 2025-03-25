export function LetterSwitching(input: string) {
  const ans: string[] = [];
  input.split('').forEach((char) => {
    const code = char.toLowerCase().charCodeAt(0);
    if (code >= 97 && code <= 122) {
      const position = code - 97;
      const newPosition = 122 - position;
      ans.push(String.fromCharCode(newPosition));
    } else {
      ans.push(char);
    }
  });
  return ans.join('');
}
