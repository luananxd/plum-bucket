export const createGoodSmallDescription = (specs) => {
  let description = '';
  specs.forEach((spec) => {
    description += `${spec.value}, `;
  });
  return description.slice(0, -2);
};

export const createGoodPrice = (price) => {
  price = price.toString().split('').reverse();
  let normalizePrice = [];

  price.forEach((num, index) => {
    if((index + 1) % 3 === 0) {
      normalizePrice.push(` ${num}`);
    } else {
      normalizePrice.push(num);
    }
  })

  return normalizePrice.reverse().join('');
};

export const getAverageValue = (array, searchedParameter) => {
  const sum = array.reduce((total, item) => {
    return total += item[searchedParameter];
  }, 0)
  return (sum / array.length).toFixed(2);
}