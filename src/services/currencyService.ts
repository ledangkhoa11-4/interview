import numeral from 'numeral';

const formatPrice = (number: number) => {
  return `$ ${numeral(number).format('0.00')}`;
};

const currencyService = {
  formatPrice,
};

export default currencyService;