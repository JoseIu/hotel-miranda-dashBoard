export const getRandomId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${letter}${randomNumber.toString().padStart(3, '0')}`;
};
