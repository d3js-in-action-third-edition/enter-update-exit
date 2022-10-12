const populateFilters = () => {

  const filters = d3.select("#filters")
    .selectAll(".filter")
    .data(hemispheres)
    .join("button")
      .attr("class", d => `filter filter-${d.id} ${d.isActive ? "active" : ""}`);

  filters
    .append("span")
      .attr("class", "filter-icon")
      .style("background-image", d => `url(../assets/icon-${d.id}.svg)`);

  filters
    .append("span")
      .attr("class", "filter-text")
      .text(d => d.label);

};

const handleClickOnFilter = (data) => {

  d3.selectAll(".filter")
    .on("click", (e, datum) => {
      console.log(datum)
      if (!datum.isActive) {

        // Update filters
        hemispheres.forEach(h => {
          h.isActive = h.id === datum.id ? true : false;
        });
        d3.selectAll(".filter")
          .classed("active", d => d.id === datum.id ? true : false);

        // Reusable transition
        const t = d3.transition()
          .duration(1000);

        // Update scatterplot
        const updatedData = datum.id === "all"
          ? data
          : data.filter(d => d.hemisphere === datum.id);

        innerChart
          .selectAll("circle")
          .data(updatedData)
          .join(
            function(enter) {
              return enter
                .append("circle")
                  .attr("cx", d => xScale(d.global_population_estimate) - innerWidth)
                  .attr("cy", d => yScale(d.max_weight_t))
                  .attr("r", d => 0)
                  .attr("fill", d => colorScale(d.status))
                  .attr('fill-opacity', 0.6)
                  .attr("stroke", d => colorScale(d.status))
                  .attr("stroke-width", 2)
                  .style('opacity', 0);
            },
            function(update) {
              return update;
            },
            function(exit) {
              return exit
                .transition(t)
                .attr("cy", d => yScale(d.max_weight_t) + innerHeight)
                .attr("r", 0)
                .style('opacity', 0)
                .remove();
            }
          )
          .transition(t)
            .attr("cx", d => xScale(d.global_population_estimate))
            .attr("cy", d => yScale(d.max_weight_t))
            .attr("r", d => rScale(d.max_size_m))
            .attr("fill", d => colorScale(d.status))
            .attr('fill-opacity', 0.6)
            .attr("stroke", d => colorScale(d.status))
            .attr("stroke-width", 2)
            .style('opacity', 1);

      }
    });

};

const handleTooltip = () => {

  const tooltipWidth = 150;
  const tooltipHeight = 50;
  const tooltip = d3.select("#tooltip")
    .style("top", `${margin.top}px`)
    .style("left", `${margin.left}px`)
    .style("width", `${tooltipWidth}px`)
    .style("height", `${tooltipHeight}px`);

  d3.selectAll(".cetacean")
    .on("mouseenter", (e, d) => {
      const cx = e.layerX;
      const cy = e.layerY;
      
      tooltip
        .text(d.common_name)
        .style("transform", `translate(${cx - 0.5*tooltipWidth}px, ${cy - 2*tooltipHeight - 10}px)`)
        .transition()
        .style("opacity", 1);
    })
    .on("mouseleave", (e, d) => {
      tooltip
        .style("transform", `translate(0px, 0px)`)
        .style("opacity", 0);
    });

};