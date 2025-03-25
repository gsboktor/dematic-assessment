export function FrequencyMap(input: string) {
  const freqMap: Record<string, number> = {};
  for (let i = 97; i <= 122; i++) {
    freqMap[String.fromCharCode(i)] = 0;
  }

  input.split('').forEach((char) => {
    const code = char.toLowerCase().charCodeAt(0);

    if (code >= 97 && code <= 122) freqMap[char.toLowerCase()]++;
  });

  return freqMap;
}
