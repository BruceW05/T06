const drawHistogram = (data) => {

    // Set up the chart area
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`); // Responsive SVG

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Generate the bins
    const bins = binGenerator(data);
    console.log(bins);

    // Define scales
    const minEng = bins[0].x0;                         // lower bound of first bin
    const maxEng = bins[bins.length - 1].x1;           // upper bound of last bin
    const binsMaxLength = d3.max(bins, d => d.length); // tallest bin

    // Lock the bin edges so filtered data uses the SAME bins
    // (otherwise bars stop lining up with the x axis after filtering)
    binGenerator
        .domain([minEng, maxEng])
        .thresholds(bins.slice(1).map(b => b.x0));

    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    // Draw the bars
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
            .attr("x", d => xScale(d.x0))
            .attr("y", d => yScale(d.length))
            .attr("width", d => xScale(d.x1) - xScale(d.x0))
            .attr("height", d => innerHeight - yScale(d.length))
            .attr("fill", barColor)
            .attr("stroke", bodyBackgroundColor) // stroke gives appearance of gap
            .attr("stroke-width", 2);

    // Bottom axis
    const bottomAxis = d3.axisBottom(xScale);
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    svg.append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width - 20)
        .attr("y", height - 5)
        .attr("class", "axis-label");

    // Left axis
    const leftAxis = d3.axisLeft(yScale);
    innerChart
        .append("g")
        .call(leftAxis);

    svg.append("text")
        .text("Frequency")
        .attr("x", 30)
        .attr("y", 20)
        .attr("class", "axis-label");
};