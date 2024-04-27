
const yearRingChart   = new dc.PieChart("#chart-ring-year"),
  spendHistChart  = new dc.BarChart("#chart-hist-spend"),
  spenderRowChart = new dc.RowChart("#chart-row-spenders");

let format = '%d %m %Y';
let parseTimeus = (timeFormatLocale.format('%d %m %Y'));
let parseMonth = (timeFormatLocale.format('%b'));
const dateFormatParser = d3.timeParse(format);
const val = [];

let transitionTime = 2000
// use Margin Convention to layout the SVG with an inner plotting region
// and an outer region for axes, labels, etc.
let outerWidth = 600
let outerHeight = 400
let margins = {
  top: 30,
  bottom: 50,
  left: 50,
  right: 30
}
let innerWidth = outerWidth - margins.left - margins.right
let innerHeight = outerHeight - margins.top - margins.bottom

const margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

const svg = d3.select('#additional-scatter')
  .append("g")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    `translate(${margin.left}, ${margin.top})`);

let AdditionalOuter = d3
  .select('svg#additional-scatter')
  .attr('width', outerWidth)
  .attr('height', outerHeight)

let AdditionalInner = AdditionalOuter
  .append('g')
  .attr('id', 'inner-additional')
  .attr('width', innerWidth)
  .attr('height', innerHeight)
  .attr('transform', 'translate(' + margins.left + ',' + margins.right + ')')

let CallOuter = d3
  .select('svg#call-scatter')
  .attr('width', outerWidth)
  .attr('height', outerHeight)

let CallInner = CallOuter
  .append('g')
  .attr('id', 'inner-call')
  .attr('width', innerWidth)
  .attr('height', innerHeight)
  .attr('transform', 'translate(' + margins.left + ',' + margins.right + ')')

let ClientOuter = d3
  .select('svg#client-scatter')
  .attr('width', outerWidth)
  .attr('height', outerHeight)

let ClientInner = ClientOuter
  .append('g')
  .attr('id', 'inner-client')
  .attr('width', innerWidth)
  .attr('height', innerHeight)
  .attr('transform', 'translate(' + margins.left + ',' + margins.right + ')')

let ContractOuter = d3
  .select('svg#contract-scatter')
  .attr('width', outerWidth)
  .attr('height', outerHeight)

let ContractInner = ContractOuter
  .append('g')
  .attr('id', 'inner-contract')
  .attr('width', innerWidth)
  .attr('height', innerHeight)
  .attr('transform', 'translate(' + margins.left + ',' + margins.right + ')')




let global_value = []
let filters_global = []
let xScale, yScale, colorScale, sizeScalele
let xAxis, yAxis, x, y, xSubgroup
let color
let Additional =[]
let datas =[]
let groups=[]
let subgroups=[]
let matrixData=[]

// Function for stack
groupToStack = function(data, groupBy, colorBy, reducer = v => v.length) {
  const groupedMap = d3.group(data, d => d[groupBy], d => d[colorBy]);

  const keys = Array.from(new Set(data.map(d => d[colorBy])).values());

  return Array.from(groupedMap.entries()).map(g => {
    const obj = {};
    obj[groupBy] = g[0];
    for (let col of keys) {
      const vals = g[1].get(col);
      obj[col] = !vals ? 0 : reducer(Array.from(vals.values()));
    }
    return obj;
  });
}

