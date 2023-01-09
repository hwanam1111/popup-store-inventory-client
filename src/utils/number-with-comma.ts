export default (number: number = 0) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
