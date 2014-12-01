function barChart(dataUrl, seriesName, seriesData) {
    // Get the CSV and create the chart
    var options = {
          chart: {
              renderTo: 'container',
              defaultSeriesType: 'column'
              },

          series: [{
              name: 'val1',
              data: []
     }],
     exporting: {
         enabled: true
    },
     xAxis: {
          categories: []
      },

          title: {
              text: ''
          },

          tooltip: {
              shared: true,
              crosshairs: false
          }
      }
  jQuery.getJSON(dataUrl, function(data) {
    yaxis = [];
    dataArray = []
    jQuery.each([seriesData], function(key, name) {
      dataArray[name] = []
      options.series[key] = [{}]
      options.series[key].data = []
      options.series[key].name = []
      jQuery.each(data, function(i,value) {
        nameVal = value[seriesName]
        dataArray[name].push(value[name]);
        yaxis.push([nameVal])
      });
    options.series[key].data = dataArray[name];
    options.series[key].name = name;
    })
    options.xAxis.categories = yaxis
    chart = new Highcharts.Chart(options);
  })
}

function lineChart(dataUrl, seriesName, seriesData) {
    // Get the CSV and create the chart
    var options = {
          chart: {
              renderTo: 'chartContainer',
              defaultSeriesType: 'line'
              },

          series: [{
              name: 'val1',
              data: []
     }],
     xAxis: {
          categories: []
      },

          title: {
              text: 'test chart'
          },

          tooltip: {
              shared: true,
              crosshairs: false
          }
      }
  jQuery.getJSON(dataUrl, function(data) {
    yaxis = [];
    dataArray = []
    jQuery.each(seriesData, function(key, name) {
      dataArray[name] = []
      options.series[key] = [{}]
      options.series[key].data = []
      options.series[key].name = []
      jQuery.each(data, function(i,value) {
        nameVal = value[seriesName]
        dataArray[name].push(value[name]);
        yaxis.push([nameVal])
      });
    options.series[key].data = dataArray[name];
    options.series[key].name = name;
    })
    options.xAxis.categories = yaxis
    chart = new Highcharts.Chart(options);
  })
}

function areaChart(dataUrl, seriesName, seriesData) {
    // Get the CSV and create the chart
    var options = {
          chart: {
              renderTo: 'chartContainer',
              defaultSeriesType: 'area'
              },
              plotOptions: {
                area: {
                    stacking: 'percent',
                    lineColor: '#ffffff',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#ffffff'
                    }
                }
            },
          series: [{
              name: 'val1',
              data: []
         }],
     xAxis: {
          categories: []
      },

          title: {
              text: 'test chart'
          },

          tooltip: {
              shared: true,
              crosshairs: false
          }
      }
  jQuery.getJSON(dataUrl, function(data) {
    yaxis = [];
    dataArray = []
    jQuery.each(seriesData, function(key, name) {
      dataArray[name] = []
      options.series[key] = [{}]
      options.series[key].data = []
      options.series[key].name = []
      jQuery.each(data, function(i,value) {
        nameVal = value[seriesName]
        dataArray[name].push(value[name]);
        yaxis.push([nameVal])
      });
    options.series[key].data = dataArray[name];
    options.series[key].name = name;
    })
    options.xAxis.categories = yaxis
    chart = new Highcharts.Chart(options);
  })
}

function stackedColumnChart(dataUrl, seriesName, seriesData) {
    // Get the CSV and create the chart
    var options = {
          chart: {
              renderTo: 'chartContainer',
              defaultSeriesType: 'bar'
              },
              plotOptions: {
                series: {
                    stacking: 'percent'
                }
            },
          series: [{
              name: 'val1',
              data: []
         }],
     xAxis: {
          categories: []
      },

          title: {
              text: 'test chart'
          },

          tooltip: {
              shared: true,
              crosshairs: false
          }
      }
  jQuery.getJSON(dataUrl, function(data) {
    yaxis = [];
    dataArray = []
    jQuery.each(seriesData, function(key, name) {
      dataArray[name] = []
      options.series[key] = [{}]
      options.series[key].data = []
      options.series[key].name = []
      jQuery.each(data, function(i,value) {
        nameVal = value[seriesName]
        dataArray[name].push(value[name]);
        yaxis.push([nameVal])
      });
    options.series[key].data = dataArray[name];
    options.series[key].name = name;
    })
    options.xAxis.categories = yaxis
    chart = new Highcharts.Chart(options);
  })
}




