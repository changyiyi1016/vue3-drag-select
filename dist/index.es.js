import {
  defineComponent as x,
  ref as d,
  getCurrentInstance as k,
  computed as _,
  onMounted as B,
  onBeforeUnmount as D,
  watch as C,
  openBlock as I,
  createElementBlock as A,
  renderSlot as q,
} from "vue";
const P = x({
  name: "vue3DragSelect",
  props: {
    selectorClass: {
      type: String,
      required: !0,
    },
    color: {
      type: String,
      default: "rgba(0, 162, 255, .4)",
    },
  },
  setup(s, { emit: f }) {
    const r = d(!1),
      i = d(!1),
      u = d(),
      a = d(),
      c = d([]),
      { proxy: o } = k() || {},
      m = d();
    function y(t) {
      const e = t.concat();
      for (let n = 0; n < e.length; ++n)
        for (let l = n + 1; l < e.length; ++l)
          e[n] === e[l] && e.splice(l--, 1);
      return e;
    }
    let p = _(() => {
      var w, $;
      if (!r.value || !u.value || !a.value) return {};
      const t = o == null ? void 0 : o.$el.getBoundingClientRect(),
        e = S(),
        n = Math.min(u.value.x, a.value.x) - t.left - e.x,
        l =
          Math.min(
            (w = u.value) == null ? void 0 : w.y,
            ($ = a.value) == null ? void 0 : $.y
          ) -
          t.top -
          e.y,
        h = Math.abs(u.value.x - a.value.x),
        b = Math.abs(u.value.y - a.value.y);
      return {
        left: n,
        top: l,
        width: h,
        height: b,
      };
    });
    const M = _(() => {
        if (!r.value || !u.value || !a.value) return { background: s.color };
        const { left: t, top: e, width: n, height: l } = p.value;
        return {
          background: s.color,
          left: `${t}px`,
          top: `${e}px`,
          width: `${n}px`,
          height: `${l}px`,
        };
      }),
      S = () =>
        typeof document > "u"
          ? {
              x: 0,
              y: 0,
            }
          : {
              x: o == null ? void 0 : o.$el.scrollLeft,
              y: o == null ? void 0 : o.$el.scrollTop,
            },
      E = (t) => {
        t.button !== 2 &&
          ((i.value = t.shiftKey),
          (r.value = !0),
          (u.value = {
            x: t.pageX,
            y: t.pageY,
          }),
          window.addEventListener("mousemove", v),
          window.addEventListener("mouseup", g));
      },
      v = (t) => {
        var e;
        if (r.value) {
          a.value = {
            x: t.pageX,
            y: t.pageY,
          };
          const n =
            (e = m.value) == null
              ? void 0
              : e.querySelectorAll(`.${s.selectorClass}`);
          if (n) {
            let l = Array.from(n).filter((h) => L(h));
            c.value = i.value ? y(c.value.concat(l)) : l;
          }
        }
      },
      g = () => {
        window.removeEventListener("mousemove", v),
          window.removeEventListener("mouseup", g),
          (r.value = !1),
          (i.value = !1),
          (u.value = null),
          (a.value = null);
      },
      L = (t) => {
        if (t.classList.contains(s.selectorClass)) {
          const e = p.value,
            n = {
              top: t.offsetTop,
              left: t.offsetLeft,
              width: t.clientWidth,
              height: t.clientHeight,
            };
          return (
            e.left <= n.left + n.width &&
            e.left + e.width >= n.left &&
            e.top <= n.top + n.height &&
            e.top + e.height >= n.top
          );
        }
        return !1;
      };
    return (
      B(() => {
        var t;
        (t = o == null ? void 0 : o.$el.$children) == null ||
          t.forEach((e) => {
            e.$on("click", () => {
              c.value.find((l) => e.$el === l.$el)
                ? (c.value = c.value.filter((l) => e.$el !== l.$el))
                : c.value.push(e);
            });
          });
      }),
      D(() => {
        var t;
        window.removeEventListener("mousemove", v),
          window.removeEventListener("mouseup", g),
          (t = o == null ? void 0 : o.$el.$children) == null ||
            t.forEach((e) => {
              e.$off("click");
            });
      }),
      C(c, (t, e) => {
        f("change", e);
      }),
      {
        mouseDown: r,
        concat: i,
        startPoint: u,
        endPoint: a,
        selectedItems: c,
        onMouseDown: E,
        selectionBoxStyling: M,
        drag: m,
      }
    );
  },
});
const R = (s, f) => {
  const r = s.__vccOpts || s;
  for (const [i, u] of f) r[i] = u;
  return r;
};
function T(s, f, r, i, u, a) {
  return (
    I(),
    A(
      "div",
      {
        class: "vue-drag-select",
        onMousedown:
          f[0] || (f[0] = (...c) => s.onMouseDown && s.onMouseDown(...c)),
        ref: "drag",
      },
      [q(s.$slots, "default", { selectedItems: s.selectedItems }, void 0, !0)],
      544
    )
  );
}
const X = /* @__PURE__ */ R(P, [
  ["render", T],
  ["__scopeId", "data-v-9f18a159"],
]);
export { X as default };
