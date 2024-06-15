const startDate = new Date('2020-01-01').getTime();
const endDate = new Date('2024-12-31').getTime();
export const randomDate = new Date(startDate + Math.random() * (endDate - startDate));