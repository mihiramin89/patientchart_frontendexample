/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>
*/
(function(na, Ha) { "object" === typeof module && module.exports ? module.exports = na.document ? Ha(na) : function(ua) { if (!ua.document) throw Error("Window with document not present"); return Ha(ua, !0) } : na.FusionCharts = Ha(na, !0) })("undefined" !== typeof window ? window : this, function(na, Ha) {
    FusionCharts.register("module", ["private", "modules.renderer.js-charts", function() {
            function ua(d, L) { for (var g = [], a = 0, l = d.length; a < l; a++) g[a] = L.call(d[a], d[a], a, d); return g }

            function fa(d, L) { var g = L ? 360 : q;
                d = (d || 0) % g; return 0 > d ? g + d : d }

            function na(d, L, g, a, l) { return La((L - g[1] - a.top) / l, d - g[0] - a.left) }

            function la(d) { this.config = {};
                this.linkedItems = { chart: d } }
            var ha = this,
                U = ha.hcLib,
                Ha = U.hasTouch,
                Da = ha.window,
                ma = Da.document,
                oa = U.Raphael,
                Ma = U.getPosition,
                sa = U.BLANKSTRING,
                G = U.preDefStr,
                Qa = G.HUNDREDSTRING,
                G = G.NINETYSTRING,
                za = U.pluck,
                ia = U.pluckNumber,
                Ya = U.getFirstValue,
                Ua = U.extend2,
                R = U.toRaphaelColor,
                ra = U.hasSVG,
                Na = U.hashify,
                Za = "createTouch" in ma,
                eb = Za && !(Da.navigator.maxTouchPoints || Da.navigator.msMaxTouchPoints),
                Ia = U.each,
                Ga = U.plotEventHandler,
                wa = U.componentDispose,
                Ea = 8 === Da.document.documentMode ? "visible" : "",
                xa = Math,
                va = xa.sin,
                pa = xa.cos,
                La = xa.atan2,
                qa = xa.round,
                Aa = xa.min,
                Ba = xa.max,
                Fa = xa.abs,
                ta = xa.PI,
                a = xa.ceil,
                b = xa.floor,
                c = ta / 180,
                h = 180 / ta,
                m = Math.PI,
                f = m / 2,
                q = 2 * m,
                v = m + f,
                A = U.getFirstColor,
                n = U.getFirstAlpha,
                C = U.graphics.getDarkColor,
                p = U.graphics.getLightColor,
                I = U.graphics.convertColor,
                K = U.POSITION_BOTTOM,
                B = U.POSITION_RIGHT,
                k = U.chartAPI,
                x = U.COMMASTRING,
                aa = U.ZEROSTRING,
                N = U.ONESTRING,
                D = !/fusioncharts\.com$/i.test(Da.location.hostname),
                Z = {},
                X = {};
            k("column2d", { standaloneInit: !0, friendlyName: "Column Chart", creditLabel: D, defaultDatasetType: "column", applicableDSList: { column: !0 }, singleseries: !0 }, k.sscartesian);
            k("column3d", { friendlyName: "3D Column Chart", defaultDatasetType: "column3d", applicableDSList: { column3d: !0 }, defaultPlotShadow: 1, creditLabel: D, is3D: !0, standaloneInit: !0, hasLegend: !1, singleseries: !0, fireGroupEvent: !0, defaultZeroPlaneHighlighted: !1 }, k.sscartesian3d, { showplotborder: 0 });
            k("bar2d", {
                friendlyName: "Bar Chart",
                isBar: !0,
                standaloneInit: !0,
                defaultDatasetType: "bar2d",
                creditLabel: D,
                applicableDSList: { bar2d: !0 },
                singleseries: !0,
                spaceManager: k.barbase
            }, k.ssbarcartesian);
            k("bar3d", { friendlyName: "3D Bar Chart", defaultDatasetType: "bar3d", applicableDSList: { bar3d: !0 }, defaultPlotShadow: 1, fireGroupEvent: !0, standaloneInit: !0, creditLabel: D, is3D: !0, isBar: !0, singleseries: !0, defaultZeroPlaneHighlighted: !1 }, k.ssbarcartesian3d, { showplotborder: 0 });
            k("area2d", { friendlyName: "Area Chart", standaloneInit: !0, creditLabel: D, defaultDatasetType: "area", singleseries: !0, defaultPlotShadow: 0 },
                k.sscartesian, {}, k.areabase);
            k("line", { friendlyName: "Line Chart", standaloneInit: !0, creditLabel: D, defaultPlotShadow: 1, singleseries: !0, axisPaddingLeft: 0, axisPaddingRight: 0, defaultDatasetType: "line" }, k.sscartesian, { zeroplanethickness: 1, zeroplanealpha: 40, showzeroplaneontop: 0 }, k.areabase);
            k("pareto2d", {
                defaultDatasetType: "column2d",
                singleseries: !0,
                creditLabel: D,
                _createDatasets: function() {
                    var d = this.components,
                        L = this.jsonData,
                        g = this.is3D,
                        a = d.numberFormatter,
                        l = L.data || L.dataset && L.dataset[0] && L.dataset[0].data,
                        e = l && l.length,
                        b = L.chart,
                        c = this.defaultDatasetType,
                        L = new(FusionCharts.get("component", ["dataset", "Pareto"])),
                        r = ia(b.showcumulativeline, 1),
                        w = [],
                        u, F;
                    if (l) {
                        for (b = 0; b < e; b++) u = l[b], F = a.getCleanValue(u.value), null !== F && "true" !== u.vline && !0 !== u.vline && 1 !== u.vline && "1" !== u.vline && w.push(u);
                        this.config.categories = w;
                        a = d.dataset || (d.dataset = []);
                        (l = za(c)) && l.toLowerCase();
                        l = FusionCharts.register("component", ["datasetGroup", "column"]);
                        l = d[void 0] = new l;
                        l.chart = this;
                        l.init();
                        if (e = g ? FusionCharts.get("component", ["dataset", "Column3d"]) : FusionCharts.get("component", ["dataset", "Column"]))(g = a[0]) ? (c = w.length, l = g.components.data.length, c < l && g.removeData(c, l - c), g.JSONData = { data: w }, L.configure.call(g)) : (g = new e, a.push(g), g.chart = this, g.index = b, l && l.addDataSet(g, 0, 0), L.init(g, w, c));
                        d = d.yAxis[1];
                        if (r) d && d.setAxisConfig({ drawLabels: !0, drawPlotLines: !0, drawAxisName: !0, drawAxisLine: !0, drawPlotBands: !0, drawTrendLines: !0, drawTrendLabels: !0 }), d.show(), e = FusionCharts.get("component", ["dataset", "line"]), (g = a[1]) ? (c = w.length,
                            l = g.components.data.length, c < l && g.removeData(c, l - c), g.JSONData = { data: w }, L.configure.call(g)) : (g = new e, a.push(g), g.chart = this, g.index = b, L.init(g, w, "line"));
                        else { if (g = a[1]) wa.call(g), a.pop();
                            d && (d.setAxisConfig({ drawLabels: !1, drawPlotLines: !1, drawAxisName: !1, drawAxisLine: !1, drawPlotBands: !1, drawTrendLines: !1, drawTrendLabels: !1 }), d.hide()) }
                    } else this.setChartMessage()
                },
                _setCategories: function() {
                    var d = this.components,
                        L = this.jsonData,
                        g = L.dataset,
                        a = d.numberFormatter,
                        d = d.xAxis,
                        L = L.data || g && g[0].data || [],
                        g = [],
                        l, e = L.length,
                        b, c = {},
                        r = 0,
                        w;
                    for (b = 0; b < e; b++) { l = L[b];
                        w = a.getCleanValue(l.value, !0); if ("true" === l.vline || "1" === l.vline || 1 === l.vline || !0 === l.vline) c[r] = l;
                        else if (null === w) continue;
                        else l.value = w, g.push(l);
                        r++ }
                    g.sort(function(d, g) { return g.value - d.value });
                    for (b in c) g.splice(b, 0, c[b]);
                    d[0].setCategory(g)
                },
                standaloneInit: !0,
                hasLegend: !1,
                isPercentage: !0
            }, k.msdybasecartesian, { plotfillalpha: G });
            k("pareto3d", {
                standaloneInit: !0,
                is3D: !0,
                friendlyName: "3D Pareto Chart",
                creditLabel: D,
                fireGroupEvent: !0,
                defaultPlotShadow: 1,
                singleseries: !0,
                hasLegend: !1,
                defaultDatasetType: "column3d",
                _createDatasets: k.pareto2d,
                _setCategories: k.pareto2d,
                isPercentage: !0
            }, k.msdybasecartesian3d, { plotfillalpha: G, use3dlineshift: 1 });
            k("pie2d", {
                friendlyName: "Pie Chart",
                standaloneInit: !0,
                defaultSeriesType: "pie",
                defaultPlotShadow: 1,
                reverseLegend: 1,
                alignCaptionWithCanvas: 0,
                sliceOnLegendClick: !0,
                isSingleSeries: !0,
                dontShowLegendByDefault: !0,
                defaultDatasetType: "Pie2D",
                applicableDSList: { Pie2D: !0 },
                defaultZeroPlaneHighlighted: !1,
                creditLabel: D,
                _plotDragMove: function(d,
                    L, g, a, l) {
                    var e = this.data("plotItem"),
                        b = e.chart,
                        e = e.seriesData,
                        c = b.components.dataset[0].config;
                    isNaN(d) || isNaN(L) || !c.enableRotation || e.singletonCase || e.isRightClicked || (d = na.call(l, g, a, e.pieCenter, e.chartPosition, 1), e.isRotating || (e.dragStartAngle !== d && (e.isRotating = !0), ha.raiseEvent("RotationStart", { startingAngle: e._rotationalStartAngle = b._startingAngle() }, b.chartInstance)), c.startAngle += d - e.dragStartAngle, e.dragStartAngle = d, e.moveDuration = 0, c.updateInited || (c.updateInited = !0, setTimeout(b._batchRotate ||
                        (b._batchRotate = function() { b._rotate();
                            c.updateInited = !1 }), 50)))
                },
                _plotDragStart: function(d, L, g) {
                    var a = this.data("plotItem"),
                        l = a.chart,
                        a = a.seriesData,
                        e = l.components.dataset[0].config,
                        b = -e.startAngle;
                    a.isRightClicked = Ha || 0 === g.button || 1 === g.button ? !1 : !0;
                    if (e.enableRotation && !a.isRightClicked) {
                        a.isRotating = !1;
                        e = l.linkedItems.container;
                        l = { left: 0, top: 0 };
                        if (e.getBoundingClientRect) e = e.getBoundingClientRect(), l.top = e.top + (Da.pageYOffset || ma.scrollTop || 0) - (ma.clientTop || 0), l.left = e.left + (Da.pageXOffset ||
                            ma.scrollLeft || 0) - (ma.clientLeft || 0);
                        else
                            for (; e;) l.left += e.offsetLeft || 0, l.top += e.offsetTop || 0, e !== ma.body && e !== ma.documentElement && (l.left -= e.scrollLeft || 0, l.top -= e.scrollTop || 0), e = e.offsetParent;
                        a.chartPosition = l;
                        d = na.call(g, d, L, a.pieCenter, a.chartPosition, 1);
                        a.dragStartAngle = d;
                        a.startingAngleOnDragStart = b
                    }
                },
                _plotDragEnd: function(d) {
                    var L, g = this.data("plotItem"),
                        a = g.chart,
                        l = a.config,
                        e = g.seriesData;
                    e.isRightClicked || (l.clicked = !0, a.disposed || a._rotate(), !e.isRotating && a._plotGraphicClick.call(g.graphic,
                        d), delete l.clicked, e.isRotating && (setTimeout(function() { e.isRotating = !1 }, 0), ha.raiseEvent("RotationEnd", { startingAngle: L = a._startingAngle(), changeInAngle: L - e._rotationalStartAngle }, a.chartInstance)))
                },
                _plotRollOver: function(d) {
                    var L = this.plotItem || this.data("plotItem"),
                        g = L.chart,
                        a = g.components.dataset[0].config,
                        l, e;
                    a.isRotating || (Ga.call(this, g, d, "DataPlotRollOver"), g.onPlotHover(this, !0));
                    a.isHovered = !0;
                    (d = L.innerDiameter) && (l = L.centerLabelConfig) && (e = l.label) && g.drawDoughnutCenterLabel(e, L.center[0],
                        L.center[1], d, d, l, !1)
                },
                onPlotHover: function(d, L) { var g = d.data("plotItem"),
                        a = g.center,
                        l = g.rolloverProperties || {},
                        e = L ? l.color : g.color,
                        b = L ? l.borderWidth : g.borderWidth,
                        c = L ? l.borderColor : g.borderColor;
                    e && (L && (e.cx = a[0], e.cy = a[1], e.r = g.radius), l.enabled && g.graphic.attr({ fill: R(e), "stroke-width": b, stroke: c })) },
                _plotRollOut: function(d) {
                    var L = this.plotItem || this.data("plotItem"),
                        g = L.chart,
                        a = g.components.dataset[0].config,
                        l, e;
                    a.isRotating || (Ga.call(this, g, d, "DataPlotRollOut"), g.onPlotHover(this, !1));
                    a.isHovered = !1;
                    (d = L.innerDiameter) && (l = a.centerLabelConfig) && ((e = l.label) || !e) && g.drawDoughnutCenterLabel(e, L.center[0], L.center[1], d, d, l, !1)
                },
                _rotate: function() {
                    var d, L, g = this.components.dataset[0],
                        a = g.config,
                        l = g.components.data,
                        e = this.config,
                        b = a.slicingDistance,
                        g = g.config,
                        c = q / g.valueTotal,
                        r = e.canvasLeft + .5 * e.canvasWidth,
                        e = e.canvasTop + .5 * e.canvasHeight,
                        w = a.pieMinRadius,
                        u = .5 * (a.piePlotOptions.innerSize || 0),
                        F, t, f, h, m;
                    F = (a.startAngle || 0) % q;
                    for (m = 0; m < l.length; m += 1) f = l[m].config, h = l[m].graphics, d = f.y, null !== d && void 0 !==
                        d && (t = F, F -= g.singletonCase ? q : d * c, d = .5 * (F + t), f.angle = d, f.transX = pa(d) * b, f.transY = va(d) * b, f.slicedTranslation = "t" + pa(d) * b + x + va(d) * b, (L = f._rotateAttrs) || (L = f._rotateAttrs = { ringpath: [], transform: sa }), d = L.ringpath, d[0] = r, d[1] = e, d[2] = w, d[3] = u, d[4] = F, d[5] = t, L.transform = f.sliced ? f.slicedTranslation : sa, h.element.attr(L));
                    this.placeDataLabels(!0, l, a)
                },
                getPlotData: function(d, L) {
                    var g = this.components.dataset[0],
                        a = g.components.data[d].config,
                        g = g.config.userData || (g.config.userData = []),
                        l, e;
                    if (g[d]) g = g[d];
                    else {
                        g =
                            g[d] = {};
                        for (e in a) "object" !== typeof(l = a[e]) && "function" !== typeof l && 0 !== e.indexOf("_") && (g[e] = l);
                        g.value = g.y;
                        g.categoryLabel = g.label = g.seriesName;
                        delete g.y;
                        delete g.total;
                        delete g.doNotSlice;
                        delete g.name;
                        delete g.seriesName;
                        delete g.centerAngle;
                        delete g.showInLegend;
                        delete g.angle;
                        delete g.endAngle;
                        delete g.isVisible;
                        delete g.setColor;
                        delete g.slicedTranslation;
                        delete g.startAngle;
                        delete g.transX;
                        delete g.transY;
                        delete g.pValue
                    }
                    g.sliced = L;
                    return g
                },
                _plotGraphicClick: function(d) {
                    var L, g = this.element ||
                        this,
                        a = g.plotItem || g.data("plotItem"),
                        l = g.data("eventArgs") || {},
                        e = a.chart,
                        b = a.index,
                        c = e.components.dataset[0],
                        r = c.config,
                        w = r.enableMultiSlicing,
                        c = c.components.data[b],
                        u = c.graphics,
                        c = c.config,
                        f = c.doNotSlice,
                        t;
                    L = c.slicedTranslation;
                    var m = e.get("config", "animationObj"),
                        h = m.duration || 200,
                        k = m.dummyObj,
                        q = m.animObj,
                        m = m.animType;
                    !r.isRotating && Ga.call(g, e, d);
                    if (!(r.isRotating || r.singletonCase || f || (d = !w && e.sliceInOtherPies(b), (t = c.sliced) && d))) {
                        if (Za && !eb) {
                            d = (new Date).getTime();
                            if (a.lastSliceTimeStamp && 400 >
                                d - a.lastSliceTimeStamp) return;
                            a.lastSliceTimeStamp = d
                        }
                        r = u.element;
                        a = u.connector;
                        w = u.label || u.dataLabel;
                        L = "object" === typeof L ? "t" + L : L;
                        f = c.connectorPath;
                        u = (t ? -1 : 1) * c.transX;
                        d = (t ? -1 : 1) * c.transY;
                        g = r.data("eventArgs") || r.data("eventArgs", {});
                        ha.raiseEvent("slicingStart", { slicedState: t, dataIndex: "index" in l && l.index, data: e.getPlotData(b, t) }, e.chartInstance);
                        r.animateWith(k, q, { transform: t ? "t0,0" : L }, h, m, function() {
                            ha.raiseEvent("slicingEnd", {
                                slicedState: t,
                                dataIndex: "index" in l && l.index,
                                data: e.getPlotData(b,
                                    t)
                            }, e.chartInstance)
                        });
                        w && w.x && ((L = w.data("textPos")) || (L = w.data("textPos", { x: w.x, y: w.y })), w.animateWith(k, q, { x: w.x + (t ? 0 : u) }, h, m), L.x = w.x + (t ? 0 : u));
                        f && (L = f.slice(0), L[1] += u, L[2] += d, L[4] += u, L[6] += u, a.animateWith(k, q, { path: L }, h, m), c.connectorPath = L);
                        return g.isSliced = t = c.sliced = !t
                    }
                },
                sliceInOtherPies: function(d) {
                    var L = this.components.dataset[0],
                        g = L.components.data,
                        a = g.length,
                        l = 0,
                        e;
                    for (L.enableMultiSlicing = !0; a--;) a !== d && (e = g[a]).config.sliced && ++l && this._plotGraphicClick.call(e.graphics);
                    L.enableMultiSlicing = !1;
                    return !!l
                },
                placeDataLabels: function() {
                    var d = function(d, g) { return d.point.value - g.point.value },
                        L = function(d, g) { return d.angle - g.angle },
                        g = ["start", "start", "end", "end"],
                        c = [-1, 1, 1, -1],
                        l = [1, 1, -1, -1];
                    return function(e, ba, h, r) {
                        var w = this.config,
                            u = this.components,
                            F = u.dataset[0],
                            t = F.graphics,
                            k = F.config,
                            p = w.canvasLeft,
                            C = w.canvasTop,
                            F = w.canvasWidth,
                            n = p + .5 * w.canvasWidth,
                            A = C + .5 * w.canvasHeight,
                            Ka = this.linkedItems.smartLabel,
                            B = k.dataLabelOptions,
                            $a = B.style,
                            P = ia(a(parseFloat($a.lineHeight)), 12),
                            D = 1 === ba.length ?
                            w.singletonPlaceValue : !1,
                            x = B.skipOverlapLabels,
                            I = B.manageLabelOverflow,
                            K = B.connectorPadding,
                            J;
                        J = r && r.metrics || [n, A, 2 * k.pieMinRadius, k.innerSize || 0];
                        var y = J[1],
                            z = J[0];
                        r = .5 * J[2];
                        var k = [
                                [],
                                [],
                                [],
                                []
                            ],
                            n = h.labelsRadius = r + B.distance,
                            H = A = parseInt($a.fontSize, 10),
                            S = H / 2,
                            K = [K, K, -K, -K];
                        h = h.labelsMaxInQuadrant = b(n / H);
                        var B = B.isSmartLineSlanted,
                            O = J[3] / 2,
                            W, E, T, Q, Ra, Ja, ga, aa, G, ja, M, ea, V, ka, X;
                        J = Number.POSITIVE_INFINITY;
                        var da, Z;
                        E = [];
                        T = [];
                        E = this.get("config", "animationObj");
                        var N = e ? 0 : E.duration || 0,
                            R = E.dummyObj,
                            fa =
                            E.animObj,
                            U = E.animType,
                            ha = this._plotDragMove,
                            ma = this._plotDragStart,
                            sa = this._plotDragEnd,
                            ra = this._plotRollOver,
                            ya = this._plotRollOut,
                            la = u.paper,
                            Y = t.dataLabelContainer,
                            ca, oa;
                        Ka.useEllipsesOnOverflow(w.useEllipsesWhenOverflow);
                        e || Ka.setStyle($a);
                        if (1 == ba.length && !O && D) E = ba[0], (ca = E.config._textAttrs).text && (Z = E.graphics, da = E.config, M = Z.label, E.slicedTranslation = [p, C], ca["text-anchor"] = "middle", ca.x = 0, ca.y = 0, ca.transform = ["t", z, y], M ? M.animateWith(R, fa, ca, N, U) : M = Z.label = la.text(ca, oa, Y).drag(ha, ma, sa).hover(ra,
                            ya), M.x = z, M.data("textPos", { x: z, y: y }).data("plotItem", ca.plotItem).data("eventArgs", ca.eventArgs), null !== da.y && void 0 !== da.y && M.show(), Z.connector && Z.connector.attr({ path: [] }));
                        else if (D) X = O + (r - O) / 2, Ia(ba, function(d) {
                            da = d.config;
                            (ca = da._textAttrs).text && (Z = d.graphics, M = Z.label, null !== da.y && void 0 !== da.y && ((ja = Z.connector) && ja.show(), M && M.show()), ca.transform = "t0,0", G = da.angle, aa = y + X * va(G), Q = z + X * pa(G), ca._x = Q, ca._y = aa, d.sliced && (ka = d.slicedTranslation, ea = ka[0] - p, V = ka[1] - C, Q += ea, aa += V), ca["text-anchor"] =
                                "middle", ca.x = 0, ca.y = 0, ca.transform = ["t", Q, aa], M ? M.animateWith(R, fa, ca, N, U) : M = Z.label = la.text(ca, oa, Y).drag(ha, ma, sa).hover(ra, ya), M.x = ca._x, M.x = ca._x, M.y = ca._y, M.data("plotItem", ca.plotItem).data("eventArgs", ca.eventArgs), ca.visibility === Ea && M.show())
                        });
                        else {
                            for (e = ba.length - 1; 0 <= e; e--)
                                if (E = ba[e], da = E.config, ca = da._textAttrs, ca.text = da.displayValue) Z = E.graphics, null !== da.y && void 0 !== da.y && (M = Z.label, (ja = Z.connector) && ja.show(), M && M.show()), ca.text = da.displayValue, ca.transform = "t0,0", G = da.angle % q,
                                    0 > G && (G = q + G), u = 0 <= G && G < f ? 1 : G < m ? 2 : G < v ? 3 : 0, k[u].push({ point: E, angle: G });
                            for (e = ba = 4; e--;) { if (x && (u = k[e].length - h, 0 < u))
                                    for (k[e].sort(d), t = k[e].splice(0, u), u = 0, D = t.length; u < D; u += 1) E = t[u].point, ca = E.config._textAttrs, Z = E.graphics, Z.label && Z.label.attr("visibility", "hidden"), Z.connector && Z.connector.attr({ visibility: "hidden" });
                                k[e].sort(L) }
                            e = Ba(k[0].length, k[1].length, k[2].length, k[3].length);
                            u = Ba(Aa(e, h) * H, n + H);
                            T = k[0].concat(k[1]);
                            E = k[2].concat(k[3]);
                            for (e = T.length - 1; 0 <= e; e--) t = T[e].point.config, delete t.clearance,
                                delete t.clearanceShift, O = Fa(u * va(t.angle)), Math.abs(J - O) < 2 * P && (t.clearance = 0, T[e + 1].point.clearanceShift = P / 2), J = O;
                            J = Number.POSITIVE_INFINITY;
                            e = 0;
                            for (D = E.length; e < D; e++) t = E[e].point.config, delete t.clearance, delete t.clearanceShift, O = Fa(u * va(t.angle)), Math.abs(J - O) < 2 * P && (t.clearance = 0, E[e - 1].point.clearanceShift = P / 2), J = O;
                            k[1].reverse();
                            for (k[3].reverse(); ba--;) {
                                t = k[ba];
                                D = t.length;
                                x || (H = D > h ? u / D : A, S = H / 2);
                                P = D * H;
                                J = u;
                                for (e = 0; e < D; e += 1, P -= H) O = Fa(u * va(t[e].angle)), J < O ? O = J : O < P && (O = P), J = (t[e].oriY = O) - H;
                                $a =
                                    g[ba];
                                D = u - (D - 1) * H;
                                J = 0;
                                for (e = t.length - 1; 0 <= e; --e, D += H)
                                    if (E = t[e].point, G = t[e].angle, da = E.config, ca = da._textAttrs, ca.text && (oa = da._textCss, Z = E.graphics, E = da.sliced, M = Z.label, O = Fa(u * va(G)), O < J ? O = J : O > D && (O = D), J = O + H, P = void 0 === da.clearance ? 2 * a(ia(parseFloat(da.style.border), 12), 12) : 2 * a(ia(parseFloat(da.style.border), da.clearance)), Ja = (O + t[e].oriY) / 2, O = z + l[ba] * n * pa(xa.asin(Ja / u)), Ja *= c[ba], Ja += y, ga = y + r * va(G), T = z + r * pa(G), (2 > ba && O < T || 1 < ba && O > T) && (O = T), Q = O + K[ba], aa = Ja - S - 2, Ra = Q + K[ba], ca._x = Ra, I && (W = 1 < ba ? Ra -
                                                w.canvasLeft : w.canvasLeft + F - Ra, Ka.setStyle(da.style), P = ia(a(parseFloat(da.style.lineHeight)), 12) + P, P = Ka.getSmartText(da.displayValue, W, P), void 0 === da.clearance && P.height > H && (Ja += H), ca.text = P.text, ca.tooltip = P.tooltext), ca._y = aa, E && (ea = da.transX, V = da.transY, Q += ea, O += ea, T += ea, ga += V, Ra += ea), ca["text-anchor"] = $a, ca.vAlign = "middle", ca.x = Ra, ca.y = Ja, (P = M && M.data("textPos")) ? M.attr({ x: P.x, y: P.y }).animateWith(R, fa, ca, N) : M = Z.label = la.text(ca, oa, Y).drag(ha, ma, sa).hover(ra, ya), M.x = ca._x, M._x = ca._x, M.y = ca._y,
                                            ca.tooltip && (M.tooltip(ca.tooltip), delete ca.tooltip), ca.visibility === Ea && M.show(), M.data("textPos", { x: Ra, y: Ja }).data("plotItem", ca.plotItem).data("eventArgs", ca.eventArgs), ja = Z.connector)) da.connectorPath = P = ["M", T, ga, "L", B ? O : T, Ja, Q, Ja], (E = ja.data("connectorPath")) ? w.clicked || ja.attr({ path: E.path }).animateWith(R, fa, { path: P }, N) : ja.attr({ path: P }), ja.data("connectorPath", { path: P })
                            }
                        }
                    }
                }(),
                _spaceManager: function() {
                    var d = this.config,
                        a = this.components,
                        g = a.dataset[0],
                        b = g.components.data,
                        l = g.config,
                        e = a.legend,
                        c = a.colorManager,
                        f = this.linkedItems.smartLabel,
                        r = l.dataLabelCounter,
                        w = 0,
                        u = this.jsonData.chart,
                        a = ia(u.managelabeloverflow, 0),
                        F = ia(u.slicingdistance),
                        t = l.preSliced || d.allPlotSliceEnabled !== aa || u.showlegend === N && u.interactivelegend !== aa ? Fa(ia(F, 20)) : 0,
                        k = ia(u.pieradius, 0),
                        m = (F = ia(u.enablesmartlabels, u.enablesmartlabel, 1)) ? ia(u.skipoverlaplabels, u.skipoverlaplabel, 1) : 0,
                        h = ia(u.issmartlineslanted, 1),
                        q = r ? ia(u.labeldistance, u.nametbdistance, 5) : t,
                        p = ia(u.smartlabelclearance, 5),
                        v = d.width,
                        C = d.height,
                        D = (this._manageActionBarSpace(.225 *
                            C) || {}).bottom,
                        v = v - (d.marginRight + d.marginLeft),
                        C = C - (d.marginTop + d.marginBottom) - (D ? D + d.marginBottom : 0),
                        D = Aa(C, v),
                        P = za(u.smartlinecolor, c.getColor("plotFillColor")),
                        n = ia(u.smartlinealpha, 100),
                        A = ia(u.smartlinethickness, .7),
                        g = l.dataLabelOptions = g._parseDataLabelOptions(),
                        c = g.style,
                        c = r ? ia(parseInt(c.lineHeight, 10), 12) : 0,
                        x = 0 === k ? .15 * D : k,
                        G = 2 * x,
                        J = { bottom: 0, right: 0 },
                        y = l.pieYScale,
                        D = l.pieSliceDepth;
                    g.connectorWidth = A;
                    g.connectorPadding = ia(u.connectorpadding, 5);
                    g.connectorColor = I(P, n);
                    r && (F && (q = p), q += t);
                    p =
                        G + 2 * (c + q);
                    p = this._manageChartMenuBar(p < C ? C - p : C / 2);
                    C -= (p.top || 0) + (p.bottom || 0);
                    l.showLegend && (this.hasLegend = !0, za(u.legendposition, K).toLowerCase() !== B ? (J = e._manageLegendPosition(C / 2), C -= J.bottom) : (J = e._manageLegendPosition(C / 2), v -= J.right));
                    this._allocateSpace(J);
                    f.useEllipsesOnOverflow(d.useEllipsesWhenOverflow);
                    if (1 !== r)
                        for (; r--;) f.setStyle(b[r].config.style || d.dataLabelStyle), e = f.getOriSize(b[r].config.displayValue), w = Ba(w, e.width);
                    0 === k ? x = this._stubRadius(v, w, C, q, t, c, x) : (l.slicingDistance = t,
                        l.pieMinRadius = x, g.distance = q);
                    d = C - 2 * (x * y + c);
                    l.managedPieSliceDepth = D > d ? D - d : l.pieSliceDepth;
                    g.isSmartLineSlanted = h;
                    g.enableSmartLabels = F;
                    g.skipOverlapLabels = m;
                    g.manageLabelOverflow = a
                },
                _stubRadius: function(d, a, g, b, l, e, c) { var f = this.components.dataset[0],
                        r = f.config,
                        w = ia(this.jsonData.chart.slicingdistance),
                        f = r.dataLabelOptions || (r.dataLabelOptions = f._parseDataLabelOptions()),
                        u = 0,
                        u = Aa(d / 2 - a - l, g / 2 - e) - b;
                    u >= c ? c = u : w || (l = b = Ba(Aa(b - (c - u), l), 10));
                    r.slicingDistance = l;
                    r.pieMinRadius = c;
                    f.distance = b; return c },
                getDataSet: function(d) { return this.components.dataset[d] },
                _startingAngle: function(d, a) { var g, b = this.components.dataset[0].config,
                        l = (g = b.startAngle) * -h + (0 > -1 * g ? 360 : 0);
                    isNaN(d) || (b.singletonCase || b.isRotating ? l = b.startAngle : (d += a ? l : 0, b.startAngle = -d * c, this._rotate(d), l = d)); return qa(100 * ((l %= 360) + (0 > l ? 360 : 0))) / 100 },
                eiMethods: {
                    isPlotItemSliced: function(d) {
                        var a, g, b, l = this.apiInstance;
                        return l && l.components.dataset && (b = l.components.dataset[0]) && (a = b.components.data) && a.length && a[d] && (g = a[d].config) &&
                            g.sliced
                    },
                    addData: function() { var d, a = this.apiInstance; return a && a.components.dataset && (d = a.components.dataset[0]) && d.addData.apply(d, arguments) },
                    removeData: function() { var d, a = this.apiInstance; return a && a.components.dataset && (d = a.components.dataset[0]) && d.removeData.apply(d, arguments) },
                    updateData: function() { var d, a = this.apiInstance; return a && a.components.dataset && (d = a.components.dataset[0]) && d.updateData.apply(d, arguments) },
                    slicePlotItem: function(d, a) {
                        var g, b, l, e, c = this.apiInstance;
                        return c && c.components.dataset &&
                            (g = c.components.dataset[0]) && (b = g.components.data) && (e = b.length) && b[d = g.config.reversePlotOrder ? e - d - 1 : d] && (l = b[d].config) && ((!!a !== l.sliced || void 0 === a) && c._plotGraphicClick.call(b[d].graphics.element) || l.sliced)
                    },
                    centerLabel: function(d, a) {
                        var g = this.apiInstance,
                            b = g.components.dataset[0],
                            l = b.config,
                            e = l.piePlotOptions.innerSize,
                            c = l.pieCenter,
                            f = c[0],
                            c = c[1],
                            l = l.centerLabelConfig,
                            r;
                        if ("object" !== typeof a) a = l;
                        else
                            for (r in l) void 0 === a[r] && (a[r] = l[r]);
                        a.label = d;
                        b.centerLabelConfig = a;
                        e && g.drawDoughnutCenterLabel(d ||
                            "", f, c, e, e, a, !0)
                    },
                    startingAngle: function(d, a) { return this.apiInstance._startingAngle(d, a) }
                }
            }, k.guageBase, { plotborderthickness: 1, alphaanimation: 0, singletonPlaceValue: !0, usedataplotcolorforlabels: 0, enableslicing: N });
            k("pie3d", {
                defaultDatasetType: "Pie3D",
                applicableDSList: { Pie3D: !0 },
                is3D: !0,
                friendlyName: "3D Pie Chart",
                fireGroupEvent: !0,
                creditLabel: D,
                getPointColor: function(d) { return d },
                _configureManager: function() {
                    var d = this.components.dataset[0],
                        a = d.config,
                        g = d.components,
                        d = g.Pie3DManager,
                        g = g.data;
                    d &&
                        d.configure(a.pieSliceDepth, 1 === g.length, a.use3DLighting, !1)
                },
                defaultPlotShadow: 0,
                _preDrawCalculate: function() {
                    var d, a, g = this.config,
                        c = 0,
                        l = this.components.dataset[0],
                        e = l.config;
                    d = l.components;
                    a = e.dataLabelOptions;
                    var f = e.pie3DOptions = l._parsePie3DOptions(),
                        k = za(e.startAngle, 0) % q,
                        r = e.managedPieSliceDepth,
                        w = e.slicedOffset = f.slicedOffset,
                        u = g.canvasWidth,
                        F = g.canvasHeight,
                        t = [g.canvasLeft + .5 * u, g.canvasTop + .5 * F - .5 * r],
                        m, h, g = d.data,
                        p, v = Aa(u, F),
                        C, Ka = a.distance;
                    m = e.pieYScale;
                    var D = e.slicedOffsetY || (e.slicedOffsetY =
                        w * e.pieYScale);
                    p = d.Pie3DManager;
                    t.push(2 * e.pieMinRadius, f.innerSize || 0);
                    t = ua(t, function(d, a) { return (C = /%$/.test(d)) ? [u, F - r, v, v][a] * parseInt(d, 10) / 100 : d });
                    t[2] /= 2;
                    t[3] /= 2;
                    t.push(t[2] * m);
                    t.push((t[2] + t[3]) / 2);
                    t.push(t[5] * m);
                    l.getX = function(d, a) { h = xa.asin((d - t[1]) / (t[2] + Ka)); return t[0] + (a ? -1 : 1) * pa(h) * (t[2] + Ka) };
                    e.center = t;
                    Ia(g, function(d) { c += d.config.y });
                    e.labelsRadius = t[2] + Ka;
                    e.labelsRadiusY = e.labelsRadius * m;
                    e.quadrantHeight = (F - r) / 2;
                    e.quadrantWidth = u / 2;
                    l = qa(1E3 * k) / 1E3;
                    f = l + q;
                    k = ia(parseInt(a.style.fontSize,
                        10), 10) + 4;
                    e.maxLabels = b(e.quadrantHeight / k);
                    e.labelFontSize = k;
                    e.connectorPadding = ia(a.connectorPadding, 5);
                    e.isSmartLineSlanted = za(a.isSmartLineSlanted, !0);
                    e.connectorWidth = ia(a.connectorWidth, 1);
                    e.enableSmartLabels = a.enableSmartLabels;
                    p || (p = d.Pie3DManager = new la(this), this.get("graphics", "datasetGroup").trackTooltip(!0));
                    this._configureManager();
                    for (d = g.length - 1; 0 <= d; --d) a = g[d], a = a.config, k = l, p = c ? a.y / c : 0, l = qa(1E3 * (l + p * q)) / 1E3, l > f && (l = f), m = l, a.shapeArgs = { start: qa(1E3 * k) / 1E3, end: qa(1E3 * m) / 1E3 }, a.centerAngle =
                        h = (m + k) / 2 % q, a.slicedTranslation = [qa(pa(h) * w), qa(va(h) * D)], k = pa(h) * t[2], e.radiusY = m = va(h) * t[4], a.tooltipPos = [t[0] + .7 * k, t[1] + m], a.percentage = 100 * p, a.total = c
                },
                placeDataLabels: function() {
                    var d = function(d, a) { return d.point.value - a.point.value },
                        b = function(d, a) { return d.angle - a.angle },
                        g = ["start", "start", "end", "end"],
                        c = [-1, 1, 1, -1],
                        l = [1, 1, -1, -1];
                    return function(e) {
                        var ba, k, r = this.config,
                            w = this.components,
                            u = w.dataset[0],
                            F = u.config,
                            t = u.components.data,
                            h = F.piePlotOptions,
                            p = r.canvasLeft,
                            C = r.canvasTop,
                            D = r.canvasWidth,
                            n = p + .5 * r.canvasWidth,
                            Ka = C + .5 * r.canvasHeight,
                            B = this.linkedItems.smartLabel,
                            A = F.dataLabelOptions,
                            P = A.style;
                        ba = ia(a(parseFloat(P.lineHeight)), 12);
                        ba = Ya(A.placeInside, !1);
                        var x = A.skipOverlapLabels,
                            I = A.manageLabelOverflow,
                            K = A.connectorPadding,
                            G = A.distance,
                            J = A.connectorWidth,
                            y = [
                                [],
                                [],
                                [],
                                []
                            ],
                            z = parseInt(P.fontSize, 10),
                            H = z,
                            S = H / 2,
                            K = [K, K, -K, -K],
                            O = A.isSmartLineSlanted,
                            W, E, T, Q, Z, aa, ga, X, N, ja, M, ea, V, ka, R, G = 0 < G,
                            da = F.center || (F.center = [n, Ka, h.size, h.innerSize || 0]),
                            fa = da[1],
                            U = da[0],
                            h = da[2],
                            n = da[4],
                            Ka = F.labelsRadius,
                            ha = qa(100 * F.labelsRadiusY) / 100,
                            ma = F.maxLabels,
                            sa = F.enableSmartLabels,
                            ra = F.pieSliceDepth / 2;
                        E = this.get("config", "animationObj");
                        var la = e ? 0 : E.duration,
                            oa = E.dummyObj,
                            ta = E.animObj,
                            ya = E.animType,
                            ua, Y, ca = this._plotDragMove,
                            wa = this._plotDragStart,
                            za = this._plotDragEnd,
                            na = this._plotRollOver,
                            Ga = this._plotRollOut,
                            Ca = w.paper,
                            Da = u.graphics.dataLabelContainer;
                        B.useEllipsesOnOverflow(r.useEllipsesWhenOverflow);
                        if (F.dataLabelCounter)
                            if (e || B.setStyle(P), 1 == t.length) E = t[0], ka = E.graphics, V = E.config, Y = V._textAttrs, ua =
                                V._textCss, M = ka.label, R = ka.connector, V.slicedTranslation = [p, C], null !== V.y && void 0 !== V.y && (Y.visibility = Ea, Y["text-anchor"] = "middle", Y.x = U, Y.y = fa + S - 2, Y._x = U), M ? M.animateWith(oa, ta, Y, la, ya) : M = ka.label = Ca.text(Y, ua, Da).drag(ca, wa, za).hover(na, Ga), Y._x && (M.x = Y._x, delete Y.x), M.data("plotItem", Y.plotItem).data("eventArgs", Y.eventArgs), Y.visibility === Ea && M.show(), R && R.hide();
                            else if (ba) Ia(t, function(d) {
                            ka = d.graphics;
                            V = d.config;
                            Y = V._textAttrs;
                            M = ka.label;
                            if (null !== V.y && void 0 !== V.y) {
                                ja = V.angle;
                                N = fa + da[6] *
                                    va(ja) + S - 2;
                                Z = U + da[5] * pa(ja);
                                Y._x = Z;
                                Y._y = N;
                                if (V.sliced) { d = d.slicedTranslation; var a = d[1] - C;
                                    Z += d[0] - p;
                                    N += a }
                                Y.visibility = Ea;
                                Y.align = "middle";
                                Y.x = Z;
                                Y.y = N
                            }
                            M ? M.animateWith(oa, ta, Y, la, ya) : M = ka.label = Ca.text(Y, ua, Da).drag(ca, wa, za).hover(na, Ga);
                            M.data("plotItem", Y.plotItem).data("eventArgs", Y.eventArgs);
                            Y.visibility === Ea && M.show();
                            M.x = Y._x;
                            M._x = Y._x;
                            M._y = Y._y
                        });
                        else {
                            Ia(t, function(d) {
                                ka = d.graphics;
                                V = d.config;
                                ua = V._textCss;
                                Y = V._textAttrs;
                                if (Y.text = V.displayValue) ka = d.graphics, null !== V.y && void 0 !== V.y && (M = ka.label,
                                    (R = ka.connector) && R.show(), M && M.show()), M = ka.label, ja = V.angle, 0 > ja && (ja = q + ja), ea = 0 <= ja && ja < f ? 1 : ja < m ? 2 : ja < v ? 3 : 0, y[ea].push({ point: d, angle: ja })
                            });
                            for (w = r = 4; w--;) { if (x && (u = y[w].length - ma, 0 < u))
                                    for (y[w].sort(d), F = y[w].splice(0, u), u = 0, ba = F.length; u < ba; u += 1) E = F[u].point, ka = E.graphics, ka.label && ka.label.attr("visibility", "hidden"), ka.connector && ka.connector.attr({ visibility: "hidden" });
                                y[w].sort(b) }
                            w = Ba(y[0].length, y[1].length, y[2].length, y[3].length);
                            ha = Ba(Aa(w, ma) * H, ha + H);
                            y[1].reverse();
                            y[3].reverse();
                            for (B.setStyle(P); r--;) {
                                u =
                                    y[r];
                                ba = u.length;
                                x || (H = ba > ma ? ha / ba : z, S = H / 2);
                                F = ba * H;
                                P = ha;
                                for (w = 0; w < ba; w += 1, F -= H) E = Fa(ha * va(u[w].angle)), P < E ? E = P : E < F && (E = F), P = (u[w].oriY = E) - H;
                                F = g[r];
                                t = ha - (ba - 1) * H;
                                P = 0;
                                for (w = u.length - 1; 0 <= w; --w, t += H) E = u[w].point, ka = E.graphics, V = E.config, Y = V._textAttrs, ua = V._textCss, null !== V.y && Y.text && (ja = u[w].angle, T = V.sliced, M = ka.label, E = Fa(ha * va(ja)), E < P ? E = P : E > t && (E = t), P = E + H, ga = (E + u[w].oriY) / 2, E = U + l[r] * Ka * pa(xa.asin(ga / ha)), ga *= c[r], ga += fa, X = fa + n * va(ja), Q = U + h * pa(ja), (2 > r && E < Q || 1 < r && E > Q) && (E = Q), Z = E + K[r], N = ga + S - 2, aa =
                                    Z + K[r], Y._x = aa, I && (W = 1 < r ? aa - p : p + D - aa, B.setStyle(V.style), ba = ia(a(parseFloat(V.style.lineHeight)), 12) + (2 * a(parseFloat(V.style.border), 12) || 0), ba = B.getSmartText(V.displayValue, W, ba), Y.text = ba.text, Y.tooltip = ba.tooltext), ja < m && (ga += ra, X += ra, N += ra), Y._y = N, T && (ba = V.transX, T = V.transY, Z += ba, E += ba, Q += ba, X += T, aa += ba), Y.visibility = Ea, Y["text-anchor"] = F, (ba = M && M.data("textPos")) && M.attr({ x: ba.x, y: ba.y }), Y.x = aa, Y.y = ga, !e && ba ? M.animateWith(oa, ta, Y, la, ya) : M ? Y && M.attr(Y) : M = ka.label = Ca.text(Y, ua, Da).drag(ca, wa, za).hover(na,
                                        Ga), M.data("textPos", { x: aa, y: ga }).data("plotItem", Y.plotItem).data("eventArgs", Y.eventArgs), M.x = Y._x, M._x = Y._x, M.y = Y._y, Y.tooltip && (M.tooltip(Y.tooltip), delete Y.tooltip), G && J && sa && (R = ka.connector, V.connectorPath || (k = !0), V.connectorPath = ba = ["M", Q, X, "L", O ? E : Q, ga, Z, ga], ba = { path: ba, "stroke-width": J, stroke: A.connectorColor || "#606060", visibility: Ea }, R && (e || k ? R.attr(ba) : R.animateWith(oa, ta, ba, la, ya))))
                            }
                        }
                    }
                }(),
                animate: function() {
                    var d, a, g, b, l = this,
                        e = l.components.dataset[0],
                        c = e.components.data;
                    d = l.graphics.datasetGroup;
                    var f = c.length;
                    a = e.config.alphaAnimation;
                    g = function() { l.disposed || l.disposing || l.placeDataLabels(!1) };
                    var r = l.get("config", "animationObj"),
                        e = r.duration || 0,
                        w = r.dummyObj,
                        u = r.animObj,
                        r = r.animType;
                    if (a) d.attr({ opacity: 0 }), d.animateWith(w, u, { opacity: 1 }, e, r, g);
                    else
                        for (d = 0; d < f; d++)
                            if (a = c[d], g = a.graphics, a = a.config, b = a.shapeArgs, a = 2 * ta, g = g.element) g.attr({ start: a, end: a }), g = b.start, b = b.end, (void 0).animateWith(w, u, { cx: g - a, cy: b - a }, e, r)
                },
                _rotate: function(d) {
                    var a = this.components.dataset[0],
                        g = a.config,
                        a = a.components,
                        b = a.data,
                        l = g.slicedOffset,
                        e = g.slicedOffsetY,
                        c = g.startAngle,
                        f;
                    d = isNaN(d) ? -g._lastAngle : d;
                    f = (d - c) % 360;
                    g.startAngle = ia(d, g.startAngle) % 360;
                    f = -(f * ta) / 180;
                    a.Pie3DManager && a.Pie3DManager.rotate(f);
                    Ia(b, function(d) { var a = [],
                            g = d.config;
                        d = d.graphics.element; var a = g.shapeArgs,
                            b = a.start += f,
                            a = a.end += f,
                            c = g.angle = fa((b + a) / 2),
                            b = g.sliced,
                            a = pa(c),
                            c = va(c),
                            a = g.slicedTranslation = [qa(a * l), qa(c * e)];
                        g.transX = a[0];
                        g.transY = a[1];
                        g.slicedX = b ? pa(f) * l : 0;
                        g.slicedY = b ? va(f) * e : 0;
                        d && b && d.attr({ transform: "t" + a[0] + "," + a[1] }) });
                    this.placeDataLabels(!0,
                        b)
                },
                _plotRollOver: function(d) { var a = this.data("plotItem"),
                        g = a.chart,
                        b = g.config,
                        l = g.components.dataset[0],
                        e = l.components.data[a.index],
                        a = e.graphics.element,
                        e = e.config.hoverEffects;
                    l.config.isRotating || (Ga.call(a, g, d, "DataPlotRollOver"), e.enabled && a.attr(e));
                    b.isHovered = !0 },
                _plotRollOut: function(d) {
                    var a = this.data("plotItem"),
                        g = a.chart,
                        b = g.config,
                        l = g.components.dataset[0],
                        e = l.components.data[a.index],
                        a = e.config,
                        e = e.graphics.element;
                    l.config.isRotating || (Ga.call(e, g, d, "DataPlotRollOut"), e.attr({
                        color: a.color.color.split(",")[0],
                        alpha: a._3dAlpha,
                        borderWidth: a.borderWidth,
                        borderColor: a.borderColor
                    }));
                    b.isHovered = !1
                },
                _plotDragStart: function(d, a, g) { var b = this.data("plotItem").chart,
                        l = b.components.dataset[0].config;
                    l.isRightClicked = Ha || 0 === g.button || 1 === g.button ? !1 : !0;
                    l.enableRotation && !l.isRightClicked && (l.isRotating = !1, d = na.call(g, d, a, l.center, l.chartPosition = Ma(b.linkedItems.container), l.pieYScale), l.dragStartAngle = d, l._lastAngle = -l.startAngle, l.startingAngleOnDragStart = l.startAngle) },
                _plotDragEnd: function(d) {
                    var a = this.data("plotItem"),
                        g = a.index,
                        a = a.chart,
                        b = a.config,
                        l = a.components.dataset[0],
                        e = l.config,
                        l = l.components.Pie3DManager,
                        c = e.startAngle;
                    e.isRightClicked || (e.isRotating ? (setTimeout(function() { e.isRotating = !1 }, 0), ha.raiseEvent("rotationEnd", { startingAngle: fa(c, !0), changeInAngle: c - e.startingAngleOnDragStart }, a.chartInstance), !b.isHovered && l.colorObjs[g] && l.onPlotHover(g, !1)) : a._plotGraphicClick.call(this, d))
                },
                _plotDragMove: function(d, a, g, b, l) {
                    var e = this.data("plotItem").chart,
                        c = e.components.dataset[0].config;
                    isNaN(d) || isNaN(a) ||
                        !c.enableRotation || c.singletonCase || c.isRightClicked || (d = na.call(l, g, b, c.center, c.chartPosition, c.pieYScale), c.isRotating || (c.dragStartAngle !== d && (c.isRotating = !0), ha.raiseEvent("rotationStart", { startingAngle: fa(c.startAngle, !0) }, e.chartInstance)), a = d - c.dragStartAngle, c.dragStartAngle = d, c.moveDuration = 0, c._lastAngle += 180 * a / ta, d = (new Date).getTime(), c._lastTime && !(c._lastTime + c.timerThreshold < d)) || (c._lastTime || e._rotate(), c.timerId = setTimeout(function() { e.disposed && e.disposing || e._rotate() }, c.timerThreshold),
                            c._lastTime = d)
                },
                _stubRadius: function(d, a, g, b, l, e, c) { var f = this.components.dataset[0],
                        r = f.config,
                        w = ia(f.config.slicingdistance),
                        f = r.dataLabelOptions || (r.dataLabelOptions = f._parseDataLabelOptions()),
                        u = 0,
                        u = r.pieYScale;
                    g -= r.pieSliceDepth;
                    u = Aa(d / 2 - a - l, (g / 2 - e) / u) - b;
                    u >= c ? c = u : w || (l = b = Ba(Aa(b - (c - u), l), 10));
                    r.slicingDistance = l;
                    r.pieMinRadius = c;
                    f.distance = b; return c },
                _startingAngle: function(d, a) {
                    var g, b = this.components.dataset[0].config,
                        l = (g = b.startAngle) + (0 > g ? 360 : 0);
                    isNaN(d) || b.singletonCase || b.isRotating ||
                        (d += a ? l : 0, this._rotate(d), l = d);
                    return qa(100 * ((l %= 360) + (0 > l ? 360 : 0))) / 100
                }
            }, k.pie2d, { plotborderthickness: .1, alphaanimation: 1 });
            k("doughnut2d", {
                friendlyName: "Doughnut Chart",
                defaultDatasetType: "Doughnut2D",
                creditLabel: D,
                applicableDSList: { Doughnut2D: !0 },
                getPointColor: function(d, a, g) {
                    var c;
                    d = A(d);
                    a = n(a);
                    100 > g && ra ? (c = C(d, b(100 * (85 - .2 * (100 - g))) / 100), d = p(d, b(100 * (100 - .5 * g)) / 100), a = { FCcolor: { color: c + "," + d + "," + d + "," + c, alpha: a + "," + a + "," + a + "," + a, radialGradient: !0, gradientUnits: "userSpaceOnUse", r: g } }) : a = {
                        FCcolor: {
                            color: d +
                                "," + d,
                            alpha: a + "," + a,
                            ratio: "0,100"
                        }
                    };
                    return a
                },
                drawDoughnutCenterLabel: function(d, a, g, b, c, e, f) {
                    var k = this.components,
                        r = k.dataset[0].config;
                    e = e || r.lastCenterLabelConfig;
                    var k = k.paper,
                        w = this.linkedItems.smartLabel,
                        u = this.graphics,
                        F = u.datasetGroup,
                        t = e.padding,
                        h = 2 * e.textPadding,
                        m = { fontFamily: e.font, fontSize: e.fontSize + "px", lineHeight: 1.2 * e.fontSize + "px", fontWeight: e.bold ? "bold" : "", fontStyle: e.italic ? "italic" : "" },
                        p = 1.414 * (.5 * b - t) - h;
                    c = 1.414 * (.5 * c - t) - h;
                    var q;
                    w.setStyle(m);
                    w.useEllipsesOnOverflow(this.config.useEllipsesWhenOverflow);
                    w = w.getSmartText(d, p, c);
                    (c = u.doughnutCenterLabel) ? (c.attr("text") !== d && this.centerLabelChange(d), q = u.centerLabelOvalBg) : (e.bgOval && (u.centerLabelOvalBg = q = k.circle(a, g, .5 * b - t, F)), c = u.doughnutCenterLabel = k.text(F).hover(this.centerLabelRollover, this.centerLabelRollout).click(this.centerLabelClick), c.chart = this);
                    d ? (c.css(m).attr({
                        x: a,
                        y: g,
                        text: w.text,
                        visibility: Ea,
                        direction: r.textDirection,
                        fill: R({ FCcolor: { color: e.color, alpha: e.alpha } }),
                        "text-bound": e.bgOval ? "none" : [R({ FCcolor: { color: e.bgColor, alpha: e.bgAlpha } }),
                            R({ FCcolor: { color: e.borderColor, alpha: e.borderAlpha } }), e.borderThickness, e.textPadding, e.borderRadius
                        ]
                    }).tooltip(e.toolText || w.tooltext), e.bgOval && q && q.attr({ visibility: Ea, fill: Na(e.bgColor), "fill-opacity": e.bgAlpha / 100, stroke: Na(e.borderColor), "stroke-width": e.borderThickness, "stroke-opacity": e.borderAlpha / 100 })) : (c.attr("visibility", "hidden"), q && q.attr("visibility", "hidden"));
                    f && (r.lastCenterLabelConfig = e, r.centerLabelConfig = e)
                },
                centerLabelRollover: function() {
                    var d = this.chart,
                        a = d.config,
                        g = d.chartInstance,
                        b = g.ref,
                        c = d.components.dataset[0].config.lastCenterLabelConfig,
                        a = { height: a.height, width: a.width, pixelHeight: b.offsetHeight, pixelWidth: b.offsetWidth, id: g.id, renderer: g.args.renderer, container: d.linkedItems.container, centerLabelText: c && c.label };
                    this.attr("text") && ha.raiseEvent("centerLabelRollover", a, g, this, d.hoverOnCenterLabel)
                },
                centerLabelRollout: function() {
                    var d = this.chart,
                        a = d.config,
                        g = d.chartInstance,
                        b = g.ref,
                        c = d.components.dataset[0].config.lastCenterLabelConfig,
                        a = {
                            height: a.height,
                            width: a.width,
                            pixelHeight: b.offsetHeight,
                            pixelWidth: b.offsetWidth,
                            id: g.id,
                            renderer: g.args.renderer,
                            container: d.linkedItems.container,
                            centerLabelText: c && c.label
                        };
                    this.attr("text") && ha.raiseEvent("centerLabelRollout", a, g, this, d.hoverOffCenterLabel)
                },
                centerLabelClick: function() {
                    var d = this.chart,
                        a = d.config,
                        g = d.chartInstance,
                        b = g.ref,
                        c = d.components.dataset[0].config.lastCenterLabelConfig,
                        d = {
                            height: a.height,
                            width: a.width,
                            pixelHeight: b.offsetHeight,
                            pixelWidth: b.offsetWidth,
                            id: g.id,
                            renderer: g.args.renderer,
                            container: d.linkedItems.container,
                            centerLabelText: c && c.label
                        };
                    this.attr("text") && ha.raiseEvent("centerLabelClick", d, g)
                },
                centerLabelChange: function(d) { var a = this.config,
                        g = this.chartInstance,
                        b = g.ref;
                    ha.raiseEvent("centerLabelChanged", { height: a.height, width: a.width, pixelHeight: b.offsetHeight, pixelWidth: b.offsetWidth, id: g.id, renderer: g.args.renderer, container: this.linkedItems.container, centerLabelText: d }, g) },
                hoverOnCenterLabel: function() {
                    var d = this.chart.components.dataset[0].config.lastCenterLabelConfig;
                    (d.hoverColor || d.hoverAlpha) &&
                    this.attr({ fill: R({ FCcolor: { color: d.hoverColor || d.color, alpha: d.hoverAlpha || d.alpha } }) })
                },
                hoverOffCenterLabel: function() { var d = this.chart.components.dataset[0].config.lastCenterLabelConfig;
                    (d.hoverColor || d.hoverAlpha) && this.attr({ fill: R({ FCcolor: { color: d.color, alpha: d.alpha } }) }) }
            }, k.pie2d, { singletonPlaceValue: !1 });
            k("doughnut3d", {
                friendlyName: "3D Doughnut Chart",
                defaultDatasetType: "Doughnut3D",
                creditLabel: D,
                applicableDSList: { Doughnut3D: !0 },
                _configureManager: function() {
                    var d = this.components.dataset[0],
                        a = d.config,
                        g = d.components,
                        d = g.Pie3DManager,
                        g = g.data;
                    d && d.configure(a.pieSliceDepth, 1 === g.length, a.use3DLighting, !0)
                }
            }, k.pie3d);
            k("mscolumn2d", { standaloneInit: !0, friendlyName: "Multi-series Column Chart", creditLabel: D, defaultDatasetType: "column", applicableDSList: { column: !0 }, eiMethods: {} }, k.mscartesian);
            k("mscolumn3d", {
                standaloneInit: !0,
                defaultDatasetType: "column3d",
                friendlyName: "Multi-series 3D Column Chart",
                applicableDSList: { column3d: !0 },
                defaultPlotShadow: 1,
                fireGroupEvent: !0,
                is3D: !0,
                creditLabel: D,
                defaultZeroPlaneHighlighted: !1
            }, k.mscartesian3d, { showplotborder: 0 });
            k("msbar2d", { standaloneInit: !0, friendlyName: "Multi-series Bar Chart", isBar: !0, hasLegend: !0, creditLabel: D, defaultDatasetType: "bar2d", applicableDSList: { bar2d: !0 } }, k.msbarcartesian);
            k("msbar3d", { standaloneInit: !0, defaultSeriesType: "bar3d", friendlyName: "Multi-series 3D Bar Chart", fireGroupEvent: !0, defaultPlotShadow: 1, is3D: !0, isBar: !0, hasLegend: !0, creditLabel: D, defaultZeroPlaneHighlighted: !1, defaultDatasetType: "bar3d", applicableDSList: { bar3d: !0 } },
                k.msbarcartesian3d, { showplotborder: 0 });
            k("msarea", { standaloneInit: !0, friendlyName: "Multi-series Area Chart", creditLabel: D, defaultDatasetType: "area", defaultPlotShadow: 0, applicableDSList: { area: !0 } }, k.areabase);
            k("msline", { standaloneInit: !0, friendlyName: "Multi-series Line Chart", creditLabel: D, defaultDatasetType: "line", defaultPlotShadow: 1, axisPaddingLeft: 0, axisPaddingRight: 0, applicableDSList: { line: !0 } }, k.areabase, { zeroplanethickness: 1, zeroplanealpha: 40, showzeroplaneontop: 0 });
            k("stackedarea2d", {
                friendlyName: "Stacked Area Chart",
                showsum: 0,
                creditLabel: D
            }, k.msarea, { plotfillalpha: Qa, isstacked: 1 });
            k("stackedcolumn2d", { friendlyName: "Stacked Column Chart", creditLabel: D }, k.mscolumn2d, { isstacked: !0 });
            k("stackedcolumn3d", { friendlyName: "3D Stacked Column Chart", creditLabel: D }, k.mscolumn3d, { showplotborder: 0 }, k.stackedcolumn2d);
            k("stackedbar2d", { friendlyName: "Stacked Bar Chart", creditLabel: D }, k.msbar2d, { maxbarheight: 50 }, k.stackedcolumn2d);
            k("stackedbar3d", { friendlyName: "3D Stacked Bar Chart", creditLabel: D }, k.msbar3d, { showplotborder: 0 },
                k.stackedcolumn2d);
            k("marimekko", {
                standaloneInit: !0,
                friendlyName: "Marimekko Chart",
                isValueAbs: !0,
                distributedColumns: !0,
                stack100percent: !0,
                defaultDatasetType: "marimekko",
                applicableDSList: { marimekko: !0 },
                isStacked: !0,
                showsum: 1,
                creditLabel: D,
                _setAxisLimits: function() {
                    var d = this.components,
                        a = d.dataset,
                        g = d.yAxis,
                        d = d.xAxis,
                        b, c = a.length,
                        e, f = -Infinity,
                        k = Infinity,
                        r = Infinity,
                        w = -Infinity,
                        u, F, t = {};
                    u = this.config.categories;
                    var h = [],
                        m = function(d) {
                            f = Ba(f, d.max);
                            k = Aa(k, d.min);
                            w = Ba(w, d.xMax || -Infinity);
                            r = Aa(r, d.xMin ||
                                Infinity)
                        };
                    for (e = 0; e < c; e++) b = a[e], (F = b.groupManager) ? t[b.type] = F : h.push(b);
                    for (F in t) a = t[F].getDataLimits(), m(a);
                    c = h.length;
                    for (e = 0; e < c; e++) a = h[e].getDataLimits(), m(a); - Infinity === f && (f = 0);
                    Infinity === k && (k = 0);
                    g[0].setAxisConfig({ isPercent: this.config.isstacked ? this.config.stack100percent : 0 });
                    g[0].setDataLimit(f, k);
                    if (-Infinity !== w || Infinity !== r) d[0].config.xaxisrange = { max: w, min: r }, d[0].setDataLimit(w, r);
                    g = t[F].getStackSumPercent();
                    e = g.length;
                    F = d[0].getCategoryLen();
                    F > e && u.splice(e, F - e);
                    this._setCategories();
                    e = d[0].getLimit();
                    r = e.min;
                    w = e.max;
                    u = r;
                    F = w - r;
                    for (e = 0; e < g.length; e++) a = g[e], c = F * a / 100, a = u + c / 2, d[0].updateCategory(e, { x: a }), u += c
                }
            }, k.mscartesian, { isstacked: !0, showpercentvalues: 0, usepercentdistribution: 1, showsum: 1 });
            k("msstackedcolumn2d", {
                standaloneInit: !0,
                defaultDatasetType: "column",
                applicableDSList: { column: !0 },
                friendlyName: "Multi-series Stacked Column Chart",
                _createDatasets: function() {
                    var d = this.components,
                        a = this.jsonData,
                        g = a.dataset,
                        b = g && g.length || 0,
                        c, e, f, k = this.defaultDatasetType,
                        r = this.applicableDSList,
                        w, u, F, t, h, m, p = a.lineset || [],
                        q = this.config,
                        v = q.dataSetMap,
                        C = q.lineSetMap,
                        D = v && v.length,
                        A = d.legend,
                        n = [],
                        B = [],
                        x = 0;
                    F = 0;
                    var I, K = -1,
                        J, y = this.config.catLen,
                        z = d.xAxis[0],
                        H, S, O = d.dataset;
                    if (g || 0 !== p.length) {
                        this.config.categories = a.categories && a.categories[0].category;
                        e = d.dataset = [];
                        for (a = 0; a < b; a++) {
                            h = g[a];
                            K++;
                            if (h.dataset)
                                for (S = !0, m = h.dataset && h.dataset.length || 0, n[a] = [], c = 0; c < m; c++) {
                                    if (F = h.dataset[c], w = (w = za(F.renderas, k)) && w.toLowerCase(), r[w] || (w = k), f = FusionCharts.get("component", ["dataset", w])) t = "datasetGroup_" +
                                        w, u = FusionCharts.register("component", ["datasetGroup", w]), w = d[t], u && !w ? (w = d[t] = new u, w.chart = this, w.init()) : w && v && 0 !== v.length && !I && (w.init(), I = !0), v && v[a] && v[a][c] ? (f = v[a][c], f.index = x, t = f.JSONData, u = t.data.length, t = F.data && F.data.length || 0, J = z.getCategoryLen(), H = y - J, u -= t, u = this._getDiff(u, t, H, J), t = u.diff, u = u.startIndex, 0 < t && f.removeData(u, t, !1), f.JSONData = F, f.configure()) : (f = new f, f.chart = this, f.index = x, f.init(F)), x++, n[a].push(f), e.push(f), w && w.addDataSet(f, K, c)
                                } else m = c = 0, K--;
                            h = v && v[a] && v[a].length;
                            if (h > m)
                                for (F = c, h = h - m + c; F < h; F++) w = v[a][F], A.removeItem(w.legendItemId), wa.call(w)
                        }
                        if (D > b)
                            for (F = a, h = D - b + a; F < h; F++)
                                for (m = v[F].length, c = 0; c < m; c++) w = v[F][c], A.removeItem(w.legendItemId), wa.call(w);
                        q.dataSetMap = n;
                        if (this.lineset) {
                            a = 0;
                            for (b = p.length; a < b; a++) g = p[a], f = FusionCharts.get("component", ["dataset", "line"]), f = new f, C && C[a] ? (f = C[a], f.index = x, t = f.JSONData, u = t.data.length, t = g.data && g.data.length || 0, u > t && f.removeData(t, u - t, !1), f.JSONData = g, f.configure()) : (f.chart = this, f.index = x, f.init(g)), B.push(f), e.push(f),
                                x++;
                            p = C && C.length;
                            if (p > b)
                                for (F = a, h = p - b + a; F < h; F++) w = C[F], A.removeItem(w.legendItemId), wa.call(w);
                            q.lineSetMap = B
                        }
                        S ? this.config.catLen = z.getCategoryLen() : (d.dataset = O, this.setChartMessage())
                    } else this.setChartMessage()
                },
                creditLabel: D
            }, k.mscartesian, { isstacked: !0 });
            k("mscombi2d", {
                friendlyName: "Multi-series Combination Chart",
                standaloneInit: !0,
                creditLabel: D,
                defaultDatasetType: "column",
                applicableDSList: { line: !0, area: !0, column: !0 },
                _createDatasets: function() {
                    var d = this.components,
                        a = this.jsonData,
                        g = a.dataset,
                        b = g && g.length,
                        c, e, f = this.defaultDatasetType,
                        k = this.applicableDSList;
                    c = this.components.legend;
                    var r = d.xAxis[0],
                        w, u, h, t, m, p = this.config.isstacked,
                        q, v, C = [],
                        D = {},
                        A = this.config,
                        n = this.config.catLen,
                        B = A.datasetMap || (A.datasetMap = { line: [], area: [], column: [], column3d: [], scrollcolumn2d: [] }),
                        x = { line: [], area: [], column: [], column3d: [], scrollcolumn2d: [] };
                    g || this.setChartMessage();
                    this.config.categories = a.categories && a.categories[0].category;
                    a = d.dataset = [];
                    c && c.emptyItems();
                    for (c = 0; c < b; c++)
                        if (m = g[c], t = m.parentyaxis ||
                            "", u = (u = this.config.isdual && "s" === t.toLowerCase() ? "line" === this.defaultSecondaryDataset ? this.sDefaultDatasetType : za(m.renderas, this.sDefaultDatasetType) : za(m.renderas, f)) && u.toLowerCase(), k[u] || (u = f), h = FusionCharts.get("component", ["dataset", u])) void 0 === D[u] ? D[u] = 0 : D[u]++, e = "datasetGroup_" + u, t = FusionCharts.register("component", ["datasetGroup", u]), (w = d[e]) && C.push(w), t && !w && (w = d[e] = new t, w.chart = this, w.init()), t = B[u], (e = t[0]) ? (delete e.legendItemId, w = r.getCategoryLen(), h = n - w, v = e.JSONData, q = v.data &&
                            v.data.length, v = m.data && m.data.length || 0, q -= v, h = this._getDiff(q, v, h, w), w = h.diff, h = h.startIndex, 0 < w && e.removeData(h, w, !1), e.index = c, e.JSONData = m, e.configure(), t.splice(0, 1)) : (e = new h, e.chart = this, e.index = c, w && (p ? w.addDataSet(e, 0, D[u]) : w.addDataSet(e, D[u], 0)), e.init(m)), x[u].push(e), a.push(e);
                    for (g in B)
                        if (t = B[g], f = t[0] && t[0].groupManager, b = t.length, k = void 0 === D[g] ? 0 : D[g] + 1, b)
                            for (p && f && f.removeDataSet(0, k, b), d = 0; d < b; d++) f && !p && f.removeDataSet(k, 0, 1), "column" === t[d].type && !0 === this.is3D ? (t[d].visible = !1, t[d].draw()) : wa.call(t[d]);
                    A.datasetMap = x;
                    this.config.catLen = r.getCategoryLen()
                }
            }, k.areabase);
            k("mscombi3d", { standaloneInit: !0, friendlyName: "Multi-series 3D Combination Chart", defaultDatasetType: "column3d", is3D: !0, creditLabel: D, defaultPlotShadow: 1, applicableDSList: { column3d: !0, line: !0, area: !0 }, _createDatasets: k.mscombi2d }, k.mscartesian3d, { showplotborder: 0 }, k.areabase);
            k("mscolumnline3d", {
                friendlyName: "Multi-series Column and Line Chart",
                is3D: !0,
                creditLabel: D,
                defaultPlotShadow: 1,
                applicableDSList: {
                    column3d: !0,
                    line: !0
                }
            }, k.mscombi3d, { use3dlineshift: 1, showplotborder: 0 }, k.msarea);
            k("stackedcolumn2dline", { friendlyName: "Stacked Column and Line Chart", defaultDatasetType: "column", creditLabel: D, applicableDSList: { line: !0, column: !0 } }, k.mscombi2d, { isstacked: !0, stack100percent: 0 }, k.msarea);
            k("stackedcolumn3dline", { friendlyName: "Stacked 3D Column and Line Chart", is3D: !0, creditLabel: D, applicableDSList: { column3d: !0, line: !0 } }, k.mscombi3d, { use3dlineshift: 1, isstacked: !0, stack100percent: 0, showplotborder: 0 }, k.msarea);
            k("mscombidy2d", { standaloneInit: !0, friendlyName: "Multi-series Dual Y-Axis Combination Chart", defaultDatasetType: "column", sDefaultDatasetType: "line", _createDatasets: k.mscombi2d, creditLabel: D, applicableDSList: { column: !0, line: !0, area: !0 } }, k.msdybasecartesian, { isdual: 1 }, k.msarea);
            k("mscolumn3dlinedy", {
                standaloneInit: !0,
                friendlyName: "Multi-series 3D Column and Line Chart",
                defaultDatasetType: "column3d",
                sDefaultDatasetType: "line",
                is3D: !0,
                creditLabel: D,
                _createDatasets: k.mscombi2d,
                defaultPlotShadow: 1,
                applicableDSList: {
                    column3d: !0,
                    line: !0
                }
            }, k.msdybasecartesian3d, { use3dlineshift: 1, isdual: !0, showplotborder: 0 }, k.msarea);
            k("stackedcolumn3dlinedy", { standaloneInit: !0, friendlyName: "Stacked 3D Column and Line Chart", is3D: !0, defaultDatasetType: "column3d", creditLabel: D, sDefaultDatasetType: "line", defaultSecondaryDataset: "line", _createDatasets: k.mscombi2d, applicableDSList: { column3d: !0, line: !0 } }, k.msdybasecartesian3d, { use3dlineshift: 1, isdual: !0, isstacked: !0, showplotborder: 0 }, k.msarea);
            k("msstackedcolumn2dlinedy", {
                standaloneInit: !0,
                friendlyName: "Multi-series Dual Y-Axis Stacked Column and Line Chart",
                stack100percent: 0,
                defaultDatasetType: "column",
                sDefaultDatasetType: "line",
                hasLineSet: !0,
                creditLabel: D,
                applicableDSList: { column: !0 },
                lineset: !0,
                _createDatasets: k.msstackedcolumn2d
            }, k.msdybasecartesian, { isdual: !0, haslineset: !0, isstacked: !0 }, k.msarea);
            k("scrollcolumn2d", {
                standaloneInit: !0,
                friendlyName: "Scrollable Multi-series Column Chart",
                tooltipConstraint: "plot",
                canvasborderthickness: 1,
                creditLabel: D,
                defaultDatasetType: "scrollcolumn2d",
                applicableDSList: { scrollcolumn2d: !0 },
                avgScrollPointWidth: 40,
                hasScroll: !0,
                defaultPlotShadow: 1,
                _manageScrollerPosition: function() { var d = this.config,
                        a;
                    a = this._scrollBar.get; var g = this.components.scrollBar,
                        b;
                    a = a()[0];
                    g.setConfiguaration(a.conf);
                    a = d.scrollEnabled;
                    b = g.getLogicalSpace();
                    this._allocateSpace({ bottom: d.shift = !1 === a ? 0 : b.height + g.conf.padding }) },
                _resetViewPortConfig: function() { this.config.viewPortConfig = { scaleX: 1, scaleY: 1, x: 0, y: 0 } },
                updateManager: function(d) {
                    var a = this.config,
                        g = this.config.viewPortConfig,
                        b = g.scaleX,
                        c = this.graphics.datasetGroup,
                        e = this.graphics.datalabelsGroup,
                        f = this.graphics.trackerGroup,
                        h = a.canvasWidth * (b - 1) * d,
                        r = this.components.xAxis[0],
                        w = this.graphics.sumLabelsLayer;
                    g.x = h / b;
                    g = "t" + -qa(h) + ",0";
                    a.lastScrollPosition = d;
                    c.attr({ transform: g });
                    e.attr({ transform: g });
                    f.attr({ transform: g });
                    w && w.attr({ transform: g });
                    d = r.getAxisConfig("animateAxis");
                    a = r.getAxisConfig("drawAxisName");
                    r.setAxisConfig({ animateAxis: !1, drawAxisName: !1 });
                    r.draw();
                    r.setAxisConfig({ animateAxis: d, drawAxisName: a })
                },
                _createToolBox: function() {
                    var d = this.components,
                        a = this._scrollBar,
                        g = a.get,
                        b =
                        a.add,
                        c, e, f = d.scrollBar;
                    k.mscartesian._createToolBox.call(this);
                    c = d.tb;
                    e = (d.toolBoxAPI || c.getAPIInstances(c.ALIGNMENT_HORIZONTAL)).Scroller;
                    a.clear();
                    b({ isHorizontal: !0 }, { scroll: function(d) { return function() { d.updateManager.apply(d, arguments) } }(this) });
                    a = g()[0];
                    f || (d.scrollBar = (new e(a.conf, c.idCount, c.pId)).attachEventHandlers(a.handler))
                },
                _setAxisScale: function() {
                    var d = this.config,
                        a = this.components.xAxis[0].getCategoryLen(),
                        g = this.jsonData,
                        c = d.scrollOptions || (d.scrollOptions = {}),
                        f = this.components.dataset,
                        e = f.length,
                        h, k, r = 0,
                        w;
                    w = d.canvasWidth;
                    var u = d.scrollToEnd,
                        m = d.lastScrollPosition,
                        g = ia(g.chart.numvisibleplot, b(d.width / this.avgScrollPointWidth));
                    for (k = 0; k < e; k++) h = f[k], "column" === h.type && r++;
                    this.config.isstacked && (r = 1);
                    a *= r || 1;
                    2 <= g && g < a ? (d.viewPortConfig.scaleX = a /= g, w = w * (a - 1) * (void 0 !== m ? m : u ? 1 : 0), d.viewPortConfig.x = w / a, c.vxLength = g / e, d.scrollEnabled = !0) : d.scrollEnabled = !1
                },
                drawScrollBar: function() {
                    var d = this,
                        a = d.config,
                        g = a.viewPortConfig,
                        c = d.components,
                        b = d.graphics,
                        e = c.paper,
                        f = c.xAxis[0],
                        h = f.config,
                        r = f.config.axisRange,
                        k = a.scrollOptions || (a.scrollOptions = {}),
                        u = r.max,
                        m = r.min,
                        t = k.vxLength,
                        p = c.scrollBar,
                        r = p.node,
                        q = a.scrollToEnd,
                        v = a.lastScrollPosition,
                        C = g.scaleX,
                        D, A, B, n, x;
                    n = void 0 !== v ? v : q ? 1 : 0;
                    g = a.canvasLeft;
                    q = a.canvasTop;
                    v = a.canvasHeight;
                    D = a.canvasWidth;
                    c = c.canvas.config;
                    A = c.canvasBorderWidth;
                    B = h.showAxisLine ? h.axisLineThickness || 0 : 0;
                    x = ia(A, h.lineStartExtension);
                    h = ia(A, h.lineEndExtension);
                    k.viewPortMin = m;
                    k.viewPortMax = u;
                    C = k.scrollRatio = 1 / C;
                    t = k.windowedCanvasWidth = f.getAxisPosition(t);
                    f = k.fullCanvasWidth =
                        f.getAxisPosition(u - m) - t;
                    k = b.scrollBarParentGroup;
                    k || (k = b.scrollBarParentGroup = e.group("scrollBarParentGroup", b.parentGroup).insertBefore(b.datalabelsGroup));
                    !1 !== a.scrollEnabled ? (p.draw(g - x, q + v + A + B - 2, { width: D + x + h, scrollRatio: C, roundEdges: c.isRoundEdges, fullCanvasWidth: f, windowedCanvasWidth: t, scrollPosition: n, parentLayer: k }), !r && function() {
                        var a;
                        oa.eve.on("raphael.scroll.start." + p.node.id, function(g) { a = g;
                            ha.raiseEvent("scrollstart", { scrollPosition: g }, d.chartInstance) });
                        oa.eve.on("raphael.scroll.end." +
                            p.node.id,
                            function(g) { ha.raiseEvent("scrollend", { prevScrollPosition: a, scrollPosition: g }, d.chartInstance) })
                    }()) : p && p.node && p.node.hide()
                },
                _drawDataset: function() { this._setClipping();
                    k.mscartesian._drawDataset.call(this) },
                _setClipping: function() {
                    var a = this.config,
                        c = this.graphics.datasetGroup,
                        g = this.graphics.datalabelsGroup,
                        b = this.graphics.trackerGroup,
                        f = a.viewPortConfig,
                        e = this.graphics.sumLabelsLayer,
                        k = f.scaleX,
                        h = this.get("config", "animationObj"),
                        r = h.duration,
                        m = h.dummyObj,
                        u = h.animObj,
                        h = h.animType,
                        f =
                        f.x,
                        a = a.height,
                        F = this.components.canvas.config.clip["clip-canvas"],
                        F = F && F.slice(0) || [];
                    this.config.clipSet ? (c.animateWith(m, u, { "clip-rect": F }, r, h), g.animateWith(m, u, { "clip-rect": F }, r, h), b.attr({ "clip-rect": F }), F[3] = a, F[1] = 0, e && e.animateWith(m, u, { "clip-rect": F }, r, h)) : (c.attr({ "clip-rect": F }), g.attr({ "clip-rect": F }), b.attr({ "clip-rect": F }), F[3] = a, F[1] = 0, e && e.attr({ "clip-rect": F }));
                    c.attr({ transform: "T" + -(f * k) + ",0" });
                    g.attr({ transform: "T" + -(f * k) + ",0" });
                    b.attr({ transform: "T" + -(f * k) + ",0" });
                    e && e.attr({
                        transform: "T" +
                            -(f * k) + ",0"
                    });
                    this.config.clipSet = !0
                },
                configure: function() { var a = this.jsonData.chart,
                        c;
                    k.mscolumn2d.configure.call(this);
                    c = this.config;
                    c.scrollToEnd = ia(a.scrolltoend, 0);
                    c.lastScrollPosition = void 0 }
            }, k.scrollbase);
            k("scrollarea2d", {
                friendlyName: "Scrollable Multi-series Area Chart",
                tooltipConstraint: "plot",
                canvasborderthickness: 1,
                creditLabel: D,
                hasScroll: !0,
                defaultDatasetType: "scrollarea2d",
                applicableDSList: { scrollarea2d: !0 },
                avgScrollPointWidth: 75,
                defaultPlotShadow: 0,
                _setAxisScale: function() {
                    var a = this.config,
                        c = this.components.xAxis[0].getCategoryLen(),
                        g = this.jsonData,
                        f = a.scrollOptions || (a.scrollOptions = {}),
                        l;
                    l = a.lastScrollPosition;
                    var e = a.scrollToEnd,
                        h = a.canvasWidth,
                        g = ia(g.chart.numvisibleplot, b(a.width / this.avgScrollPointWidth));
                    2 <= g && g < c ? (a.viewPortConfig.scaleX = c /= g, l = h * (c - 1) * (void 0 !== l ? l : e ? 1 : 0), a.viewPortConfig.x = l / c, f.vxLength = g, a.scrollEnabled = !0) : a.scrollEnabled = !1
                }
            }, k.scrollcolumn2d, {}, k.areabase);
            k("scrollline2d", {
                friendlyName: "Scrollable Multi-series Line Chart",
                tooltipConstraint: "plot",
                canvasborderthickness: 1,
                defaultDatasetType: "line",
                creditLabel: D,
                avgScrollPointWidth: 75,
                defaultPlotShadow: 1
            }, k.scrollarea2d, { zeroplanethickness: 1, zeroplanealpha: 40, showzeroplaneontop: 0 }, k.areabase);
            k("scrollstackedcolumn2d", { friendlyName: "Scrollable Stacked Column Chart", canvasborderthickness: 1, tooltipConstraint: "plot", avgScrollPointWidth: 75, creditLabel: D }, k.scrollcolumn2d, {}, k.stackedcolumn2d);
            k("scrollcombi2d", {
                friendlyName: "Scrollable Combination Chart",
                tooltipConstraint: "plot",
                hasScroll: !0,
                canvasborderthickness: 1,
                avgScrollPointWidth: 40,
                applicableDSList: { area: !0, line: !0, column: !0 },
                creditLabel: D,
                _createDatasets: k.mscombi2d
            }, k.scrollcolumn2d, {}, k.msarea);
            k("scrollcombidy2d", {
                friendlyName: "Scrollable Dual Y-Axis Combination Chart",
                tooltipConstraint: "plot",
                canvasborderthickness: 1,
                avgScrollPointWidth: 40,
                hasScroll: !0,
                _drawDataset: k.scrollcolumn2d,
                updateManager: k.scrollcolumn2d,
                _setAxisScale: k.scrollcolumn2d,
                _createToolBox: k.scrollcolumn2d,
                _scrollBar: k.scrollcolumn2d,
                _manageScrollerPosition: k.scrollcolumn2d,
                drawScrollBar: k.scrollcolumn2d,
                _setClipping: k.scrollcolumn2d,
                creditLabel: D,
                configure: k.scrollcolumn2d
            }, k.mscombidy2d, { isdual: !0 }, k.areabase);
            k("scatter", { friendlyName: "Scatter Chart", isXY: !0, standaloneInit: !0, hasLegend: !0, defaultZeroPlaneHighlighted: !1, creditLabel: D, defaultDatasetType: "Scatter", applicableDSList: { Scatter: !0 } }, k.scatterBase);
            Ua(U.eventList, { zoomedOut: "FC_ZoomedOut" });
            k("bubble", {
                friendlyName: "Bubble Chart",
                standaloneInit: !0,
                defaultDatasetType: "bubble",
                creditLabel: D,
                applicableDSList: { bubble: !0 },
                getDataLimits: function() {
                    var a =
                        this.components.dataset,
                        c, g, b, f = -Infinity,
                        e = Infinity;
                    c = 0;
                    for (b = a.length; c < b; c++) g = a[c], g = g.getDataLimits(), f = Ba(f, g.zMax || -Infinity), e = Aa(e, g.zMin || Infinity);
                    f = -Infinity === f ? 0 : f;
                    e = Infinity === e ? 0 : e;
                    return { zMax: f, zMin: e }
                }
            }, k.scatter);
            oa._availableAnimAttrs && oa._availableAnimAttrs.cx && (oa._availableAnimAttrs.innerR = oa._availableAnimAttrs.depth = oa._availableAnimAttrs.radiusYFactor = oa._availableAnimAttrs.start = oa._availableAnimAttrs.end = oa._availableAnimAttrs.cx);
            la.prototype = {
                configure: function(a, c, g,
                    b) {
                    var f = this.linkedItems.chart,
                        e = f.get("components", "paper"),
                        f = f.get("graphics", "datasetGroup");
                    "object" === typeof a && (a = a.depth, c = a.hasOnePoint, g = a.use3DLighting, b = a.isDoughnut);
                    this.renderer || (this.renderer = e);
                    this.hasOnePoint = c;
                    this.use3DLighting = g;
                    this.isDoughnut = b;
                    this.depth = a;
                    !this.bottomBorderGroup && (this.bottomBorderGroup = e.group("bottom-border", f));
                    this.bottomBorderGroup.attr({ transform: "t0," + a });
                    !this.slicingWallsBackGroup && (this.slicingWallsBackGroup = e.group("slicingWalls-back-Side", f));
                    !this.slicingWallsFrontGroup && (this.slicingWallsFrontGroup = e.group("slicingWalls-front-Side", f));
                    !this.topGroup && (this.topGroup = e.group("top-Side", f));
                    !this.pointElemStore && (this.pointElemStore = []);
                    !this.slicingWallsArr && (this.slicingWallsArr = []);
                    this.moveCmdArr = ["M"];
                    this.lineCmdArr = ["L"];
                    this.closeCmdArr = ["Z"];
                    this.colorObjs = []
                },
                getArcPath: function(a, c, b, f, l, e, h, k, r, m) { return b == l && f == e ? [] : ["A", h, k, 0, m, r, l, e] },
                _parseSliceColor: function(a, c, b) {
                    var f, l, e, h, k, r, m, u, F, t, q, v, D, A, B;
                    B = 3;
                    var n = (f = this.use3DLighting) ?
                        Z : X,
                        K = b.radiusYFactor,
                        G = b.cx,
                        P = b.cy,
                        aa = b.r,
                        N = aa * K,
                        fa = b.innerR || 0,
                        sb = G + aa,
                        J = G - aa,
                        y = G + fa,
                        z = G - fa;
                    c = c || 100;
                    b = c / 2;
                    n[a] && n[a][c] ? n = n[a][c] : (n[a] || (n[a] = {}), n[a][c] || (n[a][c] = {}), n = n[a][c], f ? (f = C(a, 80), l = C(a, 75), r = p(a, 85), m = p(a, 70), u = p(a, 40), F = p(a, 50), p(a, 30), t = p(a, 65), C(a, 85), e = C(a, 69), h = C(a, 75), k = C(a, 95)) : (B = 10, f = C(a, 90), l = C(a, 87), r = p(a, 93), m = p(a, 87), u = p(a, 80), t = F = p(a, 85), p(a, 80), k = C(a, 85), e = C(a, 75), h = C(a, 80)), q = l + x + r + x + m + x + r + x + l, D = c + x + c + x + c + x + c + x + c, v = l + x + a + x + r + x + a + x + l, A = b + x + b + x + b + x + b + x + b, u = l + x + a + x + u +
                        x + a + x + l, e = h + x + r + x + F + x + r + x + e, h = "FFFFFF" + x + "FFFFFF" + x + "FFFFFF" + x + "FFFFFF" + x + "FFFFFF", B = 0 + x + b / B + x + c / B + x + b / B + x + 0, n.top = ra ? { FCcolor: { gradientUnits: "userSpaceOnUse", radialGradient: !0, color: t + x + k, alpha: c + x + c, ratio: "0,100" } } : { FCcolor: { gradientUnits: "objectBoundingBox", color: m + x + m + x + r + x + l, alpha: c + x + c + x + c + x + c, angle: -72, ratio: "0,8,15,77" } }, n.frontOuter = { FCcolor: { gradientUnits: "userSpaceOnUse", y1: 0, y2: 0, color: e, alpha: D, angle: 0, ratio: "0,20,15,15,50" } }, n.backOuter = {
                            FCcolor: {
                                gradientUnits: "userSpaceOnUse",
                                y1: 0,
                                y2: 0,
                                color: u,
                                alpha: A,
                                angle: 0,
                                ratio: "0,62,8,8,22"
                            }
                        }, n.frontInner = { FCcolor: { gradientUnits: "userSpaceOnUse", y1: 0, y2: 0, color: v, alpha: A, angle: 0, ratio: "0,25,5,5,65" } }, n.backInner = { FCcolor: { gradientUnits: "userSpaceOnUse", y1: 0, y2: 0, color: q, alpha: D, angle: 0, ratio: "0,62,8,8,22" } }, n.topBorder = { FCcolor: { gradientUnits: "userSpaceOnUse", y1: 0, y2: 0, color: h, alpha: B, angle: 0, ratio: "0,20,15,15,50" } }, n.topInnerBorder = { FCcolor: { gradientUnits: "userSpaceOnUse", y1: 0, y2: 0, color: h, alpha: B, angle: 0, ratio: "0,50,15,15,20" } }, n.bottom =
                        R(I(a, b)), n.startSlice = R(I(f, c)), n.endSlice = R(I(f, c)));
                    if (n.cx !== G || n.cy !== P || n.rx !== aa || n.radiusYFactor !== K || n.innerRx !== fa) ra && (n.top.FCcolor.cx = G, n.top.FCcolor.cy = P, n.top.FCcolor.r = aa, n.top.FCcolor.fx = G - .3 * aa, n.top.FCcolor.fy = P + 1.2 * N), n.topBorder.FCcolor.x1 = n.backOuter.FCcolor.x1 = n.frontOuter.FCcolor.x1 = J, n.topBorder.FCcolor.x2 = n.backOuter.FCcolor.x2 = n.frontOuter.FCcolor.x2 = sb, n.topInnerBorder.FCcolor.x1 = n.backInner.FCcolor.x1 = n.frontInner.FCcolor.x1 = z, n.topInnerBorder.FCcolor.x2 = n.backInner.FCcolor.x2 =
                        n.frontInner.FCcolor.x2 = y, n.cx = G, n.cy = P, n.rx = aa, n.radiusYFactor = K, n.innerRx = fa;
                    return n
                },
                rotate: function(a) { var c = this.pointElemStore,
                        b = 0,
                        f = c.length,
                        l; if (!this.hasOnePoint) { for (; b < f; b += 1) l = c[b], l = l._confObject, l.start += a, l.end += a, this._setSliceShape(l);
                        this.refreshDrawing() } },
                removeSlice: function(a) {
                    var c = this.pointElemStore,
                        b = a._confObject.elements,
                        f = this.slicingWallsArr,
                        l;
                    l = c.length;
                    var e;
                    for (--l; 0 <= l; --l) e = c[l], e === a && c.splice(l, 1);
                    l = f.length;
                    for (--l; 0 <= l; --l) c = f[l], c !== b.startSlice && c !== b.frontOuter1 &&
                        c !== b.frontOuter && c !== b.backInner && c !== b.endSlice || f.splice(l, 1);
                    a.hide && a.hide();
                    this._slicePool || (this._slicePool = []);
                    this._slicePool.push(a);
                    this.refreshDrawing()
                },
                useSliceFromPool: function() { var a = this._slicePool || (this._slicePool = []),
                        c = this.slicingWallsArr,
                        b = !1;
                    a.length && (b = a.shift(), this.pointElemStore.push(b), b.show(), a = b._confObject.elements, c.push(a.startSlice, a.frontOuter1, a.frontOuter), a.backInner && c.push(a.backInner), c.push(a.endSlice)); return b },
                refreshDrawing: function() {
                    var a = function(a,
                        d) { return a._conf.index - d._conf.index || a._conf.cIndex - d._conf.cIndex || a._conf.isStart - d._conf.isStart || a._conf.si - d._conf.si };
                    return function() {
                        var c = this.slicingWallsArr,
                            b = 0,
                            h, l = c.length,
                            e, k, p, r, w = this.slicingWallsFrontGroup,
                            u = this.slicingWallsBackGroup;
                        c.sort(a);
                        a: { var F = c[0] && c[0]._conf.index,
                                t, q;r = F <= m;e = 1; for (h = c.length; e < h; e += 1)
                                if (q = c[e]._conf.index, t = q <= m, t != r || q < F) break a;e = 0 }
                        for (; b < l; b += 1, e += 1) e === l && (e = 0), h = c[e], r = h._conf.index, r < f ? w.appendChild(h) : r <= m ? (k ? h.insertBefore(k) : w.appendChild(h),
                            k = h) : r <= v ? (p ? h.insertBefore(p) : u.appendChild(h), p = h) : u.appendChild(h)
                    }
                }(),
                _setSliceShape: function(a, c) {
                    var b = this.getArcPath,
                        h = a.start,
                        l = a.end,
                        e = fa(h),
                        k = fa(l),
                        p, r, w, u, F, t, n, C, D, A, B, x, K, I, P, G, Z, aa = this.isDoughnut,
                        N = a.radiusYFactor,
                        J = a.cx,
                        y = a.cy,
                        z = a.r,
                        H = z * N,
                        S = z + (ra ? -1 : 2),
                        O = H + (ra ? -1 : 2),
                        W = a.innerR || 0,
                        E = W * N,
                        T = this.depth,
                        Q = T + y,
                        X = J + z,
                        R = J - z,
                        ga = J + W,
                        U = J - W,
                        ha = y - H,
                        ja = ["M", U, ha, "L", U, Q + H, "Z"],
                        N = a.elements,
                        M, ea, V, ka, ia, da = "path",
                        ma = (e + k) / 2,
                        la = e > k;
                    r = pa(e);
                    w = va(e);
                    u = pa(k);
                    F = va(k);
                    t = J + z * r;
                    n = y + H * w;
                    C = J + S * r;
                    D = y + O * w;
                    M = n + T;
                    ea = J + z * u;
                    V = y + H * F;
                    A = J + S * u;
                    B = y + O * F;
                    ka = V + T;
                    aa ? (x = J + W * r, K = y + E * w, G = K + T, I = J + W * u, P = y + E * F, Z = P + T, a.startSlice = ["M", t, n, "L", t, M, x, G, x, K, "Z"], a.endSlice = ["M", ea, V, "L", ea, ka, I, Z, I, P, "Z"]) : (a.startSlice = ["M", t, n, "L", t, M, J, Q, J, y, "Z"], a.endSlice = ["M", ea, V, "L", ea, ka, J, Q, J, y, "Z"]);
                    ra ? (p = (e > k ? q : 0) + k - e, a.clipTopPath = aa ? [
                        ["M", t, n, "A", z, H, 0, p > m ? 1 : 0, 1, ea, V, "L", I, P, "A", W, E, 0, p > m ? 1 : 0, 0, x, K, "Z"]
                    ] : [
                        ["M", t, n, "A", z, H, 0, p > m ? 1 : 0, 1, ea, V, "L", J, y, "Z"]
                    ], a.clipOuterFrontPath1 = [ja], a.clipTopBorderPath = [
                        ["M", C, D, "A", S, O, 0, p > m ?
                            1 : 0, 1, A, B, "L", ea, V, ea, V + 1, "A", z, H, 0, p > m ? 1 : 0, 0, t, n + 1, "L", t, n, "Z"
                        ]
                    ], h != l ? e > k ? e < m ? (a.clipOuterFrontPath = [
                        ["M", X, y, "A", z, H, 0, 0, 1, ea, V, "v", T, "A", z, H, 0, 0, 0, X, y + T, "Z"]
                    ], a.clipOuterFrontPath1 = [
                        ["M", R, y, "A", z, H, 0, 0, 0, t, n, "v", T, "A", z, H, 0, 0, 1, R, y + T, "Z"]
                    ], a.clipOuterBackPath = [
                        ["M", X, y, "A", z, H, 0, 1, 0, R, y, "v", T, "A", z, H, 0, 1, 1, X, y + T, "Z"]
                    ], aa && (a.clipInnerBackPath = [
                        ["M", ga, y, "A", W, E, 0, 1, 0, U, y, "v", T, "A", W, E, 0, 1, 1, ga, y + T, "Z"]
                    ], a.clipInnerFrontPath = [
                        ["M", ga, y, "A", W, E, 0, 0, 1, I, P, "v", T, "A", W, E, 0, 0, 0, ga, y + T, "Z", "M", U, y, "A",
                            W, E, 0, 0, 0, x, K, "v", T, "A", W, E, 0, 0, 1, U, y + T, "Z"
                        ]
                    ])) : k > m ? (a.clipOuterFrontPath = [
                        ["M", X, y, "A", z, H, 0, 1, 1, R, y, "v", T, "A", z, H, 0, 1, 0, X, y + T, "Z"]
                    ], a.clipOuterBackPath = [
                        ["M", R, y, "A", z, H, 0, 0, 1, ea, V, "v", T, "A", z, H, 0, 0, 0, R, y + T, "Z", "M", X, y, "A", z, H, 0, 0, 0, t, n, "v", T, "A", z, H, 0, 0, 1, X, y + T, "Z"]
                    ], aa && (a.clipInnerFrontPath = [
                        ["M", ga, y, "A", W, E, 0, 1, 1, U, y, "v", T, "A", W, E, 0, 1, 0, ga, y + T, "Z"]
                    ], a.clipInnerBackPath = [
                        ["M", U, y, "A", W, E, 0, 0, 1, I, P, "v", T, "A", W, E, 0, 0, 0, U, y + T, "Z", "M", ga, y, "A", W, E, 0, 0, 0, x, K, "v", T, "A", W, E, 0, 0, 1, ga, y + T, "Z"]
                    ])) : (a.clipOuterFrontPath = [
                        ["M", X, y, "A", z, H, 0, 0, 1, ea, V, "v", T, "A", z, H, 0, 0, 0, X, y + T, "Z"]
                    ], a.clipOuterBackPath = [
                        ["M", t, n, "A", z, H, 0, 0, 1, X, y, "v", T, "A", z, H, 0, 0, 0, t, M, "Z"]
                    ], aa && (a.clipInnerFrontPath = [
                        ["M", ga, y, "A", W, E, 0, 0, 1, I, P, "v", T, "A", W, E, 0, 0, 0, ga, y + T, "Z"]
                    ], a.clipInnerBackPath = [
                        ["M", x, K, "A", W, E, 0, 0, 1, ga, y, "v", T, "A", W, E, 0, 0, 0, x, G, "Z"]
                    ])) : e < m ? k > m ? (a.clipOuterFrontPath = [
                        ["M", t, n, "A", z, H, 0, 0, 1, R, y, "v", T, "A", z, H, 0, 0, 0, t, M, "Z"]
                    ], a.clipOuterBackPath = [
                        ["M", R, y, "A", z, H, 0, 0, 1, ea, V, "v", T, "A", z, H, 0, 0, 0, R, y + T, "Z"]
                    ], aa && (a.clipInnerFrontPath = [
                        ["M", x, K, "A", W, E, 0, 0, 1, U, y, "v", T, "A", W, E, 0, 0, 0, x, G, "Z"]
                    ], a.clipInnerBackPath = [
                        ["M", U, y, "A", W, E, 0, 0, 1, I, P, "v", T, "A", W, E, 0, 0, 0, U, y + T, "Z"]
                    ])) : (a.clipOuterFrontPath = [
                        ["M", t, n, "A", z, H, 0, 0, 1, ea, V, "v", T, "A", z, H, 0, 0, 0, t, M, "Z"]
                    ], a.clipOuterBackPath = [ja], aa && (a.clipInnerFrontPath = [
                        ["M", x, K, "A", W, E, 0, 0, 1, I, P, "v", T, "A", W, E, 0, 0, 0, x, G, "Z"]
                    ], a.clipInnerBackPath = [ja])) : (a.clipOuterFrontPath = [ja], a.clipOuterBackPath = [
                        ["M", t, n, "A", z, H, 0, 0, 1, ea, V, "v", T, "A", z, H, 0, 0, 0, t, M, "Z"]
                    ], aa && (a.clipInnerFrontPath = [ja], a.clipInnerBackPath = [
                        ["M", x, K, "A", W, E, 0, 0, 1, I, P, "v", T, "A", W, E, 0, 0, 0, x, G, "Z"]
                    ])) : a.clipOuterFrontPath = a.clipOuterBackPath = a.clipInnerBackPath = a.clipInnerFrontPath = [ja], da = "litepath", a.clipBottomBorderPath = a.clipTopPath, a.startSlice = [a.startSlice], a.endSlice = [a.endSlice]) : (S = this.moveCmdArr, O = this.lineCmdArr, r = this.closeCmdArr, T = [J, y], w = [R, y], ha = [J, ha], u = [X, y], F = [J, y + H], ja = [R, Q], ia = [X, Q], C = [U, y], D = [ga, y], A = [U, Q], B = [ga, Q], a.clipOuterFrontPath1 = [], h != l ? (e > k ? e < m ? (h = b(J, y, t, n, R, y, z, H, 1, 0), l = b(J, y, R, y, X, y, z, H, 1, 0), V = b(J, y,
                            X, y, ea, V, z, H, 1, 0), a.clipOuterBackPath = S.concat(w, l, O, ia, b(J, Q, X, Q, R, Q, z, H, 0, 0), r), a.clipOuterFrontPath1 = S.concat([t, n], h, O, ja, b(J, Q, R, Q, t, M, z, H, 0, 0), r), a.clipOuterFrontPath = S.concat(u, V, O, [ea, ka], b(J, Q, ea, ka, X, Q, z, H, 0, 0), r), a.clipTopBorderPath = S.concat([t, n], h, l, V), aa ? (z = b(J, y, I, P, ga, y, W, E, 0, 0), H = b(J, y, ga, y, U, y, W, E, 0, 0), K = b(J, y, U, y, x, K, W, E, 0, 0), a.clipInnerBackPath = S.concat(D, H, O, A, b(J, Q, U, Q, ga, Q, W, E, 1, 0), r), a.clipInnerFrontPath = S.concat(C, K, O, [x, G], b(J, Q, x, G, U, Q, W, E, 1, 0), r, S, [I, P], z, O, B, b(J, Q, ga,
                            Q, I, Z, W, E, 1, 0), r), a.clipTopPath = a.clipTopBorderPath.concat(O, [I, P], z, H, K, r), a.clipTopBorderPath = a.clipTopBorderPath.concat(S, [I, P], z, H, K)) : a.clipTopPath = a.clipTopBorderPath.concat(O, T, r)) : k > m ? (h = b(J, y, t, n, X, y, z, H, 1, 0), l = b(J, y, X, y, R, y, z, H, 1, 0), V = b(J, y, R, y, ea, V, z, H, 1, 0), a.clipOuterFrontPath = S.concat(u, l, O, ja, b(J, Q, R, Q, X, Q, z, H, 0, 0), r), a.clipOuterBackPath = S.concat([t, n], h, O, ia, b(J, Q, X, Q, t, M, z, H, 0, 0), r, S, w, V, O, [ea, ka], b(J, Q, ea, ka, R, Q, z, H, 0, 0), r), a.clipTopBorderPath = S.concat([t, n], h, l, V), aa ? (z = b(J, y, I,
                            P, U, y, W, E, 0, 0), H = b(J, y, U, y, ga, y, W, E, 0, 0), K = b(J, y, ga, y, x, K, W, E, 0, 0), a.clipInnerFrontPath = S.concat(C, H, O, B, b(J, Q, ga, Q, U, Q, W, E, 1, 0), r), a.clipInnerBackPath = S.concat(D, K, O, [x, G], b(J, Q, x, G, ga, Q, W, E, 1, 0), r, S, [I, P], z, O, A, b(J, Q, U, Q, I, Z, W, E, 1, 0), r), a.clipTopPath = a.clipTopBorderPath.concat(O, [I, P], z, H, K, r), a.clipTopBorderPath = a.clipTopBorderPath.concat(S, [I, P], z, H, K)) : a.clipTopPath = a.clipTopBorderPath.concat(O, T, r)) : (h = b(J, y, t, n, X, y, z, H, 1, 0), l = b(J, y, X, y, ea, V, z, H, 1, 0), a.clipOuterFrontPath = S.concat(u, l, O, [ea,
                            ka
                        ], b(J, Q, ea, ka, X, Q, z, H, 0, 0), r), a.clipOuterBackPath = S.concat([t, n], h, O, ia, b(J, Q, X, Q, t, M, z, H, 0, 0), r), a.clipTopBorderPath = S.concat([t, n], h, l), aa ? (z = b(J, y, I, P, ga, y, W, E, 0, 0), H = b(J, y, ga, y, x, K, W, E, 0, 0), a.clipInnerFrontPath = S.concat([I, P], z, O, B, b(J, Q, ga, Q, I, Z, W, E, 1, 0), r), a.clipInnerBackPath = S.concat(D, H, O, [x, G], b(J, Q, x, G, ga, Q, W, E, 1, 0), r), a.clipTopPath = a.clipTopBorderPath.concat(O, [I, P], z, H, r), a.clipTopBorderPath = a.clipTopBorderPath.concat(S, [I, P], z, H)) : a.clipTopPath = a.clipTopBorderPath.concat(O, T, r)) : e <
                        m ? k > m ? (h = b(J, y, t, n, R, y, z, H, 1, 0), l = b(J, y, R, y, ea, V, z, H, 1, 0), a.clipOuterBackPath = S.concat(w, l, O, [ea, ka], b(J, Q, ea, ka, R, Q, z, H, 0, 0), r), a.clipOuterFrontPath = S.concat([t, n], h, O, ja, b(J, Q, R, Q, t, M, z, H, 0, 0), r), a.clipTopBorderPath = S.concat([t, n], h, l), aa ? (z = b(J, y, I, P, U, y, W, E, 0, 0), H = b(J, y, U, y, x, K, W, E, 0, 0), a.clipInnerBackPath = S.concat([I, P], z, O, A, b(J, Q, U, Q, I, Z, W, E, 1, 0), r), a.clipInnerFrontPath = S.concat(C, H, O, [x, G], b(J, Q, x, G, U, Q, W, E, 1, 0), r), a.clipTopPath = a.clipTopBorderPath.concat(O, [I, P], z, H, r), a.clipTopBorderPath =
                            a.clipTopBorderPath.concat(S, [I, P], z, H)) : a.clipTopPath = a.clipTopBorderPath.concat(O, T, r)) : (h = b(J, y, t, n, ea, V, z, H, 1, 0), a.clipOuterBackPath = S.concat([t, n]), a.clipTopBorderPath = a.clipOuterBackPath.concat(h), a.clipOuterFrontPath = a.clipTopBorderPath.concat(O, [ea, ka], b(J, Q, ea, ka, t, M, z, H, 0, 0), r), aa ? (z = b(J, y, I, P, x, K, W, E, 0, 0), a.clipInnerBackPath = S.concat([I, P]), a.clipTopPath = a.clipTopBorderPath.concat(O, [I, P], z, r), a.clipTopBorderPath = a.clipTopBorderPath.concat(S, [I, P], z), a.clipInnerFrontPath = a.clipInnerBackPath.concat(z,
                            O, [x, G], b(J, Q, x, G, I, Z, W, E, 1, 0), r)) : a.clipTopPath = a.clipTopBorderPath.concat(O, T, r)) : (h = b(J, y, t, n, ea, V, z, H, 1, 0), a.clipOuterFrontPath = S.concat([t, n]), a.clipTopBorderPath = a.clipOuterFrontPath.concat(h), a.clipOuterBackPath = a.clipTopBorderPath.concat(O, [ea, ka], b(J, Q, ea, ka, t, M, z, H, 0, 0), r), aa ? (z = b(J, y, I, P, x, K, W, E, 0, 0), a.clipInnerFrontPath = S.concat([I, P]), a.clipTopPath = a.clipTopBorderPath.concat(O, [I, P], z, r), a.clipTopBorderPath = a.clipTopBorderPath.concat(a.clipInnerFrontPath, z), a.clipInnerBackPath = a.clipInnerFrontPath.concat(z,
                            O, [x, G], b(J, Q, x, G, I, Z, W, E, 1, 0), r)) : a.clipTopPath = a.clipTopBorderPath.concat(O, T, r)), h = S.concat(w, O, u), z = S.concat(ha, O, F), a.clipTopPath = a.clipTopPath.concat(h, z), a.clipOuterFrontPath = a.clipOuterFrontPath.concat(h), a.clipOuterFrontPath1 = a.clipOuterFrontPath1.concat(h), a.clipOuterBackPath = a.clipOuterBackPath.concat(h), aa && (z = S.concat(C, O, D), a.clipInnerFrontPath = a.clipInnerFrontPath.concat(z), a.clipInnerBackPath = a.clipInnerBackPath.concat(z))) : (a.clipTopPath = a.clipOuterFrontPath = a.clipOuterBackPath = [],
                        aa && (a.clipInnerFrontPath = a.clipInnerBackPath = [])), a.clipBottomBorderPath = a.clipTopBorderPath);
                    c || (N.startSlice._conf.index = e, N.endSlice._conf.index = k, N.backOuter._conf.index = x = la && (e <= v || k > v) || e <= v && k > v ? v : e > m ? e : k, N.frontOuter._conf.index = b = k <= f ? k : e > k || e <= f ? f : e, N.frontOuter1._conf.index = e, N.frontOuter1._conf.cIndex = m, e > k ? (N.backOuter._conf.cIndex = e < v ? v : q, N.startSlice._conf.cIndex = e < m ? (e + m) / 2 : (e + q) / 2, N.endSlice._conf.cIndex = N.frontOuter._conf.cIndex = 0) : N.backOuter._conf.cIndex = N.startSlice._conf.cIndex =
                        N.endSlice._conf.cIndex = N.frontOuter._conf.cIndex = ma, p > m ? N.frontOuter1.show().attr(da, a.clipOuterFrontPath1) : N.frontOuter1.hide(), a.thisElement._attr(da, a.clipTopPath), N.bottom.attr(da, a.clipTopPath), N.bottomBorder.attr(da, a.clipBottomBorderPath), N.topBorder && N.topBorder.attr(da, a.clipTopBorderPath), N.frontOuter.attr(da, a.clipOuterFrontPath), N.backOuter.attr(da, a.clipOuterBackPath), aa && (N.backInner.attr(da, a.clipInnerBackPath), N.frontInner.attr(da, a.clipInnerFrontPath), N.backInner._conf.index = x, N.frontInner._conf.index =
                            b, e > k ? (N.backInner._conf.cIndex = q, N.frontInner._conf.cIndex = 0) : N.backInner._conf.cIndex = N.frontInner._conf.cIndex = ma), this.hasOnePoint ? (N.startSlice.hide(), N.endSlice.hide()) : (N.startSlice.attr(da, a.startSlice).show(), N.endSlice.attr(da, a.endSlice).show()))
                },
                _setSliceCosmetics: function(a) {
                    var b = a.thisElement,
                        c = a.showBorderEffect,
                        f = a.elements,
                        h = I(a.borderColor, ia(a.borderAlpha, a.alpha)),
                        e = a.borderWidth,
                        k;
                    a.color && (a = this._parseSliceColor(a.color, a.alpha, a), ra ? (k = { fill: R(a.top), "stroke-width": 0 }, c ?
                        f.topBorder.show().attr({ fill: R(a.topBorder), "stroke-width": 0 }) : (f.topBorder.hide(), k.stroke = h, k["stroke-width"] = e), b._attr(k)) : (b._attr({ fill: R(a.top), "stroke-width": 0 }), f.topBorder.attr({ stroke: h, "stroke-width": e })), f.bottom.attr({ fill: R(a.bottom) }), f.bottomBorder.attr({ stroke: h, "stroke-width": e }), f.frontOuter.attr({ fill: R(a.frontOuter) }), f.frontOuter1.attr({ fill: R(a.frontOuter) }), f.backOuter.attr({ fill: R(a.backOuter) }), f.startSlice.attr({ fill: R(a.startSlice), stroke: h, "stroke-width": e }), f.endSlice.attr({
                        fill: R(a.endSlice),
                        stroke: h,
                        "stroke-width": e
                    }), this.isDoughnut && (f.frontInner.attr({ fill: R(a.frontInner) }), f.backInner.attr({ fill: R(a.backInner) })))
                },
                createSlice: function() {
                    var a = {
                            stroke: !0,
                            strokeWidth: !0,
                            "stroke-width": !0,
                            dashstyle: !0,
                            "stroke-dasharray": !0,
                            translateX: !0,
                            translateY: !0,
                            "stroke-opacity": !0,
                            fill: !0,
                            opacity: !0,
                            transform: !0,
                            ishot: !0,
                            cursor: !0,
                            start: !0,
                            end: !0,
                            color: !0,
                            alpha: !0,
                            borderColor: !0,
                            borderAlpha: !0,
                            borderWidth: !0,
                            rolloverProps: !0,
                            showBorderEffect: !0,
                            positionIndex: !0,
                            cx: !0,
                            cy: !0,
                            radiusYFactor: !0,
                            r: !0,
                            innerR: !0
                        },
                        b = function(b, c) {
                            var e, f, g = this,
                                h = g._confObject,
                                k = {},
                                l = h.elements,
                                r, m, w, n = h.Pie3DManager,
                                p;
                            "string" === typeof b && void 0 !== c && null !== c && (e = b, b = {}, b[e] = c);
                            if (b && "string" !== typeof b) {
                                for (e in b)
                                    if (f = b[e], a[e])
                                        if (h[e] = f, "ishot" === e || "cursor" === e || "transform" === e) k[e] = f, p = !0;
                                        else if ("start" === e || "end" === e || "cx" === e || "cy" === e || "radiusYFactor" === e || "r" === e || "innerR" === e) m = !0;
                                else { if ("color" === e || "alpha" === e || "borderColor" === e || "borderAlpha" === e || "borderWidth" === e) w = !0 } else g._attr(e, f);
                                m && (n._setSliceShape(h),
                                    n.refreshDrawing());
                                (w || m) && n._setSliceCosmetics(h);
                                if (p) { for (r in l) l[r].attr(k);
                                    g._attr(k) }
                            } else g = a[b] ? h[b] : g._attr(b);
                            return g
                        },
                        c = function(a, b) { var c = this._confObject.elements,
                                e; for (e in c) c[e].on(a, b); return this._on(a, b) },
                        f = function(a, b, c) { var e, d = this._confObject.elements,
                                f = -1 < Da.navigator.userAgent.toLowerCase().indexOf("android"); for (e in d) f ? "topBorder" !== e && "frontOuter" !== e && "startSlice" !== e && "endSlice" !== e || d[e].drag(a, b, c) : d[e].drag(a, b, c); return this._drag(a, b, c) },
                        h = function() {
                            var a =
                                this._confObject.elements,
                                b;
                            for (b in a) a[b].hide();
                            return this._hide()
                        },
                        e = function() { var a = this._confObject.elements,
                                b; for (b in a) a[b].show(); return this._show() },
                        k = function() { var a = this._confObject,
                                b = a.elements,
                                c; for (c in b) b[c].destroy();
                            ra && (a.clipTop.destroy(), a.clipOuterFront.destroy(), a.clipOuterBack.destroy(), a.clipOuterFront1 && a.clipOuterFront1.destroy(), a.clipInnerFront && a.clipInnerFront.destroy(), a.clipInnerBack && a.clipInnerBack.destroy()); return this._destroy() },
                        m = function(a) {
                            var b = this._confObject.elements,
                                c;
                            for (c in b) b[c].tooltip(a);
                            return this._tooltip(a)
                        },
                        r = function(a, b) { var c = this._confObject.elements,
                                e; if (void 0 === b) return this._data(a); for (e in c) c[e].data(a, b); return this._data(a, b) },
                        w = 0;
                    return function() {
                        var a = this.renderer,
                            d, t = { elements: {}, Pie3DManager: this },
                            n = this.slicingWallsArr,
                            p = t.elements,
                            q = ra ? "litepath" : "path";
                        d = a[q](this.topGroup);
                        d._confObject = t;
                        t.thisElement = d;
                        d._destroy = d.destroy;
                        d.destroy = k;
                        d._show = d.show;
                        d.show = e;
                        d._hide = d.hide;
                        d.hide = h;
                        d._on = d.on;
                        d.on = c;
                        d._drag = d.drag;
                        d.drag =
                            f;
                        d._attr = d.attr;
                        d.attr = b;
                        d._tooltip = d.tooltip;
                        d.tooltip = m;
                        d._data = d.data;
                        d.data = r;
                        this.pointElemStore.push(d);
                        p.topBorder = a[q](this.topGroup);
                        p.bottom = a[q](this.bottomBorderGroup).attr({ "stroke-width": 0 });
                        p.bottomBorder = a[q](this.bottomBorderGroup);
                        p.frontOuter = a[q](this.slicingWallsFrontGroup).attr({ "stroke-width": 0 });
                        p.backOuter = a[q](this.slicingWallsFrontGroup).attr({ "stroke-width": 0 });
                        p.startSlice = a[q](this.slicingWallsFrontGroup);
                        p.endSlice = a[q](this.slicingWallsFrontGroup);
                        p.frontOuter1 = a[q](this.slicingWallsFrontGroup).attr({ "stroke-width": 0 });
                        p.frontOuter._conf = { si: w, isStart: .5 };
                        p.frontOuter1._conf = { si: w, isStart: .5 };
                        p.startSlice._conf = { si: w, isStart: 0 };
                        p.endSlice._conf = { si: w, isStart: 1 };
                        p.backOuter._conf = { si: w, isStart: .4 };
                        n.push(p.startSlice, p.frontOuter1, p.frontOuter, p.backOuter, p.endSlice);
                        this.isDoughnut && (p.frontInner = a[q](this.slicingWallsFrontGroup).attr({ "stroke-width": 0 }), p.backInner = a[q](this.slicingWallsFrontGroup).attr({ "stroke-width": 0 }), p.backInner._conf = { si: w, isStart: .5 }, p.frontInner._conf = { si: w, isStart: .4 }, n.push(p.frontInner,
                            p.backInner));
                        w += 1;
                        return d
                    }
                }()
            };
            la.prototype.constructor = la
        },
        [3, 2, 2, "sr4"]
    ]);
    FusionCharts.register("module", ["private", "modules.renderer.js-zoomline", function() {
        var ua = this,
            fa = ua.hcLib,
            na = fa.hashify,
            la = ua.window,
            ha = la.document,
            U = la.Image,
            Ha = la.MouseEvent,
            Da = /msie/i.test(la.navigator.userAgent) && !la.opera,
            ma = fa.chartAPI,
            oa = fa.extend2,
            Ma = fa.addEvent,
            sa = fa.pluck,
            G = fa.pluckNumber,
            Qa = fa.getFirstColor,
            za = fa.graphics.convertColor,
            ia = fa.bindSelectionEvent,
            Ya = fa.parseUnsafeString,
            Ua = fa.componentDispose,
            R =
            fa.Raphael,
            ra = fa.toRaphaelColor,
            Na = fa.hasTouch,
            Za = fa.plotEventHandler,
            eb = fa.getMouseCoordinate,
            Ia = !/fusioncharts\.com$/i.test(la.location.hostname),
            Ga = "rgba(192,192,192," + (Da ? .002 : 1E-6) + ")",
            wa = Math,
            Ea = wa.ceil,
            xa = wa.floor,
            va = wa.round,
            pa = wa.max,
            La = wa.min,
            qa = wa.cos,
            Aa = wa.sin,
            Ba = la.parseFloat,
            Fa = la.parseInt,
            ta;
        oa(fa.eventList, { zoomed: "FC_Zoomed", pinned: "FC_Pinned", resetzoomchart: "FC_ResetZoomChart" });
        ma("zoomline", {
            standaloneInit: !0,
            canvasborderthickness: 1,
            defaultDatasetType: "zoomline",
            applicableDSList: { zoomline: !0 },
            friendlyName: "Zoomable and Panable Multi-series Line Chart",
            creditLabel: Ia,
            _drawAxis: function() { var a = this.components.yAxis || [],
                    b, c;
                b = 0; for (c = a.length; b < c; b++) a[b].draw() },
            _setCategories: function() {
                var a = this.config,
                    b = this.jsonData,
                    c = this.components.xAxis,
                    h, m, f;
                m = a.cdmchar;
                var q = b.categories && b.categories[0].category || [];
                if ((a.cdm || "string" === typeof q) && q.split) { a = q.split(m);
                    h = [];
                    m = 0; for (f = a.length; m < f; m += 1) h.push({ label: a[m] });
                    this.config.categories = b.categories[0].category = h }
                c[0].setAxisPadding(0,
                    0);
                c[0].setCategory(h || q)
            },
            _createDatasets: function() {
                var a, b, c, h, m, f, q, v, A;
                m = {};
                var n = this.config;
                a = this.components;
                v = this.jsonData;
                var C = v.dataset,
                    p = C && C.length,
                    I = n.cdmchar,
                    K = n.cdm,
                    B = this.defaultDatasetType,
                    k = this.applicableDSList,
                    n = this.components.legend.components.items || [];
                v = v.categories && v.categories[0].category;
                C && v || this.setChartMessage();
                this.config.categories = v;
                v = a.dataset || (a.dataset = []);
                A = v.length;
                for (a = 0; a < p; a++) {
                    q = C[a];
                    if (K && q.data && q.data.split) {
                        f = q.data.split(I);
                        h = [];
                        b = 0;
                        for (c = f.length; b <
                            c; b++) h.push({ value: f[b] });
                        q.data = h
                    }
                    b = q.parentyaxis || "";
                    b = (b = this.isDual && "s" === b.toLowerCase() ? sa(q.renderas, this.sDefaultDatasetType) : sa(q.renderas, B)) && b.toLowerCase();
                    k[b] || (b = B);
                    if (c = FusionCharts.get("component", ["dataset", b])) void 0 === m[b] ? m[b] = 0 : m[b]++, (b = v[a]) ? (c = (b.JSONData.data || []).length, h = (q.data || []).length, c > h && b.removeData(h, c - h, !1), v[a].JSONData = q, v[a].configure(), v[a]._deleteGridImages && v[a]._deleteGridImages()) : (b = new c, v.push(b), b.chart = this, b.index = a, b.init(q))
                }
                if (A > p) {
                    m = A - p;
                    b = a;
                    for (p = m + a; b < p; b++) Ua.call(v[b]);
                    v.splice(a, m);
                    n.splice(a, m)
                }
            },
            isWithinCanvas: function(a, b) { var c = fa.getMouseCoordinate(b.get("linkedItems", "container"), a),
                    h = c.chartX,
                    m = c.chartY,
                    f = b.get("config"),
                    q = f.canvasLeft,
                    v = f.canvasTop,
                    A = f.canvasLeft + f.canvasWidth,
                    f = f.canvasHeight + f.canvasTop;
                c.insideCanvas = !1;
                c.originalEvent = a;
                h > q && h < A && m > v && m < f && (c.insideCanvas = !0); return c },
            highlightPoint: function(a, b, c, h, m, f) {
                var q = this,
                    v = q.config,
                    A = q.components,
                    n = q.graphics,
                    C = A.paper,
                    p = n.tracker,
                    I = (A = A.dataset[m]) &&
                    A.config;
                m = A && I.zoomedRadius || 0;
                var K = A && I.hoverCosmetics,
                    A = K && K.fill,
                    I = K && K.borderColor,
                    K = K && K.borderThickness,
                    B = {},
                    B = function(a) { fa.plotEventHandler.call(this, q, a) },
                    k = function(a) { fa.plotEventHandler.call(this, q, a, "dataplotRollover") },
                    x = function(a) { fa.plotEventHandler.call(this, q, a, "dataplotRollout") };
                p || (p = n.tracker = C.circle(0, 0, 0, n.trackerGroup).attr({ "clip-rect": v.canvasLeft + "," + v.canvasTop + "," + v.canvasWidth + "," + v.canvasHeight }).click(B).trackTooltip(!0).hover(k, x));
                h && p.data("eventArgs", {
                    x: h.x,
                    y: h.y,
                    tooltip: h.tooltip,
                    link: h.link
                });
                v.lastHoveredPoint = h;
                B = Number(a) ? { r: m, fill: A, stroke: I, "stroke-width": K } : { r: m, fill: Ga, stroke: Ga, "stroke-width": 0 };
                p.attr(B).tooltip(f).transform("t" + (b + v.canvasLeft) + "," + (c + v.canvasTop));
                h && q.fireMouseEvent("mouseover", p && p.node, v.lastMouseEvent)
            },
            fireMouseEvent: function(a, b, c) {
                var h;
                b && a && (c || (c = {}), c.originalEvent && (c = c.originalEvent), c.touches && (c = c.touches[0]), b.dispatchEvent ? (Ha ? h = new Ha(a, {
                    bubbles: !!c.bubbles,
                    cancelable: !!c.cancelable,
                    clientX: c.clientX ||
                        c.pageX && c.pageX - ha.body.scrollLeft - ha.documentElement.scrollLeft || 0,
                    clientY: c.clientY || c.pageY && c.pageY - ha.body.scrollTop - ha.documentElement.scrollTop || 0,
                    screenX: c.screenX || 0,
                    screenY: c.screenY || 0,
                    pageX: c.pageX || 0,
                    pageY: c.pageY || 0
                }) : ha.createEvent && (h = ha.createEvent("HTMLEvents"), h.initEvent(a, !!c.bubbles, !!c.cancelable)), h.eventName = a, h && b.dispatchEvent(h)) : ha.createEventObject && b.fireEvent && (h = ha.createEventObject(), h.eventType = a, h.eventName = a, b.fireEvent("on" + a, h)))
            },
            configure: function() {
                var a,
                    b = this.jsonData.chart || {},
                    c = this.components.colorManager,
                    h = c.getColor("canvasBorderColor"),
                    m;
                b.animation = 0;
                b.showvalues = 0;
                ma.msline.configure.call(this);
                m = this.config;
                a = m.style;
                oa(m, {
                    useRoundEdges: G(b.useroundedges, 0),
                    animation: !1,
                    zoomType: "x",
                    canvasPadding: G(b.canvaspadding, 0),
                    scrollColor: Qa(sa(b.scrollcolor, c.getColor("altHGridColor"))),
                    scrollShowButtons: !!G(b.scrollshowbuttons, 1),
                    scrollHeight: G(b.scrollheight, 16) || 16,
                    scrollBarFlat: G(b.flatscrollbars, 0),
                    allowPinMode: G(b.allowpinmode, 1),
                    skipOverlapPoints: G(b.skipoverlappoints,
                        1),
                    showToolBarButtonTooltext: G(b.showtoolbarbuttontooltext, 1),
                    btnResetChartTooltext: sa(b.btnresetcharttooltext, "Reset Chart"),
                    btnZoomOutTooltext: sa(b.btnzoomouttooltext, "Zoom out one level"),
                    btnSwitchToZoomModeTooltext: sa(b.btnswitchtozoommodetooltext, "<strong>Switch to Zoom Mode</strong><br/>Select a subset of data to zoom into it for detailed view"),
                    btnSwitchToPinModeTooltext: sa(b.btnswitchtopinmodetooltext, "<strong>Switch to Pin Mode</strong><br/>Select a subset of data and compare with the rest of the view"),
                    pinPaneFill: za(sa(b.pinpanebgcolor, h), G(b.pinpanebgalpha, 15)),
                    zoomPaneFill: za(sa(b.zoompanebgcolor, "#b9d5f1"), G(b.zoompanebgalpha, 30)),
                    zoomPaneStroke: za(sa(b.zoompanebordercolor, "#3399ff"), G(b.zoompaneborderalpha, 80)),
                    showPeakData: G(b.showpeakdata, 0),
                    maxPeakDataLimit: G(b.maxpeakdatalimit, b.maxpeaklimit, null),
                    minPeakDataLimit: G(b.minpeakdatalimit, b.minpeaklimit, null),
                    crossline: {
                        enabled: G(b.showcrossline, 1),
                        line: {
                            "stroke-width": G(b.crosslinethickness, 1),
                            stroke: Qa(sa(b.crosslinecolor, "#000000")),
                            "stroke-opacity": G(b.crosslinealpha,
                                20) / 100
                        },
                        labelEnabled: G(b.showcrosslinelabel, b.showcrossline, 1),
                        labelstyle: { fontSize: Ba(b.crosslinelabelsize) ? Ba(b.crosslinelabelsize) + "px" : a.outCanfontSize, fontFamily: sa(b.crosslinelabelfont, a.outCanfontFamily) },
                        valueEnabled: G(b.showcrosslinevalues, b.showcrossline, 1),
                        valuestyle: { fontSize: Ba(b.crosslinevaluesize) ? Ba(b.crosslinevaluesize) + "px" : a.inCanfontSize, fontFamily: sa(b.crosslinevaluefont, a.inCanvasStyle.fontFamily) }
                    },
                    useCrossline: G(b.usecrossline, 1),
                    tooltipSepChar: sa(b.tooltipsepchar, ", "),
                    showTerminalValidData: G(b.showterminalvaliddata,
                        0),
                    cdmchar: sa(b.dataseparator, "|"),
                    cdm: G(b.compactdatamode, 0)
                })
            },
            getValuePixel: function(a) { var b = this.config.viewPortConfig; return b.ddsi + xa(a / b.ppp) },
            __toolbar: function() {
                var a, b, c, h, m = this,
                    f = m.components,
                    q = f.tb = new(FusionCharts.register("component", ["toolbox", "toolbox"])),
                    v = q.getDefaultConfiguration(),
                    A, n;
                q.init({ iAPI: { chart: m }, graphics: m.graphics, chart: m, components: f });
                a = f.toolBoxAPI || q.getAPIInstances(q.ALIGNMENT_HORIZONTAL);
                b = a.SymbolStore;
                c = a.ComponentGroup;
                h = a.Toolbar;
                A = a.Symbol;
                n = a.Scroller;
                q.graphics = {};
                return {
                    reInit: function() { q.init({ iAPI: { chart: m }, graphics: m.graphics, chart: m, components: f }) },
                    addSymbol: function(a, b, c, f) { a = new A(a);
                        c && f.setConfiguaration({ buttons: oa(oa({}, v), c) });
                        b.tooltext = c.tooltip;
                        b && a.attachEventHandlers(b);
                        f.addSymbol(a); return a },
                    addScroll: function(a, b) { var c = new n(a);
                        b && c.attachEventHandlers(b); return c },
                    addComponentGroup: function(a, b) { var f;
                        f = new c;
                        f.setConfiguaration({ group: { fill: b ? b.fill : za("EBEBEB", 0), borderThickness: b ? G(b.borderThickness, 0) : 0 } }); return f },
                    addToolBox: function(a) { var b, c = new h; for (b = 0; b < a.length; b += 1) c.addComponent(a[b]); return c },
                    setDrawingArea: function(a, b) { a.drawingArea = b; return a },
                    draw: function(a) { var b, c, f; for (b = 0; b < a.length; b += 1) c = a[b], f = c.drawingArea, c.draw(f.x, f.y) },
                    registerSymbol: function(a, c) { b.register(a, c) },
                    getLogicalSpace: function(a) { return a.getLogicalSpace() },
                    getNode: function(a) { return a.node }
                }
            },
            __preDraw: function() {
                var a, b, c, h, m, f, q, v, A, n, C = this,
                    p = C.components,
                    I = p.paper,
                    K = C.graphics;
                b = K.imageContainer;
                var B = C.config,
                    k = B.canvasLeft,
                    x = B.canvasWidth;
                a = C.jsonData.chart;
                var aa = B.cdm;
                c = p.xAxis[0];
                var N = B.viewPortConfig,
                    D = C.components.canvas.config,
                    Z = pa(D.canvasPadding, D.canvasPaddingLeft, D.canvasPaddingRight);
                n = p.yAxis[0];
                v = K.datasetGroup;
                var D = B.canvasHeight,
                    X = B.canvasTop,
                    d = C.jsonData.chart,
                    d = B.borderWidth || (B.borderWidth = G(d.showborder, 1) ? G(d.borderthickness, 1) : 0),
                    L = B.allowPinMode,
                    g = B.crossline,
                    N = c.getCategoryLen(),
                    U = Fa(G(a.displaystartindex, 1), 10) - 1,
                    l = Fa(G(a.displayendindex, N || 2), 10) - 1,
                    e = 0,
                    ba = p.dataset,
                    fa = ba.length,
                    p = K.crossline;
                B.updateAnimDuration = 500;
                b.transform("t" + k + "," + X);
                b.attr({ "clip-rect": k + "," + X + "," + x + "," + D });
                B.status = "zoom";
                B.maxZoomLimit = G(a.maxzoomlimit, 1E3);
                B.viewPortHistory = [];
                1 > (b = G(a.pixelsperpoint, 15)) && (b = 1);
                (c = G(a.pixelsperlabel, a.xaxisminlabelwidth, c.getAxisConfig("labels").rotation ? 20 : 60)) < b && (c = b);
                (0 > U || U >= (N - 1 || 1)) && (U = 0);
                (l <= U || l > (N - 1 || 1)) && (l = N - 1 || 1);
                N = B.viewPortConfig = oa(B.viewPortConfig, {
                    amrd: G(a.anchorminrenderdistance, 20),
                    nvl: G(a.numvisiblelabels, 0),
                    cdm: aa,
                    oppp: b,
                    oppl: c,
                    dsi: U,
                    dei: l,
                    vdl: l - U,
                    clen: N,
                    offset: 0,
                    step: 1,
                    llen: 0,
                    alen: 0,
                    ddsi: U,
                    ddei: l,
                    ppc: 0
                });
                if (N.clen) {
                    for (; fa--;) a = ba[fa].config, e = pa(e, a.drawanchors && (a.anchorradius || 0) + (Number(a.anchorborderthickness) || 0) || 0);
                    B.overFlowingMarkerWidth = e;
                    Z = B.canvasPadding = pa(e, Z);
                    B._prezoomed = N.dei - N.dsi < N.clen - 1;
                    h = B._visw = B.canvasWidth - 2 * Z;
                    m = B._visx = B.canvasLeft + Z;
                    B._visout = -(B.height + D + 1E3);
                    B._ypvr = n && n.getPVR() || 0;
                    a = B._yminValue = n.getLimit().min;
                    f = B._ymin = n.getPixel(a);
                    n = v.attr("clip-rect", [m - e, X, h + 2 * e, D]);
                    K.scroll || (K.scroll = I.group("scroll").insertAfter(K.datasetGroup));
                    L && (v = R.crispBound(0, X - f, 0, D, d), q = B["clip-pinrect"] = [v.x, X, v.width, v.height], A = (K.zoompin = I.group("zoompin")).insertBefore(n).transform(B._pingrouptransform = ["T", m, f]).hide(), K.pinrect = I.rect(0, X - f, h, D, A).attr({ "stroke-width": 0, stroke: "none", fill: B.pinPaneFill, "shape-rendering": "crisp", ishot: !0 }), K.pintracker = I.rect(K.trackerGroup).attr({ transform: A.transform(), x: 0, y: X - f, width: 0, height: D, stroke: "none", fill: Ga, ishot: !0, cursor: R.svg && "ew-resize" || "e-resize" }).hide().drag(function(a) {
                        var b = m + a + this.__pindragdelta,
                            c = this.__pinboundleft,
                            e = this.__pinboundright,
                            d = this.data("cliprect").slice(0);
                        b < c ? b = c : b > e && (b = e);
                        A.transform(["T", b, f]);
                        K.pintracker.transform(A.transform());
                        R.svg || (d[0] = d[0] + b - m - this.__pindragdelta, A.attr("clip-rect", d));
                        this.__pindragoffset = a
                    }, function() { this.__pinboundleft = 0 - q[0] + m + k;
                        this.__pinboundright = this.__pinboundleft + h - q[2];
                        this.data("cliprect", A.attr("clip-rect"));
                        A._.clipispath = !0 }, function() {
                        A._.clipispath = !1;
                        this.__pindragdelta = this.__pindragoffset;
                        delete this.__pindragoffset;
                        delete this.__pinboundleft;
                        delete this.__pinboundright
                    }));
                    d++;
                    v = R.crispBound(k - d, X + D + d, x + d + d, B.scrollHeight, d);
                    d--;
                    ia(C, { attr: { stroke: B.zoomPaneStroke, fill: B.zoomPaneFill, strokeWidth: 0 }, selectionStart: function() {}, selectionEnd: function(a) { var b = a.selectionLeft - k;
                            a = b + a.selectionWidth;
                            K.crossline && K.crossline.hide();
                            C[B.viewPortConfig.pinned ? "pinRangePixels" : "zoomRangePixels"](b, a) } });
                    g && 0 !== g.enabled && 1 === B.useCrossline ? (p || (p = K.crossline = new ta), p.configure(C, g)) : (g && (g.enabled = 0), p && p.hide())
                }
            },
            resetZoom: function() {
                var a =
                    this.config.viewPortHistory,
                    b = a[0];
                if (!a.length) return !1;
                a.length = 0;
                this.zoomTo(b.dsi, b.dei, b) && ua.raiseEvent("zoomReset", this._zoomargs, this.chartInstance, [this.chartInstance.id]);
                return !0
            },
            eiMethods: {
                zoomOut: function() { var a; if (a = this.apiInstance) return a.zoomOut && a.zoomOut() },
                zoomTo: function(a, b) { var c; if (c = this.apiInstance) return c.zoomRange && c.zoomRange(a, b) },
                resetChart: function() { var a; if (a = this.apiInstance) a.pinRangePixels && a.pinRangePixels(), a.resetZoom && a.resetZoom() },
                setZoomMode: function(a) {
                    var b;
                    (b = this.apiInstance) && b.activatePin && b.activatePin(!a)
                },
                getViewStartIndex: function() { var a; if (this.apiInstance && (a = this.apiInstance.config.viewPortConfig)) return a.ddsi },
                getViewEndIndex: function() { var a, b; if (this.apiInstance && (a = this.apiInstance.config.viewPortConfig)) return b = a.ddei - 1, (b >= a.clen ? a.clen : b) - 1 }
            },
            zoomOut: function() {
                var a, b, c = this.config;
                b = c.viewPortHistory;
                var h, m, f;
                a = b.pop();
                b = b[0] || c.viewPortConfig;
                a ? (h = a.dsi, m = a.dei) : c._prezoomed && (h = 0, m = b.clen - 1);
                (f = this.zoomTo(h, m, a)) && ua.raiseEvent("zoomedout",
                    f, this.chartInstance);
                return !0
            },
            zoomRangePixels: function(a, b) { var c = this.config,
                    h = c.viewPortHistory,
                    c = c.viewPortConfig,
                    m = c.ppp,
                    f = c.ddsi,
                    q;
                h.push(c);
                (q = this.zoomTo(f + xa(a / m), f + xa(b / m))) ? ua.raiseEvent("zoomedin", q, this.chartInstance): h.pop() },
            zoomRange: function(a, b) {
                var c, h, m = this.config,
                    f = m.viewPortConfig;
                h = this.components.xAxis[0];
                var q = m.viewPortHistory,
                    v;
                q.push(f);
                c = h.getPixel(a);
                h = h.getPixel(b);
                f.x = c;
                f.scaleX = m.canvasWidth / (c - h);
                (v = this.zoomTo(+a, +b)) ? ua.raiseEvent("zoomedin", v, this.chartInstance):
                    q.pop()
            },
            zoomTo: function(a, b, c) {
                var h, m;
                h = this.config;
                var f = this.components,
                    q = h.viewPortConfig,
                    v = h.canvasHeight;
                m = h.canvasLeft;
                var A = h.canvasTop,
                    n = h.canvasBottom,
                    C = h.viewPortHistory,
                    p = q.clen,
                    I = this.components.xAxis[0];
                0 > a && (a = 0);
                a >= p - 1 && (a = p - 1);
                b <= a && (b = a + 1);
                b > p - 1 && (b = p - 1);
                if (a === b || a === q.dsi && b === q.dei) return !1;
                this.pinRangePixels();
                q = oa({}, q);
                q.dsi = a;
                q.dei = b;
                q = h.viewPortConfig = q;
                c ? this.updateVisual(c.x, c.y, c.scaleX, c.scaleY) : (c = I.getPixel(a), h = I.getPixel(b), m = this.getOriginalPositions(c - m, A, h - m,
                    n - A), this.zoomSelection(m[0], 0, m[2], v));
                f.scrollBar.node.attr({ "scroll-ratio": q.vdl / (p - !!p), "scroll-position": [q.dsi / (p - q.vdl - 1), !0] });
                f = { level: C.length + 1, startIndex: a, startLabel: I.getLabel(a).label, endIndex: b, endLabel: I.getLabel(b).label };
                ua.raiseEvent("zoomed", f, this.chartInstance, [this.chartInstance.id, a, b, f.startLabel, f.endLabel, f.level]);
                return f
            },
            activatePin: function(a) {
                var b = this.config.viewPortConfig,
                    c = this.components.tb.graphics.pinButton;
                if (b.pinned ^ (a = !!a)) return a || this.pinRangePixels(),
                    ua.raiseEvent("zoomModeChanged", { pinModeActive: a }, this.chartInstance, []), this.updateButtonVisual(c.node, a ? "pressed" : "enable"), b.pinned = a
            },
            updateButtonVisual: function(a, b) {
                return a.attr({
                    disable: {
                        config: {
                            hover: { fill: "#FFFFFF", "stroke-width": 1, stroke: "#E3E3E3", cursor: "default" },
                            normal: { fill: "#FFFFFF", stroke: "#E3E3E3", "stroke-width": 1, cursor: "default" },
                            disable: { fill: "#FFFFFF", "stroke-width": 1, stroke: "#E3E3E3", "stroke-opacity": 1, cursor: "default" },
                            pressed: {
                                fill: "#FFFFFF",
                                "stroke-width": 1,
                                stroke: "#E3E3E3",
                                cursor: "default"
                            }
                        },
                        "button-disabled": !1,
                        stroke: "#E3E3E3",
                        "stroke-opacity": 1
                    },
                    enable: {
                        config: { hover: { fill: "#FFFFFF", "stroke-width": 1, stroke: "#aaaaaa", cursor: "pointer" }, normal: { fill: "#FFFFFF", stroke: "#C2C2C2", "stroke-width": 1, cursor: "pointer" }, disable: { fill: "#FFFFFF", "stroke-width": 1, stroke: "#E3E3E3", "stroke-opacity": 1, cursor: "pointer" }, pressed: { fill: "#EFEFEF", "stroke-width": 1, stroke: "#C2C2C2", cursor: "pointer" } },
                        "button-disabled": !1,
                        fill: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", !0],
                        stroke: "#C2C2C2",
                        "stroke-opacity": 1
                    },
                    pressed: { config: { pressed: { fill: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", !0] } }, fill: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", !0], stroke: "#E3E3E3" }
                }[b])
            },
            pinRangePixels: function(a, b) {
                var c, h = this.components,
                    m = h.paper,
                    f = this.graphics,
                    q = this.config,
                    v = q.canvasLeft,
                    A = q.viewPortConfig,
                    n = f.zoompin;
                c = f.pinrect;
                var C = q["clip-pinrect"],
                    p = q._pingrouptransform,
                    h = h.dataset,
                    I = b - a,
                    K, B, k, f = f.pintracker;
                if (A && n && c) {
                    if (a === b) return n.hide(), f.hide(), A.pinned = !1;
                    for (k = h.length; k--;) K = h[k], c = K.graphics,
                        B = c.pinline, B || (B = c.pinline = m.path(n)), B.attr({ path: c.lineElement.attrs.path, transform: ["T", -q._visx, -q._ymin] }).attr(K.config.pin);
                    C[0] = a + v;
                    C[2] = I;
                    n.attr({ "clip-rect": C, transform: p }).show();
                    f.__pindragdelta = 0;
                    f.show().attr({ transform: p, x: a, width: I });
                    this.getValuePixel(a);
                    this.getValuePixel(b);
                    return A.pinned = !0
                }
            },
            _createLayers: function() { var a, b = this.components.paper;
                ma.scatter._createLayers.call(this);
                a = this.graphics;
                a.imageContainer = b.group("dataset-orphan", a.dataSetGroup);
                this.__preDraw();
                this.toogleDragPan(!0) },
            getValue: function(a) { var b = this.config,
                    c = this.components,
                    h = b.viewPortConfig;
                a = this.getOriginalPositions(a.x, a.y, a.x, a.y); var m = c.xAxis[0].config.axisRange,
                    c = c.yAxis[0].config.axisRange,
                    f = m.min,
                    q = c.max; return { x: f + (a[0] - b.canvasLeft) / (b.canvasWidth * h.scaleX / (m.max - f)), y: q - (a[1] - b.canvasTop) / (b.canvasHeight * h.scaleY / (q - c.min)) } },
            getOriginalPositions: function(a, b, c, h) {
                var m = this.config,
                    f = m.viewPortConfig,
                    q = f.scaleX,
                    v = f.scaleY,
                    A = f.x,
                    f = f.y,
                    n = La(a, c);
                a = pa(a, c);
                c = La(b, h);
                b = pa(b, h);
                a = a > m.canvasWidth ? m.canvasWidth :
                    a;
                b = b > m.canvasHeight ? m.canvasHeight : b;
                n = 0 > n ? 0 : n;
                c = 0 > c ? 0 : c;
                return [A + n / q, f + c / v, (a - n) / q, (b - c) / v]
            },
            zoomSelection: function(a, b, c, h) { var m = this.config;
                c && h && (c = Math.abs(m.canvasWidth / c), h = Math.abs(m.canvasHeight / h), this.updateVisual(a, b, c, h)) },
            updateVisual: function(a, b, c, h, m) {
                var f = this.config,
                    q = f.viewPortConfig,
                    v = f.canvasWidth,
                    A = f.canvasHeight,
                    n = f.viewPortHistory.slice(-1)[0] || q,
                    f = f.maxZoomLimit;
                q.x = isNaN(a) ? a = n.x : a;
                q.y = isNaN(b) ? b = n.y : b;
                q.scaleX = c || (c = n.scaleX);
                q.scaleY = h || (h = n.scaleY);
                c > f && (q.x = La(a,
                    v - v / f), q.scaleX = f);
                h > f && (q.y = La(b, A - A / f), q.scaleY = f);
                this.updateManager(m)
            },
            toogleDragPan: function(a) { var b = this.config.viewPortConfig,
                    c = b.status;
                a && (b.status = "zoom" === c ? "pan" : "zoom") },
            resize: function() {
                var a = this.config,
                    b = this.graphics,
                    c = this.components.canvas,
                    h = c.graphics,
                    m = h.canvasBorderElement,
                    h = h.canvasElement,
                    c = c.config.canvasBorderThickness,
                    f = c / 2,
                    q = a.canvasHeight -= c,
                    v = a.canvasWidth -= 2 * c,
                    A = a.canvasLeft += c;
                a.canvasBottom -= c;
                a.canvasRight -= c;
                h ? h.attr({ x: A, y: a.canvasTop, height: q, width: v }) : this.drawCanvas();
                m && m.attr({ x: A - f, y: a.canvasTop - f, height: q + c, width: v + c, "stroke-width": c });
                b.imageContainer.attr({ "clip-rect": a.canvasLeft + "," + a.canvasTop + "," + a.canvasWidth + "," + a.canvasHeight }).transform("t" + a.canvasLeft + "," + a.canvasTop);
                b.trackerElem.attr({ x: a.canvasLeft, y: a.canvasTop, width: a.canvasWidth, height: a.canvasHeight });
                b.tracker && b.tracker.attr({ "clip-rect": a.canvasLeft + "," + a.canvasTop + "," + a.canvasWidth + "," + a.canvasHeight })
            },
            updateManager: function(a) {
                var b, c;
                c = this.components;
                var h = c.dataset,
                    m = h.length;
                b =
                    this.config;
                var f = b.viewPortConfig,
                    q = b._ypvr,
                    v = b._visw,
                    A = this.components.xAxis[0],
                    n = function() { return A.getPixel.apply(A, arguments) },
                    C = A.getAxisConfig("labels").style,
                    p, I, K, B, k, x = this.updateButtonVisual,
                    G = c.tb.graphics,
                    N = G.zoomOutButton,
                    G = G.resetButton,
                    D = b.viewPortHistory;
                if (b.legendClicked)
                    for (a = 0; a < m; a += 1) h[a].draw();
                else {
                    !f && (f = b.viewPortConfig);
                    p = f.oppp;
                    k = K = f.nvl;
                    I = f.dsi;
                    K = f.dei;
                    I = f.vdl = K - I;
                    K = f.ppl = k ? v / k : f.oppl;
                    v = f.step = (B = f.ppp = v / I) < p ? Ea(p / B) : 1;
                    C = f.lskip = Ea(pa(K, Ba(C.lineHeight)) / B / v);
                    void 0 !==
                        a ? (p = (f.clen - I - 1) * a, f.offset = (p - (p = Fa(p))) * B, I = p + I) : (p = f.dsi, I = f.dei, f.offset = 0);
                    B = f.norm = p % v;
                    f.ddsi = p -= B;
                    f.ddei = I = I + 2 * v - B;
                    f.pvr = q;
                    f._ymin = b._ymin;
                    f._yminValue = b._yminValue;
                    f.x = (n(p) - n(A.getLimit().min) + f.offset) / f.scaleX;
                    I - p > A.getCategoryLen() ? f.scaleX = 1 : f.scaleX = A.getCategoryLen() / Math.abs(I - p - v - .9);
                    void 0 !== a && c.scrollBar.node && c.scrollBar.node.attr({ "scroll-position": f._pos = a });
                    c = A._getVisibleConfig();
                    c = Math.ceil((c.maxValue - c.minValue + 1) / k);
                    b = b.viewPortConfig && b.viewPortConfig.scaleX;
                    b = Math.max(Math.round(A.getAxisConfig("labelStep") /
                        b), k ? c : C * v);
                    A.setLabelConfig({ step: b });
                    b = A.getAxisConfig("animateAxis");
                    k = A.getAxisConfig("drawAxisName");
                    a && A.setAxisConfig({ animateAxis: !1, drawAxisName: !1 });
                    A.draw();
                    A.setAxisConfig({ animateAxis: b, drawAxisName: k });
                    for (a = 0; a < m; a += 1) h[a].draw();
                    x(N.node, f.vdl === f.clen - 1 ? "disable" : "enable");
                    x(G.node, 0 < D.length ? "enable" : "disable");
                    la.FC_DEV_ENVIRONMENT && la.jQuery && (FusionCharts["debugger"].enable() ? (this.debug = this.debug || (la.jQuery("#fc-zoominfo").length || la.jQuery("body").append('<pre id="fc-zoominfo">'),
                        la.jQuery("#fc-zoominfo").css({ position: "absolute", left: "10px", top: "0", "pointer-events": "none", opacity: .7, width: "250px", zIndex: "999", border: "1px solid #cccccc", "box-shadow": "1px 1px 3px #cccccc", background: "#ffffff" })), this.debug.text(JSON.stringify(f, 0, 2))) : (this.debug && la.jQuery("#fc-zoominfo").remove(), delete this.debug))
                }
            },
            _drawDataset: function() { ma.zoomline.updateManager.call(this) },
            getParsedLabel: function(a) { var b = this.xlabels; return b.parsed[a] || (b.parsed[a] = Ya(b.data[a] || "")) },
            _createToolBox: function() {
                var a,
                    b, c, h, m, f, q, v = this,
                    A = v.config;
                q = A.allowPinMode;
                h = v.components;
                var n = A.showToolBarButtonTooltext;
                a = h.chartMenuBar;
                b = h.actionBar;
                a && a.drawn || b && b.drawn || (ma.scrollcolumn2d._createToolBox.call(v), a = h.tb, b = a.graphics || (a.graphics = {}), c = h.toolBoxAPI || a.getAPIInstances(a.ALIGNMENT_HORIZONTAL), c = c.Symbol, h = (h.chartMenuBar || h.actionBar).componentGroups[0], m = b.zoomOutButton = (new c("zoomOutIcon", void 0, a.idCount++, a.pId)).attachEventHandlers({
                    click: function() { v.zoomOut() },
                    tooltext: n && A.btnZoomOutTooltext ||
                        ""
                }), f = b.resetButton = (new c("resetIcon", void 0, a.idCount++, a.pId)).attachEventHandlers({ click: function() { v.resetZoom() }, tooltext: n && A.btnResetChartTooltext || "" }), q && (q = b.pinButton = (new c("pinModeIcon", void 0, a.idCount++, a.pId)).attachEventHandlers({ click: function() { v.activatePin(!A.viewPortConfig.pinned) }, tooltext: n && A.btnSwitchToPinModeTooltext || "" }), h.addSymbol(q, !0)), h.addSymbol(f, !0), h.addSymbol(m, !0))
            },
            _scrollBar: ma.scrollcolumn2d,
            _manageScrollerPosition: ma.scrollcolumn2d,
            draw: function() {
                var a,
                    b, c, h, m, f, q, v, A, n, C = this,
                    p = C.config,
                    I = C.graphics || (C.graphics = {});
                f = C.components;
                a = C.jsonData;
                h = a.dataset;
                var K = a.categories && a.categories[0].category,
                    B;
                ma.msline.draw.call(C);
                q = p.canvasLeft;
                v = p.canvasTop;
                A = p.canvasHeight;
                n = p.canvasWidth;
                a = p.borderWidth;
                b = p.useRoundEdges;
                c = p.viewPortConfig;
                (B = I.toolboxParentGroup) || (B = I.toolboxParentGroup = f.paper.group("toolbarParentGroup", I.parentGroup));
                h && K && (a++, h = R.crispBound(q - a, v + A + a, n + a + a, p.scrollHeight, a), a--, f = (m = f.scrollBar) && m.node, m.draw(h.x + (b && -1 ||
                    a % 2), h.y - (b && 4 || 2), { isHorizontal: !0, width: h.width - (!b && 2 || 0), height: h.height, showButtons: p.scrollShowButtons, scrollRatio: c.vdl / (c.clen - !!c.clen), scrollPosition: [c.dsi / (c.clen - c.vdl - 1), !1], r: b && 2 || 0, parentLayer: B.insertBefore(I.datalabelsGroup) }), !f && function() {
                    var a;
                    R.eve.on("raphael.scroll.start." + m.node.id, function(b) { a = b;
                        C.graphics.crossline && C.graphics.crossline.disable(!0);
                        ua.raiseEvent("scrollstart", { scrollPosition: b }, C.chartInstance) });
                    R.eve.on("raphael.scroll.end." + m.node.id, function(b) {
                        C.graphics.crossline &&
                            C.graphics.crossline.disable(!1);
                        ua.raiseEvent("scrollend", { prevScrollPosition: a, scrollPosition: b }, C.chartInstance)
                    })
                }())
            }
        }, ma.msline, { showValues: 0, zeroplanethickness: 1, zeroplanealpha: 40, showzeroplaneontop: 0 });
        ma("zoomlinedy", {
            standaloneInit: !0,
            defaultDatasetType: "zoomline",
            applicableDSList: { zoomline: !0 },
            creditLabel: Ia,
            friendlyName: "Zoomable and Panable Multi-series Dual-axis Line Chart",
            _spaceManager: ma.msdybasecartesian._spaceManager,
            _setAxisLimits: ma.msdybasecartesian._setAxisLimits,
            _createAxes: ma.msdybasecartesian._createAxes,
            _feedAxesRawData: ma.msdybasecartesian._feedAxesRawData
        }, ma.zoomline, { isdual: !0 });
        FusionCharts.register("component", ["dataset", "zoomline", {
            _setConfigure: function() { var a = this.config,
                    b = this.chart.jsonData.chart,
                    c = this.JSONData;
                a.drawanchors = G(b.drawanchors, b.showanchors, 1);
                a.anchorradius = G(c.anchorradius, b.anchorradius, a.linethickness + 2);
                this.__base__._setConfigure.apply(this, arguments) },
            configure: function() {
                var a, b, c = {};
                a = this.chart.jsonData.chart;
                a.animation = 0;
                a.showvalues = G(a.showvalues, 0);
                this.__base__.configure.call(this);
                b = this.config;
                a = b.linethickness + G(a.pinlinethicknessdelta, 1);
                c["stroke-width"] = 0 < a && a || 0;
                c["stroke-dasharray"] = [3, 2];
                c.stroke = fa.hashify(b.linecolor);
                c["stroke-opacity"] = b.alpha / 100;
                c["stroke-linejoin"] = b["stroke-linejoin"] = "round";
                c["stroke-linecap"] = b["stroke-linecap"] = "round";
                b.pin = c;
                b.animation = !1;
                b.transposeanimduration = 0
            },
            draw: function() {
                var a, b, c, h = !1,
                    m = !1,
                    f = this,
                    q = f.JSONData,
                    v = f.chart,
                    A = v.components,
                    n = f.config,
                    C = f.index || f.positionIndex,
                    p = v.config,
                    I = v.jsonData.chart,
                    K = f.components,
                    B = K.data,
                    k = B.length,
                    x, aa = A.paper,
                    N = A.xAxis[0],
                    D = f.yAxis,
                    Z, X, d = v.graphics,
                    L = d.datalabelsGroup,
                    g = fa.parseUnsafeString,
                    R = fa.getValidValue,
                    l, e, ba, ha, r, w, u, F, t, ia, ma = n.linethickness,
                    la = f.graphics.container,
                    oa = f.graphics.trackerContainer,
                    ta = function(a) { Za.call(this, v, a) },
                    ua = function(a) { var b = this.data("dataObj");
                        b.config.hoverEffects && b && b.graphics && b.graphics.element && f._hoverPlotAnchor(b, "DataPlotRollOver", I);
                        Za.call(this, v, a, "DataPlotRollOver") },
                    va = function(a) {
                        var b = this.data("dataObj");
                        b.config.hoverEffects &&
                            b && b.graphics && b.graphics.element && f._hoverPlotAnchor(b, "DataPlotRollOut", I);
                        Za.call(this, v, a, "DataPlotRollOut")
                    },
                    wa = p.viewPortConfig,
                    P = p.showtooltip,
                    xa, qa = d.datasetGroup,
                    na, za = n.shadow,
                    J, y = f.graphics.dataLabelContainer,
                    z = {},
                    H, S, O = v.is3D,
                    W = n.use3dlineshift,
                    E, T, Q, Aa = D.getAxisBase(),
                    Ba = D.yBasePos = D.getAxisPosition(Aa),
                    ga = N.getAxisPosition(0),
                    Da = N.getAxisPosition(1) - ga,
                    Ea, ja = O ? 10 : 0,
                    M = O && W ? 10 : 0,
                    ea = [pa(0, p.canvasLeft - ja), pa(0, p.canvasTop - M), pa(1, p.canvasWidth + 2 * ja), pa(1, p.canvasHeight + M)],
                    V = [pa(0, p.canvasLeft -
                        ja), pa(0, p.canvasTop - M), 1, pa(1, p.canvasHeight + 2 * M)],
                    ka = {},
                    Ha = v.hasScroll || !1,
                    da, Fa = n.lineDashStyle,
                    Ia = { color: n.linecolor, alpha: n.alpha };
                [ra(Ia), Fa].join(":");
                var Ma, Na, Qa, Va = f.graphics.lineElement,
                    Wa = f.visible,
                    Ya, Ua, ya = f.pool || (f.pool = { element: [] }),
                    jb = {},
                    Y = {},
                    ca = {},
                    kb = n.anchorradius,
                    lb, fb = [],
                    mb, Ca, ab, bb, gb, hb, tb = p.showTerminalValidData,
                    Xa = p.viewPortConfig,
                    ub = p.showPeakData,
                    nb = p.maxPeakDataLimit,
                    ob = p.minPeakDataLimit,
                    pb = G(p.useCrossline, 0),
                    Oa = Xa.step,
                    ib = N.getPixel(Xa.step) - ga < Xa.amrd,
                    qb = function(b,
                        c) {
                        var d = b.graphics;
                        S = b.config;
                        r = S.setValue;
                        ha = S.setLink;
                        Ya = S.x || c;
                        T = R(g(sa(S.setLevelTooltext, q.plottooltext, I.plottooltext)));
                        E = S.showValue;
                        z = S.anchorProps;
                        J = z.shadow;
                        u = S.displayValue;
                        Ua = S.dip || 0;
                        b || (b = B[c] = { graphics: {} });
                        Qa = { color: S.color, alpha: S.alpha };
                        Q = S.dashStyle;
                        Z = S.xPos || N.getAxisPosition(Ya) - ja;
                        X = f.visible ? D.getAxisPosition(r) + M : Ba;
                        na = S.hoverEffects;
                        z.isAnchorHoverRadius = na.anchorRadius;
                        lb = N.getLabel(c);
                        l = pb ? "" : S.toolText + (T ? "" : S.toolTipValue);
                        w = {
                            index: c,
                            link: ha,
                            value: r,
                            displayValue: u,
                            categoryLabel: lb,
                            toolText: l,
                            id: n.userID,
                            datasetIndex: C,
                            datasetName: q.seriesname,
                            visible: Wa
                        };
                        null === S.setValue || ib || (z.imageUrl ? (H = new U, H.onload = f._onAnchorImageLoad(f, c, w, Z, X), H.onerror = f._onErrorSetter(Z, X, c, f), H.src = z.imageUrl) : (e = d.element, e || (e = ya.element && ya.element.length ? d.element = ya.element.shift() : d.element = aa.polypath(la.anchorGroup)), e.attr({
                            polypath: [z.symbol[1] || 2, Z, X, z.radius, z.startAngle, Ua],
                            fill: ra({ color: z.bgColor, alpha: z.bgAlpha }),
                            stroke: ra({ color: z.borderColor, alpha: z.borderAlpha }),
                            "stroke-width": z.borderThickness,
                            visibility: z.radius ? Wa : "hidden"
                        }).shadow(J, la.anchorShadowGroup).data("anchorRadius", z.radius).data("anchorHoverRadius", na.anchorRadius).data("setRolloverAttr", ia).data("setRolloutAttr", t), e[r || 0 === r ? "show" : "hide"]()), ia = { polypath: [na.anchorSides || 2, Z, X, na.anchorRadius, na.startAngle, na.dip], fill: ra({ color: na.anchorColor, alpha: na.anchorBgAlpha }), stroke: ra({ color: na.anchorBorderColor, alpha: na.anchorBorderAlpha }), "stroke-width": na.anchorBorderThickness }, t = {
                            polypath: [z.sides, Z, X, z.radius, z.startAngle,
                                Ua
                            ],
                            fill: ra({ color: z.bgColor, alpha: z.bgAlpha }),
                            stroke: ra({ color: z.borderColor, alpha: z.borderAlpha }),
                            "stroke-width": z.borderThickness
                        }, e && e.data("anchorRadius", z.radius).data("anchorHoverRadius", na.anchorRadius).data("setRolloverAttr", ia).data("setRolloutAttr", t), kb = pa(z.radius, na && na.anchorRadius || 0), xa = { cx: Z, cy: X, r: kb, cursor: ha ? "pointer" : "", stroke: Ga, "stroke-width": z.borderThickness, fill: Ga, ishot: !0, visibility: Wa }, z.imageUrl || !ha && !P || (ba = d.hotElement, ba || (ya.hotElement && ya.hotElement.length ? ba =
                            d.hotElement = ya.hotElement.shift() : (a = !0, ba = d.hotElement = aa.circle(oa))), ba.show().attr(xa), (ba || e).data("eventArgs", w).data("groupId", void 0).data("dataObj", b), a && (ba || e).click(ta).hover(ua, va), a = !1));
                        b._xPos = Z;
                        b._yPos = X;
                        [ra(Qa || Ia), Q || Fa].join(":");
                        ca = f.getLinePath([b], ca);
                        Ma = ra(Qa || Ia);
                        Na = Q || Fa;
                        sa(S.setColor, S.setAlpha, S.setDashed);
                        [Ma, Na].join(":");
                        E && !z.imageUrl && f.drawLabel(c);
                        fb.push(b)
                    },
                    vb = function(a, b) {
                        var c = a && a.length,
                            d = a.slice().sort(function(a, b) { return a.config.setValue - b.config.setValue }),
                            f = d && d.pop().config.setValue,
                            g = d.length && d.shift().config.setValue || f,
                            d = 0;
                        if (f > nb || g < ob)
                            for (; d < c;) { e = a[d];
                                f = e.config.setValue; if (f > nb || f < ob) f = b + d, qb(e, f);
                                d += 1 }
                    },
                    cb = function(a, c) {--a;
                        c += 1; var d; for (x = a; x < c; x += 1)
                            for (d in b = B[x] && B[x].graphics || {}, B[x] && (B[x].config.isRemoving = !0), b) ya[d] || (ya[d] = []), b[d] && (ya[d].push(b[d].hide()), b[d] = void 0) },
                    db = wa.ddsi || 0,
                    Pa = wa.ddei || k,
                    Sa = n._oldStartIndex,
                    Ta = n._oldEndIndex,
                    wb = n._oldStep,
                    rb = K.removeDataArr,
                    xb = rb && rb.length;
                qa.line = qa.line || aa.group("line", qa);
                qa.lineConnector =
                    qa.lineConnector || aa.group("line-connector", qa);
                la || (la = f.graphics.container = { lineShadowGroup: aa.group("connector-shadow", qa.line), anchorShadowGroup: aa.group("anchor-shadow", qa.lineConnector), lineGroup: aa.group("line", qa.line), anchorGroup: aa.group("anchors", qa.lineConnector) }, la.lineGroup.trackTooltip(!0), Wa || (la.lineShadowGroup.hide(), la.anchorShadowGroup.hide(), la.lineGroup.hide(), la.anchorGroup.hide()));
                oa || (oa = f.graphics.trackerContainer = aa.group("line-hot", d.trackerGroup).toBack(), Wa || oa.hide());
                B || (B = f.components.data = []);
                y || (y = f.graphics.dataLabelContainer = f.graphics.dataLabelContainer || aa.group("datalabel", L), Wa || y.hide());
                Ea = Da * k;
                ib && !n._oldHideAnchors ? cb(Sa, Ta) : Oa !== wb ? cb(Sa, Ta) : (db > Sa && cb(Sa, db > Ta ? Ta : db), Pa < Ta && cb(Pa < Sa ? Sa : Pa, Ta), (db < Sa || Pa > Ta) && cb(Sa, Ta));
                n._oldHideAnchors = ib;
                n._oldEndIndex = Pa;
                n._oldStep = Oa;
                f.setVisibility(Wa);
                for (x = n._oldStartIndex = db; x <= Pa; x += Oa) {
                    F = B[x] || {};
                    S = F.config || {};
                    S.isRemoving = !1;
                    r = S.setValue || null;
                    ab = x;
                    if (tb)
                        if (0 === x && null === r) {
                            mb = 0;
                            for (Ca = c = x; Ca < k;)
                                if (null !==
                                    B[Ca].config.setValue || h ? h = !0 : Ca++, null === B[c].config.setValue && !m && c <= k ? (c += Oa, mb++) : m = !0, h && m) { h = m = !1; break }
                            0 !== Ca % Oa && (S = B[Ca].config, ab = Ca)
                        } else if (x >= k && null === r) { for (Ca = c = x; 0 < Ca && (void 0 !== B[Ca] || h ? h = !0 : Ca--, void 0 === B[c] && !m && 0 <= c ? c -= Oa : m = !0, !h || !m););
                        0 !== Ca % Oa && (S = B[Ca].config, ab = Ca) }
                    if (F = B[ab]) qb(F, ab), ub && 1 < Oa && (bb = La(x + 1, Pa), hb = La(bb + Oa, Pa), gb = hb === Pa ? B.slice(bb) : B.slice(bb, hb), gb.length && vb(gb, bb))
                }
                Y = f.getLinePath(fb, {});
                jb = f.getLinePath(fb, jb);
                n.lastPath = Y;
                Va || (Va = ya.lineElement && ya.lineElement.length ?
                    f.graphics.lineElement = ya.lineElement.shift() : f.graphics.lineElement = aa.path(la.lineGroup));
                pb || Va.tooltipListenerAttached || (Va.tooltipListenerAttached = !0, Va.mousemove(function(a) { Xa = p.viewPortConfig; var b = p._visx,
                        c = Xa.step,
                        d = Xa.ppp * c,
                        b = eb(v.linkedItems.container, a).chartX - b,
                        e;
                    a = p.tooltipSepChar;
                    b = (b += d / 2 + Xa.offset) - b % d;
                    e = (e = v.getValuePixel(b)) + e % c;
                    c = N.getLabel(e).label + a + f.components.data[e].config.formatedVal;
                    c = n.seriesname && n.seriesname + a + c || c;
                    Va.tooltip(0 === p.crossline.enabled ? c : !1) }));
                Va.attr({
                    path: Y.getPathArr(),
                    "stroke-dasharray": Fa,
                    "stroke-width": ma,
                    stroke: ra(Ia),
                    "stroke-linecap": "round",
                    "stroke-linejoin": 2 <= ma ? "round" : "miter"
                }).shadow(za, la.lineShadowGroup);
                Ha && (da = ka.startPercent, ea[2] = Ea + V[0], 1 === da && (V[0] = ea[2], ea[0] = 0));
                ea[3] += M;
                f.drawn = !0;
                xb && f.remove()
            },
            setVisibility: function(a, b) { var c = this.graphics,
                    h = c && c.container,
                    m = c && c.trackerContainer,
                    c = c && c.dataLabelContainer,
                    f = a ? "show" : "hide";
                h.lineGroup[f]();
                h.anchorGroup[f]();
                h.anchorShadowGroup[f]();
                h.lineShadowGroup[f]();
                m[f]();
                c[f]();
                b && this.transposeLimits(a) },
            transposeLimits: function(a) { var b = this.chart,
                    c = b.config,
                    h = this.yAxis;
                b._chartAnimation();
                this.visible = a;
                this._conatinerHidden = !a;
                b._setAxisLimits();
                h.draw();
                c.legendClicked = !0;
                b._drawDataset();
                delete c.legendClicked },
            hide: function() { this.setVisibility(!1, !0) },
            show: function() { this.setVisibility(!0, !0) }
        }, "Line"]);
        ta = function() {};
        ta.prototype.configure = function(a, b) {
            var c, h, m, f = {},
                q = this,
                v = a.components,
                A = v.numberFormatter,
                n = v.paper,
                C = a.config;
            c = a.graphics;
            h = this.left = C._visx;
            m = this.top = C.canvasTop;
            var p =
                this.height = C.canvasHeight,
                I = this._visout = C._visout,
                K = this.plots = a.components.dataset,
                B = c.datalabelsGroup,
                k, x, G = b.labelstyle,
                N = b.valuestyle,
                D = v.yAxis[0],
                Z = D.getLimit(),
                X = v.yAxis[1],
                d = X && X.getLimit();
            x = this.tracker;
            var v = this.labels,
                L = this.positionLabel;
            k = a.get("linkedItems");
            var g = k.container,
                R = k.eventListeners || (k.eventListeners = []);
            q.width = C._visw;
            k = this.group;
            k || (k = this.group = n.group("crossline-labels", B), this.container = g);
            k.attr({ transform: ["T", h, C._ymin] }).css(N);
            x || (x = q.tracker = g, R.push(Ma(g,
                "touchstart mousemove",
                function(b) { var c = q.onMouseMove,
                        d = q.onMouseOut;
                    a.isWithinCanvas(b, a).insideCanvas ? c.call(q, b) : d.call(q, b) }, q)), R.push(Ma(g, "mousedown", function() { q.onMouseDown() }, q)), R.push(Ma(g, "mouseup", function() { q.onMouseUp() }, q)), R.push(Ma(g, "mouseout", function() { q.onMouseOut() }, q)));
            x = this.line;
            x || (x = this.line = n.path(B).toBack());
            x.attr(oa({ path: ["M", h, m, "l", 0, p] }, b.line));
            v || (v = this.labels = b.valueEnabled && n.set());
            b.labelEnabled ? (f.x = I, f.y = m + p + (C.scrollHeight || 0) + 2.5, f["vertical-align"] =
                "top", f.direction = C.textDirection, f.text = "", L ? (L.attr(f), L.css(G)) : L = this.positionLabel = n.text(f, G, c.datalabelsGroup).insertBefore(c.datasetGroup)) : (L && L.remove(), delete this.positionLabel);
            this.hide();
            this.ppixelRatio = -D.getPVR();
            this.spixelRatio = X && -X.getPVR();
            this.yminValue = C._yminValue;
            this.pyaxisminvalue = Z.min;
            this.pyaxismaxvalue = Z.max;
            this.syaxisminvalue = d && d.min;
            this.syaxismaxvalue = d && d.max;
            this.positionLabels = C.xlabels || { data: [], parsed: [] };
            this.chart = a;
            this.getZoomInfo = function() { return C.viewPortConfig };
            this.getDataIndexFromPixel = function(b) { return Math.round(a.components.xAxis[0].getValue(b)) };
            this.getPositionLabel = function(b) { return (b = a.components.xAxis[0].getLabel(b)) && b.label || "" };
            if (b.valueEnabled) {
                c = 0;
                for (h = K.length; c < h; c += 1) m = K[c], m = na(m.config.linecolor), f.x = 0, f.y = I, f.fill = m, f.direction = C.textDirection, f.text = "", f["text-bound"] = N["text-bound"], f.lineHeight = N.lineHeight, v[c] ? v[c].attr(f) : v[c] = v.items[c] = n.text(f, void 0, k);
                for (; c < v.items.length; c += 1) v[c].remove(), delete v[c], v.items.splice(c,
                    1);
                this.numberFormatter = A
            } else if (v.items && v.items.length) { for (c = 0; c < v.items.length; c += 1) v[c].remove(), delete v[c];
                v.length = 0 }
        };
        ta.prototype.disable = function(a) { void 0 !== a && (this.disabled = !!a) && this.visible && this.hide(); return this.disabled };
        ta.prototype.onMouseOut = function() { this.hide();
            this.position = void 0 };
        ta.prototype.onMouseDown = function() {!Na && this.hide();
            this._mouseIsDown = !0 };
        ta.prototype.onMouseUp = function() {!Na && this.hide();
            delete this._mouseIsDown };
        ta.prototype.onMouseMove = function(a) {
            if (!(this.disabled ||
                    this._mouseIsDown && !Na)) {
                var b, c = this.getZoomInfo(),
                    h = this.line,
                    m = this.left,
                    c = c.step,
                    f = this.chart,
                    q = f.components.xAxis[0],
                    f = f.get("config"),
                    v = f.canvasLeft,
                    A = q.getAxisConfig("axisDimention");
                a = eb(this.container, a).chartX - m;
                var m = q._getVisibleConfig(),
                    A = A.x - v,
                    n;
                n = (n = this.getDataIndexFromPixel(va(a))) + ((b = n % c) > c / 2 ? c - b : -b);
                a = q.getPixel(n) - A - v;
                h.transform(["T", va(a), 0]);
                this.hidden && 0 !== f.crossline.enabled && this.show();
                (n < m.minValue || n > m.maxValue) && this.hide();
                if (n !== this.position || this.hidden) this.position =
                    n, this.lineX = a, this.updateLabels()
            }
        };
        ta.prototype.updateLabels = function() {
            var a = this,
                b = a.labels,
                c = a.plots,
                h = a.width,
                m = a.position,
                f = a.lineX,
                q = xa(f),
                v = a.ppixelRatio,
                A = a.spixelRatio,
                n = a.yminValue,
                C = a._visout,
                p = a.numberFormatter,
                I = a.pyaxisminvalue,
                G = a.pyaxismaxvalue,
                B = a.syaxisminvalue,
                k = a.syaxismaxvalue,
                x = function() {
                    function b() { this.y = 0;
                        this.lRef = void 0;
                        this.__index = this.__shift = 0 }

                    function c(a) { for (var b = 0; b < a;) this.push(b++); return this }

                    function f(a) {
                        var b, c, d, g = {},
                            h = Number.POSITIVE_INFINITY;
                        for (b =
                            0; b < this.length; b++) c = this[b] - a, 0 > c ? d = x.NEG : d = x.POS, c = e(c), c <= h && (h = c, g.absValue = c, g.noScaleSide = d);
                        return g
                    }

                    function h(a) { this.holes = c.call([], a) }
                    var k = -1 * a.height,
                        d = n * v,
                        m = 0,
                        g, p = {},
                        l, e = Math.abs,
                        q = Math.floor,
                        x = {};
                    "function" != typeof Object.create && (Object.create = function() {
                        function a() {}
                        var b = Object.prototype.hasOwnProperty;
                        return function(c) {
                            var d, e, f;
                            if ("object" != typeof c) throw new TypeError("Object prototype may only be an Object or null");
                            a.prototype = c;
                            f = new a;
                            a.prototype = null;
                            if (1 < arguments.length)
                                for (e in d =
                                    Object(arguments[1]), d) b.call(d, e) && (f[e] = d[e]);
                            return f
                        }
                    }());
                    Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) { var c, d, e; if (null == this) throw new TypeError('"this" is null or not defined');
                        d = Object(this);
                        e = d.length >>> 0; if (0 === e) return -1;
                        c = +b || 0;
                        Infinity === Math.abs(c) && (c = 0); if (c >= e) return -1; for (c = Math.max(0 <= c ? c : e - Math.abs(c), 0); c < e;) { if (c in d && d[c] === a) return c;
                            c++ } return -1 });
                    Array.prototype.forEach || (Array.prototype.forEach = function(a, b) {
                        var c, d, e, f, g;
                        if (null == this) throw new TypeError(" this is null or not defined");
                        e = Object(this);
                        f = e.length >>> 0;
                        if ("function" !== typeof a) throw new TypeError(a + " is not a function");
                        1 < arguments.length && (c = b);
                        for (d = 0; d < f;) d in e && (g = e[d], a.call(c, g, d, e)), d++
                    });
                    b.prototype.constructor = b;
                    b.prototype.applyShift = function(a) { this.__shift = a;
                        this.lRef.calcY = this.y += a * m };
                    b.prototype.applyDirectIndex = function(a) { this.__index = a;
                        this.lRef.calcY = this.y = k - a * m * -1 };
                    try {
                        Object.defineProperty(x, "POS", { enumerable: !1, configurable: !1, get: function() { return 1 } }), Object.defineProperty(x, "NEG", {
                            enumerable: !1,
                            configurable: !1,
                            get: function() { return -1 }
                        })
                    } catch (r) { x.POS = 1, x.NEG = -1 }
                    h.prototype = Object.create(Array.prototype);
                    h.prototype.constructor = h;
                    h.prototype.repositionHoles = function() { var a, b = 0,
                            c; for (a = this.holes.length = 0; a < this.length; a++) c = this[a], !c && (this.holes[b++] = a) };
                    h.prototype.attachShift = function(a, c, d) {
                        var e, g = this.length;
                        if (a === C) d.calcY = C;
                        else if (g = c > g - 1 ? g - 1 : c, e = this[g], c = new b, c.y = a, c.lRef = d, e) {
                            a = f.call(this.holes, g);
                            d = g + a.absValue * a.noScaleSide;
                            if (a.noScaleSide === x.POS) return c.applyDirectIndex(d),
                                this.splice(d, 1, c), this.holes.splice(this.holes.indexOf(d), 1), d;
                            if (a.noScaleSide === x.NEG) { a = this.splice(d + 1, this.length - 1);
                                this.pop();
                                a.forEach(function(a) { a && a.applyShift(-1) }); for ([].push.apply(this, a); this[d];) d++;
                                this.push(0);
                                this.repositionHoles();
                                a = f.call(this.holes, d);
                                d += a.absValue * a.noScaleSide;
                                c.applyDirectIndex(d);
                                this.splice(d, 1, c);
                                this.repositionHoles(); return this.length - 1 }
                        } else c.applyDirectIndex(g), this.splice(g, 1, c), this.holes.splice(this.holes.indexOf(g), 1)
                    };
                    try {
                        Object.defineProperty(p,
                            "top", { enumerable: !1, configurable: !1, get: function() { return k } }), Object.defineProperty(p, "bottom", { enumerable: !1, configurable: !1, get: function() { return d } })
                    } catch (r) { p.top = k, p.bottom = d }
                    p.init = function(a, b) { var c;
                        m = a + 2;
                        k += m / 2;
                        l = q(e(k) / m);
                        g = new h(l); for (c = 0; c < l; c++) g.push(0) };
                    p.occupy = function(a, b) { var c = q(e(k - a) / m);
                        g && g.attachShift(a, c, b) };
                    return p
                }();
            b && (b[0] && b[0].attr({ text: p.yAxis("0") }), b[0] && x.init(b[0].getBBox().height, b.length), b.forEach(function(a, b) {
                var f = c[b],
                    h = f.components.data[m] && f.components.data[m].config.setValue,
                    p = f.config.parentYAxis;
                x.occupy(void 0 === h || !f.visible || (p ? h > k || h < B : h > G || h < I) ? C : p ? (h - B) * A : (h - I) * v, a)
            }));
            b && b.forEach(function(a, b) {
                var k = c[b],
                    n, v;
                (k = p[k.config.parentYAxis ? "sYAxis" : "yAxis"](k.components.data[m] && k.components.data[m].config.setValue)) ? (a.attr({ text: k }), k = (k = (k = (k = a.getBBox()) && k.width) && .5 * k) && k + 10, v = a.calcY, n = pa(0, La(q, h)), void 0 !== v && void 0 !== n && a.attr({ x: n, y: v, "text-anchor": f <= k && "start" || f + k >= h && "end" || "middle", "text-bound": ["rgba(255,255,255,0.8)", "rgba(0,0,0,0.2)", 1, 2.5] })) :
                a.attr({ x: -h })
            });
            a.positionLabel && a.positionLabel.attr({ x: f + a.left, text: a.getPositionLabel(m), "text-bound": ["rgba(255,255,255,1)", "rgba(0,0,0,1)", 1, 2.5] })
        };
        ta.prototype.show = function() { this.disabled || (this.hidden = !1, this.group.attr("visibility", "visible"), this.line.attr("visibility", "visible"), this.positionLabel && this.positionLabel.attr("visibility", "visible")) };
        ta.prototype.hide = function() {
            this.hidden = !0;
            this.group.attr("visibility", "hidden");
            this.line.attr("visibility", "hidden");
            this.positionLabel &&
                this.positionLabel.attr("visibility", "hidden")
        };
        ta.prototype.dispose = function() { for (var a in this) this.hasOwnProperty(a) && delete this[a] };
        R.addSymbol({
            pinModeIcon: function(a, b, c) { var h = .5 * c,
                    m = a - c,
                    f = a + c,
                    q = a - h,
                    v = a + h,
                    A = a + .5,
                    n = A + 1,
                    C = A + 1.5,
                    p = b - c,
                    I = b + h,
                    G = b - h,
                    h = b + (c - h); return ["M", m, p, "L", q, G, q, h, m, I, a - .5, I, a, b + c + .5, A, I, f, I, v, h, v, G, f, p, C, p, C, G, C, h, n, h, n, G, C, G, C, p, "Z"] },
            zoomOutIcon: function(a, b, c) {
                a -= .2 * c;
                b -= .2 * c;
                var h = .8 * c,
                    m = R.rad(43),
                    f = R.rad(48),
                    q = a + h * qa(m),
                    m = b + h * Aa(m),
                    v = a + h * qa(f),
                    f = b + h * Aa(f),
                    A = R.rad(45),
                    n = q + c * qa(A),
                    C = m + c * Aa(A),
                    p = v + c * qa(A);
                c = f + c * Aa(A);
                return ["M", q, m, "A", h, h, 0, 1, 0, v, f, "Z", "M", q + 1, m + 1, "L", n, C, p, c, v + 1, f + 1, "Z", "M", a - 2, b, "L", a + 2, b, "Z"]
            },
            resetIcon: function(a, b, c) { var h = a - c,
                    m = (wa.PI / 2 + wa.PI) / 2;
                a += c * qa(m); var m = b + c * Aa(m),
                    f = 2 * c / 3; return ["M", h, b, "A", c, c, 0, 1, 1, a, m, "L", a + f, m - 1, a + 2, m + f - .5, a, m] }
        })
    }]);
    Ha && (na.FusionCharts = FusionCharts);
    return FusionCharts
});