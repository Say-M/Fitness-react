window.layoutStr = "";

window.chartData = "";

window.chartReadyHandler = function (id) {
  document.getElementById(id).setLayout(window.layoutStr);
  document.getElementById(id).setData(window.chartData);
};

window.upFunc = function (seriesId, index, data, values) {
  return '<font color="#03a9f5">Highest Price : $' + values[1] + "</font>";
};

window.downFunc = function (seriesId, index, data, values) {
  return '<font color="#33bbd3">Lowest Price : $' + values[1] + "</font>";
};
