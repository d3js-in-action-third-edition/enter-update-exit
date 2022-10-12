const drawScatterplot = (data) => {

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#scatterplot")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);


  /****************************/
  /*    Declare the scales    */
  /****************************/
  // X scale
  const maxPopulation = d3.max(data, d => d.global_population_estimate);
  const minPopulation = d3.min(data, d => d.global_population_estimate);
  xScale
    .domain([minPopulation, maxPopulation])
    .range([0, innerWidth])
    .nice();

  // Y scale
  const maxWeigth = d3.max(data, d => d.max_weight_t);
  yScale
    .domain([0, maxWeigth])
    .range([innerHeight, 0])
    .nice();

  // Radius scale
  const maxSize = d3.max(data, d => d.max_size_m);
  rScale
    .domain([0, maxSize])
    .range([0, 40]);
  

  /***************************/
  /*     Append the axes     */
  /***************************/
  // Bottom axis
  const bottomAxis = d3.axisBottom(xScale);
  innerChart
    .append("g")
      .attr("class", "axis-x")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);
  d3.selectAll(".axis-x text")
    .attr("y", "10px");

  // Left axis
  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
      .attr("class", "axis-y")
      .call(leftAxis);

  // Add label to the axes
  svg
    .append("text")
      .text("Population")
      .attr("text-anchor", "end")
      .attr("x", margin.left + innerWidth + 20)
      .attr("y", height - 5)
      .style("font-size", "18px");
  svg
    .append("text")
      .text("Max weigth (t)")
      .attr("dominant-baseline", "hanging")
      .attr("y", 20)
      .style("font-size", "18px");


  /******************************/
  /*     Append the circles     */
  /******************************/
  innerChart
    .selectAll(".cetacean")
    .data(data)
    .join("circle")
      .attr("class", "cetacean")
      .attr("cx", d => xScale(d.global_population_estimate))
      .attr("cy", d => yScale(d.max_weight_t))
      .attr("r", d => rScale(d.max_size_m))
      .attr("fill", d => colorScale(d.status))
      .attr('fill-opacity', 0.6)
      .attr("stroke", d => colorScale(d.status))
      .attr("stroke-width", 2);


};