function init(datas) {
  global_value = datas

  console.log('selectedVar', datas)

  /* const employs_array_year = selectedVar.employs[0];
  console.log('employs_array_year', employs_array_year)
  const employ = []

  var filters_global = selectedVar.ByGroup[0]
  console.log('filters_global', filters_global);

  const Client = filters_global.Client
  Additional = filters_global.Additional
  const Call = filters_global.Call
  const Contract = filters_global.Contract

  console.log('Client', Client);

  Object.keys(employs_array_year).forEach(key => {
    employ[key] = employs_array_year[key]
    return employ
  })

  const reduce = employ.reduce((a, n, i) => a.concat(n));
  console.log('reduce', reduce);

  const filters = reduce.filter(function(d) {
    return d.count_additional_528 > 0;
  })
  console.log('filters', filters)
   */


// populate selectors
  d3.select('select.xvar')
    .on('change', () => update(datas))
    .selectAll('option')
    .data(help.filter(d => d.Groups == 'Additional'))
    .enter()
    .append('option')
    .attr('value', d => d.name)
    .text(d => d.type)


  /*   d3.select('select.yvar')
      .on('change', () => update(cars_global)) // make sure .on() is above .selectAll()
      .selectAll('option')
      .data(variables)
      .enter()
      .append('option')
      .attr('value', d => d)
      .text(d => longVars[d])

    d3.select('select.sizevar')
      .on('change', () => update(cars_global))
      .selectAll('option')
      .data(variables)
      .enter()
      .append('option')
      .attr('value', d => d)
      .text(d => longVars[d]) */

  // initialize values of select elements. NB: property, not attr!
  d3.select('select.xvar').property('value', "count_additional_529")
  d3.select('select.yvar').property('value', 'mpg')
  d3.select('select.sizevar').property('value', 'hp')
// read current selections
  let xvar = d3.select('select.xvar').property('value')

  let yvar = d3.select('select.yvar').property('value')
  let sizevar = d3.select('select.sizevar').property('value')

  console.log('Additional', datas)
  console.log('help', help)
  // create scales based on selections
  // the domain will be modified when selections change
  /*  xScale = d3
     .scaleLinear()
     .domain(d3.extent(Additional.map(d => d[xvar]))) // get x variable from <select>
     .range([20, innerWidth - 20])
   xAxis = d3.axisBottom(xScale).tickSize(-innerHeight)

   yScale = d3
     .scaleLinear()
     .domain(d3.extent(Additional.map(d => d.counts))) // get y variable from <select>
     .range([20, innerHeight - 20].reverse())
   yAxis = d3.axisLeft(yScale).tickSize(-innerWidth) */

  // create axes
  /* AdditionalInner
    .append('g')
    .attr('transform', 'translate(' + 0 + ', ' + innerHeight + ')')
    .attr('class', 'x axis') // note: two classes; handy!
    .call(xAxis)

  AdditionalInner
    .append('g')
    .attr('class', 'y axis')
    .call(yAxis)

  AdditionalOuter
    .append('text')
    .attr('class', 'x axis')
    .attr('x', margins.left + innerWidth / 2)
    .attr('y', outerHeight - margins.bottom / 2)
    .attr('text-anchor', 'middle')
    .text()

  AdditionalOuter
    .append('text')
    .attr('class', 'y axis')
    .attr('x', margins.left / 2)
    .attr('y', margins.bottom + innerHeight / 2)
    .attr('text-anchor', 'middle')
    .attr(
      'transform',
      `rotate(-90 ${margins.left / 2} ${margins.bottom + innerHeight / 2})`
    )
    .text() */
  /* datas.filter(function(d) {return  (xvar=='all' ?d.action :d.action ===xvar );}) */

  subgroups =  d3.union(datas.map(d => (d.year)));
  groups =  d3.union(datas.map(d => (d.type)));
// Add X axis
// create scales based on selections
  // the domain will be modified when selections change
  xScale = d3
    .scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.2])
  xAxis = d3.axisBottom(xScale)
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .attr('class', 'x axis')
    .call(xAxis);

  /*  x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr('class', 'x axis')
      .call(d3.axisBottom(x).tickSizeOuter(0)); */

  // Another scale for subgroup position?
  xSubgroup = d3.scaleBand()
    .domain(d3.union(datas.map(d => (d.year))))
    .range([0, xScale.bandwidth()])

  yScale = d3
    .scaleLinear()
    .domain([0, d3.sum(datas.map(d => d.counts))])
    .range([ height,0]);
  yAxis = d3.axisLeft(yScale)
  svg.append("g")
    .attr('class', 'y axis')
    .call(yAxis);

  /*  y = d3.scaleLinear()
     .domain([0, d3.sum(datas.map(d => d.counts))])
     .range([ height,0]);
   svg.append("g")
   .attr('class', 'y axis')
     .call(d3.axisLeft(y)); */

  // color palette = one color per subgroup
  color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8','#4daf4a'])

}

function matrix(datas) {
  xvar = d3.select('select.xvar').property('value')
  /* var getdatas = function() {
   */
  /* datas= */
  dat=datas.filter(function(d) {return  (xvar=='all' ?d.action :d.action ===xvar );})
  svg.selectAll("rect").remove()
  /*
    return datas
  } */
  /* console.log('datas',getdatas()) */
  console.log('datas',datas)

}


