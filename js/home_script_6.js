$.exists = function(selector) {
  return $(selector).length > 0;
};

/* Line chart Variable */
var lineChartToolTips = {
  displayColors: false,
  mode: "nearest",
  intersect: false,
  position: "nearest",
  xPadding: 8,
  yPadding: 8,
  caretPadding: 8,
  backgroundColor: "#fff",
  cornerRadius: 4,
  titleFontSize: 13,
  titleFontStyle: "normal",
  bodyFontSize: 13,
  titleFontColor: "#222",
  bodyFontColor: "rgba(0, 0, 0, 0.7)",
  borderWidth: 1,
  borderColor: "rgba(0, 0, 0, 0.1)"
}
var scalesYaxes = [{
  ticks: {
    fontSize: 14,
    fontColor: "rgba(0, 0, 0, 0.4)",
    padding: 15,
    beginAtZero: true,
    autoSkip: false,
    maxTicksLimit: 4
  },
  gridLines: {
    color: "rgba(0, 0, 0, 0.1)",
    zeroLineWidth: 1,
    zeroLineColor: "transparent",
    drawBorder: false,
    tickMarkLength: 0
  }
}]
var scalesXaxes = [{
  ticks: {
    fontSize: 14,
    fontColor: "rgba(0, 0, 0, 0.4)",
    padding: 5,
    beginAtZero: true,
    autoSkip: false,
    maxTicksLimit: 4
  },
  gridLines: {
    display: false
  }
}];
/* End Line chart Variable */