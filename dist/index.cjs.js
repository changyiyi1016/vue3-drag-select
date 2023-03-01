"use strict";
const o = require("vue"),
  b = o.defineComponent({
    name: "vue3DragSelect",
    props: {
      selectorClass: { type: String, required: !0 },
      color: { type: String, default: "rgba(0, 162, 255, .4)" },
    },
    setup(u, { emit: d }) {
      const c = o.ref(!1),
        f = o.ref(!1),
        r = o.ref(),
        a = o.ref(),
        i = o.ref([]),
        { proxy: l } = o.getCurrentInstance() || {},
        p = o.ref();
      function _(t) {
        const e = t.concat();
        for (let n = 0; n < e.length; ++n)
          for (let s = n + 1; s < e.length; ++s)
            e[n] === e[s] && e.splice(s--, 1);
        return e;
      }
      let m = o.computed(() => {
        var w, $;
        if (!c.value || !r.value || !a.value) return {};
        const t = l == null ? void 0 : l.$el.getBoundingClientRect(),
          e = M(),
          n = Math.min(r.value.x, a.value.x) - t.left - e.x,
          s =
            Math.min(
              (w = r.value) == null ? void 0 : w.y,
              ($ = a.value) == null ? void 0 : $.y
            ) -
            t.top -
            e.y,
          h = Math.abs(r.value.x - a.value.x),
          L = Math.abs(r.value.y - a.value.y);
        return { left: n, top: s, width: h, height: L };
      });
      const y = o.computed(() => {
          if (!c.value || !r.value || !a.value) return { background: u.color };
          const { left: t, top: e, width: n, height: s } = m.value;
          return {
            background: u.color,
            left: `${t}px`,
            top: `${e}px`,
            width: `${n}px`,
            height: `${s}px`,
          };
        }),
        M = () =>
          typeof document > "u"
            ? { x: 0, y: 0 }
            : {
                x: l == null ? void 0 : l.$el.scrollLeft,
                y: l == null ? void 0 : l.$el.scrollTop,
              },
        S = (t) => {
          t.button !== 2 &&
            ((f.value = t.shiftKey),
            (c.value = !0),
            (r.value = { x: t.pageX, y: t.pageY }),
            window.addEventListener("mousemove", v),
            window.addEventListener("mouseup", g));
        },
        v = (t) => {
          var e;
          if (c.value) {
            a.value = { x: t.pageX, y: t.pageY };
            const n =
              (e = p.value) == null
                ? void 0
                : e.querySelectorAll(`.${u.selectorClass}`);
            if (n) {
              let s = Array.from(n).filter((h) => E(h));
              i.value = f.value ? _(i.value.concat(s)) : s;
            }
          }
        },
        g = () => {
          window.removeEventListener("mousemove", v),
            window.removeEventListener("mouseup", g),
            (c.value = !1),
            (f.value = !1),
            (r.value = null),
            (a.value = null);
        },
        E = (t) => {
          if (t.classList.contains(u.selectorClass)) {
            const e = m.value,
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
        o.onMounted(() => {
          var t;
          (t = l == null ? void 0 : l.$el.$children) == null ||
            t.forEach((e) => {
              e.$on("click", () => {
                i.value.find((s) => e.$el === s.$el)
                  ? (i.value = i.value.filter((s) => e.$el !== s.$el))
                  : i.value.push(e);
              });
            });
        }),
        o.onBeforeUnmount(() => {
          var t;
          window.removeEventListener("mousemove", v),
            window.removeEventListener("mouseup", g),
            (t = l == null ? void 0 : l.$el.$children) == null ||
              t.forEach((e) => {
                e.$off("click");
              });
        }),
        o.watch(i, (t, e) => {
          d("change", e);
        }),
        {
          mouseDown: c,
          concat: f,
          startPoint: r,
          endPoint: a,
          selectedItems: i,
          onMouseDown: S,
          selectionBoxStyling: y,
          drag: p,
        }
      );
    },
  });
const x = (u, d) => {
  const c = u.__vccOpts || u;
  for (const [f, r] of d) c[f] = r;
  return c;
};
function k(u, d, c, f, r, a) {
  return (
    o.openBlock(),
    o.createElementBlock(
      "div",
      {
        class: "vue-drag-select",
        onMousedown:
          d[0] || (d[0] = (...i) => u.onMouseDown && u.onMouseDown(...i)),
        ref: "drag",
      },
      [
        o.renderSlot(
          u.$slots,
          "default",
          { selectedItems: u.selectedItems },
          void 0,
          !0
        ),
      ],
      544
    )
  );
}
const B = x(b, [
  ["render", k],
  ["__scopeId", "data-v-9f18a159"],
]);
module.exports = B;
