import Vue from 'vue';

const dateFilter = (value) => formatDate(value);

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`;
};

const shortDateFilter = (value) =>
  new Date(value).toLocaleString('en-us', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  });

const filters = {
  slashDate: dateFilter,
  shortDate: shortDateFilter,
};

for (const name in filters) {
  Vue.filter(name, filters[name]);
}
