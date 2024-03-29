require = function e(t, n, r) {
    function i(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var l = "function" == typeof require && require;
                if (!s && l)
                    return l(a, !0);
                if (o)
                    return o(a, !0);
                var u = new Error("Cannot find module '" + a + "'");
                throw u.code = "MODULE_NOT_FOUND",
                u
            }
            var c = n[a] = {
                exports: {}
            };
            t[a][0].call(c.exports, function(e) {
                var n = t[a][1][e];
                return i(n ? n : e)
            }, c, c.exports, e, t, n, r)
        }
        return n[a].exports
    }
    for (var o = "function" == typeof require && require, a = 0; a < r.length; a++)
        i(r[a]);
    return i
}({
    "jquery.scrollbarify": [function(e, t, n) {
        !function(e) {
            e.fn.scrollbarify = function(t) {
                if (0 == this.length)
                    return e(this);
                if (this.length > 1) {
                    for (var n = 0; n < this.length; n++)
                        e(this[n]).scrollbarify();
                    return e(this)
                }
                var r = "scrollbarify"
                  , i = e(this)
                  , o = i.wrapInner('<div class="' + r + '-content" />').children("." + r + "-content")
                  , a = e('<div class="' + r + '-track"><div class="' + r + '-cursor"></div></div>').appendTo(i)
                  , s = a.children("." + r + "-cursor");
                "static" == i.css("position") && i.css("position", "relative"),
                i.addClass(r).on("resize.scrollbarify", function() {
                    o.triggerHandler("resize.scrollbarify")
                }),
                a.css("position", "absolute").css("top", 0).css("right", 0).enableTouch({
                    trackDocument: !0,
                    trackDocumentNormalize: !0,
                    dragThreshold: 0,
                    dragDelay: 0,
                    preventDefault: {
                        drag: !0
                    }
                }).on("tap dragStart", function(e, t) {
                    var n = o.height()
                      , r = o.prop("scrollHeight")
                      , i = n / r * n
                      , a = o.scrollTop()
                      , s = a / r * n;
                    o._ey = t.ey - s,
                    (o._ey < 0 || o._ey > i) && (o._ey = .5 * i)
                }).on("mouseup touchend dragEnd", function(e, t) {
                    delete o._ey
                }).on("tap dragStart drag", function(e, t) {
                    var n = o.height()
                      , r = o.prop("scrollHeight");
                    o.scrollTop();
                    o.scrollTop((t.ey - o._ey) / n * r)
                }),
                s.css("position", "absolute").css("top", 0).css("right", 0),
                o.css("position", "absolute").css("top", 0).css("left", 0).css("height", "100%").css("overflow", "hidden").on("resize.scrollbarify", function() {
                    var e = o.height()
                      , t = o.prop("scrollHeight");
                    return e >= t ? void i.addClass(r + "-none") : (i.removeClass(r + "-none"),
                    a.css("height", e + "px"),
                    void s.css("height", e / t * e + "px"))
                }).on("scroll.scrollbarify", function() {
                    var e = o.height()
                      , t = o.prop("scrollHeight")
                      , n = o.scrollTop();
                    s.css("top", n / t * e + "px")
                }),
                o.triggerHandler("resize.scrollbarify"),
                o.triggerHandler("scroll.scrollbarify")
            }
        }(jQuery)
    }
    , {}],
    "jquery.touch": [function(e, t, n) {
        !function(e) {
            function t(e, t, n) {
                var r = this;
                r.settings = n,
                r.$element = e,
                r.$sourceElement = t,
                r.inTap = !1,
                r.inTapAndHold = !1,
                r.inDrag = !1,
                r.tapStart = null,
                r.dragStart = null,
                r.timerTap = null,
                r.timerTapAndHold = null,
                r.mouseDown = !1,
                r.x = null,
                r.y = null,
                r.ex = null,
                r.ey = null,
                r.xStart = null,
                r.yStart = null,
                r.exStart = null,
                r.eyStart = null,
                r.taps = 0,
                r.started = !1,
                r.ended = !1
            }
            function n(e, n, r) {
                var i = e[0];
                return "undefined" == typeof i._touch && (i._touch = new t(e,n,r)),
                i._touch
            }
            function r(e, t, n) {
                var r, i, o, a, s;
                return r = e.$element.offset(),
                i = e.$element.width(),
                o = e.$element.height(),
                a = Math.min(Math.max(t, r.left), r.left + i),
                s = Math.min(Math.max(n, r.top), r.top + o),
                {
                    x: a,
                    y: s
                }
            }
            var i = e(document)
              , o = null
              , a = null
              , s = {
                useTouch: !0,
                useMouse: !0,
                trackDocument: !1,
                trackDocumentNormalize: !1,
                noClick: !1,
                dragThreshold: 10,
                dragDelay: 200,
                swipeThreshold: 30,
                tapDelay: 250,
                tapAndHoldDelay: 500,
                delegateSelector: null,
                dropFilter: !1,
                dropFilterTraversal: !0,
                coordinates: "page",
                preventDefault: {
                    drag: !1,
                    swipe: !1,
                    tap: !1
                }
            };
            t.prototype.uses = function(t) {
                var n = e._data(this.$sourceElement[0], "events");
                switch (t) {
                case "swipe":
                    return n.hasOwnProperty(t) || n.hasOwnProperty("swipeUp") || n.hasOwnProperty("swipeDown") || n.hasOwnProperty("swipeLeft") || n.hasOwnProperty("swipeRight");
                case "drag":
                    return n.hasOwnProperty(t) || n.hasOwnProperty("dragStart") || n.hasOwnProperty("dragEnd");
                case "tapAndHold":
                case "doubleTap":
                    return n.hasOwnProperty(t);
                case "tap":
                    return n.hasOwnProperty(t) || n.hasOwnProperty("doubleTap") || n.hasOwnProperty("tapAndHold")
                }
                return !1
            }
            ,
            t.prototype.cancel = function(e) {
                var t = this;
                t.taps = 0,
                t.inTap = !1,
                t.inTapAndHold = !1,
                t.inDrag = !1,
                t.tapStart = null,
                t.dragStart = null,
                t.xStart = null,
                t.yStart = null,
                t.exStart = null,
                t.eyStart = null,
                e && (t.mouseDown = !1)
            }
            ,
            t.prototype.doStart = function(e, t, n) {
                var r = this
                  , i = r.$element.offset();
                e.stopPropagation(),
                (r.uses("drag") && r.settings.preventDefault.drag(r) || r.uses("swipe") && r.settings.preventDefault.swipe(r) || r.uses("tap") && r.settings.preventDefault.tap(r)) && e.preventDefault(),
                r.uses("tapAndHold") && r.$element.css("-webkit-tap-highlight-color", "rgba(0,0,0,0)").css("-webkit-touch-callout", "none").css("-webkit-user-select", "none"),
                r.x = t,
                r.y = n,
                r.ex = t - i.left,
                r.ey = n - i.top,
                r.tapStart = Date.now(),
                clearTimeout(r.timerTap),
                r.timerTap = setTimeout(function() {
                    r.inTap && r.taps > 0 && (r.$element.trigger(2 == r.taps ? "doubleTap" : "tap", {
                        taps: r.taps,
                        x: r.x,
                        y: r.y,
                        ex: r.ex,
                        ey: r.ey,
                        duration: Date.now() - r.tapStart,
                        event: e,
                        touch: r
                    }),
                    r.cancel()),
                    r.timerTap = null
                }, r.settings.tapDelay),
                r.uses("tapAndHold") && (clearTimeout(r.timerTapAndHold),
                r.timerTapAndHold = setTimeout(function() {
                    r.inTap && (r.$element.trigger("tapAndHold", {
                        x: r.x,
                        y: r.y,
                        ex: r.ex,
                        ey: r.ey,
                        duration: Date.now() - r.tapStart,
                        event: e,
                        touch: r
                    }),
                    r.cancel()),
                    r.timerTapAndHold = null,
                    r.inTapAndHold = !0
                }, r.settings.tapAndHoldDelay)),
                r.inTap = !0
            }
            ,
            t.prototype.doMove = function(t, n, r) {
                var s, l, u = this, c = u.$element.offset(), d = (Math.abs(u.x - n) + Math.abs(u.y - r)) / 2;
                if (t.stopPropagation(),
                (u.uses("swipe") && u.settings.preventDefault.swipe(u) || u.uses("drag") && u.settings.preventDefault.drag(u)) && t.preventDefault(),
                d > 2 && clearTimeout(u.timerTapAndHold),
                u.inDrag && o == u) {
                    if (u.$element.trigger("drag", {
                        x: n,
                        y: r,
                        ex: n - c.left,
                        ey: r - c.top,
                        start: {
                            x: u.xStart,
                            y: u.yStart,
                            ex: u.exStart,
                            ey: u.eyStart
                        },
                        event: t,
                        touch: u,
                        exStart: u.exStart,
                        eyStart: u.eyStart
                    }),
                    u.$element.css("pointer-events", "none"),
                    s = "fixed" == u.$element.css("position") ? document.elementFromPoint(n - i.scrollLeft(), r - i.scrollTop()) : document.elementFromPoint(n, r),
                    u.$element.css("pointer-events", ""),
                    s) {
                        if (u.settings.dropFilter !== !1)
                            switch (l = typeof u.settings.dropFilter) {
                            case "string":
                                if (u.settings.dropFilterTraversal)
                                    for (; s && !e(s).is(u.settings.dropFilter); )
                                        s = s.parentElement;
                                else
                                    e(s).is(u.settings.dropFilter) || (s = null);
                                break;
                            case "function":
                                if (u.settings.dropFilterTraversal)
                                    for (; s && u.settings.dropFilter(u.$element[0], s) !== !0; )
                                        s = s.parentElement;
                                else
                                    u.settings.dropFilter(u.$element[0], s) === !1 && (s = null);
                                break;
                            default:
                            case "boolean":
                                if (u.settings.dropFilter === !0)
                                    for (; s.parentElement != u.$element[0].parentElement; )
                                        if (s = s.parentElement,
                                        !s) {
                                            s = null;
                                            break
                                        }
                            }
                        s === u.$element[0] && (s = null)
                    }
                    a && a !== s && (u.$element.trigger("dragLeave", {
                        element: a,
                        event: t,
                        touch: u
                    }),
                    a = null),
                    !a && s && (a = s,
                    u.$element.trigger("dragEnter", {
                        element: a,
                        event: t,
                        touch: u
                    })),
                    a && (c = e(a).offset(),
                    u.$element.trigger("dragOver", {
                        element: a,
                        event: t,
                        touch: u,
                        x: n,
                        y: r,
                        ex: n - c.left,
                        ey: r - c.top
                    }))
                } else if (d > u.settings.dragThreshold) {
                    if (Date.now() - u.tapStart < u.settings.dragDelay)
                        return void u.cancel();
                    u.cancel(),
                    u.inDrag = !0,
                    u.dragStart = Date.now(),
                    u.xStart = n,
                    u.yStart = r,
                    u.exStart = n - c.left,
                    u.eyStart = r - c.top,
                    u.uses("drag") && u.settings.preventDefault.drag(u) && t.preventDefault(),
                    u.$element.trigger("dragStart", {
                        x: u.xStart,
                        y: u.yStart,
                        ex: u.exStart,
                        ey: u.eyStart,
                        event: t,
                        touch: u
                    }),
                    o = u
                }
            }
            ,
            t.prototype.doEnd = function(t, n, r) {
                var i, s, l, u = this, c = u.$element.offset(), d = Math.abs(u.x - n), f = Math.abs(u.y - r);
                t.stopPropagation(),
                u.inTap ? (clearTimeout(u.timerTapAndHold),
                u.taps++,
                (!u.timerTap || 1 == u.taps && !u.uses("doubleTap") || 2 == u.taps && u.uses("doubleTap")) && (u.$element.trigger(2 == u.taps ? "doubleTap" : "tap", {
                    taps: u.taps,
                    x: u.x,
                    y: u.y,
                    ex: u.ex,
                    ey: u.ey,
                    duration: Date.now() - u.tapStart,
                    event: t,
                    touch: u
                }),
                u.cancel())) : u.inDrag ? (a && (c = e(a).offset(),
                u.$element.trigger("drop", {
                    element: a,
                    event: t,
                    touch: u,
                    x: n,
                    y: r,
                    ex: n - c.left,
                    ey: r - c.top
                }),
                a = null),
                l = Date.now() - u.dragStart,
                i = Math.sqrt(Math.pow(Math.abs(u.x - n), 2) + Math.pow(Math.abs(u.y - r), 2)),
                s = i / l,
                u.$element.trigger("dragEnd", {
                    start: {
                        x: u.x,
                        y: u.y,
                        ex: u.ex,
                        ey: u.ey
                    },
                    end: {
                        x: n,
                        y: r,
                        ex: n - c.left,
                        ey: r - c.top
                    },
                    distance: i,
                    duration: l,
                    velocity: s,
                    event: t,
                    touch: u
                }),
                o = null,
                (d > u.settings.swipeThreshold || f > u.settings.swipeThreshold) && (u.$element.trigger("swipe", {
                    distance: i,
                    duration: l,
                    velocity: s,
                    event: t,
                    touch: u
                }),
                d > f ? (s = d / l,
                n < u.x ? u.$element.trigger("swipeLeft", {
                    distance: d,
                    duration: l,
                    velocity: s,
                    event: t,
                    touch: u
                }) : u.$element.trigger("swipeRight", {
                    distance: d,
                    duration: l,
                    velocity: s,
                    event: t,
                    touch: u
                })) : f > d && (s = f / l,
                r < u.y ? u.$element.trigger("swipeUp", {
                    distance: f,
                    duration: l,
                    velocity: s,
                    event: t,
                    touch: u
                }) : u.$element.trigger("swipeDown", {
                    distance: f,
                    duration: l,
                    velocity: s,
                    event: t,
                    touch: u
                }))),
                u.inDrag = !1) : u.inTapAndHold && (clearTimeout(u.timerTapAndHold),
                u.$element.trigger("tapAndHoldEnd", {
                    x: u.x,
                    y: u.y,
                    event: t,
                    touch: u
                }),
                u.inTapAndHold = !1)
            }
            ,
            e.fn.touch = function(t) {
                var n = e(this);
                if (this.length > 1)
                    for (var r = 0; r < this.length; r++)
                        e.touch(e(this[r]), t);
                else
                    1 == this.length && e.touch(n, t);
                return n
            }
            ,
            e.fn.enableTouch = function(t) {
                return e(this).touch(t)
            }
            ,
            e.touch = function(t, o) {
                var a = {};
                if (a = e.extend(a, s),
                a = e.extend(a, o),
                "function" != typeof a.preventDefault.drag && (a.preventDefault.drag = a.preventDefault.drag === !0 ? function(e) {
                    return !0
                }
                : function(e) {
                    return !1
                }
                ),
                "function" != typeof a.preventDefault.swipe && (a.preventDefault.swipe = a.preventDefault.swipe === !0 ? function(e) {
                    return !0
                }
                : function(e) {
                    return !1
                }
                ),
                "function" != typeof a.preventDefault.tap && (a.preventDefault.tap = a.preventDefault.tap === !0 ? function(e) {
                    return !0
                }
                : function(e) {
                    return !1
                }
                ),
                a.noClick && t.on("click", function(e) {
                    e.preventDefault()
                }),
                a.useTouch) {
                    var l = function(r) {
                        var i = e(this)
                          , o = n(i, t, a);
                        o.started = !0,
                        o.doStart(r, r.originalEvent.touches[0][a.coordinates + "X"], r.originalEvent.touches[0][a.coordinates + "Y"]),
                        setTimeout(function() {
                            o.started = !1
                        }, 1e3)
                    };
                    t.on("touchstart", l),
                    a.delegateSelector && t.on("touchstart", a.delegateSelector, l);
                    var u = function(i) {
                        var o = e(this)
                          , s = n(o, t, a)
                          , l = i.originalEvent.touches[0][a.coordinates + "X"]
                          , u = i.originalEvent.touches[0][a.coordinates + "Y"];
                        if (s.settings.trackDocument && s.settings.trackDocumentNormalize) {
                            var c = r(s, l, u);
                            l = c.x,
                            u = c.y
                        }
                        s.doMove(i, l, u)
                    };
                    t.on("touchmove", u),
                    a.delegateSelector && t.on("touchmove", a.delegateSelector, u);
                    var c = function(i) {
                        var o = e(this)
                          , s = n(o, t, a);
                        s.ended = !0;
                        var l = r(s, i.originalEvent.changedTouches[0][a.coordinates + "X"], i.originalEvent.changedTouches[0][a.coordinates + "Y"]);
                        s.doEnd(i, l.x, l.y),
                        setTimeout(function() {
                            s.ended = !1
                        }, 1e3)
                    };
                    t.on("touchend", c),
                    a.delegateSelector && t.on("touchend", a.delegateSelector, c)
                }
                if (a.useMouse) {
                    var d = function(r) {
                        var i = e(this)
                          , o = n(i, t, a);
                        return !o.started && (o.mouseDown = !0,
                        void o.doStart(r, r[a.coordinates + "X"], r[a.coordinates + "Y"]))
                    };
                    t.on("mousedown", d),
                    a.delegateSelector && t.on("mousedown", a.delegateSelector, d);
                    var f = function(r) {
                        var i = e(this)
                          , o = n(i, t, a);
                        o.mouseDown && o.doMove(r, r[a.coordinates + "X"], r[a.coordinates + "Y"])
                    };
                    t.on("mousemove", f),
                    a.delegateSelector && t.on("mousemove", a.delegateSelector, f);
                    var p = function(r) {
                        var o = e(this)
                          , s = n(o, t, a);
                        return !s.ended && (i.triggerHandler("mouseup", r),
                        s.doEnd(r, r[a.coordinates + "X"], r[a.coordinates + "Y"]),
                        void (s.mouseDown = !1))
                    };
                    t.on("mouseup", p),
                    a.delegateSelector && t.on("mouseup", a.delegateSelector, p)
                }
                a.trackDocument || t.on("mouseleave", function(r) {
                    var i = e(this)
                      , o = n(i, t, a);
                    o.doEnd(r, r[a.coordinates + "X"], r[a.coordinates + "Y"]),
                    o.mouseDown = !1
                })
            }
            ,
            i.on("mousemove", function(e) {
                var t = o;
                if (t && t.settings.useMouse && t.mouseDown && t.settings.trackDocument) {
                    var n = e[t.settings.coordinates + "X"]
                      , i = e[t.settings.coordinates + "Y"];
                    if (t.settings.trackDocumentNormalize) {
                        var a = r(t, n, i);
                        n = a.x,
                        i = a.y
                    }
                    t.doMove(e, n, i)
                }
            }).on("mouseup", function(e, t) {
                var n = o;
                if (n && n.settings.useMouse && n.settings.trackDocument) {
                    if ("undefined" != typeof t && (e = t),
                    !(n.settings.coordinates + "X"in e))
                        return;
                    var i = e[n.settings.coordinates + "X"]
                      , a = e[n.settings.coordinates + "Y"];
                    if (n.settings.trackDocumentNormalize) {
                        var s = r(n, i, a);
                        i = s.x,
                        a = s.y
                    }
                    n.doEnd(e, i, a),
                    n.mouseDown = !1
                }
            })
        }(jQuery)
    }
    , {}],
    jquery: [function(e, t, n) {
        !function(e, n) {
            "object" == typeof t && "object" == typeof t.exports ? t.exports = e.document ? n(e, !0) : function(e) {
                if (!e.document)
                    throw new Error("jQuery requires a window with a document");
                return n(e)
            }
            : n(e)
        }("undefined" != typeof window ? window : this, function(e, t) {
            function n(e) {
                var t = !!e && "length"in e && e.length
                  , n = pe.type(e);
                return "function" !== n && !pe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
            }
            function r(e, t, n) {
                if (pe.isFunction(t))
                    return pe.grep(e, function(e, r) {
                        return !!t.call(e, r, e) !== n
                    });
                if (t.nodeType)
                    return pe.grep(e, function(e) {
                        return e === t !== n
                    });
                if ("string" == typeof t) {
                    if (ke.test(t))
                        return pe.filter(t, e, n);
                    t = pe.filter(t, e)
                }
                return pe.grep(e, function(e) {
                    return pe.inArray(e, t) > -1 !== n
                })
            }
            function i(e, t) {
                do
                    e = e[t];
                while (e && 1 !== e.nodeType);return e
            }
            function o(e) {
                var t = {};
                return pe.each(e.match(Ne) || [], function(e, n) {
                    t[n] = !0
                }),
                t
            }
            function a() {
                re.addEventListener ? (re.removeEventListener("DOMContentLoaded", s),
                e.removeEventListener("load", s)) : (re.detachEvent("onreadystatechange", s),
                e.detachEvent("onload", s))
            }
            function s() {
                (re.addEventListener || "load" === e.event.type || "complete" === re.readyState) && (a(),
                pe.ready())
            }
            function l(e, t, n) {
                if (void 0 === n && 1 === e.nodeType) {
                    var r = "data-" + t.replace(Le, "-$1").toLowerCase();
                    if (n = e.getAttribute(r),
                    "string" == typeof n) {
                        try {
                            n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Me.test(n) ? pe.parseJSON(n) : n)
                        } catch (e) {}
                        pe.data(e, t, n)
                    } else
                        n = void 0
                }
                return n
            }
            function u(e) {
                var t;
                for (t in e)
                    if (("data" !== t || !pe.isEmptyObject(e[t])) && "toJSON" !== t)
                        return !1;
                return !0
            }
            function c(e, t, n, r) {
                if (He(e)) {
                    var i, o, a = pe.expando, s = e.nodeType, l = s ? pe.cache : e, u = s ? e[a] : e[a] && a;
                    if (u && l[u] && (r || l[u].data) || void 0 !== n || "string" != typeof t)
                        return u || (u = s ? e[a] = ne.pop() || pe.guid++ : a),
                        l[u] || (l[u] = s ? {} : {
                            toJSON: pe.noop
                        }),
                        "object" != typeof t && "function" != typeof t || (r ? l[u] = pe.extend(l[u], t) : l[u].data = pe.extend(l[u].data, t)),
                        o = l[u],
                        r || (o.data || (o.data = {}),
                        o = o.data),
                        void 0 !== n && (o[pe.camelCase(t)] = n),
                        "string" == typeof t ? (i = o[t],
                        null == i && (i = o[pe.camelCase(t)])) : i = o,
                        i
                }
            }
            function d(e, t, n) {
                if (He(e)) {
                    var r, i, o = e.nodeType, a = o ? pe.cache : e, s = o ? e[pe.expando] : pe.expando;
                    if (a[s]) {
                        if (t && (r = n ? a[s] : a[s].data)) {
                            pe.isArray(t) ? t = t.concat(pe.map(t, pe.camelCase)) : t in r ? t = [t] : (t = pe.camelCase(t),
                            t = t in r ? [t] : t.split(" ")),
                            i = t.length;
                            for (; i--; )
                                delete r[t[i]];
                            if (n ? !u(r) : !pe.isEmptyObject(r))
                                return
                        }
                        (n || (delete a[s].data,
                        u(a[s]))) && (o ? pe.cleanData([e], !0) : de.deleteExpando || a != a.window ? delete a[s] : a[s] = void 0)
                    }
                }
            }
            function f(e, t, n, r) {
                var i, o = 1, a = 20, s = r ? function() {
                    return r.cur()
                }
                : function() {
                    return pe.css(e, t, "")
                }
                , l = s(), u = n && n[3] || (pe.cssNumber[t] ? "" : "px"), c = (pe.cssNumber[t] || "px" !== u && +l) && Oe.exec(pe.css(e, t));
                if (c && c[3] !== u) {
                    u = u || c[3],
                    n = n || [],
                    c = +l || 1;
                    do
                        o = o || ".5",
                        c /= o,
                        pe.style(e, t, c + u);
                    while (o !== (o = s() / l) && 1 !== o && --a)
                }
                return n && (c = +c || +l || 0,
                i = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
                r && (r.unit = u,
                r.start = c,
                r.end = i)),
                i
            }
            function p(e) {
                var t = We.split("|")
                  , n = e.createDocumentFragment();
                if (n.createElement)
                    for (; t.length; )
                        n.createElement(t.pop());
                return n
            }
            function h(e, t) {
                var n, r, i = 0, o = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : void 0;
                if (!o)
                    for (o = [],
                    n = e.childNodes || e; null != (r = n[i]); i++)
                        !t || pe.nodeName(r, t) ? o.push(r) : pe.merge(o, h(r, t));
                return void 0 === t || t && pe.nodeName(e, t) ? pe.merge([e], o) : o
            }
            function g(e, t) {
                for (var n, r = 0; null != (n = e[r]); r++)
                    pe._data(n, "globalEval", !t || pe._data(t[r], "globalEval"))
            }
            function m(e) {
                Ie.test(e.type) && (e.defaultChecked = e.checked)
            }
            function v(e, t, n, r, i) {
                for (var o, a, s, l, u, c, d, f = e.length, v = p(t), y = [], b = 0; b < f; b++)
                    if (a = e[b],
                    a || 0 === a)
                        if ("object" === pe.type(a))
                            pe.merge(y, a.nodeType ? [a] : a);
                        else if (Ve.test(a)) {
                            for (l = l || v.appendChild(t.createElement("div")),
                            u = (Re.exec(a) || ["", ""])[1].toLowerCase(),
                            d = Xe[u] || Xe._default,
                            l.innerHTML = d[1] + pe.htmlPrefilter(a) + d[2],
                            o = d[0]; o--; )
                                l = l.lastChild;
                            if (!de.leadingWhitespace && Be.test(a) && y.push(t.createTextNode(Be.exec(a)[0])),
                            !de.tbody)
                                for (a = "table" !== u || Ue.test(a) ? "<table>" !== d[1] || Ue.test(a) ? 0 : l : l.firstChild,
                                o = a && a.childNodes.length; o--; )
                                    pe.nodeName(c = a.childNodes[o], "tbody") && !c.childNodes.length && a.removeChild(c);
                            for (pe.merge(y, l.childNodes),
                            l.textContent = ""; l.firstChild; )
                                l.removeChild(l.firstChild);
                            l = v.lastChild
                        } else
                            y.push(t.createTextNode(a));
                for (l && v.removeChild(l),
                de.appendChecked || pe.grep(h(y, "input"), m),
                b = 0; a = y[b++]; )
                    if (r && pe.inArray(a, r) > -1)
                        i && i.push(a);
                    else if (s = pe.contains(a.ownerDocument, a),
                    l = h(v.appendChild(a), "script"),
                    s && g(l),
                    n)
                        for (o = 0; a = l[o++]; )
                            ze.test(a.type || "") && n.push(a);
                return l = null,
                v
            }
            function y() {
                return !0
            }
            function b() {
                return !1
            }
            function x() {
                try {
                    return re.activeElement
                } catch (e) {}
            }
            function w(e, t, n, r, i, o) {
                var a, s;
                if ("object" == typeof t) {
                    "string" != typeof n && (r = r || n,
                    n = void 0);
                    for (s in t)
                        w(e, s, n, r, t[s], o);
                    return e
                }
                if (null == r && null == i ? (i = n,
                r = n = void 0) : null == i && ("string" == typeof n ? (i = r,
                r = void 0) : (i = r,
                r = n,
                n = void 0)),
                i === !1)
                    i = b;
                else if (!i)
                    return e;
                return 1 === o && (a = i,
                i = function(e) {
                    return pe().off(e),
                    a.apply(this, arguments)
                }
                ,
                i.guid = a.guid || (a.guid = pe.guid++)),
                e.each(function() {
                    pe.event.add(this, t, i, r, n)
                })
            }
            function T(e, t) {
                return pe.nodeName(e, "table") && pe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
            }
            function k(e) {
                return e.type = (null !== pe.find.attr(e, "type")) + "/" + e.type,
                e
            }
            function S(e) {
                var t = it.exec(e.type);
                return t ? e.type = t[1] : e.removeAttribute("type"),
                e
            }
            function C(e, t) {
                if (1 === t.nodeType && pe.hasData(e)) {
                    var n, r, i, o = pe._data(e), a = pe._data(t, o), s = o.events;
                    if (s) {
                        delete a.handle,
                        a.events = {};
                        for (n in s)
                            for (r = 0,
                            i = s[n].length; r < i; r++)
                                pe.event.add(t, n, s[n][r])
                    }
                    a.data && (a.data = pe.extend({}, a.data))
                }
            }
            function E(e, t) {
                var n, r, i;
                if (1 === t.nodeType) {
                    if (n = t.nodeName.toLowerCase(),
                    !de.noCloneEvent && t[pe.expando]) {
                        i = pe._data(t);
                        for (r in i.events)
                            pe.removeEvent(t, r, i.handle);
                        t.removeAttribute(pe.expando)
                    }
                    "script" === n && t.text !== e.text ? (k(t).text = e.text,
                    S(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML),
                    de.html5Clone && e.innerHTML && !pe.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ie.test(e.type) ? (t.defaultChecked = t.checked = e.checked,
                    t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
                }
            }
            function A(e, t, n, r) {
                t = oe.apply([], t);
                var i, o, a, s, l, u, c = 0, d = e.length, f = d - 1, p = t[0], g = pe.isFunction(p);
                if (g || d > 1 && "string" == typeof p && !de.checkClone && rt.test(p))
                    return e.each(function(i) {
                        var o = e.eq(i);
                        g && (t[0] = p.call(this, i, o.html())),
                        A(o, t, n, r)
                    });
                if (d && (u = v(t, e[0].ownerDocument, !1, e, r),
                i = u.firstChild,
                1 === u.childNodes.length && (u = i),
                i || r)) {
                    for (s = pe.map(h(u, "script"), k),
                    a = s.length; c < d; c++)
                        o = u,
                        c !== f && (o = pe.clone(o, !0, !0),
                        a && pe.merge(s, h(o, "script"))),
                        n.call(e[c], o, c);
                    if (a)
                        for (l = s[s.length - 1].ownerDocument,
                        pe.map(s, S),
                        c = 0; c < a; c++)
                            o = s[c],
                            ze.test(o.type || "") && !pe._data(o, "globalEval") && pe.contains(l, o) && (o.src ? pe._evalUrl && pe._evalUrl(o.src) : pe.globalEval((o.text || o.textContent || o.innerHTML || "").replace(ot, "")));
                    u = i = null
                }
                return e
            }
            function j(e, t, n) {
                for (var r, i = t ? pe.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
                    n || 1 !== r.nodeType || pe.cleanData(h(r)),
                    r.parentNode && (n && pe.contains(r.ownerDocument, r) && g(h(r, "script")),
                    r.parentNode.removeChild(r));
                return e
            }
            function N(e, t) {
                var n = pe(t.createElement(e)).appendTo(t.body)
                  , r = pe.css(n[0], "display");
                return n.detach(),
                r
            }
            function D(e) {
                var t = re
                  , n = ut[e];
                return n || (n = N(e, t),
                "none" !== n && n || (lt = (lt || pe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),
                t = (lt[0].contentWindow || lt[0].contentDocument).document,
                t.write(),
                t.close(),
                n = N(e, t),
                lt.detach()),
                ut[e] = n),
                n
            }
            function $(e, t) {
                return {
                    get: function() {
                        return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                    }
                }
            }
            function H(e) {
                if (e in St)
                    return e;
                for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = kt.length; n--; )
                    if (e = kt[n] + t,
                    e in St)
                        return e
            }
            function M(e, t) {
                for (var n, r, i, o = [], a = 0, s = e.length; a < s; a++)
                    r = e[a],
                    r.style && (o[a] = pe._data(r, "olddisplay"),
                    n = r.style.display,
                    t ? (o[a] || "none" !== n || (r.style.display = ""),
                    "" === r.style.display && Fe(r) && (o[a] = pe._data(r, "olddisplay", D(r.nodeName)))) : (i = Fe(r),
                    (n && "none" !== n || !i) && pe._data(r, "olddisplay", i ? n : pe.css(r, "display"))));
                for (a = 0; a < s; a++)
                    r = e[a],
                    r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
                return e
            }
            function L(e, t, n) {
                var r = xt.exec(t);
                return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
            }
            function _(e, t, n, r, i) {
                for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; o < 4; o += 2)
                    "margin" === n && (a += pe.css(e, n + qe[o], !0, i)),
                    r ? ("content" === n && (a -= pe.css(e, "padding" + qe[o], !0, i)),
                    "margin" !== n && (a -= pe.css(e, "border" + qe[o] + "Width", !0, i))) : (a += pe.css(e, "padding" + qe[o], !0, i),
                    "padding" !== n && (a += pe.css(e, "border" + qe[o] + "Width", !0, i)));
                return a
            }
            function O(e, t, n) {
                var r = !0
                  , i = "width" === t ? e.offsetWidth : e.offsetHeight
                  , o = ht(e)
                  , a = de.boxSizing && "border-box" === pe.css(e, "boxSizing", !1, o);
                if (i <= 0 || null == i) {
                    if (i = gt(e, t, o),
                    (i < 0 || null == i) && (i = e.style[t]),
                    dt.test(i))
                        return i;
                    r = a && (de.boxSizingReliable() || i === e.style[t]),
                    i = parseFloat(i) || 0
                }
                return i + _(e, t, n || (a ? "border" : "content"), r, o) + "px"
            }
            function q(e, t, n, r, i) {
                return new q.prototype.init(e,t,n,r,i)
            }
            function F() {
                return e.setTimeout(function() {
                    Ct = void 0
                }),
                Ct = pe.now()
            }
            function P(e, t) {
                var n, r = {
                    height: e
                }, i = 0;
                for (t = t ? 1 : 0; i < 4; i += 2 - t)
                    n = qe[i],
                    r["margin" + n] = r["padding" + n] = e;
                return t && (r.opacity = r.width = e),
                r
            }
            function I(e, t, n) {
                for (var r, i = (B.tweeners[t] || []).concat(B.tweeners["*"]), o = 0, a = i.length; o < a; o++)
                    if (r = i[o].call(n, t, e))
                        return r
            }
            function R(e, t, n) {
                var r, i, o, a, s, l, u, c, d = this, f = {}, p = e.style, h = e.nodeType && Fe(e), g = pe._data(e, "fxshow");
                n.queue || (s = pe._queueHooks(e, "fx"),
                null == s.unqueued && (s.unqueued = 0,
                l = s.empty.fire,
                s.empty.fire = function() {
                    s.unqueued || l()
                }
                ),
                s.unqueued++,
                d.always(function() {
                    d.always(function() {
                        s.unqueued--,
                        pe.queue(e, "fx").length || s.empty.fire()
                    })
                })),
                1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY],
                u = pe.css(e, "display"),
                c = "none" === u ? pe._data(e, "olddisplay") || D(e.nodeName) : u,
                "inline" === c && "none" === pe.css(e, "float") && (de.inlineBlockNeedsLayout && "inline" !== D(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")),
                n.overflow && (p.overflow = "hidden",
                de.shrinkWrapBlocks() || d.always(function() {
                    p.overflow = n.overflow[0],
                    p.overflowX = n.overflow[1],
                    p.overflowY = n.overflow[2]
                }));
                for (r in t)
                    if (i = t[r],
                    At.exec(i)) {
                        if (delete t[r],
                        o = o || "toggle" === i,
                        i === (h ? "hide" : "show")) {
                            if ("show" !== i || !g || void 0 === g[r])
                                continue;
                            h = !0
                        }
                        f[r] = g && g[r] || pe.style(e, r)
                    } else
                        u = void 0;
                if (pe.isEmptyObject(f))
                    "inline" === ("none" === u ? D(e.nodeName) : u) && (p.display = u);
                else {
                    g ? "hidden"in g && (h = g.hidden) : g = pe._data(e, "fxshow", {}),
                    o && (g.hidden = !h),
                    h ? pe(e).show() : d.done(function() {
                        pe(e).hide()
                    }),
                    d.done(function() {
                        var t;
                        pe._removeData(e, "fxshow");
                        for (t in f)
                            pe.style(e, t, f[t])
                    });
                    for (r in f)
                        a = I(h ? g[r] : 0, r, d),
                        r in g || (g[r] = a.start,
                        h && (a.end = a.start,
                        a.start = "width" === r || "height" === r ? 1 : 0))
                }
            }
            function z(e, t) {
                var n, r, i, o, a;
                for (n in e)
                    if (r = pe.camelCase(n),
                    i = t[r],
                    o = e[n],
                    pe.isArray(o) && (i = o[1],
                    o = e[n] = o[0]),
                    n !== r && (e[r] = o,
                    delete e[n]),
                    a = pe.cssHooks[r],
                    a && "expand"in a) {
                        o = a.expand(o),
                        delete e[r];
                        for (n in o)
                            n in e || (e[n] = o[n],
                            t[n] = i)
                    } else
                        t[r] = i
            }
            function B(e, t, n) {
                var r, i, o = 0, a = B.prefilters.length, s = pe.Deferred().always(function() {
                    delete l.elem
                }), l = function() {
                    if (i)
                        return !1;
                    for (var t = Ct || F(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, l = u.tweens.length; a < l; a++)
                        u.tweens[a].run(o);
                    return s.notifyWith(e, [u, o, n]),
                    o < 1 && l ? n : (s.resolveWith(e, [u]),
                    !1)
                }, u = s.promise({
                    elem: e,
                    props: pe.extend({}, t),
                    opts: pe.extend(!0, {
                        specialEasing: {},
                        easing: pe.easing._default
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: Ct || F(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var r = pe.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                        return u.tweens.push(r),
                        r
                    },
                    stop: function(t) {
                        var n = 0
                          , r = t ? u.tweens.length : 0;
                        if (i)
                            return this;
                        for (i = !0; n < r; n++)
                            u.tweens[n].run(1);
                        return t ? (s.notifyWith(e, [u, 1, 0]),
                        s.resolveWith(e, [u, t])) : s.rejectWith(e, [u, t]),
                        this
                    }
                }), c = u.props;
                for (z(c, u.opts.specialEasing); o < a; o++)
                    if (r = B.prefilters[o].call(u, e, c, u.opts))
                        return pe.isFunction(r.stop) && (pe._queueHooks(u.elem, u.opts.queue).stop = pe.proxy(r.stop, r)),
                        r;
                return pe.map(c, I, u),
                pe.isFunction(u.opts.start) && u.opts.start.call(e, u),
                pe.fx.timer(pe.extend(l, {
                    elem: e,
                    anim: u,
                    queue: u.opts.queue
                })),
                u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
            }
            function W(e) {
                return pe.attr(e, "class") || ""
            }
            function X(e) {
                return function(t, n) {
                    "string" != typeof t && (n = t,
                    t = "*");
                    var r, i = 0, o = t.toLowerCase().match(Ne) || [];
                    if (pe.isFunction(n))
                        for (; r = o[i++]; )
                            "+" === r.charAt(0) ? (r = r.slice(1) || "*",
                            (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
                }
            }
            function V(e, t, n, r) {
                function i(s) {
                    var l;
                    return o[s] = !0,
                    pe.each(e[s] || [], function(e, s) {
                        var u = s(t, n, r);
                        return "string" != typeof u || a || o[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u),
                        i(u),
                        !1)
                    }),
                    l
                }
                var o = {}
                  , a = e === Qt;
                return i(t.dataTypes[0]) || !o["*"] && i("*")
            }
            function U(e, t) {
                var n, r, i = pe.ajaxSettings.flatOptions || {};
                for (r in t)
                    void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
                return n && pe.extend(!0, e, n),
                e
            }
            function Y(e, t, n) {
                for (var r, i, o, a, s = e.contents, l = e.dataTypes; "*" === l[0]; )
                    l.shift(),
                    void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                if (i)
                    for (a in s)
                        if (s[a] && s[a].test(i)) {
                            l.unshift(a);
                            break
                        }
                if (l[0]in n)
                    o = l[0];
                else {
                    for (a in n) {
                        if (!l[0] || e.converters[a + " " + l[0]]) {
                            o = a;
                            break
                        }
                        r || (r = a)
                    }
                    o = o || r
                }
                if (o)
                    return o !== l[0] && l.unshift(o),
                    n[o]
            }
            function Z(e, t, n, r) {
                var i, o, a, s, l, u = {}, c = e.dataTypes.slice();
                if (c[1])
                    for (a in e.converters)
                        u[a.toLowerCase()] = e.converters[a];
                for (o = c.shift(); o; )
                    if (e.responseFields[o] && (n[e.responseFields[o]] = t),
                    !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                    l = o,
                    o = c.shift())
                        if ("*" === o)
                            o = l;
                        else if ("*" !== l && l !== o) {
                            if (a = u[l + " " + o] || u["* " + o],
                            !a)
                                for (i in u)
                                    if (s = i.split(" "),
                                    s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                                        a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0],
                                        c.unshift(s[1]));
                                        break
                                    }
                            if (a !== !0)
                                if (a && e.throws)
                                    t = a(t);
                                else
                                    try {
                                        t = a(t)
                                    } catch (e) {
                                        return {
                                            state: "parsererror",
                                            error: a ? e : "No conversion from " + l + " to " + o
                                        }
                                    }
                        }
                return {
                    state: "success",
                    data: t
                }
            }
            function J(e) {
                return e.style && e.style.display || pe.css(e, "display")
            }
            function G(e) {
                if (!pe.contains(e.ownerDocument || re, e))
                    return !0;
                for (; e && 1 === e.nodeType; ) {
                    if ("none" === J(e) || "hidden" === e.type)
                        return !0;
                    e = e.parentNode
                }
                return !1
            }
            function Q(e, t, n, r) {
                var i;
                if (pe.isArray(t))
                    pe.each(t, function(t, i) {
                        n || rn.test(e) ? r(e, i) : Q(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
                    });
                else if (n || "object" !== pe.type(t))
                    r(e, t);
                else
                    for (i in t)
                        Q(e + "[" + i + "]", t[i], n, r)
            }
            function K() {
                try {
                    return new e.XMLHttpRequest
                } catch (e) {}
            }
            function ee() {
                try {
                    return new e.ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {}
            }
            function te(e) {
                return pe.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
            }
            var ne = []
              , re = e.document
              , ie = ne.slice
              , oe = ne.concat
              , ae = ne.push
              , se = ne.indexOf
              , le = {}
              , ue = le.toString
              , ce = le.hasOwnProperty
              , de = {}
              , fe = "1.12.4"
              , pe = function(e, t) {
                return new pe.fn.init(e,t)
            }
              , he = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
              , ge = /^-ms-/
              , me = /-([\da-z])/gi
              , ve = function(e, t) {
                return t.toUpperCase()
            };
            pe.fn = pe.prototype = {
                jquery: fe,
                constructor: pe,
                selector: "",
                length: 0,
                toArray: function() {
                    return ie.call(this)
                },
                get: function(e) {
                    return null != e ? e < 0 ? this[e + this.length] : this[e] : ie.call(this)
                },
                pushStack: function(e) {
                    var t = pe.merge(this.constructor(), e);
                    return t.prevObject = this,
                    t.context = this.context,
                    t
                },
                each: function(e) {
                    return pe.each(this, e)
                },
                map: function(e) {
                    return this.pushStack(pe.map(this, function(t, n) {
                        return e.call(t, n, t)
                    }))
                },
                slice: function() {
                    return this.pushStack(ie.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(e) {
                    var t = this.length
                      , n = +e + (e < 0 ? t : 0);
                    return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor()
                },
                push: ae,
                sort: ne.sort,
                splice: ne.splice
            },
            pe.extend = pe.fn.extend = function() {
                var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, l = arguments.length, u = !1;
                for ("boolean" == typeof a && (u = a,
                a = arguments[s] || {},
                s++),
                "object" == typeof a || pe.isFunction(a) || (a = {}),
                s === l && (a = this,
                s--); s < l; s++)
                    if (null != (i = arguments[s]))
                        for (r in i)
                            e = a[r],
                            n = i[r],
                            a !== n && (u && n && (pe.isPlainObject(n) || (t = pe.isArray(n))) ? (t ? (t = !1,
                            o = e && pe.isArray(e) ? e : []) : o = e && pe.isPlainObject(e) ? e : {},
                            a[r] = pe.extend(u, o, n)) : void 0 !== n && (a[r] = n));
                return a
            }
            ,
            pe.extend({
                expando: "jQuery" + (fe + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e)
                },
                noop: function() {},
                isFunction: function(e) {
                    return "function" === pe.type(e)
                },
                isArray: Array.isArray || function(e) {
                    return "array" === pe.type(e)
                }
                ,
                isWindow: function(e) {
                    return null != e && e == e.window
                },
                isNumeric: function(e) {
                    var t = e && e.toString();
                    return !pe.isArray(e) && t - parseFloat(t) + 1 >= 0
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e)
                        return !1;
                    return !0
                },
                isPlainObject: function(e) {
                    var t;
                    if (!e || "object" !== pe.type(e) || e.nodeType || pe.isWindow(e))
                        return !1;
                    try {
                        if (e.constructor && !ce.call(e, "constructor") && !ce.call(e.constructor.prototype, "isPrototypeOf"))
                            return !1
                    } catch (e) {
                        return !1
                    }
                    if (!de.ownFirst)
                        for (t in e)
                            return ce.call(e, t);
                    for (t in e)
                        ;
                    return void 0 === t || ce.call(e, t)
                },
                type: function(e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? le[ue.call(e)] || "object" : typeof e
                },
                globalEval: function(t) {
                    t && pe.trim(t) && (e.execScript || function(t) {
                        e.eval.call(e, t)
                    }
                    )(t)
                },
                camelCase: function(e) {
                    return e.replace(ge, "ms-").replace(me, ve)
                },
                nodeName: function(e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                },
                each: function(e, t) {
                    var r, i = 0;
                    if (n(e))
                        for (r = e.length; i < r && t.call(e[i], i, e[i]) !== !1; i++)
                            ;
                    else
                        for (i in e)
                            if (t.call(e[i], i, e[i]) === !1)
                                break;
                    return e
                },
                trim: function(e) {
                    return null == e ? "" : (e + "").replace(he, "")
                },
                makeArray: function(e, t) {
                    var r = t || [];
                    return null != e && (n(Object(e)) ? pe.merge(r, "string" == typeof e ? [e] : e) : ae.call(r, e)),
                    r
                },
                inArray: function(e, t, n) {
                    var r;
                    if (t) {
                        if (se)
                            return se.call(t, e, n);
                        for (r = t.length,
                        n = n ? n < 0 ? Math.max(0, r + n) : n : 0; n < r; n++)
                            if (n in t && t[n] === e)
                                return n
                    }
                    return -1
                },
                merge: function(e, t) {
                    for (var n = +t.length, r = 0, i = e.length; r < n; )
                        e[i++] = t[r++];
                    if (n !== n)
                        for (; void 0 !== t[r]; )
                            e[i++] = t[r++];
                    return e.length = i,
                    e
                },
                grep: function(e, t, n) {
                    for (var r, i = [], o = 0, a = e.length, s = !n; o < a; o++)
                        r = !t(e[o], o),
                        r !== s && i.push(e[o]);
                    return i
                },
                map: function(e, t, r) {
                    var i, o, a = 0, s = [];
                    if (n(e))
                        for (i = e.length; a < i; a++)
                            o = t(e[a], a, r),
                            null != o && s.push(o);
                    else
                        for (a in e)
                            o = t(e[a], a, r),
                            null != o && s.push(o);
                    return oe.apply([], s)
                },
                guid: 1,
                proxy: function(e, t) {
                    var n, r, i;
                    if ("string" == typeof t && (i = e[t],
                    t = e,
                    e = i),
                    pe.isFunction(e))
                        return n = ie.call(arguments, 2),
                        r = function() {
                            return e.apply(t || this, n.concat(ie.call(arguments)))
                        }
                        ,
                        r.guid = e.guid = e.guid || pe.guid++,
                        r
                },
                now: function() {
                    return +new Date
                },
                support: de
            }),
            "function" == typeof Symbol && (pe.fn[Symbol.iterator] = ne[Symbol.iterator]),
            pe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
                le["[object " + t + "]"] = t.toLowerCase()
            });
            var ye = function(e) {
                function t(e, t, n, r) {
                    var i, o, a, s, l, u, d, p, h = t && t.ownerDocument, g = t ? t.nodeType : 9;
                    if (n = n || [],
                    "string" != typeof e || !e || 1 !== g && 9 !== g && 11 !== g)
                        return n;
                    if (!r && ((t ? t.ownerDocument || t : I) !== H && $(t),
                    t = t || H,
                    L)) {
                        if (11 !== g && (u = ve.exec(e)))
                            if (i = u[1]) {
                                if (9 === g) {
                                    if (!(a = t.getElementById(i)))
                                        return n;
                                    if (a.id === i)
                                        return n.push(a),
                                        n
                                } else if (h && (a = h.getElementById(i)) && F(t, a) && a.id === i)
                                    return n.push(a),
                                    n
                            } else {
                                if (u[2])
                                    return Q.apply(n, t.getElementsByTagName(e)),
                                    n;
                                if ((i = u[3]) && w.getElementsByClassName && t.getElementsByClassName)
                                    return Q.apply(n, t.getElementsByClassName(i)),
                                    n
                            }
                        if (w.qsa && !X[e + " "] && (!_ || !_.test(e))) {
                            if (1 !== g)
                                h = t,
                                p = e;
                            else if ("object" !== t.nodeName.toLowerCase()) {
                                for ((s = t.getAttribute("id")) ? s = s.replace(be, "\\$&") : t.setAttribute("id", s = P),
                                d = C(e),
                                o = d.length,
                                l = fe.test(s) ? "#" + s : "[id='" + s + "']"; o--; )
                                    d[o] = l + " " + f(d[o]);
                                p = d.join(","),
                                h = ye.test(e) && c(t.parentNode) || t
                            }
                            if (p)
                                try {
                                    return Q.apply(n, h.querySelectorAll(p)),
                                    n
                                } catch (e) {} finally {
                                    s === P && t.removeAttribute("id")
                                }
                        }
                    }
                    return A(e.replace(se, "$1"), t, n, r)
                }
                function n() {
                    function e(n, r) {
                        return t.push(n + " ") > T.cacheLength && delete e[t.shift()],
                        e[n + " "] = r
                    }
                    var t = [];
                    return e
                }
                function r(e) {
                    return e[P] = !0,
                    e
                }
                function i(e) {
                    var t = H.createElement("div");
                    try {
                        return !!e(t)
                    } catch (e) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t),
                        t = null
                    }
                }
                function o(e, t) {
                    for (var n = e.split("|"), r = n.length; r--; )
                        T.attrHandle[n[r]] = t
                }
                function a(e, t) {
                    var n = t && e
                      , r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || U) - (~e.sourceIndex || U);
                    if (r)
                        return r;
                    if (n)
                        for (; n = n.nextSibling; )
                            if (n === t)
                                return -1;
                    return e ? 1 : -1
                }
                function s(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return "input" === n && t.type === e
                    }
                }
                function l(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }
                function u(e) {
                    return r(function(t) {
                        return t = +t,
                        r(function(n, r) {
                            for (var i, o = e([], n.length, t), a = o.length; a--; )
                                n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                        })
                    })
                }
                function c(e) {
                    return e && "undefined" != typeof e.getElementsByTagName && e
                }
                function d() {}
                function f(e) {
                    for (var t = 0, n = e.length, r = ""; t < n; t++)
                        r += e[t].value;
                    return r
                }
                function p(e, t, n) {
                    var r = t.dir
                      , i = n && "parentNode" === r
                      , o = z++;
                    return t.first ? function(t, n, o) {
                        for (; t = t[r]; )
                            if (1 === t.nodeType || i)
                                return e(t, n, o);
                    }
                    : function(t, n, a) {
                        var s, l, u, c = [R, o];
                        if (a) {
                            for (; t = t[r]; )
                                if ((1 === t.nodeType || i) && e(t, n, a))
                                    return !0
                        } else
                            for (; t = t[r]; )
                                if (1 === t.nodeType || i) {
                                    if (u = t[P] || (t[P] = {}),
                                    l = u[t.uniqueID] || (u[t.uniqueID] = {}),
                                    (s = l[r]) && s[0] === R && s[1] === o)
                                        return c[2] = s[2];
                                    if (l[r] = c,
                                    c[2] = e(t, n, a))
                                        return !0
                                }
                    }
                }
                function h(e) {
                    return e.length > 1 ? function(t, n, r) {
                        for (var i = e.length; i--; )
                            if (!e[i](t, n, r))
                                return !1;
                        return !0
                    }
                    : e[0]
                }
                function g(e, n, r) {
                    for (var i = 0, o = n.length; i < o; i++)
                        t(e, n[i], r);
                    return r
                }
                function m(e, t, n, r, i) {
                    for (var o, a = [], s = 0, l = e.length, u = null != t; s < l; s++)
                        (o = e[s]) && (n && !n(o, r, i) || (a.push(o),
                        u && t.push(s)));
                    return a
                }
                function v(e, t, n, i, o, a) {
                    return i && !i[P] && (i = v(i)),
                    o && !o[P] && (o = v(o, a)),
                    r(function(r, a, s, l) {
                        var u, c, d, f = [], p = [], h = a.length, v = r || g(t || "*", s.nodeType ? [s] : s, []), y = !e || !r && t ? v : m(v, f, e, s, l), b = n ? o || (r ? e : h || i) ? [] : a : y;
                        if (n && n(y, b, s, l),
                        i)
                            for (u = m(b, p),
                            i(u, [], s, l),
                            c = u.length; c--; )
                                (d = u[c]) && (b[p[c]] = !(y[p[c]] = d));
                        if (r) {
                            if (o || e) {
                                if (o) {
                                    for (u = [],
                                    c = b.length; c--; )
                                        (d = b[c]) && u.push(y[c] = d);
                                    o(null, b = [], u, l)
                                }
                                for (c = b.length; c--; )
                                    (d = b[c]) && (u = o ? ee(r, d) : f[c]) > -1 && (r[u] = !(a[u] = d))
                            }
                        } else
                            b = m(b === a ? b.splice(h, b.length) : b),
                            o ? o(null, a, b, l) : Q.apply(a, b)
                    })
                }
                function y(e) {
                    for (var t, n, r, i = e.length, o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, l = p(function(e) {
                        return e === t
                    }, a, !0), u = p(function(e) {
                        return ee(t, e) > -1
                    }, a, !0), c = [function(e, n, r) {
                        var i = !o && (r || n !== j) || ((t = n).nodeType ? l(e, n, r) : u(e, n, r));
                        return t = null,
                        i
                    }
                    ]; s < i; s++)
                        if (n = T.relative[e[s].type])
                            c = [p(h(c), n)];
                        else {
                            if (n = T.filter[e[s].type].apply(null, e[s].matches),
                            n[P]) {
                                for (r = ++s; r < i && !T.relative[e[r].type]; r++)
                                    ;
                                return v(s > 1 && h(c), s > 1 && f(e.slice(0, s - 1).concat({
                                    value: " " === e[s - 2].type ? "*" : ""
                                })).replace(se, "$1"), n, s < r && y(e.slice(s, r)), r < i && y(e = e.slice(r)), r < i && f(e))
                            }
                            c.push(n)
                        }
                    return h(c)
                }
                function b(e, n) {
                    var i = n.length > 0
                      , o = e.length > 0
                      , a = function(r, a, s, l, u) {
                        var c, d, f, p = 0, h = "0", g = r && [], v = [], y = j, b = r || o && T.find.TAG("*", u), x = R += null == y ? 1 : Math.random() || .1, w = b.length;
                        for (u && (j = a === H || a || u); h !== w && null != (c = b[h]); h++) {
                            if (o && c) {
                                for (d = 0,
                                a || c.ownerDocument === H || ($(c),
                                s = !L); f = e[d++]; )
                                    if (f(c, a || H, s)) {
                                        l.push(c);
                                        break
                                    }
                                u && (R = x)
                            }
                            i && ((c = !f && c) && p--,
                            r && g.push(c))
                        }
                        if (p += h,
                        i && h !== p) {
                            for (d = 0; f = n[d++]; )
                                f(g, v, a, s);
                            if (r) {
                                if (p > 0)
                                    for (; h--; )
                                        g[h] || v[h] || (v[h] = J.call(l));
                                v = m(v)
                            }
                            Q.apply(l, v),
                            u && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                        }
                        return u && (R = x,
                        j = y),
                        g
                    };
                    return i ? r(a) : a
                }
                var x, w, T, k, S, C, E, A, j, N, D, $, H, M, L, _, O, q, F, P = "sizzle" + 1 * new Date, I = e.document, R = 0, z = 0, B = n(), W = n(), X = n(), V = function(e, t) {
                    return e === t && (D = !0),
                    0
                }, U = 1 << 31, Y = {}.hasOwnProperty, Z = [], J = Z.pop, G = Z.push, Q = Z.push, K = Z.slice, ee = function(e, t) {
                    for (var n = 0, r = e.length; n < r; n++)
                        if (e[n] === t)
                            return n;
                    return -1
                }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]", oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)", ae = new RegExp(ne + "+","g"), se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$","g"), le = new RegExp("^" + ne + "*," + ne + "*"), ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]","g"), de = new RegExp(oe), fe = new RegExp("^" + re + "$"), pe = {
                    ID: new RegExp("^#(" + re + ")"),
                    CLASS: new RegExp("^\\.(" + re + ")"),
                    TAG: new RegExp("^(" + re + "|[*])"),
                    ATTR: new RegExp("^" + ie),
                    PSEUDO: new RegExp("^" + oe),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)","i"),
                    bool: new RegExp("^(?:" + te + ")$","i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)","i")
                }, he = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, me = /^[^{]+\{\s*\[native \w/, ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, be = /'|\\/g, xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)","ig"), we = function(e, t, n) {
                    var r = "0x" + t - 65536;
                    return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                }, Te = function() {
                    $()
                };
                try {
                    Q.apply(Z = K.call(I.childNodes), I.childNodes),
                    Z[I.childNodes.length].nodeType
                } catch (e) {
                    Q = {
                        apply: Z.length ? function(e, t) {
                            G.apply(e, K.call(t))
                        }
                        : function(e, t) {
                            for (var n = e.length, r = 0; e[n++] = t[r++]; )
                                ;
                            e.length = n - 1
                        }
                    }
                }
                w = t.support = {},
                S = t.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return !!t && "HTML" !== t.nodeName
                }
                ,
                $ = t.setDocument = function(e) {
                    var t, n, r = e ? e.ownerDocument || e : I;
                    return r !== H && 9 === r.nodeType && r.documentElement ? (H = r,
                    M = H.documentElement,
                    L = !S(H),
                    (n = H.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Te, !1) : n.attachEvent && n.attachEvent("onunload", Te)),
                    w.attributes = i(function(e) {
                        return e.className = "i",
                        !e.getAttribute("className")
                    }),
                    w.getElementsByTagName = i(function(e) {
                        return e.appendChild(H.createComment("")),
                        !e.getElementsByTagName("*").length
                    }),
                    w.getElementsByClassName = me.test(H.getElementsByClassName),
                    w.getById = i(function(e) {
                        return M.appendChild(e).id = P,
                        !H.getElementsByName || !H.getElementsByName(P).length
                    }),
                    w.getById ? (T.find.ID = function(e, t) {
                        if ("undefined" != typeof t.getElementById && L) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }
                    ,
                    T.filter.ID = function(e) {
                        var t = e.replace(xe, we);
                        return function(e) {
                            return e.getAttribute("id") === t
                        }
                    }
                    ) : (delete T.find.ID,
                    T.filter.ID = function(e) {
                        var t = e.replace(xe, we);
                        return function(e) {
                            var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }
                    ),
                    T.find.TAG = w.getElementsByTagName ? function(e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
                    }
                    : function(e, t) {
                        var n, r = [], i = 0, o = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = o[i++]; )
                                1 === n.nodeType && r.push(n);
                            return r
                        }
                        return o
                    }
                    ,
                    T.find.CLASS = w.getElementsByClassName && function(e, t) {
                        if ("undefined" != typeof t.getElementsByClassName && L)
                            return t.getElementsByClassName(e)
                    }
                    ,
                    O = [],
                    _ = [],
                    (w.qsa = me.test(H.querySelectorAll)) && (i(function(e) {
                        M.appendChild(e).innerHTML = "<a id='" + P + "'></a><select id='" + P + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                        e.querySelectorAll("[msallowcapture^='']").length && _.push("[*^$]=" + ne + "*(?:''|\"\")"),
                        e.querySelectorAll("[selected]").length || _.push("\\[" + ne + "*(?:value|" + te + ")"),
                        e.querySelectorAll("[id~=" + P + "-]").length || _.push("~="),
                        e.querySelectorAll(":checked").length || _.push(":checked"),
                        e.querySelectorAll("a#" + P + "+*").length || _.push(".#.+[+~]")
                    }),
                    i(function(e) {
                        var t = H.createElement("input");
                        t.setAttribute("type", "hidden"),
                        e.appendChild(t).setAttribute("name", "D"),
                        e.querySelectorAll("[name=d]").length && _.push("name" + ne + "*[*^$|!~]?="),
                        e.querySelectorAll(":enabled").length || _.push(":enabled", ":disabled"),
                        e.querySelectorAll("*,:x"),
                        _.push(",.*:")
                    })),
                    (w.matchesSelector = me.test(q = M.matches || M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && i(function(e) {
                        w.disconnectedMatch = q.call(e, "div"),
                        q.call(e, "[s!='']:x"),
                        O.push("!=", oe)
                    }),
                    _ = _.length && new RegExp(_.join("|")),
                    O = O.length && new RegExp(O.join("|")),
                    t = me.test(M.compareDocumentPosition),
                    F = t || me.test(M.contains) ? function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e
                          , r = t && t.parentNode;
                        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                    }
                    : function(e, t) {
                        if (t)
                            for (; t = t.parentNode; )
                                if (t === e)
                                    return !0;
                        return !1
                    }
                    ,
                    V = t ? function(e, t) {
                        if (e === t)
                            return D = !0,
                            0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1,
                        1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === H || e.ownerDocument === I && F(I, e) ? -1 : t === H || t.ownerDocument === I && F(I, t) ? 1 : N ? ee(N, e) - ee(N, t) : 0 : 4 & n ? -1 : 1)
                    }
                    : function(e, t) {
                        if (e === t)
                            return D = !0,
                            0;
                        var n, r = 0, i = e.parentNode, o = t.parentNode, s = [e], l = [t];
                        if (!i || !o)
                            return e === H ? -1 : t === H ? 1 : i ? -1 : o ? 1 : N ? ee(N, e) - ee(N, t) : 0;
                        if (i === o)
                            return a(e, t);
                        for (n = e; n = n.parentNode; )
                            s.unshift(n);
                        for (n = t; n = n.parentNode; )
                            l.unshift(n);
                        for (; s[r] === l[r]; )
                            r++;
                        return r ? a(s[r], l[r]) : s[r] === I ? -1 : l[r] === I ? 1 : 0
                    }
                    ,
                    H) : H
                }
                ,
                t.matches = function(e, n) {
                    return t(e, null, null, n)
                }
                ,
                t.matchesSelector = function(e, n) {
                    if ((e.ownerDocument || e) !== H && $(e),
                    n = n.replace(ce, "='$1']"),
                    w.matchesSelector && L && !X[n + " "] && (!O || !O.test(n)) && (!_ || !_.test(n)))
                        try {
                            var r = q.call(e, n);
                            if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                                return r
                        } catch (e) {}
                    return t(n, H, null, [e]).length > 0
                }
                ,
                t.contains = function(e, t) {
                    return (e.ownerDocument || e) !== H && $(e),
                    F(e, t)
                }
                ,
                t.attr = function(e, t) {
                    (e.ownerDocument || e) !== H && $(e);
                    var n = T.attrHandle[t.toLowerCase()]
                      , r = n && Y.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !L) : void 0;
                    return void 0 !== r ? r : w.attributes || !L ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }
                ,
                t.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }
                ,
                t.uniqueSort = function(e) {
                    var t, n = [], r = 0, i = 0;
                    if (D = !w.detectDuplicates,
                    N = !w.sortStable && e.slice(0),
                    e.sort(V),
                    D) {
                        for (; t = e[i++]; )
                            t === e[i] && (r = n.push(i));
                        for (; r--; )
                            e.splice(n[r], 1)
                    }
                    return N = null,
                    e
                }
                ,
                k = t.getText = function(e) {
                    var t, n = "", r = 0, i = e.nodeType;
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof e.textContent)
                                return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling)
                                n += k(e)
                        } else if (3 === i || 4 === i)
                            return e.nodeValue
                    } else
                        for (; t = e[r++]; )
                            n += k(t);
                    return n
                }
                ,
                T = t.selectors = {
                    cacheLength: 50,
                    createPseudo: r,
                    match: pe,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(xe, we),
                            e[3] = (e[3] || e[4] || e[5] || "").replace(xe, we),
                            "~=" === e[2] && (e[3] = " " + e[3] + " "),
                            e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(),
                            "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]),
                            e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                            e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                            e
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[6] && e[2];
                            return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = C(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                            e[2] = n.slice(0, t)),
                            e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(xe, we).toLowerCase();
                            return "*" === e ? function() {
                                return !0
                            }
                            : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function(e) {
                            var t = B[e + " "];
                            return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && B(e, function(e) {
                                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, n, r) {
                            return function(i) {
                                var o = t.attr(i, e);
                                return null == o ? "!=" === n : !n || (o += "",
                                "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                            }
                        },
                        CHILD: function(e, t, n, r, i) {
                            var o = "nth" !== e.slice(0, 3)
                              , a = "last" !== e.slice(-4)
                              , s = "of-type" === t;
                            return 1 === r && 0 === i ? function(e) {
                                return !!e.parentNode
                            }
                            : function(t, n, l) {
                                var u, c, d, f, p, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !l && !s, b = !1;
                                if (m) {
                                    if (o) {
                                        for (; g; ) {
                                            for (f = t; f = f[g]; )
                                                if (s ? f.nodeName.toLowerCase() === v : 1 === f.nodeType)
                                                    return !1;
                                            h = g = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [a ? m.firstChild : m.lastChild],
                                    a && y) {
                                        for (f = m,
                                        d = f[P] || (f[P] = {}),
                                        c = d[f.uniqueID] || (d[f.uniqueID] = {}),
                                        u = c[e] || [],
                                        p = u[0] === R && u[1],
                                        b = p && u[2],
                                        f = p && m.childNodes[p]; f = ++p && f && f[g] || (b = p = 0) || h.pop(); )
                                            if (1 === f.nodeType && ++b && f === t) {
                                                c[e] = [R, p, b];
                                                break
                                            }
                                    } else if (y && (f = t,
                                    d = f[P] || (f[P] = {}),
                                    c = d[f.uniqueID] || (d[f.uniqueID] = {}),
                                    u = c[e] || [],
                                    p = u[0] === R && u[1],
                                    b = p),
                                    b === !1)
                                        for (; (f = ++p && f && f[g] || (b = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++b || (y && (d = f[P] || (f[P] = {}),
                                        c = d[f.uniqueID] || (d[f.uniqueID] = {}),
                                        c[e] = [R, b]),
                                        f !== t)); )
                                            ;
                                    return b -= i,
                                    b === r || b % r === 0 && b / r >= 0
                                }
                            }
                        },
                        PSEUDO: function(e, n) {
                            var i, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                            return o[P] ? o(n) : o.length > 1 ? (i = [e, e, "", n],
                            T.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                                for (var r, i = o(e, n), a = i.length; a--; )
                                    r = ee(e, i[a]),
                                    e[r] = !(t[r] = i[a])
                            }) : function(e) {
                                return o(e, 0, i)
                            }
                            ) : o
                        }
                    },
                    pseudos: {
                        not: r(function(e) {
                            var t = []
                              , n = []
                              , i = E(e.replace(se, "$1"));
                            return i[P] ? r(function(e, t, n, r) {
                                for (var o, a = i(e, null, r, []), s = e.length; s--; )
                                    (o = a[s]) && (e[s] = !(t[s] = o))
                            }) : function(e, r, o) {
                                return t[0] = e,
                                i(t, null, o, n),
                                t[0] = null,
                                !n.pop()
                            }
                        }),
                        has: r(function(e) {
                            return function(n) {
                                return t(e, n).length > 0
                            }
                        }),
                        contains: r(function(e) {
                            return e = e.replace(xe, we),
                            function(t) {
                                return (t.textContent || t.innerText || k(t)).indexOf(e) > -1
                            }
                        }),
                        lang: r(function(e) {
                            return fe.test(e || "") || t.error("unsupported lang: " + e),
                            e = e.replace(xe, we).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                        return n = n.toLowerCase(),
                                        n === e || 0 === n.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);return !1
                            }
                        }),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === M
                        },
                        focus: function(e) {
                            return e === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function(e) {
                            return e.disabled === !1
                        },
                        disabled: function(e) {
                            return e.disabled === !0
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex,
                            e.selected === !0
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeType < 6)
                                    return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !T.pseudos.empty(e)
                        },
                        header: function(e) {
                            return ge.test(e.nodeName)
                        },
                        input: function(e) {
                            return he.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        },
                        first: u(function() {
                            return [0]
                        }),
                        last: u(function(e, t) {
                            return [t - 1]
                        }),
                        eq: u(function(e, t, n) {
                            return [n < 0 ? n + t : n]
                        }),
                        even: u(function(e, t) {
                            for (var n = 0; n < t; n += 2)
                                e.push(n);
                            return e
                        }),
                        odd: u(function(e, t) {
                            for (var n = 1; n < t; n += 2)
                                e.push(n);
                            return e
                        }),
                        lt: u(function(e, t, n) {
                            for (var r = n < 0 ? n + t : n; --r >= 0; )
                                e.push(r);
                            return e
                        }),
                        gt: u(function(e, t, n) {
                            for (var r = n < 0 ? n + t : n; ++r < t; )
                                e.push(r);
                            return e
                        })
                    }
                },
                T.pseudos.nth = T.pseudos.eq;
                for (x in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                })
                    T.pseudos[x] = s(x);
                for (x in {
                    submit: !0,
                    reset: !0
                })
                    T.pseudos[x] = l(x);
                return d.prototype = T.filters = T.pseudos,
                T.setFilters = new d,
                C = t.tokenize = function(e, n) {
                    var r, i, o, a, s, l, u, c = W[e + " "];
                    if (c)
                        return n ? 0 : c.slice(0);
                    for (s = e,
                    l = [],
                    u = T.preFilter; s; ) {
                        r && !(i = le.exec(s)) || (i && (s = s.slice(i[0].length) || s),
                        l.push(o = [])),
                        r = !1,
                        (i = ue.exec(s)) && (r = i.shift(),
                        o.push({
                            value: r,
                            type: i[0].replace(se, " ")
                        }),
                        s = s.slice(r.length));
                        for (a in T.filter)
                            !(i = pe[a].exec(s)) || u[a] && !(i = u[a](i)) || (r = i.shift(),
                            o.push({
                                value: r,
                                type: a,
                                matches: i
                            }),
                            s = s.slice(r.length));
                        if (!r)
                            break
                    }
                    return n ? s.length : s ? t.error(e) : W(e, l).slice(0)
                }
                ,
                E = t.compile = function(e, t) {
                    var n, r = [], i = [], o = X[e + " "];
                    if (!o) {
                        for (t || (t = C(e)),
                        n = t.length; n--; )
                            o = y(t[n]),
                            o[P] ? r.push(o) : i.push(o);
                        o = X(e, b(i, r)),
                        o.selector = e
                    }
                    return o
                }
                ,
                A = t.select = function(e, t, n, r) {
                    var i, o, a, s, l, u = "function" == typeof e && e, d = !r && C(e = u.selector || e);
                    if (n = n || [],
                    1 === d.length) {
                        if (o = d[0] = d[0].slice(0),
                        o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && L && T.relative[o[1].type]) {
                            if (t = (T.find.ID(a.matches[0].replace(xe, we), t) || [])[0],
                            !t)
                                return n;
                            u && (t = t.parentNode),
                            e = e.slice(o.shift().value.length)
                        }
                        for (i = pe.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i],
                        !T.relative[s = a.type]); )
                            if ((l = T.find[s]) && (r = l(a.matches[0].replace(xe, we), ye.test(o[0].type) && c(t.parentNode) || t))) {
                                if (o.splice(i, 1),
                                e = r.length && f(o),
                                !e)
                                    return Q.apply(n, r),
                                    n;
                                break
                            }
                    }
                    return (u || E(e, d))(r, t, !L, n, !t || ye.test(e) && c(t.parentNode) || t),
                    n
                }
                ,
                w.sortStable = P.split("").sort(V).join("") === P,
                w.detectDuplicates = !!D,
                $(),
                w.sortDetached = i(function(e) {
                    return 1 & e.compareDocumentPosition(H.createElement("div"))
                }),
                i(function(e) {
                    return e.innerHTML = "<a href='#'></a>",
                    "#" === e.firstChild.getAttribute("href")
                }) || o("type|href|height|width", function(e, t, n) {
                    if (!n)
                        return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }),
                w.attributes && i(function(e) {
                    return e.innerHTML = "<input/>",
                    e.firstChild.setAttribute("value", ""),
                    "" === e.firstChild.getAttribute("value")
                }) || o("value", function(e, t, n) {
                    if (!n && "input" === e.nodeName.toLowerCase())
                        return e.defaultValue
                }),
                i(function(e) {
                    return null == e.getAttribute("disabled")
                }) || o(te, function(e, t, n) {
                    var r;
                    if (!n)
                        return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }),
                t
            }(e);
            pe.find = ye,
            pe.expr = ye.selectors,
            pe.expr[":"] = pe.expr.pseudos,
            pe.uniqueSort = pe.unique = ye.uniqueSort,
            pe.text = ye.getText,
            pe.isXMLDoc = ye.isXML,
            pe.contains = ye.contains;
            var be = function(e, t, n) {
                for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
                    if (1 === e.nodeType) {
                        if (i && pe(e).is(n))
                            break;
                        r.push(e)
                    }
                return r
            }
              , xe = function(e, t) {
                for (var n = []; e; e = e.nextSibling)
                    1 === e.nodeType && e !== t && n.push(e);
                return n
            }
              , we = pe.expr.match.needsContext
              , Te = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
              , ke = /^.[^:#\[\.,]*$/;
            pe.filter = function(e, t, n) {
                var r = t[0];
                return n && (e = ":not(" + e + ")"),
                1 === t.length && 1 === r.nodeType ? pe.find.matchesSelector(r, e) ? [r] : [] : pe.find.matches(e, pe.grep(t, function(e) {
                    return 1 === e.nodeType
                }))
            }
            ,
            pe.fn.extend({
                find: function(e) {
                    var t, n = [], r = this, i = r.length;
                    if ("string" != typeof e)
                        return this.pushStack(pe(e).filter(function() {
                            for (t = 0; t < i; t++)
                                if (pe.contains(r[t], this))
                                    return !0
                        }));
                    for (t = 0; t < i; t++)
                        pe.find(e, r[t], n);
                    return n = this.pushStack(i > 1 ? pe.unique(n) : n),
                    n.selector = this.selector ? this.selector + " " + e : e,
                    n
                },
                filter: function(e) {
                    return this.pushStack(r(this, e || [], !1))
                },
                not: function(e) {
                    return this.pushStack(r(this, e || [], !0))
                },
                is: function(e) {
                    return !!r(this, "string" == typeof e && we.test(e) ? pe(e) : e || [], !1).length
                }
            });
            var Se, Ce = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, Ee = pe.fn.init = function(e, t, n) {
                var r, i;
                if (!e)
                    return this;
                if (n = n || Se,
                "string" == typeof e) {
                    if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : Ce.exec(e),
                    !r || !r[1] && t)
                        return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                    if (r[1]) {
                        if (t = t instanceof pe ? t[0] : t,
                        pe.merge(this, pe.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : re, !0)),
                        Te.test(r[1]) && pe.isPlainObject(t))
                            for (r in t)
                                pe.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                        return this
                    }
                    if (i = re.getElementById(r[2]),
                    i && i.parentNode) {
                        if (i.id !== r[2])
                            return Se.find(e);
                        this.length = 1,
                        this[0] = i
                    }
                    return this.context = re,
                    this.selector = e,
                    this
                }
                return e.nodeType ? (this.context = this[0] = e,
                this.length = 1,
                this) : pe.isFunction(e) ? "undefined" != typeof n.ready ? n.ready(e) : e(pe) : (void 0 !== e.selector && (this.selector = e.selector,
                this.context = e.context),
                pe.makeArray(e, this))
            }
            ;
            Ee.prototype = pe.fn,
            Se = pe(re);
            var Ae = /^(?:parents|prev(?:Until|All))/
              , je = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
            pe.fn.extend({
                has: function(e) {
                    var t, n = pe(e, this), r = n.length;
                    return this.filter(function() {
                        for (t = 0; t < r; t++)
                            if (pe.contains(this, n[t]))
                                return !0
                    })
                },
                closest: function(e, t) {
                    for (var n, r = 0, i = this.length, o = [], a = we.test(e) || "string" != typeof e ? pe(e, t || this.context) : 0; r < i; r++)
                        for (n = this[r]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && pe.find.matchesSelector(n, e))) {
                                o.push(n);
                                break
                            }
                    return this.pushStack(o.length > 1 ? pe.uniqueSort(o) : o)
                },
                index: function(e) {
                    return e ? "string" == typeof e ? pe.inArray(this[0], pe(e)) : pe.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(e, t) {
                    return this.pushStack(pe.uniqueSort(pe.merge(this.get(), pe(e, t))))
                },
                addBack: function(e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                }
            }),
            pe.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null
                },
                parents: function(e) {
                    return be(e, "parentNode")
                },
                parentsUntil: function(e, t, n) {
                    return be(e, "parentNode", n)
                },
                next: function(e) {
                    return i(e, "nextSibling")
                },
                prev: function(e) {
                    return i(e, "previousSibling")
                },
                nextAll: function(e) {
                    return be(e, "nextSibling")
                },
                prevAll: function(e) {
                    return be(e, "previousSibling")
                },
                nextUntil: function(e, t, n) {
                    return be(e, "nextSibling", n)
                },
                prevUntil: function(e, t, n) {
                    return be(e, "previousSibling", n)
                },
                siblings: function(e) {
                    return xe((e.parentNode || {}).firstChild, e)
                },
                children: function(e) {
                    return xe(e.firstChild)
                },
                contents: function(e) {
                    return pe.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : pe.merge([], e.childNodes)
                }
            }, function(e, t) {
                pe.fn[e] = function(n, r) {
                    var i = pe.map(this, t, n);
                    return "Until" !== e.slice(-5) && (r = n),
                    r && "string" == typeof r && (i = pe.filter(r, i)),
                    this.length > 1 && (je[e] || (i = pe.uniqueSort(i)),
                    Ae.test(e) && (i = i.reverse())),
                    this.pushStack(i)
                }
            });
            var Ne = /\S+/g;
            pe.Callbacks = function(e) {
                e = "string" == typeof e ? o(e) : pe.extend({}, e);
                var t, n, r, i, a = [], s = [], l = -1, u = function() {
                    for (i = e.once,
                    r = t = !0; s.length; l = -1)
                        for (n = s.shift(); ++l < a.length; )
                            a[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && (l = a.length,
                            n = !1);
                    e.memory || (n = !1),
                    t = !1,
                    i && (a = n ? [] : "")
                }, c = {
                    add: function() {
                        return a && (n && !t && (l = a.length - 1,
                        s.push(n)),
                        function t(n) {
                            pe.each(n, function(n, r) {
                                pe.isFunction(r) ? e.unique && c.has(r) || a.push(r) : r && r.length && "string" !== pe.type(r) && t(r)
                            })
                        }(arguments),
                        n && !t && u()),
                        this
                    },
                    remove: function() {
                        return pe.each(arguments, function(e, t) {
                            for (var n; (n = pe.inArray(t, a, n)) > -1; )
                                a.splice(n, 1),
                                n <= l && l--
                        }),
                        this
                    },
                    has: function(e) {
                        return e ? pe.inArray(e, a) > -1 : a.length > 0
                    },
                    empty: function() {
                        return a && (a = []),
                        this
                    },
                    disable: function() {
                        return i = s = [],
                        a = n = "",
                        this
                    },
                    disabled: function() {
                        return !a
                    },
                    lock: function() {
                        return i = !0,
                        n || c.disable(),
                        this
                    },
                    locked: function() {
                        return !!i
                    },
                    fireWith: function(e, n) {
                        return i || (n = n || [],
                        n = [e, n.slice ? n.slice() : n],
                        s.push(n),
                        t || u()),
                        this
                    },
                    fire: function() {
                        return c.fireWith(this, arguments),
                        this
                    },
                    fired: function() {
                        return !!r
                    }
                };
                return c
            }
            ,
            pe.extend({
                Deferred: function(e) {
                    var t = [["resolve", "done", pe.Callbacks("once memory"), "resolved"], ["reject", "fail", pe.Callbacks("once memory"), "rejected"], ["notify", "progress", pe.Callbacks("memory")]]
                      , n = "pending"
                      , r = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return i.done(arguments).fail(arguments),
                            this
                        },
                        then: function() {
                            var e = arguments;
                            return pe.Deferred(function(n) {
                                pe.each(t, function(t, o) {
                                    var a = pe.isFunction(e[t]) && e[t];
                                    i[o[1]](function() {
                                        var e = a && a.apply(this, arguments);
                                        e && pe.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                    })
                                }),
                                e = null
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? pe.extend(e, r) : r
                        }
                    }
                      , i = {};
                    return r.pipe = r.then,
                    pe.each(t, function(e, o) {
                        var a = o[2]
                          , s = o[3];
                        r[o[1]] = a.add,
                        s && a.add(function() {
                            n = s
                        }, t[1 ^ e][2].disable, t[2][2].lock),
                        i[o[0]] = function() {
                            return i[o[0] + "With"](this === i ? r : this, arguments),
                            this
                        }
                        ,
                        i[o[0] + "With"] = a.fireWith
                    }),
                    r.promise(i),
                    e && e.call(i, i),
                    i
                },
                when: function(e) {
                    var t, n, r, i = 0, o = ie.call(arguments), a = o.length, s = 1 !== a || e && pe.isFunction(e.promise) ? a : 0, l = 1 === s ? e : pe.Deferred(), u = function(e, n, r) {
                        return function(i) {
                            n[e] = this,
                            r[e] = arguments.length > 1 ? ie.call(arguments) : i,
                            r === t ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
                        }
                    };
                    if (a > 1)
                        for (t = new Array(a),
                        n = new Array(a),
                        r = new Array(a); i < a; i++)
                            o[i] && pe.isFunction(o[i].promise) ? o[i].promise().progress(u(i, n, t)).done(u(i, r, o)).fail(l.reject) : --s;
                    return s || l.resolveWith(r, o),
                    l.promise()
                }
            });
            var De;
            pe.fn.ready = function(e) {
                return pe.ready.promise().done(e),
                this
            }
            ,
            pe.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(e) {
                    e ? pe.readyWait++ : pe.ready(!0)
                },
                ready: function(e) {
                    (e === !0 ? --pe.readyWait : pe.isReady) || (pe.isReady = !0,
                    e !== !0 && --pe.readyWait > 0 || (De.resolveWith(re, [pe]),
                    pe.fn.triggerHandler && (pe(re).triggerHandler("ready"),
                    pe(re).off("ready"))))
                }
            }),
            pe.ready.promise = function(t) {
                if (!De)
                    if (De = pe.Deferred(),
                    "complete" === re.readyState || "loading" !== re.readyState && !re.documentElement.doScroll)
                        e.setTimeout(pe.ready);
                    else if (re.addEventListener)
                        re.addEventListener("DOMContentLoaded", s),
                        e.addEventListener("load", s);
                    else {
                        re.attachEvent("onreadystatechange", s),
                        e.attachEvent("onload", s);
                        var n = !1;
                        try {
                            n = null == e.frameElement && re.documentElement
                        } catch (e) {}
                        n && n.doScroll && !function t() {
                            if (!pe.isReady) {
                                try {
                                    n.doScroll("left")
                                } catch (n) {
                                    return e.setTimeout(t, 50)
                                }
                                a(),
                                pe.ready()
                            }
                        }()
                    }
                return De.promise(t)
            }
            ,
            pe.ready.promise();
            var $e;
            for ($e in pe(de))
                break;
            de.ownFirst = "0" === $e,
            de.inlineBlockNeedsLayout = !1,
            pe(function() {
                var e, t, n, r;
                n = re.getElementsByTagName("body")[0],
                n && n.style && (t = re.createElement("div"),
                r = re.createElement("div"),
                r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
                n.appendChild(r).appendChild(t),
                "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
                de.inlineBlockNeedsLayout = e = 3 === t.offsetWidth,
                e && (n.style.zoom = 1)),
                n.removeChild(r))
            }),
            function() {
                var e = re.createElement("div");
                de.deleteExpando = !0;
                try {
                    delete e.test
                } catch (e) {
                    de.deleteExpando = !1
                }
                e = null
            }();
            var He = function(e) {
                var t = pe.noData[(e.nodeName + " ").toLowerCase()]
                  , n = +e.nodeType || 1;
                return (1 === n || 9 === n) && (!t || t !== !0 && e.getAttribute("classid") === t)
            }
              , Me = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
              , Le = /([A-Z])/g;
            pe.extend({
                cache: {},
                noData: {
                    "applet ": !0,
                    "embed ": !0,
                    "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                },
                hasData: function(e) {
                    return e = e.nodeType ? pe.cache[e[pe.expando]] : e[pe.expando],
                    !!e && !u(e)
                },
                data: function(e, t, n) {
                    return c(e, t, n)
                },
                removeData: function(e, t) {
                    return d(e, t)
                },
                _data: function(e, t, n) {
                    return c(e, t, n, !0)
                },
                _removeData: function(e, t) {
                    return d(e, t, !0)
                }
            }),
            pe.fn.extend({
                data: function(e, t) {
                    var n, r, i, o = this[0], a = o && o.attributes;
                    if (void 0 === e) {
                        if (this.length && (i = pe.data(o),
                        1 === o.nodeType && !pe._data(o, "parsedAttrs"))) {
                            for (n = a.length; n--; )
                                a[n] && (r = a[n].name,
                                0 === r.indexOf("data-") && (r = pe.camelCase(r.slice(5)),
                                l(o, r, i[r])));
                            pe._data(o, "parsedAttrs", !0)
                        }
                        return i
                    }
                    return "object" == typeof e ? this.each(function() {
                        pe.data(this, e)
                    }) : arguments.length > 1 ? this.each(function() {
                        pe.data(this, e, t)
                    }) : o ? l(o, e, pe.data(o, e)) : void 0
                },
                removeData: function(e) {
                    return this.each(function() {
                        pe.removeData(this, e)
                    })
                }
            }),
            pe.extend({
                queue: function(e, t, n) {
                    var r;
                    if (e)
                        return t = (t || "fx") + "queue",
                        r = pe._data(e, t),
                        n && (!r || pe.isArray(n) ? r = pe._data(e, t, pe.makeArray(n)) : r.push(n)),
                        r || []
                },
                dequeue: function(e, t) {
                    t = t || "fx";
                    var n = pe.queue(e, t)
                      , r = n.length
                      , i = n.shift()
                      , o = pe._queueHooks(e, t)
                      , a = function() {
                        pe.dequeue(e, t)
                    };
                    "inprogress" === i && (i = n.shift(),
                    r--),
                    i && ("fx" === t && n.unshift("inprogress"),
                    delete o.stop,
                    i.call(e, a, o)),
                    !r && o && o.empty.fire()
                },
                _queueHooks: function(e, t) {
                    var n = t + "queueHooks";
                    return pe._data(e, n) || pe._data(e, n, {
                        empty: pe.Callbacks("once memory").add(function() {
                            pe._removeData(e, t + "queue"),
                            pe._removeData(e, n)
                        })
                    })
                }
            }),
            pe.fn.extend({
                queue: function(e, t) {
                    var n = 2;
                    return "string" != typeof e && (t = e,
                    e = "fx",
                    n--),
                    arguments.length < n ? pe.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                        var n = pe.queue(this, e, t);
                        pe._queueHooks(this, e),
                        "fx" === e && "inprogress" !== n[0] && pe.dequeue(this, e)
                    })
                },
                dequeue: function(e) {
                    return this.each(function() {
                        pe.dequeue(this, e)
                    })
                },
                clearQueue: function(e) {
                    return this.queue(e || "fx", [])
                },
                promise: function(e, t) {
                    var n, r = 1, i = pe.Deferred(), o = this, a = this.length, s = function() {
                        --r || i.resolveWith(o, [o])
                    };
                    for ("string" != typeof e && (t = e,
                    e = void 0),
                    e = e || "fx"; a--; )
                        n = pe._data(o[a], e + "queueHooks"),
                        n && n.empty && (r++,
                        n.empty.add(s));
                    return s(),
                    i.promise(t)
                }
            }),
            function() {
                var e;
                de.shrinkWrapBlocks = function() {
                    if (null != e)
                        return e;
                    e = !1;
                    var t, n, r;
                    return n = re.getElementsByTagName("body")[0],
                    n && n.style ? (t = re.createElement("div"),
                    r = re.createElement("div"),
                    r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
                    n.appendChild(r).appendChild(t),
                    "undefined" != typeof t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
                    t.appendChild(re.createElement("div")).style.width = "5px",
                    e = 3 !== t.offsetWidth),
                    n.removeChild(r),
                    e) : void 0
                }
            }();
            var _e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
              , Oe = new RegExp("^(?:([+-])=|)(" + _e + ")([a-z%]*)$","i")
              , qe = ["Top", "Right", "Bottom", "Left"]
              , Fe = function(e, t) {
                return e = t || e,
                "none" === pe.css(e, "display") || !pe.contains(e.ownerDocument, e)
            }
              , Pe = function(e, t, n, r, i, o, a) {
                var s = 0
                  , l = e.length
                  , u = null == n;
                if ("object" === pe.type(n)) {
                    i = !0;
                    for (s in n)
                        Pe(e, t, s, n[s], !0, o, a)
                } else if (void 0 !== r && (i = !0,
                pe.isFunction(r) || (a = !0),
                u && (a ? (t.call(e, r),
                t = null) : (u = t,
                t = function(e, t, n) {
                    return u.call(pe(e), n)
                }
                )),
                t))
                    for (; s < l; s++)
                        t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
                return i ? e : u ? t.call(e) : l ? t(e[0], n) : o
            }
              , Ie = /^(?:checkbox|radio)$/i
              , Re = /<([\w:-]+)/
              , ze = /^$|\/(?:java|ecma)script/i
              , Be = /^\s+/
              , We = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
            !function() {
                var e = re.createElement("div")
                  , t = re.createDocumentFragment()
                  , n = re.createElement("input");
                e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                de.leadingWhitespace = 3 === e.firstChild.nodeType,
                de.tbody = !e.getElementsByTagName("tbody").length,
                de.htmlSerialize = !!e.getElementsByTagName("link").length,
                de.html5Clone = "<:nav></:nav>" !== re.createElement("nav").cloneNode(!0).outerHTML,
                n.type = "checkbox",
                n.checked = !0,
                t.appendChild(n),
                de.appendChecked = n.checked,
                e.innerHTML = "<textarea>x</textarea>",
                de.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue,
                t.appendChild(e),
                n = re.createElement("input"),
                n.setAttribute("type", "radio"),
                n.setAttribute("checked", "checked"),
                n.setAttribute("name", "t"),
                e.appendChild(n),
                de.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked,
                de.noCloneEvent = !!e.addEventListener,
                e[pe.expando] = 1,
                de.attributes = !e.getAttribute(pe.expando)
            }();
            var Xe = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: de.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            };
            Xe.optgroup = Xe.option,
            Xe.tbody = Xe.tfoot = Xe.colgroup = Xe.caption = Xe.thead,
            Xe.th = Xe.td;
            var Ve = /<|&#?\w+;/
              , Ue = /<tbody/i;
            !function() {
                var t, n, r = re.createElement("div");
                for (t in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                })
                    n = "on" + t,
                    (de[t] = n in e) || (r.setAttribute(n, "t"),
                    de[t] = r.attributes[n].expando === !1);
                r = null
            }();
            var Ye = /^(?:input|select|textarea)$/i
              , Ze = /^key/
              , Je = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
              , Ge = /^(?:focusinfocus|focusoutblur)$/
              , Qe = /^([^.]*)(?:\.(.+)|)/;
            pe.event = {
                global: {},
                add: function(e, t, n, r, i) {
                    var o, a, s, l, u, c, d, f, p, h, g, m = pe._data(e);
                    if (m) {
                        for (n.handler && (l = n,
                        n = l.handler,
                        i = l.selector),
                        n.guid || (n.guid = pe.guid++),
                        (a = m.events) || (a = m.events = {}),
                        (c = m.handle) || (c = m.handle = function(e) {
                            return "undefined" == typeof pe || e && pe.event.triggered === e.type ? void 0 : pe.event.dispatch.apply(c.elem, arguments)
                        }
                        ,
                        c.elem = e),
                        t = (t || "").match(Ne) || [""],
                        s = t.length; s--; )
                            o = Qe.exec(t[s]) || [],
                            p = g = o[1],
                            h = (o[2] || "").split(".").sort(),
                            p && (u = pe.event.special[p] || {},
                            p = (i ? u.delegateType : u.bindType) || p,
                            u = pe.event.special[p] || {},
                            d = pe.extend({
                                type: p,
                                origType: g,
                                data: r,
                                handler: n,
                                guid: n.guid,
                                selector: i,
                                needsContext: i && pe.expr.match.needsContext.test(i),
                                namespace: h.join(".")
                            }, l),
                            (f = a[p]) || (f = a[p] = [],
                            f.delegateCount = 0,
                            u.setup && u.setup.call(e, r, h, c) !== !1 || (e.addEventListener ? e.addEventListener(p, c, !1) : e.attachEvent && e.attachEvent("on" + p, c))),
                            u.add && (u.add.call(e, d),
                            d.handler.guid || (d.handler.guid = n.guid)),
                            i ? f.splice(f.delegateCount++, 0, d) : f.push(d),
                            pe.event.global[p] = !0);
                        e = null
                    }
                },
                remove: function(e, t, n, r, i) {
                    var o, a, s, l, u, c, d, f, p, h, g, m = pe.hasData(e) && pe._data(e);
                    if (m && (c = m.events)) {
                        for (t = (t || "").match(Ne) || [""],
                        u = t.length; u--; )
                            if (s = Qe.exec(t[u]) || [],
                            p = g = s[1],
                            h = (s[2] || "").split(".").sort(),
                            p) {
                                for (d = pe.event.special[p] || {},
                                p = (r ? d.delegateType : d.bindType) || p,
                                f = c[p] || [],
                                s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                                l = o = f.length; o--; )
                                    a = f[o],
                                    !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1),
                                    a.selector && f.delegateCount--,
                                    d.remove && d.remove.call(e, a));
                                l && !f.length && (d.teardown && d.teardown.call(e, h, m.handle) !== !1 || pe.removeEvent(e, p, m.handle),
                                delete c[p])
                            } else
                                for (p in c)
                                    pe.event.remove(e, p + t[u], n, r, !0);
                        pe.isEmptyObject(c) && (delete m.handle,
                        pe._removeData(e, "events"))
                    }
                },
                trigger: function(t, n, r, i) {
                    var o, a, s, l, u, c, d, f = [r || re], p = ce.call(t, "type") ? t.type : t, h = ce.call(t, "namespace") ? t.namespace.split(".") : [];
                    if (s = c = r = r || re,
                    3 !== r.nodeType && 8 !== r.nodeType && !Ge.test(p + pe.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."),
                    p = h.shift(),
                    h.sort()),
                    a = p.indexOf(":") < 0 && "on" + p,
                    t = t[pe.expando] ? t : new pe.Event(p,"object" == typeof t && t),
                    t.isTrigger = i ? 2 : 3,
                    t.namespace = h.join("."),
                    t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                    t.result = void 0,
                    t.target || (t.target = r),
                    n = null == n ? [t] : pe.makeArray(n, [t]),
                    u = pe.event.special[p] || {},
                    i || !u.trigger || u.trigger.apply(r, n) !== !1)) {
                        if (!i && !u.noBubble && !pe.isWindow(r)) {
                            for (l = u.delegateType || p,
                            Ge.test(l + p) || (s = s.parentNode); s; s = s.parentNode)
                                f.push(s),
                                c = s;
                            c === (r.ownerDocument || re) && f.push(c.defaultView || c.parentWindow || e)
                        }
                        for (d = 0; (s = f[d++]) && !t.isPropagationStopped(); )
                            t.type = d > 1 ? l : u.bindType || p,
                            o = (pe._data(s, "events") || {})[t.type] && pe._data(s, "handle"),
                            o && o.apply(s, n),
                            o = a && s[a],
                            o && o.apply && He(s) && (t.result = o.apply(s, n),
                            t.result === !1 && t.preventDefault());
                        if (t.type = p,
                        !i && !t.isDefaultPrevented() && (!u._default || u._default.apply(f.pop(), n) === !1) && He(r) && a && r[p] && !pe.isWindow(r)) {
                            c = r[a],
                            c && (r[a] = null),
                            pe.event.triggered = p;
                            try {
                                r[p]()
                            } catch (e) {}
                            pe.event.triggered = void 0,
                            c && (r[a] = c)
                        }
                        return t.result
                    }
                },
                dispatch: function(e) {
                    e = pe.event.fix(e);
                    var t, n, r, i, o, a = [], s = ie.call(arguments), l = (pe._data(this, "events") || {})[e.type] || [], u = pe.event.special[e.type] || {};
                    if (s[0] = e,
                    e.delegateTarget = this,
                    !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                        for (a = pe.event.handlers.call(this, e, l),
                        t = 0; (i = a[t++]) && !e.isPropagationStopped(); )
                            for (e.currentTarget = i.elem,
                            n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped(); )
                                e.rnamespace && !e.rnamespace.test(o.namespace) || (e.handleObj = o,
                                e.data = o.data,
                                r = ((pe.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s),
                                void 0 !== r && (e.result = r) === !1 && (e.preventDefault(),
                                e.stopPropagation()));
                        return u.postDispatch && u.postDispatch.call(this, e),
                        e.result
                    }
                },
                handlers: function(e, t) {
                    var n, r, i, o, a = [], s = t.delegateCount, l = e.target;
                    if (s && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                        for (; l != this; l = l.parentNode || this)
                            if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                                for (r = [],
                                n = 0; n < s; n++)
                                    o = t[n],
                                    i = o.selector + " ",
                                    void 0 === r[i] && (r[i] = o.needsContext ? pe(i, this).index(l) > -1 : pe.find(i, this, null, [l]).length),
                                    r[i] && r.push(o);
                                r.length && a.push({
                                    elem: l,
                                    handlers: r
                                })
                            }
                    return s < t.length && a.push({
                        elem: this,
                        handlers: t.slice(s)
                    }),
                    a
                },
                fix: function(e) {
                    if (e[pe.expando])
                        return e;
                    var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
                    for (a || (this.fixHooks[i] = a = Je.test(i) ? this.mouseHooks : Ze.test(i) ? this.keyHooks : {}),
                    r = a.props ? this.props.concat(a.props) : this.props,
                    e = new pe.Event(o),
                    t = r.length; t--; )
                        n = r[t],
                        e[n] = o[n];
                    return e.target || (e.target = o.srcElement || re),
                    3 === e.target.nodeType && (e.target = e.target.parentNode),
                    e.metaKey = !!e.metaKey,
                    a.filter ? a.filter(e, o) : e
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(e, t) {
                        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                        e
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(e, t) {
                        var n, r, i, o = t.button, a = t.fromElement;
                        return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || re,
                        i = r.documentElement,
                        n = r.body,
                        e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0),
                        e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)),
                        !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a),
                        e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
                        e
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== x() && this.focus)
                                try {
                                    return this.focus(),
                                    !1
                                } catch (e) {}
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            if (this === x() && this.blur)
                                return this.blur(),
                                !1
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            if (pe.nodeName(this, "input") && "checkbox" === this.type && this.click)
                                return this.click(),
                                !1
                        },
                        _default: function(e) {
                            return pe.nodeName(e.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                        }
                    }
                },
                simulate: function(e, t, n) {
                    var r = pe.extend(new pe.Event, n, {
                        type: e,
                        isSimulated: !0
                    });
                    pe.event.trigger(r, null, t),
                    r.isDefaultPrevented() && n.preventDefault()
                }
            },
            pe.removeEvent = re.removeEventListener ? function(e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n)
            }
            : function(e, t, n) {
                var r = "on" + t;
                e.detachEvent && ("undefined" == typeof e[r] && (e[r] = null),
                e.detachEvent(r, n))
            }
            ,
            pe.Event = function(e, t) {
                return this instanceof pe.Event ? (e && e.type ? (this.originalEvent = e,
                this.type = e.type,
                this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? y : b) : this.type = e,
                t && pe.extend(this, t),
                this.timeStamp = e && e.timeStamp || pe.now(),
                void (this[pe.expando] = !0)) : new pe.Event(e,t)
            }
            ,
            pe.Event.prototype = {
                constructor: pe.Event,
                isDefaultPrevented: b,
                isPropagationStopped: b,
                isImmediatePropagationStopped: b,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = y,
                    e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = y,
                    e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(),
                    e.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = y,
                    e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
                    this.stopPropagation()
                }
            },
            pe.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(e, t) {
                pe.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function(e) {
                        var n, r = this, i = e.relatedTarget, o = e.handleObj;
                        return i && (i === r || pe.contains(r, i)) || (e.type = o.origType,
                        n = o.handler.apply(this, arguments),
                        e.type = t),
                        n
                    }
                }
            }),
            de.submit || (pe.event.special.submit = {
                setup: function() {
                    return !pe.nodeName(this, "form") && void pe.event.add(this, "click._submit keypress._submit", function(e) {
                        var t = e.target
                          , n = pe.nodeName(t, "input") || pe.nodeName(t, "button") ? pe.prop(t, "form") : void 0;
                        n && !pe._data(n, "submit") && (pe.event.add(n, "submit._submit", function(e) {
                            e._submitBubble = !0
                        }),
                        pe._data(n, "submit", !0))
                    })
                },
                postDispatch: function(e) {
                    e._submitBubble && (delete e._submitBubble,
                    this.parentNode && !e.isTrigger && pe.event.simulate("submit", this.parentNode, e))
                },
                teardown: function() {
                    return !pe.nodeName(this, "form") && void pe.event.remove(this, "._submit")
                }
            }),
            de.change || (pe.event.special.change = {
                setup: function() {
                    return Ye.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (pe.event.add(this, "propertychange._change", function(e) {
                        "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
                    }),
                    pe.event.add(this, "click._change", function(e) {
                        this._justChanged && !e.isTrigger && (this._justChanged = !1),
                        pe.event.simulate("change", this, e)
                    })),
                    !1) : void pe.event.add(this, "beforeactivate._change", function(e) {
                        var t = e.target;
                        Ye.test(t.nodeName) && !pe._data(t, "change") && (pe.event.add(t, "change._change", function(e) {
                            !this.parentNode || e.isSimulated || e.isTrigger || pe.event.simulate("change", this.parentNode, e)
                        }),
                        pe._data(t, "change", !0))
                    })
                },
                handle: function(e) {
                    var t = e.target;
                    if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type)
                        return e.handleObj.handler.apply(this, arguments)
                },
                teardown: function() {
                    return pe.event.remove(this, "._change"),
                    !Ye.test(this.nodeName)
                }
            }),
            de.focusin || pe.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, t) {
                var n = function(e) {
                    pe.event.simulate(t, e.target, pe.event.fix(e))
                };
                pe.event.special[t] = {
                    setup: function() {
                        var r = this.ownerDocument || this
                          , i = pe._data(r, t);
                        i || r.addEventListener(e, n, !0),
                        pe._data(r, t, (i || 0) + 1)
                    },
                    teardown: function() {
                        var r = this.ownerDocument || this
                          , i = pe._data(r, t) - 1;
                        i ? pe._data(r, t, i) : (r.removeEventListener(e, n, !0),
                        pe._removeData(r, t))
                    }
                }
            }),
            pe.fn.extend({
                on: function(e, t, n, r) {
                    return w(this, e, t, n, r)
                },
                one: function(e, t, n, r) {
                    return w(this, e, t, n, r, 1)
                },
                off: function(e, t, n) {
                    var r, i;
                    if (e && e.preventDefault && e.handleObj)
                        return r = e.handleObj,
                        pe(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                        this;
                    if ("object" == typeof e) {
                        for (i in e)
                            this.off(i, t, e[i]);
                        return this
                    }
                    return t !== !1 && "function" != typeof t || (n = t,
                    t = void 0),
                    n === !1 && (n = b),
                    this.each(function() {
                        pe.event.remove(this, e, n, t)
                    })
                },
                trigger: function(e, t) {
                    return this.each(function() {
                        pe.event.trigger(e, t, this)
                    })
                },
                triggerHandler: function(e, t) {
                    var n = this[0];
                    if (n)
                        return pe.event.trigger(e, t, n, !0)
                }
            });
            var Ke = / jQuery\d+="(?:null|\d+)"/g
              , et = new RegExp("<(?:" + We + ")[\\s/>]","i")
              , tt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
              , nt = /<script|<style|<link/i
              , rt = /checked\s*(?:[^=]|=\s*.checked.)/i
              , it = /^true\/(.*)/
              , ot = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
              , at = p(re)
              , st = at.appendChild(re.createElement("div"));
            pe.extend({
                htmlPrefilter: function(e) {
                    return e.replace(tt, "<$1></$2>")
                },
                clone: function(e, t, n) {
                    var r, i, o, a, s, l = pe.contains(e.ownerDocument, e);
                    if (de.html5Clone || pe.isXMLDoc(e) || !et.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (st.innerHTML = e.outerHTML,
                    st.removeChild(o = st.firstChild)),
                    !(de.noCloneEvent && de.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || pe.isXMLDoc(e)))
                        for (r = h(o),
                        s = h(e),
                        a = 0; null != (i = s[a]); ++a)
                            r[a] && E(i, r[a]);
                    if (t)
                        if (n)
                            for (s = s || h(e),
                            r = r || h(o),
                            a = 0; null != (i = s[a]); a++)
                                C(i, r[a]);
                        else
                            C(e, o);
                    return r = h(o, "script"),
                    r.length > 0 && g(r, !l && h(e, "script")),
                    r = s = i = null,
                    o
                },
                cleanData: function(e, t) {
                    for (var n, r, i, o, a = 0, s = pe.expando, l = pe.cache, u = de.attributes, c = pe.event.special; null != (n = e[a]); a++)
                        if ((t || He(n)) && (i = n[s],
                        o = i && l[i])) {
                            if (o.events)
                                for (r in o.events)
                                    c[r] ? pe.event.remove(n, r) : pe.removeEvent(n, r, o.handle);
                            l[i] && (delete l[i],
                            u || "undefined" == typeof n.removeAttribute ? n[s] = void 0 : n.removeAttribute(s),
                            ne.push(i))
                        }
                }
            }),
            pe.fn.extend({
                domManip: A,
                detach: function(e) {
                    return j(this, e, !0)
                },
                remove: function(e) {
                    return j(this, e)
                },
                text: function(e) {
                    return Pe(this, function(e) {
                        return void 0 === e ? pe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || re).createTextNode(e))
                    }, null, e, arguments.length)
                },
                append: function() {
                    return A(this, arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = T(this, e);
                            t.appendChild(e)
                        }
                    })
                },
                prepend: function() {
                    return A(this, arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = T(this, e);
                            t.insertBefore(e, t.firstChild)
                        }
                    })
                },
                before: function() {
                    return A(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                },
                after: function() {
                    return A(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                },
                empty: function() {
                    for (var e, t = 0; null != (e = this[t]); t++) {
                        for (1 === e.nodeType && pe.cleanData(h(e, !1)); e.firstChild; )
                            e.removeChild(e.firstChild);
                        e.options && pe.nodeName(e, "select") && (e.options.length = 0)
                    }
                    return this
                },
                clone: function(e, t) {
                    return e = null != e && e,
                    t = null == t ? e : t,
                    this.map(function() {
                        return pe.clone(this, e, t)
                    })
                },
                html: function(e) {
                    return Pe(this, function(e) {
                        var t = this[0] || {}
                          , n = 0
                          , r = this.length;
                        if (void 0 === e)
                            return 1 === t.nodeType ? t.innerHTML.replace(Ke, "") : void 0;
                        if ("string" == typeof e && !nt.test(e) && (de.htmlSerialize || !et.test(e)) && (de.leadingWhitespace || !Be.test(e)) && !Xe[(Re.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = pe.htmlPrefilter(e);
                            try {
                                for (; n < r; n++)
                                    t = this[n] || {},
                                    1 === t.nodeType && (pe.cleanData(h(t, !1)),
                                    t.innerHTML = e);
                                t = 0
                            } catch (e) {}
                        }
                        t && this.empty().append(e)
                    }, null, e, arguments.length)
                },
                replaceWith: function() {
                    var e = [];
                    return A(this, arguments, function(t) {
                        var n = this.parentNode;
                        pe.inArray(this, e) < 0 && (pe.cleanData(h(this)),
                        n && n.replaceChild(t, this))
                    }, e)
                }
            }),
            pe.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(e, t) {
                pe.fn[e] = function(e) {
                    for (var n, r = 0, i = [], o = pe(e), a = o.length - 1; r <= a; r++)
                        n = r === a ? this : this.clone(!0),
                        pe(o[r])[t](n),
                        ae.apply(i, n.get());
                    return this.pushStack(i)
                }
            });
            var lt, ut = {
                HTML: "block",
                BODY: "block"
            }, ct = /^margin/, dt = new RegExp("^(" + _e + ")(?!px)[a-z%]+$","i"), ft = function(e, t, n, r) {
                var i, o, a = {};
                for (o in t)
                    a[o] = e.style[o],
                    e.style[o] = t[o];
                i = n.apply(e, r || []);
                for (o in t)
                    e.style[o] = a[o];
                return i
            }, pt = re.documentElement;
            !function() {
                function t() {
                    var t, c, d = re.documentElement;
                    d.appendChild(l),
                    u.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                    n = i = s = !1,
                    r = a = !0,
                    e.getComputedStyle && (c = e.getComputedStyle(u),
                    n = "1%" !== (c || {}).top,
                    s = "2px" === (c || {}).marginLeft,
                    i = "4px" === (c || {
                        width: "4px"
                    }).width,
                    u.style.marginRight = "50%",
                    r = "4px" === (c || {
                        marginRight: "4px"
                    }).marginRight,
                    t = u.appendChild(re.createElement("div")),
                    t.style.cssText = u.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                    t.style.marginRight = t.style.width = "0",
                    u.style.width = "1px",
                    a = !parseFloat((e.getComputedStyle(t) || {}).marginRight),
                    u.removeChild(t)),
                    u.style.display = "none",
                    o = 0 === u.getClientRects().length,
                    o && (u.style.display = "",
                    u.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
                    u.childNodes[0].style.borderCollapse = "separate",
                    t = u.getElementsByTagName("td"),
                    t[0].style.cssText = "margin:0;border:0;padding:0;display:none",
                    o = 0 === t[0].offsetHeight,
                    o && (t[0].style.display = "",
                    t[1].style.display = "none",
                    o = 0 === t[0].offsetHeight)),
                    d.removeChild(l)
                }
                var n, r, i, o, a, s, l = re.createElement("div"), u = re.createElement("div");
                u.style && (u.style.cssText = "float:left;opacity:.5",
                de.opacity = "0.5" === u.style.opacity,
                de.cssFloat = !!u.style.cssFloat,
                u.style.backgroundClip = "content-box",
                u.cloneNode(!0).style.backgroundClip = "",
                de.clearCloneStyle = "content-box" === u.style.backgroundClip,
                l = re.createElement("div"),
                l.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
                u.innerHTML = "",
                l.appendChild(u),
                de.boxSizing = "" === u.style.boxSizing || "" === u.style.MozBoxSizing || "" === u.style.WebkitBoxSizing,
                pe.extend(de, {
                    reliableHiddenOffsets: function() {
                        return null == n && t(),
                        o
                    },
                    boxSizingReliable: function() {
                        return null == n && t(),
                        i
                    },
                    pixelMarginRight: function() {
                        return null == n && t(),
                        r
                    },
                    pixelPosition: function() {
                        return null == n && t(),
                        n
                    },
                    reliableMarginRight: function() {
                        return null == n && t(),
                        a
                    },
                    reliableMarginLeft: function() {
                        return null == n && t(),
                        s
                    }
                }))
            }();
            var ht, gt, mt = /^(top|right|bottom|left)$/;
            e.getComputedStyle ? (ht = function(t) {
                var n = t.ownerDocument.defaultView;
                return n && n.opener || (n = e),
                n.getComputedStyle(t)
            }
            ,
            gt = function(e, t, n) {
                var r, i, o, a, s = e.style;
                return n = n || ht(e),
                a = n ? n.getPropertyValue(t) || n[t] : void 0,
                "" !== a && void 0 !== a || pe.contains(e.ownerDocument, e) || (a = pe.style(e, t)),
                n && !de.pixelMarginRight() && dt.test(a) && ct.test(t) && (r = s.width,
                i = s.minWidth,
                o = s.maxWidth,
                s.minWidth = s.maxWidth = s.width = a,
                a = n.width,
                s.width = r,
                s.minWidth = i,
                s.maxWidth = o),
                void 0 === a ? a : a + ""
            }
            ) : pt.currentStyle && (ht = function(e) {
                return e.currentStyle
            }
            ,
            gt = function(e, t, n) {
                var r, i, o, a, s = e.style;
                return n = n || ht(e),
                a = n ? n[t] : void 0,
                null == a && s && s[t] && (a = s[t]),
                dt.test(a) && !mt.test(t) && (r = s.left,
                i = e.runtimeStyle,
                o = i && i.left,
                o && (i.left = e.currentStyle.left),
                s.left = "fontSize" === t ? "1em" : a,
                a = s.pixelLeft + "px",
                s.left = r,
                o && (i.left = o)),
                void 0 === a ? a : a + "" || "auto"
            }
            );
            var vt = /alpha\([^)]*\)/i
              , yt = /opacity\s*=\s*([^)]*)/i
              , bt = /^(none|table(?!-c[ea]).+)/
              , xt = new RegExp("^(" + _e + ")(.*)$","i")
              , wt = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }
              , Tt = {
                letterSpacing: "0",
                fontWeight: "400"
            }
              , kt = ["Webkit", "O", "Moz", "ms"]
              , St = re.createElement("div").style;
            pe.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) {
                                var n = gt(e, "opacity");
                                return "" === n ? "1" : n
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    float: de.cssFloat ? "cssFloat" : "styleFloat"
                },
                style: function(e, t, n, r) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var i, o, a, s = pe.camelCase(t), l = e.style;
                        if (t = pe.cssProps[s] || (pe.cssProps[s] = H(s) || s),
                        a = pe.cssHooks[t] || pe.cssHooks[s],
                        void 0 === n)
                            return a && "get"in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                        if (o = typeof n,
                        "string" === o && (i = Oe.exec(n)) && i[1] && (n = f(e, t, i),
                        o = "number"),
                        null != n && n === n && ("number" === o && (n += i && i[3] || (pe.cssNumber[s] ? "" : "px")),
                        de.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                        !(a && "set"in a && void 0 === (n = a.set(e, n, r)))))
                            try {
                                l[t] = n
                            } catch (e) {}
                    }
                },
                css: function(e, t, n, r) {
                    var i, o, a, s = pe.camelCase(t);
                    return t = pe.cssProps[s] || (pe.cssProps[s] = H(s) || s),
                    a = pe.cssHooks[t] || pe.cssHooks[s],
                    a && "get"in a && (o = a.get(e, !0, n)),
                    void 0 === o && (o = gt(e, t, r)),
                    "normal" === o && t in Tt && (o = Tt[t]),
                    "" === n || n ? (i = parseFloat(o),
                    n === !0 || isFinite(i) ? i || 0 : o) : o
                }
            }),
            pe.each(["height", "width"], function(e, t) {
                pe.cssHooks[t] = {
                    get: function(e, n, r) {
                        if (n)
                            return bt.test(pe.css(e, "display")) && 0 === e.offsetWidth ? ft(e, wt, function() {
                                return O(e, t, r)
                            }) : O(e, t, r)
                    },
                    set: function(e, n, r) {
                        var i = r && ht(e);
                        return L(e, n, r ? _(e, t, r, de.boxSizing && "border-box" === pe.css(e, "boxSizing", !1, i), i) : 0)
                    }
                }
            }),
            de.opacity || (pe.cssHooks.opacity = {
                get: function(e, t) {
                    return yt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
                },
                set: function(e, t) {
                    var n = e.style
                      , r = e.currentStyle
                      , i = pe.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : ""
                      , o = r && r.filter || n.filter || "";
                    n.zoom = 1,
                    (t >= 1 || "" === t) && "" === pe.trim(o.replace(vt, "")) && n.removeAttribute && (n.removeAttribute("filter"),
                    "" === t || r && !r.filter) || (n.filter = vt.test(o) ? o.replace(vt, i) : o + " " + i)
                }
            }),
            pe.cssHooks.marginRight = $(de.reliableMarginRight, function(e, t) {
                if (t)
                    return ft(e, {
                        display: "inline-block"
                    }, gt, [e, "marginRight"])
            }),
            pe.cssHooks.marginLeft = $(de.reliableMarginLeft, function(e, t) {
                if (t)
                    return (parseFloat(gt(e, "marginLeft")) || (pe.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - ft(e, {
                        marginLeft: 0
                    }, function() {
                        return e.getBoundingClientRect().left
                    }) : 0)) + "px"
            }),
            pe.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(e, t) {
                pe.cssHooks[e + t] = {
                    expand: function(n) {
                        for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++)
                            i[e + qe[r] + t] = o[r] || o[r - 2] || o[0];
                        return i
                    }
                },
                ct.test(e) || (pe.cssHooks[e + t].set = L)
            }),
            pe.fn.extend({
                css: function(e, t) {
                    return Pe(this, function(e, t, n) {
                        var r, i, o = {}, a = 0;
                        if (pe.isArray(t)) {
                            for (r = ht(e),
                            i = t.length; a < i; a++)
                                o[t[a]] = pe.css(e, t[a], !1, r);
                            return o
                        }
                        return void 0 !== n ? pe.style(e, t, n) : pe.css(e, t)
                    }, e, t, arguments.length > 1)
                },
                show: function() {
                    return M(this, !0)
                },
                hide: function() {
                    return M(this)
                },
                toggle: function(e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                        Fe(this) ? pe(this).show() : pe(this).hide()
                    })
                }
            }),
            pe.Tween = q,
            q.prototype = {
                constructor: q,
                init: function(e, t, n, r, i, o) {
                    this.elem = e,
                    this.prop = n,
                    this.easing = i || pe.easing._default,
                    this.options = t,
                    this.start = this.now = this.cur(),
                    this.end = r,
                    this.unit = o || (pe.cssNumber[n] ? "" : "px")
                },
                cur: function() {
                    var e = q.propHooks[this.prop];
                    return e && e.get ? e.get(this) : q.propHooks._default.get(this)
                },
                run: function(e) {
                    var t, n = q.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = pe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
                    this.now = (this.end - this.start) * t + this.start,
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    n && n.set ? n.set(this) : q.propHooks._default.set(this),
                    this
                }
            },
            q.prototype.init.prototype = q.prototype,
            q.propHooks = {
                _default: {
                    get: function(e) {
                        var t;
                        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = pe.css(e.elem, e.prop, ""),
                        t && "auto" !== t ? t : 0)
                    },
                    set: function(e) {
                        pe.fx.step[e.prop] ? pe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[pe.cssProps[e.prop]] && !pe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : pe.style(e.elem, e.prop, e.now + e.unit)
                    }
                }
            },
            q.propHooks.scrollTop = q.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            },
            pe.easing = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                _default: "swing"
            },
            pe.fx = q.prototype.init,
            pe.fx.step = {};
            var Ct, Et, At = /^(?:toggle|show|hide)$/, jt = /queueHooks$/;
            pe.Animation = pe.extend(B, {
                tweeners: {
                    "*": [function(e, t) {
                        var n = this.createTween(e, t);
                        return f(n.elem, e, Oe.exec(t), n),
                        n
                    }
                    ]
                },
                tweener: function(e, t) {
                    pe.isFunction(e) ? (t = e,
                    e = ["*"]) : e = e.match(Ne);
                    for (var n, r = 0, i = e.length; r < i; r++)
                        n = e[r],
                        B.tweeners[n] = B.tweeners[n] || [],
                        B.tweeners[n].unshift(t)
                },
                prefilters: [R],
                prefilter: function(e, t) {
                    t ? B.prefilters.unshift(e) : B.prefilters.push(e)
                }
            }),
            pe.speed = function(e, t, n) {
                var r = e && "object" == typeof e ? pe.extend({}, e) : {
                    complete: n || !n && t || pe.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !pe.isFunction(t) && t
                };
                return r.duration = pe.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in pe.fx.speeds ? pe.fx.speeds[r.duration] : pe.fx.speeds._default,
                null != r.queue && r.queue !== !0 || (r.queue = "fx"),
                r.old = r.complete,
                r.complete = function() {
                    pe.isFunction(r.old) && r.old.call(this),
                    r.queue && pe.dequeue(this, r.queue)
                }
                ,
                r
            }
            ,
            pe.fn.extend({
                fadeTo: function(e, t, n, r) {
                    return this.filter(Fe).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, r)
                },
                animate: function(e, t, n, r) {
                    var i = pe.isEmptyObject(e)
                      , o = pe.speed(t, n, r)
                      , a = function() {
                        var t = B(this, pe.extend({}, e), o);
                        (i || pe._data(this, "finish")) && t.stop(!0)
                    };
                    return a.finish = a,
                    i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
                },
                stop: function(e, t, n) {
                    var r = function(e) {
                        var t = e.stop;
                        delete e.stop,
                        t(n)
                    };
                    return "string" != typeof e && (n = t,
                    t = e,
                    e = void 0),
                    t && e !== !1 && this.queue(e || "fx", []),
                    this.each(function() {
                        var t = !0
                          , i = null != e && e + "queueHooks"
                          , o = pe.timers
                          , a = pe._data(this);
                        if (i)
                            a[i] && a[i].stop && r(a[i]);
                        else
                            for (i in a)
                                a[i] && a[i].stop && jt.test(i) && r(a[i]);
                        for (i = o.length; i--; )
                            o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n),
                            t = !1,
                            o.splice(i, 1));
                        !t && n || pe.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return e !== !1 && (e = e || "fx"),
                    this.each(function() {
                        var t, n = pe._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = pe.timers, a = r ? r.length : 0;
                        for (n.finish = !0,
                        pe.queue(this, e, []),
                        i && i.stop && i.stop.call(this, !0),
                        t = o.length; t--; )
                            o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0),
                            o.splice(t, 1));
                        for (t = 0; t < a; t++)
                            r[t] && r[t].finish && r[t].finish.call(this);
                        delete n.finish
                    })
                }
            }),
            pe.each(["toggle", "show", "hide"], function(e, t) {
                var n = pe.fn[t];
                pe.fn[t] = function(e, r, i) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(P(t, !0), e, r, i)
                }
            }),
            pe.each({
                slideDown: P("show"),
                slideUp: P("hide"),
                slideToggle: P("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                pe.fn[e] = function(e, n, r) {
                    return this.animate(t, e, n, r)
                }
            }),
            pe.timers = [],
            pe.fx.tick = function() {
                var e, t = pe.timers, n = 0;
                for (Ct = pe.now(); n < t.length; n++)
                    e = t[n],
                    e() || t[n] !== e || t.splice(n--, 1);
                t.length || pe.fx.stop(),
                Ct = void 0
            }
            ,
            pe.fx.timer = function(e) {
                pe.timers.push(e),
                e() ? pe.fx.start() : pe.timers.pop()
            }
            ,
            pe.fx.interval = 13,
            pe.fx.start = function() {
                Et || (Et = e.setInterval(pe.fx.tick, pe.fx.interval))
            }
            ,
            pe.fx.stop = function() {
                e.clearInterval(Et),
                Et = null
            }
            ,
            pe.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            },
            pe.fn.delay = function(t, n) {
                return t = pe.fx ? pe.fx.speeds[t] || t : t,
                n = n || "fx",
                this.queue(n, function(n, r) {
                    var i = e.setTimeout(n, t);
                    r.stop = function() {
                        e.clearTimeout(i)
                    }
                })
            }
            ,
            function() {
                var e, t = re.createElement("input"), n = re.createElement("div"), r = re.createElement("select"), i = r.appendChild(re.createElement("option"));
                n = re.createElement("div"),
                n.setAttribute("className", "t"),
                n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                e = n.getElementsByTagName("a")[0],
                t.setAttribute("type", "checkbox"),
                n.appendChild(t),
                e = n.getElementsByTagName("a")[0],
                e.style.cssText = "top:1px",
                de.getSetAttribute = "t" !== n.className,
                de.style = /top/.test(e.getAttribute("style")),
                de.hrefNormalized = "/a" === e.getAttribute("href"),
                de.checkOn = !!t.value,
                de.optSelected = i.selected,
                de.enctype = !!re.createElement("form").enctype,
                r.disabled = !0,
                de.optDisabled = !i.disabled,
                t = re.createElement("input"),
                t.setAttribute("value", ""),
                de.input = "" === t.getAttribute("value"),
                t.value = "t",
                t.setAttribute("type", "radio"),
                de.radioValue = "t" === t.value
            }();
            var Nt = /\r/g
              , Dt = /[\x20\t\r\n\f]+/g;
            pe.fn.extend({
                val: function(e) {
                    var t, n, r, i = this[0];
                    {
                        if (arguments.length)
                            return r = pe.isFunction(e),
                            this.each(function(n) {
                                var i;
                                1 === this.nodeType && (i = r ? e.call(this, n, pe(this).val()) : e,
                                null == i ? i = "" : "number" == typeof i ? i += "" : pe.isArray(i) && (i = pe.map(i, function(e) {
                                    return null == e ? "" : e + ""
                                })),
                                t = pe.valHooks[this.type] || pe.valHooks[this.nodeName.toLowerCase()],
                                t && "set"in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                            });
                        if (i)
                            return t = pe.valHooks[i.type] || pe.valHooks[i.nodeName.toLowerCase()],
                            t && "get"in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value,
                            "string" == typeof n ? n.replace(Nt, "") : null == n ? "" : n)
                    }
                }
            }),
            pe.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var t = pe.find.attr(e, "value");
                            return null != t ? t : pe.trim(pe.text(e)).replace(Dt, " ")
                        }
                    },
                    select: {
                        get: function(e) {
                            for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || i < 0, a = o ? null : [], s = o ? i + 1 : r.length, l = i < 0 ? s : o ? i : 0; l < s; l++)
                                if (n = r[l],
                                (n.selected || l === i) && (de.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !pe.nodeName(n.parentNode, "optgroup"))) {
                                    if (t = pe(n).val(),
                                    o)
                                        return t;
                                    a.push(t)
                                }
                            return a
                        },
                        set: function(e, t) {
                            for (var n, r, i = e.options, o = pe.makeArray(t), a = i.length; a--; )
                                if (r = i[a],
                                pe.inArray(pe.valHooks.option.get(r), o) > -1)
                                    try {
                                        r.selected = n = !0
                                    } catch (e) {
                                        r.scrollHeight
                                    }
                                else
                                    r.selected = !1;
                            return n || (e.selectedIndex = -1),
                            i
                        }
                    }
                }
            }),
            pe.each(["radio", "checkbox"], function() {
                pe.valHooks[this] = {
                    set: function(e, t) {
                        if (pe.isArray(t))
                            return e.checked = pe.inArray(pe(e).val(), t) > -1
                    }
                },
                de.checkOn || (pe.valHooks[this].get = function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                }
                )
            });
            var $t, Ht, Mt = pe.expr.attrHandle, Lt = /^(?:checked|selected)$/i, _t = de.getSetAttribute, Ot = de.input;
            pe.fn.extend({
                attr: function(e, t) {
                    return Pe(this, pe.attr, e, t, arguments.length > 1)
                },
                removeAttr: function(e) {
                    return this.each(function() {
                        pe.removeAttr(this, e)
                    })
                }
            }),
            pe.extend({
                attr: function(e, t, n) {
                    var r, i, o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o)
                        return "undefined" == typeof e.getAttribute ? pe.prop(e, t, n) : (1 === o && pe.isXMLDoc(e) || (t = t.toLowerCase(),
                        i = pe.attrHooks[t] || (pe.expr.match.bool.test(t) ? Ht : $t)),
                        void 0 !== n ? null === n ? void pe.removeAttr(e, t) : i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                        n) : i && "get"in i && null !== (r = i.get(e, t)) ? r : (r = pe.find.attr(e, t),
                        null == r ? void 0 : r))
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            if (!de.radioValue && "radio" === t && pe.nodeName(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t),
                                n && (e.value = n),
                                t
                            }
                        }
                    }
                },
                removeAttr: function(e, t) {
                    var n, r, i = 0, o = t && t.match(Ne);
                    if (o && 1 === e.nodeType)
                        for (; n = o[i++]; )
                            r = pe.propFix[n] || n,
                            pe.expr.match.bool.test(n) ? Ot && _t || !Lt.test(n) ? e[r] = !1 : e[pe.camelCase("default-" + n)] = e[r] = !1 : pe.attr(e, n, ""),
                            e.removeAttribute(_t ? n : r)
                }
            }),
            Ht = {
                set: function(e, t, n) {
                    return t === !1 ? pe.removeAttr(e, n) : Ot && _t || !Lt.test(n) ? e.setAttribute(!_t && pe.propFix[n] || n, n) : e[pe.camelCase("default-" + n)] = e[n] = !0,
                    n
                }
            },
            pe.each(pe.expr.match.bool.source.match(/\w+/g), function(e, t) {
                var n = Mt[t] || pe.find.attr;
                Ot && _t || !Lt.test(t) ? Mt[t] = function(e, t, r) {
                    var i, o;
                    return r || (o = Mt[t],
                    Mt[t] = i,
                    i = null != n(e, t, r) ? t.toLowerCase() : null,
                    Mt[t] = o),
                    i
                }
                : Mt[t] = function(e, t, n) {
                    if (!n)
                        return e[pe.camelCase("default-" + t)] ? t.toLowerCase() : null
                }
            }),
            Ot && _t || (pe.attrHooks.value = {
                set: function(e, t, n) {
                    return pe.nodeName(e, "input") ? void (e.defaultValue = t) : $t && $t.set(e, t, n)
                }
            }),
            _t || ($t = {
                set: function(e, t, n) {
                    var r = e.getAttributeNode(n);
                    if (r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)),
                    r.value = t += "",
                    "value" === n || t === e.getAttribute(n))
                        return t
                }
            },
            Mt.id = Mt.name = Mt.coords = function(e, t, n) {
                var r;
                if (!n)
                    return (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
            }
            ,
            pe.valHooks.button = {
                get: function(e, t) {
                    var n = e.getAttributeNode(t);
                    if (n && n.specified)
                        return n.value
                },
                set: $t.set
            },
            pe.attrHooks.contenteditable = {
                set: function(e, t, n) {
                    $t.set(e, "" !== t && t, n)
                }
            },
            pe.each(["width", "height"], function(e, t) {
                pe.attrHooks[t] = {
                    set: function(e, n) {
                        if ("" === n)
                            return e.setAttribute(t, "auto"),
                            n
                    }
                }
            })),
            de.style || (pe.attrHooks.style = {
                get: function(e) {
                    return e.style.cssText || void 0
                },
                set: function(e, t) {
                    return e.style.cssText = t + ""
                }
            });
            var qt = /^(?:input|select|textarea|button|object)$/i
              , Ft = /^(?:a|area)$/i;
            pe.fn.extend({
                prop: function(e, t) {
                    return Pe(this, pe.prop, e, t, arguments.length > 1)
                },
                removeProp: function(e) {
                    return e = pe.propFix[e] || e,
                    this.each(function() {
                        try {
                            this[e] = void 0,
                            delete this[e]
                        } catch (e) {}
                    })
                }
            }),
            pe.extend({
                prop: function(e, t, n) {
                    var r, i, o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o)
                        return 1 === o && pe.isXMLDoc(e) || (t = pe.propFix[t] || t,
                        i = pe.propHooks[t]),
                        void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var t = pe.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : qt.test(e.nodeName) || Ft.test(e.nodeName) && e.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }),
            de.hrefNormalized || pe.each(["href", "src"], function(e, t) {
                pe.propHooks[t] = {
                    get: function(e) {
                        return e.getAttribute(t, 4)
                    }
                }
            }),
            de.optSelected || (pe.propHooks.selected = {
                get: function(e) {
                    var t = e.parentNode;
                    return t && (t.selectedIndex,
                    t.parentNode && t.parentNode.selectedIndex),
                    null
                },
                set: function(e) {
                    var t = e.parentNode;
                    t && (t.selectedIndex,
                    t.parentNode && t.parentNode.selectedIndex)
                }
            }),
            pe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                pe.propFix[this.toLowerCase()] = this
            }),
            de.enctype || (pe.propFix.enctype = "encoding");
            var Pt = /[\t\r\n\f]/g;
            pe.fn.extend({
                addClass: function(e) {
                    var t, n, r, i, o, a, s, l = 0;
                    if (pe.isFunction(e))
                        return this.each(function(t) {
                            pe(this).addClass(e.call(this, t, W(this)))
                        });
                    if ("string" == typeof e && e)
                        for (t = e.match(Ne) || []; n = this[l++]; )
                            if (i = W(n),
                            r = 1 === n.nodeType && (" " + i + " ").replace(Pt, " ")) {
                                for (a = 0; o = t[a++]; )
                                    r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                                s = pe.trim(r),
                                i !== s && pe.attr(n, "class", s)
                            }
                    return this
                },
                removeClass: function(e) {
                    var t, n, r, i, o, a, s, l = 0;
                    if (pe.isFunction(e))
                        return this.each(function(t) {
                            pe(this).removeClass(e.call(this, t, W(this)))
                        });
                    if (!arguments.length)
                        return this.attr("class", "");
                    if ("string" == typeof e && e)
                        for (t = e.match(Ne) || []; n = this[l++]; )
                            if (i = W(n),
                            r = 1 === n.nodeType && (" " + i + " ").replace(Pt, " ")) {
                                for (a = 0; o = t[a++]; )
                                    for (; r.indexOf(" " + o + " ") > -1; )
                                        r = r.replace(" " + o + " ", " ");
                                s = pe.trim(r),
                                i !== s && pe.attr(n, "class", s)
                            }
                    return this
                },
                toggleClass: function(e, t) {
                    var n = typeof e;
                    return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : pe.isFunction(e) ? this.each(function(n) {
                        pe(this).toggleClass(e.call(this, n, W(this), t), t)
                    }) : this.each(function() {
                        var t, r, i, o;
                        if ("string" === n)
                            for (r = 0,
                            i = pe(this),
                            o = e.match(Ne) || []; t = o[r++]; )
                                i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                        else
                            void 0 !== e && "boolean" !== n || (t = W(this),
                            t && pe._data(this, "__className__", t),
                            pe.attr(this, "class", t || e === !1 ? "" : pe._data(this, "__className__") || ""))
                    })
                },
                hasClass: function(e) {
                    var t, n, r = 0;
                    for (t = " " + e + " "; n = this[r++]; )
                        if (1 === n.nodeType && (" " + W(n) + " ").replace(Pt, " ").indexOf(t) > -1)
                            return !0;
                    return !1
                }
            }),
            pe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
                pe.fn[t] = function(e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                }
            }),
            pe.fn.extend({
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                }
            });
            var It = e.location
              , Rt = pe.now()
              , zt = /\?/
              , Bt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
            pe.parseJSON = function(t) {
                if (e.JSON && e.JSON.parse)
                    return e.JSON.parse(t + "");
                var n, r = null, i = pe.trim(t + "");
                return i && !pe.trim(i.replace(Bt, function(e, t, i, o) {
                    return n && t && (r = 0),
                    0 === r ? e : (n = i || t,
                    r += !o - !i,
                    "")
                })) ? Function("return " + i)() : pe.error("Invalid JSON: " + t)
            }
            ,
            pe.parseXML = function(t) {
                var n, r;
                if (!t || "string" != typeof t)
                    return null;
                try {
                    e.DOMParser ? (r = new e.DOMParser,
                    n = r.parseFromString(t, "text/xml")) : (n = new e.ActiveXObject("Microsoft.XMLDOM"),
                    n.async = "false",
                    n.loadXML(t))
                } catch (e) {
                    n = void 0
                }
                return n && n.documentElement && !n.getElementsByTagName("parsererror").length || pe.error("Invalid XML: " + t),
                n
            }
            ;
            var Wt = /#.*$/
              , Xt = /([?&])_=[^&]*/
              , Vt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm
              , Ut = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
              , Yt = /^(?:GET|HEAD)$/
              , Zt = /^\/\//
              , Jt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/
              , Gt = {}
              , Qt = {}
              , Kt = "*/".concat("*")
              , en = It.href
              , tn = Jt.exec(en.toLowerCase()) || [];
            pe.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: en,
                    type: "GET",
                    isLocal: Ut.test(tn[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Kt,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": pe.parseJSON,
                        "text xml": pe.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, t) {
                    return t ? U(U(e, pe.ajaxSettings), t) : U(pe.ajaxSettings, e)
                },
                ajaxPrefilter: X(Gt),
                ajaxTransport: X(Qt),
                ajax: function(t, n) {
                    function r(t, n, r, i) {
                        var o, d, y, b, w, k = n;
                        2 !== x && (x = 2,
                        l && e.clearTimeout(l),
                        c = void 0,
                        s = i || "",
                        T.readyState = t > 0 ? 4 : 0,
                        o = t >= 200 && t < 300 || 304 === t,
                        r && (b = Y(f, T, r)),
                        b = Z(f, b, T, o),
                        o ? (f.ifModified && (w = T.getResponseHeader("Last-Modified"),
                        w && (pe.lastModified[a] = w),
                        w = T.getResponseHeader("etag"),
                        w && (pe.etag[a] = w)),
                        204 === t || "HEAD" === f.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = b.state,
                        d = b.data,
                        y = b.error,
                        o = !y)) : (y = k,
                        !t && k || (k = "error",
                        t < 0 && (t = 0))),
                        T.status = t,
                        T.statusText = (n || k) + "",
                        o ? g.resolveWith(p, [d, k, T]) : g.rejectWith(p, [T, k, y]),
                        T.statusCode(v),
                        v = void 0,
                        u && h.trigger(o ? "ajaxSuccess" : "ajaxError", [T, f, o ? d : y]),
                        m.fireWith(p, [T, k]),
                        u && (h.trigger("ajaxComplete", [T, f]),
                        --pe.active || pe.event.trigger("ajaxStop")))
                    }
                    "object" == typeof t && (n = t,
                    t = void 0),
                    n = n || {};
                    var i, o, a, s, l, u, c, d, f = pe.ajaxSetup({}, n), p = f.context || f, h = f.context && (p.nodeType || p.jquery) ? pe(p) : pe.event, g = pe.Deferred(), m = pe.Callbacks("once memory"), v = f.statusCode || {}, y = {}, b = {}, x = 0, w = "canceled", T = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === x) {
                                if (!d)
                                    for (d = {}; t = Vt.exec(s); )
                                        d[t[1].toLowerCase()] = t[2];
                                t = d[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return 2 === x ? s : null
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return x || (e = b[n] = b[n] || e,
                            y[e] = t),
                            this
                        },
                        overrideMimeType: function(e) {
                            return x || (f.mimeType = e),
                            this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (x < 2)
                                    for (t in e)
                                        v[t] = [v[t], e[t]];
                                else
                                    T.always(e[T.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || w;
                            return c && c.abort(t),
                            r(0, t),
                            this
                        }
                    };
                    if (g.promise(T).complete = m.add,
                    T.success = T.done,
                    T.error = T.fail,
                    f.url = ((t || f.url || en) + "").replace(Wt, "").replace(Zt, tn[1] + "//"),
                    f.type = n.method || n.type || f.method || f.type,
                    f.dataTypes = pe.trim(f.dataType || "*").toLowerCase().match(Ne) || [""],
                    null == f.crossDomain && (i = Jt.exec(f.url.toLowerCase()),
                    f.crossDomain = !(!i || i[1] === tn[1] && i[2] === tn[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (tn[3] || ("http:" === tn[1] ? "80" : "443")))),
                    f.data && f.processData && "string" != typeof f.data && (f.data = pe.param(f.data, f.traditional)),
                    V(Gt, f, n, T),
                    2 === x)
                        return T;
                    u = pe.event && f.global,
                    u && 0 === pe.active++ && pe.event.trigger("ajaxStart"),
                    f.type = f.type.toUpperCase(),
                    f.hasContent = !Yt.test(f.type),
                    a = f.url,
                    f.hasContent || (f.data && (a = f.url += (zt.test(a) ? "&" : "?") + f.data,
                    delete f.data),
                    f.cache === !1 && (f.url = Xt.test(a) ? a.replace(Xt, "$1_=" + Rt++) : a + (zt.test(a) ? "&" : "?") + "_=" + Rt++)),
                    f.ifModified && (pe.lastModified[a] && T.setRequestHeader("If-Modified-Since", pe.lastModified[a]),
                    pe.etag[a] && T.setRequestHeader("If-None-Match", pe.etag[a])),
                    (f.data && f.hasContent && f.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", f.contentType),
                    T.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Kt + "; q=0.01" : "") : f.accepts["*"]);
                    for (o in f.headers)
                        T.setRequestHeader(o, f.headers[o]);
                    if (f.beforeSend && (f.beforeSend.call(p, T, f) === !1 || 2 === x))
                        return T.abort();
                    w = "abort";
                    for (o in {
                        success: 1,
                        error: 1,
                        complete: 1
                    })
                        T[o](f[o]);
                    if (c = V(Qt, f, n, T)) {
                        if (T.readyState = 1,
                        u && h.trigger("ajaxSend", [T, f]),
                        2 === x)
                            return T;
                        f.async && f.timeout > 0 && (l = e.setTimeout(function() {
                            T.abort("timeout")
                        }, f.timeout));
                        try {
                            x = 1,
                            c.send(y, r)
                        } catch (e) {
                            if (!(x < 2))
                                throw e;
                            r(-1, e)
                        }
                    } else
                        r(-1, "No Transport");
                    return T
                },
                getJSON: function(e, t, n) {
                    return pe.get(e, t, n, "json")
                },
                getScript: function(e, t) {
                    return pe.get(e, void 0, t, "script")
                }
            }),
            pe.each(["get", "post"], function(e, t) {
                pe[t] = function(e, n, r, i) {
                    return pe.isFunction(n) && (i = i || r,
                    r = n,
                    n = void 0),
                    pe.ajax(pe.extend({
                        url: e,
                        type: t,
                        dataType: i,
                        data: n,
                        success: r
                    }, pe.isPlainObject(e) && e))
                }
            }),
            pe._evalUrl = function(e) {
                return pe.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    throws: !0
                })
            }
            ,
            pe.fn.extend({
                wrapAll: function(e) {
                    if (pe.isFunction(e))
                        return this.each(function(t) {
                            pe(this).wrapAll(e.call(this, t))
                        });
                    if (this[0]) {
                        var t = pe(e, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && t.insertBefore(this[0]),
                        t.map(function() {
                            for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; )
                                e = e.firstChild;
                            return e
                        }).append(this)
                    }
                    return this
                },
                wrapInner: function(e) {
                    return pe.isFunction(e) ? this.each(function(t) {
                        pe(this).wrapInner(e.call(this, t))
                    }) : this.each(function() {
                        var t = pe(this)
                          , n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e)
                    })
                },
                wrap: function(e) {
                    var t = pe.isFunction(e);
                    return this.each(function(n) {
                        pe(this).wrapAll(t ? e.call(this, n) : e)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        pe.nodeName(this, "body") || pe(this).replaceWith(this.childNodes)
                    }).end()
                }
            }),
            pe.expr.filters.hidden = function(e) {
                return de.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : G(e)
            }
            ,
            pe.expr.filters.visible = function(e) {
                return !pe.expr.filters.hidden(e)
            }
            ;
            var nn = /%20/g
              , rn = /\[\]$/
              , on = /\r?\n/g
              , an = /^(?:submit|button|image|reset|file)$/i
              , sn = /^(?:input|select|textarea|keygen)/i;
            pe.param = function(e, t) {
                var n, r = [], i = function(e, t) {
                    t = pe.isFunction(t) ? t() : null == t ? "" : t,
                    r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
                if (void 0 === t && (t = pe.ajaxSettings && pe.ajaxSettings.traditional),
                pe.isArray(e) || e.jquery && !pe.isPlainObject(e))
                    pe.each(e, function() {
                        i(this.name, this.value)
                    });
                else
                    for (n in e)
                        Q(n, e[n], t, i);
                return r.join("&").replace(nn, "+")
            }
            ,
            pe.fn.extend({
                serialize: function() {
                    return pe.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var e = pe.prop(this, "elements");
                        return e ? pe.makeArray(e) : this
                    }).filter(function() {
                        var e = this.type;
                        return this.name && !pe(this).is(":disabled") && sn.test(this.nodeName) && !an.test(e) && (this.checked || !Ie.test(e))
                    }).map(function(e, t) {
                        var n = pe(this).val();
                        return null == n ? null : pe.isArray(n) ? pe.map(n, function(e) {
                            return {
                                name: t.name,
                                value: e.replace(on, "\r\n")
                            }
                        }) : {
                            name: t.name,
                            value: n.replace(on, "\r\n")
                        }
                    }).get()
                }
            }),
            pe.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
                return this.isLocal ? ee() : re.documentMode > 8 ? K() : /^(get|post|head|put|delete|options)$/i.test(this.type) && K() || ee()
            }
            : K;
            var ln = 0
              , un = {}
              , cn = pe.ajaxSettings.xhr();
            e.attachEvent && e.attachEvent("onunload", function() {
                for (var e in un)
                    un[e](void 0, !0)
            }),
            de.cors = !!cn && "withCredentials"in cn,
            cn = de.ajax = !!cn,
            cn && pe.ajaxTransport(function(t) {
                if (!t.crossDomain || de.cors) {
                    var n;
                    return {
                        send: function(r, i) {
                            var o, a = t.xhr(), s = ++ln;
                            if (a.open(t.type, t.url, t.async, t.username, t.password),
                            t.xhrFields)
                                for (o in t.xhrFields)
                                    a[o] = t.xhrFields[o];
                            t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType),
                            t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                            for (o in r)
                                void 0 !== r[o] && a.setRequestHeader(o, r[o] + "");
                            a.send(t.hasContent && t.data || null),
                            n = function(e, r) {
                                var o, l, u;
                                if (n && (r || 4 === a.readyState))
                                    if (delete un[s],
                                    n = void 0,
                                    a.onreadystatechange = pe.noop,
                                    r)
                                        4 !== a.readyState && a.abort();
                                    else {
                                        u = {},
                                        o = a.status,
                                        "string" == typeof a.responseText && (u.text = a.responseText);
                                        try {
                                            l = a.statusText
                                        } catch (e) {
                                            l = ""
                                        }
                                        o || !t.isLocal || t.crossDomain ? 1223 === o && (o = 204) : o = u.text ? 200 : 404
                                    }
                                u && i(o, l, u, a.getAllResponseHeaders())
                            }
                            ,
                            t.async ? 4 === a.readyState ? e.setTimeout(n) : a.onreadystatechange = un[s] = n : n()
                        },
                        abort: function() {
                            n && n(void 0, !0)
                        }
                    }
                }
            }),
            pe.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(e) {
                        return pe.globalEval(e),
                        e
                    }
                }
            }),
            pe.ajaxPrefilter("script", function(e) {
                void 0 === e.cache && (e.cache = !1),
                e.crossDomain && (e.type = "GET",
                e.global = !1)
            }),
            pe.ajaxTransport("script", function(e) {
                if (e.crossDomain) {
                    var t, n = re.head || pe("head")[0] || re.documentElement;
                    return {
                        send: function(r, i) {
                            t = re.createElement("script"),
                            t.async = !0,
                            e.scriptCharset && (t.charset = e.scriptCharset),
                            t.src = e.url,
                            t.onload = t.onreadystatechange = function(e, n) {
                                (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null,
                                t.parentNode && t.parentNode.removeChild(t),
                                t = null,
                                n || i(200, "success"))
                            }
                            ,
                            n.insertBefore(t, n.firstChild)
                        },
                        abort: function() {
                            t && t.onload(void 0, !0)
                        }
                    }
                }
            });
            var dn = []
              , fn = /(=)\?(?=&|$)|\?\?/;
            pe.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = dn.pop() || pe.expando + "_" + Rt++;
                    return this[e] = !0,
                    e
                }
            }),
            pe.ajaxPrefilter("json jsonp", function(t, n, r) {
                var i, o, a, s = t.jsonp !== !1 && (fn.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && fn.test(t.data) && "data");
                if (s || "jsonp" === t.dataTypes[0])
                    return i = t.jsonpCallback = pe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
                    s ? t[s] = t[s].replace(fn, "$1" + i) : t.jsonp !== !1 && (t.url += (zt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
                    t.converters["script json"] = function() {
                        return a || pe.error(i + " was not called"),
                        a[0]
                    }
                    ,
                    t.dataTypes[0] = "json",
                    o = e[i],
                    e[i] = function() {
                        a = arguments
                    }
                    ,
                    r.always(function() {
                        void 0 === o ? pe(e).removeProp(i) : e[i] = o,
                        t[i] && (t.jsonpCallback = n.jsonpCallback,
                        dn.push(i)),
                        a && pe.isFunction(o) && o(a[0]),
                        a = o = void 0
                    }),
                    "script"
            }),
            pe.parseHTML = function(e, t, n) {
                if (!e || "string" != typeof e)
                    return null;
                "boolean" == typeof t && (n = t,
                t = !1),
                t = t || re;
                var r = Te.exec(e)
                  , i = !n && [];
                return r ? [t.createElement(r[1])] : (r = v([e], t, i),
                i && i.length && pe(i).remove(),
                pe.merge([], r.childNodes))
            }
            ;
            var pn = pe.fn.load;
            pe.fn.load = function(e, t, n) {
                if ("string" != typeof e && pn)
                    return pn.apply(this, arguments);
                var r, i, o, a = this, s = e.indexOf(" ");
                return s > -1 && (r = pe.trim(e.slice(s, e.length)),
                e = e.slice(0, s)),
                pe.isFunction(t) ? (n = t,
                t = void 0) : t && "object" == typeof t && (i = "POST"),
                a.length > 0 && pe.ajax({
                    url: e,
                    type: i || "GET",
                    dataType: "html",
                    data: t
                }).done(function(e) {
                    o = arguments,
                    a.html(r ? pe("<div>").append(pe.parseHTML(e)).find(r) : e)
                }).always(n && function(e, t) {
                    a.each(function() {
                        n.apply(this, o || [e.responseText, t, e])
                    })
                }
                ),
                this
            }
            ,
            pe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
                pe.fn[t] = function(e) {
                    return this.on(t, e)
                }
            }),
            pe.expr.filters.animated = function(e) {
                return pe.grep(pe.timers, function(t) {
                    return e === t.elem
                }).length
            }
            ,
            pe.offset = {
                setOffset: function(e, t, n) {
                    var r, i, o, a, s, l, u, c = pe.css(e, "position"), d = pe(e), f = {};
                    "static" === c && (e.style.position = "relative"),
                    s = d.offset(),
                    o = pe.css(e, "top"),
                    l = pe.css(e, "left"),
                    u = ("absolute" === c || "fixed" === c) && pe.inArray("auto", [o, l]) > -1,
                    u ? (r = d.position(),
                    a = r.top,
                    i = r.left) : (a = parseFloat(o) || 0,
                    i = parseFloat(l) || 0),
                    pe.isFunction(t) && (t = t.call(e, n, pe.extend({}, s))),
                    null != t.top && (f.top = t.top - s.top + a),
                    null != t.left && (f.left = t.left - s.left + i),
                    "using"in t ? t.using.call(e, f) : d.css(f)
                }
            },
            pe.fn.extend({
                offset: function(e) {
                    if (arguments.length)
                        return void 0 === e ? this : this.each(function(t) {
                            pe.offset.setOffset(this, e, t)
                        });
                    var t, n, r = {
                        top: 0,
                        left: 0
                    }, i = this[0], o = i && i.ownerDocument;
                    if (o)
                        return t = o.documentElement,
                        pe.contains(t, i) ? ("undefined" != typeof i.getBoundingClientRect && (r = i.getBoundingClientRect()),
                        n = te(o),
                        {
                            top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                            left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                        }) : r
                },
                position: function() {
                    if (this[0]) {
                        var e, t, n = {
                            top: 0,
                            left: 0
                        }, r = this[0];
                        return "fixed" === pe.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(),
                        t = this.offset(),
                        pe.nodeName(e[0], "html") || (n = e.offset()),
                        n.top += pe.css(e[0], "borderTopWidth", !0),
                        n.left += pe.css(e[0], "borderLeftWidth", !0)),
                        {
                            top: t.top - n.top - pe.css(r, "marginTop", !0),
                            left: t.left - n.left - pe.css(r, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var e = this.offsetParent; e && !pe.nodeName(e, "html") && "static" === pe.css(e, "position"); )
                            e = e.offsetParent;
                        return e || pt
                    })
                }
            }),
            pe.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(e, t) {
                var n = /Y/.test(t);
                pe.fn[e] = function(r) {
                    return Pe(this, function(e, r, i) {
                        var o = te(e);
                        return void 0 === i ? o ? t in o ? o[t] : o.document.documentElement[r] : e[r] : void (o ? o.scrollTo(n ? pe(o).scrollLeft() : i, n ? i : pe(o).scrollTop()) : e[r] = i)
                    }, e, r, arguments.length, null)
                }
            }),
            pe.each(["top", "left"], function(e, t) {
                pe.cssHooks[t] = $(de.pixelPosition, function(e, n) {
                    if (n)
                        return n = gt(e, t),
                        dt.test(n) ? pe(e).position()[t] + "px" : n
                })
            }),
            pe.each({
                Height: "height",
                Width: "width"
            }, function(e, t) {
                pe.each({
                    padding: "inner" + e,
                    content: t,
                    "": "outer" + e
                }, function(n, r) {
                    pe.fn[r] = function(r, i) {
                        var o = arguments.length && (n || "boolean" != typeof r)
                          , a = n || (r === !0 || i === !0 ? "margin" : "border");
                        return Pe(this, function(t, n, r) {
                            var i;
                            return pe.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement,
                            Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? pe.css(t, n, a) : pe.style(t, n, r, a)
                        }, t, o ? r : void 0, o, null)
                    }
                })
            }),
            pe.fn.extend({
                bind: function(e, t, n) {
                    return this.on(e, null, t, n)
                },
                unbind: function(e, t) {
                    return this.off(e, null, t)
                },
                delegate: function(e, t, n, r) {
                    return this.on(t, e, n, r)
                },
                undelegate: function(e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                }
            }),
            pe.fn.size = function() {
                return this.length
            }
            ,
            pe.fn.andSelf = pe.fn.addBack,
            "function" == typeof define && define.amd && define("jquery", [], function() {
                return pe
            });
            var hn = e.jQuery
              , gn = e.$;
            return pe.noConflict = function(t) {
                return e.$ === pe && (e.$ = gn),
                t && e.jQuery === pe && (e.jQuery = hn),
                pe
            }
            ,
            t || (e.jQuery = e.$ = pe),
            pe
        })
    }
    , {}],
    skel: [function(e, t, n) {
        var r = function() {
            "use strict";
            var e = {
                breakpointIds: null,
                events: {},
                isInit: !1,
                obj: {
                    attachments: {},
                    breakpoints: {},
                    head: null,
                    states: {}
                },
                sd: "/",
                state: null,
                stateHandlers: {},
                stateId: "",
                vars: {},
                DOMReady: null,
                indexOf: null,
                isArray: null,
                iterate: null,
                matchesMedia: null,
                extend: function(t, n) {
                    e.iterate(n, function(r) {
                        e.isArray(n[r]) ? (e.isArray(t[r]) || (t[r] = []),
                        e.extend(t[r], n[r])) : "object" == typeof n[r] ? ("object" != typeof t[r] && (t[r] = {}),
                        e.extend(t[r], n[r])) : t[r] = n[r]
                    })
                },
                newStyle: function(e) {
                    var t = document.createElement("style");
                    return t.type = "text/css",
                    t.innerHTML = e,
                    t
                },
                _canUse: null,
                canUse: function(t) {
                    e._canUse || (e._canUse = document.createElement("div"));
                    var n = e._canUse.style
                      , r = t.charAt(0).toUpperCase() + t.slice(1);
                    return t in n || "Moz" + r in n || "Webkit" + r in n || "O" + r in n || "ms" + r in n
                },
                on: function(t, n) {
                    var r = t.split(/[\s]+/);
                    return e.iterate(r, function(t) {
                        var i = r[t];
                        if (e.isInit) {
                            if ("init" == i)
                                return void n();
                            if ("change" == i)
                                n();
                            else {
                                var o = i.charAt(0);
                                if ("+" == o || "!" == o) {
                                    var a = i.substring(1);
                                    if (a in e.obj.breakpoints)
                                        if ("+" == o && e.obj.breakpoints[a].active)
                                            n();
                                        else if ("!" == o && !e.obj.breakpoints[a].active)
                                            return void n()
                                }
                            }
                        }
                        e.events[i] || (e.events[i] = []),
                        e.events[i].push(n)
                    }),
                    e
                },
                trigger: function(t) {
                    if (e.events[t] && 0 != e.events[t].length)
                        return e.iterate(e.events[t], function(n) {
                            e.events[t][n]()
                        }),
                        e
                },
                breakpoint: function(t) {
                    return e.obj.breakpoints[t]
                },
                breakpoints: function(t) {
                    function n(e, t) {
                        this.name = this.id = e,
                        this.media = t,
                        this.active = !1,
                        this.wasActive = !1
                    }
                    return n.prototype.matches = function() {
                        return e.matchesMedia(this.media)
                    }
                    ,
                    n.prototype.sync = function() {
                        this.wasActive = this.active,
                        this.active = this.matches()
                    }
                    ,
                    e.iterate(t, function(r) {
                        e.obj.breakpoints[r] = new n(r,t[r])
                    }),
                    window.setTimeout(function() {
                        e.poll()
                    }, 0),
                    e
                },
                addStateHandler: function(t, n) {
                    e.stateHandlers[t] = n
                },
                callStateHandler: function(t) {
                    var n = e.stateHandlers[t]();
                    e.iterate(n, function(t) {
                        e.state.attachments.push(n[t])
                    })
                },
                changeState: function(t) {
                    e.iterate(e.obj.breakpoints, function(t) {
                        e.obj.breakpoints[t].sync()
                    }),
                    e.vars.lastStateId = e.stateId,
                    e.stateId = t,
                    e.breakpointIds = e.stateId === e.sd ? [] : e.stateId.substring(1).split(e.sd),
                    e.obj.states[e.stateId] ? e.state = e.obj.states[e.stateId] : (e.obj.states[e.stateId] = {
                        attachments: []
                    },
                    e.state = e.obj.states[e.stateId],
                    e.iterate(e.stateHandlers, e.callStateHandler)),
                    e.detachAll(e.state.attachments),
                    e.attachAll(e.state.attachments),
                    e.vars.stateId = e.stateId,
                    e.vars.state = e.state,
                    e.trigger("change"),
                    e.iterate(e.obj.breakpoints, function(t) {
                        e.obj.breakpoints[t].active ? e.obj.breakpoints[t].wasActive || e.trigger("+" + t) : e.obj.breakpoints[t].wasActive && e.trigger("-" + t)
                    })
                },
                generateStateConfig: function(t, n) {
                    var r = {};
                    return e.extend(r, t),
                    e.iterate(e.breakpointIds, function(t) {
                        e.extend(r, n[e.breakpointIds[t]])
                    }),
                    r
                },
                getStateId: function() {
                    var t = "";
                    return e.iterate(e.obj.breakpoints, function(n) {
                        var r = e.obj.breakpoints[n];
                        r.matches() && (t += e.sd + r.id)
                    }),
                    t
                },
                poll: function() {
                    var t = "";
                    t = e.getStateId(),
                    "" === t && (t = e.sd),
                    t !== e.stateId && e.changeState(t)
                },
                _attach: null,
                attach: function(t) {
                    var n = e.obj.head
                      , r = t.element;
                    return (!r.parentNode || !r.parentNode.tagName) && (e._attach || (e._attach = n.firstChild),
                    n.insertBefore(r, e._attach.nextSibling),
                    t.permanent && (e._attach = r),
                    !0)
                },
                attachAll: function(t) {
                    var n = [];
                    e.iterate(t, function(e) {
                        n[t[e].priority] || (n[t[e].priority] = []),
                        n[t[e].priority].push(t[e])
                    }),
                    n.reverse(),
                    e.iterate(n, function(t) {
                        e.iterate(n[t], function(r) {
                            e.attach(n[t][r])
                        })
                    })
                },
                detach: function(e) {
                    var t = e.element;
                    return !(e.permanent || !t.parentNode || t.parentNode && !t.parentNode.tagName) && (t.parentNode.removeChild(t),
                    !0)
                },
                detachAll: function(t) {
                    var n = {};
                    e.iterate(t, function(e) {
                        n[t[e].id] = !0
                    }),
                    e.iterate(e.obj.attachments, function(t) {
                        t in n || e.detach(e.obj.attachments[t])
                    })
                },
                attachment: function(t) {
                    return t in e.obj.attachments ? e.obj.attachments[t] : null
                },
                newAttachment: function(t, n, r, i) {
                    return e.obj.attachments[t] = {
                        id: t,
                        element: n,
                        priority: r,
                        permanent: i
                    }
                },
                init: function() {
                    e.initMethods(),
                    e.initVars(),
                    e.initEvents(),
                    e.obj.head = document.getElementsByTagName("head")[0],
                    e.isInit = !0,
                    e.trigger("init")
                },
                initEvents: function() {
                    e.on("resize", function() {
                        e.poll()
                    }),
                    e.on("orientationChange", function() {
                        e.poll()
                    }),
                    e.DOMReady(function() {
                        e.trigger("ready")
                    }),
                    window.onload && e.on("load", window.onload),
                    window.onload = function() {
                        e.trigger("load")
                    }
                    ,
                    window.onresize && e.on("resize", window.onresize),
                    window.onresize = function() {
                        e.trigger("resize")
                    }
                    ,
                    window.onorientationchange && e.on("orientationChange", window.onorientationchange),
                    window.onorientationchange = function() {
                        e.trigger("orientationChange")
                    }
                },
                initMethods: function() {
                    document.addEventListener ? !function(t, n) {
                        e.DOMReady = n()
                    }("domready", function() {
                        function e(e) {
                            for (o = 1; e = n.shift(); )
                                e()
                        }
                        var t, n = [], r = document, i = "DOMContentLoaded", o = /^loaded|^c/.test(r.readyState);
                        return r.addEventListener(i, t = function() {
                            r.removeEventListener(i, t),
                            e()
                        }
                        ),
                        function(e) {
                            o ? e() : n.push(e)
                        }
                    }) : !function(t, n) {
                        e.DOMReady = n()
                    }("domready", function(e) {
                        function t(e) {
                            for (p = 1; e = r.shift(); )
                                e()
                        }
                        var n, r = [], i = !1, o = document, a = o.documentElement, s = a.doScroll, l = "DOMContentLoaded", u = "addEventListener", c = "onreadystatechange", d = "readyState", f = s ? /^loaded|^c/ : /^loaded|c/, p = f.test(o[d]);
                        return o[u] && o[u](l, n = function() {
                            o.removeEventListener(l, n, i),
                            t()
                        }
                        , i),
                        s && o.attachEvent(c, n = function() {
                            /^c/.test(o[d]) && (o.detachEvent(c, n),
                            t())
                        }
                        ),
                        e = s ? function(t) {
                            self != top ? p ? t() : r.push(t) : function() {
                                try {
                                    a.doScroll("left")
                                } catch (n) {
                                    return setTimeout(function() {
                                        e(t)
                                    }, 50)
                                }
                                t()
                            }()
                        }
                        : function(e) {
                            p ? e() : r.push(e)
                        }
                    }),
                    Array.prototype.indexOf ? e.indexOf = function(e, t) {
                        return e.indexOf(t)
                    }
                    : e.indexOf = function(e, t) {
                        if ("string" == typeof e)
                            return e.indexOf(t);
                        var n, r, i = t ? t : 0;
                        if (!this)
                            throw new TypeError;
                        if (r = this.length,
                        0 === r || i >= r)
                            return -1;
                        for (i < 0 && (i = r - Math.abs(i)),
                        n = i; n < r; n++)
                            if (this[n] === e)
                                return n;
                        return -1
                    }
                    ,
                    Array.isArray ? e.isArray = function(e) {
                        return Array.isArray(e)
                    }
                    : e.isArray = function(e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    }
                    ,
                    Object.keys ? e.iterate = function(e, t) {
                        if (!e)
                            return [];
                        var n, r = Object.keys(e);
                        for (n = 0; r[n] && t(r[n], e[r[n]]) !== !1; n++)
                            ;
                    }
                    : e.iterate = function(e, t) {
                        if (!e)
                            return [];
                        var n;
                        for (n in e)
                            if (Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]) === !1)
                                break
                    }
                    ,
                    window.matchMedia ? e.matchesMedia = function(e) {
                        return "" == e || window.matchMedia(e).matches
                    }
                    : window.styleMedia || window.media ? e.matchesMedia = function(e) {
                        if ("" == e)
                            return !0;
                        var t = window.styleMedia || window.media;
                        return t.matchMedium(e || "all")
                    }
                    : window.getComputedStyle ? e.matchesMedia = function(e) {
                        if ("" == e)
                            return !0;
                        var t = document.createElement("style")
                          , n = document.getElementsByTagName("script")[0]
                          , r = null;
                        t.type = "text/css",
                        t.id = "matchmediajs-test",
                        n.parentNode.insertBefore(t, n),
                        r = "getComputedStyle"in window && window.getComputedStyle(t, null) || t.currentStyle;
                        var i = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
                        return t.styleSheet ? t.styleSheet.cssText = i : t.textContent = i,
                        "1px" === r.width
                    }
                    : e.matchesMedia = function(e) {
                        if ("" == e)
                            return !0;
                        var t, n, r, i, o = {
                            "min-width": null,
                            "max-width": null
                        }, a = !1;
                        for (r = e.split(/\s+and\s+/),
                        t = 0; t < r.length; t++)
                            n = r[t],
                            "(" == n.charAt(0) && (n = n.substring(1, n.length - 1),
                            i = n.split(/:\s+/),
                            2 == i.length && (o[i[0].replace(/^\s+|\s+$/g, "")] = parseInt(i[1]),
                            a = !0));
                        if (!a)
                            return !1;
                        var s = document.documentElement.clientWidth
                          , l = document.documentElement.clientHeight;
                        return !(null !== o["min-width"] && s < o["min-width"] || null !== o["max-width"] && s > o["max-width"] || null !== o["min-height"] && l < o["min-height"] || null !== o["max-height"] && l > o["max-height"])
                    }
                    ,
                    navigator.userAgent.match(/MSIE ([0-9]+)/) && RegExp.$1 < 9 && (e.newStyle = function(e) {
                        var t = document.createElement("span");
                        return t.innerHTML = '&nbsp;<style type="text/css">' + e + "</style>",
                        t
                    }
                    )
                },
                initVars: function() {
                    var t, n, r, i = navigator.userAgent;
                    t = "other",
                    n = 0,
                    r = [["firefox", /Firefox\/([0-9\.]+)/], ["bb", /BlackBerry.+Version\/([0-9\.]+)/], ["bb", /BB[0-9]+.+Version\/([0-9\.]+)/], ["opera", /OPR\/([0-9\.]+)/], ["opera", /Opera\/([0-9\.]+)/], ["edge", /Edge\/([0-9\.]+)/], ["safari", /Version\/([0-9\.]+).+Safari/], ["chrome", /Chrome\/([0-9\.]+)/], ["ie", /MSIE ([0-9]+)/], ["ie", /Trident\/.+rv:([0-9]+)/]],
                    e.iterate(r, function(e, r) {
                        if (i.match(r[1]))
                            return t = r[0],
                            n = parseFloat(RegExp.$1),
                            !1
                    }),
                    e.vars.browser = t,
                    e.vars.browserVersion = n,
                    t = "other",
                    n = 0,
                    r = [["ios", /([0-9_]+) like Mac OS X/, function(e) {
                        return e.replace("_", ".").replace("_", "")
                    }
                    ], ["ios", /CPU like Mac OS X/, function(e) {
                        return 0
                    }
                    ], ["wp", /Windows Phone ([0-9\.]+)/, null], ["android", /Android ([0-9\.]+)/, null], ["mac", /Macintosh.+Mac OS X ([0-9_]+)/, function(e) {
                        return e.replace("_", ".").replace("_", "")
                    }
                    ], ["windows", /Windows NT ([0-9\.]+)/, null], ["bb", /BlackBerry.+Version\/([0-9\.]+)/, null], ["bb", /BB[0-9]+.+Version\/([0-9\.]+)/, null]],
                    e.iterate(r, function(e, r) {
                        if (i.match(r[1]))
                            return t = r[0],
                            n = parseFloat(r[2] ? r[2](RegExp.$1) : RegExp.$1),
                            !1
                    }),
                    e.vars.os = t,
                    e.vars.osVersion = n,
                    e.vars.IEVersion = "ie" == e.vars.browser ? e.vars.browserVersion : 99,
                    e.vars.touch = "wp" == e.vars.os ? navigator.msMaxTouchPoints > 0 : !!("ontouchstart"in window),
                    e.vars.mobile = "wp" == e.vars.os || "android" == e.vars.os || "ios" == e.vars.os || "bb" == e.vars.os
                }
            };
            return e.init(),
            e
        }();
        !function(e, r) {
            "function" == typeof define && define.amd ? define([], r) : "object" == typeof n ? t.exports = r() : e.skel = r()
        }(this, function() {
            return r
        })
    }
    , {}],
    web_component: [function(e, t, n) {
        var r = function() {
            function e(e, n, r) {
                if (this.$obj = e,
                this.$submits = this.$obj.find('input[type="submit"]'),
                this.$fields = this.$obj.find(".field"),
                this.$fieldInputs = this.$fields.find("input,select,textarea"),
                this.$ajaxAlert = null,
                this.$ajaxAlert_timeout = null,
                this.$ajaxAlertPlaceholder = null,
                this.states = null,
                this.action = this.$obj.attr("action"),
                this.method = this.$obj.attr("method"),
                this.options = r,
                n) {
                    var i, o;
                    this.$stateElements = this.$obj.find("[data-form-requires]"),
                    this.states = [];
                    for (i in n)
                        o = n[i],
                        this.states[o.name] = new t(this,o.name,o.conditions)
                }
                this.init()
            }
            function t(e, t, n) {
                this.parent = e,
                this.name = t,
                this.conditions = n,
                this.elements = this.parent.$obj.find('[data-form-requires~="' + this.name + '"]')
            }
            return e.prototype.hasErrors = function() {
                return this.$fields.filter(".missing:visible,.error:visible").length > 0
            }
            ,
            e.prototype.ajaxAlert = function(e, t) {
                if (this.$ajaxAlert) {
                    var n = this;
                    web.scrollTo(n.$ajaxAlertPlaceholder, function() {
                        n.$ajaxAlert.attr("class", "alert " + e).text(t).stop().fadeIn(500, function() {
                            window.clearTimeout(n.$ajaxAlert_timeout),
                            n.$ajaxAlert_timeout = window.setTimeout(function() {
                                n.$ajaxAlert.fadeOut(500)
                            }, Math.min(8e3, Math.max(3e3, 50 * t.length)))
                        })
                    })
                }
            }
            ,
            e.prototype.init = function() {
                var e = this;
                e.options.ajax && (e.$ajaxAlert = $('<div class="alert"></div>'),
                e.$ajaxAlertPlaceholder = $('<div class="alert-placeholder"></div>'),
                e.$ajaxAlert.prependTo(e.$obj).hide(),
                e.$ajaxAlertPlaceholder.prependTo(e.$obj)),
                e.$obj.on("submit", function(t, n) {
                    return !e.hasErrors() && (e.options.ajax ? (e.$fieldInputs.trigger("change"),
                    !e.hasErrors() && (e.$fieldInputs.blur(),
                    e.$submits.prop("disabled", !0),
                    !(!n && e.$obj.triggerHandler("beforeSubmit") === !1) && (window.setTimeout(function() {
                        $.ajax({
                            type: "POST",
                            url: e.action + (e.action.indexOf("?") == -1 ? "?" : "&") + "json=1",
                            data: e.$obj.serialize(),
                            success: function(t) {
                                switch (t.action) {
                                case "alert":
                                    e.ajaxAlert(t.type, t.message);
                                    break;
                                case "redirect":
                                    return void window.location.replace(t.url);
                                default:
                                    e.ajaxAlert("success", "Ok.")
                                }
                                if (e.$obj.find('input[name="' + t._key + '"]').val(t[t._key]),
                                e.$submits.prop("disabled", !1),
                                t.reset) {
                                    if (t.reset === !0)
                                        e.$obj.get(0).reset();
                                    else if ($.isArray(t.reset))
                                        for (k in t.reset)
                                            e.$obj.find('input[name="' + t.reset[k] + '"],select[name="' + t.reset[k] + '"]').val("").removeProp("checked");
                                    else
                                        e.$obj.find('input[name="' + t.reset + '"],select[name="' + t.reset + '"]').val("").removeProp("checked");
                                    e.$fieldInputs.trigger("change")
                                }
                                t.focus && e.$obj.find('input[name="' + t.focus + '"]').focus()
                            },
                            dataType: "json"
                        })
                    }, 250),
                    !1))) : void 0)
                }).on("_checkErrors", function(t) {
                    e.hasErrors() ? (e.$obj.addClass("error"),
                    e.$submits.prop("disabled", !0)) : (e.$obj.removeClass("error"),
                    e.$submits.prop("disabled", !1))
                }).on("change", function(t) {
                    e.$obj.trigger("_checkErrors")
                }),
                e.$fields.on("_init", function(t) {
                    var n = $(this);
                    n.trigger("_checkMissing", !0).trigger("_checkStates", !0).trigger("_checkError", !0),
                    e.$obj.trigger("change")
                }).on("_checkMissing", function(e, t) {
                    var n, r = $(this), i = 1 == r.data("form-optional"), o = (r.data("form-type"),
                    r.find(".message"),
                    "");
                    n = r.find("input,select,textarea"),
                    "radio" == n.attr("type") ? n.filter(":checked").length > 0 && (o = n.filter(":checked").val()) : (n = n.first(),
                    o = n.val()),
                    (r.is(":visible") || t) && (i || "" != o && ("checkbox" != n.attr("type") || n.prop("checked")) ? r.removeClass("missing") : r.addClass("missing"))
                }).on("_checkError", function(e, t) {
                    var n, r = $(this), i = (1 == r.data("form-optional"),
                    r.data("form-type")), o = r.find(".message");
                    fi = r.find("input,select,textarea"),
                    value = web.fieldValue(r, fi.attr("name")),
                    (r.is(":visible") || t) && "checkbox" != fi.attr("type") && ("" == value || web.is(i, value) ? (o.text("").hide(),
                    r.removeClass("error")) : (n = web.typeName(i),
                    o.text(n ? "Must be a valid " + n + "." : "Invalid input.").fadeIn("fast"),
                    r.addClass("error")))
                }),
                e.states && e.$fields.on("_checkStates", function(t, n) {
                    var r, i = $();
                    for (r in e.states)
                        e.states[r].check() && (i = i.add(e.states[r].elements));
                    i.filter(":hidden").fadeIn("fast"),
                    e.$stateElements.not(i).filter(":visible").hide()
                }),
                e.$fieldInputs.on("focus", function(t) {
                    e.$fields.removeClass("focus"),
                    $(this).parents(".field").first().addClass("focus")
                }).on("blur", function(t) {
                    e.$fields.removeClass("focus");
                    var n = $(this).parent();
                    n.trigger("_checkMissing").trigger("_checkStates").trigger("_checkError"),
                    e.$obj.triggerHandler("_checkErrors")
                }).on("keydown", function(t) {
                    if (13 == t.keyCode && t.ctrlKey)
                        return e.$obj.trigger("submit"),
                        !1
                }).on("keyup", function(t) {
                    var n = $(this).parent();
                    n.trigger("_checkMissing").trigger("_checkStates"),
                    n.hasClass("error") && n.trigger("_checkError"),
                    e.$obj.trigger("change")
                }).on("change", function(t) {
                    var n = $(this).parent();
                    n.trigger("_checkMissing").trigger("_checkStates").trigger("_checkError"),
                    e.$obj.trigger("change")
                }),
                e.$fieldInputs.filter("[autoselect]").select(),
                e.$fields.trigger("_init")
            }
            ,
            t.prototype.check = function() {
                var e, t, n, r, i, o = !0;
                for (e in this.conditions)
                    if (r = this.conditions[e],
                    n = this.parent.$obj.find('[name="' + e + '"]'),
                    v = web.fieldValue(this.parent.$obj, e),
                    "object" == typeof r) {
                        i = !1;
                        for (t in r)
                            v == r[t] && (i = !0);
                        i || (o = !1)
                    } else
                        v != r && (o = !1);
                return o
            }
            ,
            {
                form: function(t, n, r) {
                    return new e(t,n,r)
                }
            }
        }();
        !function(e, r) {
            "function" == typeof define && define.amd ? define([], r) : "object" == typeof n ? t.exports = r() : e.web_component = r()
        }(this, function() {
            return r
        }),
        window.web.component = r
    }
    , {}],
    web: [function(e, t, n) {
        var r = function() {
            String.prototype.capitalize = function() {
                return this.charAt(0).toUpperCase() + this.slice(1)
            }
            ;
            var e = {
                types: {
                    none: null,
                    any: "^[ -~\\tÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð\\n\\r]*$",
                    text: "^[a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð0-9\\_\\-\\\\\"\\'\\ \\?\\!\\.\\,\\:\\;\\(\\)\\/\\#\\&\\@\\$\\%\\*\\+\\=\\n\\r]+$",
                    utf8text: "^[^\\<\\>]+$",
                    alnum: "^[a-zA-Z0-9]+$",
                    alpha: "^[a-zA-Z]+$",
                    digits: "^[0-9]+$",
                    bool: null,
                    domain: "^[a-z0-9][a-z0-9\\-\\.]*\\.[a-z0-9\\-]+$",
                    email: "^([a-zA-Z0-9\\_\\-\\.\\+]+)@([a-zA-Z0-9\\-\\.]+)\\.([a-zA-Z]+)$",
                    float: "^-?([0-9]+)(\\.([0-9]+)){0,1}$",
                    id: "^[a-z0-9\\-]+$",
                    int: "^-?([0-9]+)$",
                    ip: "^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$",
                    name: "^([a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð\\-\\']+(?:\\.)?(?: [a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð\\-\\']+(?:\\.)?)*)$",
                    password: "^[ -~]+$",
                    request: "^([/!#$&-;=?-[]_a-z~]|%[0-9a-fA-F]{2})+$",
                    tel: "^[0-9\\-\\+\\(\\)\\s]+$",
                    title: "^[a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð0-9\\_\\-\\\\\"\\'\\ \\?\\!\\.\\,\\:\\;\\(\\)\\/\\#\\&\\@\\$\\%\\*\\+\\=]+$",
                    uri: "^[a-z0-9\\-\\.]+:[a-zA-Z0-9\\~\\!\\@\\#\\$\\%\\&\\-\\_\\+\\=\\;\\,\\.\\?\\/\\:]+$",
                    url: "^https?:\\/\\/[a-zA-Z0-9\\~\\!\\@\\#\\$\\%\\&\\-\\_\\+\\=\\;\\,\\.\\?\\/\\:]+$",
                    href: "^(#[a-zA-Z0-9\\_\\-]+|[a-z0-9\\-\\.]+:[a-zA-Z0-9\\~\\!\\@\\#\\$\\%\\&\\-\\_\\+\\=\\;\\,\\.\\?\\/\\:]+)$",
                    username: "^[a-zA-Z0-9\\_]+$",
                    word: "^[a-zA-Z0-9\\_\\-]+$",
                    htmlacolor: "(^#[a-fA-F0-9]{6}$|^#[a-fA-F0-9]{8}$)",
                    htmlcolor: "^#[a-fA-F0-9]{6}$",
                    rgbacolor: "rgba\\([0-9]+,\\s*[0-9]+,\\s*[0-9]+,\\s*[0-9\\.]+\\)",
                    rgbcolor: "rgb\\([0-9]+,\\s*[0-9]+,\\s*[0-9]+\\)"
                },
                typeNames: {
                    none: !1,
                    any: !1,
                    text: !1,
                    utf8text: !1,
                    alnum: "alphanumeric string",
                    alpha: "alphabetic string",
                    digits: "string of digits",
                    bool: "boolean",
                    email: "email address",
                    float: "decimal value",
                    id: !1,
                    int: "integer",
                    ip: "IP address",
                    name: !1,
                    tel: "telephone number",
                    title: !1,
                    url: "URL",
                    username: !1,
                    word: !1,
                    htmlacolor: "HTML color",
                    htmlcolor: "HTML color",
                    rgbacolor: "RGB color",
                    rgbcolor: "RGB color"
                },
                cookie: function(e, t, n, r) {
                    if ("" === t)
                        return r || (r = "/"),
                        document.cookie = e + "=; expires=Thu, 1 Jan 1970 12:00:00 UTC; path=" + r,
                        null;
                    if (t) {
                        var i, o;
                        return n || (n = 0),
                        i = new Date,
                        i.setTime(i.getTime() + n),
                        o = i.toGMTString(),
                        r || (r = "/"),
                        document.cookie = e + "=" + t + "; expires=" + o + "; path=" + r,
                        t
                    }
                    var a, l = document.cookie.split(";");
                    for (s in l)
                        if (a = l[s].split("="),
                        a[0].trim() == e)
                            return unescape(a[1]);
                    return null
                },
                is: function(t, n) {
                    return !n || ("function" == typeof t ? t(n) : !e.types[t] || !!n.match(new RegExp(e.types[t])))
                },
                typeName: function(t) {
                    return !!e.typeNames[t] && e.typeNames[t]
                },
                fieldValue: function(e, t, n) {
                    var r, i;
                    return r = "#" == t[0] ? e.find(t) : e.find('[name="' + t + '"]'),
                    "checkbox" == r.attr("type") ? (n && r.prop("checked", n).trigger("change"),
                    r.prop("checked")) : "radio" == r.attr("type") ? (n && r.filter('[value="' + n + '"]').prop("checked", !0).trigger("change"),
                    i = r.filter(":checked").val(),
                    "undefined" != typeof i && null !== i || (i = ""),
                    i) : ((n || "" === n) && r.val(n).trigger("change"),
                    i = r.val(),
                    "undefined" != typeof i && null !== i || (i = ""),
                    i)
                },
                scrollTo: function(e, t, n) {
                    var r, i, o = $(window);
                    return n || (n = $("body,html")),
                    r = Math.max(0, e.offset().top - (o.height() - e.outerHeight()) / 2),
                    i = Math.abs(r - o.scrollTop()),
                    i < 50 ? (n.scrollTop(r),
                    t && t()) : n.stop().animate({
                        scrollTop: r
                    }, 750, "swing", t),
                    !0
                },
                date: {
                    offsetValue: 0,
                    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    offset: function(t) {
                        return "undefined" != typeof t && (e.date.offsetValue = parseInt(t)),
                        e.date.offsetValue
                    },
                    timestamp: function() {
                        return parseInt(Date.now() / 1e3) - e.date.offset()
                    },
                    absolute: function(t, n) {
                        t || (t = e.date.timestamp()),
                        n || (n = 1);
                        var r, i, o, a, s, l, u, c, d, f = new Date, p = "";
                        switch (f.setTime(1e3 * t),
                        r = e.date.months[f.getMonth()],
                        i = f.getDate(),
                        o = f.getFullYear(),
                        a = f.getHours(),
                        s = f.getMinutes(),
                        l = f.getSeconds(),
                        u = e.date.days[f.getDay()],
                        a > 12 ? (c = a - 12,
                        d = "pm") : (c = a,
                        d = "am"),
                        n) {
                        case 1:
                            p = r + " " + i + ", " + o;
                            break;
                        case 2:
                            p = r + " " + i + ", " + o + " " + c + ":" + s + d;
                            break;
                        case 3:
                            p = u + ", " + r + " " + i + ", " + o + " " + a + ":" + s + ":" + l
                        }
                        return p
                    },
                    relative: function(t, n, r) {
                        t || (t = e.date.timestamp()),
                        n || (n = 1),
                        r || (r = 129600);
                        var i, o, a, s, l, u = e.date.timestamp(), c = "", d = !1;
                        if (t > u ? (i = t - u,
                        d = !0) : (i = u - t,
                        c = " ago"),
                        r !== !1 && i > r)
                            return e.date.absolute(t, n);
                        if (i < 60)
                            switch (n) {
                            case 1:
                                if (i < 30)
                                    return "just now";
                                if (i < 60)
                                    return "about a minute" + c;
                            case 2:
                                return i + " second" + (1 != i ? "s" : "") + c;
                            case 3:
                            default:
                                return i + " secs" + c
                            }
                        if (i < 3600)
                            switch (a = Math.floor(i / 60),
                            i -= 60 * a,
                            seconds = i,
                            n) {
                            case 1:
                                if (a > 45)
                                    return "about an hour" + c;
                            case 2:
                                return a + " minute" + (1 != a ? "s" : "") + c;
                            case 3:
                            default:
                                return a + " mins " + seconds + " secs" + c
                            }
                        if (i < 86400) {
                            if (o = Math.floor(i / 3600),
                            i -= 3600 * o,
                            0 === i)
                                return o + " hrs" + c;
                            switch (a = Math.floor(i / 60),
                            n) {
                            case 2:
                                return o + " hour" + (1 != o ? "s" : "") + c;
                            case 1:
                            case 3:
                            default:
                                return o + " hrs " + a + " mins" + c
                            }
                        }
                        if (i < 604800)
                            switch (s = Math.floor(i / 86400),
                            i -= 86400 * s,
                            o = Math.floor(i / 3600),
                            n) {
                            case 1:
                                if (1 == s && o < 6)
                                    return d ? "tomorrow" : "yesterday";
                            case 2:
                                return o > 12 && s++,
                                s + " day" + (1 != s ? "s" : "") + c;
                            case 3:
                            default:
                                return s + " days " + o + " hrs" + c
                            }
                        switch (l = Math.floor(i / 604800),
                        i -= 604800 * l,
                        s = Math.floor(i / 86400),
                        i -= 86400 * s,
                        o = Math.floor(i / 3600),
                        n) {
                        case 1:
                            if (1 == l && s < 2)
                                return "about a week" + c;
                            if (4 == l)
                                return "about a month" + c;
                        case 2:
                            return s > 4 && l++,
                            l >= 4 ? (months = Math.floor(l / 4),
                            months >= 12 ? (years = Math.floor(months / 12),
                            years + " year" + (1 != years ? "s" : "") + c) : months + " month" + (1 != months ? "s" : "") + c) : l + " week" + (1 != l ? "s" : "") + c;
                        case 3:
                        default:
                            return l + " wks " + s + " days" + c
                        }
                        return ""
                    }
                }
            };
            return e
        }();
        !function(e, r) {
            "function" == typeof define && define.amd ? define([], r) : "object" == typeof n ? t.exports = r() : e.web = r()
        }(this, function() {
            return r
        }),
        window.web = r
    }
    , {}]
}, {}, []);
