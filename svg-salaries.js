var margin = { top: 50, right: 30, bottom: 250, left: 100 };
var width = 1200 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;


var xScale = d3.scale.ordinal()
  .rangeRoundBands([0, width], 0.2);

var yScale = d3.scale.linear()
  .range([0, height]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

var containerGroup = d3.select("#svg-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json('http://data.cityofboston.gov/resource/x8in-twjt.json', function(error, data) {
  if(error){ alert('womp'); }


  var depts = d3.set((data.map(function(d){ return d.department_name; }))).values();

  d3.select('#dept-selector')
    .selectAll('option')
      .data(depts)
    .enter().append('option')
      .attr('value', function(d){ return d; })
      .text(function(d){ return d; });
  // listener (other d3 json for making the graph)

    d3.select('#dept-selector').on('change', buildGraph);

});

function buildGraph() {

  // use $this to get to selected dept
  var dept = this.options[this.selectedIndex].value;
  var queryString = 'http://data.cityofboston.gov/resource/x8in-twjt.json' + '?' + 'department_name='+dept;
  d3.json(queryString, function(error, data) {
    if(error){ alert('womp'); }

    var in_dept = data.filter(function(d){
      if (d.department_name === dept) {
        return d;
      }
    });

    var titles = d3.set(in_dept.map(function(d){ return d.title; })).values();
    var salaries = titles.map(function(d){
      var salary_in_pos = [];
      in_dept.forEach(function(elem, index, array) {
        if (d === elem.title) {
          salary_in_pos.push(elem.regular);
        }
      });
      var total = salary_in_pos.reduce(function(pv, cv) { return parseInt(pv) + parseInt(cv); }, 0);
      return total / salary_in_pos.length;
    });

    xScale.domain(in_dept.map(function(d) { return d.title; }));
    yScale.domain([d3.max(salaries), 0]);
    d3.selectAll('.axis').remove();
    d3.selectAll('.bar').remove();

    containerGroup.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    containerGroup.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("x", -75)
        .attr("y", height/2)
        .style("text-anchor", "middle")
        .text("Salary in $");

    var bars = containerGroup
      .selectAll(".bar")
        .data(in_dept);

    bars.enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(d.title); })
      .attr("y", function(d) { return yScale(d.regular); })
      .attr("height", function(d) { return height - yScale(d.regular); })
      .attr("width", xScale.rangeBand());
    bars.exit().remove();
    //fill table of values sorted
  });
}
