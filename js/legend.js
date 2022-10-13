const populateLegend = () => {

  // Conservation statuses
  const statuses = d3.select(".legend-conservation-status")
    .append("ul")
    .selectAll(".conservation-status")
    .data(conservationStatuses)
    .join("li")
      .attr("class", "conservation-status");

  statuses
    .append("svg")
      .attr("width", 32)
      .attr("height", 32)
    .append("circle")
      .attr("cx", 16)
      .attr("cy", 16)
      .attr("r", 15)
      .attr("fill", d => d.color)
      .attr('fill-opacity', 0.6)
      .attr("stroke", d => d.color)
      .attr("stroke-width", 2);

  statuses
    .append("span")
      .text(d => d.label);


  // Max size
  const sizes = d3.select(".legend-size")
    .append("svg")
      .attr("width", 150)
      .attr("height", 100)
    .append("g")
      .attr("transform", "translate(0, 10)");

  const maxSize = 33;
  const mediumSize = 15;
  const smallSize = 5;
  const circles = sizes 
    .append("g")
      .attr("fill", "#192e4d")
      .attr("fill-opacity", 0.3);
  circles
    .append("circle")
      .attr("cx", rScale(maxSize))
      .attr("cy", rScale(maxSize))
      .attr("r", rScale(maxSize));
  circles
    .append("circle")
      .attr("cx", rScale(maxSize))
      .attr("cy", 2*rScale(maxSize) - rScale(mediumSize))
      .attr("r", rScale(mediumSize));
  circles
    .append("circle")
      .attr("cx", rScale(maxSize))
      .attr("cy", 2*rScale(maxSize) - rScale(smallSize))
      .attr("r", rScale(smallSize));

  const linesLength = 70;
  const lines = sizes
    .append("g")
      .attr("stroke", "#192e4d")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "6 4");
  lines
    .append("line")
      .attr("x1", rScale(maxSize))
      .attr("y1", 0)
      .attr("x2", rScale(maxSize) + linesLength)
      .attr("y2", 0);
  lines
    .append("line")
      .attr("x1", rScale(maxSize))
      .attr("y1", 2*rScale(maxSize) - 2*rScale(mediumSize))
      .attr("x2", rScale(maxSize) + linesLength)
      .attr("y2", 02*rScale(maxSize) - 2*rScale(mediumSize));
  lines
    .append("line")
      .attr("x1", rScale(maxSize))
      .attr("y1", 2*rScale(maxSize) - 2*rScale(smallSize))
      .attr("x2", rScale(maxSize) + linesLength)
      .attr("y2", 02*rScale(maxSize) - 2*rScale(smallSize));

  const labels = sizes
    .append("g")
      .attr("fill", "#192e4d")
      .attr("dominant-baseline", "middle");
  labels
    .append("text")
      .attr("x", rScale(maxSize) + linesLength + 5)
      .attr("y", 0)
      .text(`${maxSize}m`);
  labels
    .append("text")
      .attr("x", rScale(maxSize) + linesLength + 5)
      .attr("y", 2*rScale(maxSize) - 2*rScale(mediumSize))
      .text(`${mediumSize}m`);
  labels
    .append("text")
      .attr("x", rScale(maxSize) + linesLength + 5)
      .attr("y", 2*rScale(maxSize) - 2*rScale(smallSize))
      .text(`${smallSize}m`);


};