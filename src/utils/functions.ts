export const getReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;
  const min = Math.floor(minutes % 60);
  return `${min} min`;
};
