import * as T from "vue";
import { ref as B, reactive as R, onMounted as de, onBeforeUnmount as pe, openBlock as V, createElementBlock as _, createElementVNode as j, Fragment as I, renderList as F, createBlock as he, unref as fe, toDisplayString as A, normalizeClass as me, createCommentVNode as ye } from "vue";
var H = { d: (e, n) => {
  for (var o in n) H.o(n, o) && !H.o(e, o) && Object.defineProperty(e, o, { enumerable: !0, get: n[o] });
}, o: (e, n) => Object.prototype.hasOwnProperty.call(e, n) }, le = {};
function Y(e, n) {
  (n == null || n > e.length) && (n = e.length);
  for (var o = 0, l = new Array(n); o < n; o++) l[o] = e[o];
  return l;
}
function se(e, n) {
  if (e) {
    if (typeof e == "string") return Y(e, n);
    var o = Object.prototype.toString.call(e).slice(8, -1);
    return o === "Object" && e.constructor && (o = e.constructor.name), o === "Map" || o === "Set" ? Array.from(e) : o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? Y(e, n) : void 0;
  }
}
function K(e) {
  return function(n) {
    if (Array.isArray(n)) return Y(n);
  }(e) || function(n) {
    if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
  }(e) || se(e) || function() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }();
}
function U(e, n, o) {
  return n in e ? Object.defineProperty(e, n, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : e[n] = o, e;
}
H.d(le, { Z: () => Ce });
const c = (te = { computed: () => T.computed, createTextVNode: () => T.createTextVNode, createVNode: () => T.createVNode, defineComponent: () => T.defineComponent, reactive: () => T.reactive, ref: () => T.ref, watch: () => T.watch, watchEffect: () => T.watchEffect }, z = {}, H.d(z, te), z), ge = (0, c.defineComponent)({ props: { data: { required: !0, type: String }, onClick: Function }, render: function() {
  var e = this.data, n = this.onClick;
  return (0, c.createVNode)("span", { class: "vjs-tree-brackets", onClick: n }, [e]);
} }), ve = (0, c.defineComponent)({ emits: ["change", "update:modelValue"], props: { checked: { type: Boolean, default: !1 }, isMultiple: Boolean, onChange: Function }, setup: function(e, n) {
  var o = n.emit;
  return { uiType: (0, c.computed)(function() {
    return e.isMultiple ? "checkbox" : "radio";
  }), model: (0, c.computed)({ get: function() {
    return e.checked;
  }, set: function(l) {
    return o("update:modelValue", l);
  } }) };
}, render: function() {
  var e = this.uiType, n = this.model, o = this.$emit;
  return (0, c.createVNode)("label", { class: ["vjs-check-controller", n ? "is-checked" : ""], onClick: function(l) {
    return l.stopPropagation();
  } }, [(0, c.createVNode)("span", { class: "vjs-check-controller-inner is-".concat(e) }, null), (0, c.createVNode)("input", { checked: n, class: "vjs-check-controller-original is-".concat(e), type: e, onChange: function() {
    return o("change", n);
  } }, null)]);
} }), be = (0, c.defineComponent)({ props: { nodeType: { required: !0, type: String }, onClick: Function }, render: function() {
  var e = this.nodeType, n = this.onClick, o = e === "objectStart" || e === "arrayStart";
  return o || e === "objectCollapsed" || e === "arrayCollapsed" ? (0, c.createVNode)("span", { class: "vjs-carets vjs-carets-".concat(o ? "open" : "close"), onClick: n }, [(0, c.createVNode)("svg", { viewBox: "0 0 1024 1024", focusable: "false", "data-icon": "caret-down", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" }, [(0, c.createVNode)("path", { d: "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" }, null)])]) : null;
} });
var te, z;
function Z(e) {
  return Z = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
    return typeof n;
  } : function(n) {
    return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
  }, Z(e);
}
function ce(e) {
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
}
function E(e) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "root", o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, l = arguments.length > 3 ? arguments[3] : void 0, f = l || {}, g = f.key, w = f.index, y = f.type, b = y === void 0 ? "content" : y, v = f.showComma, S = v !== void 0 && v, k = f.length, O = k === void 0 ? 1 : k, x = ce(e);
  if (x === "array") {
    var D = ne(e.map(function(s, i, t) {
      return E(s, "".concat(n, "[").concat(i, "]"), o + 1, { index: i, showComma: i !== t.length - 1, length: O, type: b });
    }));
    return [E("[", n, o, { showComma: !1, key: g, length: e.length, type: "arrayStart" })[0]].concat(D, E("]", n, o, { showComma: S, length: e.length, type: "arrayEnd" })[0]);
  }
  if (x === "object") {
    var a = Object.keys(e), p = ne(a.map(function(s, i, t) {
      return E(e[s], /^[a-zA-Z_]\w*$/.test(s) ? "".concat(n, ".").concat(s) : "".concat(n, '["').concat(s, '"]'), o + 1, { key: s, showComma: i !== t.length - 1, length: O, type: b });
    }));
    return [E("{", n, o, { showComma: !1, key: g, index: w, length: a.length, type: "objectStart" })[0]].concat(p, E("}", n, o, { showComma: S, length: a.length, type: "objectEnd" })[0]);
  }
  return [{ content: e, level: o, key: g, index: w, path: n, showComma: S, length: O, type: b }];
}
function ne(e) {
  if (typeof Array.prototype.flat == "function") return e.flat();
  for (var n = K(e), o = []; n.length; ) {
    var l = n.shift();
    Array.isArray(l) ? n.unshift.apply(n, K(l)) : o.push(l);
  }
  return o;
}
function W(e) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new WeakMap();
  if (e == null) return e;
  if (e instanceof Date) return new Date(e);
  if (e instanceof RegExp) return new RegExp(e);
  if (Z(e) !== "object") return e;
  if (n.get(e)) return n.get(e);
  if (Array.isArray(e)) {
    var o = e.map(function(g) {
      return W(g, n);
    });
    return n.set(e, o), o;
  }
  var l = {};
  for (var f in e) l[f] = W(e[f], n);
  return n.set(e, l), l;
}
function oe(e, n) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    n && (l = l.filter(function(f) {
      return Object.getOwnPropertyDescriptor(e, f).enumerable;
    })), o.push.apply(o, l);
  }
  return o;
}
function re(e) {
  for (var n = 1; n < arguments.length; n++) {
    var o = arguments[n] != null ? arguments[n] : {};
    n % 2 ? oe(Object(o), !0).forEach(function(l) {
      U(e, l, o[l]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : oe(Object(o)).forEach(function(l) {
      Object.defineProperty(e, l, Object.getOwnPropertyDescriptor(o, l));
    });
  }
  return e;
}
var ie = { showLength: { type: Boolean, default: !1 }, showDoubleQuotes: { type: Boolean, default: !0 }, renderNodeKey: Function, renderNodeValue: Function, selectableType: String, showSelectController: { type: Boolean, default: !1 }, showLine: { type: Boolean, default: !0 }, showLineNumber: { type: Boolean, default: !1 }, selectOnClickNode: { type: Boolean, default: !0 }, nodeSelectable: { type: Function, default: function() {
  return !0;
} }, highlightSelectedNode: { type: Boolean, default: !0 }, showIcon: { type: Boolean, default: !1 }, theme: { type: String, default: "light" }, showKeyValueSpace: { type: Boolean, default: !0 }, editable: { type: Boolean, default: !1 }, editableTrigger: { type: String, default: "click" }, onNodeClick: { type: Function }, onBracketsClick: { type: Function }, onIconClick: { type: Function }, onValueChange: { type: Function } };
const ke = (0, c.defineComponent)({ name: "TreeNode", props: re(re({}, ie), {}, { node: { type: Object, required: !0 }, collapsed: Boolean, checked: Boolean, style: Object, onSelectedChange: { type: Function } }), emits: ["nodeClick", "bracketsClick", "iconClick", "selectedChange", "valueChange"], setup: function(e, n) {
  var o = n.emit, l = (0, c.computed)(function() {
    return ce(e.node.content);
  }), f = (0, c.computed)(function() {
    return "vjs-value vjs-value-".concat(l.value);
  }), g = (0, c.computed)(function() {
    return e.showDoubleQuotes ? '"'.concat(e.node.key, '"') : e.node.key;
  }), w = (0, c.computed)(function() {
    return e.selectableType === "multiple";
  }), y = (0, c.computed)(function() {
    return e.selectableType === "single";
  }), b = (0, c.computed)(function() {
    return e.nodeSelectable(e.node) && (w.value || y.value);
  }), v = (0, c.reactive)({ editing: !1 }), S = function(i) {
    var t, r, u = (r = (t = i.target) === null || t === void 0 ? void 0 : t.value) === "null" ? null : r === "undefined" ? void 0 : r === "true" || r !== "false" && (r[0] + r[r.length - 1] === '""' || r[0] + r[r.length - 1] === "''" ? r.slice(1, -1) : typeof Number(r) == "number" && !isNaN(Number(r)) || r === "NaN" ? Number(r) : r);
    o("valueChange", u, e.node.path);
  }, k = (0, c.computed)(function() {
    var i, t = (i = e.node) === null || i === void 0 ? void 0 : i.content;
    return t === null ? t = "null" : t === void 0 && (t = "undefined"), l.value === "string" ? '"'.concat(t, '"') : t + "";
  }), O = function() {
    var i = e.renderNodeValue;
    return i ? i({ node: e.node, defaultValue: k.value }) : k.value;
  }, x = function() {
    o("bracketsClick", !e.collapsed, e.node);
  }, D = function() {
    o("iconClick", !e.collapsed, e.node);
  }, a = function() {
    o("selectedChange", e.node);
  }, p = function() {
    o("nodeClick", e.node), b.value && e.selectOnClickNode && o("selectedChange", e.node);
  }, s = function(i) {
    if (e.editable && !v.editing) {
      v.editing = !0;
      var t = function r(u) {
        var d;
        u.target !== i.target && ((d = u.target) === null || d === void 0 ? void 0 : d.parentElement) !== i.target && (v.editing = !1, document.removeEventListener("click", r));
      };
      document.removeEventListener("click", t), document.addEventListener("click", t);
    }
  };
  return function() {
    var i, t = e.node;
    return (0, c.createVNode)("div", { class: { "vjs-tree-node": !0, "has-selector": e.showSelectController, "has-carets": e.showIcon, "is-highlight": e.highlightSelectedNode && e.checked, dark: e.theme === "dark" }, onClick: p, style: e.style }, [e.showLineNumber && (0, c.createVNode)("span", { class: "vjs-node-index" }, [t.id + 1]), e.showSelectController && b.value && t.type !== "objectEnd" && t.type !== "arrayEnd" && (0, c.createVNode)(ve, { isMultiple: w.value, checked: e.checked, onChange: a }, null), (0, c.createVNode)("div", { class: "vjs-indent" }, [Array.from(Array(t.level)).map(function(r, u) {
      return (0, c.createVNode)("div", { key: u, class: { "vjs-indent-unit": !0, "has-line": e.showLine } }, null);
    }), e.showIcon && (0, c.createVNode)(be, { nodeType: t.type, onClick: D }, null)]), t.key && (0, c.createVNode)("span", { class: "vjs-key" }, [(i = e.renderNodeKey, i ? i({ node: e.node, defaultKey: g.value || "" }) : g.value), (0, c.createVNode)("span", { class: "vjs-colon" }, [":".concat(e.showKeyValueSpace ? " " : "")])]), (0, c.createVNode)("span", null, [t.type !== "content" && t.content ? (0, c.createVNode)(ge, { data: t.content.toString(), onClick: x }, null) : (0, c.createVNode)("span", { class: f.value, onClick: !e.editable || e.editableTrigger && e.editableTrigger !== "click" ? void 0 : s, onDblclick: e.editable && e.editableTrigger === "dblclick" ? s : void 0 }, [e.editable && v.editing ? (0, c.createVNode)("input", { value: k.value, onChange: S, style: { padding: "3px 8px", border: "1px solid #eee", boxShadow: "none", boxSizing: "border-box", borderRadius: 5, fontFamily: "inherit" } }, null) : O()]), t.showComma && (0, c.createVNode)("span", null, [","]), e.showLength && e.collapsed && (0, c.createVNode)("span", { class: "vjs-comment" }, [(0, c.createTextVNode)(" // "), t.length, (0, c.createTextVNode)(" items ")])])]);
  };
} });
function ae(e, n) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    n && (l = l.filter(function(f) {
      return Object.getOwnPropertyDescriptor(e, f).enumerable;
    })), o.push.apply(o, l);
  }
  return o;
}
function C(e) {
  for (var n = 1; n < arguments.length; n++) {
    var o = arguments[n] != null ? arguments[n] : {};
    n % 2 ? ae(Object(o), !0).forEach(function(l) {
      U(e, l, o[l]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : ae(Object(o)).forEach(function(l) {
      Object.defineProperty(e, l, Object.getOwnPropertyDescriptor(o, l));
    });
  }
  return e;
}
const Ce = (0, c.defineComponent)({ name: "Tree", props: C(C({}, ie), {}, { data: { type: [String, Number, Boolean, Array, Object], default: null }, collapsedNodeLength: { type: Number, default: 1 / 0 }, deep: { type: Number, default: 1 / 0 }, pathCollapsible: { type: Function, default: function() {
  return !1;
} }, rootPath: { type: String, default: "root" }, virtual: { type: Boolean, default: !1 }, height: { type: Number, default: 400 }, itemHeight: { type: Number, default: 20 }, selectedValue: { type: [String, Array], default: function() {
  return "";
} }, collapsedOnClickBrackets: { type: Boolean, default: !0 }, style: Object, onSelectedChange: { type: Function }, theme: { type: String, default: "light" } }), slots: ["renderNodeKey", "renderNodeValue"], emits: ["nodeClick", "bracketsClick", "iconClick", "selectedChange", "update:selectedValue", "update:data"], setup: function(e, n) {
  var o = n.emit, l = n.slots, f = (0, c.ref)(), g = (0, c.computed)(function() {
    return E(e.data, e.rootPath);
  }), w = function(t, r) {
    return g.value.reduce(function(u, d) {
      var h, m = d.level >= t || d.length >= r, N = (h = e.pathCollapsible) === null || h === void 0 ? void 0 : h.call(e, d);
      return d.type !== "objectStart" && d.type !== "arrayStart" || !m && !N ? u : C(C({}, u), {}, U({}, d.path, 1));
    }, {});
  }, y = (0, c.reactive)({ translateY: 0, visibleData: null, hiddenPaths: w(e.deep, e.collapsedNodeLength) }), b = (0, c.computed)(function() {
    for (var t = null, r = [], u = g.value.length, d = 0; d < u; d++) {
      var h = C(C({}, g.value[d]), {}, { id: d }), m = y.hiddenPaths[h.path];
      if (t && t.path === h.path) {
        var N = t.type === "objectStart", $ = C(C(C({}, h), t), {}, { showComma: h.showComma, content: N ? "{...}" : "[...]", type: N ? "objectCollapsed" : "arrayCollapsed" });
        t = null, r.push($);
      } else {
        if (m && !t) {
          t = h;
          continue;
        }
        if (t) continue;
        r.push(h);
      }
    }
    return r;
  }), v = (0, c.computed)(function() {
    var t = e.selectedValue;
    return t && e.selectableType === "multiple" && Array.isArray(t) ? t : [t];
  }), S = (0, c.computed)(function() {
    return !e.selectableType || e.selectOnClickNode || e.showSelectController ? "" : "When selectableType is not null, selectOnClickNode and showSelectController cannot be false at the same time, because this will cause the selection to fail.";
  }), k = function() {
    var t = b.value;
    if (e.virtual) {
      var r, u = e.height / e.itemHeight, d = ((r = f.value) === null || r === void 0 ? void 0 : r.scrollTop) || 0, h = Math.floor(d / e.itemHeight), m = h < 0 ? 0 : h + u > t.length ? t.length - u : h;
      m < 0 && (m = 0);
      var N = m + u;
      y.translateY = m * e.itemHeight, y.visibleData = t.filter(function($, M) {
        return M >= m && M < N;
      });
    } else y.visibleData = t;
  }, O = function() {
    k();
  }, x = function(t) {
    var r, u, d = t.path, h = e.selectableType;
    if (h === "multiple") {
      var m = v.value.findIndex(function(P) {
        return P === d;
      }), N = K(v.value);
      m !== -1 ? N.splice(m, 1) : N.push(d), o("update:selectedValue", N), o("selectedChange", N, K(v.value));
    } else if (h === "single" && v.value[0] !== d) {
      var $ = (r = v.value, u = 1, function(P) {
        if (Array.isArray(P)) return P;
      }(r) || function(P, J) {
        var L = P == null ? null : typeof Symbol < "u" && P[Symbol.iterator] || P["@@iterator"];
        if (L != null) {
          var G, X, q = [], Q = !0, ee = !1;
          try {
            for (L = L.call(P); !(Q = (G = L.next()).done) && (q.push(G.value), !J || q.length !== J); Q = !0) ;
          } catch (ue) {
            ee = !0, X = ue;
          } finally {
            try {
              Q || L.return == null || L.return();
            } finally {
              if (ee) throw X;
            }
          }
          return q;
        }
      }(r, u) || se(r, u) || function() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }())[0], M = d;
      o("update:selectedValue", M), o("selectedChange", M, $);
    }
  }, D = function(t) {
    o("nodeClick", t);
  }, a = function(t, r) {
    if (t) y.hiddenPaths = C(C({}, y.hiddenPaths), {}, U({}, r, 1));
    else {
      var u = C({}, y.hiddenPaths);
      delete u[r], y.hiddenPaths = u;
    }
  }, p = function(t, r) {
    e.collapsedOnClickBrackets && a(t, r.path), o("bracketsClick", t, r);
  }, s = function(t, r) {
    a(t, r.path), o("iconClick", t, r);
  }, i = function(t, r) {
    var u = W(e.data), d = e.rootPath;
    new Function("data", "val", "data".concat(r.slice(d.length), "=val"))(u, t), o("update:data", u);
  };
  return (0, c.watchEffect)(function() {
    S.value && function(t) {
      throw new Error("[VueJSONPretty] ".concat(t));
    }(S.value);
  }), (0, c.watchEffect)(function() {
    b.value && k();
  }), (0, c.watch)(function() {
    return e.deep;
  }, function(t) {
    t && (y.hiddenPaths = w(t, e.collapsedNodeLength));
  }), (0, c.watch)(function() {
    return e.collapsedNodeLength;
  }, function(t) {
    t && (y.hiddenPaths = w(e.deep, t));
  }), function() {
    var t, r, u = (t = e.renderNodeKey) !== null && t !== void 0 ? t : l.renderNodeKey, d = (r = e.renderNodeValue) !== null && r !== void 0 ? r : l.renderNodeValue, h = y.visibleData && y.visibleData.map(function(m) {
      return (0, c.createVNode)(ke, { key: m.id, node: m, collapsed: !!y.hiddenPaths[m.path], theme: e.theme, showDoubleQuotes: e.showDoubleQuotes, showLength: e.showLength, checked: v.value.includes(m.path), selectableType: e.selectableType, showLine: e.showLine, showLineNumber: e.showLineNumber, showSelectController: e.showSelectController, selectOnClickNode: e.selectOnClickNode, nodeSelectable: e.nodeSelectable, highlightSelectedNode: e.highlightSelectedNode, editable: e.editable, editableTrigger: e.editableTrigger, showIcon: e.showIcon, showKeyValueSpace: e.showKeyValueSpace, renderNodeKey: u, renderNodeValue: d, onNodeClick: D, onBracketsClick: p, onIconClick: s, onSelectedChange: x, onValueChange: i, style: e.itemHeight && e.itemHeight !== 20 ? { lineHeight: "".concat(e.itemHeight, "px") } : {} }, null);
    });
    return (0, c.createVNode)("div", { ref: f, class: { "vjs-tree": !0, "is-virtual": e.virtual, dark: e.theme === "dark" }, onScroll: e.virtual ? O : void 0, style: e.showLineNumber ? C({ paddingLeft: "".concat(12 * Number(g.value.length.toString().length), "px") }, e.style) : e.style }, [e.virtual ? (0, c.createVNode)("div", { class: "vjs-tree-list", style: { height: "".concat(e.height, "px") } }, [(0, c.createVNode)("div", { class: "vjs-tree-list-holder", style: { height: "".concat(b.value.length * e.itemHeight, "px") } }, [(0, c.createVNode)("div", { class: "vjs-tree-list-holder-inner", style: { transform: "translateY(".concat(y.translateY, "px)") } }, [h])])]) : h]);
  };
} });
var we = le.Z;
const Ne = (e, n) => {
  const o = e.__vccOpts || e;
  for (const [l, f] of n)
    o[l] = f;
  return o;
}, Se = { class: "midi-component" }, je = { class: "midiLogs" }, Oe = { class: "text-2xl font-bold mb-4" }, Pe = { class: "table-container" }, Ve = { class: "text-xl font-semibold mb-2" }, xe = { class: "message-list" }, Te = ["onClick"], _e = { class: "text-sm text-gray-500" }, De = {
  key: 0,
  class: "ml-2 text-blue-600"
}, Ee = {
  __name: "MidiMama",
  setup(e) {
    const n = B([]), o = B([]), l = R({}), f = B(null), g = B([]), w = async () => {
      try {
        f.value = await navigator.requestMIDIAccess({ sysex: !0 }), y(), f.value.onstatechange = y, S();
      } catch (a) {
        console.error("Failed to get MIDI access:", a);
      }
    }, y = () => {
      n.value = Array.from(f.value.inputs.values()), o.value = Array.from(f.value.outputs.values()), o.value.forEach(b);
    }, b = (a) => {
      const p = {
        id: a.id,
        addEventListener: (i, t) => {
          a._listeners = a._listeners || [], a._listeners.push(t);
        },
        removeEventListener: (i, t) => {
          a._listeners = a._listeners.filter((r) => r !== t);
        }
      }, s = a.send.bind(a);
      a.send = (i) => {
        if (s(i), a._listeners) {
          const t = { data: i };
          a._listeners.forEach((r) => r(t));
        }
      }, v(p);
    }, v = (a) => {
      l[a.id] && a.removeEventListener("midimessage", k), l[a.id] = R({
        inputs: {},
        outputs: {},
        clock: null,
        channelPressure: null,
        polyPressure: {}
      }), a.addEventListener(
        "midimessage",
        (p) => k(
          a.id,
          p,
          a instanceof MIDIInput ? "inputs" : "outputs"
        )
      );
    }, S = () => {
      n.value.forEach(v), o.value.forEach((a) => {
        l[a.id] || (l[a.id] = R({
          inputs: {},
          outputs: {},
          clock: null,
          channelPressure: null,
          polyPressure: {}
        })), b(a);
      });
    }, k = (a, p, s) => {
      const [i, t, r] = p.data, u = i >> 4, d = i & 15;
      if (i === 248) {
        l[a].clock = {
          description: "MIDI Clock",
          timestamp: Date.now()
        };
        return;
      }
      if (u === 13) {
        l[a].channelPressure = {
          description: `Channel Pressure (Aftertouch) - Value: ${t}`,
          timestamp: Date.now(),
          channel: d + 1,
          messageType: "channelPressure"
        };
        return;
      }
      if (u === 10) {
        l[a].polyPressure[`note-${t}`] = {
          description: `Polyphonic Aftertouch - Note: ${t}, Pressure: ${r}`,
          timestamp: Date.now(),
          channel: d + 1,
          messageType: "polyPressure",
          noteNumber: t,
          pressure: r
        };
        return;
      }
      let h;
      u === 9 || u === 8 ? h = `note-${t}` : u === 11 && t === 7 ? h = `volume-${t}` : h = `other-${Date.now()}`, l[a][s][h] = {
        ...O(p),
        timestamp: Date.now()
      }, console.log(
        `Updated deviceMessages for ${a} ${s}:`,
        l[a][s]
      ), Object.keys(l[a][s]).forEach((m) => {
        Date.now() - l[a][s][m].timestamp > 5e3 && delete l[a][s][m];
      }), Object.keys(l[a].polyPressure).forEach((m) => {
        Date.now() - l[a].polyPressure[m].timestamp > 5e3 && delete l[a].polyPressure[m];
      });
    }, O = (a) => {
      const [p, ...s] = a.data, i = p >> 4, t = p & 15;
      let r, u, d;
      switch (i) {
        case 8:
          r = `Note Off - Note: ${s[0]}, Velocity: ${s[1]}`, u = "noteOff", d = s[0];
          break;
        case 9:
          r = `Note On - Note: ${s[0]}, Velocity: ${s[1]}`, u = s[1] > 0 ? "noteOn" : "noteOff", d = s[0];
          break;
        case 10:
          r = `Polyphonic Aftertouch - Note: ${s[0]}, Pressure: ${s[1]}`, u = "polyPressure", d = s[0];
          break;
        case 11:
          s[0] === 7 ? r = `Volume: ${s[1]}` : r = `CC - Controller: ${s[0]}, Value: ${s[1]}`;
          break;
        case 12:
          r = `Program Change - Program: ${s[0]}`;
          break;
        case 13:
          r = `Channel Pressure (Aftertouch) - Value: ${s[0]}`, u = "channelPressure";
          break;
        case 14:
          r = `Pitch Bend - Value: ${(s[1] << 7) + s[0]}`, u = "pitchBend";
          break;
        case 15:
          p === 240 ? (r = `System Exclusive - Length: ${s.length} bytes`, u = "sysex") : p === 248 ? (r = "Timing Clock", u = "timingClock") : (r = `System Real-Time: ${p.toString(16).toUpperCase()}`, u = "systemRealTime");
          break;
        default:
          r = `Unknown - Status: ${p.toString(16).toUpperCase()}, Data: ${s.join(", ")}`, u = "unknown";
      }
      return {
        channel: t + 1,
        noteNumber: d,
        description: r,
        messageType: u,
        rawData: [p, ...s]
      };
    }, x = (a) => {
      console.info("🌷🌷🌷🌷🌷🌷MIDI Message:", a), g.value.unshift(a), g.value.length > 50 && g.value.pop();
    }, D = (a) => {
      let p = null, s = null;
      const i = [];
      a.clock && Date.now() - a.clock.timestamp < 5e3 && (p = { key: "clock", ...a.clock }), a.channelPressure && Date.now() - a.channelPressure.timestamp < 5e3 && (s = {
        key: "channelPressure",
        ...a.channelPressure
      });
      for (const t of ["inputs", "outputs"])
        for (const [r, u] of Object.entries(a[t] || {})) {
          const d = a.polyPressure[r];
          d ? i.push({
            key: r,
            direction: t,
            ...u,
            polyPressure: d.pressure
          }) : i.push({ key: r, direction: t, ...u });
        }
      return i.sort((t, r) => r.timestamp - t.timestamp), s && i.unshift(s), p && i.unshift(p), i;
    };
    return de(() => {
      w();
    }), pe(() => {
      n.value.forEach((a) => {
        l[a.id] && a.removeEventListener("midimessage", k);
      });
    }), (a, p) => (V(), _("div", Se, [
      j("div", je, [
        p[0] || (p[0] = j("h2", { class: "text-2xl font-bold mb-4" }, "MIDI Logs", -1)),
        (V(!0), _(I, null, F(g.value, (s, i) => (V(), he(fe(we), {
          key: i,
          path: "res",
          data: s,
          highlightMouseoverNode: !0,
          showDoubleQuotes: !1,
          showLength: !0,
          deep: 1
        }, null, 8, ["data"]))), 128))
      ]),
      (V(), _(I, null, F(["inputs", "outputs"], (s) => j("div", {
        key: s,
        class: "midi-table"
      }, [
        j("h2", Oe, " MIDI " + A(s.charAt(0).toUpperCase() + s.slice(1)), 1),
        j("div", Pe, [
          (V(!0), _(I, null, F(s === "inputs" ? n.value : o.value, (i) => (V(), _("div", {
            key: i.id,
            class: "device-column"
          }, [
            j("h3", Ve, A(i.name), 1),
            j("div", xe, [
              (V(!0), _(I, null, F(D(
                l[i.id] || {}
              ), (t) => (V(), _("div", {
                key: t.key,
                class: "message-card cursor-pointer hover:bg-gray-200",
                onClick: (r) => x(t)
              }, [
                j("span", _e, "Ch " + A(t.channel || "-") + ":", 1),
                j("span", {
                  class: me(["text-2xl font-bold mr-2", {
                    "note-on": t.messageType === "noteOn",
                    "note-off": t.messageType === "noteOff"
                  }])
                }, A(t.noteNumber || "-"), 3),
                j("span", null, A(t.description), 1),
                t.polyPressure !== void 0 ? (V(), _("span", De, " (Poly AT: " + A(t.polyPressure) + ") ", 1)) : ye("", !0)
              ], 8, Te))), 128))
            ])
          ]))), 128))
        ])
      ])), 64))
    ]));
  }
}, Ae = /* @__PURE__ */ Ne(Ee, [["__scopeId", "data-v-b183ae4e"]]);
export {
  Ae as default
};