function update(datas) {
  matrix(datas)
  /* xvar = d3.select('select.xvar').property('value') */
  console.log(xvar)
  /* datas.filter(function(d) {return  (xvar=='all' ?d.action :d.action ===xvar );}) */
  /* getdatas = function() {

  datas=datas.filter(function(d) {return  (xvar=='all' ?d.action :d.action ===xvar );})

    return datas
  } */

  console.log('datas',dat)
  matrixData = groupToStack(dat, "type", "year", v =>
    d3.sum(v, d => d.counts)
  )
  var grp = crossfilter(dat);
  var all = grp.groupAll();

  var yearDimension     = grp.dimension(function(d) {return[ +d.year];}),
    officeDimension        = grp.dimension(function(d) {return [d.office_name];}),
    actionDimension = grp.dimension( function(d) {return [d.action];}),
    yearSumGroup       		= yearDimension.group().reduceSum(function(d) {return +d.counts;}),
    officeSumGroup 					= officeDimension.group().reduceSum(function(d) {return +d.counts;}),
    actionSumGroup = actionDimension.group().reduceSum(function(d) {return +d.counts;});

  var allTypesgrp = yearSumGroup;
  var allNameOfficegrp = officeSumGroup;
  var allactionDrp = actionSumGroup;

  /* var getdata = function() {
  matrixData = groupToStack(datas, "type", "year", v =>
    d3.sum(v, d => d.counts)
  )
    return matrixData
  } */

  /* matrixData = groupToStack(getdatas(), "type", "year", v =>
    d3.sum(v, d => d[xvar])
  ) */

  yScale
    .domain([0, d3.max(yearSumGroup.all().map(d => d.value))])
  xScale
    .domain(d3.union(dat.map(d => (d.type))))

  subgroups =  d3.union(dat.map(d => (d.year)));
  groups =  d3.union(dat.map(d => (d.type)));

  console.log('subgroups',subgroups)
  console.log('matrixData',matrix(datas))
  console.log('matrixData',matrixData)
  console.log('yearSumGroup',allTypesgrp.all());
  console.log('officeSumGroup',allNameOfficegrp.all());
  console.log('actionSumGroup',allactionDrp.all());

  yearRingChart
    .width(200)
    .height(200)
    .dimension(yearDimension)
    .group(yearSumGroup)
    .innerRadius(50);

  spendHistChart
    .width(300)
    .height(200)
    .dimension(officeDimension)
    .group(allNameOfficegrp)
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .elasticX(true)
    .elasticY(true);

  spendHistChart.xAxis().tickFormat(function(d) {return d}); // convert back to base unit
  spendHistChart.yAxis().ticks(2);

  spenderRowChart
    .width(350).height(200)
    .dimension(actionDimension)
    .group(actionSumGroup)
    .elasticX(true);

  dc.renderAll();

// Add X axis
  svg.select('.x.axis')
    .transition()
    .duration(transitionTime)
    .call(xAxis);

  // Another scale for subgroup position?
  xSubgroup
    .domain(d3.union(dat.map(d => (d.year))))
    .range([0, xScale.bandwidth()])

  /* let yvar = d3.select('select.yvar').property('value')
  let sizevar = d3.select('select.sizevar').property('value') */
  let variables = Object.keys(subgroups)
  // update scales
  /* yScale.domain([0, d3.max(allTypesgrp.all().map(d => d[variables]))])
   */

  // Another scale for subgroup position?
  /*  const xSubgroup = d3.scaleBand()
     .domain(subgroups)
     .call(xAxis)
     .padding([0.05]) */

  // Add Y axis
  svg
    .select('.y.axis')
    .transition()
    .duration(transitionTime)
    .call(yAxis);

  svg
    .select('rect')
    .transition()
    .duration(transitionTime)
    .call(xSubgroup);

  /* .range([ innerHeight, 0 ]); */
  /*   AdditionalInner
      .select('.x.axis')
      .transition()
      .duration(transitionTime)
      .call(xAxis) */

  // color palette = one color per subgroup
  color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8','#4daf4a'])

  svg.exit()
    .transition()
    .duration(1000)
    .attr("width", 0)
    .remove();
  // Show the bars
  svg
    .selectAll("rect")
    // Enter in the stack data = loop key per key = group per group
    .data(matrixData).join("g")
    .attr("transform", d => `translate(${xScale(d.type)}, 0)`)
    .selectAll("rect").data(function(d) { return Array.from(subgroups).map(function(key) { return {key: key, value: d[key]}; }); })
    .join(
      enter => enter
        .append('rect')
        .attr("x", d => xSubgroup(d.key))
        .attr("y", d => yScale(+d.value))
        .attr("width", xSubgroup.bandwidth())
        .attr("height", d => height - yScale(+d.value))
        .attr("fill", d => color(d.key)),
      update =>
        update
          .transition()
          .duration(transitionTime)
          .attr("fill", 'red')
      /*  .attr('x', d => xScale(d[xvar]))
       .attr('y', d => yScale(d[yvar]))
       .attr("fill", d => color(d.key)),
              exit => exit.call(exit => exit
             .transition()
             .attr("x", 0)
             .attr("y", 0)
             .attr("height", 0)
             .remove()) */
    )


}
