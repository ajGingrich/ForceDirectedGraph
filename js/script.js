
$.ajax({
    url: "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json",
    type: 'GET',
    dataType: 'json',
    success: function(data) {

        ///set margins
        var margin = {top: 0, right: 0, bottom: 0, left:0};
        var height = 575 - margin.top - margin.bottom;
        var width = 1000 - margin.right - margin.left;

        //canvas
        var svg = d3.select("#chartContainer")
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //.append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(d3.zoom().on("zoom", function () {
                node.attr("transform", d3.event.transform);
                link.attr("transform", d3.event.transform);
            }));

        /* The simulation is a collection of forces about where we want our nodes to go and how we want them to interact*/
        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink()/*.distance(2).strength(1)*/)
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));



        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(data.links)
            .enter().append("line");

        var positions = {tl: "-192, -143", ca: "-16, -22", tm: "-208, -143", us: "-128, -154", lt: "-48, -88", kh: "-32, -77",
            et: "0, -44", sz: "-48, -143", ar: "-144, 0", bo: "-144, -11", cm: "-60, -122", bf: "-48, -11", gh: "-224, -44",
            sa: "-224, -121", si: "-96, -132", gt: "-112, -55", ba: "-240, 0", kw: "-144, -177", ru: "-192, -121", jo: "-224, -66",
            lc: "-224, -77", es: "-240, -33", lr: "-16, -88", nl: "-48, -110", py: "-112, -121", om: "-144, -110", tz: "-64, -154",
            ga: "-128, -44", mc: "-128, -88", ye: "-96, -165", pk: "-240, -110", al: "-80, 0", ae: "-16, 0", in: "-96, -66", az: "-224, 0",
            ls: "-32, -88", ke: "0, -77", kr: "-112, -77", tj: "-160, -143", tr: "0, -154", af: "-32, 0", bd: "-16, -11", mr: "-16, -99",
            sb: "-240, -121", sm: "-144, -132", kg: "-16, -77", mn: "0, -99", fr: "-112, -44", rw: "-208, -121", sk: "-112, -132", so: "-176, -132",
            pe: "-176, -110", la: "-192, -77", no: "-64, -110", mw: "-144, -99", bj: "-96, -11", sg: "-64, -132", me: "-160, -88", tg: "-112, -143",
            cn: "-176, -22", am: "-96, 0", do: "-112, -33", ua: "-80, -154", bh: "-80, -11", fi: "-32, -44", ly: "-96, -88", id: "-32, -66",
            cf: "-64, -22", se: "-48, -132", vn: "0, -165", ml: "-224, -88", bg: "-64, -11", ro: "-160, -121", ao: "-128, 0", td: "-80, -143",
            za: "-128, -165", vc: "-192, -154", ni: "-32, -110", li: "-240, -77", ag: "-48, 0", my: "-176, -99", sn: "-160, -132", mz: "-192, -99",
            ug: "-96, -154", jp: "-240, -66", ne: "-240, -99", br: "-160, -11", gn: "-32, -55", pa: "-160, -110", gy: "-160, -55", cr: "-208, -22",
            lu: "-64, -88", ad: "0, 0", ci: "-112, -22", sy: "-325, -143", ng: "-16, -110", ec: "-144, -33", cz: "-32, -33", bn: "-128, -11",
            au: "-192, 0", ir: "-144, -66", dz: "-128, -33", sv: "0, -143", kn: "-80, -77", cl: "-144, -22", be: "-32, -11", th: "-128, -143",
            ht: "-240, -55", iq: "-128, -66", sl: "-128, -132", ge: "-176, -44", gm: "-16, -55", ph: "-224, -110", md: "-144, -88", ma: "-112, -88",
            na: "-208, -99", gw: "-144, -55", ch: "-96, -22", gd: "-160, -44", bz: "0, -22", pt: "-80, -121", ee: "-160, -33", uy: "-144, -154",
            gq: "-64, -55", lb: "-208, -77", uz: "-160, -154", eg: "-176, -33", dj: "-64, -33", co: "-192, -22", bi: "", tw: "-48, -154", cy: "-16, -33",
            qa: "-128, -121", it: "-176, -66", bt: "-192. -11", sd: "-32, -132", np: "-80, -110", cd: "-48, -22", sr: "-208, -132", ve: "-208, -154",
            il: "-64, -66", zm: "-160, -165", at: "-176, 0", pg: "-208, -110", zw: "-176, -165", de: "-48, -33", dk: "-80, -33", kz: "-176, -77",
            pl: "0, -121", er: "-224, -33", ie: "-48, -66", mk: "-208, -88", kp: "-96, -77", tt: "-16, -154", lv: "-80, -88", hu: "0, -66",
            by: "-240, -11", hn: "-208, -55", mm: "-240, -88", mx: "-160, -99", tn: "-224, -143", gb: "-144, -44", cg: "-80, -22", xk: "-80, -165",
            gr: "-80, -55", lk: "0, -88", hr: "-224, -55", bw: "-224, -11"};

        ///make new pattern for each flag
        for (var i=0; i <data.nodes.length; i++) {
            svg.append("pattern")
                .attr("id", data.nodes[i].code)
                .attr("width", 16)
                .attr("height", 11)
                .append("image")
                .style("z-index", "10")
                .attr("xlink:href", "https://dl.dropboxusercontent.com/u/5258675/flags.png")
                .attr("transform", "translate(" + positions[data.nodes[i].code] + ")")
                .attr("width", 256)
                .attr("height", 176);
        }

        var node = svg
            .selectAll("rect")
            .data(data.nodes)
            .enter().append("rect")
            .attr("width", 16)
            .attr("height", 11)
            .attr("fill", function(d) {
                return "url(#" + d.code + ")";
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("title")
            .text(function(d) { return d.country; });

        simulation
            .nodes(data.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(data.links);

        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                .attr("x", function(d) { return d.x -8; })
                .attr("y", function(d) { return d.y-6; });
        }

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

    },
    error: function() {
        alert('error');
    }
});



