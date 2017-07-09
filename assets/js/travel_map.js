var width = 840,
    height = 640;

var cc_size = 3.5;

var projection = d3.geo.miller()
    .translate([width / 2, height * 4 / 9])
    .scale((width - 1) / 2 / Math.PI);

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#travelmap")
    .attr("width", width)
    .attr("height", height)
    .attr("background", "#eee")
  .append("g");

var g = svg.append("g");

var colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#f781bf", "#ff7f00"]

svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height);

svg
    .call(zoom)
    .call(zoom.event);

d3.json("/assets/js/world-50m.v1.json", function(error, world) {
  if (error) throw error;

  g.append("path")
      .datum({type: "Sphere"})
      .attr("class", "sphere")
      .attr("d", path);

  g.append("path")
      .datum(topojson.merge(world, world.objects.countries.geometries))
      .attr("class", "land")
      .attr("d", path);

  g.append("path")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);

  g.selectAll("circle").data(locations).enter().append("circle")
      .attr("cx", function(d) { return projection([d.long, d.lat])[0]; })
      .attr("cy", function(d) { return projection([d.long, d.lat])[1]; })
      .attr("fill", function(d, i) {return colors[i % colors.length]; })
      .attr("r", cc_size)
      .append("svg:title")
      .text(function(d) { return d.name; });
});

function zoomed() {
  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  g.selectAll("circle").attr("r", cc_size / d3.event.scale);
};

d3.select(self.frameElement).style("height", height + "px");