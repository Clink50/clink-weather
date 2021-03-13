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

const locationDateFilter = (value) => {
  const [weekDay, month, day] = new Date()
    .toLocaleString('en-us', { weekday: 'short', month: 'short', day: 'numeric' })
    .split(' ');
  return `${weekDay} ${month} ${day}`;
};

const shortTimeFilter = (value) => {
  return new Date(value * 1000)
    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    .toLowerCase()
    .replace(/\s+/g, '');
};

const filters = {
  slashDate: dateFilter,
  shortDate: shortDateFilter,
  locationDate: locationDateFilter,
  shortTime: shortTimeFilter,
};

for (const name in filters) {
  Vue.filter(name, filters[name]);
}
