function gore(t) {
    function a() {
        var a = d.selectAll(".meridian").data(d3.range(0, p + .5 * p / 10, p / 10).map(
			function(t) {
				return d3.range(-90, 91, 1).map(function(a) {
					return o([t * s - .01, a - .01])
				})
			}));
        if (a.enter().insert("path", ".axis").attr("class", "meridian"), a.attr("d", c), t) {
            var e = d.selectAll(".parallel").data(d3.range(-90, 91, 10).map(function(t) {
                return d3.range(0, p + .05 * p, .1 * p).map(function(a) {
                    return o([a * s, t - .01])
                })
            }));
            e.enter().insert("path", ".axis").attr("class", "parallel"), e.attr("d", c)
        }
    }

    function e() {
        var t = m.extent()[0];
        d3.event.sourceEvent && (t = Math.max(0, Math.min(80, u.invert(d3.mouse(this)[0]))), m.extent([t, t])), v.attr("cx", u(t)), o.radius(t), a()
    }
    var r = {
            top: 10,
            right: 20,
            bottom: 50,
            left: 20
        },
        n = 800 - r.left - r.right,
        i = 200 - r.top - r.bottom,
        d = d3.select(".wrapper").append("svg").attr("width", n + r.left + r.right).attr("height", i + r.top + r.bottom).append("g").attr("transform", "translate(" + r.left + "," + r.top + ")"),
        l = Math.PI,
        s = 180 / l,
        c = d3.svg.line().x(function(t) {
            return u(t[0] * s)
        }).y(function(t) {
            return g(t[1] * s)
        }),
        o = d3.geo.gingery().rotate([90, 90]).translate([0, 0]).scale(1),
        p = l / 6,
        u = d3.scale.linear().domain([0, l * s]).range([0, n]),
        g = d3.scale.linear().domain([0, 1.3 * p * s]).range([i, 0]),
        h = d3.svg.axis().scale(u).tickFormat(function(t) {
            return t + "\xb0"
        }),
        m = d3.svg.brush().x(u).extent([0, 0]).on("brush", e);
    d.append("g").attr("class", "x axis").attr("transform", "translate(0," + i + ")").call(h);
    var f = d.append("g").attr("class", "slider").call(m);
    f.selectAll(".extent,.resize,.background").remove();
    var v = f.append("circle").attr("class", "handle").attr("transform", "translate(0," + i + ")").attr("r", 6.5);
    f.call(m.extent([30, 30]).event)
}! function() {
    function t(t, a, e, r) {
        o.insert("path", ".graticule").datum(topojson.feature(a, a.objects.land)).attr("class", "land").attr("d", l);
        var n = {};
        r.forEach(function(t) {
            n[t.ident] = t
        }), o.insert("path", ".graticule").datum({
            type: "MultiLineString",
            coordinates: e.map(function(t) {
                var a = n[t.from],
                    e = n[t.to];
                return [
                    [+a.longitude_deg, +a.latitude_deg],
                    [+e.longitude_deg, +e.latitude_deg]
                ]
            })
        }).attr("class", "route").attr("d", l), o.selectAll(".airport").data(r).enter().insert("path", ".graticule").datum(function(t) {
            return {
                type: "Point",
                coordinates: [+t.longitude_deg, +t.latitude_deg],
                municipality: t.municipality
            }
        }).attr("class", "airport").attr("d", l).append("title").text(function(t) {
            return t.municipality
        })
    }
    var a = Math.PI,
        e = 1350,
        r = e * Math.cos(a / 6),
        //n = [-90, 40], //pusat dekat cikego (dekat cihampelas)
		//ganti pusat peta
        n = [101, 0.5],
        i = d3.geo.gingery().rotate([-n[0], -n[1]]).radius(30).clipAngle(179.999).translate([e / 2, r / 2]).scale(e / (2 * Math.PI)).precision(.1),
        d = (d3.scale.category20(), d3.geo.graticule().minorStep([15, 10]).minorExtent([
            [-180, -88],
            [180, 88]
        ])),
        l = d3.geo.path().pointRadius(3.5).projection(i),
        s = d3.select("#map").append("svg").attr("width", e).attr("height", r),
        c = s.append("defs");
    c.append("path").datum({
        type: "Sphere"
    }).attr("id", "sphere").attr("d", l), c.append("clipPath").attr("id", "clip").append("use").attr("xlink:href", "#sphere"), s.append("use").attr("class", "background").attr("xlink:href", "#sphere");
    var o = s.append("g").attr("clip-path", "url(#clip)");
    o.append("path").datum(d).attr("class", "graticule").attr("d", l), s.append("path").datum(d3.geo.circle().angle(30).origin(n)).attr("class", "circle").attr("d", l), queue().defer(d3.json, "./world-110m.json").defer(d3.csv, "./routes.csv").defer(d3.csv, "./airports.csv").await(t)
}();