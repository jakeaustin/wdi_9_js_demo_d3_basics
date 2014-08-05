// Writing demo code in here
//d3.select('#simple-list').append('li').text('It works!');
//d3.selectAll('#simple-list li').style('color', 'tomato');
  //better written as
//d3.select('#simple-list').selectAll('li').style('color', 'tomato');

//d3.select('#simple-form').attr()
//d3.selectAll('#simple-list li').classed('tomato', true);
// false to 'remove' class

var groceryList = ['cheese', 'crackers', 'hummus'];
var newList = ['things', 'stuff', 'other stuff', 'yep', 'cheese'];

function updateGroceries(data) {
  var list = d3.select('#simple-list')
    .selectAll('li')
      .data(data, function(d){ return d; })
      .style('color', 'cyan');

  list.enter().append('li')
    .style('color', 'green')
    .text(function(d, index){ return 'Index: ' + index + ' ' + d + '!'; });

  list.exit().style('color', 'red');
}

//updateGroceries(groceryList);
//updateGroceries(newList);

// var friends = [
//   { name: 'Chris', hair: 'brown' },
//   { name: 'Jason', hair: 'red' },
//   { name: 'mark', hair: 'blue' }
// ];

// d3.select('#simple-list')
//   .selectAll('li')
//     .data(friends)
//   .enter().append('li')
//     .style('color', function(d){ return d.hair; })
//     .text(function(d){ return d.name + " has " + d.hair + ' hair'; });




// var data = [4, 30, 20, 10, 5, 6, 200, 150, 99, 110, 3500];
// var xScale = d3.scale.linear()
//   .domain([0, d3.max(data)])
//   .range([0, 800]);

// d3.select('#html-chart')
//   .selectAll('div')
//     .data(data)
//   .enter().append('div')
//     .style('width', function(d){ return xScale(d) + 'px'; })
//     .text(function(d){return d; });


// var enteringGroup = d3.select('#svg-chart')
//   .selectAll('g')
//     .data(data)
//   .enter().append('g');

// enteringGroup.append('rect')
//   .attr('height', 24)
//   .attr('fill', 'steelblue')
//   .attr('y', function(d, index){ return index*25;} )
//   .attr('width', 0)
//   .transition()
//     .duration(1000)
//       .attr('width', function(d) { return xScale(d); });


// enteringGroup.append('text')
//   .text(function(d){ return d; })
//   .attr('x', 5)
//   .attr('y', function(d, index){ return index*25 + 20; })
//   .attr('fill', 'red');

//source could be http://boston.gov/something/data/databits
d3.json("sample.json", function(error, people) {
  if(error){ alert('womp'); }

  var chartHeight = 300;

  var yScale = d3.scale.linear()
    .domain([0, d3.max(people, function(d){ return d.yearsExperience; })])
    .range([0, chartHeight]);

  d3.select("#svg-chart")
    .selectAll("rect")
      .data(people)
    .enter().append("rect")
      .attr('fill', 'steelblue')
      .attr('width', 40)
      .attr('height', function(person) { return yScale(person.yearsExperience); })
      .attr('x', function(person, index) { return index * 50; })
      .attr('y', function(person) { return chartHeight - yScale(person.yearsExperience); });
});
