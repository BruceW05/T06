// Set up dimensions and margins
const margin = { top: 50, right: 30, bottom: 50, left: 70 };
const width = 800;  // Total width of the chart
const height = 400; // Total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Inner chart for the scatterplot (shared so the tooltip can attach to it)
let innerChartS;

// Tooltip size
const tooltipWidth = 65;
const tooltipHeight = 32;

// Create a bin generator using d3.bin
const binGenerator = d3.bin()
    .value(d => d.energyConsumption); // Accessor for energyConsumption
    // .value(d => d.screenSize);     // Accessor for screenSize

// Set up the scales
const xScale = d3.scaleLinear();   // histogram
const yScale = d3.scaleLinear();   // histogram
const xScaleS = d3.scaleLinear();  // scatterplot
const yScaleS = d3.scaleLinear();  // scatterplot
const colorScale = d3.scaleOrdinal();

/*****************************************/
/* Make the colours accessible globally  */
/*****************************************/
const barColor = "#606464";
const bodyBackgroundColor = "#fbf2e8"; // matches --bg in base.css

/*****************************************/
/* Make the filter options accessible globally */
/*****************************************/
const filters_screen = [
    { id: "all",  label: "All",  isActive: true },
    { id: "LED",  label: "LED",  isActive: false },
    { id: "LCD",  label: "LCD",  isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];