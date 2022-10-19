// Chart
const margin = {top: 50, right: 50, bottom: 50, left: 60};
const width = 1200;
const height = 550;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
let innerChart;

// Selectors
const cetaceanFilters = [
  { id: "all", label: "All cetaceans", isActive: true },
  { id: "north", label: "Living in the northern hemisphere", isActive: false },
  { id: "south", label: "Living in the southern hemisphere", isActive: false },
  { id: "both", label: "Traveling through both hemispheres", isActive: false },
];

// Conservation status
const conservationStatuses = [
  { id: "LC", label: "Least Concern", color: "#20BF55" },
  { id: "NT", label: "Near Threatened", color: "#5EB1BF" },
  { id: "VU", label: "Vulnerable", color: "#ECC30B" },
  { id: "EN", label: "Endangered", color: "#EF7B45" },
  { id: "CR", label: "Critically Endangered", color: "#E9360D" },
];

// Scales
let xScale = d3.scaleLog();

let yScale = d3.scaleLinear();

let rScale = d3.scaleRadial();

const colorScale = d3.scaleOrdinal()
  .domain(conservationStatuses.map(s => s.id))
  .range(conservationStatuses.map(s => s.color));