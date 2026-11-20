import { Track } from '@/app/sharedTypes/sharedTypes';

export function getUniqueValueByKey(arr: Track[], key: keyof Track): string[] {
  const uniqueValues = new Set<string>();
  arr.forEach((item) => {
    const value = item[key];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (typeof v === 'string' && v) {
          uniqueValues.add(v);
        }
      });
    } else if (typeof value === 'string' && value) {
      uniqueValues.add(value);
    }
  });
  return Array.from(uniqueValues);
}

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;
  return `${minutes}:${outputSeconds}`;
}
