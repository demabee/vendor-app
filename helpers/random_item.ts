export const generateRandomItem = () => {
  const labels = ['Apple', 'Mango', 'Milk', 'Bread', 'Carrot'];
  const label = labels[Math.floor(Math.random() * labels.length)];
  const price = parseFloat((Math.random() * 100).toFixed(2));
  return { label, price };
};