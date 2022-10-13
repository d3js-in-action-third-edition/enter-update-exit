const populateFilters = () => {

  const filters = d3.select("#filters")
    .selectAll(".filter")
    .data(hemispheres)
    .join("button")
      .attr("class", d => `filter filter-${d.id} ${d.isActive ? "active" : ""}`);

  filters
    .append("span")
      .attr("class", "filter-icon")
      .style("background-image", d => `url(./assets/icon-${d.id}.svg)`);

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

  const tooltip = innerChart
    .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "#e2eeff");

  d3.selectAll(".cetacean")
    .on("mouseenter", (e, d) => {
      console.log(d)
      const cx = e.target.getAttribute("cx");
      const cy = e.target.getAttribute("cy");
      const r = e.target.getAttribute("r");
      
      tooltip
        .attr("x", cx)
        .attr("y", cy - r - 10)
        .text(d.common_name)
        .transition()
        .style("opacity", 1);
    })
    .on("mouseleave", () => {
      tooltip
        .attr("y", -500)
        .style("opacity", 0);
    });

};