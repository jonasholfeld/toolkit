let ma;
const Xo = window.location.origin;
function Yo(t) {
  const e = t.target.closest("a");
  e &&
    e.href.startsWith(Xo) &&
    e.target !== "_blank" &&
    !t.defaultPrevented &&
    t.button === 0 &&
    !t.metaKey &&
    !t.altKey &&
    !t.ctrlKey &&
    !t.shiftKey &&
    (t.preventDefault(), ma.push({ path: e.href.slice(Xo.length) }));
}
const Xc = (t) => {
    t.directive("kirbytext", {
      mounted(e, n) {
        (ma = n.instance.$router), e.addEventListener("click", Yo);
      },
      beforeUnmount(e) {
        e.removeEventListener("click", Yo);
      },
    });
  },
  Yc = Object.freeze(
    Object.defineProperty(
      { __proto__: null, install: Xc },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Gc = "modulepreload",
  Qc = function (t) {
    return "/dist/" + t;
  },
  Go = {},
  je = function (e, n, r) {
    if (!n || n.length === 0) return e();
    const i = document.getElementsByTagName("link");
    return Promise.all(
      n.map((s) => {
        if (((s = Qc(s)), s in Go)) return;
        Go[s] = !0;
        const o = s.endsWith(".css"),
          l = o ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let c = i.length - 1; c >= 0; c--) {
            const f = i[c];
            if (f.href === s && (!o || f.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${s}"]${l}`)) return;
        const a = document.createElement("link");
        if (
          ((a.rel = o ? "stylesheet" : Gc),
          o || ((a.as = "script"), (a.crossOrigin = "")),
          (a.href = s),
          document.head.appendChild(a),
          o)
        )
          return new Promise((c, f) => {
            a.addEventListener("load", c),
              a.addEventListener("error", () =>
                f(new Error(`Unable to preload CSS for ${s}`))
              );
          });
      })
    ).then(() => e());
  },
  Qo = (t, e) => {
    const n = t[e];
    return n
      ? typeof n == "function"
        ? n()
        : Promise.resolve(n)
      : new Promise((r, i) => {
          (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(
            i.bind(null, new Error("Unknown variable dynamic import: " + e))
          );
        });
  };
function Gs(t, e) {
  const n = Object.create(null),
    r = t.split(",");
  for (let i = 0; i < r.length; i++) n[r[i]] = !0;
  return e ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
function pt(t) {
  if (J(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n],
        i = Se(r) ? tf(r) : pt(r);
      if (i) for (const s in i) e[s] = i[s];
    }
    return e;
  } else {
    if (Se(t)) return t;
    if (ve(t)) return t;
  }
}
const Jc = /;(?![^(]*\))/g,
  Zc = /:([^]+)/,
  ef = /\/\*.*?\*\//gs;
function tf(t) {
  const e = {};
  return (
    t
      .replace(ef, "")
      .split(Jc)
      .forEach((n) => {
        if (n) {
          const r = n.split(Zc);
          r.length > 1 && (e[r[0].trim()] = r[1].trim());
        }
      }),
    e
  );
}
function Ke(t) {
  let e = "";
  if (Se(t)) e = t;
  else if (J(t))
    for (let n = 0; n < t.length; n++) {
      const r = Ke(t[n]);
      r && (e += r + " ");
    }
  else if (ve(t)) for (const n in t) t[n] && (e += n + " ");
  return e.trim();
}
const nf =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  rf = Gs(nf);
function va(t) {
  return !!t || t === "";
}
const Lt = (t) =>
    Se(t)
      ? t
      : t == null
      ? ""
      : J(t) || (ve(t) && (t.toString === xa || !te(t.toString)))
      ? JSON.stringify(t, ya, 2)
      : String(t),
  ya = (t, e) =>
    e && e.__v_isRef
      ? ya(t, e.value)
      : qn(e)
      ? {
          [`Map(${e.size})`]: [...e.entries()].reduce(
            (n, [r, i]) => ((n[`${r} =>`] = i), n),
            {}
          ),
        }
      : ba(e)
      ? { [`Set(${e.size})`]: [...e.values()] }
      : ve(e) && !J(e) && !Ea(e)
      ? String(e)
      : e,
  ge = {},
  Wn = [],
  Et = () => {},
  sf = () => !1,
  of = /^on[^a-z]/,
  Si = (t) => of.test(t),
  Qs = (t) => t.startsWith("onUpdate:"),
  Fe = Object.assign,
  Js = (t, e) => {
    const n = t.indexOf(e);
    n > -1 && t.splice(n, 1);
  },
  lf = Object.prototype.hasOwnProperty,
  ae = (t, e) => lf.call(t, e),
  J = Array.isArray,
  qn = (t) => Gr(t) === "[object Map]",
  ba = (t) => Gr(t) === "[object Set]",
  af = (t) => Gr(t) === "[object RegExp]",
  te = (t) => typeof t == "function",
  Se = (t) => typeof t == "string",
  Zs = (t) => typeof t == "symbol",
  ve = (t) => t !== null && typeof t == "object",
  wa = (t) => ve(t) && te(t.then) && te(t.catch),
  xa = Object.prototype.toString,
  Gr = (t) => xa.call(t),
  uf = (t) => Gr(t).slice(8, -1),
  Ea = (t) => Gr(t) === "[object Object]",
  eo = (t) =>
    Se(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t,
  oi = Gs(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  ki = (t) => {
    const e = Object.create(null);
    return (n) => e[n] || (e[n] = t(n));
  },
  cf = /-(\w)/g,
  Dt = ki((t) => t.replace(cf, (e, n) => (n ? n.toUpperCase() : ""))),
  ff = /\B([A-Z])/g,
  cr = ki((t) => t.replace(ff, "-$1").toLowerCase()),
  Oi = ki((t) => t.charAt(0).toUpperCase() + t.slice(1)),
  Yi = ki((t) => (t ? `on${Oi(t)}` : "")),
  Mr = (t, e) => !Object.is(t, e),
  Er = (t, e) => {
    for (let n = 0; n < t.length; n++) t[n](e);
  },
  di = (t, e, n) => {
    Object.defineProperty(t, e, { configurable: !0, enumerable: !1, value: n });
  },
  hf = (t) => {
    const e = parseFloat(t);
    return isNaN(e) ? t : e;
  },
  df = (t) => {
    const e = Se(t) ? Number(t) : NaN;
    return isNaN(e) ? t : e;
  };
let Jo;
const pf = () =>
  Jo ||
  (Jo =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let yt;
class _f {
  constructor(e = !1) {
    (this.detached = e),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = yt),
      !e && yt && (this.index = (yt.scopes || (yt.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const n = yt;
      try {
        return (yt = this), e();
      } finally {
        yt = n;
      }
    }
  }
  on() {
    yt = this;
  }
  off() {
    yt = this.parent;
  }
  stop(e) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !e) {
        const i = this.parent.scopes.pop();
        i &&
          i !== this &&
          ((this.parent.scopes[this.index] = i), (i.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function gf(t, e = yt) {
  e && e.active && e.effects.push(t);
}
function mf() {
  return yt;
}
const to = (t) => {
    const e = new Set(t);
    return (e.w = 0), (e.n = 0), e;
  },
  Ta = (t) => (t.w & fn) > 0,
  Ca = (t) => (t.n & fn) > 0,
  vf = ({ deps: t }) => {
    if (t.length) for (let e = 0; e < t.length; e++) t[e].w |= fn;
  },
  yf = (t) => {
    const { deps: e } = t;
    if (e.length) {
      let n = 0;
      for (let r = 0; r < e.length; r++) {
        const i = e[r];
        Ta(i) && !Ca(i) ? i.delete(t) : (e[n++] = i),
          (i.w &= ~fn),
          (i.n &= ~fn);
      }
      e.length = n;
    }
  },
  pi = new WeakMap();
let vr = 0,
  fn = 1;
const vs = 30;
let bt;
const Rn = Symbol(""),
  ys = Symbol("");
class no {
  constructor(e, n = null, r) {
    (this.fn = e),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      gf(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let e = bt,
      n = ln;
    for (; e; ) {
      if (e === this) return;
      e = e.parent;
    }
    try {
      return (
        (this.parent = bt),
        (bt = this),
        (ln = !0),
        (fn = 1 << ++vr),
        vr <= vs ? vf(this) : Zo(this),
        this.fn()
      );
    } finally {
      vr <= vs && yf(this),
        (fn = 1 << --vr),
        (bt = this.parent),
        (ln = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    bt === this
      ? (this.deferStop = !0)
      : this.active &&
        (Zo(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Zo(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++) e[n].delete(t);
    e.length = 0;
  }
}
let ln = !0;
const Pa = [];
function fr() {
  Pa.push(ln), (ln = !1);
}
function hr() {
  const t = Pa.pop();
  ln = t === void 0 ? !0 : t;
}
function et(t, e, n) {
  if (ln && bt) {
    let r = pi.get(t);
    r || pi.set(t, (r = new Map()));
    let i = r.get(n);
    i || r.set(n, (i = to())), Ra(i);
  }
}
function Ra(t, e) {
  let n = !1;
  vr <= vs ? Ca(t) || ((t.n |= fn), (n = !Ta(t))) : (n = !t.has(bt)),
    n && (t.add(bt), bt.deps.push(t));
}
function Vt(t, e, n, r, i, s) {
  const o = pi.get(t);
  if (!o) return;
  let l = [];
  if (e === "clear") l = [...o.values()];
  else if (n === "length" && J(t)) {
    const u = Number(r);
    o.forEach((a, c) => {
      (c === "length" || c >= u) && l.push(a);
    });
  } else
    switch ((n !== void 0 && l.push(o.get(n)), e)) {
      case "add":
        J(t)
          ? eo(n) && l.push(o.get("length"))
          : (l.push(o.get(Rn)), qn(t) && l.push(o.get(ys)));
        break;
      case "delete":
        J(t) || (l.push(o.get(Rn)), qn(t) && l.push(o.get(ys)));
        break;
      case "set":
        qn(t) && l.push(o.get(Rn));
        break;
    }
  if (l.length === 1) l[0] && bs(l[0]);
  else {
    const u = [];
    for (const a of l) a && u.push(...a);
    bs(to(u));
  }
}
function bs(t, e) {
  const n = J(t) ? t : [...t];
  for (const r of n) r.computed && el(r);
  for (const r of n) r.computed || el(r);
}
function el(t, e) {
  (t !== bt || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run());
}
function bf(t, e) {
  var n;
  return (n = pi.get(t)) === null || n === void 0 ? void 0 : n.get(e);
}
const wf = Gs("__proto__,__v_isRef,__isVue"),
  Sa = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((t) => t !== "arguments" && t !== "caller")
      .map((t) => Symbol[t])
      .filter(Zs)
  ),
  xf = ro(),
  Ef = ro(!1, !0),
  Tf = ro(!0),
  tl = Cf();
function Cf() {
  const t = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
      t[e] = function (...n) {
        const r = se(this);
        for (let s = 0, o = this.length; s < o; s++) et(r, "get", s + "");
        const i = r[e](...n);
        return i === -1 || i === !1 ? r[e](...n.map(se)) : i;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
      t[e] = function (...n) {
        fr();
        const r = se(this)[e].apply(this, n);
        return hr(), r;
      };
    }),
    t
  );
}
function Pf(t) {
  const e = se(this);
  return et(e, "has", t), e.hasOwnProperty(t);
}
function ro(t = !1, e = !1) {
  return function (r, i, s) {
    if (i === "__v_isReactive") return !t;
    if (i === "__v_isReadonly") return t;
    if (i === "__v_isShallow") return e;
    if (i === "__v_raw" && s === (t ? (e ? Uf : La) : e ? Aa : Ma).get(r))
      return r;
    const o = J(r);
    if (!t) {
      if (o && ae(tl, i)) return Reflect.get(tl, i, s);
      if (i === "hasOwnProperty") return Pf;
    }
    const l = Reflect.get(r, i, s);
    return (Zs(i) ? Sa.has(i) : wf(i)) || (t || et(r, "get", i), e)
      ? l
      : ze(l)
      ? o && eo(i)
        ? l
        : l.value
      : ve(l)
      ? t
        ? Ai(l)
        : Xt(l)
      : l;
  };
}
const Rf = ka(),
  Sf = ka(!0);
function ka(t = !1) {
  return function (n, r, i, s) {
    let o = n[r];
    if (Zn(o) && ze(o) && !ze(i)) return !1;
    if (
      !t &&
      (!_i(i) && !Zn(i) && ((o = se(o)), (i = se(i))), !J(n) && ze(o) && !ze(i))
    )
      return (o.value = i), !0;
    const l = J(n) && eo(r) ? Number(r) < n.length : ae(n, r),
      u = Reflect.set(n, r, i, s);
    return (
      n === se(s) && (l ? Mr(i, o) && Vt(n, "set", r, i) : Vt(n, "add", r, i)),
      u
    );
  };
}
function kf(t, e) {
  const n = ae(t, e);
  t[e];
  const r = Reflect.deleteProperty(t, e);
  return r && n && Vt(t, "delete", e, void 0), r;
}
function Of(t, e) {
  const n = Reflect.has(t, e);
  return (!Zs(e) || !Sa.has(e)) && et(t, "has", e), n;
}
function Mf(t) {
  return et(t, "iterate", J(t) ? "length" : Rn), Reflect.ownKeys(t);
}
const Oa = { get: xf, set: Rf, deleteProperty: kf, has: Of, ownKeys: Mf },
  Af = {
    get: Tf,
    set(t, e) {
      return !0;
    },
    deleteProperty(t, e) {
      return !0;
    },
  },
  Lf = Fe({}, Oa, { get: Ef, set: Sf }),
  io = (t) => t,
  Mi = (t) => Reflect.getPrototypeOf(t);
function Zr(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = se(t),
    s = se(e);
  n || (e !== s && et(i, "get", e), et(i, "get", s));
  const { has: o } = Mi(i),
    l = r ? io : n ? lo : Ar;
  if (o.call(i, e)) return l(t.get(e));
  if (o.call(i, s)) return l(t.get(s));
  t !== i && t.get(e);
}
function ei(t, e = !1) {
  const n = this.__v_raw,
    r = se(n),
    i = se(t);
  return (
    e || (t !== i && et(r, "has", t), et(r, "has", i)),
    t === i ? n.has(t) : n.has(t) || n.has(i)
  );
}
function ti(t, e = !1) {
  return (
    (t = t.__v_raw), !e && et(se(t), "iterate", Rn), Reflect.get(t, "size", t)
  );
}
function nl(t) {
  t = se(t);
  const e = se(this);
  return Mi(e).has.call(e, t) || (e.add(t), Vt(e, "add", t, t)), this;
}
function rl(t, e) {
  e = se(e);
  const n = se(this),
    { has: r, get: i } = Mi(n);
  let s = r.call(n, t);
  s || ((t = se(t)), (s = r.call(n, t)));
  const o = i.call(n, t);
  return (
    n.set(t, e), s ? Mr(e, o) && Vt(n, "set", t, e) : Vt(n, "add", t, e), this
  );
}
function il(t) {
  const e = se(this),
    { has: n, get: r } = Mi(e);
  let i = n.call(e, t);
  i || ((t = se(t)), (i = n.call(e, t))), r && r.call(e, t);
  const s = e.delete(t);
  return i && Vt(e, "delete", t, void 0), s;
}
function sl() {
  const t = se(this),
    e = t.size !== 0,
    n = t.clear();
  return e && Vt(t, "clear", void 0, void 0), n;
}
function ni(t, e) {
  return function (r, i) {
    const s = this,
      o = s.__v_raw,
      l = se(o),
      u = e ? io : t ? lo : Ar;
    return (
      !t && et(l, "iterate", Rn), o.forEach((a, c) => r.call(i, u(a), u(c), s))
    );
  };
}
function ri(t, e, n) {
  return function (...r) {
    const i = this.__v_raw,
      s = se(i),
      o = qn(s),
      l = t === "entries" || (t === Symbol.iterator && o),
      u = t === "keys" && o,
      a = i[t](...r),
      c = n ? io : e ? lo : Ar;
    return (
      !e && et(s, "iterate", u ? ys : Rn),
      {
        next() {
          const { value: f, done: h } = a.next();
          return h
            ? { value: f, done: h }
            : { value: l ? [c(f[0]), c(f[1])] : c(f), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Gt(t) {
  return function (...e) {
    return t === "delete" ? !1 : this;
  };
}
function If() {
  const t = {
      get(s) {
        return Zr(this, s);
      },
      get size() {
        return ti(this);
      },
      has: ei,
      add: nl,
      set: rl,
      delete: il,
      clear: sl,
      forEach: ni(!1, !1),
    },
    e = {
      get(s) {
        return Zr(this, s, !1, !0);
      },
      get size() {
        return ti(this);
      },
      has: ei,
      add: nl,
      set: rl,
      delete: il,
      clear: sl,
      forEach: ni(!1, !0),
    },
    n = {
      get(s) {
        return Zr(this, s, !0);
      },
      get size() {
        return ti(this, !0);
      },
      has(s) {
        return ei.call(this, s, !0);
      },
      add: Gt("add"),
      set: Gt("set"),
      delete: Gt("delete"),
      clear: Gt("clear"),
      forEach: ni(!0, !1),
    },
    r = {
      get(s) {
        return Zr(this, s, !0, !0);
      },
      get size() {
        return ti(this, !0);
      },
      has(s) {
        return ei.call(this, s, !0);
      },
      add: Gt("add"),
      set: Gt("set"),
      delete: Gt("delete"),
      clear: Gt("clear"),
      forEach: ni(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      (t[s] = ri(s, !1, !1)),
        (n[s] = ri(s, !0, !1)),
        (e[s] = ri(s, !1, !0)),
        (r[s] = ri(s, !0, !0));
    }),
    [t, n, e, r]
  );
}
const [Df, Ff, Nf, $f] = If();
function so(t, e) {
  const n = e ? (t ? $f : Nf) : t ? Ff : Df;
  return (r, i, s) =>
    i === "__v_isReactive"
      ? !t
      : i === "__v_isReadonly"
      ? t
      : i === "__v_raw"
      ? r
      : Reflect.get(ae(n, i) && i in r ? n : r, i, s);
}
const zf = { get: so(!1, !1) },
  Bf = { get: so(!1, !0) },
  jf = { get: so(!0, !1) },
  Ma = new WeakMap(),
  Aa = new WeakMap(),
  La = new WeakMap(),
  Uf = new WeakMap();
function Hf(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Vf(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Hf(uf(t));
}
function Xt(t) {
  return Zn(t) ? t : oo(t, !1, Oa, zf, Ma);
}
function Wf(t) {
  return oo(t, !1, Lf, Bf, Aa);
}
function Ai(t) {
  return oo(t, !0, Af, jf, La);
}
function oo(t, e, n, r, i) {
  if (!ve(t) || (t.__v_raw && !(e && t.__v_isReactive))) return t;
  const s = i.get(t);
  if (s) return s;
  const o = Vf(t);
  if (o === 0) return t;
  const l = new Proxy(t, o === 2 ? r : n);
  return i.set(t, l), l;
}
function Kn(t) {
  return Zn(t) ? Kn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Zn(t) {
  return !!(t && t.__v_isReadonly);
}
function _i(t) {
  return !!(t && t.__v_isShallow);
}
function Ia(t) {
  return Kn(t) || Zn(t);
}
function se(t) {
  const e = t && t.__v_raw;
  return e ? se(e) : t;
}
function Da(t) {
  return di(t, "__v_skip", !0), t;
}
const Ar = (t) => (ve(t) ? Xt(t) : t),
  lo = (t) => (ve(t) ? Ai(t) : t);
function Fa(t) {
  ln && bt && ((t = se(t)), Ra(t.dep || (t.dep = to())));
}
function Na(t, e) {
  t = se(t);
  const n = t.dep;
  n && bs(n);
}
function ze(t) {
  return !!(t && t.__v_isRef === !0);
}
function Ce(t) {
  return $a(t, !1);
}
function qf(t) {
  return $a(t, !0);
}
function $a(t, e) {
  return ze(t) ? t : new Kf(t, e);
}
class Kf {
  constructor(e, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? e : se(e)),
      (this._value = n ? e : Ar(e));
  }
  get value() {
    return Fa(this), this._value;
  }
  set value(e) {
    const n = this.__v_isShallow || _i(e) || Zn(e);
    (e = n ? e : se(e)),
      Mr(e, this._rawValue) &&
        ((this._rawValue = e), (this._value = n ? e : Ar(e)), Na(this));
  }
}
function oe(t) {
  return ze(t) ? t.value : t;
}
const Xf = {
  get: (t, e, n) => oe(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const i = t[e];
    return ze(i) && !ze(n) ? ((i.value = n), !0) : Reflect.set(t, e, n, r);
  },
};
function za(t) {
  return Kn(t) ? t : new Proxy(t, Xf);
}
class Yf {
  constructor(e, n, r) {
    (this._object = e),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const e = this._object[this._key];
    return e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    this._object[this._key] = e;
  }
  get dep() {
    return bf(se(this._object), this._key);
  }
}
function Qm(t, e, n) {
  const r = t[e];
  return ze(r) ? r : new Yf(t, e, n);
}
var Ba;
class Gf {
  constructor(e, n, r, i) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[Ba] = !1),
      (this._dirty = !0),
      (this.effect = new no(e, () => {
        this._dirty || ((this._dirty = !0), Na(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !i),
      (this.__v_isReadonly = r);
  }
  get value() {
    const e = se(this);
    return (
      Fa(e),
      (e._dirty || !e._cacheable) &&
        ((e._dirty = !1), (e._value = e.effect.run())),
      e._value
    );
  }
  set value(e) {
    this._setter(e);
  }
}
Ba = "__v_isReadonly";
function Qf(t, e, n = !1) {
  let r, i;
  const s = te(t);
  return (
    s ? ((r = t), (i = Et)) : ((r = t.get), (i = t.set)),
    new Gf(r, i, s || !i, n)
  );
}
function an(t, e, n, r) {
  let i;
  try {
    i = r ? t(...r) : t();
  } catch (s) {
    Li(s, e, n);
  }
  return i;
}
function _t(t, e, n, r) {
  if (te(t)) {
    const s = an(t, e, n, r);
    return (
      s &&
        wa(s) &&
        s.catch((o) => {
          Li(o, e, n);
        }),
      s
    );
  }
  const i = [];
  for (let s = 0; s < t.length; s++) i.push(_t(t[s], e, n, r));
  return i;
}
function Li(t, e, n, r = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const o = e.proxy,
      l = n;
    for (; s; ) {
      const a = s.ec;
      if (a) {
        for (let c = 0; c < a.length; c++) if (a[c](t, o, l) === !1) return;
      }
      s = s.parent;
    }
    const u = e.appContext.config.errorHandler;
    if (u) {
      an(u, null, 10, [t, o, l]);
      return;
    }
  }
  Jf(t, n, i, r);
}
function Jf(t, e, n, r = !0) {
  console.error(t);
}
let Lr = !1,
  ws = !1;
const Ue = [];
let kt = 0;
const Xn = [];
let Bt = null,
  xn = 0;
const ja = Promise.resolve();
let ao = null;
function uo(t) {
  const e = ao || ja;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Zf(t) {
  let e = kt + 1,
    n = Ue.length;
  for (; e < n; ) {
    const r = (e + n) >>> 1;
    Ir(Ue[r]) < t ? (e = r + 1) : (n = r);
  }
  return e;
}
function co(t) {
  (!Ue.length || !Ue.includes(t, Lr && t.allowRecurse ? kt + 1 : kt)) &&
    (t.id == null ? Ue.push(t) : Ue.splice(Zf(t.id), 0, t), Ua());
}
function Ua() {
  !Lr && !ws && ((ws = !0), (ao = ja.then(Va)));
}
function eh(t) {
  const e = Ue.indexOf(t);
  e > kt && Ue.splice(e, 1);
}
function th(t) {
  J(t)
    ? Xn.push(...t)
    : (!Bt || !Bt.includes(t, t.allowRecurse ? xn + 1 : xn)) && Xn.push(t),
    Ua();
}
function ol(t, e = Lr ? kt + 1 : 0) {
  for (; e < Ue.length; e++) {
    const n = Ue[e];
    n && n.pre && (Ue.splice(e, 1), e--, n());
  }
}
function Ha(t) {
  if (Xn.length) {
    const e = [...new Set(Xn)];
    if (((Xn.length = 0), Bt)) {
      Bt.push(...e);
      return;
    }
    for (Bt = e, Bt.sort((n, r) => Ir(n) - Ir(r)), xn = 0; xn < Bt.length; xn++)
      Bt[xn]();
    (Bt = null), (xn = 0);
  }
}
const Ir = (t) => (t.id == null ? 1 / 0 : t.id),
  nh = (t, e) => {
    const n = Ir(t) - Ir(e);
    if (n === 0) {
      if (t.pre && !e.pre) return -1;
      if (e.pre && !t.pre) return 1;
    }
    return n;
  };
function Va(t) {
  (ws = !1), (Lr = !0), Ue.sort(nh);
  const e = Et;
  try {
    for (kt = 0; kt < Ue.length; kt++) {
      const n = Ue[kt];
      n && n.active !== !1 && an(n, null, 14);
    }
  } finally {
    (kt = 0),
      (Ue.length = 0),
      Ha(),
      (Lr = !1),
      (ao = null),
      (Ue.length || Xn.length) && Va();
  }
}
function rh(t, e, ...n) {
  if (t.isUnmounted) return;
  const r = t.vnode.props || ge;
  let i = n;
  const s = e.startsWith("update:"),
    o = s && e.slice(7);
  if (o && o in r) {
    const c = `${o === "modelValue" ? "model" : o}Modifiers`,
      { number: f, trim: h } = r[c] || ge;
    h && (i = n.map((p) => (Se(p) ? p.trim() : p))), f && (i = n.map(hf));
  }
  let l,
    u = r[(l = Yi(e))] || r[(l = Yi(Dt(e)))];
  !u && s && (u = r[(l = Yi(cr(e)))]), u && _t(u, t, 6, i);
  const a = r[l + "Once"];
  if (a) {
    if (!t.emitted) t.emitted = {};
    else if (t.emitted[l]) return;
    (t.emitted[l] = !0), _t(a, t, 6, i);
  }
}
function Wa(t, e, n = !1) {
  const r = e.emitsCache,
    i = r.get(t);
  if (i !== void 0) return i;
  const s = t.emits;
  let o = {},
    l = !1;
  if (!te(t)) {
    const u = (a) => {
      const c = Wa(a, e, !0);
      c && ((l = !0), Fe(o, c));
    };
    !n && e.mixins.length && e.mixins.forEach(u),
      t.extends && u(t.extends),
      t.mixins && t.mixins.forEach(u);
  }
  return !s && !l
    ? (ve(t) && r.set(t, null), null)
    : (J(s) ? s.forEach((u) => (o[u] = null)) : Fe(o, s),
      ve(t) && r.set(t, o),
      o);
}
function Ii(t, e) {
  return !t || !Si(e)
    ? !1
    : ((e = e.slice(2).replace(/Once$/, "")),
      ae(t, e[0].toLowerCase() + e.slice(1)) || ae(t, cr(e)) || ae(t, e));
}
let Be = null,
  Di = null;
function gi(t) {
  const e = Be;
  return (Be = t), (Di = (t && t.type.__scopeId) || null), e;
}
function qa(t) {
  Di = t;
}
function Ka() {
  Di = null;
}
function wt(t, e = Be, n) {
  if (!e || t._n) return t;
  const r = (...i) => {
    r._d && gl(-1);
    const s = gi(e);
    let o;
    try {
      o = t(...i);
    } finally {
      gi(s), r._d && gl(1);
    }
    return o;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Gi(t) {
  const {
    type: e,
    vnode: n,
    proxy: r,
    withProxy: i,
    props: s,
    propsOptions: [o],
    slots: l,
    attrs: u,
    emit: a,
    render: c,
    renderCache: f,
    data: h,
    setupState: p,
    ctx: g,
    inheritAttrs: d,
  } = t;
  let m, b;
  const v = gi(t);
  try {
    if (n.shapeFlag & 4) {
      const x = i || r;
      (m = St(c.call(x, x, f, s, p, h, g))), (b = u);
    } else {
      const x = e;
      (m = St(
        x.length > 1 ? x(s, { attrs: u, slots: l, emit: a }) : x(s, null)
      )),
        (b = e.props ? u : ih(u));
    }
  } catch (x) {
    (Cr.length = 0), Li(x, t, 1), (m = me(gt));
  }
  let w = m;
  if (b && d !== !1) {
    const x = Object.keys(b),
      { shapeFlag: T } = w;
    x.length && T & 7 && (o && x.some(Qs) && (b = sh(b, o)), (w = Wt(w, b)));
  }
  return (
    n.dirs && ((w = Wt(w)), (w.dirs = w.dirs ? w.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (w.transition = n.transition),
    (m = w),
    gi(v),
    m
  );
}
const ih = (t) => {
    let e;
    for (const n in t)
      (n === "class" || n === "style" || Si(n)) && ((e || (e = {}))[n] = t[n]);
    return e;
  },
  sh = (t, e) => {
    const n = {};
    for (const r in t) (!Qs(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
    return n;
  };
function oh(t, e, n) {
  const { props: r, children: i, component: s } = t,
    { props: o, children: l, patchFlag: u } = e,
    a = s.emitsOptions;
  if (e.dirs || e.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return r ? ll(r, o, a) : !!o;
    if (u & 8) {
      const c = e.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const h = c[f];
        if (o[h] !== r[h] && !Ii(a, h)) return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable)
      ? !0
      : r === o
      ? !1
      : r
      ? o
        ? ll(r, o, a)
        : !0
      : !!o;
  return !1;
}
function ll(t, e, n) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length) return !0;
  for (let i = 0; i < r.length; i++) {
    const s = r[i];
    if (e[s] !== t[s] && !Ii(n, s)) return !0;
  }
  return !1;
}
function lh({ vnode: t, parent: e }, n) {
  for (; e && e.subTree === t; ) ((t = e.vnode).el = n), (e = e.parent);
}
const Xa = (t) => t.__isSuspense;
function ah(t, e) {
  e && e.pendingBranch
    ? J(t)
      ? e.effects.push(...t)
      : e.effects.push(t)
    : th(t);
}
function li(t, e) {
  if (Me) {
    let n = Me.provides;
    const r = Me.parent && Me.parent.provides;
    r === n && (n = Me.provides = Object.create(r)), (n[t] = e);
  }
}
function Tt(t, e, n = !1) {
  const r = Me || Be;
  if (r) {
    const i =
      r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (i && t in i) return i[t];
    if (arguments.length > 1) return n && te(e) ? e.call(r.proxy) : e;
  }
}
const ii = {};
function Ht(t, e, n) {
  return Ya(t, e, n);
}
function Ya(
  t,
  e,
  { immediate: n, deep: r, flush: i, onTrack: s, onTrigger: o } = ge
) {
  const l = mf() === (Me == null ? void 0 : Me.scope) ? Me : null;
  let u,
    a = !1,
    c = !1;
  if (
    (ze(t)
      ? ((u = () => t.value), (a = _i(t)))
      : Kn(t)
      ? ((u = () => t), (r = !0))
      : J(t)
      ? ((c = !0),
        (a = t.some((w) => Kn(w) || _i(w))),
        (u = () =>
          t.map((w) => {
            if (ze(w)) return w.value;
            if (Kn(w)) return Tn(w);
            if (te(w)) return an(w, l, 2);
          })))
      : te(t)
      ? e
        ? (u = () => an(t, l, 2))
        : (u = () => {
            if (!(l && l.isUnmounted)) return f && f(), _t(t, l, 3, [h]);
          })
      : (u = Et),
    e && r)
  ) {
    const w = u;
    u = () => Tn(w());
  }
  let f,
    h = (w) => {
      f = b.onStop = () => {
        an(w, l, 4);
      };
    },
    p;
  if (zr)
    if (
      ((h = Et),
      e ? n && _t(e, l, 3, [u(), c ? [] : void 0, h]) : u(),
      i === "sync")
    ) {
      const w = td();
      p = w.__watcherHandles || (w.__watcherHandles = []);
    } else return Et;
  let g = c ? new Array(t.length).fill(ii) : ii;
  const d = () => {
    if (b.active)
      if (e) {
        const w = b.run();
        (r || a || (c ? w.some((x, T) => Mr(x, g[T])) : Mr(w, g))) &&
          (f && f(),
          _t(e, l, 3, [w, g === ii ? void 0 : c && g[0] === ii ? [] : g, h]),
          (g = w));
      } else b.run();
  };
  d.allowRecurse = !!e;
  let m;
  i === "sync"
    ? (m = d)
    : i === "post"
    ? (m = () => $e(d, l && l.suspense))
    : ((d.pre = !0), l && (d.id = l.uid), (m = () => co(d)));
  const b = new no(u, m);
  e
    ? n
      ? d()
      : (g = b.run())
    : i === "post"
    ? $e(b.run.bind(b), l && l.suspense)
    : b.run();
  const v = () => {
    b.stop(), l && l.scope && Js(l.scope.effects, b);
  };
  return p && p.push(v), v;
}
function uh(t, e, n) {
  const r = this.proxy,
    i = Se(t) ? (t.includes(".") ? Ga(r, t) : () => r[t]) : t.bind(r, r);
  let s;
  te(e) ? (s = e) : ((s = e.handler), (n = e));
  const o = Me;
  nr(this);
  const l = Ya(i, s.bind(r), n);
  return o ? nr(o) : kn(), l;
}
function Ga(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let i = 0; i < n.length && r; i++) r = r[n[i]];
    return r;
  };
}
function Tn(t, e) {
  if (!ve(t) || t.__v_skip || ((e = e || new Set()), e.has(t))) return t;
  if ((e.add(t), ze(t))) Tn(t.value, e);
  else if (J(t)) for (let n = 0; n < t.length; n++) Tn(t[n], e);
  else if (ba(t) || qn(t))
    t.forEach((n) => {
      Tn(n, e);
    });
  else if (Ea(t)) for (const n in t) Tn(t[n], e);
  return t;
}
function Qa() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    tr(() => {
      t.isMounted = !0;
    }),
    po(() => {
      t.isUnmounting = !0;
    }),
    t
  );
}
const ut = [Function, Array],
  ch = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: ut,
      onEnter: ut,
      onAfterEnter: ut,
      onEnterCancelled: ut,
      onBeforeLeave: ut,
      onLeave: ut,
      onAfterLeave: ut,
      onLeaveCancelled: ut,
      onBeforeAppear: ut,
      onAppear: ut,
      onAfterAppear: ut,
      onAppearCancelled: ut,
    },
    setup(t, { slots: e }) {
      const n = bo(),
        r = Qa();
      let i;
      return () => {
        const s = e.default && fo(e.default(), !0);
        if (!s || !s.length) return;
        let o = s[0];
        if (s.length > 1) {
          for (const d of s)
            if (d.type !== gt) {
              o = d;
              break;
            }
        }
        const l = se(t),
          { mode: u } = l;
        if (r.isLeaving) return Qi(o);
        const a = al(o);
        if (!a) return Qi(o);
        const c = Dr(a, l, r, n);
        er(a, c);
        const f = n.subTree,
          h = f && al(f);
        let p = !1;
        const { getTransitionKey: g } = a.type;
        if (g) {
          const d = g();
          i === void 0 ? (i = d) : d !== i && ((i = d), (p = !0));
        }
        if (h && h.type !== gt && (!nn(a, h) || p)) {
          const d = Dr(h, l, r, n);
          if ((er(h, d), u === "out-in"))
            return (
              (r.isLeaving = !0),
              (d.afterLeave = () => {
                (r.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              Qi(o)
            );
          u === "in-out" &&
            a.type !== gt &&
            (d.delayLeave = (m, b, v) => {
              const w = Ja(r, h);
              (w[String(h.key)] = h),
                (m._leaveCb = () => {
                  b(), (m._leaveCb = void 0), delete c.delayedLeave;
                }),
                (c.delayedLeave = v);
            });
        }
        return o;
      };
    },
  },
  fh = ch;
function Ja(t, e) {
  const { leavingVNodes: n } = t;
  let r = n.get(e.type);
  return r || ((r = Object.create(null)), n.set(e.type, r)), r;
}
function Dr(t, e, n, r) {
  const {
      appear: i,
      mode: s,
      persisted: o = !1,
      onBeforeEnter: l,
      onEnter: u,
      onAfterEnter: a,
      onEnterCancelled: c,
      onBeforeLeave: f,
      onLeave: h,
      onAfterLeave: p,
      onLeaveCancelled: g,
      onBeforeAppear: d,
      onAppear: m,
      onAfterAppear: b,
      onAppearCancelled: v,
    } = e,
    w = String(t.key),
    x = Ja(n, t),
    T = (P, R) => {
      P && _t(P, r, 9, R);
    },
    k = (P, R) => {
      const U = R[1];
      T(P, R),
        J(P) ? P.every((O) => O.length <= 1) && U() : P.length <= 1 && U();
    },
    A = {
      mode: s,
      persisted: o,
      beforeEnter(P) {
        let R = l;
        if (!n.isMounted)
          if (i) R = d || l;
          else return;
        P._leaveCb && P._leaveCb(!0);
        const U = x[w];
        U && nn(t, U) && U.el._leaveCb && U.el._leaveCb(), T(R, [P]);
      },
      enter(P) {
        let R = u,
          U = a,
          O = c;
        if (!n.isMounted)
          if (i) (R = m || u), (U = b || a), (O = v || c);
          else return;
        let E = !1;
        const I = (P._enterCb = (D) => {
          E ||
            ((E = !0),
            D ? T(O, [P]) : T(U, [P]),
            A.delayedLeave && A.delayedLeave(),
            (P._enterCb = void 0));
        });
        R ? k(R, [P, I]) : I();
      },
      leave(P, R) {
        const U = String(t.key);
        if ((P._enterCb && P._enterCb(!0), n.isUnmounting)) return R();
        T(f, [P]);
        let O = !1;
        const E = (P._leaveCb = (I) => {
          O ||
            ((O = !0),
            R(),
            I ? T(g, [P]) : T(p, [P]),
            (P._leaveCb = void 0),
            x[U] === t && delete x[U]);
        });
        (x[U] = t), h ? k(h, [P, E]) : E();
      },
      clone(P) {
        return Dr(P, e, n, r);
      },
    };
  return A;
}
function Qi(t) {
  if (Fi(t)) return (t = Wt(t)), (t.children = null), t;
}
function al(t) {
  return Fi(t) ? (t.children ? t.children[0] : void 0) : t;
}
function er(t, e) {
  t.shapeFlag & 6 && t.component
    ? er(t.component.subTree, e)
    : t.shapeFlag & 128
    ? ((t.ssContent.transition = e.clone(t.ssContent)),
      (t.ssFallback.transition = e.clone(t.ssFallback)))
    : (t.transition = e);
}
function fo(t, e = !1, n) {
  let r = [],
    i = 0;
  for (let s = 0; s < t.length; s++) {
    let o = t[s];
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : s);
    o.type === Pe
      ? (o.patchFlag & 128 && i++, (r = r.concat(fo(o.children, e, l))))
      : (e || o.type !== gt) && r.push(l != null ? Wt(o, { key: l }) : o);
  }
  if (i > 1) for (let s = 0; s < r.length; s++) r[s].patchFlag = -2;
  return r;
}
function Za(t) {
  return te(t) ? { setup: t, name: t.name } : t;
}
const Yn = (t) => !!t.type.__asyncLoader,
  Fi = (t) => t.type.__isKeepAlive,
  hh = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number],
    },
    setup(t, { slots: e }) {
      const n = bo(),
        r = n.ctx;
      if (!r.renderer)
        return () => {
          const v = e.default && e.default();
          return v && v.length === 1 ? v[0] : v;
        };
      const i = new Map(),
        s = new Set();
      let o = null;
      const l = n.suspense,
        {
          renderer: {
            p: u,
            m: a,
            um: c,
            o: { createElement: f },
          },
        } = r,
        h = f("div");
      (r.activate = (v, w, x, T, k) => {
        const A = v.component;
        a(v, w, x, 0, l),
          u(A.vnode, v, w, x, A, l, T, v.slotScopeIds, k),
          $e(() => {
            (A.isDeactivated = !1), A.a && Er(A.a);
            const P = v.props && v.props.onVnodeMounted;
            P && ct(P, A.parent, v);
          }, l);
      }),
        (r.deactivate = (v) => {
          const w = v.component;
          a(v, h, null, 1, l),
            $e(() => {
              w.da && Er(w.da);
              const x = v.props && v.props.onVnodeUnmounted;
              x && ct(x, w.parent, v), (w.isDeactivated = !0);
            }, l);
        });
      function p(v) {
        Ji(v), c(v, n, l, !0);
      }
      function g(v) {
        i.forEach((w, x) => {
          const T = Ss(w.type);
          T && (!v || !v(T)) && d(x);
        });
      }
      function d(v) {
        const w = i.get(v);
        !o || !nn(w, o) ? p(w) : o && Ji(o), i.delete(v), s.delete(v);
      }
      Ht(
        () => [t.include, t.exclude],
        ([v, w]) => {
          v && g((x) => yr(v, x)), w && g((x) => !yr(w, x));
        },
        { flush: "post", deep: !0 }
      );
      let m = null;
      const b = () => {
        m != null && i.set(m, Zi(n.subTree));
      };
      return (
        tr(b),
        ho(b),
        po(() => {
          i.forEach((v) => {
            const { subTree: w, suspense: x } = n,
              T = Zi(w);
            if (v.type === T.type && v.key === T.key) {
              Ji(T);
              const k = T.component.da;
              k && $e(k, x);
              return;
            }
            p(v);
          });
        }),
        () => {
          if (((m = null), !e.default)) return null;
          const v = e.default(),
            w = v[0];
          if (v.length > 1) return (o = null), v;
          if (!$r(w) || (!(w.shapeFlag & 4) && !(w.shapeFlag & 128)))
            return (o = null), w;
          let x = Zi(w);
          const T = x.type,
            k = Ss(Yn(x) ? x.type.__asyncResolved || {} : T),
            { include: A, exclude: P, max: R } = t;
          if ((A && (!k || !yr(A, k))) || (P && k && yr(P, k)))
            return (o = x), w;
          const U = x.key == null ? T : x.key,
            O = i.get(U);
          return (
            x.el && ((x = Wt(x)), w.shapeFlag & 128 && (w.ssContent = x)),
            (m = U),
            O
              ? ((x.el = O.el),
                (x.component = O.component),
                x.transition && er(x, x.transition),
                (x.shapeFlag |= 512),
                s.delete(U),
                s.add(U))
              : (s.add(U),
                R && s.size > parseInt(R, 10) && d(s.values().next().value)),
            (x.shapeFlag |= 256),
            (o = x),
            Xa(w.type) ? w : x
          );
        }
      );
    },
  },
  dh = hh;
function yr(t, e) {
  return J(t)
    ? t.some((n) => yr(n, e))
    : Se(t)
    ? t.split(",").includes(e)
    : af(t)
    ? t.test(e)
    : !1;
}
function eu(t, e) {
  tu(t, "a", e);
}
function ph(t, e) {
  tu(t, "da", e);
}
function tu(t, e, n = Me) {
  const r =
    t.__wdc ||
    (t.__wdc = () => {
      let i = n;
      for (; i; ) {
        if (i.isDeactivated) return;
        i = i.parent;
      }
      return t();
    });
  if ((Ni(e, r, n), n)) {
    let i = n.parent;
    for (; i && i.parent; )
      Fi(i.parent.vnode) && _h(r, e, n, i), (i = i.parent);
  }
}
function _h(t, e, n, r) {
  const i = Ni(e, t, r, !0);
  $i(() => {
    Js(r[e], i);
  }, n);
}
function Ji(t) {
  (t.shapeFlag &= -257), (t.shapeFlag &= -513);
}
function Zi(t) {
  return t.shapeFlag & 128 ? t.ssContent : t;
}
function Ni(t, e, n = Me, r = !1) {
  if (n) {
    const i = n[t] || (n[t] = []),
      s =
        e.__weh ||
        (e.__weh = (...o) => {
          if (n.isUnmounted) return;
          fr(), nr(n);
          const l = _t(e, n, t, o);
          return kn(), hr(), l;
        });
    return r ? i.unshift(s) : i.push(s), s;
  }
}
const Yt =
    (t) =>
    (e, n = Me) =>
      (!zr || t === "sp") && Ni(t, (...r) => e(...r), n),
  gh = Yt("bm"),
  tr = Yt("m"),
  mh = Yt("bu"),
  ho = Yt("u"),
  po = Yt("bum"),
  $i = Yt("um"),
  vh = Yt("sp"),
  yh = Yt("rtg"),
  bh = Yt("rtc");
function wh(t, e = Me) {
  Ni("ec", t, e);
}
function br(t, e) {
  const n = Be;
  if (n === null) return t;
  const r = ji(n) || n.proxy,
    i = t.dirs || (t.dirs = []);
  for (let s = 0; s < e.length; s++) {
    let [o, l, u, a = ge] = e[s];
    o &&
      (te(o) && (o = { mounted: o, updated: o }),
      o.deep && Tn(l),
      i.push({
        dir: o,
        instance: r,
        value: l,
        oldValue: void 0,
        arg: u,
        modifiers: a,
      }));
  }
  return t;
}
function _n(t, e, n, r) {
  const i = t.dirs,
    s = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    s && (l.oldValue = s[o].value);
    let u = l.dir[r];
    u && (fr(), _t(u, n, 8, [t.el, l, t, e]), hr());
  }
}
const _o = "components",
  xh = "directives";
function mi(t, e) {
  return go(_o, t, !0, e) || t;
}
const nu = Symbol();
function Eh(t) {
  return Se(t) ? go(_o, t, !1) || t : t || nu;
}
function ru(t) {
  return go(xh, t);
}
function go(t, e, n = !0, r = !1) {
  const i = Be || Me;
  if (i) {
    const s = i.type;
    if (t === _o) {
      const l = Ss(s, !1);
      if (l && (l === e || l === Dt(e) || l === Oi(Dt(e)))) return s;
    }
    const o = ul(i[t] || s[t], e) || ul(i.appContext[t], e);
    return !o && r ? s : o;
  }
}
function ul(t, e) {
  return t && (t[e] || t[Dt(e)] || t[Oi(Dt(e))]);
}
function Fr(t, e, n, r) {
  let i;
  const s = n && n[r];
  if (J(t) || Se(t)) {
    i = new Array(t.length);
    for (let o = 0, l = t.length; o < l; o++)
      i[o] = e(t[o], o, void 0, s && s[o]);
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let o = 0; o < t; o++) i[o] = e(o + 1, o, void 0, s && s[o]);
  } else if (ve(t))
    if (t[Symbol.iterator])
      i = Array.from(t, (o, l) => e(o, l, void 0, s && s[l]));
    else {
      const o = Object.keys(t);
      i = new Array(o.length);
      for (let l = 0, u = o.length; l < u; l++) {
        const a = o[l];
        i[l] = e(t[a], a, l, s && s[l]);
      }
    }
  else i = [];
  return n && (n[r] = i), i;
}
function Th(t, e, n = {}, r, i) {
  if (Be.isCE || (Be.parent && Yn(Be.parent) && Be.parent.isCE))
    return e !== "default" && (n.name = e), me("slot", n, r && r());
  let s = t[e];
  s && s._c && (s._d = !1), fe();
  const o = s && iu(s(n)),
    l = Sn(
      Pe,
      { key: n.key || (o && o.key) || `_${e}` },
      o || (r ? r() : []),
      o && t._ === 1 ? 64 : -2
    );
  return (
    !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    s && s._c && (s._d = !0),
    l
  );
}
function iu(t) {
  return t.some((e) =>
    $r(e) ? !(e.type === gt || (e.type === Pe && !iu(e.children))) : !0
  )
    ? t
    : null;
}
const xs = (t) => (t ? (_u(t) ? ji(t) || t.proxy : xs(t.parent)) : null),
  Tr = Fe(Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => xs(t.parent),
    $root: (t) => xs(t.root),
    $emit: (t) => t.emit,
    $options: (t) => mo(t),
    $forceUpdate: (t) => t.f || (t.f = () => co(t.update)),
    $nextTick: (t) => t.n || (t.n = uo.bind(t.proxy)),
    $watch: (t) => uh.bind(t),
  }),
  es = (t, e) => t !== ge && !t.__isScriptSetup && ae(t, e),
  Ch = {
    get({ _: t }, e) {
      const {
        ctx: n,
        setupState: r,
        data: i,
        props: s,
        accessCache: o,
        type: l,
        appContext: u,
      } = t;
      let a;
      if (e[0] !== "$") {
        const p = o[e];
        if (p !== void 0)
          switch (p) {
            case 1:
              return r[e];
            case 2:
              return i[e];
            case 4:
              return n[e];
            case 3:
              return s[e];
          }
        else {
          if (es(r, e)) return (o[e] = 1), r[e];
          if (i !== ge && ae(i, e)) return (o[e] = 2), i[e];
          if ((a = t.propsOptions[0]) && ae(a, e)) return (o[e] = 3), s[e];
          if (n !== ge && ae(n, e)) return (o[e] = 4), n[e];
          Es && (o[e] = 0);
        }
      }
      const c = Tr[e];
      let f, h;
      if (c) return e === "$attrs" && et(t, "get", e), c(t);
      if ((f = l.__cssModules) && (f = f[e])) return f;
      if (n !== ge && ae(n, e)) return (o[e] = 4), n[e];
      if (((h = u.config.globalProperties), ae(h, e))) return h[e];
    },
    set({ _: t }, e, n) {
      const { data: r, setupState: i, ctx: s } = t;
      return es(i, e)
        ? ((i[e] = n), !0)
        : r !== ge && ae(r, e)
        ? ((r[e] = n), !0)
        : ae(t.props, e) || (e[0] === "$" && e.slice(1) in t)
        ? !1
        : ((s[e] = n), !0);
    },
    has(
      {
        _: {
          data: t,
          setupState: e,
          accessCache: n,
          ctx: r,
          appContext: i,
          propsOptions: s,
        },
      },
      o
    ) {
      let l;
      return (
        !!n[o] ||
        (t !== ge && ae(t, o)) ||
        es(e, o) ||
        ((l = s[0]) && ae(l, o)) ||
        ae(r, o) ||
        ae(Tr, o) ||
        ae(i.config.globalProperties, o)
      );
    },
    defineProperty(t, e, n) {
      return (
        n.get != null
          ? (t._.accessCache[e] = 0)
          : ae(n, "value") && this.set(t, e, n.value, null),
        Reflect.defineProperty(t, e, n)
      );
    },
  };
let Es = !0;
function Ph(t) {
  const e = mo(t),
    n = t.proxy,
    r = t.ctx;
  (Es = !1), e.beforeCreate && cl(e.beforeCreate, t, "bc");
  const {
    data: i,
    computed: s,
    methods: o,
    watch: l,
    provide: u,
    inject: a,
    created: c,
    beforeMount: f,
    mounted: h,
    beforeUpdate: p,
    updated: g,
    activated: d,
    deactivated: m,
    beforeDestroy: b,
    beforeUnmount: v,
    destroyed: w,
    unmounted: x,
    render: T,
    renderTracked: k,
    renderTriggered: A,
    errorCaptured: P,
    serverPrefetch: R,
    expose: U,
    inheritAttrs: O,
    components: E,
    directives: I,
    filters: D,
  } = e;
  if ((a && Rh(a, r, null, t.appContext.config.unwrapInjectedRef), o))
    for (const q in o) {
      const X = o[q];
      te(X) && (r[q] = X.bind(n));
    }
  if (i) {
    const q = i.call(n, n);
    ve(q) && (t.data = Xt(q));
  }
  if (((Es = !0), s))
    for (const q in s) {
      const X = s[q],
        Ee = te(X) ? X.bind(n, n) : te(X.get) ? X.get.bind(n, n) : Et,
        _e = !te(X) && te(X.set) ? X.set.bind(n) : Et,
        Ie = Ye({ get: Ee, set: _e });
      Object.defineProperty(r, q, {
        enumerable: !0,
        configurable: !0,
        get: () => Ie.value,
        set: (Te) => (Ie.value = Te),
      });
    }
  if (l) for (const q in l) su(l[q], r, n, q);
  if (u) {
    const q = te(u) ? u.call(n) : u;
    Reflect.ownKeys(q).forEach((X) => {
      li(X, q[X]);
    });
  }
  c && cl(c, t, "c");
  function z(q, X) {
    J(X) ? X.forEach((Ee) => q(Ee.bind(n))) : X && q(X.bind(n));
  }
  if (
    (z(gh, f),
    z(tr, h),
    z(mh, p),
    z(ho, g),
    z(eu, d),
    z(ph, m),
    z(wh, P),
    z(bh, k),
    z(yh, A),
    z(po, v),
    z($i, x),
    z(vh, R),
    J(U))
  )
    if (U.length) {
      const q = t.exposed || (t.exposed = {});
      U.forEach((X) => {
        Object.defineProperty(q, X, {
          get: () => n[X],
          set: (Ee) => (n[X] = Ee),
        });
      });
    } else t.exposed || (t.exposed = {});
  T && t.render === Et && (t.render = T),
    O != null && (t.inheritAttrs = O),
    E && (t.components = E),
    I && (t.directives = I);
}
function Rh(t, e, n = Et, r = !1) {
  J(t) && (t = Ts(t));
  for (const i in t) {
    const s = t[i];
    let o;
    ve(s)
      ? "default" in s
        ? (o = Tt(s.from || i, s.default, !0))
        : (o = Tt(s.from || i))
      : (o = Tt(s)),
      ze(o) && r
        ? Object.defineProperty(e, i, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (l) => (o.value = l),
          })
        : (e[i] = o);
  }
}
function cl(t, e, n) {
  _t(J(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy), e, n);
}
function su(t, e, n, r) {
  const i = r.includes(".") ? Ga(n, r) : () => n[r];
  if (Se(t)) {
    const s = e[t];
    te(s) && Ht(i, s);
  } else if (te(t)) Ht(i, t.bind(n));
  else if (ve(t))
    if (J(t)) t.forEach((s) => su(s, e, n, r));
    else {
      const s = te(t.handler) ? t.handler.bind(n) : e[t.handler];
      te(s) && Ht(i, s, t);
    }
}
function mo(t) {
  const e = t.type,
    { mixins: n, extends: r } = e,
    {
      mixins: i,
      optionsCache: s,
      config: { optionMergeStrategies: o },
    } = t.appContext,
    l = s.get(e);
  let u;
  return (
    l
      ? (u = l)
      : !i.length && !n && !r
      ? (u = e)
      : ((u = {}), i.length && i.forEach((a) => vi(u, a, o, !0)), vi(u, e, o)),
    ve(e) && s.set(e, u),
    u
  );
}
function vi(t, e, n, r = !1) {
  const { mixins: i, extends: s } = e;
  s && vi(t, s, n, !0), i && i.forEach((o) => vi(t, o, n, !0));
  for (const o in e)
    if (!(r && o === "expose")) {
      const l = Sh[o] || (n && n[o]);
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const Sh = {
  data: fl,
  props: bn,
  emits: bn,
  methods: bn,
  computed: bn,
  beforeCreate: qe,
  created: qe,
  beforeMount: qe,
  mounted: qe,
  beforeUpdate: qe,
  updated: qe,
  beforeDestroy: qe,
  beforeUnmount: qe,
  destroyed: qe,
  unmounted: qe,
  activated: qe,
  deactivated: qe,
  errorCaptured: qe,
  serverPrefetch: qe,
  components: bn,
  directives: bn,
  watch: Oh,
  provide: fl,
  inject: kh,
};
function fl(t, e) {
  return e
    ? t
      ? function () {
          return Fe(
            te(t) ? t.call(this, this) : t,
            te(e) ? e.call(this, this) : e
          );
        }
      : e
    : t;
}
function kh(t, e) {
  return bn(Ts(t), Ts(e));
}
function Ts(t) {
  if (J(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) e[t[n]] = t[n];
    return e;
  }
  return t;
}
function qe(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function bn(t, e) {
  return t ? Fe(Fe(Object.create(null), t), e) : e;
}
function Oh(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = Fe(Object.create(null), t);
  for (const r in e) n[r] = qe(t[r], e[r]);
  return n;
}
function Mh(t, e, n, r = !1) {
  const i = {},
    s = {};
  di(s, Bi, 1), (t.propsDefaults = Object.create(null)), ou(t, e, i, s);
  for (const o in t.propsOptions[0]) o in i || (i[o] = void 0);
  n ? (t.props = r ? i : Wf(i)) : t.type.props ? (t.props = i) : (t.props = s),
    (t.attrs = s);
}
function Ah(t, e, n, r) {
  const {
      props: i,
      attrs: s,
      vnode: { patchFlag: o },
    } = t,
    l = se(i),
    [u] = t.propsOptions;
  let a = !1;
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      const c = t.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let h = c[f];
        if (Ii(t.emitsOptions, h)) continue;
        const p = e[h];
        if (u)
          if (ae(s, h)) p !== s[h] && ((s[h] = p), (a = !0));
          else {
            const g = Dt(h);
            i[g] = Cs(u, l, g, p, t, !1);
          }
        else p !== s[h] && ((s[h] = p), (a = !0));
      }
    }
  } else {
    ou(t, e, i, s) && (a = !0);
    let c;
    for (const f in l)
      (!e || (!ae(e, f) && ((c = cr(f)) === f || !ae(e, c)))) &&
        (u
          ? n &&
            (n[f] !== void 0 || n[c] !== void 0) &&
            (i[f] = Cs(u, l, f, void 0, t, !0))
          : delete i[f]);
    if (s !== l)
      for (const f in s) (!e || !ae(e, f)) && (delete s[f], (a = !0));
  }
  a && Vt(t, "set", "$attrs");
}
function ou(t, e, n, r) {
  const [i, s] = t.propsOptions;
  let o = !1,
    l;
  if (e)
    for (let u in e) {
      if (oi(u)) continue;
      const a = e[u];
      let c;
      i && ae(i, (c = Dt(u)))
        ? !s || !s.includes(c)
          ? (n[c] = a)
          : ((l || (l = {}))[c] = a)
        : Ii(t.emitsOptions, u) ||
          ((!(u in r) || a !== r[u]) && ((r[u] = a), (o = !0)));
    }
  if (s) {
    const u = se(n),
      a = l || ge;
    for (let c = 0; c < s.length; c++) {
      const f = s[c];
      n[f] = Cs(i, u, f, a[f], t, !ae(a, f));
    }
  }
  return o;
}
function Cs(t, e, n, r, i, s) {
  const o = t[n];
  if (o != null) {
    const l = ae(o, "default");
    if (l && r === void 0) {
      const u = o.default;
      if (o.type !== Function && te(u)) {
        const { propsDefaults: a } = i;
        n in a ? (r = a[n]) : (nr(i), (r = a[n] = u.call(null, e)), kn());
      } else r = u;
    }
    o[0] &&
      (s && !l ? (r = !1) : o[1] && (r === "" || r === cr(n)) && (r = !0));
  }
  return r;
}
function lu(t, e, n = !1) {
  const r = e.propsCache,
    i = r.get(t);
  if (i) return i;
  const s = t.props,
    o = {},
    l = [];
  let u = !1;
  if (!te(t)) {
    const c = (f) => {
      u = !0;
      const [h, p] = lu(f, e, !0);
      Fe(o, h), p && l.push(...p);
    };
    !n && e.mixins.length && e.mixins.forEach(c),
      t.extends && c(t.extends),
      t.mixins && t.mixins.forEach(c);
  }
  if (!s && !u) return ve(t) && r.set(t, Wn), Wn;
  if (J(s))
    for (let c = 0; c < s.length; c++) {
      const f = Dt(s[c]);
      hl(f) && (o[f] = ge);
    }
  else if (s)
    for (const c in s) {
      const f = Dt(c);
      if (hl(f)) {
        const h = s[c],
          p = (o[f] = J(h) || te(h) ? { type: h } : Object.assign({}, h));
        if (p) {
          const g = _l(Boolean, p.type),
            d = _l(String, p.type);
          (p[0] = g > -1),
            (p[1] = d < 0 || g < d),
            (g > -1 || ae(p, "default")) && l.push(f);
        }
      }
    }
  const a = [o, l];
  return ve(t) && r.set(t, a), a;
}
function hl(t) {
  return t[0] !== "$";
}
function dl(t) {
  const e = t && t.toString().match(/^\s*(function|class) (\w+)/);
  return e ? e[2] : t === null ? "null" : "";
}
function pl(t, e) {
  return dl(t) === dl(e);
}
function _l(t, e) {
  return J(e) ? e.findIndex((n) => pl(n, t)) : te(e) && pl(e, t) ? 0 : -1;
}
const au = (t) => t[0] === "_" || t === "$stable",
  vo = (t) => (J(t) ? t.map(St) : [St(t)]),
  Lh = (t, e, n) => {
    if (e._n) return e;
    const r = wt((...i) => vo(e(...i)), n);
    return (r._c = !1), r;
  },
  uu = (t, e, n) => {
    const r = t._ctx;
    for (const i in t) {
      if (au(i)) continue;
      const s = t[i];
      if (te(s)) e[i] = Lh(i, s, r);
      else if (s != null) {
        const o = vo(s);
        e[i] = () => o;
      }
    }
  },
  cu = (t, e) => {
    const n = vo(e);
    t.slots.default = () => n;
  },
  Ih = (t, e) => {
    if (t.vnode.shapeFlag & 32) {
      const n = e._;
      n ? ((t.slots = se(e)), di(e, "_", n)) : uu(e, (t.slots = {}));
    } else (t.slots = {}), e && cu(t, e);
    di(t.slots, Bi, 1);
  },
  Dh = (t, e, n) => {
    const { vnode: r, slots: i } = t;
    let s = !0,
      o = ge;
    if (r.shapeFlag & 32) {
      const l = e._;
      l
        ? n && l === 1
          ? (s = !1)
          : (Fe(i, e), !n && l === 1 && delete i._)
        : ((s = !e.$stable), uu(e, i)),
        (o = e);
    } else e && (cu(t, e), (o = { default: 1 }));
    if (s) for (const l in i) !au(l) && !(l in o) && delete i[l];
  };
function fu() {
  return {
    app: null,
    config: {
      isNativeTag: sf,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Fh = 0;
function Nh(t, e) {
  return function (r, i = null) {
    te(r) || (r = Object.assign({}, r)), i != null && !ve(i) && (i = null);
    const s = fu(),
      o = new Set();
    let l = !1;
    const u = (s.app = {
      _uid: Fh++,
      _component: r,
      _props: i,
      _container: null,
      _context: s,
      _instance: null,
      version: nd,
      get config() {
        return s.config;
      },
      set config(a) {},
      use(a, ...c) {
        return (
          o.has(a) ||
            (a && te(a.install)
              ? (o.add(a), a.install(u, ...c))
              : te(a) && (o.add(a), a(u, ...c))),
          u
        );
      },
      mixin(a) {
        return s.mixins.includes(a) || s.mixins.push(a), u;
      },
      component(a, c) {
        return c ? ((s.components[a] = c), u) : s.components[a];
      },
      directive(a, c) {
        return c ? ((s.directives[a] = c), u) : s.directives[a];
      },
      mount(a, c, f) {
        if (!l) {
          const h = me(r, i);
          return (
            (h.appContext = s),
            c && e ? e(h, a) : t(h, a, f),
            (l = !0),
            (u._container = a),
            (a.__vue_app__ = u),
            ji(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        l && (t(null, u._container), delete u._container.__vue_app__);
      },
      provide(a, c) {
        return (s.provides[a] = c), u;
      },
    });
    return u;
  };
}
function Ps(t, e, n, r, i = !1) {
  if (J(t)) {
    t.forEach((h, p) => Ps(h, e && (J(e) ? e[p] : e), n, r, i));
    return;
  }
  if (Yn(r) && !i) return;
  const s = r.shapeFlag & 4 ? ji(r.component) || r.component.proxy : r.el,
    o = i ? null : s,
    { i: l, r: u } = t,
    a = e && e.r,
    c = l.refs === ge ? (l.refs = {}) : l.refs,
    f = l.setupState;
  if (
    (a != null &&
      a !== u &&
      (Se(a)
        ? ((c[a] = null), ae(f, a) && (f[a] = null))
        : ze(a) && (a.value = null)),
    te(u))
  )
    an(u, l, 12, [o, c]);
  else {
    const h = Se(u),
      p = ze(u);
    if (h || p) {
      const g = () => {
        if (t.f) {
          const d = h ? (ae(f, u) ? f[u] : c[u]) : u.value;
          i
            ? J(d) && Js(d, s)
            : J(d)
            ? d.includes(s) || d.push(s)
            : h
            ? ((c[u] = [s]), ae(f, u) && (f[u] = c[u]))
            : ((u.value = [s]), t.k && (c[t.k] = u.value));
        } else
          h
            ? ((c[u] = o), ae(f, u) && (f[u] = o))
            : p && ((u.value = o), t.k && (c[t.k] = o));
      };
      o ? ((g.id = -1), $e(g, n)) : g();
    }
  }
}
const $e = ah;
function $h(t) {
  return zh(t);
}
function zh(t, e) {
  const n = pf();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: i,
      patchProp: s,
      createElement: o,
      createText: l,
      createComment: u,
      setText: a,
      setElementText: c,
      parentNode: f,
      nextSibling: h,
      setScopeId: p = Et,
      insertStaticContent: g,
    } = t,
    d = (
      _,
      y,
      C,
      S = null,
      L = null,
      $ = null,
      V = !1,
      N = null,
      B = !!y.dynamicChildren
    ) => {
      if (_ === y) return;
      _ && !nn(_, y) && ((S = H(_)), Te(_, L, $, !0), (_ = null)),
        y.patchFlag === -2 && ((B = !1), (y.dynamicChildren = null));
      const { type: F, ref: G, shapeFlag: K } = y;
      switch (F) {
        case zi:
          m(_, y, C, S);
          break;
        case gt:
          b(_, y, C, S);
          break;
        case ts:
          _ == null && v(y, C, S, V);
          break;
        case Pe:
          E(_, y, C, S, L, $, V, N, B);
          break;
        default:
          K & 1
            ? T(_, y, C, S, L, $, V, N, B)
            : K & 6
            ? I(_, y, C, S, L, $, V, N, B)
            : (K & 64 || K & 128) && F.process(_, y, C, S, L, $, V, N, B, le);
      }
      G != null && L && Ps(G, _ && _.ref, $, y || _, !y);
    },
    m = (_, y, C, S) => {
      if (_ == null) r((y.el = l(y.children)), C, S);
      else {
        const L = (y.el = _.el);
        y.children !== _.children && a(L, y.children);
      }
    },
    b = (_, y, C, S) => {
      _ == null ? r((y.el = u(y.children || "")), C, S) : (y.el = _.el);
    },
    v = (_, y, C, S) => {
      [_.el, _.anchor] = g(_.children, y, C, S, _.el, _.anchor);
    },
    w = ({ el: _, anchor: y }, C, S) => {
      let L;
      for (; _ && _ !== y; ) (L = h(_)), r(_, C, S), (_ = L);
      r(y, C, S);
    },
    x = ({ el: _, anchor: y }) => {
      let C;
      for (; _ && _ !== y; ) (C = h(_)), i(_), (_ = C);
      i(y);
    },
    T = (_, y, C, S, L, $, V, N, B) => {
      (V = V || y.type === "svg"),
        _ == null ? k(y, C, S, L, $, V, N, B) : R(_, y, L, $, V, N, B);
    },
    k = (_, y, C, S, L, $, V, N) => {
      let B, F;
      const { type: G, props: K, shapeFlag: Q, transition: Z, dirs: re } = _;
      if (
        ((B = _.el = o(_.type, $, K && K.is, K)),
        Q & 8
          ? c(B, _.children)
          : Q & 16 &&
            P(_.children, B, null, S, L, $ && G !== "foreignObject", V, N),
        re && _n(_, null, S, "created"),
        A(B, _, _.scopeId, V, S),
        K)
      ) {
        for (const ce in K)
          ce !== "value" &&
            !oi(ce) &&
            s(B, ce, null, K[ce], $, _.children, S, L, W);
        "value" in K && s(B, "value", null, K.value),
          (F = K.onVnodeBeforeMount) && ct(F, S, _);
      }
      re && _n(_, null, S, "beforeMount");
      const de = (!L || (L && !L.pendingBranch)) && Z && !Z.persisted;
      de && Z.beforeEnter(B),
        r(B, y, C),
        ((F = K && K.onVnodeMounted) || de || re) &&
          $e(() => {
            F && ct(F, S, _), de && Z.enter(B), re && _n(_, null, S, "mounted");
          }, L);
    },
    A = (_, y, C, S, L) => {
      if ((C && p(_, C), S)) for (let $ = 0; $ < S.length; $++) p(_, S[$]);
      if (L) {
        let $ = L.subTree;
        if (y === $) {
          const V = L.vnode;
          A(_, V, V.scopeId, V.slotScopeIds, L.parent);
        }
      }
    },
    P = (_, y, C, S, L, $, V, N, B = 0) => {
      for (let F = B; F < _.length; F++) {
        const G = (_[F] = N ? en(_[F]) : St(_[F]));
        d(null, G, y, C, S, L, $, V, N);
      }
    },
    R = (_, y, C, S, L, $, V) => {
      const N = (y.el = _.el);
      let { patchFlag: B, dynamicChildren: F, dirs: G } = y;
      B |= _.patchFlag & 16;
      const K = _.props || ge,
        Q = y.props || ge;
      let Z;
      C && gn(C, !1),
        (Z = Q.onVnodeBeforeUpdate) && ct(Z, C, y, _),
        G && _n(y, _, C, "beforeUpdate"),
        C && gn(C, !0);
      const re = L && y.type !== "foreignObject";
      if (
        (F
          ? U(_.dynamicChildren, F, N, C, S, re, $)
          : V || X(_, y, N, null, C, S, re, $, !1),
        B > 0)
      ) {
        if (B & 16) O(N, y, K, Q, C, S, L);
        else if (
          (B & 2 && K.class !== Q.class && s(N, "class", null, Q.class, L),
          B & 4 && s(N, "style", K.style, Q.style, L),
          B & 8)
        ) {
          const de = y.dynamicProps;
          for (let ce = 0; ce < de.length; ce++) {
            const Ae = de[ce],
              vt = K[Ae],
              zn = Q[Ae];
            (zn !== vt || Ae === "value") &&
              s(N, Ae, vt, zn, L, _.children, C, S, W);
          }
        }
        B & 1 && _.children !== y.children && c(N, y.children);
      } else !V && F == null && O(N, y, K, Q, C, S, L);
      ((Z = Q.onVnodeUpdated) || G) &&
        $e(() => {
          Z && ct(Z, C, y, _), G && _n(y, _, C, "updated");
        }, S);
    },
    U = (_, y, C, S, L, $, V) => {
      for (let N = 0; N < y.length; N++) {
        const B = _[N],
          F = y[N],
          G =
            B.el && (B.type === Pe || !nn(B, F) || B.shapeFlag & 70)
              ? f(B.el)
              : C;
        d(B, F, G, null, S, L, $, V, !0);
      }
    },
    O = (_, y, C, S, L, $, V) => {
      if (C !== S) {
        if (C !== ge)
          for (const N in C)
            !oi(N) && !(N in S) && s(_, N, C[N], null, V, y.children, L, $, W);
        for (const N in S) {
          if (oi(N)) continue;
          const B = S[N],
            F = C[N];
          B !== F && N !== "value" && s(_, N, F, B, V, y.children, L, $, W);
        }
        "value" in S && s(_, "value", C.value, S.value);
      }
    },
    E = (_, y, C, S, L, $, V, N, B) => {
      const F = (y.el = _ ? _.el : l("")),
        G = (y.anchor = _ ? _.anchor : l(""));
      let { patchFlag: K, dynamicChildren: Q, slotScopeIds: Z } = y;
      Z && (N = N ? N.concat(Z) : Z),
        _ == null
          ? (r(F, C, S), r(G, C, S), P(y.children, C, G, L, $, V, N, B))
          : K > 0 && K & 64 && Q && _.dynamicChildren
          ? (U(_.dynamicChildren, Q, C, L, $, V, N),
            (y.key != null || (L && y === L.subTree)) && hu(_, y, !0))
          : X(_, y, C, G, L, $, V, N, B);
    },
    I = (_, y, C, S, L, $, V, N, B) => {
      (y.slotScopeIds = N),
        _ == null
          ? y.shapeFlag & 512
            ? L.ctx.activate(y, C, S, V, B)
            : D(y, C, S, L, $, V, B)
          : j(_, y, B);
    },
    D = (_, y, C, S, L, $, V) => {
      const N = (_.component = Xh(_, S, L));
      if ((Fi(_) && (N.ctx.renderer = le), Yh(N), N.asyncDep)) {
        if ((L && L.registerDep(N, z), !_.el)) {
          const B = (N.subTree = me(gt));
          b(null, B, y, C);
        }
        return;
      }
      z(N, _, y, C, L, $, V);
    },
    j = (_, y, C) => {
      const S = (y.component = _.component);
      if (oh(_, y, C))
        if (S.asyncDep && !S.asyncResolved) {
          q(S, y, C);
          return;
        } else (S.next = y), eh(S.update), S.update();
      else (y.el = _.el), (S.vnode = y);
    },
    z = (_, y, C, S, L, $, V) => {
      const N = () => {
          if (_.isMounted) {
            let { next: G, bu: K, u: Q, parent: Z, vnode: re } = _,
              de = G,
              ce;
            gn(_, !1),
              G ? ((G.el = re.el), q(_, G, V)) : (G = re),
              K && Er(K),
              (ce = G.props && G.props.onVnodeBeforeUpdate) && ct(ce, Z, G, re),
              gn(_, !0);
            const Ae = Gi(_),
              vt = _.subTree;
            (_.subTree = Ae),
              d(vt, Ae, f(vt.el), H(vt), _, L, $),
              (G.el = Ae.el),
              de === null && lh(_, Ae.el),
              Q && $e(Q, L),
              (ce = G.props && G.props.onVnodeUpdated) &&
                $e(() => ct(ce, Z, G, re), L);
          } else {
            let G;
            const { el: K, props: Q } = y,
              { bm: Z, m: re, parent: de } = _,
              ce = Yn(y);
            if (
              (gn(_, !1),
              Z && Er(Z),
              !ce && (G = Q && Q.onVnodeBeforeMount) && ct(G, de, y),
              gn(_, !0),
              K && ne)
            ) {
              const Ae = () => {
                (_.subTree = Gi(_)), ne(K, _.subTree, _, L, null);
              };
              ce
                ? y.type.__asyncLoader().then(() => !_.isUnmounted && Ae())
                : Ae();
            } else {
              const Ae = (_.subTree = Gi(_));
              d(null, Ae, C, S, _, L, $), (y.el = Ae.el);
            }
            if ((re && $e(re, L), !ce && (G = Q && Q.onVnodeMounted))) {
              const Ae = y;
              $e(() => ct(G, de, Ae), L);
            }
            (y.shapeFlag & 256 ||
              (de && Yn(de.vnode) && de.vnode.shapeFlag & 256)) &&
              _.a &&
              $e(_.a, L),
              (_.isMounted = !0),
              (y = C = S = null);
          }
        },
        B = (_.effect = new no(N, () => co(F), _.scope)),
        F = (_.update = () => B.run());
      (F.id = _.uid), gn(_, !0), F();
    },
    q = (_, y, C) => {
      y.component = _;
      const S = _.vnode.props;
      (_.vnode = y),
        (_.next = null),
        Ah(_, y.props, S, C),
        Dh(_, y.children, C),
        fr(),
        ol(),
        hr();
    },
    X = (_, y, C, S, L, $, V, N, B = !1) => {
      const F = _ && _.children,
        G = _ ? _.shapeFlag : 0,
        K = y.children,
        { patchFlag: Q, shapeFlag: Z } = y;
      if (Q > 0) {
        if (Q & 128) {
          _e(F, K, C, S, L, $, V, N, B);
          return;
        } else if (Q & 256) {
          Ee(F, K, C, S, L, $, V, N, B);
          return;
        }
      }
      Z & 8
        ? (G & 16 && W(F, L, $), K !== F && c(C, K))
        : G & 16
        ? Z & 16
          ? _e(F, K, C, S, L, $, V, N, B)
          : W(F, L, $, !0)
        : (G & 8 && c(C, ""), Z & 16 && P(K, C, S, L, $, V, N, B));
    },
    Ee = (_, y, C, S, L, $, V, N, B) => {
      (_ = _ || Wn), (y = y || Wn);
      const F = _.length,
        G = y.length,
        K = Math.min(F, G);
      let Q;
      for (Q = 0; Q < K; Q++) {
        const Z = (y[Q] = B ? en(y[Q]) : St(y[Q]));
        d(_[Q], Z, C, null, L, $, V, N, B);
      }
      F > G ? W(_, L, $, !0, !1, K) : P(y, C, S, L, $, V, N, B, K);
    },
    _e = (_, y, C, S, L, $, V, N, B) => {
      let F = 0;
      const G = y.length;
      let K = _.length - 1,
        Q = G - 1;
      for (; F <= K && F <= Q; ) {
        const Z = _[F],
          re = (y[F] = B ? en(y[F]) : St(y[F]));
        if (nn(Z, re)) d(Z, re, C, null, L, $, V, N, B);
        else break;
        F++;
      }
      for (; F <= K && F <= Q; ) {
        const Z = _[K],
          re = (y[Q] = B ? en(y[Q]) : St(y[Q]));
        if (nn(Z, re)) d(Z, re, C, null, L, $, V, N, B);
        else break;
        K--, Q--;
      }
      if (F > K) {
        if (F <= Q) {
          const Z = Q + 1,
            re = Z < G ? y[Z].el : S;
          for (; F <= Q; )
            d(null, (y[F] = B ? en(y[F]) : St(y[F])), C, re, L, $, V, N, B),
              F++;
        }
      } else if (F > Q) for (; F <= K; ) Te(_[F], L, $, !0), F++;
      else {
        const Z = F,
          re = F,
          de = new Map();
        for (F = re; F <= Q; F++) {
          const nt = (y[F] = B ? en(y[F]) : St(y[F]));
          nt.key != null && de.set(nt.key, F);
        }
        let ce,
          Ae = 0;
        const vt = Q - re + 1;
        let zn = !1,
          Wo = 0;
        const dr = new Array(vt);
        for (F = 0; F < vt; F++) dr[F] = 0;
        for (F = Z; F <= K; F++) {
          const nt = _[F];
          if (Ae >= vt) {
            Te(nt, L, $, !0);
            continue;
          }
          let Pt;
          if (nt.key != null) Pt = de.get(nt.key);
          else
            for (ce = re; ce <= Q; ce++)
              if (dr[ce - re] === 0 && nn(nt, y[ce])) {
                Pt = ce;
                break;
              }
          Pt === void 0
            ? Te(nt, L, $, !0)
            : ((dr[Pt - re] = F + 1),
              Pt >= Wo ? (Wo = Pt) : (zn = !0),
              d(nt, y[Pt], C, null, L, $, V, N, B),
              Ae++);
        }
        const qo = zn ? Bh(dr) : Wn;
        for (ce = qo.length - 1, F = vt - 1; F >= 0; F--) {
          const nt = re + F,
            Pt = y[nt],
            Ko = nt + 1 < G ? y[nt + 1].el : S;
          dr[F] === 0
            ? d(null, Pt, C, Ko, L, $, V, N, B)
            : zn && (ce < 0 || F !== qo[ce] ? Ie(Pt, C, Ko, 2) : ce--);
        }
      }
    },
    Ie = (_, y, C, S, L = null) => {
      const { el: $, type: V, transition: N, children: B, shapeFlag: F } = _;
      if (F & 6) {
        Ie(_.component.subTree, y, C, S);
        return;
      }
      if (F & 128) {
        _.suspense.move(y, C, S);
        return;
      }
      if (F & 64) {
        V.move(_, y, C, le);
        return;
      }
      if (V === Pe) {
        r($, y, C);
        for (let K = 0; K < B.length; K++) Ie(B[K], y, C, S);
        r(_.anchor, y, C);
        return;
      }
      if (V === ts) {
        w(_, y, C);
        return;
      }
      if (S !== 2 && F & 1 && N)
        if (S === 0) N.beforeEnter($), r($, y, C), $e(() => N.enter($), L);
        else {
          const { leave: K, delayLeave: Q, afterLeave: Z } = N,
            re = () => r($, y, C),
            de = () => {
              K($, () => {
                re(), Z && Z();
              });
            };
          Q ? Q($, re, de) : de();
        }
      else r($, y, C);
    },
    Te = (_, y, C, S = !1, L = !1) => {
      const {
        type: $,
        props: V,
        ref: N,
        children: B,
        dynamicChildren: F,
        shapeFlag: G,
        patchFlag: K,
        dirs: Q,
      } = _;
      if ((N != null && Ps(N, null, C, _, !0), G & 256)) {
        y.ctx.deactivate(_);
        return;
      }
      const Z = G & 1 && Q,
        re = !Yn(_);
      let de;
      if ((re && (de = V && V.onVnodeBeforeUnmount) && ct(de, y, _), G & 6))
        M(_.component, C, S);
      else {
        if (G & 128) {
          _.suspense.unmount(C, S);
          return;
        }
        Z && _n(_, null, y, "beforeUnmount"),
          G & 64
            ? _.type.remove(_, y, C, L, le, S)
            : F && ($ !== Pe || (K > 0 && K & 64))
            ? W(F, y, C, !1, !0)
            : (($ === Pe && K & 384) || (!L && G & 16)) && W(B, y, C),
          S && Nt(_);
      }
      ((re && (de = V && V.onVnodeUnmounted)) || Z) &&
        $e(() => {
          de && ct(de, y, _), Z && _n(_, null, y, "unmounted");
        }, C);
    },
    Nt = (_) => {
      const { type: y, el: C, anchor: S, transition: L } = _;
      if (y === Pe) {
        at(C, S);
        return;
      }
      if (y === ts) {
        x(_);
        return;
      }
      const $ = () => {
        i(C), L && !L.persisted && L.afterLeave && L.afterLeave();
      };
      if (_.shapeFlag & 1 && L && !L.persisted) {
        const { leave: V, delayLeave: N } = L,
          B = () => V(C, $);
        N ? N(_.el, $, B) : B();
      } else $();
    },
    at = (_, y) => {
      let C;
      for (; _ !== y; ) (C = h(_)), i(_), (_ = C);
      i(y);
    },
    M = (_, y, C) => {
      const { bum: S, scope: L, update: $, subTree: V, um: N } = _;
      S && Er(S),
        L.stop(),
        $ && (($.active = !1), Te(V, _, y, C)),
        N && $e(N, y),
        $e(() => {
          _.isUnmounted = !0;
        }, y),
        y &&
          y.pendingBranch &&
          !y.isUnmounted &&
          _.asyncDep &&
          !_.asyncResolved &&
          _.suspenseId === y.pendingId &&
          (y.deps--, y.deps === 0 && y.resolve());
    },
    W = (_, y, C, S = !1, L = !1, $ = 0) => {
      for (let V = $; V < _.length; V++) Te(_[V], y, C, S, L);
    },
    H = (_) =>
      _.shapeFlag & 6
        ? H(_.component.subTree)
        : _.shapeFlag & 128
        ? _.suspense.next()
        : h(_.anchor || _.el),
    Y = (_, y, C) => {
      _ == null
        ? y._vnode && Te(y._vnode, null, null, !0)
        : d(y._vnode || null, _, y, null, null, null, C),
        ol(),
        Ha(),
        (y._vnode = _);
    },
    le = {
      p: d,
      um: Te,
      m: Ie,
      r: Nt,
      mt: D,
      mc: P,
      pc: X,
      pbc: U,
      n: H,
      o: t,
    };
  let be, ne;
  return (
    e && ([be, ne] = e(le)), { render: Y, hydrate: be, createApp: Nh(Y, be) }
  );
}
function gn({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n;
}
function hu(t, e, n = !1) {
  const r = t.children,
    i = e.children;
  if (J(r) && J(i))
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      let l = i[s];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = i[s] = en(i[s])), (l.el = o.el)),
        n || hu(o, l)),
        l.type === zi && (l.el = o.el);
    }
}
function Bh(t) {
  const e = t.slice(),
    n = [0];
  let r, i, s, o, l;
  const u = t.length;
  for (r = 0; r < u; r++) {
    const a = t[r];
    if (a !== 0) {
      if (((i = n[n.length - 1]), t[i] < a)) {
        (e[r] = i), n.push(r);
        continue;
      }
      for (s = 0, o = n.length - 1; s < o; )
        (l = (s + o) >> 1), t[n[l]] < a ? (s = l + 1) : (o = l);
      a < t[n[s]] && (s > 0 && (e[r] = n[s - 1]), (n[s] = r));
    }
  }
  for (s = n.length, o = n[s - 1]; s-- > 0; ) (n[s] = o), (o = e[o]);
  return n;
}
const jh = (t) => t.__isTeleport,
  Pe = Symbol(void 0),
  zi = Symbol(void 0),
  gt = Symbol(void 0),
  ts = Symbol(void 0),
  Cr = [];
let xt = null;
function fe(t = !1) {
  Cr.push((xt = t ? null : []));
}
function Uh() {
  Cr.pop(), (xt = Cr[Cr.length - 1] || null);
}
let Nr = 1;
function gl(t) {
  Nr += t;
}
function du(t) {
  return (
    (t.dynamicChildren = Nr > 0 ? xt || Wn : null),
    Uh(),
    Nr > 0 && xt && xt.push(t),
    t
  );
}
function Oe(t, e, n, r, i, s) {
  return du(ee(t, e, n, r, i, s, !0));
}
function Sn(t, e, n, r, i) {
  return du(me(t, e, n, r, i, !0));
}
function $r(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function nn(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Bi = "__vInternal",
  pu = ({ key: t }) => t ?? null,
  ai = ({ ref: t, ref_key: e, ref_for: n }) =>
    t != null
      ? Se(t) || ze(t) || te(t)
        ? { i: Be, r: t, k: e, f: !!n }
        : t
      : null;
function ee(
  t,
  e = null,
  n = null,
  r = 0,
  i = null,
  s = t === Pe ? 0 : 1,
  o = !1,
  l = !1
) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && pu(e),
    ref: e && ai(e),
    scopeId: Di,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Be,
  };
  return (
    l
      ? (yo(u, n), s & 128 && t.normalize(u))
      : n && (u.shapeFlag |= Se(n) ? 8 : 16),
    Nr > 0 &&
      !o &&
      xt &&
      (u.patchFlag > 0 || s & 6) &&
      u.patchFlag !== 32 &&
      xt.push(u),
    u
  );
}
const me = Hh;
function Hh(t, e = null, n = null, r = 0, i = null, s = !1) {
  if (((!t || t === nu) && (t = gt), $r(t))) {
    const l = Wt(t, e, !0);
    return (
      n && yo(l, n),
      Nr > 0 &&
        !s &&
        xt &&
        (l.shapeFlag & 6 ? (xt[xt.indexOf(t)] = l) : xt.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Zh(t) && (t = t.__vccOpts), e)) {
    e = Vh(e);
    let { class: l, style: u } = e;
    l && !Se(l) && (e.class = Ke(l)),
      ve(u) && (Ia(u) && !J(u) && (u = Fe({}, u)), (e.style = pt(u)));
  }
  const o = Se(t) ? 1 : Xa(t) ? 128 : jh(t) ? 64 : ve(t) ? 4 : te(t) ? 2 : 0;
  return ee(t, e, n, r, i, o, s, !0);
}
function Vh(t) {
  return t ? (Ia(t) || Bi in t ? Fe({}, t) : t) : null;
}
function Wt(t, e, n = !1) {
  const { props: r, ref: i, patchFlag: s, children: o } = t,
    l = e ? Wh(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: l,
    key: l && pu(l),
    ref:
      e && e.ref ? (n && i ? (J(i) ? i.concat(ai(e)) : [i, ai(e)]) : ai(e)) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: o,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== Pe ? (s === -1 ? 16 : s | 16) : s,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Wt(t.ssContent),
    ssFallback: t.ssFallback && Wt(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce,
  };
}
function Mt(t = " ", e = 0) {
  return me(zi, null, t, e);
}
function Rs(t = "", e = !1) {
  return e ? (fe(), Sn(gt, null, t)) : me(gt, null, t);
}
function St(t) {
  return t == null || typeof t == "boolean"
    ? me(gt)
    : J(t)
    ? me(Pe, null, t.slice())
    : typeof t == "object"
    ? en(t)
    : me(zi, null, String(t));
}
function en(t) {
  return (t.el === null && t.patchFlag !== -1) || t.memo ? t : Wt(t);
}
function yo(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null) e = null;
  else if (J(e)) n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), yo(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !(Bi in e)
        ? (e._ctx = Be)
        : i === 3 &&
          Be &&
          (Be.slots._ === 1 ? (e._ = 1) : ((e._ = 2), (t.patchFlag |= 1024)));
    }
  else
    te(e)
      ? ((e = { default: e, _ctx: Be }), (n = 32))
      : ((e = String(e)), r & 64 ? ((n = 16), (e = [Mt(e)])) : (n = 8));
  (t.children = e), (t.shapeFlag |= n);
}
function Wh(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const i in r)
      if (i === "class")
        e.class !== r.class && (e.class = Ke([e.class, r.class]));
      else if (i === "style") e.style = pt([e.style, r.style]);
      else if (Si(i)) {
        const s = e[i],
          o = r[i];
        o &&
          s !== o &&
          !(J(s) && s.includes(o)) &&
          (e[i] = s ? [].concat(s, o) : o);
      } else i !== "" && (e[i] = r[i]);
  }
  return e;
}
function ct(t, e, n, r = null) {
  _t(t, e, 7, [n, r]);
}
const qh = fu();
let Kh = 0;
function Xh(t, e, n) {
  const r = t.type,
    i = (e ? e.appContext : t.appContext) || qh,
    s = {
      uid: Kh++,
      vnode: t,
      type: r,
      parent: e,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new _f(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: e ? e.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: lu(r, i),
      emitsOptions: Wa(r, i),
      emit: null,
      emitted: null,
      propsDefaults: ge,
      inheritAttrs: r.inheritAttrs,
      ctx: ge,
      data: ge,
      props: ge,
      attrs: ge,
      slots: ge,
      refs: ge,
      setupState: ge,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (s.ctx = { _: s }),
    (s.root = e ? e.root : s),
    (s.emit = rh.bind(null, s)),
    t.ce && t.ce(s),
    s
  );
}
let Me = null;
const bo = () => Me || Be,
  nr = (t) => {
    (Me = t), t.scope.on();
  },
  kn = () => {
    Me && Me.scope.off(), (Me = null);
  };
function _u(t) {
  return t.vnode.shapeFlag & 4;
}
let zr = !1;
function Yh(t, e = !1) {
  zr = e;
  const { props: n, children: r } = t.vnode,
    i = _u(t);
  Mh(t, n, i, e), Ih(t, r);
  const s = i ? Gh(t, e) : void 0;
  return (zr = !1), s;
}
function Gh(t, e) {
  const n = t.type;
  (t.accessCache = Object.create(null)), (t.proxy = Da(new Proxy(t.ctx, Ch)));
  const { setup: r } = n;
  if (r) {
    const i = (t.setupContext = r.length > 1 ? Jh(t) : null);
    nr(t), fr();
    const s = an(r, t, 0, [t.props, i]);
    if ((hr(), kn(), wa(s))) {
      if ((s.then(kn, kn), e))
        return s
          .then((o) => {
            ml(t, o, e);
          })
          .catch((o) => {
            Li(o, t, 0);
          });
      t.asyncDep = s;
    } else ml(t, s, e);
  } else gu(t, e);
}
function ml(t, e, n) {
  te(e)
    ? t.type.__ssrInlineRender
      ? (t.ssrRender = e)
      : (t.render = e)
    : ve(e) && (t.setupState = za(e)),
    gu(t, n);
}
let vl;
function gu(t, e, n) {
  const r = t.type;
  if (!t.render) {
    if (!e && vl && !r.render) {
      const i = r.template || mo(t).template;
      if (i) {
        const { isCustomElement: s, compilerOptions: o } = t.appContext.config,
          { delimiters: l, compilerOptions: u } = r,
          a = Fe(Fe({ isCustomElement: s, delimiters: l }, o), u);
        r.render = vl(i, a);
      }
    }
    t.render = r.render || Et;
  }
  nr(t), fr(), Ph(t), hr(), kn();
}
function Qh(t) {
  return new Proxy(t.attrs, {
    get(e, n) {
      return et(t, "get", "$attrs"), e[n];
    },
  });
}
function Jh(t) {
  const e = (r) => {
    t.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = Qh(t));
    },
    slots: t.slots,
    emit: t.emit,
    expose: e,
  };
}
function ji(t) {
  if (t.exposed)
    return (
      t.exposeProxy ||
      (t.exposeProxy = new Proxy(za(Da(t.exposed)), {
        get(e, n) {
          if (n in e) return e[n];
          if (n in Tr) return Tr[n](t);
        },
        has(e, n) {
          return n in e || n in Tr;
        },
      }))
    );
}
function Ss(t, e = !0) {
  return te(t) ? t.displayName || t.name : t.name || (e && t.__name);
}
function Zh(t) {
  return te(t) && "__vccOpts" in t;
}
const Ye = (t, e) => Qf(t, e, zr);
function mu(t, e, n) {
  const r = arguments.length;
  return r === 2
    ? ve(e) && !J(e)
      ? $r(e)
        ? me(t, null, [e])
        : me(t, e)
      : me(t, null, e)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && $r(n) && (n = [n]),
      me(t, e, n));
}
const ed = Symbol(""),
  td = () => Tt(ed),
  nd = "3.2.47",
  rd = "http://www.w3.org/2000/svg",
  En = typeof document < "u" ? document : null,
  yl = En && En.createElement("template"),
  id = {
    insert: (t, e, n) => {
      e.insertBefore(t, n || null);
    },
    remove: (t) => {
      const e = t.parentNode;
      e && e.removeChild(t);
    },
    createElement: (t, e, n, r) => {
      const i = e
        ? En.createElementNS(rd, t)
        : En.createElement(t, n ? { is: n } : void 0);
      return (
        t === "select" &&
          r &&
          r.multiple != null &&
          i.setAttribute("multiple", r.multiple),
        i
      );
    },
    createText: (t) => En.createTextNode(t),
    createComment: (t) => En.createComment(t),
    setText: (t, e) => {
      t.nodeValue = e;
    },
    setElementText: (t, e) => {
      t.textContent = e;
    },
    parentNode: (t) => t.parentNode,
    nextSibling: (t) => t.nextSibling,
    querySelector: (t) => En.querySelector(t),
    setScopeId(t, e) {
      t.setAttribute(e, "");
    },
    insertStaticContent(t, e, n, r, i, s) {
      const o = n ? n.previousSibling : e.lastChild;
      if (i && (i === s || i.nextSibling))
        for (
          ;
          e.insertBefore(i.cloneNode(!0), n),
            !(i === s || !(i = i.nextSibling));

        );
      else {
        yl.innerHTML = r ? `<svg>${t}</svg>` : t;
        const l = yl.content;
        if (r) {
          const u = l.firstChild;
          for (; u.firstChild; ) l.appendChild(u.firstChild);
          l.removeChild(u);
        }
        e.insertBefore(l, n);
      }
      return [
        o ? o.nextSibling : e.firstChild,
        n ? n.previousSibling : e.lastChild,
      ];
    },
  };
function sd(t, e, n) {
  const r = t._vtc;
  r && (e = (e ? [e, ...r] : [...r]).join(" ")),
    e == null
      ? t.removeAttribute("class")
      : n
      ? t.setAttribute("class", e)
      : (t.className = e);
}
function od(t, e, n) {
  const r = t.style,
    i = Se(n);
  if (n && !i) {
    if (e && !Se(e)) for (const s in e) n[s] == null && ks(r, s, "");
    for (const s in n) ks(r, s, n[s]);
  } else {
    const s = r.display;
    i ? e !== n && (r.cssText = n) : e && t.removeAttribute("style"),
      "_vod" in t && (r.display = s);
  }
}
const bl = /\s*!important$/;
function ks(t, e, n) {
  if (J(n)) n.forEach((r) => ks(t, e, r));
  else if ((n == null && (n = ""), e.startsWith("--"))) t.setProperty(e, n);
  else {
    const r = ld(t, e);
    bl.test(n)
      ? t.setProperty(cr(r), n.replace(bl, ""), "important")
      : (t[r] = n);
  }
}
const wl = ["Webkit", "Moz", "ms"],
  ns = {};
function ld(t, e) {
  const n = ns[e];
  if (n) return n;
  let r = Dt(e);
  if (r !== "filter" && r in t) return (ns[e] = r);
  r = Oi(r);
  for (let i = 0; i < wl.length; i++) {
    const s = wl[i] + r;
    if (s in t) return (ns[e] = s);
  }
  return e;
}
const xl = "http://www.w3.org/1999/xlink";
function ad(t, e, n, r, i) {
  if (r && e.startsWith("xlink:"))
    n == null
      ? t.removeAttributeNS(xl, e.slice(6, e.length))
      : t.setAttributeNS(xl, e, n);
  else {
    const s = rf(e);
    n == null || (s && !va(n))
      ? t.removeAttribute(e)
      : t.setAttribute(e, s ? "" : n);
  }
}
function ud(t, e, n, r, i, s, o) {
  if (e === "innerHTML" || e === "textContent") {
    r && o(r, i, s), (t[e] = n ?? "");
    return;
  }
  if (e === "value" && t.tagName !== "PROGRESS" && !t.tagName.includes("-")) {
    t._value = n;
    const u = n ?? "";
    (t.value !== u || t.tagName === "OPTION") && (t.value = u),
      n == null && t.removeAttribute(e);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const u = typeof t[e];
    u === "boolean"
      ? (n = va(n))
      : n == null && u === "string"
      ? ((n = ""), (l = !0))
      : u === "number" && ((n = 0), (l = !0));
  }
  try {
    t[e] = n;
  } catch {}
  l && t.removeAttribute(e);
}
function cd(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function fd(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
function hd(t, e, n, r, i = null) {
  const s = t._vei || (t._vei = {}),
    o = s[e];
  if (r && o) o.value = r;
  else {
    const [l, u] = dd(e);
    if (r) {
      const a = (s[e] = gd(r, i));
      cd(t, l, a, u);
    } else o && (fd(t, l, o, u), (s[e] = void 0));
  }
}
const El = /(?:Once|Passive|Capture)$/;
function dd(t) {
  let e;
  if (El.test(t)) {
    e = {};
    let r;
    for (; (r = t.match(El)); )
      (t = t.slice(0, t.length - r[0].length)), (e[r[0].toLowerCase()] = !0);
  }
  return [t[2] === ":" ? t.slice(3) : cr(t.slice(2)), e];
}
let rs = 0;
const pd = Promise.resolve(),
  _d = () => rs || (pd.then(() => (rs = 0)), (rs = Date.now()));
function gd(t, e) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    _t(md(r, n.value), e, 5, [r]);
  };
  return (n.value = t), (n.attached = _d()), n;
}
function md(t, e) {
  if (J(e)) {
    const n = t.stopImmediatePropagation;
    return (
      (t.stopImmediatePropagation = () => {
        n.call(t), (t._stopped = !0);
      }),
      e.map((r) => (i) => !i._stopped && r && r(i))
    );
  } else return e;
}
const Tl = /^on[a-z]/,
  vd = (t, e, n, r, i = !1, s, o, l, u) => {
    e === "class"
      ? sd(t, r, i)
      : e === "style"
      ? od(t, n, r)
      : Si(e)
      ? Qs(e) || hd(t, e, n, r, o)
      : (
          e[0] === "."
            ? ((e = e.slice(1)), !0)
            : e[0] === "^"
            ? ((e = e.slice(1)), !1)
            : yd(t, e, r, i)
        )
      ? ud(t, e, r, s, o, l, u)
      : (e === "true-value"
          ? (t._trueValue = r)
          : e === "false-value" && (t._falseValue = r),
        ad(t, e, r, i));
  };
function yd(t, e, n, r) {
  return r
    ? !!(
        e === "innerHTML" ||
        e === "textContent" ||
        (e in t && Tl.test(e) && te(n))
      )
    : e === "spellcheck" ||
      e === "draggable" ||
      e === "translate" ||
      e === "form" ||
      (e === "list" && t.tagName === "INPUT") ||
      (e === "type" && t.tagName === "TEXTAREA") ||
      (Tl.test(e) && Se(n))
    ? !1
    : e in t;
}
const Qt = "transition",
  pr = "animation",
  vu = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  bd = Fe({}, fh.props, vu),
  mn = (t, e = []) => {
    J(t) ? t.forEach((n) => n(...e)) : t && t(...e);
  },
  Cl = (t) => (t ? (J(t) ? t.some((e) => e.length > 1) : t.length > 1) : !1);
function wd(t) {
  const e = {};
  for (const E in t) E in vu || (e[E] = t[E]);
  if (t.css === !1) return e;
  const {
      name: n = "v",
      type: r,
      duration: i,
      enterFromClass: s = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: u = s,
      appearActiveClass: a = o,
      appearToClass: c = l,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: h = `${n}-leave-active`,
      leaveToClass: p = `${n}-leave-to`,
    } = t,
    g = xd(i),
    d = g && g[0],
    m = g && g[1],
    {
      onBeforeEnter: b,
      onEnter: v,
      onEnterCancelled: w,
      onLeave: x,
      onLeaveCancelled: T,
      onBeforeAppear: k = b,
      onAppear: A = v,
      onAppearCancelled: P = w,
    } = e,
    R = (E, I, D) => {
      Zt(E, I ? c : l), Zt(E, I ? a : o), D && D();
    },
    U = (E, I) => {
      (E._isLeaving = !1), Zt(E, f), Zt(E, p), Zt(E, h), I && I();
    },
    O = (E) => (I, D) => {
      const j = E ? A : v,
        z = () => R(I, E, D);
      mn(j, [I, z]),
        Pl(() => {
          Zt(I, E ? u : s), zt(I, E ? c : l), Cl(j) || Rl(I, r, d, z);
        });
    };
  return Fe(e, {
    onBeforeEnter(E) {
      mn(b, [E]), zt(E, s), zt(E, o);
    },
    onBeforeAppear(E) {
      mn(k, [E]), zt(E, u), zt(E, a);
    },
    onEnter: O(!1),
    onAppear: O(!0),
    onLeave(E, I) {
      E._isLeaving = !0;
      const D = () => U(E, I);
      zt(E, f),
        bu(),
        zt(E, h),
        Pl(() => {
          E._isLeaving && (Zt(E, f), zt(E, p), Cl(x) || Rl(E, r, m, D));
        }),
        mn(x, [E, D]);
    },
    onEnterCancelled(E) {
      R(E, !1), mn(w, [E]);
    },
    onAppearCancelled(E) {
      R(E, !0), mn(P, [E]);
    },
    onLeaveCancelled(E) {
      U(E), mn(T, [E]);
    },
  });
}
function xd(t) {
  if (t == null) return null;
  if (ve(t)) return [is(t.enter), is(t.leave)];
  {
    const e = is(t);
    return [e, e];
  }
}
function is(t) {
  return df(t);
}
function zt(t, e) {
  e.split(/\s+/).forEach((n) => n && t.classList.add(n)),
    (t._vtc || (t._vtc = new Set())).add(e);
}
function Zt(t, e) {
  e.split(/\s+/).forEach((r) => r && t.classList.remove(r));
  const { _vtc: n } = t;
  n && (n.delete(e), n.size || (t._vtc = void 0));
}
function Pl(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t);
  });
}
let Ed = 0;
function Rl(t, e, n, r) {
  const i = (t._endId = ++Ed),
    s = () => {
      i === t._endId && r();
    };
  if (n) return setTimeout(s, n);
  const { type: o, timeout: l, propCount: u } = yu(t, e);
  if (!o) return r();
  const a = o + "end";
  let c = 0;
  const f = () => {
      t.removeEventListener(a, h), s();
    },
    h = (p) => {
      p.target === t && ++c >= u && f();
    };
  setTimeout(() => {
    c < u && f();
  }, l + 1),
    t.addEventListener(a, h);
}
function yu(t, e) {
  const n = window.getComputedStyle(t),
    r = (g) => (n[g] || "").split(", "),
    i = r(`${Qt}Delay`),
    s = r(`${Qt}Duration`),
    o = Sl(i, s),
    l = r(`${pr}Delay`),
    u = r(`${pr}Duration`),
    a = Sl(l, u);
  let c = null,
    f = 0,
    h = 0;
  e === Qt
    ? o > 0 && ((c = Qt), (f = o), (h = s.length))
    : e === pr
    ? a > 0 && ((c = pr), (f = a), (h = u.length))
    : ((f = Math.max(o, a)),
      (c = f > 0 ? (o > a ? Qt : pr) : null),
      (h = c ? (c === Qt ? s.length : u.length) : 0));
  const p =
    c === Qt && /\b(transform|all)(,|$)/.test(r(`${Qt}Property`).toString());
  return { type: c, timeout: f, propCount: h, hasTransform: p };
}
function Sl(t, e) {
  for (; t.length < e.length; ) t = t.concat(t);
  return Math.max(...e.map((n, r) => kl(n) + kl(t[r])));
}
function kl(t) {
  return Number(t.slice(0, -1).replace(",", ".")) * 1e3;
}
function bu() {
  return document.body.offsetHeight;
}
const wu = new WeakMap(),
  xu = new WeakMap(),
  Eu = {
    name: "TransitionGroup",
    props: Fe({}, bd, { tag: String, moveClass: String }),
    setup(t, { slots: e }) {
      const n = bo(),
        r = Qa();
      let i, s;
      return (
        ho(() => {
          if (!i.length) return;
          const o = t.moveClass || `${t.name || "v"}-move`;
          if (!Sd(i[0].el, n.vnode.el, o)) return;
          i.forEach(Cd), i.forEach(Pd);
          const l = i.filter(Rd);
          bu(),
            l.forEach((u) => {
              const a = u.el,
                c = a.style;
              zt(a, o),
                (c.transform = c.webkitTransform = c.transitionDuration = "");
              const f = (a._moveCb = (h) => {
                (h && h.target !== a) ||
                  ((!h || /transform$/.test(h.propertyName)) &&
                    (a.removeEventListener("transitionend", f),
                    (a._moveCb = null),
                    Zt(a, o)));
              });
              a.addEventListener("transitionend", f);
            });
        }),
        () => {
          const o = se(t),
            l = wd(o);
          let u = o.tag || Pe;
          (i = s), (s = e.default ? fo(e.default()) : []);
          for (let a = 0; a < s.length; a++) {
            const c = s[a];
            c.key != null && er(c, Dr(c, l, r, n));
          }
          if (i)
            for (let a = 0; a < i.length; a++) {
              const c = i[a];
              er(c, Dr(c, l, r, n)), wu.set(c, c.el.getBoundingClientRect());
            }
          return me(u, null, s);
        }
      );
    },
  },
  Td = (t) => delete t.mode;
Eu.props;
const Jm = Eu;
function Cd(t) {
  const e = t.el;
  e._moveCb && e._moveCb(), e._enterCb && e._enterCb();
}
function Pd(t) {
  xu.set(t, t.el.getBoundingClientRect());
}
function Rd(t) {
  const e = wu.get(t),
    n = xu.get(t),
    r = e.left - n.left,
    i = e.top - n.top;
  if (r || i) {
    const s = t.el.style;
    return (
      (s.transform = s.webkitTransform = `translate(${r}px,${i}px)`),
      (s.transitionDuration = "0s"),
      t
    );
  }
}
function Sd(t, e, n) {
  const r = t.cloneNode();
  t._vtc &&
    t._vtc.forEach((o) => {
      o.split(/\s+/).forEach((l) => l && r.classList.remove(l));
    }),
    n.split(/\s+/).forEach((o) => o && r.classList.add(o)),
    (r.style.display = "none");
  const i = e.nodeType === 1 ? e : e.parentNode;
  i.appendChild(r);
  const { hasTransform: s } = yu(r);
  return i.removeChild(r), s;
}
const kd = {
  beforeMount(t, { value: e }, { transition: n }) {
    (t._vod = t.style.display === "none" ? "" : t.style.display),
      n && e ? n.beforeEnter(t) : _r(t, e);
  },
  mounted(t, { value: e }, { transition: n }) {
    n && e && n.enter(t);
  },
  updated(t, { value: e, oldValue: n }, { transition: r }) {
    !e != !n &&
      (r
        ? e
          ? (r.beforeEnter(t), _r(t, !0), r.enter(t))
          : r.leave(t, () => {
              _r(t, !1);
            })
        : _r(t, e));
  },
  beforeUnmount(t, { value: e }) {
    _r(t, e);
  },
};
function _r(t, e) {
  t.style.display = e ? t._vod : "none";
}
const Od = Fe({ patchProp: vd }, id);
let Ol;
function Md() {
  return Ol || (Ol = $h(Od));
}
const Ad = (...t) => {
  const e = Md().createApp(...t),
    { mount: n } = e;
  return (
    (e.mount = (r) => {
      const i = Ld(r);
      if (!i) return;
      const s = e._component;
      !te(s) && !s.render && !s.template && (s.template = i.innerHTML),
        (i.innerHTML = "");
      const o = n(i, !1, i instanceof SVGElement);
      return (
        i instanceof Element &&
          (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")),
        o
      );
    }),
    e
  );
};
function Ld(t) {
  return Se(t) ? document.querySelector(t) : t;
}
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const Un = typeof window < "u";
function Id(t) {
  return t.__esModule || t[Symbol.toStringTag] === "Module";
}
const ue = Object.assign;
function ss(t, e) {
  const n = {};
  for (const r in e) {
    const i = e[r];
    n[r] = Ct(i) ? i.map(t) : t(i);
  }
  return n;
}
const Pr = () => {},
  Ct = Array.isArray,
  Dd = /\/$/,
  Fd = (t) => t.replace(Dd, "");
function os(t, e, n = "/") {
  let r,
    i = {},
    s = "",
    o = "";
  const l = e.indexOf("#");
  let u = e.indexOf("?");
  return (
    l < u && l >= 0 && (u = -1),
    u > -1 &&
      ((r = e.slice(0, u)),
      (s = e.slice(u + 1, l > -1 ? l : e.length)),
      (i = t(s))),
    l > -1 && ((r = r || e.slice(0, l)), (o = e.slice(l, e.length))),
    (r = Bd(r ?? e, n)),
    { fullPath: r + (s && "?") + s + o, path: r, query: i, hash: o }
  );
}
function Nd(t, e) {
  const n = e.query ? t(e.query) : "";
  return e.path + (n && "?") + n + (e.hash || "");
}
function Ml(t, e) {
  return !e || !t.toLowerCase().startsWith(e.toLowerCase())
    ? t
    : t.slice(e.length) || "/";
}
function $d(t, e, n) {
  const r = e.matched.length - 1,
    i = n.matched.length - 1;
  return (
    r > -1 &&
    r === i &&
    rr(e.matched[r], n.matched[i]) &&
    Tu(e.params, n.params) &&
    t(e.query) === t(n.query) &&
    e.hash === n.hash
  );
}
function rr(t, e) {
  return (t.aliasOf || t) === (e.aliasOf || e);
}
function Tu(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in t) if (!zd(t[n], e[n])) return !1;
  return !0;
}
function zd(t, e) {
  return Ct(t) ? Al(t, e) : Ct(e) ? Al(e, t) : t === e;
}
function Al(t, e) {
  return Ct(e)
    ? t.length === e.length && t.every((n, r) => n === e[r])
    : t.length === 1 && t[0] === e;
}
function Bd(t, e) {
  if (t.startsWith("/")) return t;
  if (!t) return e;
  const n = e.split("/"),
    r = t.split("/");
  let i = n.length - 1,
    s,
    o;
  for (s = 0; s < r.length; s++)
    if (((o = r[s]), o !== "."))
      if (o === "..") i > 1 && i--;
      else break;
  return (
    n.slice(0, i).join("/") +
    "/" +
    r.slice(s - (s === r.length ? 1 : 0)).join("/")
  );
}
var Br;
(function (t) {
  (t.pop = "pop"), (t.push = "push");
})(Br || (Br = {}));
var Rr;
(function (t) {
  (t.back = "back"), (t.forward = "forward"), (t.unknown = "");
})(Rr || (Rr = {}));
function jd(t) {
  if (!t)
    if (Un) {
      const e = document.querySelector("base");
      (t = (e && e.getAttribute("href")) || "/"),
        (t = t.replace(/^\w+:\/\/[^\/]+/, ""));
    } else t = "/";
  return t[0] !== "/" && t[0] !== "#" && (t = "/" + t), Fd(t);
}
const Ud = /^[^#]+#/;
function Hd(t, e) {
  return t.replace(Ud, "#") + e;
}
function Vd(t, e) {
  const n = document.documentElement.getBoundingClientRect(),
    r = t.getBoundingClientRect();
  return {
    behavior: e.behavior,
    left: r.left - n.left - (e.left || 0),
    top: r.top - n.top - (e.top || 0),
  };
}
const Ui = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Wd(t) {
  let e;
  if ("el" in t) {
    const n = t.el,
      r = typeof n == "string" && n.startsWith("#"),
      i =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!i) return;
    e = Vd(i, t);
  } else e = t;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(e)
    : window.scrollTo(
        e.left != null ? e.left : window.pageXOffset,
        e.top != null ? e.top : window.pageYOffset
      );
}
function Ll(t, e) {
  return (history.state ? history.state.position - e : -1) + t;
}
const Os = new Map();
function qd(t, e) {
  Os.set(t, e);
}
function Kd(t) {
  const e = Os.get(t);
  return Os.delete(t), e;
}
let Xd = () => location.protocol + "//" + location.host;
function Cu(t, e) {
  const { pathname: n, search: r, hash: i } = e,
    s = t.indexOf("#");
  if (s > -1) {
    let l = i.includes(t.slice(s)) ? t.slice(s).length : 1,
      u = i.slice(l);
    return u[0] !== "/" && (u = "/" + u), Ml(u, "");
  }
  return Ml(n, t) + r + i;
}
function Yd(t, e, n, r) {
  let i = [],
    s = [],
    o = null;
  const l = ({ state: h }) => {
    const p = Cu(t, location),
      g = n.value,
      d = e.value;
    let m = 0;
    if (h) {
      if (((n.value = p), (e.value = h), o && o === g)) {
        o = null;
        return;
      }
      m = d ? h.position - d.position : 0;
    } else r(p);
    i.forEach((b) => {
      b(n.value, g, {
        delta: m,
        type: Br.pop,
        direction: m ? (m > 0 ? Rr.forward : Rr.back) : Rr.unknown,
      });
    });
  };
  function u() {
    o = n.value;
  }
  function a(h) {
    i.push(h);
    const p = () => {
      const g = i.indexOf(h);
      g > -1 && i.splice(g, 1);
    };
    return s.push(p), p;
  }
  function c() {
    const { history: h } = window;
    h.state && h.replaceState(ue({}, h.state, { scroll: Ui() }), "");
  }
  function f() {
    for (const h of s) h();
    (s = []),
      window.removeEventListener("popstate", l),
      window.removeEventListener("beforeunload", c);
  }
  return (
    window.addEventListener("popstate", l),
    window.addEventListener("beforeunload", c),
    { pauseListeners: u, listen: a, destroy: f }
  );
}
function Il(t, e, n, r = !1, i = !1) {
  return {
    back: t,
    current: e,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: i ? Ui() : null,
  };
}
function Gd(t) {
  const { history: e, location: n } = window,
    r = { value: Cu(t, n) },
    i = { value: e.state };
  i.value ||
    s(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: e.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function s(u, a, c) {
    const f = t.indexOf("#"),
      h =
        f > -1
          ? (n.host && document.querySelector("base") ? t : t.slice(f)) + u
          : Xd() + t + u;
    try {
      e[c ? "replaceState" : "pushState"](a, "", h), (i.value = a);
    } catch (p) {
      console.error(p), n[c ? "replace" : "assign"](h);
    }
  }
  function o(u, a) {
    const c = ue({}, e.state, Il(i.value.back, u, i.value.forward, !0), a, {
      position: i.value.position,
    });
    s(u, c, !0), (r.value = u);
  }
  function l(u, a) {
    const c = ue({}, i.value, e.state, { forward: u, scroll: Ui() });
    s(c.current, c, !0);
    const f = ue({}, Il(r.value, u, null), { position: c.position + 1 }, a);
    s(u, f, !1), (r.value = u);
  }
  return { location: r, state: i, push: l, replace: o };
}
function Qd(t) {
  t = jd(t);
  const e = Gd(t),
    n = Yd(t, e.state, e.location, e.replace);
  function r(s, o = !0) {
    o || n.pauseListeners(), history.go(s);
  }
  const i = ue(
    { location: "", base: t, go: r, createHref: Hd.bind(null, t) },
    e,
    n
  );
  return (
    Object.defineProperty(i, "location", {
      enumerable: !0,
      get: () => e.location.value,
    }),
    Object.defineProperty(i, "state", {
      enumerable: !0,
      get: () => e.state.value,
    }),
    i
  );
}
function Jd(t) {
  return typeof t == "string" || (t && typeof t == "object");
}
function Pu(t) {
  return typeof t == "string" || typeof t == "symbol";
}
const Jt = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Ru = Symbol("");
var Dl;
(function (t) {
  (t[(t.aborted = 4)] = "aborted"),
    (t[(t.cancelled = 8)] = "cancelled"),
    (t[(t.duplicated = 16)] = "duplicated");
})(Dl || (Dl = {}));
function ir(t, e) {
  return ue(new Error(), { type: t, [Ru]: !0 }, e);
}
function $t(t, e) {
  return t instanceof Error && Ru in t && (e == null || !!(t.type & e));
}
const Fl = "[^/]+?",
  Zd = { sensitive: !1, strict: !1, start: !0, end: !0 },
  ep = /[.+*?^${}()[\]/\\]/g;
function tp(t, e) {
  const n = ue({}, Zd, e),
    r = [];
  let i = n.start ? "^" : "";
  const s = [];
  for (const a of t) {
    const c = a.length ? [] : [90];
    n.strict && !a.length && (i += "/");
    for (let f = 0; f < a.length; f++) {
      const h = a[f];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (h.type === 0)
        f || (i += "/"), (i += h.value.replace(ep, "\\$&")), (p += 40);
      else if (h.type === 1) {
        const { value: g, repeatable: d, optional: m, regexp: b } = h;
        s.push({ name: g, repeatable: d, optional: m });
        const v = b || Fl;
        if (v !== Fl) {
          p += 10;
          try {
            new RegExp(`(${v})`);
          } catch (x) {
            throw new Error(
              `Invalid custom RegExp for param "${g}" (${v}): ` + x.message
            );
          }
        }
        let w = d ? `((?:${v})(?:/(?:${v}))*)` : `(${v})`;
        f || (w = m && a.length < 2 ? `(?:/${w})` : "/" + w),
          m && (w += "?"),
          (i += w),
          (p += 20),
          m && (p += -8),
          d && (p += -20),
          v === ".*" && (p += -50);
      }
      c.push(p);
    }
    r.push(c);
  }
  if (n.strict && n.end) {
    const a = r.length - 1;
    r[a][r[a].length - 1] += 0.7000000000000001;
  }
  n.strict || (i += "/?"), n.end ? (i += "$") : n.strict && (i += "(?:/|$)");
  const o = new RegExp(i, n.sensitive ? "" : "i");
  function l(a) {
    const c = a.match(o),
      f = {};
    if (!c) return null;
    for (let h = 1; h < c.length; h++) {
      const p = c[h] || "",
        g = s[h - 1];
      f[g.name] = p && g.repeatable ? p.split("/") : p;
    }
    return f;
  }
  function u(a) {
    let c = "",
      f = !1;
    for (const h of t) {
      (!f || !c.endsWith("/")) && (c += "/"), (f = !1);
      for (const p of h)
        if (p.type === 0) c += p.value;
        else if (p.type === 1) {
          const { value: g, repeatable: d, optional: m } = p,
            b = g in a ? a[g] : "";
          if (Ct(b) && !d)
            throw new Error(
              `Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`
            );
          const v = Ct(b) ? b.join("/") : b;
          if (!v)
            if (m)
              h.length < 2 &&
                (c.endsWith("/") ? (c = c.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${g}"`);
          c += v;
        }
    }
    return c || "/";
  }
  return { re: o, score: r, keys: s, parse: l, stringify: u };
}
function np(t, e) {
  let n = 0;
  for (; n < t.length && n < e.length; ) {
    const r = e[n] - t[n];
    if (r) return r;
    n++;
  }
  return t.length < e.length
    ? t.length === 1 && t[0] === 40 + 40
      ? -1
      : 1
    : t.length > e.length
    ? e.length === 1 && e[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function rp(t, e) {
  let n = 0;
  const r = t.score,
    i = e.score;
  for (; n < r.length && n < i.length; ) {
    const s = np(r[n], i[n]);
    if (s) return s;
    n++;
  }
  if (Math.abs(i.length - r.length) === 1) {
    if (Nl(r)) return 1;
    if (Nl(i)) return -1;
  }
  return i.length - r.length;
}
function Nl(t) {
  const e = t[t.length - 1];
  return t.length > 0 && e[e.length - 1] < 0;
}
const ip = { type: 0, value: "" },
  sp = /[a-zA-Z0-9_]/;
function op(t) {
  if (!t) return [[]];
  if (t === "/") return [[ip]];
  if (!t.startsWith("/")) throw new Error(`Invalid path "${t}"`);
  function e(p) {
    throw new Error(`ERR (${n})/"${a}": ${p}`);
  }
  let n = 0,
    r = n;
  const i = [];
  let s;
  function o() {
    s && i.push(s), (s = []);
  }
  let l = 0,
    u,
    a = "",
    c = "";
  function f() {
    a &&
      (n === 0
        ? s.push({ type: 0, value: a })
        : n === 1 || n === 2 || n === 3
        ? (s.length > 1 &&
            (u === "*" || u === "+") &&
            e(
              `A repeatable param (${a}) must be alone in its segment. eg: '/:ids+.`
            ),
          s.push({
            type: 1,
            value: a,
            regexp: c,
            repeatable: u === "*" || u === "+",
            optional: u === "*" || u === "?",
          }))
        : e("Invalid state to consume buffer"),
      (a = ""));
  }
  function h() {
    a += u;
  }
  for (; l < t.length; ) {
    if (((u = t[l++]), u === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        u === "/" ? (a && f(), o()) : u === ":" ? (f(), (n = 1)) : h();
        break;
      case 4:
        h(), (n = r);
        break;
      case 1:
        u === "("
          ? (n = 2)
          : sp.test(u)
          ? h()
          : (f(), (n = 0), u !== "*" && u !== "?" && u !== "+" && l--);
        break;
      case 2:
        u === ")"
          ? c[c.length - 1] == "\\"
            ? (c = c.slice(0, -1) + u)
            : (n = 3)
          : (c += u);
        break;
      case 3:
        f(), (n = 0), u !== "*" && u !== "?" && u !== "+" && l--, (c = "");
        break;
      default:
        e("Unknown state");
        break;
    }
  }
  return n === 2 && e(`Unfinished custom RegExp for param "${a}"`), f(), o(), i;
}
function lp(t, e, n) {
  const r = tp(op(t.path), n),
    i = ue(r, { record: t, parent: e, children: [], alias: [] });
  return e && !i.record.aliasOf == !e.record.aliasOf && e.children.push(i), i;
}
function ap(t, e) {
  const n = [],
    r = new Map();
  e = Bl({ strict: !1, end: !0, sensitive: !1 }, e);
  function i(c) {
    return r.get(c);
  }
  function s(c, f, h) {
    const p = !h,
      g = up(c);
    g.aliasOf = h && h.record;
    const d = Bl(e, c),
      m = [g];
    if ("alias" in c) {
      const w = typeof c.alias == "string" ? [c.alias] : c.alias;
      for (const x of w)
        m.push(
          ue({}, g, {
            components: h ? h.record.components : g.components,
            path: x,
            aliasOf: h ? h.record : g,
          })
        );
    }
    let b, v;
    for (const w of m) {
      const { path: x } = w;
      if (f && x[0] !== "/") {
        const T = f.record.path,
          k = T[T.length - 1] === "/" ? "" : "/";
        w.path = f.record.path + (x && k + x);
      }
      if (
        ((b = lp(w, f, d)),
        h
          ? h.alias.push(b)
          : ((v = v || b),
            v !== b && v.alias.push(b),
            p && c.name && !zl(b) && o(c.name)),
        g.children)
      ) {
        const T = g.children;
        for (let k = 0; k < T.length; k++) s(T[k], b, h && h.children[k]);
      }
      (h = h || b),
        ((b.record.components && Object.keys(b.record.components).length) ||
          b.record.name ||
          b.record.redirect) &&
          u(b);
    }
    return v
      ? () => {
          o(v);
        }
      : Pr;
  }
  function o(c) {
    if (Pu(c)) {
      const f = r.get(c);
      f &&
        (r.delete(c),
        n.splice(n.indexOf(f), 1),
        f.children.forEach(o),
        f.alias.forEach(o));
    } else {
      const f = n.indexOf(c);
      f > -1 &&
        (n.splice(f, 1),
        c.record.name && r.delete(c.record.name),
        c.children.forEach(o),
        c.alias.forEach(o));
    }
  }
  function l() {
    return n;
  }
  function u(c) {
    let f = 0;
    for (
      ;
      f < n.length &&
      rp(c, n[f]) >= 0 &&
      (c.record.path !== n[f].record.path || !Su(c, n[f]));

    )
      f++;
    n.splice(f, 0, c), c.record.name && !zl(c) && r.set(c.record.name, c);
  }
  function a(c, f) {
    let h,
      p = {},
      g,
      d;
    if ("name" in c && c.name) {
      if (((h = r.get(c.name)), !h)) throw ir(1, { location: c });
      (d = h.record.name),
        (p = ue(
          $l(
            f.params,
            h.keys.filter((v) => !v.optional).map((v) => v.name)
          ),
          c.params &&
            $l(
              c.params,
              h.keys.map((v) => v.name)
            )
        )),
        (g = h.stringify(p));
    } else if ("path" in c)
      (g = c.path),
        (h = n.find((v) => v.re.test(g))),
        h && ((p = h.parse(g)), (d = h.record.name));
    else {
      if (((h = f.name ? r.get(f.name) : n.find((v) => v.re.test(f.path))), !h))
        throw ir(1, { location: c, currentLocation: f });
      (d = h.record.name),
        (p = ue({}, f.params, c.params)),
        (g = h.stringify(p));
    }
    const m = [];
    let b = h;
    for (; b; ) m.unshift(b.record), (b = b.parent);
    return { name: d, path: g, params: p, matched: m, meta: fp(m) };
  }
  return (
    t.forEach((c) => s(c)),
    {
      addRoute: s,
      resolve: a,
      removeRoute: o,
      getRoutes: l,
      getRecordMatcher: i,
    }
  );
}
function $l(t, e) {
  const n = {};
  for (const r of e) r in t && (n[r] = t[r]);
  return n;
}
function up(t) {
  return {
    path: t.path,
    redirect: t.redirect,
    name: t.name,
    meta: t.meta || {},
    aliasOf: void 0,
    beforeEnter: t.beforeEnter,
    props: cp(t),
    children: t.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in t
        ? t.components || null
        : t.component && { default: t.component },
  };
}
function cp(t) {
  const e = {},
    n = t.props || !1;
  if ("component" in t) e.default = n;
  else for (const r in t.components) e[r] = typeof n == "boolean" ? n : n[r];
  return e;
}
function zl(t) {
  for (; t; ) {
    if (t.record.aliasOf) return !0;
    t = t.parent;
  }
  return !1;
}
function fp(t) {
  return t.reduce((e, n) => ue(e, n.meta), {});
}
function Bl(t, e) {
  const n = {};
  for (const r in t) n[r] = r in e ? e[r] : t[r];
  return n;
}
function Su(t, e) {
  return e.children.some((n) => n === t || Su(t, n));
}
const ku = /#/g,
  hp = /&/g,
  dp = /\//g,
  pp = /=/g,
  _p = /\?/g,
  Ou = /\+/g,
  gp = /%5B/g,
  mp = /%5D/g,
  Mu = /%5E/g,
  vp = /%60/g,
  Au = /%7B/g,
  yp = /%7C/g,
  Lu = /%7D/g,
  bp = /%20/g;
function wo(t) {
  return encodeURI("" + t)
    .replace(yp, "|")
    .replace(gp, "[")
    .replace(mp, "]");
}
function wp(t) {
  return wo(t).replace(Au, "{").replace(Lu, "}").replace(Mu, "^");
}
function Ms(t) {
  return wo(t)
    .replace(Ou, "%2B")
    .replace(bp, "+")
    .replace(ku, "%23")
    .replace(hp, "%26")
    .replace(vp, "`")
    .replace(Au, "{")
    .replace(Lu, "}")
    .replace(Mu, "^");
}
function xp(t) {
  return Ms(t).replace(pp, "%3D");
}
function Ep(t) {
  return wo(t).replace(ku, "%23").replace(_p, "%3F");
}
function Tp(t) {
  return t == null ? "" : Ep(t).replace(dp, "%2F");
}
function yi(t) {
  try {
    return decodeURIComponent("" + t);
  } catch {}
  return "" + t;
}
function Cp(t) {
  const e = {};
  if (t === "" || t === "?") return e;
  const r = (t[0] === "?" ? t.slice(1) : t).split("&");
  for (let i = 0; i < r.length; ++i) {
    const s = r[i].replace(Ou, " "),
      o = s.indexOf("="),
      l = yi(o < 0 ? s : s.slice(0, o)),
      u = o < 0 ? null : yi(s.slice(o + 1));
    if (l in e) {
      let a = e[l];
      Ct(a) || (a = e[l] = [a]), a.push(u);
    } else e[l] = u;
  }
  return e;
}
function jl(t) {
  let e = "";
  for (let n in t) {
    const r = t[n];
    if (((n = xp(n)), r == null)) {
      r !== void 0 && (e += (e.length ? "&" : "") + n);
      continue;
    }
    (Ct(r) ? r.map((s) => s && Ms(s)) : [r && Ms(r)]).forEach((s) => {
      s !== void 0 &&
        ((e += (e.length ? "&" : "") + n), s != null && (e += "=" + s));
    });
  }
  return e;
}
function Pp(t) {
  const e = {};
  for (const n in t) {
    const r = t[n];
    r !== void 0 &&
      (e[n] = Ct(r)
        ? r.map((i) => (i == null ? null : "" + i))
        : r == null
        ? r
        : "" + r);
  }
  return e;
}
const Rp = Symbol(""),
  Ul = Symbol(""),
  Hi = Symbol(""),
  xo = Symbol(""),
  As = Symbol("");
function gr() {
  let t = [];
  function e(r) {
    return (
      t.push(r),
      () => {
        const i = t.indexOf(r);
        i > -1 && t.splice(i, 1);
      }
    );
  }
  function n() {
    t = [];
  }
  return { add: e, list: () => t, reset: n };
}
function tn(t, e, n, r, i) {
  const s = r && (r.enterCallbacks[i] = r.enterCallbacks[i] || []);
  return () =>
    new Promise((o, l) => {
      const u = (f) => {
          f === !1
            ? l(ir(4, { from: n, to: e }))
            : f instanceof Error
            ? l(f)
            : Jd(f)
            ? l(ir(2, { from: e, to: f }))
            : (s &&
                r.enterCallbacks[i] === s &&
                typeof f == "function" &&
                s.push(f),
              o());
        },
        a = t.call(r && r.instances[i], e, n, u);
      let c = Promise.resolve(a);
      t.length < 3 && (c = c.then(u)), c.catch((f) => l(f));
    });
}
function ls(t, e, n, r) {
  const i = [];
  for (const s of t)
    for (const o in s.components) {
      let l = s.components[o];
      if (!(e !== "beforeRouteEnter" && !s.instances[o]))
        if (Sp(l)) {
          const a = (l.__vccOpts || l)[e];
          a && i.push(tn(a, n, r, s, o));
        } else {
          let u = l();
          i.push(() =>
            u.then((a) => {
              if (!a)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${o}" at "${s.path}"`)
                );
              const c = Id(a) ? a.default : a;
              s.components[o] = c;
              const h = (c.__vccOpts || c)[e];
              return h && tn(h, n, r, s, o)();
            })
          );
        }
    }
  return i;
}
function Sp(t) {
  return (
    typeof t == "object" ||
    "displayName" in t ||
    "props" in t ||
    "__vccOpts" in t
  );
}
function Hl(t) {
  const e = Tt(Hi),
    n = Tt(xo),
    r = Ye(() => e.resolve(oe(t.to))),
    i = Ye(() => {
      const { matched: u } = r.value,
        { length: a } = u,
        c = u[a - 1],
        f = n.matched;
      if (!c || !f.length) return -1;
      const h = f.findIndex(rr.bind(null, c));
      if (h > -1) return h;
      const p = Vl(u[a - 2]);
      return a > 1 && Vl(c) === p && f[f.length - 1].path !== p
        ? f.findIndex(rr.bind(null, u[a - 2]))
        : h;
    }),
    s = Ye(() => i.value > -1 && Ap(n.params, r.value.params)),
    o = Ye(
      () =>
        i.value > -1 &&
        i.value === n.matched.length - 1 &&
        Tu(n.params, r.value.params)
    );
  function l(u = {}) {
    return Mp(u)
      ? e[oe(t.replace) ? "replace" : "push"](oe(t.to)).catch(Pr)
      : Promise.resolve();
  }
  return {
    route: r,
    href: Ye(() => r.value.href),
    isActive: s,
    isExactActive: o,
    navigate: l,
  };
}
const kp = Za({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Hl,
    setup(t, { slots: e }) {
      const n = Xt(Hl(t)),
        { options: r } = Tt(Hi),
        i = Ye(() => ({
          [Wl(t.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [Wl(
            t.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const s = e.default && e.default(n);
        return t.custom
          ? s
          : mu(
              "a",
              {
                "aria-current": n.isExactActive ? t.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: i.value,
              },
              s
            );
      };
    },
  }),
  Op = kp;
function Mp(t) {
  if (
    !(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey) &&
    !t.defaultPrevented &&
    !(t.button !== void 0 && t.button !== 0)
  ) {
    if (t.currentTarget && t.currentTarget.getAttribute) {
      const e = t.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(e)) return;
    }
    return t.preventDefault && t.preventDefault(), !0;
  }
}
function Ap(t, e) {
  for (const n in e) {
    const r = e[n],
      i = t[n];
    if (typeof r == "string") {
      if (r !== i) return !1;
    } else if (!Ct(i) || i.length !== r.length || r.some((s, o) => s !== i[o]))
      return !1;
  }
  return !0;
}
function Vl(t) {
  return t ? (t.aliasOf ? t.aliasOf.path : t.path) : "";
}
const Wl = (t, e, n) => t ?? e ?? n,
  Lp = Za({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(t, { attrs: e, slots: n }) {
      const r = Tt(As),
        i = Ye(() => t.route || r.value),
        s = Tt(Ul, 0),
        o = Ye(() => {
          let a = oe(s);
          const { matched: c } = i.value;
          let f;
          for (; (f = c[a]) && !f.components; ) a++;
          return a;
        }),
        l = Ye(() => i.value.matched[o.value]);
      li(
        Ul,
        Ye(() => o.value + 1)
      ),
        li(Rp, l),
        li(As, i);
      const u = Ce();
      return (
        Ht(
          () => [u.value, l.value, t.name],
          ([a, c, f], [h, p, g]) => {
            c &&
              ((c.instances[f] = a),
              p &&
                p !== c &&
                a &&
                a === h &&
                (c.leaveGuards.size || (c.leaveGuards = p.leaveGuards),
                c.updateGuards.size || (c.updateGuards = p.updateGuards))),
              a &&
                c &&
                (!p || !rr(c, p) || !h) &&
                (c.enterCallbacks[f] || []).forEach((d) => d(a));
          },
          { flush: "post" }
        ),
        () => {
          const a = i.value,
            c = t.name,
            f = l.value,
            h = f && f.components[c];
          if (!h) return ql(n.default, { Component: h, route: a });
          const p = f.props[c],
            g = p
              ? p === !0
                ? a.params
                : typeof p == "function"
                ? p(a)
                : p
              : null,
            m = mu(
              h,
              ue({}, g, e, {
                onVnodeUnmounted: (b) => {
                  b.component.isUnmounted && (f.instances[c] = null);
                },
                ref: u,
              })
            );
          return ql(n.default, { Component: m, route: a }) || m;
        }
      );
    },
  });
function ql(t, e) {
  if (!t) return null;
  const n = t(e);
  return n.length === 1 ? n[0] : n;
}
const Ip = Lp;
function Dp(t) {
  const e = ap(t.routes, t),
    n = t.parseQuery || Cp,
    r = t.stringifyQuery || jl,
    i = t.history,
    s = gr(),
    o = gr(),
    l = gr(),
    u = qf(Jt);
  let a = Jt;
  Un &&
    t.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const c = ss.bind(null, (M) => "" + M),
    f = ss.bind(null, Tp),
    h = ss.bind(null, yi);
  function p(M, W) {
    let H, Y;
    return (
      Pu(M) ? ((H = e.getRecordMatcher(M)), (Y = W)) : (Y = M), e.addRoute(Y, H)
    );
  }
  function g(M) {
    const W = e.getRecordMatcher(M);
    W && e.removeRoute(W);
  }
  function d() {
    return e.getRoutes().map((M) => M.record);
  }
  function m(M) {
    return !!e.getRecordMatcher(M);
  }
  function b(M, W) {
    if (((W = ue({}, W || u.value)), typeof M == "string")) {
      const _ = os(n, M, W.path),
        y = e.resolve({ path: _.path }, W),
        C = i.createHref(_.fullPath);
      return ue(_, y, {
        params: h(y.params),
        hash: yi(_.hash),
        redirectedFrom: void 0,
        href: C,
      });
    }
    let H;
    if ("path" in M) H = ue({}, M, { path: os(n, M.path, W.path).path });
    else {
      const _ = ue({}, M.params);
      for (const y in _) _[y] == null && delete _[y];
      (H = ue({}, M, { params: f(M.params) })), (W.params = f(W.params));
    }
    const Y = e.resolve(H, W),
      le = M.hash || "";
    Y.params = c(h(Y.params));
    const be = Nd(r, ue({}, M, { hash: wp(le), path: Y.path })),
      ne = i.createHref(be);
    return ue(
      { fullPath: be, hash: le, query: r === jl ? Pp(M.query) : M.query || {} },
      Y,
      { redirectedFrom: void 0, href: ne }
    );
  }
  function v(M) {
    return typeof M == "string" ? os(n, M, u.value.path) : ue({}, M);
  }
  function w(M, W) {
    if (a !== M) return ir(8, { from: W, to: M });
  }
  function x(M) {
    return A(M);
  }
  function T(M) {
    return x(ue(v(M), { replace: !0 }));
  }
  function k(M) {
    const W = M.matched[M.matched.length - 1];
    if (W && W.redirect) {
      const { redirect: H } = W;
      let Y = typeof H == "function" ? H(M) : H;
      return (
        typeof Y == "string" &&
          ((Y = Y.includes("?") || Y.includes("#") ? (Y = v(Y)) : { path: Y }),
          (Y.params = {})),
        ue(
          { query: M.query, hash: M.hash, params: "path" in Y ? {} : M.params },
          Y
        )
      );
    }
  }
  function A(M, W) {
    const H = (a = b(M)),
      Y = u.value,
      le = M.state,
      be = M.force,
      ne = M.replace === !0,
      _ = k(H);
    if (_)
      return A(
        ue(v(_), {
          state: typeof _ == "object" ? ue({}, le, _.state) : le,
          force: be,
          replace: ne,
        }),
        W || H
      );
    const y = H;
    y.redirectedFrom = W;
    let C;
    return (
      !be &&
        $d(r, Y, H) &&
        ((C = ir(16, { to: y, from: Y })), _e(Y, Y, !0, !1)),
      (C ? Promise.resolve(C) : R(y, Y))
        .catch((S) => ($t(S) ? ($t(S, 2) ? S : Ee(S)) : q(S, y, Y)))
        .then((S) => {
          if (S) {
            if ($t(S, 2))
              return A(
                ue({ replace: ne }, v(S.to), {
                  state: typeof S.to == "object" ? ue({}, le, S.to.state) : le,
                  force: be,
                }),
                W || y
              );
          } else S = O(y, Y, !0, ne, le);
          return U(y, Y, S), S;
        })
    );
  }
  function P(M, W) {
    const H = w(M, W);
    return H ? Promise.reject(H) : Promise.resolve();
  }
  function R(M, W) {
    let H;
    const [Y, le, be] = Fp(M, W);
    H = ls(Y.reverse(), "beforeRouteLeave", M, W);
    for (const _ of Y)
      _.leaveGuards.forEach((y) => {
        H.push(tn(y, M, W));
      });
    const ne = P.bind(null, M, W);
    return (
      H.push(ne),
      Bn(H)
        .then(() => {
          H = [];
          for (const _ of s.list()) H.push(tn(_, M, W));
          return H.push(ne), Bn(H);
        })
        .then(() => {
          H = ls(le, "beforeRouteUpdate", M, W);
          for (const _ of le)
            _.updateGuards.forEach((y) => {
              H.push(tn(y, M, W));
            });
          return H.push(ne), Bn(H);
        })
        .then(() => {
          H = [];
          for (const _ of M.matched)
            if (_.beforeEnter && !W.matched.includes(_))
              if (Ct(_.beforeEnter))
                for (const y of _.beforeEnter) H.push(tn(y, M, W));
              else H.push(tn(_.beforeEnter, M, W));
          return H.push(ne), Bn(H);
        })
        .then(
          () => (
            M.matched.forEach((_) => (_.enterCallbacks = {})),
            (H = ls(be, "beforeRouteEnter", M, W)),
            H.push(ne),
            Bn(H)
          )
        )
        .then(() => {
          H = [];
          for (const _ of o.list()) H.push(tn(_, M, W));
          return H.push(ne), Bn(H);
        })
        .catch((_) => ($t(_, 8) ? _ : Promise.reject(_)))
    );
  }
  function U(M, W, H) {
    for (const Y of l.list()) Y(M, W, H);
  }
  function O(M, W, H, Y, le) {
    const be = w(M, W);
    if (be) return be;
    const ne = W === Jt,
      _ = Un ? history.state : {};
    H &&
      (Y || ne
        ? i.replace(M.fullPath, ue({ scroll: ne && _ && _.scroll }, le))
        : i.push(M.fullPath, le)),
      (u.value = M),
      _e(M, W, H, ne),
      Ee();
  }
  let E;
  function I() {
    E ||
      (E = i.listen((M, W, H) => {
        const Y = b(M),
          le = k(Y);
        if (le) {
          A(ue(le, { replace: !0 }), Y).catch(Pr);
          return;
        }
        a = Y;
        const be = u.value;
        Un && qd(Ll(be.fullPath, H.delta), Ui()),
          R(Y, be)
            .catch((ne) =>
              $t(ne, 12)
                ? ne
                : $t(ne, 2)
                ? (A(ne.to, Y)
                    .then((_) => {
                      $t(_, 20) &&
                        !H.delta &&
                        H.type === Br.pop &&
                        i.go(-1, !1);
                    })
                    .catch(Pr),
                  Promise.reject())
                : (H.delta && i.go(-H.delta, !1), q(ne, Y, be))
            )
            .then((ne) => {
              (ne = ne || O(Y, be, !1)),
                ne &&
                  (H.delta && !$t(ne, 8)
                    ? i.go(-H.delta, !1)
                    : H.type === Br.pop && $t(ne, 20) && i.go(-1, !1)),
                U(Y, be, ne);
            })
            .catch(Pr);
      }));
  }
  let D = gr(),
    j = gr(),
    z;
  function q(M, W, H) {
    Ee(M);
    const Y = j.list();
    return (
      Y.length ? Y.forEach((le) => le(M, W, H)) : console.error(M),
      Promise.reject(M)
    );
  }
  function X() {
    return z && u.value !== Jt
      ? Promise.resolve()
      : new Promise((M, W) => {
          D.add([M, W]);
        });
  }
  function Ee(M) {
    return (
      z ||
        ((z = !M),
        I(),
        D.list().forEach(([W, H]) => (M ? H(M) : W())),
        D.reset()),
      M
    );
  }
  function _e(M, W, H, Y) {
    const { scrollBehavior: le } = t;
    if (!Un || !le) return Promise.resolve();
    const be =
      (!H && Kd(Ll(M.fullPath, 0))) ||
      ((Y || !H) && history.state && history.state.scroll) ||
      null;
    return uo()
      .then(() => le(M, W, be))
      .then((ne) => ne && Wd(ne))
      .catch((ne) => q(ne, M, W));
  }
  const Ie = (M) => i.go(M);
  let Te;
  const Nt = new Set();
  return {
    currentRoute: u,
    listening: !0,
    addRoute: p,
    removeRoute: g,
    hasRoute: m,
    getRoutes: d,
    resolve: b,
    options: t,
    push: x,
    replace: T,
    go: Ie,
    back: () => Ie(-1),
    forward: () => Ie(1),
    beforeEach: s.add,
    beforeResolve: o.add,
    afterEach: l.add,
    onError: j.add,
    isReady: X,
    install(M) {
      const W = this;
      M.component("RouterLink", Op),
        M.component("RouterView", Ip),
        (M.config.globalProperties.$router = W),
        Object.defineProperty(M.config.globalProperties, "$route", {
          enumerable: !0,
          get: () => oe(u),
        }),
        Un &&
          !Te &&
          u.value === Jt &&
          ((Te = !0), x(i.location).catch((le) => {}));
      const H = {};
      for (const le in Jt) H[le] = Ye(() => u.value[le]);
      M.provide(Hi, W), M.provide(xo, Xt(H)), M.provide(As, u);
      const Y = M.unmount;
      Nt.add(M),
        (M.unmount = function () {
          Nt.delete(M),
            Nt.size < 1 &&
              ((a = Jt),
              E && E(),
              (E = null),
              (u.value = Jt),
              (Te = !1),
              (z = !1)),
            Y();
        });
    },
  };
}
function Bn(t) {
  return t.reduce((e, n) => e.then(() => n()), Promise.resolve());
}
function Fp(t, e) {
  const n = [],
    r = [],
    i = [],
    s = Math.max(e.matched.length, t.matched.length);
  for (let o = 0; o < s; o++) {
    const l = e.matched[o];
    l && (t.matched.find((a) => rr(a, l)) ? r.push(l) : n.push(l));
    const u = t.matched[o];
    u && (e.matched.find((a) => rr(a, u)) || i.push(u));
  }
  return [n, r, i];
}
function Eo() {
  return Tt(Hi);
}
function jr() {
  return Tt(xo);
}
const To = { politeness: "polite" },
  Ur = Xt({ content: "", politeness: To.politeness });
function Co(t, e = To.politeness) {
  Iu(), (Ur.politeness = e), (Ur.content = t);
}
const Np = (t) => {
  Co(t, "polite");
};
function $p(t) {
  Co(t, "assertive");
}
function Iu() {
  (Ur.content = ""), (Ur.politeness = To.politeness);
}
function Du() {
  return {
    announcer: Ur,
    setAnnouncer: Co,
    announcePolite: Np,
    announceAssertive: $p,
    resetAnnouncer: Iu,
  };
}
const zp =
    /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  Bp =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  jp = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function Up(t, e) {
  if (
    t !== "__proto__" &&
    !(t === "constructor" && e && typeof e == "object" && "prototype" in e)
  )
    return e;
}
function Hp(t, e = {}) {
  if (typeof t != "string") return t;
  const n = t.toLowerCase().trim();
  if (n === "true") return !0;
  if (n === "false") return !1;
  if (n === "null") return null;
  if (n === "nan") return Number.NaN;
  if (n === "infinity") return Number.POSITIVE_INFINITY;
  if (n !== "undefined") {
    if (!jp.test(t)) {
      if (e.strict) throw new SyntaxError("Invalid JSON");
      return t;
    }
    try {
      return zp.test(t) || Bp.test(t) ? JSON.parse(t, Up) : JSON.parse(t);
    } catch (r) {
      if (e.strict) throw r;
      return t;
    }
  }
}
const Vp = /#/g,
  Wp = /&/g,
  qp = /=/g,
  Fu = /\+/g,
  Kp = /%5e/gi,
  Xp = /%60/gi,
  Yp = /%7c/gi,
  Gp = /%20/gi;
function Qp(t) {
  return encodeURI("" + t).replace(Yp, "|");
}
function Ls(t) {
  return Qp(typeof t == "string" ? t : JSON.stringify(t))
    .replace(Fu, "%2B")
    .replace(Gp, "+")
    .replace(Vp, "%23")
    .replace(Wp, "%26")
    .replace(Xp, "`")
    .replace(Kp, "^");
}
function as(t) {
  return Ls(t).replace(qp, "%3D");
}
function Nu(t = "") {
  try {
    return decodeURIComponent("" + t);
  } catch {
    return "" + t;
  }
}
function Jp(t) {
  return Nu(t.replace(Fu, " "));
}
function Zp(t = "") {
  const e = {};
  t[0] === "?" && (t = t.slice(1));
  for (const n of t.split("&")) {
    const r = n.match(/([^=]+)=?(.*)/) || [];
    if (r.length < 2) continue;
    const i = Nu(r[1]);
    if (i === "__proto__" || i === "constructor") continue;
    const s = Jp(r[2] || "");
    typeof e[i] < "u"
      ? Array.isArray(e[i])
        ? e[i].push(s)
        : (e[i] = [e[i], s])
      : (e[i] = s);
  }
  return e;
}
function e_(t, e) {
  return (
    (typeof e == "number" || typeof e == "boolean") && (e = String(e)),
    e
      ? Array.isArray(e)
        ? e.map((n) => `${as(t)}=${Ls(n)}`).join("&")
        : `${as(t)}=${Ls(e)}`
      : as(t)
  );
}
function t_(t) {
  return Object.keys(t)
    .filter((e) => t[e] !== void 0)
    .map((e) => e_(e, t[e]))
    .join("&");
}
const n_ = /^\w{2,}:([/\\]{1,2})/,
  r_ = /^\w{2,}:([/\\]{2})?/,
  i_ = /^([/\\]\s*){2,}[^/\\]/;
function $u(t, e = {}) {
  return (
    typeof e == "boolean" && (e = { acceptRelative: e }),
    e.strict ? n_.test(t) : r_.test(t) || (e.acceptRelative ? i_.test(t) : !1)
  );
}
const s_ = /\/$|\/\?/;
function Is(t = "", e = !1) {
  return e ? s_.test(t) : t.endsWith("/");
}
function o_(t = "", e = !1) {
  if (!e) return (Is(t) ? t.slice(0, -1) : t) || "/";
  if (!Is(t, !0)) return t || "/";
  const [n, ...r] = t.split("?");
  return (n.slice(0, -1) || "/") + (r.length > 0 ? `?${r.join("?")}` : "");
}
function l_(t = "", e = !1) {
  if (!e) return t.endsWith("/") ? t : t + "/";
  if (Is(t, !0)) return t || "/";
  const [n, ...r] = t.split("?");
  return n + "/" + (r.length > 0 ? `?${r.join("?")}` : "");
}
function a_(t = "") {
  return t.startsWith("/");
}
function u_(t = "") {
  return (a_(t) ? t.slice(1) : t) || "/";
}
function c_(t, e) {
  if (f_(e) || $u(t)) return t;
  const n = o_(e);
  return t.startsWith(n) ? t : zu(n, t);
}
function Po(t, e) {
  const n = Bu(t),
    r = { ...Zp(n.search), ...e };
  return (n.search = t_(r)), d_(n);
}
function f_(t) {
  return !t || t === "/";
}
function h_(t) {
  return t && t !== "/";
}
function zu(t, ...e) {
  let n = t || "";
  for (const r of e.filter((i) => h_(i))) n = n ? l_(n) + u_(r) : r;
  return n;
}
function Bu(t = "", e) {
  if (!$u(t, { acceptRelative: !0 })) return e ? Bu(e + t) : Kl(t);
  const [n = "", r, i = ""] = (
      t.replace(/\\/g, "/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []
    ).splice(1),
    [s = "", o = ""] = (i.match(/([^#/?]*)(.*)?/) || []).splice(1),
    { pathname: l, search: u, hash: a } = Kl(o.replace(/\/(?=[A-Za-z]:)/, ""));
  return {
    protocol: n,
    auth: r ? r.slice(0, Math.max(0, r.length - 1)) : "",
    host: s,
    pathname: l,
    search: u,
    hash: a,
  };
}
function Kl(t = "") {
  const [e = "", n = "", r = ""] = (
    t.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []
  ).splice(1);
  return { pathname: e, search: n, hash: r };
}
function d_(t) {
  const e =
    t.pathname +
    (t.search ? (t.search.startsWith("?") ? "" : "?") + t.search : "") +
    t.hash;
  return t.protocol
    ? t.protocol + "//" + (t.auth ? t.auth + "@" : "") + t.host + e
    : e;
}
class p_ extends Error {
  constructor() {
    super(...arguments), (this.name = "FetchError");
  }
}
function __(t, e, n) {
  let r = "";
  e && (r = e.message),
    t && n
      ? (r = `${r} (${n.status} ${n.statusText} (${t.toString()}))`)
      : t && (r = `${r} (${t.toString()})`);
  const i = new p_(r);
  return (
    Object.defineProperty(i, "request", {
      get() {
        return t;
      },
    }),
    Object.defineProperty(i, "response", {
      get() {
        return n;
      },
    }),
    Object.defineProperty(i, "data", {
      get() {
        return n && n._data;
      },
    }),
    Object.defineProperty(i, "status", {
      get() {
        return n && n.status;
      },
    }),
    Object.defineProperty(i, "statusText", {
      get() {
        return n && n.statusText;
      },
    }),
    Object.defineProperty(i, "statusCode", {
      get() {
        return n && n.status;
      },
    }),
    Object.defineProperty(i, "statusMessage", {
      get() {
        return n && n.statusText;
      },
    }),
    i
  );
}
const g_ = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function Xl(t = "GET") {
  return g_.has(t.toUpperCase());
}
function m_(t) {
  if (t === void 0) return !1;
  const e = typeof t;
  return e === "string" || e === "number" || e === "boolean" || e === null
    ? !0
    : e !== "object"
    ? !1
    : Array.isArray(t)
    ? !0
    : (t.constructor && t.constructor.name === "Object") ||
      typeof t.toJSON == "function";
}
const v_ = new Set([
    "image/svg",
    "application/xml",
    "application/xhtml",
    "application/html",
  ]),
  y_ = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function b_(t = "") {
  if (!t) return "json";
  const e = t.split(";").shift() || "";
  return y_.test(e)
    ? "json"
    : v_.has(e) || e.startsWith("text/")
    ? "text"
    : "blob";
}
const w_ = new Set([408, 409, 425, 429, 500, 502, 503, 504]);
function ju(t) {
  const { fetch: e, Headers: n } = t;
  function r(o) {
    const l = (o.error && o.error.name === "AbortError") || !1;
    if (o.options.retry !== !1 && !l) {
      let a;
      typeof o.options.retry == "number"
        ? (a = o.options.retry)
        : (a = Xl(o.options.method) ? 0 : 1);
      const c = (o.response && o.response.status) || 500;
      if (a > 0 && w_.has(c))
        return i(o.request, { ...o.options, retry: a - 1 });
    }
    const u = __(o.request, o.error, o.response);
    throw (Error.captureStackTrace && Error.captureStackTrace(u, i), u);
  }
  const i = async function (l, u = {}) {
      const a = {
        request: l,
        options: { ...t.defaults, ...u },
        response: void 0,
        error: void 0,
      };
      a.options.onRequest && (await a.options.onRequest(a)),
        typeof a.request == "string" &&
          (a.options.baseURL && (a.request = c_(a.request, a.options.baseURL)),
          (a.options.query || a.options.params) &&
            (a.request = Po(a.request, {
              ...a.options.params,
              ...a.options.query,
            })),
          a.options.body &&
            Xl(a.options.method) &&
            m_(a.options.body) &&
            ((a.options.body =
              typeof a.options.body == "string"
                ? a.options.body
                : JSON.stringify(a.options.body)),
            (a.options.headers = new n(a.options.headers)),
            a.options.headers.has("content-type") ||
              a.options.headers.set("content-type", "application/json"),
            a.options.headers.has("accept") ||
              a.options.headers.set("accept", "application/json"))),
        (a.response = await e(a.request, a.options).catch(
          async (f) => (
            (a.error = f),
            a.options.onRequestError && (await a.options.onRequestError(a)),
            r(a)
          )
        ));
      const c =
        (a.options.parseResponse ? "json" : a.options.responseType) ||
        b_(a.response.headers.get("content-type") || "");
      if (c === "json") {
        const f = await a.response.text(),
          h = a.options.parseResponse || Hp;
        a.response._data = h(f);
      } else
        c === "stream"
          ? (a.response._data = a.response.body)
          : (a.response._data = await a.response[c]());
      return (
        a.options.onResponse && (await a.options.onResponse(a)),
        a.response.status >= 400 && a.response.status < 600
          ? (a.options.onResponseError && (await a.options.onResponseError(a)),
            r(a))
          : a.response
      );
    },
    s = function (l, u) {
      return i(l, u).then((a) => a._data);
    };
  return (
    (s.raw = i),
    (s.native = e),
    (s.create = (o = {}) => ju({ ...t, defaults: { ...t.defaults, ...o } })),
    s
  );
}
const Uu = (function () {
    if (typeof globalThis < "u") return globalThis;
    if (typeof self < "u") return self;
    if (typeof window < "u") return window;
    if (typeof global < "u") return global;
    throw new Error("unable to locate global object");
  })(),
  x_ =
    Uu.fetch ||
    (() =>
      Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),
  E_ = Uu.Headers,
  T_ = ju({ fetch: x_, Headers: E_ }),
  C_ = T_,
  bi = new Map();
function P_(t) {
  const { isMultilang: e, languageCode: n } = Vu();
  return zu(e ? `/${n}` : "/", "app", t);
}
async function R_(t, { revalidate: e = !1, query: n = {} } = {}) {
  let r;
  const i = Hu(t, n),
    s = P_(Po(`${t}.json`, n));
  if (!e && i) return bi.get(t);
  try {
    r = await C_(s);
  } catch (o) {
    return console.error(o), !1;
  }
  return (!i || e) && bi.set(t, r), r;
}
function Hu(t, e = {}) {
  return bi.has(Po(t, e));
}
function S_() {
  return { cache: bi, hasPage: Hu, getPage: R_ };
}
const k_ = !1,
  O_ = document.documentElement.lang;
function Vu() {
  return { isMultilang: k_, languageCode: O_ };
}
const Vi = Xt({
    selectedCategory: "",
    bigImage: !1,
    bigImageCaption: "",
    mobileMenuOpen: !1,
    aboutPostPath: null,
    pageTitle: "",
    previousRoute: "",
  }),
  M_ = Object.freeze(
    Object.defineProperty({ __proto__: null, store: Vi }, Symbol.toStringTag, {
      value: "Module",
    })
  );
function Wi(t, e = {}) {
  const n = Eo(),
    { path: r, query: i } = jr(),
    { hasPage: s, getPage: o } = S_(),
    { setAnnouncer: l } = Du();
  let u = (t ?? r).replace(/^\/|\/$/g, "");
  const a = i.token;
  u || (u = "home");
  let c;
  const f = new Promise((p) => {
      c = p;
    }),
    h = Xt({ __status: "pending", isReady: !1, isReadyPromise: () => f });
  return (
    (async () => {
      s(u, e);
      let p = await o(u, { query: { ...e, ...(a ? { token: a } : {}) } });
      if (!p) {
        h.__status = "error";
        return;
      }
      if (!t && p.__isErrorPage && r !== "/error") {
        if (
          ((p = await o("/projects/" + u, {
            query: { ...e, ...(a ? { token: a } : {}) },
          })),
          !p)
        ) {
          h.__status = "error";
          return;
        }
        if (p.__isErrorPage && r !== "/error") {
          n.replace({ path: "/error" });
          return;
        }
      }
      Object.assign(h, p),
        (h.__status = "resolved"),
        (h.isReady = !0),
        c == null || c(),
        t ||
          ((document.title = h.metaTitle),
          (Vi.pageTitle = h.metaTitle),
          l(`Navigated to ${h.title}`));
    })(),
    Ai(h)
  );
}
const Wu = JSON.parse(document.getElementById("site-data").textContent);
Wu.isReady = !0;
const A_ = Xt(Wu);
function In() {
  return Ai(A_);
}
const Nn = (t, e) => {
    const n = t.__vccOpts || t;
    for (const [r, i] of e) n[r] = i;
    return n;
  },
  L_ = {},
  I_ = { class: "intro" };
function D_(t, e) {
  return fe(), Oe("header", I_, [ee("h1", null, [Th(t.$slots, "default")])]);
}
const F_ = Nn(L_, [["render", D_]]);
const N_ = ["innerHTML"],
  $_ = {
    __name: "Default",
    setup(t) {
      const e = Wi();
      return (n, r) => {
        const i = F_,
          s = ru("kirbytext");
        return (
          fe(),
          Oe(
            Pe,
            null,
            [
              me(i, null, {
                default: wt(() => [Mt(Lt(oe(e).title) + "ee", 1)]),
                _: 1,
              }),
              oe(e).isReady
                ? br(
                    (fe(),
                    Oe(
                      "div",
                      { key: 0, class: "text", innerHTML: oe(e).text },
                      null,
                      8,
                      N_
                    )),
                    [[s]]
                  )
                : Rs("", !0),
            ],
            64
          )
        );
      };
    },
  },
  ui = Nn($_, [["__scopeId", "data-v-5e981d71"]]),
  Yl = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: ui },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function jt(t) {
  if (t === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return t;
}
function qu(t, e) {
  (t.prototype = Object.create(e.prototype)),
    (t.prototype.constructor = t),
    (t.__proto__ = e);
}
/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var ot = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: { lineHeight: "" },
  },
  sr = { duration: 0.5, overwrite: !1, delay: 0 },
  Ro,
  Ve,
  ye,
  ht = 1e8,
  pe = 1 / ht,
  Ds = Math.PI * 2,
  z_ = Ds / 4,
  B_ = 0,
  Ku = Math.sqrt,
  j_ = Math.cos,
  U_ = Math.sin,
  Ne = function (e) {
    return typeof e == "string";
  },
  Re = function (e) {
    return typeof e == "function";
  },
  qt = function (e) {
    return typeof e == "number";
  },
  So = function (e) {
    return typeof e > "u";
  },
  Ft = function (e) {
    return typeof e == "object";
  },
  Ge = function (e) {
    return e !== !1;
  },
  ko = function () {
    return typeof window < "u";
  },
  si = function (e) {
    return Re(e) || Ne(e);
  },
  Xu =
    (typeof ArrayBuffer == "function" && ArrayBuffer.isView) || function () {},
  We = Array.isArray,
  Fs = /(?:-?\.?\d|\.)+/gi,
  Yu = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
  Hn = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
  us = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
  Gu = /[+-]=-?[.\d]+/,
  Qu = /[^,'"\[\]\s]+/gi,
  H_ = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
  we,
  Rt,
  Ns,
  Oo,
  lt = {},
  wi = {},
  Ju,
  Zu = function (e) {
    return (wi = Dn(e, lt)) && tt;
  },
  Mo = function (e, n) {
    return console.warn(
      "Invalid property",
      e,
      "set to",
      n,
      "Missing plugin? gsap.registerPlugin()"
    );
  },
  Hr = function (e, n) {
    return !n && console.warn(e);
  },
  ec = function (e, n) {
    return (e && (lt[e] = n) && wi && (wi[e] = n)) || lt;
  },
  Vr = function () {
    return 0;
  },
  V_ = { suppressEvents: !0, isStart: !0, kill: !1 },
  ci = { suppressEvents: !0, kill: !1 },
  W_ = { suppressEvents: !0 },
  Ao = {},
  un = [],
  $s = {},
  tc,
  rt = {},
  cs = {},
  Gl = 30,
  fi = [],
  Lo = "",
  Io = function (e) {
    var n = e[0],
      r,
      i;
    if ((Ft(n) || Re(n) || (e = [e]), !(r = (n._gsap || {}).harness))) {
      for (i = fi.length; i-- && !fi[i].targetTest(n); );
      r = fi[i];
    }
    for (i = e.length; i--; )
      (e[i] && (e[i]._gsap || (e[i]._gsap = new Cc(e[i], r)))) ||
        e.splice(i, 1);
    return e;
  },
  On = function (e) {
    return e._gsap || Io(dt(e))[0]._gsap;
  },
  nc = function (e, n, r) {
    return (r = e[n]) && Re(r)
      ? e[n]()
      : (So(r) && e.getAttribute && e.getAttribute(n)) || r;
  },
  Qe = function (e, n) {
    return (e = e.split(",")).forEach(n) || e;
  },
  ke = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  De = function (e) {
    return Math.round(e * 1e7) / 1e7 || 0;
  },
  Gn = function (e, n) {
    var r = n.charAt(0),
      i = parseFloat(n.substr(2));
    return (
      (e = parseFloat(e)),
      r === "+" ? e + i : r === "-" ? e - i : r === "*" ? e * i : e / i
    );
  },
  q_ = function (e, n) {
    for (var r = n.length, i = 0; e.indexOf(n[i]) < 0 && ++i < r; );
    return i < r;
  },
  xi = function () {
    var e = un.length,
      n = un.slice(0),
      r,
      i;
    for ($s = {}, un.length = 0, r = 0; r < e; r++)
      (i = n[r]),
        i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
  },
  rc = function (e, n, r, i) {
    un.length && !Ve && xi(),
      e.render(n, r, i || (Ve && n < 0 && (e._initted || e._startAt))),
      un.length && !Ve && xi();
  },
  ic = function (e) {
    var n = parseFloat(e);
    return (n || n === 0) && (e + "").match(Qu).length < 2
      ? n
      : Ne(e)
      ? e.trim()
      : e;
  },
  sc = function (e) {
    return e;
  },
  mt = function (e, n) {
    for (var r in n) r in e || (e[r] = n[r]);
    return e;
  },
  K_ = function (e) {
    return function (n, r) {
      for (var i in r)
        i in n || (i === "duration" && e) || i === "ease" || (n[i] = r[i]);
    };
  },
  Dn = function (e, n) {
    for (var r in n) e[r] = n[r];
    return e;
  },
  Ql = function t(e, n) {
    for (var r in n)
      r !== "__proto__" &&
        r !== "constructor" &&
        r !== "prototype" &&
        (e[r] = Ft(n[r]) ? t(e[r] || (e[r] = {}), n[r]) : n[r]);
    return e;
  },
  Ei = function (e, n) {
    var r = {},
      i;
    for (i in e) i in n || (r[i] = e[i]);
    return r;
  },
  Sr = function (e) {
    var n = e.parent || we,
      r = e.keyframes ? K_(We(e.keyframes)) : mt;
    if (Ge(e.inherit))
      for (; n; ) r(e, n.vars.defaults), (n = n.parent || n._dp);
    return e;
  },
  X_ = function (e, n) {
    for (var r = e.length, i = r === n.length; i && r-- && e[r] === n[r]; );
    return r < 0;
  },
  oc = function (e, n, r, i, s) {
    r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
    var o = e[i],
      l;
    if (s) for (l = n[s]; o && o[s] > l; ) o = o._prev;
    return (
      o ? ((n._next = o._next), (o._next = n)) : ((n._next = e[r]), (e[r] = n)),
      n._next ? (n._next._prev = n) : (e[i] = n),
      (n._prev = o),
      (n.parent = n._dp = e),
      n
    );
  },
  qi = function (e, n, r, i) {
    r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
    var s = n._prev,
      o = n._next;
    s ? (s._next = o) : e[r] === n && (e[r] = o),
      o ? (o._prev = s) : e[i] === n && (e[i] = s),
      (n._next = n._prev = n.parent = null);
  },
  hn = function (e, n) {
    e.parent &&
      (!n || e.parent.autoRemoveChildren) &&
      e.parent.remove &&
      e.parent.remove(e),
      (e._act = 0);
  },
  Mn = function (e, n) {
    if (e && (!n || n._end > e._dur || n._start < 0))
      for (var r = e; r; ) (r._dirty = 1), (r = r.parent);
    return e;
  },
  Y_ = function (e) {
    for (var n = e.parent; n && n.parent; )
      (n._dirty = 1), n.totalDuration(), (n = n.parent);
    return e;
  },
  zs = function (e, n, r, i) {
    return (
      e._startAt &&
      (Ve
        ? e._startAt.revert(ci)
        : (e.vars.immediateRender && !e.vars.autoRevert) ||
          e._startAt.render(n, !0, i))
    );
  },
  G_ = function t(e) {
    return !e || (e._ts && t(e.parent));
  },
  Jl = function (e) {
    return e._repeat ? or(e._tTime, (e = e.duration() + e._rDelay)) * e : 0;
  },
  or = function (e, n) {
    var r = Math.floor((e /= n));
    return e && r === e ? r - 1 : r;
  },
  Ti = function (e, n) {
    return (
      (e - n._start) * n._ts +
      (n._ts >= 0 ? 0 : n._dirty ? n.totalDuration() : n._tDur)
    );
  },
  Ki = function (e) {
    return (e._end = De(
      e._start + (e._tDur / Math.abs(e._ts || e._rts || pe) || 0)
    ));
  },
  Xi = function (e, n) {
    var r = e._dp;
    return (
      r &&
        r.smoothChildTiming &&
        e._ts &&
        ((e._start = De(
          r._time -
            (e._ts > 0
              ? n / e._ts
              : ((e._dirty ? e.totalDuration() : e._tDur) - n) / -e._ts)
        )),
        Ki(e),
        r._dirty || Mn(r, e)),
      e
    );
  },
  lc = function (e, n) {
    var r;
    if (
      ((n._time ||
        (!n._dur && n._initted) ||
        (n._start < e._time && (n._dur || !n.add))) &&
        ((r = Ti(e.rawTime(), n)),
        (!n._dur || Qr(0, n.totalDuration(), r) - n._tTime > pe) &&
          n.render(r, !0)),
      Mn(e, n)._dp && e._initted && e._time >= e._dur && e._ts)
    ) {
      if (e._dur < e.duration())
        for (r = e; r._dp; )
          r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp);
      e._zTime = -pe;
    }
  },
  Ot = function (e, n, r, i) {
    return (
      n.parent && hn(n),
      (n._start = De(
        (qt(r) ? r : r || e !== we ? ft(e, r, n) : e._time) + n._delay
      )),
      (n._end = De(
        n._start + (n.totalDuration() / Math.abs(n.timeScale()) || 0)
      )),
      oc(e, n, "_first", "_last", e._sort ? "_start" : 0),
      Bs(n) || (e._recent = n),
      i || lc(e, n),
      e._ts < 0 && Xi(e, e._tTime),
      e
    );
  },
  ac = function (e, n) {
    return (
      (lt.ScrollTrigger || Mo("scrollTrigger", n)) &&
      lt.ScrollTrigger.create(n, e)
    );
  },
  uc = function (e, n, r, i, s) {
    if ((Fo(e, n, s), !e._initted)) return 1;
    if (
      !r &&
      e._pt &&
      !Ve &&
      ((e._dur && e.vars.lazy !== !1) || (!e._dur && e.vars.lazy)) &&
      tc !== it.frame
    )
      return un.push(e), (e._lazy = [s, i]), 1;
  },
  Q_ = function t(e) {
    var n = e.parent;
    return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || t(n));
  },
  Bs = function (e) {
    var n = e.data;
    return n === "isFromStart" || n === "isStart";
  },
  J_ = function (e, n, r, i) {
    var s = e.ratio,
      o =
        n < 0 ||
        (!n &&
          ((!e._start && Q_(e) && !(!e._initted && Bs(e))) ||
            ((e._ts < 0 || e._dp._ts < 0) && !Bs(e))))
          ? 0
          : 1,
      l = e._rDelay,
      u = 0,
      a,
      c,
      f;
    if (
      (l &&
        e._repeat &&
        ((u = Qr(0, e._tDur, n)),
        (c = or(u, l)),
        e._yoyo && c & 1 && (o = 1 - o),
        c !== or(e._tTime, l) &&
          ((s = 1 - o), e.vars.repeatRefresh && e._initted && e.invalidate())),
      o !== s || Ve || i || e._zTime === pe || (!n && e._zTime))
    ) {
      if (!e._initted && uc(e, n, i, r, u)) return;
      for (
        f = e._zTime,
          e._zTime = n || (r ? pe : 0),
          r || (r = n && !f),
          e.ratio = o,
          e._from && (o = 1 - o),
          e._time = 0,
          e._tTime = u,
          a = e._pt;
        a;

      )
        a.r(o, a.d), (a = a._next);
      n < 0 && zs(e, n, r, !0),
        e._onUpdate && !r && st(e, "onUpdate"),
        u && e._repeat && !r && e.parent && st(e, "onRepeat"),
        (n >= e._tDur || n < 0) &&
          e.ratio === o &&
          (o && hn(e, 1),
          !r &&
            !Ve &&
            (st(e, o ? "onComplete" : "onReverseComplete", !0),
            e._prom && e._prom()));
    } else e._zTime || (e._zTime = n);
  },
  Z_ = function (e, n, r) {
    var i;
    if (r > n)
      for (i = e._first; i && i._start <= r; ) {
        if (i.data === "isPause" && i._start > n) return i;
        i = i._next;
      }
    else
      for (i = e._last; i && i._start >= r; ) {
        if (i.data === "isPause" && i._start < n) return i;
        i = i._prev;
      }
  },
  lr = function (e, n, r, i) {
    var s = e._repeat,
      o = De(n) || 0,
      l = e._tTime / e._tDur;
    return (
      l && !i && (e._time *= o / e._dur),
      (e._dur = o),
      (e._tDur = s ? (s < 0 ? 1e10 : De(o * (s + 1) + e._rDelay * s)) : o),
      l > 0 && !i && Xi(e, (e._tTime = e._tDur * l)),
      e.parent && Ki(e),
      r || Mn(e.parent, e),
      e
    );
  },
  Zl = function (e) {
    return e instanceof Xe ? Mn(e) : lr(e, e._dur);
  },
  eg = { _start: 0, endTime: Vr, totalDuration: Vr },
  ft = function t(e, n, r) {
    var i = e.labels,
      s = e._recent || eg,
      o = e.duration() >= ht ? s.endTime(!1) : e._dur,
      l,
      u,
      a;
    return Ne(n) && (isNaN(n) || n in i)
      ? ((u = n.charAt(0)),
        (a = n.substr(-1) === "%"),
        (l = n.indexOf("=")),
        u === "<" || u === ">"
          ? (l >= 0 && (n = n.replace(/=/, "")),
            (u === "<" ? s._start : s.endTime(s._repeat >= 0)) +
              (parseFloat(n.substr(1)) || 0) *
                (a ? (l < 0 ? s : r).totalDuration() / 100 : 1))
          : l < 0
          ? (n in i || (i[n] = o), i[n])
          : ((u = parseFloat(n.charAt(l - 1) + n.substr(l + 1))),
            a && r && (u = (u / 100) * (We(r) ? r[0] : r).totalDuration()),
            l > 1 ? t(e, n.substr(0, l - 1), r) + u : o + u))
      : n == null
      ? o
      : +n;
  },
  kr = function (e, n, r) {
    var i = qt(n[1]),
      s = (i ? 2 : 1) + (e < 2 ? 0 : 1),
      o = n[s],
      l,
      u;
    if ((i && (o.duration = n[1]), (o.parent = r), e)) {
      for (l = o, u = r; u && !("immediateRender" in l); )
        (l = u.vars.defaults || {}), (u = Ge(u.vars.inherit) && u.parent);
      (o.immediateRender = Ge(l.immediateRender)),
        e < 2 ? (o.runBackwards = 1) : (o.startAt = n[s - 1]);
    }
    return new Le(n[0], o, n[s + 1]);
  },
  pn = function (e, n) {
    return e || e === 0 ? n(e) : n;
  },
  Qr = function (e, n, r) {
    return r < e ? e : r > n ? n : r;
  },
  He = function (e, n) {
    return !Ne(e) || !(n = H_.exec(e)) ? "" : n[1];
  },
  tg = function (e, n, r) {
    return pn(r, function (i) {
      return Qr(e, n, i);
    });
  },
  js = [].slice,
  cc = function (e, n) {
    return (
      e &&
      Ft(e) &&
      "length" in e &&
      ((!n && !e.length) || (e.length - 1 in e && Ft(e[0]))) &&
      !e.nodeType &&
      e !== Rt
    );
  },
  ng = function (e, n, r) {
    return (
      r === void 0 && (r = []),
      e.forEach(function (i) {
        var s;
        return (Ne(i) && !n) || cc(i, 1)
          ? (s = r).push.apply(s, dt(i))
          : r.push(i);
      }) || r
    );
  },
  dt = function (e, n, r) {
    return ye && !n && ye.selector
      ? ye.selector(e)
      : Ne(e) && !r && (Ns || !ar())
      ? js.call((n || Oo).querySelectorAll(e), 0)
      : We(e)
      ? ng(e, r)
      : cc(e)
      ? js.call(e, 0)
      : e
      ? [e]
      : [];
  },
  Us = function (e) {
    return (
      (e = dt(e)[0] || Hr("Invalid scope") || {}),
      function (n) {
        var r = e.current || e.nativeElement || e;
        return dt(
          n,
          r.querySelectorAll
            ? r
            : r === e
            ? Hr("Invalid scope") || Oo.createElement("div")
            : e
        );
      }
    );
  },
  fc = function (e) {
    return e.sort(function () {
      return 0.5 - Math.random();
    });
  },
  hc = function (e) {
    if (Re(e)) return e;
    var n = Ft(e) ? e : { each: e },
      r = An(n.ease),
      i = n.from || 0,
      s = parseFloat(n.base) || 0,
      o = {},
      l = i > 0 && i < 1,
      u = isNaN(i) || l,
      a = n.axis,
      c = i,
      f = i;
    return (
      Ne(i)
        ? (c = f = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
        : !l && u && ((c = i[0]), (f = i[1])),
      function (h, p, g) {
        var d = (g || n).length,
          m = o[d],
          b,
          v,
          w,
          x,
          T,
          k,
          A,
          P,
          R;
        if (!m) {
          if (((R = n.grid === "auto" ? 0 : (n.grid || [1, ht])[1]), !R)) {
            for (
              A = -ht;
              A < (A = g[R++].getBoundingClientRect().left) && R < d;

            );
            R < d && R--;
          }
          for (
            m = o[d] = [],
              b = u ? Math.min(R, d) * c - 0.5 : i % R,
              v = R === ht ? 0 : u ? (d * f) / R - 0.5 : (i / R) | 0,
              A = 0,
              P = ht,
              k = 0;
            k < d;
            k++
          )
            (w = (k % R) - b),
              (x = v - ((k / R) | 0)),
              (m[k] = T = a ? Math.abs(a === "y" ? x : w) : Ku(w * w + x * x)),
              T > A && (A = T),
              T < P && (P = T);
          i === "random" && fc(m),
            (m.max = A - P),
            (m.min = P),
            (m.v = d =
              (parseFloat(n.amount) ||
                parseFloat(n.each) *
                  (R > d
                    ? d - 1
                    : a
                    ? a === "y"
                      ? d / R
                      : R
                    : Math.max(R, d / R)) ||
                0) * (i === "edges" ? -1 : 1)),
            (m.b = d < 0 ? s - d : s),
            (m.u = He(n.amount || n.each) || 0),
            (r = r && d < 0 ? xc(r) : r);
        }
        return (
          (d = (m[h] - m.min) / m.max || 0),
          De(m.b + (r ? r(d) : d) * m.v) + m.u
        );
      }
    );
  },
  Hs = function (e) {
    var n = Math.pow(10, ((e + "").split(".")[1] || "").length);
    return function (r) {
      var i = De(Math.round(parseFloat(r) / e) * e * n);
      return (i - (i % 1)) / n + (qt(r) ? 0 : He(r));
    };
  },
  dc = function (e, n) {
    var r = We(e),
      i,
      s;
    return (
      !r &&
        Ft(e) &&
        ((i = r = e.radius || ht),
        e.values
          ? ((e = dt(e.values)), (s = !qt(e[0])) && (i *= i))
          : (e = Hs(e.increment))),
      pn(
        n,
        r
          ? Re(e)
            ? function (o) {
                return (s = e(o)), Math.abs(s - o) <= i ? s : o;
              }
            : function (o) {
                for (
                  var l = parseFloat(s ? o.x : o),
                    u = parseFloat(s ? o.y : 0),
                    a = ht,
                    c = 0,
                    f = e.length,
                    h,
                    p;
                  f--;

                )
                  s
                    ? ((h = e[f].x - l), (p = e[f].y - u), (h = h * h + p * p))
                    : (h = Math.abs(e[f] - l)),
                    h < a && ((a = h), (c = f));
                return (
                  (c = !i || a <= i ? e[c] : o),
                  s || c === o || qt(o) ? c : c + He(o)
                );
              }
          : Hs(e)
      )
    );
  },
  pc = function (e, n, r, i) {
    return pn(We(e) ? !n : r === !0 ? !!(r = 0) : !i, function () {
      return We(e)
        ? e[~~(Math.random() * e.length)]
        : (r = r || 1e-5) &&
            (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
            Math.floor(
              Math.round((e - r / 2 + Math.random() * (n - e + r * 0.99)) / r) *
                r *
                i
            ) / i;
    });
  },
  rg = function () {
    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
      n[r] = arguments[r];
    return function (i) {
      return n.reduce(function (s, o) {
        return o(s);
      }, i);
    };
  },
  ig = function (e, n) {
    return function (r) {
      return e(parseFloat(r)) + (n || He(r));
    };
  },
  sg = function (e, n, r) {
    return gc(e, n, 0, 1, r);
  },
  _c = function (e, n, r) {
    return pn(r, function (i) {
      return e[~~n(i)];
    });
  },
  og = function t(e, n, r) {
    var i = n - e;
    return We(e)
      ? _c(e, t(0, e.length), n)
      : pn(r, function (s) {
          return ((i + ((s - e) % i)) % i) + e;
        });
  },
  lg = function t(e, n, r) {
    var i = n - e,
      s = i * 2;
    return We(e)
      ? _c(e, t(0, e.length - 1), n)
      : pn(r, function (o) {
          return (o = (s + ((o - e) % s)) % s || 0), e + (o > i ? s - o : o);
        });
  },
  Wr = function (e) {
    for (var n = 0, r = "", i, s, o, l; ~(i = e.indexOf("random(", n)); )
      (o = e.indexOf(")", i)),
        (l = e.charAt(i + 7) === "["),
        (s = e.substr(i + 7, o - i - 7).match(l ? Qu : Fs)),
        (r +=
          e.substr(n, i - n) + pc(l ? s : +s[0], l ? 0 : +s[1], +s[2] || 1e-5)),
        (n = o + 1);
    return r + e.substr(n, e.length - n);
  },
  gc = function (e, n, r, i, s) {
    var o = n - e,
      l = i - r;
    return pn(s, function (u) {
      return r + (((u - e) / o) * l || 0);
    });
  },
  ag = function t(e, n, r, i) {
    var s = isNaN(e + n)
      ? 0
      : function (p) {
          return (1 - p) * e + p * n;
        };
    if (!s) {
      var o = Ne(e),
        l = {},
        u,
        a,
        c,
        f,
        h;
      if ((r === !0 && (i = 1) && (r = null), o))
        (e = { p: e }), (n = { p: n });
      else if (We(e) && !We(n)) {
        for (c = [], f = e.length, h = f - 2, a = 1; a < f; a++)
          c.push(t(e[a - 1], e[a]));
        f--,
          (s = function (g) {
            g *= f;
            var d = Math.min(h, ~~g);
            return c[d](g - d);
          }),
          (r = n);
      } else i || (e = Dn(We(e) ? [] : {}, e));
      if (!c) {
        for (u in n) Do.call(l, e, u, "get", n[u]);
        s = function (g) {
          return zo(g, l) || (o ? e.p : e);
        };
      }
    }
    return pn(r, s);
  },
  ea = function (e, n, r) {
    var i = e.labels,
      s = ht,
      o,
      l,
      u;
    for (o in i)
      (l = i[o] - n),
        l < 0 == !!r && l && s > (l = Math.abs(l)) && ((u = o), (s = l));
    return u;
  },
  st = function (e, n, r) {
    var i = e.vars,
      s = i[n],
      o = ye,
      l = e._ctx,
      u,
      a,
      c;
    if (s)
      return (
        (u = i[n + "Params"]),
        (a = i.callbackScope || e),
        r && un.length && xi(),
        l && (ye = l),
        (c = u ? s.apply(a, u) : s.call(a)),
        (ye = o),
        c
      );
  },
  wr = function (e) {
    return (
      hn(e),
      e.scrollTrigger && e.scrollTrigger.kill(!!Ve),
      e.progress() < 1 && st(e, "onInterrupt"),
      e
    );
  },
  Vn,
  mc = [],
  vc = function (e) {
    if (e)
      if (((e = (!e.name && e.default) || e), ko() || e.headless)) {
        var n = e.name,
          r = Re(e),
          i =
            n && !r && e.init
              ? function () {
                  this._props = [];
                }
              : e,
          s = {
            init: Vr,
            render: zo,
            add: Do,
            kill: Tg,
            modifier: Eg,
            rawVars: 0,
          },
          o = {
            targetTest: 0,
            get: 0,
            getSetter: $o,
            aliases: {},
            register: 0,
          };
        if ((ar(), e !== i)) {
          if (rt[n]) return;
          mt(i, mt(Ei(e, s), o)),
            Dn(i.prototype, Dn(s, Ei(e, o))),
            (rt[(i.prop = n)] = i),
            e.targetTest && (fi.push(i), (Ao[n] = 1)),
            (n =
              (n === "css" ? "CSS" : n.charAt(0).toUpperCase() + n.substr(1)) +
              "Plugin");
        }
        ec(n, i), e.register && e.register(tt, i, Je);
      } else mc.push(e);
  },
  he = 255,
  xr = {
    aqua: [0, he, he],
    lime: [0, he, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, he],
    navy: [0, 0, 128],
    white: [he, he, he],
    olive: [128, 128, 0],
    yellow: [he, he, 0],
    orange: [he, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [he, 0, 0],
    pink: [he, 192, 203],
    cyan: [0, he, he],
    transparent: [he, he, he, 0],
  },
  fs = function (e, n, r) {
    return (
      (e += e < 0 ? 1 : e > 1 ? -1 : 0),
      ((e * 6 < 1
        ? n + (r - n) * e * 6
        : e < 0.5
        ? r
        : e * 3 < 2
        ? n + (r - n) * (2 / 3 - e) * 6
        : n) *
        he +
        0.5) |
        0
    );
  },
  yc = function (e, n, r) {
    var i = e ? (qt(e) ? [e >> 16, (e >> 8) & he, e & he] : 0) : xr.black,
      s,
      o,
      l,
      u,
      a,
      c,
      f,
      h,
      p,
      g;
    if (!i) {
      if ((e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), xr[e]))
        i = xr[e];
      else if (e.charAt(0) === "#") {
        if (
          (e.length < 6 &&
            ((s = e.charAt(1)),
            (o = e.charAt(2)),
            (l = e.charAt(3)),
            (e =
              "#" +
              s +
              s +
              o +
              o +
              l +
              l +
              (e.length === 5 ? e.charAt(4) + e.charAt(4) : ""))),
          e.length === 9)
        )
          return (
            (i = parseInt(e.substr(1, 6), 16)),
            [i >> 16, (i >> 8) & he, i & he, parseInt(e.substr(7), 16) / 255]
          );
        (e = parseInt(e.substr(1), 16)), (i = [e >> 16, (e >> 8) & he, e & he]);
      } else if (e.substr(0, 3) === "hsl") {
        if (((i = g = e.match(Fs)), !n))
          (u = (+i[0] % 360) / 360),
            (a = +i[1] / 100),
            (c = +i[2] / 100),
            (o = c <= 0.5 ? c * (a + 1) : c + a - c * a),
            (s = c * 2 - o),
            i.length > 3 && (i[3] *= 1),
            (i[0] = fs(u + 1 / 3, s, o)),
            (i[1] = fs(u, s, o)),
            (i[2] = fs(u - 1 / 3, s, o));
        else if (~e.indexOf("="))
          return (i = e.match(Yu)), r && i.length < 4 && (i[3] = 1), i;
      } else i = e.match(Fs) || xr.transparent;
      i = i.map(Number);
    }
    return (
      n &&
        !g &&
        ((s = i[0] / he),
        (o = i[1] / he),
        (l = i[2] / he),
        (f = Math.max(s, o, l)),
        (h = Math.min(s, o, l)),
        (c = (f + h) / 2),
        f === h
          ? (u = a = 0)
          : ((p = f - h),
            (a = c > 0.5 ? p / (2 - f - h) : p / (f + h)),
            (u =
              f === s
                ? (o - l) / p + (o < l ? 6 : 0)
                : f === o
                ? (l - s) / p + 2
                : (s - o) / p + 4),
            (u *= 60)),
        (i[0] = ~~(u + 0.5)),
        (i[1] = ~~(a * 100 + 0.5)),
        (i[2] = ~~(c * 100 + 0.5))),
      r && i.length < 4 && (i[3] = 1),
      i
    );
  },
  bc = function (e) {
    var n = [],
      r = [],
      i = -1;
    return (
      e.split(cn).forEach(function (s) {
        var o = s.match(Hn) || [];
        n.push.apply(n, o), r.push((i += o.length + 1));
      }),
      (n.c = r),
      n
    );
  },
  ta = function (e, n, r) {
    var i = "",
      s = (e + i).match(cn),
      o = n ? "hsla(" : "rgba(",
      l = 0,
      u,
      a,
      c,
      f;
    if (!s) return e;
    if (
      ((s = s.map(function (h) {
        return (
          (h = yc(h, n, 1)) &&
          o +
            (n ? h[0] + "," + h[1] + "%," + h[2] + "%," + h[3] : h.join(",")) +
            ")"
        );
      })),
      r && ((c = bc(e)), (u = r.c), u.join(i) !== c.c.join(i)))
    )
      for (a = e.replace(cn, "1").split(Hn), f = a.length - 1; l < f; l++)
        i +=
          a[l] +
          (~u.indexOf(l)
            ? s.shift() || o + "0,0,0,0)"
            : (c.length ? c : s.length ? s : r).shift());
    if (!a)
      for (a = e.split(cn), f = a.length - 1; l < f; l++) i += a[l] + s[l];
    return i + a[f];
  },
  cn = (function () {
    var t =
        "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      e;
    for (e in xr) t += "|" + e + "\\b";
    return new RegExp(t + ")", "gi");
  })(),
  ug = /hsl[a]?\(/,
  wc = function (e) {
    var n = e.join(" "),
      r;
    if (((cn.lastIndex = 0), cn.test(n)))
      return (
        (r = ug.test(n)),
        (e[1] = ta(e[1], r)),
        (e[0] = ta(e[0], r, bc(e[1]))),
        !0
      );
  },
  qr,
  it = (function () {
    var t = Date.now,
      e = 500,
      n = 33,
      r = t(),
      i = r,
      s = 1e3 / 240,
      o = s,
      l = [],
      u,
      a,
      c,
      f,
      h,
      p,
      g = function d(m) {
        var b = t() - i,
          v = m === !0,
          w,
          x,
          T,
          k;
        if (
          ((b > e || b < 0) && (r += b - n),
          (i += b),
          (T = i - r),
          (w = T - o),
          (w > 0 || v) &&
            ((k = ++f.frame),
            (h = T - f.time * 1e3),
            (f.time = T = T / 1e3),
            (o += w + (w >= s ? 4 : s - w)),
            (x = 1)),
          v || (u = a(d)),
          x)
        )
          for (p = 0; p < l.length; p++) l[p](T, h, k, m);
      };
    return (
      (f = {
        time: 0,
        frame: 0,
        tick: function () {
          g(!0);
        },
        deltaRatio: function (m) {
          return h / (1e3 / (m || 60));
        },
        wake: function () {
          Ju &&
            (!Ns &&
              ko() &&
              ((Rt = Ns = window),
              (Oo = Rt.document || {}),
              (lt.gsap = tt),
              (Rt.gsapVersions || (Rt.gsapVersions = [])).push(tt.version),
              Zu(wi || Rt.GreenSockGlobals || (!Rt.gsap && Rt) || {}),
              mc.forEach(vc)),
            (c = typeof requestAnimationFrame < "u" && requestAnimationFrame),
            u && f.sleep(),
            (a =
              c ||
              function (m) {
                return setTimeout(m, (o - f.time * 1e3 + 1) | 0);
              }),
            (qr = 1),
            g(2));
        },
        sleep: function () {
          (c ? cancelAnimationFrame : clearTimeout)(u), (qr = 0), (a = Vr);
        },
        lagSmoothing: function (m, b) {
          (e = m || 1 / 0), (n = Math.min(b || 33, e));
        },
        fps: function (m) {
          (s = 1e3 / (m || 240)), (o = f.time * 1e3 + s);
        },
        add: function (m, b, v) {
          var w = b
            ? function (x, T, k, A) {
                m(x, T, k, A), f.remove(w);
              }
            : m;
          return f.remove(m), l[v ? "unshift" : "push"](w), ar(), w;
        },
        remove: function (m, b) {
          ~(b = l.indexOf(m)) && l.splice(b, 1) && p >= b && p--;
        },
        _listeners: l,
      }),
      f
    );
  })(),
  ar = function () {
    return !qr && it.wake();
  },
  ie = {},
  cg = /^[\d.\-M][\d.\-,\s]/,
  fg = /["']/g,
  hg = function (e) {
    for (
      var n = {},
        r = e.substr(1, e.length - 3).split(":"),
        i = r[0],
        s = 1,
        o = r.length,
        l,
        u,
        a;
      s < o;
      s++
    )
      (u = r[s]),
        (l = s !== o - 1 ? u.lastIndexOf(",") : u.length),
        (a = u.substr(0, l)),
        (n[i] = isNaN(a) ? a.replace(fg, "").trim() : +a),
        (i = u.substr(l + 1).trim());
    return n;
  },
  dg = function (e) {
    var n = e.indexOf("(") + 1,
      r = e.indexOf(")"),
      i = e.indexOf("(", n);
    return e.substring(n, ~i && i < r ? e.indexOf(")", r + 1) : r);
  },
  pg = function (e) {
    var n = (e + "").split("("),
      r = ie[n[0]];
    return r && n.length > 1 && r.config
      ? r.config.apply(
          null,
          ~e.indexOf("{") ? [hg(n[1])] : dg(e).split(",").map(ic)
        )
      : ie._CE && cg.test(e)
      ? ie._CE("", e)
      : r;
  },
  xc = function (e) {
    return function (n) {
      return 1 - e(1 - n);
    };
  },
  Ec = function t(e, n) {
    for (var r = e._first, i; r; )
      r instanceof Xe
        ? t(r, n)
        : r.vars.yoyoEase &&
          (!r._yoyo || !r._repeat) &&
          r._yoyo !== n &&
          (r.timeline
            ? t(r.timeline, n)
            : ((i = r._ease),
              (r._ease = r._yEase),
              (r._yEase = i),
              (r._yoyo = n))),
        (r = r._next);
  },
  An = function (e, n) {
    return (e && (Re(e) ? e : ie[e] || pg(e))) || n;
  },
  $n = function (e, n, r, i) {
    r === void 0 &&
      (r = function (u) {
        return 1 - n(1 - u);
      }),
      i === void 0 &&
        (i = function (u) {
          return u < 0.5 ? n(u * 2) / 2 : 1 - n((1 - u) * 2) / 2;
        });
    var s = { easeIn: n, easeOut: r, easeInOut: i },
      o;
    return (
      Qe(e, function (l) {
        (ie[l] = lt[l] = s), (ie[(o = l.toLowerCase())] = r);
        for (var u in s)
          ie[
            o + (u === "easeIn" ? ".in" : u === "easeOut" ? ".out" : ".inOut")
          ] = ie[l + "." + u] = s[u];
      }),
      s
    );
  },
  Tc = function (e) {
    return function (n) {
      return n < 0.5 ? (1 - e(1 - n * 2)) / 2 : 0.5 + e((n - 0.5) * 2) / 2;
    };
  },
  hs = function t(e, n, r) {
    var i = n >= 1 ? n : 1,
      s = (r || (e ? 0.3 : 0.45)) / (n < 1 ? n : 1),
      o = (s / Ds) * (Math.asin(1 / i) || 0),
      l = function (c) {
        return c === 1 ? 1 : i * Math.pow(2, -10 * c) * U_((c - o) * s) + 1;
      },
      u =
        e === "out"
          ? l
          : e === "in"
          ? function (a) {
              return 1 - l(1 - a);
            }
          : Tc(l);
    return (
      (s = Ds / s),
      (u.config = function (a, c) {
        return t(e, a, c);
      }),
      u
    );
  },
  ds = function t(e, n) {
    n === void 0 && (n = 1.70158);
    var r = function (o) {
        return o ? --o * o * ((n + 1) * o + n) + 1 : 0;
      },
      i =
        e === "out"
          ? r
          : e === "in"
          ? function (s) {
              return 1 - r(1 - s);
            }
          : Tc(r);
    return (
      (i.config = function (s) {
        return t(e, s);
      }),
      i
    );
  };
Qe("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
  var n = e < 5 ? e + 1 : e;
  $n(
    t + ",Power" + (n - 1),
    e
      ? function (r) {
          return Math.pow(r, n);
        }
      : function (r) {
          return r;
        },
    function (r) {
      return 1 - Math.pow(1 - r, n);
    },
    function (r) {
      return r < 0.5
        ? Math.pow(r * 2, n) / 2
        : 1 - Math.pow((1 - r) * 2, n) / 2;
    }
  );
});
ie.Linear.easeNone = ie.none = ie.Linear.easeIn;
$n("Elastic", hs("in"), hs("out"), hs());
(function (t, e) {
  var n = 1 / e,
    r = 2 * n,
    i = 2.5 * n,
    s = function (l) {
      return l < n
        ? t * l * l
        : l < r
        ? t * Math.pow(l - 1.5 / e, 2) + 0.75
        : l < i
        ? t * (l -= 2.25 / e) * l + 0.9375
        : t * Math.pow(l - 2.625 / e, 2) + 0.984375;
    };
  $n(
    "Bounce",
    function (o) {
      return 1 - s(1 - o);
    },
    s
  );
})(7.5625, 2.75);
$n("Expo", function (t) {
  return t ? Math.pow(2, 10 * (t - 1)) : 0;
});
$n("Circ", function (t) {
  return -(Ku(1 - t * t) - 1);
});
$n("Sine", function (t) {
  return t === 1 ? 1 : -j_(t * z_) + 1;
});
$n("Back", ds("in"), ds("out"), ds());
ie.SteppedEase =
  ie.steps =
  lt.SteppedEase =
    {
      config: function (e, n) {
        e === void 0 && (e = 1);
        var r = 1 / e,
          i = e + (n ? 0 : 1),
          s = n ? 1 : 0,
          o = 1 - pe;
        return function (l) {
          return (((i * Qr(0, o, l)) | 0) + s) * r;
        };
      },
    };
sr.ease = ie["quad.out"];
Qe(
  "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
  function (t) {
    return (Lo += t + "," + t + "Params,");
  }
);
var Cc = function (e, n) {
    (this.id = B_++),
      (e._gsap = this),
      (this.target = e),
      (this.harness = n),
      (this.get = n ? n.get : nc),
      (this.set = n ? n.getSetter : $o);
  },
  Kr = (function () {
    function t(n) {
      (this.vars = n),
        (this._delay = +n.delay || 0),
        (this._repeat = n.repeat === 1 / 0 ? -2 : n.repeat || 0) &&
          ((this._rDelay = n.repeatDelay || 0),
          (this._yoyo = !!n.yoyo || !!n.yoyoEase)),
        (this._ts = 1),
        lr(this, +n.duration, 1, 1),
        (this.data = n.data),
        ye && ((this._ctx = ye), ye.data.push(this)),
        qr || it.wake();
    }
    var e = t.prototype;
    return (
      (e.delay = function (r) {
        return r || r === 0
          ? (this.parent &&
              this.parent.smoothChildTiming &&
              this.startTime(this._start + r - this._delay),
            (this._delay = r),
            this)
          : this._delay;
      }),
      (e.duration = function (r) {
        return arguments.length
          ? this.totalDuration(
              this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r
            )
          : this.totalDuration() && this._dur;
      }),
      (e.totalDuration = function (r) {
        return arguments.length
          ? ((this._dirty = 0),
            lr(
              this,
              this._repeat < 0
                ? r
                : (r - this._repeat * this._rDelay) / (this._repeat + 1)
            ))
          : this._tDur;
      }),
      (e.totalTime = function (r, i) {
        if ((ar(), !arguments.length)) return this._tTime;
        var s = this._dp;
        if (s && s.smoothChildTiming && this._ts) {
          for (Xi(this, r), !s._dp || s.parent || lc(s, this); s && s.parent; )
            s.parent._time !==
              s._start +
                (s._ts >= 0
                  ? s._tTime / s._ts
                  : (s.totalDuration() - s._tTime) / -s._ts) &&
              s.totalTime(s._tTime, !0),
              (s = s.parent);
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ((this._ts > 0 && r < this._tDur) ||
              (this._ts < 0 && r > 0) ||
              (!this._tDur && !r)) &&
            Ot(this._dp, this, this._start - this._delay);
        }
        return (
          (this._tTime !== r ||
            (!this._dur && !i) ||
            (this._initted && Math.abs(this._zTime) === pe) ||
            (!r && !this._initted && (this.add || this._ptLookup))) &&
            (this._ts || (this._pTime = r), rc(this, r, i)),
          this
        );
      }),
      (e.time = function (r, i) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), r + Jl(this)) %
                (this._dur + this._rDelay) || (r ? this._dur : 0),
              i
            )
          : this._time;
      }),
      (e.totalProgress = function (r, i) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * r, i)
          : this.totalDuration()
          ? Math.min(1, this._tTime / this._tDur)
          : this.rawTime() > 0
          ? 1
          : 0;
      }),
      (e.progress = function (r, i) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) +
                Jl(this),
              i
            )
          : this.duration()
          ? Math.min(1, this._time / this._dur)
          : this.rawTime() > 0
          ? 1
          : 0;
      }),
      (e.iteration = function (r, i) {
        var s = this.duration() + this._rDelay;
        return arguments.length
          ? this.totalTime(this._time + (r - 1) * s, i)
          : this._repeat
          ? or(this._tTime, s) + 1
          : 1;
      }),
      (e.timeScale = function (r, i) {
        if (!arguments.length) return this._rts === -pe ? 0 : this._rts;
        if (this._rts === r) return this;
        var s =
          this.parent && this._ts ? Ti(this.parent._time, this) : this._tTime;
        return (
          (this._rts = +r || 0),
          (this._ts = this._ps || r === -pe ? 0 : this._rts),
          this.totalTime(Qr(-Math.abs(this._delay), this._tDur, s), i !== !1),
          Ki(this),
          Y_(this)
        );
      }),
      (e.paused = function (r) {
        return arguments.length
          ? (this._ps !== r &&
              ((this._ps = r),
              r
                ? ((this._pTime =
                    this._tTime || Math.max(-this._delay, this.rawTime())),
                  (this._ts = this._act = 0))
                : (ar(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    this.progress() === 1 &&
                      Math.abs(this._zTime) !== pe &&
                      (this._tTime -= pe)
                  ))),
            this)
          : this._ps;
      }),
      (e.startTime = function (r) {
        if (arguments.length) {
          this._start = r;
          var i = this.parent || this._dp;
          return (
            i && (i._sort || !this.parent) && Ot(i, this, r - this._delay), this
          );
        }
        return this._start;
      }),
      (e.endTime = function (r) {
        return (
          this._start +
          (Ge(r) ? this.totalDuration() : this.duration()) /
            Math.abs(this._ts || 1)
        );
      }),
      (e.rawTime = function (r) {
        var i = this.parent || this._dp;
        return i
          ? r &&
            (!this._ts ||
              (this._repeat && this._time && this.totalProgress() < 1))
            ? this._tTime % (this._dur + this._rDelay)
            : this._ts
            ? Ti(i.rawTime(r), this)
            : this._tTime
          : this._tTime;
      }),
      (e.revert = function (r) {
        r === void 0 && (r = W_);
        var i = Ve;
        return (
          (Ve = r),
          (this._initted || this._startAt) &&
            (this.timeline && this.timeline.revert(r),
            this.totalTime(-0.01, r.suppressEvents)),
          this.data !== "nested" && r.kill !== !1 && this.kill(),
          (Ve = i),
          this
        );
      }),
      (e.globalTime = function (r) {
        for (var i = this, s = arguments.length ? r : i.rawTime(); i; )
          (s = i._start + s / (Math.abs(i._ts) || 1)), (i = i._dp);
        return !this.parent && this._sat ? this._sat.globalTime(r) : s;
      }),
      (e.repeat = function (r) {
        return arguments.length
          ? ((this._repeat = r === 1 / 0 ? -2 : r), Zl(this))
          : this._repeat === -2
          ? 1 / 0
          : this._repeat;
      }),
      (e.repeatDelay = function (r) {
        if (arguments.length) {
          var i = this._time;
          return (this._rDelay = r), Zl(this), i ? this.time(i) : this;
        }
        return this._rDelay;
      }),
      (e.yoyo = function (r) {
        return arguments.length ? ((this._yoyo = r), this) : this._yoyo;
      }),
      (e.seek = function (r, i) {
        return this.totalTime(ft(this, r), Ge(i));
      }),
      (e.restart = function (r, i) {
        return this.play().totalTime(r ? -this._delay : 0, Ge(i));
      }),
      (e.play = function (r, i) {
        return r != null && this.seek(r, i), this.reversed(!1).paused(!1);
      }),
      (e.reverse = function (r, i) {
        return (
          r != null && this.seek(r || this.totalDuration(), i),
          this.reversed(!0).paused(!1)
        );
      }),
      (e.pause = function (r, i) {
        return r != null && this.seek(r, i), this.paused(!0);
      }),
      (e.resume = function () {
        return this.paused(!1);
      }),
      (e.reversed = function (r) {
        return arguments.length
          ? (!!r !== this.reversed() &&
              this.timeScale(-this._rts || (r ? -pe : 0)),
            this)
          : this._rts < 0;
      }),
      (e.invalidate = function () {
        return (this._initted = this._act = 0), (this._zTime = -pe), this;
      }),
      (e.isActive = function () {
        var r = this.parent || this._dp,
          i = this._start,
          s;
        return !!(
          !r ||
          (this._ts &&
            this._initted &&
            r.isActive() &&
            (s = r.rawTime(!0)) >= i &&
            s < this.endTime(!0) - pe)
        );
      }),
      (e.eventCallback = function (r, i, s) {
        var o = this.vars;
        return arguments.length > 1
          ? (i
              ? ((o[r] = i),
                s && (o[r + "Params"] = s),
                r === "onUpdate" && (this._onUpdate = i))
              : delete o[r],
            this)
          : o[r];
      }),
      (e.then = function (r) {
        var i = this;
        return new Promise(function (s) {
          var o = Re(r) ? r : sc,
            l = function () {
              var a = i.then;
              (i.then = null),
                Re(o) && (o = o(i)) && (o.then || o === i) && (i.then = a),
                s(o),
                (i.then = a);
            };
          (i._initted && i.totalProgress() === 1 && i._ts >= 0) ||
          (!i._tTime && i._ts < 0)
            ? l()
            : (i._prom = l);
        });
      }),
      (e.kill = function () {
        wr(this);
      }),
      t
    );
  })();
mt(Kr.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -pe,
  _prom: 0,
  _ps: !1,
  _rts: 1,
});
var Xe = (function (t) {
  qu(e, t);
  function e(r, i) {
    var s;
    return (
      r === void 0 && (r = {}),
      (s = t.call(this, r) || this),
      (s.labels = {}),
      (s.smoothChildTiming = !!r.smoothChildTiming),
      (s.autoRemoveChildren = !!r.autoRemoveChildren),
      (s._sort = Ge(r.sortChildren)),
      we && Ot(r.parent || we, jt(s), i),
      r.reversed && s.reverse(),
      r.paused && s.paused(!0),
      r.scrollTrigger && ac(jt(s), r.scrollTrigger),
      s
    );
  }
  var n = e.prototype;
  return (
    (n.to = function (i, s, o) {
      return kr(0, arguments, this), this;
    }),
    (n.from = function (i, s, o) {
      return kr(1, arguments, this), this;
    }),
    (n.fromTo = function (i, s, o, l) {
      return kr(2, arguments, this), this;
    }),
    (n.set = function (i, s, o) {
      return (
        (s.duration = 0),
        (s.parent = this),
        Sr(s).repeatDelay || (s.repeat = 0),
        (s.immediateRender = !!s.immediateRender),
        new Le(i, s, ft(this, o), 1),
        this
      );
    }),
    (n.call = function (i, s, o) {
      return Ot(this, Le.delayedCall(0, i, s), o);
    }),
    (n.staggerTo = function (i, s, o, l, u, a, c) {
      return (
        (o.duration = s),
        (o.stagger = o.stagger || l),
        (o.onComplete = a),
        (o.onCompleteParams = c),
        (o.parent = this),
        new Le(i, o, ft(this, u)),
        this
      );
    }),
    (n.staggerFrom = function (i, s, o, l, u, a, c) {
      return (
        (o.runBackwards = 1),
        (Sr(o).immediateRender = Ge(o.immediateRender)),
        this.staggerTo(i, s, o, l, u, a, c)
      );
    }),
    (n.staggerFromTo = function (i, s, o, l, u, a, c, f) {
      return (
        (l.startAt = o),
        (Sr(l).immediateRender = Ge(l.immediateRender)),
        this.staggerTo(i, s, l, u, a, c, f)
      );
    }),
    (n.render = function (i, s, o) {
      var l = this._time,
        u = this._dirty ? this.totalDuration() : this._tDur,
        a = this._dur,
        c = i <= 0 ? 0 : De(i),
        f = this._zTime < 0 != i < 0 && (this._initted || !a),
        h,
        p,
        g,
        d,
        m,
        b,
        v,
        w,
        x,
        T,
        k,
        A;
      if (
        (this !== we && c > u && i >= 0 && (c = u), c !== this._tTime || o || f)
      ) {
        if (
          (l !== this._time &&
            a &&
            ((c += this._time - l), (i += this._time - l)),
          (h = c),
          (x = this._start),
          (w = this._ts),
          (b = !w),
          f && (a || (l = this._zTime), (i || !s) && (this._zTime = i)),
          this._repeat)
        ) {
          if (
            ((k = this._yoyo),
            (m = a + this._rDelay),
            this._repeat < -1 && i < 0)
          )
            return this.totalTime(m * 100 + i, s, o);
          if (
            ((h = De(c % m)),
            c === u
              ? ((d = this._repeat), (h = a))
              : ((d = ~~(c / m)),
                d && d === c / m && ((h = a), d--),
                h > a && (h = a)),
            (T = or(this._tTime, m)),
            !l &&
              this._tTime &&
              T !== d &&
              this._tTime - T * m - this._dur <= 0 &&
              (T = d),
            k && d & 1 && ((h = a - h), (A = 1)),
            d !== T && !this._lock)
          ) {
            var P = k && T & 1,
              R = P === (k && d & 1);
            if (
              (d < T && (P = !P),
              (l = P ? 0 : c % a ? a : c),
              (this._lock = 1),
              (this.render(l || (A ? 0 : De(d * m)), s, !a)._lock = 0),
              (this._tTime = c),
              !s && this.parent && st(this, "onRepeat"),
              this.vars.repeatRefresh && !A && (this.invalidate()._lock = 1),
              (l && l !== this._time) ||
                b !== !this._ts ||
                (this.vars.onRepeat && !this.parent && !this._act))
            )
              return this;
            if (
              ((a = this._dur),
              (u = this._tDur),
              R &&
                ((this._lock = 2),
                (l = P ? a : -1e-4),
                this.render(l, !0),
                this.vars.repeatRefresh && !A && this.invalidate()),
              (this._lock = 0),
              !this._ts && !b)
            )
              return this;
            Ec(this, A);
          }
        }
        if (
          (this._hasPause &&
            !this._forcing &&
            this._lock < 2 &&
            ((v = Z_(this, De(l), De(h))), v && (c -= h - (h = v._start))),
          (this._tTime = c),
          (this._time = h),
          (this._act = !w),
          this._initted ||
            ((this._onUpdate = this.vars.onUpdate),
            (this._initted = 1),
            (this._zTime = i),
            (l = 0)),
          !l && h && !s && !d && (st(this, "onStart"), this._tTime !== c))
        )
          return this;
        if (h >= l && i >= 0)
          for (p = this._first; p; ) {
            if (
              ((g = p._next), (p._act || h >= p._start) && p._ts && v !== p)
            ) {
              if (p.parent !== this) return this.render(i, s, o);
              if (
                (p.render(
                  p._ts > 0
                    ? (h - p._start) * p._ts
                    : (p._dirty ? p.totalDuration() : p._tDur) +
                        (h - p._start) * p._ts,
                  s,
                  o
                ),
                h !== this._time || (!this._ts && !b))
              ) {
                (v = 0), g && (c += this._zTime = -pe);
                break;
              }
            }
            p = g;
          }
        else {
          p = this._last;
          for (var U = i < 0 ? i : h; p; ) {
            if (((g = p._prev), (p._act || U <= p._end) && p._ts && v !== p)) {
              if (p.parent !== this) return this.render(i, s, o);
              if (
                (p.render(
                  p._ts > 0
                    ? (U - p._start) * p._ts
                    : (p._dirty ? p.totalDuration() : p._tDur) +
                        (U - p._start) * p._ts,
                  s,
                  o || (Ve && (p._initted || p._startAt))
                ),
                h !== this._time || (!this._ts && !b))
              ) {
                (v = 0), g && (c += this._zTime = U ? -pe : pe);
                break;
              }
            }
            p = g;
          }
        }
        if (
          v &&
          !s &&
          (this.pause(),
          (v.render(h >= l ? 0 : -pe)._zTime = h >= l ? 1 : -1),
          this._ts)
        )
          return (this._start = x), Ki(this), this.render(i, s, o);
        this._onUpdate && !s && st(this, "onUpdate", !0),
          ((c === u && this._tTime >= this.totalDuration()) || (!c && l)) &&
            (x === this._start || Math.abs(w) !== Math.abs(this._ts)) &&
            (this._lock ||
              ((i || !a) &&
                ((c === u && this._ts > 0) || (!c && this._ts < 0)) &&
                hn(this, 1),
              !s &&
                !(i < 0 && !l) &&
                (c || l || !u) &&
                (st(
                  this,
                  c === u && i >= 0 ? "onComplete" : "onReverseComplete",
                  !0
                ),
                this._prom &&
                  !(c < u && this.timeScale() > 0) &&
                  this._prom())));
      }
      return this;
    }),
    (n.add = function (i, s) {
      var o = this;
      if ((qt(s) || (s = ft(this, s, i)), !(i instanceof Kr))) {
        if (We(i))
          return (
            i.forEach(function (l) {
              return o.add(l, s);
            }),
            this
          );
        if (Ne(i)) return this.addLabel(i, s);
        if (Re(i)) i = Le.delayedCall(0, i);
        else return this;
      }
      return this !== i ? Ot(this, i, s) : this;
    }),
    (n.getChildren = function (i, s, o, l) {
      i === void 0 && (i = !0),
        s === void 0 && (s = !0),
        o === void 0 && (o = !0),
        l === void 0 && (l = -ht);
      for (var u = [], a = this._first; a; )
        a._start >= l &&
          (a instanceof Le
            ? s && u.push(a)
            : (o && u.push(a), i && u.push.apply(u, a.getChildren(!0, s, o)))),
          (a = a._next);
      return u;
    }),
    (n.getById = function (i) {
      for (var s = this.getChildren(1, 1, 1), o = s.length; o--; )
        if (s[o].vars.id === i) return s[o];
    }),
    (n.remove = function (i) {
      return Ne(i)
        ? this.removeLabel(i)
        : Re(i)
        ? this.killTweensOf(i)
        : (qi(this, i),
          i === this._recent && (this._recent = this._last),
          Mn(this));
    }),
    (n.totalTime = function (i, s) {
      return arguments.length
        ? ((this._forcing = 1),
          !this._dp &&
            this._ts &&
            (this._start = De(
              it.time -
                (this._ts > 0
                  ? i / this._ts
                  : (this.totalDuration() - i) / -this._ts)
            )),
          t.prototype.totalTime.call(this, i, s),
          (this._forcing = 0),
          this)
        : this._tTime;
    }),
    (n.addLabel = function (i, s) {
      return (this.labels[i] = ft(this, s)), this;
    }),
    (n.removeLabel = function (i) {
      return delete this.labels[i], this;
    }),
    (n.addPause = function (i, s, o) {
      var l = Le.delayedCall(0, s || Vr, o);
      return (
        (l.data = "isPause"), (this._hasPause = 1), Ot(this, l, ft(this, i))
      );
    }),
    (n.removePause = function (i) {
      var s = this._first;
      for (i = ft(this, i); s; )
        s._start === i && s.data === "isPause" && hn(s), (s = s._next);
    }),
    (n.killTweensOf = function (i, s, o) {
      for (var l = this.getTweensOf(i, o), u = l.length; u--; )
        rn !== l[u] && l[u].kill(i, s);
      return this;
    }),
    (n.getTweensOf = function (i, s) {
      for (var o = [], l = dt(i), u = this._first, a = qt(s), c; u; )
        u instanceof Le
          ? q_(u._targets, l) &&
            (a
              ? (!rn || (u._initted && u._ts)) &&
                u.globalTime(0) <= s &&
                u.globalTime(u.totalDuration()) > s
              : !s || u.isActive()) &&
            o.push(u)
          : (c = u.getTweensOf(l, s)).length && o.push.apply(o, c),
          (u = u._next);
      return o;
    }),
    (n.tweenTo = function (i, s) {
      s = s || {};
      var o = this,
        l = ft(o, i),
        u = s,
        a = u.startAt,
        c = u.onStart,
        f = u.onStartParams,
        h = u.immediateRender,
        p,
        g = Le.to(
          o,
          mt(
            {
              ease: s.ease || "none",
              lazy: !1,
              immediateRender: !1,
              time: l,
              overwrite: "auto",
              duration:
                s.duration ||
                Math.abs(
                  (l - (a && "time" in a ? a.time : o._time)) / o.timeScale()
                ) ||
                pe,
              onStart: function () {
                if ((o.pause(), !p)) {
                  var m =
                    s.duration ||
                    Math.abs(
                      (l - (a && "time" in a ? a.time : o._time)) /
                        o.timeScale()
                    );
                  g._dur !== m && lr(g, m, 0, 1).render(g._time, !0, !0),
                    (p = 1);
                }
                c && c.apply(g, f || []);
              },
            },
            s
          )
        );
      return h ? g.render(0) : g;
    }),
    (n.tweenFromTo = function (i, s, o) {
      return this.tweenTo(s, mt({ startAt: { time: ft(this, i) } }, o));
    }),
    (n.recent = function () {
      return this._recent;
    }),
    (n.nextLabel = function (i) {
      return i === void 0 && (i = this._time), ea(this, ft(this, i));
    }),
    (n.previousLabel = function (i) {
      return i === void 0 && (i = this._time), ea(this, ft(this, i), 1);
    }),
    (n.currentLabel = function (i) {
      return arguments.length
        ? this.seek(i, !0)
        : this.previousLabel(this._time + pe);
    }),
    (n.shiftChildren = function (i, s, o) {
      o === void 0 && (o = 0);
      for (var l = this._first, u = this.labels, a; l; )
        l._start >= o && ((l._start += i), (l._end += i)), (l = l._next);
      if (s) for (a in u) u[a] >= o && (u[a] += i);
      return Mn(this);
    }),
    (n.invalidate = function (i) {
      var s = this._first;
      for (this._lock = 0; s; ) s.invalidate(i), (s = s._next);
      return t.prototype.invalidate.call(this, i);
    }),
    (n.clear = function (i) {
      i === void 0 && (i = !0);
      for (var s = this._first, o; s; ) (o = s._next), this.remove(s), (s = o);
      return (
        this._dp && (this._time = this._tTime = this._pTime = 0),
        i && (this.labels = {}),
        Mn(this)
      );
    }),
    (n.totalDuration = function (i) {
      var s = 0,
        o = this,
        l = o._last,
        u = ht,
        a,
        c,
        f;
      if (arguments.length)
        return o.timeScale(
          (o._repeat < 0 ? o.duration() : o.totalDuration()) /
            (o.reversed() ? -i : i)
        );
      if (o._dirty) {
        for (f = o.parent; l; )
          (a = l._prev),
            l._dirty && l.totalDuration(),
            (c = l._start),
            c > u && o._sort && l._ts && !o._lock
              ? ((o._lock = 1), (Ot(o, l, c - l._delay, 1)._lock = 0))
              : (u = c),
            c < 0 &&
              l._ts &&
              ((s -= c),
              ((!f && !o._dp) || (f && f.smoothChildTiming)) &&
                ((o._start += c / o._ts), (o._time -= c), (o._tTime -= c)),
              o.shiftChildren(-c, !1, -1 / 0),
              (u = 0)),
            l._end > s && l._ts && (s = l._end),
            (l = a);
        lr(o, o === we && o._time > s ? o._time : s, 1, 1), (o._dirty = 0);
      }
      return o._tDur;
    }),
    (e.updateRoot = function (i) {
      if ((we._ts && (rc(we, Ti(i, we)), (tc = it.frame)), it.frame >= Gl)) {
        Gl += ot.autoSleep || 120;
        var s = we._first;
        if ((!s || !s._ts) && ot.autoSleep && it._listeners.length < 2) {
          for (; s && !s._ts; ) s = s._next;
          s || it.sleep();
        }
      }
    }),
    e
  );
})(Kr);
mt(Xe.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
var _g = function (e, n, r, i, s, o, l) {
    var u = new Je(this._pt, e, n, 0, 1, Mc, null, s),
      a = 0,
      c = 0,
      f,
      h,
      p,
      g,
      d,
      m,
      b,
      v;
    for (
      u.b = r,
        u.e = i,
        r += "",
        i += "",
        (b = ~i.indexOf("random(")) && (i = Wr(i)),
        o && ((v = [r, i]), o(v, e, n), (r = v[0]), (i = v[1])),
        h = r.match(us) || [];
      (f = us.exec(i));

    )
      (g = f[0]),
        (d = i.substring(a, f.index)),
        p ? (p = (p + 1) % 5) : d.substr(-5) === "rgba(" && (p = 1),
        g !== h[c++] &&
          ((m = parseFloat(h[c - 1]) || 0),
          (u._pt = {
            _next: u._pt,
            p: d || c === 1 ? d : ",",
            s: m,
            c: g.charAt(1) === "=" ? Gn(m, g) - m : parseFloat(g) - m,
            m: p && p < 4 ? Math.round : 0,
          }),
          (a = us.lastIndex));
    return (
      (u.c = a < i.length ? i.substring(a, i.length) : ""),
      (u.fp = l),
      (Gu.test(i) || b) && (u.e = 0),
      (this._pt = u),
      u
    );
  },
  Do = function (e, n, r, i, s, o, l, u, a, c) {
    Re(i) && (i = i(s || 0, e, o));
    var f = e[n],
      h =
        r !== "get"
          ? r
          : Re(f)
          ? a
            ? e[
                n.indexOf("set") || !Re(e["get" + n.substr(3)])
                  ? n
                  : "get" + n.substr(3)
              ](a)
            : e[n]()
          : f,
      p = Re(f) ? (a ? bg : kc) : No,
      g;
    if (
      (Ne(i) &&
        (~i.indexOf("random(") && (i = Wr(i)),
        i.charAt(1) === "=" &&
          ((g = Gn(h, i) + (He(h) || 0)), (g || g === 0) && (i = g))),
      !c || h !== i || Vs)
    )
      return !isNaN(h * i) && i !== ""
        ? ((g = new Je(
            this._pt,
            e,
            n,
            +h || 0,
            i - (h || 0),
            typeof f == "boolean" ? xg : Oc,
            0,
            p
          )),
          a && (g.fp = a),
          l && g.modifier(l, this, e),
          (this._pt = g))
        : (!f && !(n in e) && Mo(n, i),
          _g.call(this, e, n, h, i, p, u || ot.stringFilter, a));
  },
  gg = function (e, n, r, i, s) {
    if (
      (Re(e) && (e = Or(e, s, n, r, i)),
      !Ft(e) || (e.style && e.nodeType) || We(e) || Xu(e))
    )
      return Ne(e) ? Or(e, s, n, r, i) : e;
    var o = {},
      l;
    for (l in e) o[l] = Or(e[l], s, n, r, i);
    return o;
  },
  Pc = function (e, n, r, i, s, o) {
    var l, u, a, c;
    if (
      rt[e] &&
      (l = new rt[e]()).init(
        s,
        l.rawVars ? n[e] : gg(n[e], i, s, o, r),
        r,
        i,
        o
      ) !== !1 &&
      ((r._pt = u = new Je(r._pt, s, e, 0, 1, l.render, l, 0, l.priority)),
      r !== Vn)
    )
      for (a = r._ptLookup[r._targets.indexOf(s)], c = l._props.length; c--; )
        a[l._props[c]] = u;
    return l;
  },
  rn,
  Vs,
  Fo = function t(e, n, r) {
    var i = e.vars,
      s = i.ease,
      o = i.startAt,
      l = i.immediateRender,
      u = i.lazy,
      a = i.onUpdate,
      c = i.runBackwards,
      f = i.yoyoEase,
      h = i.keyframes,
      p = i.autoRevert,
      g = e._dur,
      d = e._startAt,
      m = e._targets,
      b = e.parent,
      v = b && b.data === "nested" ? b.vars.targets : m,
      w = e._overwrite === "auto" && !Ro,
      x = e.timeline,
      T,
      k,
      A,
      P,
      R,
      U,
      O,
      E,
      I,
      D,
      j,
      z,
      q;
    if (
      (x && (!h || !s) && (s = "none"),
      (e._ease = An(s, sr.ease)),
      (e._yEase = f ? xc(An(f === !0 ? s : f, sr.ease)) : 0),
      f &&
        e._yoyo &&
        !e._repeat &&
        ((f = e._yEase), (e._yEase = e._ease), (e._ease = f)),
      (e._from = !x && !!i.runBackwards),
      !x || (h && !i.stagger))
    ) {
      if (
        ((E = m[0] ? On(m[0]).harness : 0),
        (z = E && i[E.prop]),
        (T = Ei(i, Ao)),
        d &&
          (d._zTime < 0 && d.progress(1),
          n < 0 && c && l && !p ? d.render(-1, !0) : d.revert(c && g ? ci : V_),
          (d._lazy = 0)),
        o)
      ) {
        if (
          (hn(
            (e._startAt = Le.set(
              m,
              mt(
                {
                  data: "isStart",
                  overwrite: !1,
                  parent: b,
                  immediateRender: !0,
                  lazy: !d && Ge(u),
                  startAt: null,
                  delay: 0,
                  onUpdate:
                    a &&
                    function () {
                      return st(e, "onUpdate");
                    },
                  stagger: 0,
                },
                o
              )
            ))
          ),
          (e._startAt._dp = 0),
          (e._startAt._sat = e),
          n < 0 && (Ve || (!l && !p)) && e._startAt.revert(ci),
          l && g && n <= 0 && r <= 0)
        ) {
          n && (e._zTime = n);
          return;
        }
      } else if (c && g && !d) {
        if (
          (n && (l = !1),
          (A = mt(
            {
              overwrite: !1,
              data: "isFromStart",
              lazy: l && !d && Ge(u),
              immediateRender: l,
              stagger: 0,
              parent: b,
            },
            T
          )),
          z && (A[E.prop] = z),
          hn((e._startAt = Le.set(m, A))),
          (e._startAt._dp = 0),
          (e._startAt._sat = e),
          n < 0 && (Ve ? e._startAt.revert(ci) : e._startAt.render(-1, !0)),
          (e._zTime = n),
          !l)
        )
          t(e._startAt, pe, pe);
        else if (!n) return;
      }
      for (
        e._pt = e._ptCache = 0, u = (g && Ge(u)) || (u && !g), k = 0;
        k < m.length;
        k++
      ) {
        if (
          ((R = m[k]),
          (O = R._gsap || Io(m)[k]._gsap),
          (e._ptLookup[k] = D = {}),
          $s[O.id] && un.length && xi(),
          (j = v === m ? k : v.indexOf(R)),
          E &&
            (I = new E()).init(R, z || T, e, j, v) !== !1 &&
            ((e._pt = P =
              new Je(e._pt, R, I.name, 0, 1, I.render, I, 0, I.priority)),
            I._props.forEach(function (X) {
              D[X] = P;
            }),
            I.priority && (U = 1)),
          !E || z)
        )
          for (A in T)
            rt[A] && (I = Pc(A, T, e, j, R, v))
              ? I.priority && (U = 1)
              : (D[A] = P =
                  Do.call(e, R, A, "get", T[A], j, v, 0, i.stringFilter));
        e._op && e._op[k] && e.kill(R, e._op[k]),
          w &&
            e._pt &&
            ((rn = e),
            we.killTweensOf(R, D, e.globalTime(n)),
            (q = !e.parent),
            (rn = 0)),
          e._pt && u && ($s[O.id] = 1);
      }
      U && Ac(e), e._onInit && e._onInit(e);
    }
    (e._onUpdate = a),
      (e._initted = (!e._op || e._pt) && !q),
      h && n <= 0 && x.render(ht, !0, !0);
  },
  mg = function (e, n, r, i, s, o, l, u) {
    var a = ((e._pt && e._ptCache) || (e._ptCache = {}))[n],
      c,
      f,
      h,
      p;
    if (!a)
      for (
        a = e._ptCache[n] = [], h = e._ptLookup, p = e._targets.length;
        p--;

      ) {
        if (((c = h[p][n]), c && c.d && c.d._pt))
          for (c = c.d._pt; c && c.p !== n && c.fp !== n; ) c = c._next;
        if (!c)
          return (
            (Vs = 1),
            (e.vars[n] = "+=0"),
            Fo(e, l),
            (Vs = 0),
            u ? Hr(n + " not eligible for reset") : 1
          );
        a.push(c);
      }
    for (p = a.length; p--; )
      (f = a[p]),
        (c = f._pt || f),
        (c.s = (i || i === 0) && !s ? i : c.s + (i || 0) + o * c.c),
        (c.c = r - c.s),
        f.e && (f.e = ke(r) + He(f.e)),
        f.b && (f.b = c.s + He(f.b));
  },
  vg = function (e, n) {
    var r = e[0] ? On(e[0]).harness : 0,
      i = r && r.aliases,
      s,
      o,
      l,
      u;
    if (!i) return n;
    s = Dn({}, n);
    for (o in i)
      if (o in s) for (u = i[o].split(","), l = u.length; l--; ) s[u[l]] = s[o];
    return s;
  },
  yg = function (e, n, r, i) {
    var s = n.ease || i || "power1.inOut",
      o,
      l;
    if (We(n))
      (l = r[e] || (r[e] = [])),
        n.forEach(function (u, a) {
          return l.push({ t: (a / (n.length - 1)) * 100, v: u, e: s });
        });
    else
      for (o in n)
        (l = r[o] || (r[o] = [])),
          o === "ease" || l.push({ t: parseFloat(e), v: n[o], e: s });
  },
  Or = function (e, n, r, i, s) {
    return Re(e)
      ? e.call(n, r, i, s)
      : Ne(e) && ~e.indexOf("random(")
      ? Wr(e)
      : e;
  },
  Rc = Lo + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
  Sc = {};
Qe(Rc + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
  return (Sc[t] = 1);
});
var Le = (function (t) {
  qu(e, t);
  function e(r, i, s, o) {
    var l;
    typeof i == "number" && ((s.duration = i), (i = s), (s = null)),
      (l = t.call(this, o ? i : Sr(i)) || this);
    var u = l.vars,
      a = u.duration,
      c = u.delay,
      f = u.immediateRender,
      h = u.stagger,
      p = u.overwrite,
      g = u.keyframes,
      d = u.defaults,
      m = u.scrollTrigger,
      b = u.yoyoEase,
      v = i.parent || we,
      w = (We(r) || Xu(r) ? qt(r[0]) : "length" in i) ? [r] : dt(r),
      x,
      T,
      k,
      A,
      P,
      R,
      U,
      O;
    if (
      ((l._targets = w.length
        ? Io(w)
        : Hr(
            "GSAP target " + r + " not found. https://gsap.com",
            !ot.nullTargetWarn
          ) || []),
      (l._ptLookup = []),
      (l._overwrite = p),
      g || h || si(a) || si(c))
    ) {
      if (
        ((i = l.vars),
        (x = l.timeline =
          new Xe({
            data: "nested",
            defaults: d || {},
            targets: v && v.data === "nested" ? v.vars.targets : w,
          })),
        x.kill(),
        (x.parent = x._dp = jt(l)),
        (x._start = 0),
        h || si(a) || si(c))
      ) {
        if (((A = w.length), (U = h && hc(h)), Ft(h)))
          for (P in h) ~Rc.indexOf(P) && (O || (O = {}), (O[P] = h[P]));
        for (T = 0; T < A; T++)
          (k = Ei(i, Sc)),
            (k.stagger = 0),
            b && (k.yoyoEase = b),
            O && Dn(k, O),
            (R = w[T]),
            (k.duration = +Or(a, jt(l), T, R, w)),
            (k.delay = (+Or(c, jt(l), T, R, w) || 0) - l._delay),
            !h &&
              A === 1 &&
              k.delay &&
              ((l._delay = c = k.delay), (l._start += c), (k.delay = 0)),
            x.to(R, k, U ? U(T, R, w) : 0),
            (x._ease = ie.none);
        x.duration() ? (a = c = 0) : (l.timeline = 0);
      } else if (g) {
        Sr(mt(x.vars.defaults, { ease: "none" })),
          (x._ease = An(g.ease || i.ease || "none"));
        var E = 0,
          I,
          D,
          j;
        if (We(g))
          g.forEach(function (z) {
            return x.to(w, z, ">");
          }),
            x.duration();
        else {
          k = {};
          for (P in g)
            P === "ease" || P === "easeEach" || yg(P, g[P], k, g.easeEach);
          for (P in k)
            for (
              I = k[P].sort(function (z, q) {
                return z.t - q.t;
              }),
                E = 0,
                T = 0;
              T < I.length;
              T++
            )
              (D = I[T]),
                (j = {
                  ease: D.e,
                  duration: ((D.t - (T ? I[T - 1].t : 0)) / 100) * a,
                }),
                (j[P] = D.v),
                x.to(w, j, E),
                (E += j.duration);
          x.duration() < a && x.to({}, { duration: a - x.duration() });
        }
      }
      a || l.duration((a = x.duration()));
    } else l.timeline = 0;
    return (
      p === !0 && !Ro && ((rn = jt(l)), we.killTweensOf(w), (rn = 0)),
      Ot(v, jt(l), s),
      i.reversed && l.reverse(),
      i.paused && l.paused(!0),
      (f ||
        (!a &&
          !g &&
          l._start === De(v._time) &&
          Ge(f) &&
          G_(jt(l)) &&
          v.data !== "nested")) &&
        ((l._tTime = -pe), l.render(Math.max(0, -c) || 0)),
      m && ac(jt(l), m),
      l
    );
  }
  var n = e.prototype;
  return (
    (n.render = function (i, s, o) {
      var l = this._time,
        u = this._tDur,
        a = this._dur,
        c = i < 0,
        f = i > u - pe && !c ? u : i < pe ? 0 : i,
        h,
        p,
        g,
        d,
        m,
        b,
        v,
        w,
        x;
      if (!a) J_(this, i, s, o);
      else if (
        f !== this._tTime ||
        !i ||
        o ||
        (!this._initted && this._tTime) ||
        (this._startAt && this._zTime < 0 !== c)
      ) {
        if (((h = f), (w = this.timeline), this._repeat)) {
          if (((d = a + this._rDelay), this._repeat < -1 && c))
            return this.totalTime(d * 100 + i, s, o);
          if (
            ((h = De(f % d)),
            f === u
              ? ((g = this._repeat), (h = a))
              : ((g = ~~(f / d)),
                g && g === De(f / d) && ((h = a), g--),
                h > a && (h = a)),
            (b = this._yoyo && g & 1),
            b && ((x = this._yEase), (h = a - h)),
            (m = or(this._tTime, d)),
            h === l && !o && this._initted && g === m)
          )
            return (this._tTime = f), this;
          g !== m &&
            (w && this._yEase && Ec(w, b),
            this.vars.repeatRefresh &&
              !b &&
              !this._lock &&
              this._time !== d &&
              this._initted &&
              ((this._lock = o = 1),
              (this.render(De(d * g), !0).invalidate()._lock = 0)));
        }
        if (!this._initted) {
          if (uc(this, c ? i : h, o, s, f)) return (this._tTime = 0), this;
          if (l !== this._time && !(o && this.vars.repeatRefresh && g !== m))
            return this;
          if (a !== this._dur) return this.render(i, s, o);
        }
        if (
          ((this._tTime = f),
          (this._time = h),
          !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
          (this.ratio = v = (x || this._ease)(h / a)),
          this._from && (this.ratio = v = 1 - v),
          h && !l && !s && !g && (st(this, "onStart"), this._tTime !== f))
        )
          return this;
        for (p = this._pt; p; ) p.r(v, p.d), (p = p._next);
        (w && w.render(i < 0 ? i : w._dur * w._ease(h / this._dur), s, o)) ||
          (this._startAt && (this._zTime = i)),
          this._onUpdate &&
            !s &&
            (c && zs(this, i, s, o), st(this, "onUpdate")),
          this._repeat &&
            g !== m &&
            this.vars.onRepeat &&
            !s &&
            this.parent &&
            st(this, "onRepeat"),
          (f === this._tDur || !f) &&
            this._tTime === f &&
            (c && !this._onUpdate && zs(this, i, !0, !0),
            (i || !a) &&
              ((f === this._tDur && this._ts > 0) || (!f && this._ts < 0)) &&
              hn(this, 1),
            !s &&
              !(c && !l) &&
              (f || l || b) &&
              (st(this, f === u ? "onComplete" : "onReverseComplete", !0),
              this._prom && !(f < u && this.timeScale() > 0) && this._prom()));
      }
      return this;
    }),
    (n.targets = function () {
      return this._targets;
    }),
    (n.invalidate = function (i) {
      return (
        (!i || !this.vars.runBackwards) && (this._startAt = 0),
        (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
        (this._ptLookup = []),
        this.timeline && this.timeline.invalidate(i),
        t.prototype.invalidate.call(this, i)
      );
    }),
    (n.resetTo = function (i, s, o, l, u) {
      qr || it.wake(), this._ts || this.play();
      var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
        c;
      return (
        this._initted || Fo(this, a),
        (c = this._ease(a / this._dur)),
        mg(this, i, s, o, l, c, a, u)
          ? this.resetTo(i, s, o, l, 1)
          : (Xi(this, 0),
            this.parent ||
              oc(
                this._dp,
                this,
                "_first",
                "_last",
                this._dp._sort ? "_start" : 0
              ),
            this.render(0))
      );
    }),
    (n.kill = function (i, s) {
      if ((s === void 0 && (s = "all"), !i && (!s || s === "all")))
        return (this._lazy = this._pt = 0), this.parent ? wr(this) : this;
      if (this.timeline) {
        var o = this.timeline.totalDuration();
        return (
          this.timeline.killTweensOf(i, s, rn && rn.vars.overwrite !== !0)
            ._first || wr(this),
          this.parent &&
            o !== this.timeline.totalDuration() &&
            lr(this, (this._dur * this.timeline._tDur) / o, 0, 1),
          this
        );
      }
      var l = this._targets,
        u = i ? dt(i) : l,
        a = this._ptLookup,
        c = this._pt,
        f,
        h,
        p,
        g,
        d,
        m,
        b;
      if ((!s || s === "all") && X_(l, u))
        return s === "all" && (this._pt = 0), wr(this);
      for (
        f = this._op = this._op || [],
          s !== "all" &&
            (Ne(s) &&
              ((d = {}),
              Qe(s, function (v) {
                return (d[v] = 1);
              }),
              (s = d)),
            (s = vg(l, s))),
          b = l.length;
        b--;

      )
        if (~u.indexOf(l[b])) {
          (h = a[b]),
            s === "all"
              ? ((f[b] = s), (g = h), (p = {}))
              : ((p = f[b] = f[b] || {}), (g = s));
          for (d in g)
            (m = h && h[d]),
              m &&
                ((!("kill" in m.d) || m.d.kill(d) === !0) && qi(this, m, "_pt"),
                delete h[d]),
              p !== "all" && (p[d] = 1);
        }
      return this._initted && !this._pt && c && wr(this), this;
    }),
    (e.to = function (i, s) {
      return new e(i, s, arguments[2]);
    }),
    (e.from = function (i, s) {
      return kr(1, arguments);
    }),
    (e.delayedCall = function (i, s, o, l) {
      return new e(s, 0, {
        immediateRender: !1,
        lazy: !1,
        overwrite: !1,
        delay: i,
        onComplete: s,
        onReverseComplete: s,
        onCompleteParams: o,
        onReverseCompleteParams: o,
        callbackScope: l,
      });
    }),
    (e.fromTo = function (i, s, o) {
      return kr(2, arguments);
    }),
    (e.set = function (i, s) {
      return (s.duration = 0), s.repeatDelay || (s.repeat = 0), new e(i, s);
    }),
    (e.killTweensOf = function (i, s, o) {
      return we.killTweensOf(i, s, o);
    }),
    e
  );
})(Kr);
mt(Le.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 });
Qe("staggerTo,staggerFrom,staggerFromTo", function (t) {
  Le[t] = function () {
    var e = new Xe(),
      n = js.call(arguments, 0);
    return n.splice(t === "staggerFromTo" ? 5 : 4, 0, 0), e[t].apply(e, n);
  };
});
var No = function (e, n, r) {
    return (e[n] = r);
  },
  kc = function (e, n, r) {
    return e[n](r);
  },
  bg = function (e, n, r, i) {
    return e[n](i.fp, r);
  },
  wg = function (e, n, r) {
    return e.setAttribute(n, r);
  },
  $o = function (e, n) {
    return Re(e[n]) ? kc : So(e[n]) && e.setAttribute ? wg : No;
  },
  Oc = function (e, n) {
    return n.set(n.t, n.p, Math.round((n.s + n.c * e) * 1e6) / 1e6, n);
  },
  xg = function (e, n) {
    return n.set(n.t, n.p, !!(n.s + n.c * e), n);
  },
  Mc = function (e, n) {
    var r = n._pt,
      i = "";
    if (!e && n.b) i = n.b;
    else if (e === 1 && n.e) i = n.e;
    else {
      for (; r; )
        (i =
          r.p +
          (r.m ? r.m(r.s + r.c * e) : Math.round((r.s + r.c * e) * 1e4) / 1e4) +
          i),
          (r = r._next);
      i += n.c;
    }
    n.set(n.t, n.p, i, n);
  },
  zo = function (e, n) {
    for (var r = n._pt; r; ) r.r(e, r.d), (r = r._next);
  },
  Eg = function (e, n, r, i) {
    for (var s = this._pt, o; s; )
      (o = s._next), s.p === i && s.modifier(e, n, r), (s = o);
  },
  Tg = function (e) {
    for (var n = this._pt, r, i; n; )
      (i = n._next),
        (n.p === e && !n.op) || n.op === e
          ? qi(this, n, "_pt")
          : n.dep || (r = 1),
        (n = i);
    return !r;
  },
  Cg = function (e, n, r, i) {
    i.mSet(e, n, i.m.call(i.tween, r, i.mt), i);
  },
  Ac = function (e) {
    for (var n = e._pt, r, i, s, o; n; ) {
      for (r = n._next, i = s; i && i.pr > n.pr; ) i = i._next;
      (n._prev = i ? i._prev : o) ? (n._prev._next = n) : (s = n),
        (n._next = i) ? (i._prev = n) : (o = n),
        (n = r);
    }
    e._pt = s;
  },
  Je = (function () {
    function t(n, r, i, s, o, l, u, a, c) {
      (this.t = r),
        (this.s = s),
        (this.c = o),
        (this.p = i),
        (this.r = l || Oc),
        (this.d = u || this),
        (this.set = a || No),
        (this.pr = c || 0),
        (this._next = n),
        n && (n._prev = this);
    }
    var e = t.prototype;
    return (
      (e.modifier = function (r, i, s) {
        (this.mSet = this.mSet || this.set),
          (this.set = Cg),
          (this.m = r),
          (this.mt = s),
          (this.tween = i);
      }),
      t
    );
  })();
Qe(
  Lo +
    "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
  function (t) {
    return (Ao[t] = 1);
  }
);
lt.TweenMax = lt.TweenLite = Le;
lt.TimelineLite = lt.TimelineMax = Xe;
we = new Xe({
  sortChildren: !1,
  defaults: sr,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0,
});
ot.stringFilter = wc;
var Ln = [],
  hi = {},
  Pg = [],
  na = 0,
  Rg = 0,
  ps = function (e) {
    return (hi[e] || Pg).map(function (n) {
      return n();
    });
  },
  Ws = function () {
    var e = Date.now(),
      n = [];
    e - na > 2 &&
      (ps("matchMediaInit"),
      Ln.forEach(function (r) {
        var i = r.queries,
          s = r.conditions,
          o,
          l,
          u,
          a;
        for (l in i)
          (o = Rt.matchMedia(i[l]).matches),
            o && (u = 1),
            o !== s[l] && ((s[l] = o), (a = 1));
        a && (r.revert(), u && n.push(r));
      }),
      ps("matchMediaRevert"),
      n.forEach(function (r) {
        return r.onMatch(r, function (i) {
          return r.add(null, i);
        });
      }),
      (na = e),
      ps("matchMedia"));
  },
  Lc = (function () {
    function t(n, r) {
      (this.selector = r && Us(r)),
        (this.data = []),
        (this._r = []),
        (this.isReverted = !1),
        (this.id = Rg++),
        n && this.add(n);
    }
    var e = t.prototype;
    return (
      (e.add = function (r, i, s) {
        Re(r) && ((s = i), (i = r), (r = Re));
        var o = this,
          l = function () {
            var a = ye,
              c = o.selector,
              f;
            return (
              a && a !== o && a.data.push(o),
              s && (o.selector = Us(s)),
              (ye = o),
              (f = i.apply(o, arguments)),
              Re(f) && o._r.push(f),
              (ye = a),
              (o.selector = c),
              (o.isReverted = !1),
              f
            );
          };
        return (
          (o.last = l),
          r === Re
            ? l(o, function (u) {
                return o.add(null, u);
              })
            : r
            ? (o[r] = l)
            : l
        );
      }),
      (e.ignore = function (r) {
        var i = ye;
        (ye = null), r(this), (ye = i);
      }),
      (e.getTweens = function () {
        var r = [];
        return (
          this.data.forEach(function (i) {
            return i instanceof t
              ? r.push.apply(r, i.getTweens())
              : i instanceof Le &&
                  !(i.parent && i.parent.data === "nested") &&
                  r.push(i);
          }),
          r
        );
      }),
      (e.clear = function () {
        this._r.length = this.data.length = 0;
      }),
      (e.kill = function (r, i) {
        var s = this;
        if (
          (r
            ? (function () {
                for (var l = s.getTweens(), u = s.data.length, a; u--; )
                  (a = s.data[u]),
                    a.data === "isFlip" &&
                      (a.revert(),
                      a.getChildren(!0, !0, !1).forEach(function (c) {
                        return l.splice(l.indexOf(c), 1);
                      }));
                for (
                  l
                    .map(function (c) {
                      return {
                        g:
                          c._dur ||
                          c._delay ||
                          (c._sat && !c._sat.vars.immediateRender)
                            ? c.globalTime(0)
                            : -1 / 0,
                        t: c,
                      };
                    })
                    .sort(function (c, f) {
                      return f.g - c.g || -1 / 0;
                    })
                    .forEach(function (c) {
                      return c.t.revert(r);
                    }),
                    u = s.data.length;
                  u--;

                )
                  (a = s.data[u]),
                    a instanceof Xe
                      ? a.data !== "nested" &&
                        (a.scrollTrigger && a.scrollTrigger.revert(), a.kill())
                      : !(a instanceof Le) && a.revert && a.revert(r);
                s._r.forEach(function (c) {
                  return c(r, s);
                }),
                  (s.isReverted = !0);
              })()
            : this.data.forEach(function (l) {
                return l.kill && l.kill();
              }),
          this.clear(),
          i)
        )
          for (var o = Ln.length; o--; )
            Ln[o].id === this.id && Ln.splice(o, 1);
      }),
      (e.revert = function (r) {
        this.kill(r || {});
      }),
      t
    );
  })(),
  Sg = (function () {
    function t(n) {
      (this.contexts = []), (this.scope = n), ye && ye.data.push(this);
    }
    var e = t.prototype;
    return (
      (e.add = function (r, i, s) {
        Ft(r) || (r = { matches: r });
        var o = new Lc(0, s || this.scope),
          l = (o.conditions = {}),
          u,
          a,
          c;
        ye && !o.selector && (o.selector = ye.selector),
          this.contexts.push(o),
          (i = o.add("onMatch", i)),
          (o.queries = r);
        for (a in r)
          a === "all"
            ? (c = 1)
            : ((u = Rt.matchMedia(r[a])),
              u &&
                (Ln.indexOf(o) < 0 && Ln.push(o),
                (l[a] = u.matches) && (c = 1),
                u.addListener
                  ? u.addListener(Ws)
                  : u.addEventListener("change", Ws)));
        return (
          c &&
            i(o, function (f) {
              return o.add(null, f);
            }),
          this
        );
      }),
      (e.revert = function (r) {
        this.kill(r || {});
      }),
      (e.kill = function (r) {
        this.contexts.forEach(function (i) {
          return i.kill(r, !0);
        });
      }),
      t
    );
  })(),
  Ci = {
    registerPlugin: function () {
      for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
        n[r] = arguments[r];
      n.forEach(function (i) {
        return vc(i);
      });
    },
    timeline: function (e) {
      return new Xe(e);
    },
    getTweensOf: function (e, n) {
      return we.getTweensOf(e, n);
    },
    getProperty: function (e, n, r, i) {
      Ne(e) && (e = dt(e)[0]);
      var s = On(e || {}).get,
        o = r ? sc : ic;
      return (
        r === "native" && (r = ""),
        e &&
          (n
            ? o(((rt[n] && rt[n].get) || s)(e, n, r, i))
            : function (l, u, a) {
                return o(((rt[l] && rt[l].get) || s)(e, l, u, a));
              })
      );
    },
    quickSetter: function (e, n, r) {
      if (((e = dt(e)), e.length > 1)) {
        var i = e.map(function (c) {
            return tt.quickSetter(c, n, r);
          }),
          s = i.length;
        return function (c) {
          for (var f = s; f--; ) i[f](c);
        };
      }
      e = e[0] || {};
      var o = rt[n],
        l = On(e),
        u = (l.harness && (l.harness.aliases || {})[n]) || n,
        a = o
          ? function (c) {
              var f = new o();
              (Vn._pt = 0),
                f.init(e, r ? c + r : c, Vn, 0, [e]),
                f.render(1, f),
                Vn._pt && zo(1, Vn);
            }
          : l.set(e, u);
      return o
        ? a
        : function (c) {
            return a(e, u, r ? c + r : c, l, 1);
          };
    },
    quickTo: function (e, n, r) {
      var i,
        s = tt.to(
          e,
          Dn(((i = {}), (i[n] = "+=0.1"), (i.paused = !0), i), r || {})
        ),
        o = function (u, a, c) {
          return s.resetTo(n, u, a, c);
        };
      return (o.tween = s), o;
    },
    isTweening: function (e) {
      return we.getTweensOf(e, !0).length > 0;
    },
    defaults: function (e) {
      return e && e.ease && (e.ease = An(e.ease, sr.ease)), Ql(sr, e || {});
    },
    config: function (e) {
      return Ql(ot, e || {});
    },
    registerEffect: function (e) {
      var n = e.name,
        r = e.effect,
        i = e.plugins,
        s = e.defaults,
        o = e.extendTimeline;
      (i || "").split(",").forEach(function (l) {
        return (
          l && !rt[l] && !lt[l] && Hr(n + " effect requires " + l + " plugin.")
        );
      }),
        (cs[n] = function (l, u, a) {
          return r(dt(l), mt(u || {}, s), a);
        }),
        o &&
          (Xe.prototype[n] = function (l, u, a) {
            return this.add(cs[n](l, Ft(u) ? u : (a = u) && {}, this), a);
          });
    },
    registerEase: function (e, n) {
      ie[e] = An(n);
    },
    parseEase: function (e, n) {
      return arguments.length ? An(e, n) : ie;
    },
    getById: function (e) {
      return we.getById(e);
    },
    exportRoot: function (e, n) {
      e === void 0 && (e = {});
      var r = new Xe(e),
        i,
        s;
      for (
        r.smoothChildTiming = Ge(e.smoothChildTiming),
          we.remove(r),
          r._dp = 0,
          r._time = r._tTime = we._time,
          i = we._first;
        i;

      )
        (s = i._next),
          (n ||
            !(
              !i._dur &&
              i instanceof Le &&
              i.vars.onComplete === i._targets[0]
            )) &&
            Ot(r, i, i._start - i._delay),
          (i = s);
      return Ot(we, r, 0), r;
    },
    context: function (e, n) {
      return e ? new Lc(e, n) : ye;
    },
    matchMedia: function (e) {
      return new Sg(e);
    },
    matchMediaRefresh: function () {
      return (
        Ln.forEach(function (e) {
          var n = e.conditions,
            r,
            i;
          for (i in n) n[i] && ((n[i] = !1), (r = 1));
          r && e.revert();
        }) || Ws()
      );
    },
    addEventListener: function (e, n) {
      var r = hi[e] || (hi[e] = []);
      ~r.indexOf(n) || r.push(n);
    },
    removeEventListener: function (e, n) {
      var r = hi[e],
        i = r && r.indexOf(n);
      i >= 0 && r.splice(i, 1);
    },
    utils: {
      wrap: og,
      wrapYoyo: lg,
      distribute: hc,
      random: pc,
      snap: dc,
      normalize: sg,
      getUnit: He,
      clamp: tg,
      splitColor: yc,
      toArray: dt,
      selector: Us,
      mapRange: gc,
      pipe: rg,
      unitize: ig,
      interpolate: ag,
      shuffle: fc,
    },
    install: Zu,
    effects: cs,
    ticker: it,
    updateRoot: Xe.updateRoot,
    plugins: rt,
    globalTimeline: we,
    core: {
      PropTween: Je,
      globals: ec,
      Tween: Le,
      Timeline: Xe,
      Animation: Kr,
      getCache: On,
      _removeLinkedListItem: qi,
      reverting: function () {
        return Ve;
      },
      context: function (e) {
        return e && ye && (ye.data.push(e), (e._ctx = ye)), ye;
      },
      suppressOverwrites: function (e) {
        return (Ro = e);
      },
    },
  };
Qe("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
  return (Ci[t] = Le[t]);
});
it.add(Xe.updateRoot);
Vn = Ci.to({}, { duration: 0 });
var kg = function (e, n) {
    for (var r = e._pt; r && r.p !== n && r.op !== n && r.fp !== n; )
      r = r._next;
    return r;
  },
  Og = function (e, n) {
    var r = e._targets,
      i,
      s,
      o;
    for (i in n)
      for (s = r.length; s--; )
        (o = e._ptLookup[s][i]),
          o &&
            (o = o.d) &&
            (o._pt && (o = kg(o, i)),
            o && o.modifier && o.modifier(n[i], e, r[s], i));
  },
  _s = function (e, n) {
    return {
      name: e,
      rawVars: 1,
      init: function (i, s, o) {
        o._onInit = function (l) {
          var u, a;
          if (
            (Ne(s) &&
              ((u = {}),
              Qe(s, function (c) {
                return (u[c] = 1);
              }),
              (s = u)),
            n)
          ) {
            u = {};
            for (a in s) u[a] = n(s[a]);
            s = u;
          }
          Og(l, s);
        };
      },
    };
  },
  tt =
    Ci.registerPlugin(
      {
        name: "attr",
        init: function (e, n, r, i, s) {
          var o, l, u;
          this.tween = r;
          for (o in n)
            (u = e.getAttribute(o) || ""),
              (l = this.add(
                e,
                "setAttribute",
                (u || 0) + "",
                n[o],
                i,
                s,
                0,
                0,
                o
              )),
              (l.op = o),
              (l.b = u),
              this._props.push(o);
        },
        render: function (e, n) {
          for (var r = n._pt; r; )
            Ve ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), (r = r._next);
        },
      },
      {
        name: "endArray",
        init: function (e, n) {
          for (var r = n.length; r--; )
            this.add(e, r, e[r] || 0, n[r], 0, 0, 0, 0, 0, 1);
        },
      },
      _s("roundProps", Hs),
      _s("modifiers"),
      _s("snap", dc)
    ) || Ci;
Le.version = Xe.version = tt.version = "3.12.5";
Ju = 1;
ko() && ar();
ie.Power0;
ie.Power1;
ie.Power2;
ie.Power3;
ie.Power4;
ie.Linear;
ie.Quad;
ie.Cubic;
ie.Quart;
ie.Quint;
ie.Strong;
ie.Elastic;
ie.Back;
ie.SteppedEase;
ie.Bounce;
ie.Sine;
ie.Expo;
ie.Circ;
/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var ra,
  sn,
  Qn,
  Bo,
  Cn,
  ia,
  jo,
  Mg = function () {
    return typeof window < "u";
  },
  Kt = {},
  wn = 180 / Math.PI,
  Jn = Math.PI / 180,
  jn = Math.atan2,
  sa = 1e8,
  Uo = /([A-Z])/g,
  Ag = /(left|right|width|margin|padding|x)/i,
  Lg = /[\s,\(]\S/,
  At = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity",
  },
  qs = function (e, n) {
    return n.set(n.t, n.p, Math.round((n.s + n.c * e) * 1e4) / 1e4 + n.u, n);
  },
  Ig = function (e, n) {
    return n.set(
      n.t,
      n.p,
      e === 1 ? n.e : Math.round((n.s + n.c * e) * 1e4) / 1e4 + n.u,
      n
    );
  },
  Dg = function (e, n) {
    return n.set(
      n.t,
      n.p,
      e ? Math.round((n.s + n.c * e) * 1e4) / 1e4 + n.u : n.b,
      n
    );
  },
  Fg = function (e, n) {
    var r = n.s + n.c * e;
    n.set(n.t, n.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + n.u, n);
  },
  Ic = function (e, n) {
    return n.set(n.t, n.p, e ? n.e : n.b, n);
  },
  Dc = function (e, n) {
    return n.set(n.t, n.p, e !== 1 ? n.b : n.e, n);
  },
  Ng = function (e, n, r) {
    return (e.style[n] = r);
  },
  $g = function (e, n, r) {
    return e.style.setProperty(n, r);
  },
  zg = function (e, n, r) {
    return (e._gsap[n] = r);
  },
  Bg = function (e, n, r) {
    return (e._gsap.scaleX = e._gsap.scaleY = r);
  },
  jg = function (e, n, r, i, s) {
    var o = e._gsap;
    (o.scaleX = o.scaleY = r), o.renderTransform(s, o);
  },
  Ug = function (e, n, r, i, s) {
    var o = e._gsap;
    (o[n] = r), o.renderTransform(s, o);
  },
  xe = "transform",
  Ze = xe + "Origin",
  Hg = function t(e, n) {
    var r = this,
      i = this.target,
      s = i.style,
      o = i._gsap;
    if (e in Kt && s) {
      if (((this.tfm = this.tfm || {}), e !== "transform"))
        (e = At[e] || e),
          ~e.indexOf(",")
            ? e.split(",").forEach(function (l) {
                return (r.tfm[l] = Ut(i, l));
              })
            : (this.tfm[e] = o.x ? o[e] : Ut(i, e)),
          e === Ze && (this.tfm.zOrigin = o.zOrigin);
      else
        return At.transform.split(",").forEach(function (l) {
          return t.call(r, l, n);
        });
      if (this.props.indexOf(xe) >= 0) return;
      o.svg &&
        ((this.svgo = i.getAttribute("data-svg-origin")),
        this.props.push(Ze, n, "")),
        (e = xe);
    }
    (s || n) && this.props.push(e, n, s[e]);
  },
  Fc = function (e) {
    e.translate &&
      (e.removeProperty("translate"),
      e.removeProperty("scale"),
      e.removeProperty("rotate"));
  },
  Vg = function () {
    var e = this.props,
      n = this.target,
      r = n.style,
      i = n._gsap,
      s,
      o;
    for (s = 0; s < e.length; s += 3)
      e[s + 1]
        ? (n[e[s]] = e[s + 2])
        : e[s + 2]
        ? (r[e[s]] = e[s + 2])
        : r.removeProperty(
            e[s].substr(0, 2) === "--"
              ? e[s]
              : e[s].replace(Uo, "-$1").toLowerCase()
          );
    if (this.tfm) {
      for (o in this.tfm) i[o] = this.tfm[o];
      i.svg &&
        (i.renderTransform(),
        n.setAttribute("data-svg-origin", this.svgo || "")),
        (s = jo()),
        (!s || !s.isStart) &&
          !r[xe] &&
          (Fc(r),
          i.zOrigin &&
            r[Ze] &&
            ((r[Ze] += " " + i.zOrigin + "px"),
            (i.zOrigin = 0),
            i.renderTransform()),
          (i.uncache = 1));
    }
  },
  Nc = function (e, n) {
    var r = { target: e, props: [], revert: Vg, save: Hg };
    return (
      e._gsap || tt.core.getCache(e),
      n &&
        n.split(",").forEach(function (i) {
          return r.save(i);
        }),
      r
    );
  },
  $c,
  Ks = function (e, n) {
    var r = sn.createElementNS
      ? sn.createElementNS(
          (n || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
          e
        )
      : sn.createElement(e);
    return r && r.style ? r : sn.createElement(e);
  },
  It = function t(e, n, r) {
    var i = getComputedStyle(e);
    return (
      i[n] ||
      i.getPropertyValue(n.replace(Uo, "-$1").toLowerCase()) ||
      i.getPropertyValue(n) ||
      (!r && t(e, ur(n) || n, 1)) ||
      ""
    );
  },
  oa = "O,Moz,ms,Ms,Webkit".split(","),
  ur = function (e, n, r) {
    var i = n || Cn,
      s = i.style,
      o = 5;
    if (e in s && !r) return e;
    for (
      e = e.charAt(0).toUpperCase() + e.substr(1);
      o-- && !(oa[o] + e in s);

    );
    return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? oa[o] : "") + e;
  },
  Xs = function () {
    Mg() &&
      window.document &&
      ((ra = window),
      (sn = ra.document),
      (Qn = sn.documentElement),
      (Cn = Ks("div") || { style: {} }),
      Ks("div"),
      (xe = ur(xe)),
      (Ze = xe + "Origin"),
      (Cn.style.cssText =
        "border-width:0;line-height:0;position:absolute;padding:0"),
      ($c = !!ur("perspective")),
      (jo = tt.core.reverting),
      (Bo = 1));
  },
  gs = function t(e) {
    var n = Ks(
        "svg",
        (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) ||
          "http://www.w3.org/2000/svg"
      ),
      r = this.parentNode,
      i = this.nextSibling,
      s = this.style.cssText,
      o;
    if (
      (Qn.appendChild(n),
      n.appendChild(this),
      (this.style.display = "block"),
      e)
    )
      try {
        (o = this.getBBox()),
          (this._gsapBBox = this.getBBox),
          (this.getBBox = t);
      } catch {}
    else this._gsapBBox && (o = this._gsapBBox());
    return (
      r && (i ? r.insertBefore(this, i) : r.appendChild(this)),
      Qn.removeChild(n),
      (this.style.cssText = s),
      o
    );
  },
  la = function (e, n) {
    for (var r = n.length; r--; )
      if (e.hasAttribute(n[r])) return e.getAttribute(n[r]);
  },
  zc = function (e) {
    var n;
    try {
      n = e.getBBox();
    } catch {
      n = gs.call(e, !0);
    }
    return (
      (n && (n.width || n.height)) || e.getBBox === gs || (n = gs.call(e, !0)),
      n && !n.width && !n.x && !n.y
        ? {
            x: +la(e, ["x", "cx", "x1"]) || 0,
            y: +la(e, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0,
          }
        : n
    );
  },
  Bc = function (e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && zc(e));
  },
  Fn = function (e, n) {
    if (n) {
      var r = e.style,
        i;
      n in Kt && n !== Ze && (n = xe),
        r.removeProperty
          ? ((i = n.substr(0, 2)),
            (i === "ms" || n.substr(0, 6) === "webkit") && (n = "-" + n),
            r.removeProperty(
              i === "--" ? n : n.replace(Uo, "-$1").toLowerCase()
            ))
          : r.removeAttribute(n);
    }
  },
  on = function (e, n, r, i, s, o) {
    var l = new Je(e._pt, n, r, 0, 1, o ? Dc : Ic);
    return (e._pt = l), (l.b = i), (l.e = s), e._props.push(r), l;
  },
  aa = { deg: 1, rad: 1, turn: 1 },
  Wg = { grid: 1, flex: 1 },
  dn = function t(e, n, r, i) {
    var s = parseFloat(r) || 0,
      o = (r + "").trim().substr((s + "").length) || "px",
      l = Cn.style,
      u = Ag.test(n),
      a = e.tagName.toLowerCase() === "svg",
      c = (a ? "client" : "offset") + (u ? "Width" : "Height"),
      f = 100,
      h = i === "px",
      p = i === "%",
      g,
      d,
      m,
      b;
    if (i === o || !s || aa[i] || aa[o]) return s;
    if (
      (o !== "px" && !h && (s = t(e, n, r, "px")),
      (b = e.getCTM && Bc(e)),
      (p || o === "%") && (Kt[n] || ~n.indexOf("adius")))
    )
      return (
        (g = b ? e.getBBox()[u ? "width" : "height"] : e[c]),
        ke(p ? (s / g) * f : (s / 100) * g)
      );
    if (
      ((l[u ? "width" : "height"] = f + (h ? o : i)),
      (d =
        ~n.indexOf("adius") || (i === "em" && e.appendChild && !a)
          ? e
          : e.parentNode),
      b && (d = (e.ownerSVGElement || {}).parentNode),
      (!d || d === sn || !d.appendChild) && (d = sn.body),
      (m = d._gsap),
      m && p && m.width && u && m.time === it.time && !m.uncache)
    )
      return ke((s / m.width) * f);
    if (p && (n === "height" || n === "width")) {
      var v = e.style[n];
      (e.style[n] = f + i), (g = e[c]), v ? (e.style[n] = v) : Fn(e, n);
    } else
      (p || o === "%") &&
        !Wg[It(d, "display")] &&
        (l.position = It(e, "position")),
        d === e && (l.position = "static"),
        d.appendChild(Cn),
        (g = Cn[c]),
        d.removeChild(Cn),
        (l.position = "absolute");
    return (
      u && p && ((m = On(d)), (m.time = it.time), (m.width = d[c])),
      ke(h ? (g * s) / f : g && s ? (f / g) * s : 0)
    );
  },
  Ut = function (e, n, r, i) {
    var s;
    return (
      Bo || Xs(),
      n in At &&
        n !== "transform" &&
        ((n = At[n]), ~n.indexOf(",") && (n = n.split(",")[0])),
      Kt[n] && n !== "transform"
        ? ((s = Yr(e, i)),
          (s =
            n !== "transformOrigin"
              ? s[n]
              : s.svg
              ? s.origin
              : Ri(It(e, Ze)) + " " + s.zOrigin + "px"))
        : ((s = e.style[n]),
          (!s || s === "auto" || i || ~(s + "").indexOf("calc(")) &&
            (s =
              (Pi[n] && Pi[n](e, n, r)) ||
              It(e, n) ||
              nc(e, n) ||
              (n === "opacity" ? 1 : 0))),
      r && !~(s + "").trim().indexOf(" ") ? dn(e, n, s, r) + r : s
    );
  },
  qg = function (e, n, r, i) {
    if (!r || r === "none") {
      var s = ur(n, e, 1),
        o = s && It(e, s, 1);
      o && o !== r
        ? ((n = s), (r = o))
        : n === "borderColor" && (r = It(e, "borderTopColor"));
    }
    var l = new Je(this._pt, e.style, n, 0, 1, Mc),
      u = 0,
      a = 0,
      c,
      f,
      h,
      p,
      g,
      d,
      m,
      b,
      v,
      w,
      x,
      T;
    if (
      ((l.b = r),
      (l.e = i),
      (r += ""),
      (i += ""),
      i === "auto" &&
        ((d = e.style[n]),
        (e.style[n] = i),
        (i = It(e, n) || i),
        d ? (e.style[n] = d) : Fn(e, n)),
      (c = [r, i]),
      wc(c),
      (r = c[0]),
      (i = c[1]),
      (h = r.match(Hn) || []),
      (T = i.match(Hn) || []),
      T.length)
    ) {
      for (; (f = Hn.exec(i)); )
        (m = f[0]),
          (v = i.substring(u, f.index)),
          g
            ? (g = (g + 1) % 5)
            : (v.substr(-5) === "rgba(" || v.substr(-5) === "hsla(") && (g = 1),
          m !== (d = h[a++] || "") &&
            ((p = parseFloat(d) || 0),
            (x = d.substr((p + "").length)),
            m.charAt(1) === "=" && (m = Gn(p, m) + x),
            (b = parseFloat(m)),
            (w = m.substr((b + "").length)),
            (u = Hn.lastIndex - w.length),
            w ||
              ((w = w || ot.units[n] || x),
              u === i.length && ((i += w), (l.e += w))),
            x !== w && (p = dn(e, n, d, w) || 0),
            (l._pt = {
              _next: l._pt,
              p: v || a === 1 ? v : ",",
              s: p,
              c: b - p,
              m: (g && g < 4) || n === "zIndex" ? Math.round : 0,
            }));
      l.c = u < i.length ? i.substring(u, i.length) : "";
    } else l.r = n === "display" && i === "none" ? Dc : Ic;
    return Gu.test(i) && (l.e = 0), (this._pt = l), l;
  },
  ua = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
  Kg = function (e) {
    var n = e.split(" "),
      r = n[0],
      i = n[1] || "50%";
    return (
      (r === "top" || r === "bottom" || i === "left" || i === "right") &&
        ((e = r), (r = i), (i = e)),
      (n[0] = ua[r] || r),
      (n[1] = ua[i] || i),
      n.join(" ")
    );
  },
  Xg = function (e, n) {
    if (n.tween && n.tween._time === n.tween._dur) {
      var r = n.t,
        i = r.style,
        s = n.u,
        o = r._gsap,
        l,
        u,
        a;
      if (s === "all" || s === !0) (i.cssText = ""), (u = 1);
      else
        for (s = s.split(","), a = s.length; --a > -1; )
          (l = s[a]),
            Kt[l] && ((u = 1), (l = l === "transformOrigin" ? Ze : xe)),
            Fn(r, l);
      u &&
        (Fn(r, xe),
        o &&
          (o.svg && r.removeAttribute("transform"),
          Yr(r, 1),
          (o.uncache = 1),
          Fc(i)));
    }
  },
  Pi = {
    clearProps: function (e, n, r, i, s) {
      if (s.data !== "isFromStart") {
        var o = (e._pt = new Je(e._pt, n, r, 0, 0, Xg));
        return (o.u = i), (o.pr = -10), (o.tween = s), e._props.push(r), 1;
      }
    },
  },
  Xr = [1, 0, 0, 1, 0, 0],
  jc = {},
  Uc = function (e) {
    return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
  },
  ca = function (e) {
    var n = It(e, xe);
    return Uc(n) ? Xr : n.substr(7).match(Yu).map(ke);
  },
  Ho = function (e, n) {
    var r = e._gsap || On(e),
      i = e.style,
      s = ca(e),
      o,
      l,
      u,
      a;
    return r.svg && e.getAttribute("transform")
      ? ((u = e.transform.baseVal.consolidate().matrix),
        (s = [u.a, u.b, u.c, u.d, u.e, u.f]),
        s.join(",") === "1,0,0,1,0,0" ? Xr : s)
      : (s === Xr &&
          !e.offsetParent &&
          e !== Qn &&
          !r.svg &&
          ((u = i.display),
          (i.display = "block"),
          (o = e.parentNode),
          (!o || !e.offsetParent) &&
            ((a = 1), (l = e.nextElementSibling), Qn.appendChild(e)),
          (s = ca(e)),
          u ? (i.display = u) : Fn(e, "display"),
          a &&
            (l
              ? o.insertBefore(e, l)
              : o
              ? o.appendChild(e)
              : Qn.removeChild(e))),
        n && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
  },
  Ys = function (e, n, r, i, s, o) {
    var l = e._gsap,
      u = s || Ho(e, !0),
      a = l.xOrigin || 0,
      c = l.yOrigin || 0,
      f = l.xOffset || 0,
      h = l.yOffset || 0,
      p = u[0],
      g = u[1],
      d = u[2],
      m = u[3],
      b = u[4],
      v = u[5],
      w = n.split(" "),
      x = parseFloat(w[0]) || 0,
      T = parseFloat(w[1]) || 0,
      k,
      A,
      P,
      R;
    r
      ? u !== Xr &&
        (A = p * m - g * d) &&
        ((P = x * (m / A) + T * (-d / A) + (d * v - m * b) / A),
        (R = x * (-g / A) + T * (p / A) - (p * v - g * b) / A),
        (x = P),
        (T = R))
      : ((k = zc(e)),
        (x = k.x + (~w[0].indexOf("%") ? (x / 100) * k.width : x)),
        (T = k.y + (~(w[1] || w[0]).indexOf("%") ? (T / 100) * k.height : T))),
      i || (i !== !1 && l.smooth)
        ? ((b = x - a),
          (v = T - c),
          (l.xOffset = f + (b * p + v * d) - b),
          (l.yOffset = h + (b * g + v * m) - v))
        : (l.xOffset = l.yOffset = 0),
      (l.xOrigin = x),
      (l.yOrigin = T),
      (l.smooth = !!i),
      (l.origin = n),
      (l.originIsAbsolute = !!r),
      (e.style[Ze] = "0px 0px"),
      o &&
        (on(o, l, "xOrigin", a, x),
        on(o, l, "yOrigin", c, T),
        on(o, l, "xOffset", f, l.xOffset),
        on(o, l, "yOffset", h, l.yOffset)),
      e.setAttribute("data-svg-origin", x + " " + T);
  },
  Yr = function (e, n) {
    var r = e._gsap || new Cc(e);
    if ("x" in r && !n && !r.uncache) return r;
    var i = e.style,
      s = r.scaleX < 0,
      o = "px",
      l = "deg",
      u = getComputedStyle(e),
      a = It(e, Ze) || "0",
      c,
      f,
      h,
      p,
      g,
      d,
      m,
      b,
      v,
      w,
      x,
      T,
      k,
      A,
      P,
      R,
      U,
      O,
      E,
      I,
      D,
      j,
      z,
      q,
      X,
      Ee,
      _e,
      Ie,
      Te,
      Nt,
      at,
      M;
    return (
      (c = f = h = d = m = b = v = w = x = 0),
      (p = g = 1),
      (r.svg = !!(e.getCTM && Bc(e))),
      u.translate &&
        ((u.translate !== "none" ||
          u.scale !== "none" ||
          u.rotate !== "none") &&
          (i[xe] =
            (u.translate !== "none"
              ? "translate3d(" +
                (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                ") "
              : "") +
            (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") +
            (u.scale !== "none"
              ? "scale(" + u.scale.split(" ").join(",") + ") "
              : "") +
            (u[xe] !== "none" ? u[xe] : "")),
        (i.scale = i.rotate = i.translate = "none")),
      (A = Ho(e, r.svg)),
      r.svg &&
        (r.uncache
          ? ((X = e.getBBox()),
            (a = r.xOrigin - X.x + "px " + (r.yOrigin - X.y) + "px"),
            (q = ""))
          : (q = !n && e.getAttribute("data-svg-origin")),
        Ys(e, q || a, !!q || r.originIsAbsolute, r.smooth !== !1, A)),
      (T = r.xOrigin || 0),
      (k = r.yOrigin || 0),
      A !== Xr &&
        ((O = A[0]),
        (E = A[1]),
        (I = A[2]),
        (D = A[3]),
        (c = j = A[4]),
        (f = z = A[5]),
        A.length === 6
          ? ((p = Math.sqrt(O * O + E * E)),
            (g = Math.sqrt(D * D + I * I)),
            (d = O || E ? jn(E, O) * wn : 0),
            (v = I || D ? jn(I, D) * wn + d : 0),
            v && (g *= Math.abs(Math.cos(v * Jn))),
            r.svg && ((c -= T - (T * O + k * I)), (f -= k - (T * E + k * D))))
          : ((M = A[6]),
            (Nt = A[7]),
            (_e = A[8]),
            (Ie = A[9]),
            (Te = A[10]),
            (at = A[11]),
            (c = A[12]),
            (f = A[13]),
            (h = A[14]),
            (P = jn(M, Te)),
            (m = P * wn),
            P &&
              ((R = Math.cos(-P)),
              (U = Math.sin(-P)),
              (q = j * R + _e * U),
              (X = z * R + Ie * U),
              (Ee = M * R + Te * U),
              (_e = j * -U + _e * R),
              (Ie = z * -U + Ie * R),
              (Te = M * -U + Te * R),
              (at = Nt * -U + at * R),
              (j = q),
              (z = X),
              (M = Ee)),
            (P = jn(-I, Te)),
            (b = P * wn),
            P &&
              ((R = Math.cos(-P)),
              (U = Math.sin(-P)),
              (q = O * R - _e * U),
              (X = E * R - Ie * U),
              (Ee = I * R - Te * U),
              (at = D * U + at * R),
              (O = q),
              (E = X),
              (I = Ee)),
            (P = jn(E, O)),
            (d = P * wn),
            P &&
              ((R = Math.cos(P)),
              (U = Math.sin(P)),
              (q = O * R + E * U),
              (X = j * R + z * U),
              (E = E * R - O * U),
              (z = z * R - j * U),
              (O = q),
              (j = X)),
            m &&
              Math.abs(m) + Math.abs(d) > 359.9 &&
              ((m = d = 0), (b = 180 - b)),
            (p = ke(Math.sqrt(O * O + E * E + I * I))),
            (g = ke(Math.sqrt(z * z + M * M))),
            (P = jn(j, z)),
            (v = Math.abs(P) > 2e-4 ? P * wn : 0),
            (x = at ? 1 / (at < 0 ? -at : at) : 0)),
        r.svg &&
          ((q = e.getAttribute("transform")),
          (r.forceCSS = e.setAttribute("transform", "") || !Uc(It(e, xe))),
          q && e.setAttribute("transform", q))),
      Math.abs(v) > 90 &&
        Math.abs(v) < 270 &&
        (s
          ? ((p *= -1), (v += d <= 0 ? 180 : -180), (d += d <= 0 ? 180 : -180))
          : ((g *= -1), (v += v <= 0 ? 180 : -180))),
      (n = n || r.uncache),
      (r.x =
        c -
        ((r.xPercent =
          c &&
          ((!n && r.xPercent) ||
            (Math.round(e.offsetWidth / 2) === Math.round(-c) ? -50 : 0)))
          ? (e.offsetWidth * r.xPercent) / 100
          : 0) +
        o),
      (r.y =
        f -
        ((r.yPercent =
          f &&
          ((!n && r.yPercent) ||
            (Math.round(e.offsetHeight / 2) === Math.round(-f) ? -50 : 0)))
          ? (e.offsetHeight * r.yPercent) / 100
          : 0) +
        o),
      (r.z = h + o),
      (r.scaleX = ke(p)),
      (r.scaleY = ke(g)),
      (r.rotation = ke(d) + l),
      (r.rotationX = ke(m) + l),
      (r.rotationY = ke(b) + l),
      (r.skewX = v + l),
      (r.skewY = w + l),
      (r.transformPerspective = x + o),
      (r.zOrigin = parseFloat(a.split(" ")[2]) || (!n && r.zOrigin) || 0) &&
        (i[Ze] = Ri(a)),
      (r.xOffset = r.yOffset = 0),
      (r.force3D = ot.force3D),
      (r.renderTransform = r.svg ? Gg : $c ? Hc : Yg),
      (r.uncache = 0),
      r
    );
  },
  Ri = function (e) {
    return (e = e.split(" "))[0] + " " + e[1];
  },
  ms = function (e, n, r) {
    var i = He(n);
    return ke(parseFloat(n) + parseFloat(dn(e, "x", r + "px", i))) + i;
  },
  Yg = function (e, n) {
    (n.z = "0px"),
      (n.rotationY = n.rotationX = "0deg"),
      (n.force3D = 0),
      Hc(e, n);
  },
  vn = "0deg",
  mr = "0px",
  yn = ") ",
  Hc = function (e, n) {
    var r = n || this,
      i = r.xPercent,
      s = r.yPercent,
      o = r.x,
      l = r.y,
      u = r.z,
      a = r.rotation,
      c = r.rotationY,
      f = r.rotationX,
      h = r.skewX,
      p = r.skewY,
      g = r.scaleX,
      d = r.scaleY,
      m = r.transformPerspective,
      b = r.force3D,
      v = r.target,
      w = r.zOrigin,
      x = "",
      T = (b === "auto" && e && e !== 1) || b === !0;
    if (w && (f !== vn || c !== vn)) {
      var k = parseFloat(c) * Jn,
        A = Math.sin(k),
        P = Math.cos(k),
        R;
      (k = parseFloat(f) * Jn),
        (R = Math.cos(k)),
        (o = ms(v, o, A * R * -w)),
        (l = ms(v, l, -Math.sin(k) * -w)),
        (u = ms(v, u, P * R * -w + w));
    }
    m !== mr && (x += "perspective(" + m + yn),
      (i || s) && (x += "translate(" + i + "%, " + s + "%) "),
      (T || o !== mr || l !== mr || u !== mr) &&
        (x +=
          u !== mr || T
            ? "translate3d(" + o + ", " + l + ", " + u + ") "
            : "translate(" + o + ", " + l + yn),
      a !== vn && (x += "rotate(" + a + yn),
      c !== vn && (x += "rotateY(" + c + yn),
      f !== vn && (x += "rotateX(" + f + yn),
      (h !== vn || p !== vn) && (x += "skew(" + h + ", " + p + yn),
      (g !== 1 || d !== 1) && (x += "scale(" + g + ", " + d + yn),
      (v.style[xe] = x || "translate(0, 0)");
  },
  Gg = function (e, n) {
    var r = n || this,
      i = r.xPercent,
      s = r.yPercent,
      o = r.x,
      l = r.y,
      u = r.rotation,
      a = r.skewX,
      c = r.skewY,
      f = r.scaleX,
      h = r.scaleY,
      p = r.target,
      g = r.xOrigin,
      d = r.yOrigin,
      m = r.xOffset,
      b = r.yOffset,
      v = r.forceCSS,
      w = parseFloat(o),
      x = parseFloat(l),
      T,
      k,
      A,
      P,
      R;
    (u = parseFloat(u)),
      (a = parseFloat(a)),
      (c = parseFloat(c)),
      c && ((c = parseFloat(c)), (a += c), (u += c)),
      u || a
        ? ((u *= Jn),
          (a *= Jn),
          (T = Math.cos(u) * f),
          (k = Math.sin(u) * f),
          (A = Math.sin(u - a) * -h),
          (P = Math.cos(u - a) * h),
          a &&
            ((c *= Jn),
            (R = Math.tan(a - c)),
            (R = Math.sqrt(1 + R * R)),
            (A *= R),
            (P *= R),
            c &&
              ((R = Math.tan(c)),
              (R = Math.sqrt(1 + R * R)),
              (T *= R),
              (k *= R))),
          (T = ke(T)),
          (k = ke(k)),
          (A = ke(A)),
          (P = ke(P)))
        : ((T = f), (P = h), (k = A = 0)),
      ((w && !~(o + "").indexOf("px")) || (x && !~(l + "").indexOf("px"))) &&
        ((w = dn(p, "x", o, "px")), (x = dn(p, "y", l, "px"))),
      (g || d || m || b) &&
        ((w = ke(w + g - (g * T + d * A) + m)),
        (x = ke(x + d - (g * k + d * P) + b))),
      (i || s) &&
        ((R = p.getBBox()),
        (w = ke(w + (i / 100) * R.width)),
        (x = ke(x + (s / 100) * R.height))),
      (R =
        "matrix(" + T + "," + k + "," + A + "," + P + "," + w + "," + x + ")"),
      p.setAttribute("transform", R),
      v && (p.style[xe] = R);
  },
  Qg = function (e, n, r, i, s) {
    var o = 360,
      l = Ne(s),
      u = parseFloat(s) * (l && ~s.indexOf("rad") ? wn : 1),
      a = u - i,
      c = i + a + "deg",
      f,
      h;
    return (
      l &&
        ((f = s.split("_")[1]),
        f === "short" && ((a %= o), a !== a % (o / 2) && (a += a < 0 ? o : -o)),
        f === "cw" && a < 0
          ? (a = ((a + o * sa) % o) - ~~(a / o) * o)
          : f === "ccw" && a > 0 && (a = ((a - o * sa) % o) - ~~(a / o) * o)),
      (e._pt = h = new Je(e._pt, n, r, i, a, Ig)),
      (h.e = c),
      (h.u = "deg"),
      e._props.push(r),
      h
    );
  },
  fa = function (e, n) {
    for (var r in n) e[r] = n[r];
    return e;
  },
  Jg = function (e, n, r) {
    var i = fa({}, r._gsap),
      s = "perspective,force3D,transformOrigin,svgOrigin",
      o = r.style,
      l,
      u,
      a,
      c,
      f,
      h,
      p,
      g;
    i.svg
      ? ((a = r.getAttribute("transform")),
        r.setAttribute("transform", ""),
        (o[xe] = n),
        (l = Yr(r, 1)),
        Fn(r, xe),
        r.setAttribute("transform", a))
      : ((a = getComputedStyle(r)[xe]),
        (o[xe] = n),
        (l = Yr(r, 1)),
        (o[xe] = a));
    for (u in Kt)
      (a = i[u]),
        (c = l[u]),
        a !== c &&
          s.indexOf(u) < 0 &&
          ((p = He(a)),
          (g = He(c)),
          (f = p !== g ? dn(r, u, a, g) : parseFloat(a)),
          (h = parseFloat(c)),
          (e._pt = new Je(e._pt, l, u, f, h - f, qs)),
          (e._pt.u = g || 0),
          e._props.push(u));
    fa(l, i);
  };
Qe("padding,margin,Width,Radius", function (t, e) {
  var n = "Top",
    r = "Right",
    i = "Bottom",
    s = "Left",
    o = (e < 3 ? [n, r, i, s] : [n + s, n + r, i + r, i + s]).map(function (l) {
      return e < 2 ? t + l : "border" + l + t;
    });
  Pi[e > 1 ? "border" + t : t] = function (l, u, a, c, f) {
    var h, p;
    if (arguments.length < 4)
      return (
        (h = o.map(function (g) {
          return Ut(l, g, a);
        })),
        (p = h.join(" ")),
        p.split(h[0]).length === 5 ? h[0] : p
      );
    (h = (c + "").split(" ")),
      (p = {}),
      o.forEach(function (g, d) {
        return (p[g] = h[d] = h[d] || h[((d - 1) / 2) | 0]);
      }),
      l.init(u, p, f);
  };
});
var Vc = {
  name: "css",
  register: Xs,
  targetTest: function (e) {
    return e.style && e.nodeType;
  },
  init: function (e, n, r, i, s) {
    var o = this._props,
      l = e.style,
      u = r.vars.startAt,
      a,
      c,
      f,
      h,
      p,
      g,
      d,
      m,
      b,
      v,
      w,
      x,
      T,
      k,
      A,
      P;
    Bo || Xs(),
      (this.styles = this.styles || Nc(e)),
      (P = this.styles.props),
      (this.tween = r);
    for (d in n)
      if (d !== "autoRound" && ((c = n[d]), !(rt[d] && Pc(d, n, r, i, e, s)))) {
        if (
          ((p = typeof c),
          (g = Pi[d]),
          p === "function" && ((c = c.call(r, i, e, s)), (p = typeof c)),
          p === "string" && ~c.indexOf("random(") && (c = Wr(c)),
          g)
        )
          g(this, e, d, c, r) && (A = 1);
        else if (d.substr(0, 2) === "--")
          (a = (getComputedStyle(e).getPropertyValue(d) + "").trim()),
            (c += ""),
            (cn.lastIndex = 0),
            cn.test(a) || ((m = He(a)), (b = He(c))),
            b ? m !== b && (a = dn(e, d, a, b) + b) : m && (c += m),
            this.add(l, "setProperty", a, c, i, s, 0, 0, d),
            o.push(d),
            P.push(d, 0, l[d]);
        else if (p !== "undefined") {
          if (
            (u && d in u
              ? ((a = typeof u[d] == "function" ? u[d].call(r, i, e, s) : u[d]),
                Ne(a) && ~a.indexOf("random(") && (a = Wr(a)),
                He(a + "") ||
                  a === "auto" ||
                  (a += ot.units[d] || He(Ut(e, d)) || ""),
                (a + "").charAt(1) === "=" && (a = Ut(e, d)))
              : (a = Ut(e, d)),
            (h = parseFloat(a)),
            (v = p === "string" && c.charAt(1) === "=" && c.substr(0, 2)),
            v && (c = c.substr(2)),
            (f = parseFloat(c)),
            d in At &&
              (d === "autoAlpha" &&
                (h === 1 && Ut(e, "visibility") === "hidden" && f && (h = 0),
                P.push("visibility", 0, l.visibility),
                on(
                  this,
                  l,
                  "visibility",
                  h ? "inherit" : "hidden",
                  f ? "inherit" : "hidden",
                  !f
                )),
              d !== "scale" &&
                d !== "transform" &&
                ((d = At[d]), ~d.indexOf(",") && (d = d.split(",")[0]))),
            (w = d in Kt),
            w)
          ) {
            if (
              (this.styles.save(d),
              x ||
                ((T = e._gsap),
                (T.renderTransform && !n.parseTransform) ||
                  Yr(e, n.parseTransform),
                (k = n.smoothOrigin !== !1 && T.smooth),
                (x = this._pt =
                  new Je(this._pt, l, xe, 0, 1, T.renderTransform, T, 0, -1)),
                (x.dep = 1)),
              d === "scale")
            )
              (this._pt = new Je(
                this._pt,
                T,
                "scaleY",
                T.scaleY,
                (v ? Gn(T.scaleY, v + f) : f) - T.scaleY || 0,
                qs
              )),
                (this._pt.u = 0),
                o.push("scaleY", d),
                (d += "X");
            else if (d === "transformOrigin") {
              P.push(Ze, 0, l[Ze]),
                (c = Kg(c)),
                T.svg
                  ? Ys(e, c, 0, k, 0, this)
                  : ((b = parseFloat(c.split(" ")[2]) || 0),
                    b !== T.zOrigin && on(this, T, "zOrigin", T.zOrigin, b),
                    on(this, l, d, Ri(a), Ri(c)));
              continue;
            } else if (d === "svgOrigin") {
              Ys(e, c, 1, k, 0, this);
              continue;
            } else if (d in jc) {
              Qg(this, T, d, h, v ? Gn(h, v + c) : c);
              continue;
            } else if (d === "smoothOrigin") {
              on(this, T, "smooth", T.smooth, c);
              continue;
            } else if (d === "force3D") {
              T[d] = c;
              continue;
            } else if (d === "transform") {
              Jg(this, c, e);
              continue;
            }
          } else d in l || (d = ur(d) || d);
          if (w || ((f || f === 0) && (h || h === 0) && !Lg.test(c) && d in l))
            (m = (a + "").substr((h + "").length)),
              f || (f = 0),
              (b = He(c) || (d in ot.units ? ot.units[d] : m)),
              m !== b && (h = dn(e, d, a, b)),
              (this._pt = new Je(
                this._pt,
                w ? T : l,
                d,
                h,
                (v ? Gn(h, v + f) : f) - h,
                !w && (b === "px" || d === "zIndex") && n.autoRound !== !1
                  ? Fg
                  : qs
              )),
              (this._pt.u = b || 0),
              m !== b && b !== "%" && ((this._pt.b = a), (this._pt.r = Dg));
          else if (d in l) qg.call(this, e, d, a, v ? v + c : c);
          else if (d in e) this.add(e, d, a || e[d], v ? v + c : c, i, s);
          else if (d !== "parseTransform") {
            Mo(d, c);
            continue;
          }
          w || (d in l ? P.push(d, 0, l[d]) : P.push(d, 1, a || e[d])),
            o.push(d);
        }
      }
    A && Ac(this);
  },
  render: function (e, n) {
    if (n.tween._time || !jo())
      for (var r = n._pt; r; ) r.r(e, r.d), (r = r._next);
    else n.styles.revert();
  },
  get: Ut,
  aliases: At,
  getSetter: function (e, n, r) {
    var i = At[n];
    return (
      i && i.indexOf(",") < 0 && (n = i),
      n in Kt && n !== Ze && (e._gsap.x || Ut(e, "x"))
        ? r && ia === r
          ? n === "scale"
            ? Bg
            : zg
          : (ia = r || {}) && (n === "scale" ? jg : Ug)
        : e.style && !So(e.style[n])
        ? Ng
        : ~n.indexOf("-")
        ? $g
        : $o(e, n)
    );
  },
  core: { _removeProperty: Fn, _getMatrix: Ho },
};
tt.utils.checkPrefix = ur;
tt.core.getStyleSaver = Nc;
(function (t, e, n, r) {
  var i = Qe(t + "," + e + "," + n, function (s) {
    Kt[s] = 1;
  });
  Qe(e, function (s) {
    (ot.units[s] = "deg"), (jc[s] = 1);
  }),
    (At[i[13]] = t + "," + e),
    Qe(r, function (s) {
      var o = s.split(":");
      At[o[1]] = i[o[0]];
    });
})(
  "x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
  "rotation,rotationX,rotationY,skewX,skewY",
  "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
  "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"
);
Qe(
  "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
  function (t) {
    ot.units[t] = "px";
  }
);
tt.registerPlugin(Vc);
var Pn = tt.registerPlugin(Vc) || tt;
Pn.core.Tween;
const Zg = {
  __name: "SideNavigation",
  props: { parent: String, mode: String },
  setup(t) {
    const e = t,
      n = jr(),
      r = Ce("Gustav Körnig");
    function i() {
      window.innerWidth / window.innerHeight > 2
        ? (console.log("abkürzungen!!"), (r.value = "GK"))
        : (r.value = "Gustav Körnig");
    }
    tr(() => {
      i(), window.addEventListener("resize", i);
    }),
      $i(() => {
        window.removeEventListener("resize", i);
      }),
      eu(() => {
        c();
      }),
      tr(() => {
        c();
      });
    const s = In(),
      o = Ce(null),
      l = Wi(e.parent),
      u = jr()
        .fullPath.split("/")
        .filter((f) => f),
      a = Ye(() => {
        var f, h;
        return l.title === "Arbeiten"
          ? {
              "--hoverbackground":
                (f = s == null ? void 0 : s.works) == null ? void 0 : f.color,
            }
          : l.title === "Information"
          ? {
              "--hoverbackground":
                (h = s == null ? void 0 : s.information) == null
                  ? void 0
                  : h.color,
            }
          : {};
      }),
      c = () => {
        const f = n.path,
          h = Vi.previousRoute.path,
          p = f.split("/")[1],
          g = h.split("/")[1];
        p != g &&
          (Pn.set(o.value, { y: -window.innerHeight }),
          Pn.to(o.value, { y: 0, ease: "bounce.out", duration: 1.5 }));
      };
    return (f, h) => {
      var g, d;
      const p = mi("router-link");
      return (
        fe(),
        Oe(
          "nav",
          {
            ref_key: "bouncyElement",
            ref: o,
            class: Ke(["side-navigation", [t.mode]]),
          },
          [
            me(
              p,
              { to: "/", style: pt(oe(a)), class: "home-link" },
              { default: wt(() => [Mt(Lt(r.value), 1)]), _: 1 },
              8,
              ["style"]
            ),
            oe(u)[0] != "information"
              ? (fe(),
                Sn(
                  p,
                  {
                    key: 0,
                    to: "/information",
                    style: pt({
                      "--hoverbackground":
                        (g = oe(s)) == null ? void 0 : g.information.color,
                    }),
                    class: "segment-link",
                  },
                  { default: wt(() => [Mt("Information")]), _: 1 },
                  8,
                  ["style"]
                ))
              : Rs("", !0),
            oe(u)[0] != "arbeiten"
              ? (fe(),
                Sn(
                  p,
                  {
                    key: 1,
                    to: "/arbeiten",
                    style: pt({
                      "--hoverbackground":
                        (d = oe(s)) == null ? void 0 : d.works.color,
                    }),
                    class: "segment-link",
                  },
                  { default: wt(() => [Mt("Arbeiten")]), _: 1 },
                  8,
                  ["style"]
                ))
              : Rs("", !0),
            (fe(!0),
            Oe(
              Pe,
              null,
              Fr(
                oe(l).children,
                (m) => (
                  fe(),
                  Sn(
                    p,
                    {
                      key: m.slug,
                      to: "/" + m.uri,
                      class: Ke([m.slug, "single-child-link"]),
                    },
                    { default: wt(() => [Mt(Lt(m.title), 1)]), _: 2 },
                    1032,
                    ["to", "class"]
                  )
                )
              ),
              128
            )),
          ],
          2
        )
      );
    };
  },
};
const em = { class: "info-section" },
  tm = ["innerHTML"],
  nm = {
    __name: "InfoChild",
    props: {
      pagedata: Object,
      childIndex: Number,
      slug: String,
      isOpen: Boolean,
    },
    setup(t) {
      const e = t;
      return (n, r) => (
        fe(),
        Oe(
          Pe,
          null,
          [
            ee(
              "h1",
              { class: Ke([e.slug, t.isOpen ? "open" : ""]) },
              Lt(t.pagedata.title),
              3
            ),
            ee("div", em, [
              (fe(!0),
              Oe(
                Pe,
                null,
                Fr(
                  t.pagedata.blocks,
                  (i) => (
                    fe(),
                    Oe(
                      "div",
                      { key: i.id, class: "single-info", innerHTML: i },
                      null,
                      8,
                      tm
                    )
                  )
                ),
                128
              )),
            ]),
          ],
          64
        )
      );
    },
  },
  rm = Nn(nm, [["__scopeId", "data-v-c6d4cec4"]]);
const im = (t) => (qa("data-v-e852deb7"), (t = t()), Ka(), t),
  sm = { class: "information-content-wrapper" },
  om = ["onMousedown", "onClick"],
  lm = { class: "mobile-only-top-navigation" },
  am = im(() => ee("div", { class: "current-route" }, "Information", -1)),
  um = { class: "mode-selector" },
  cm = { class: "bottom-navi" },
  fm = {
    __name: "Infohub",
    setup(t) {
      const e = jr(),
        n = In(),
        r = Eo(),
        i = Wi("/information"),
        s = Ce("dark"),
        o = Ce([]),
        l = {},
        u = {},
        a = Ce(null),
        c = Ce(!0),
        f = Ce(null);
      Ht(s, () => {
        console.log("mode changed"),
          s.value == "dark"
            ? (console.log("dark"), document.body.classList.remove("dark-body"))
            : document.body.classList.add("dark-body");
      }),
        Ht(
          () => e.fullPath,
          (m, b) => {
            const v = m.split("/").filter((w) => w);
            v.length > 1 && v[0] == "information" && g(l[v[1]]);
          }
        ),
        Ht(
          () => {
            var m;
            return (m = i.children) == null ? void 0 : m.slice().reverse();
          },
          (m) => {
            if (m && Array.isArray(m)) {
              (o.value = m.map((v, w) => ({
                top: (window.innerHeight - (window.innerWidth / 100) * 2) / 2,
                left: (window.innerWidth * 0.98) / 2,
                zindex: 1,
                flex: "8rem 0 0",
                order: w,
              }))),
                m.forEach((v, w) => {
                  (l[v.slug] = w), (u[w] = v.slug);
                });
              const b = e.fullPath.split("/").filter((v) => v);
              b.length > 1 && g(l[b[1]]);
            }
          }
        );
      function h(m) {
        const b = e.fullPath.split("/").filter(Boolean);
        b[0] === "information" &&
          (b.length > 1 ? (b[1] = m) : b.push(m), r.replace("/" + b.join("/")));
      }
      const p = () => {
        let m = !1;
        return (
          (function (b) {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
              b
            ) ||
              /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                b.substr(0, 4)
              )) &&
              (m = !0);
          })(navigator.userAgent || navigator.vendor || window.opera),
          m
        );
      };
      function g(m) {
        if (p())
          (f.value = m),
            (c.value = !1),
            o.value.forEach((b) => {
              b.flex = "0 0 8rem";
            }),
            (o.value[m].flex = "1 0 0");
        else {
          const b = [...o.value].sort((v, w) => v.zindex - w.zindex);
          b.forEach((v, w) => {
            v.zindex = w + 1;
          }),
            (o.value[m].zindex = b.length + 1);
        }
        h(u[m]);
      }
      function d(m, b) {
        a.value = b;
        const v = o.value[b],
          w = m.clientX,
          x = m.clientY,
          T = v.left,
          k = v.top;
        function A(R) {
          const U = R.clientX - w,
            O = R.clientY - x;
          (o.value[b].left = T + U), (o.value[b].top = k + O), g(b);
        }
        function P() {
          window.removeEventListener("mousemove", A),
            window.removeEventListener("mouseup", P),
            (a.value = null);
        }
        window.addEventListener("mousemove", A),
          window.addEventListener("mouseup", P);
      }
      return (m, b) => {
        var x;
        const v = mi("RouterLink"),
          w = mi("router-link");
        return (
          fe(),
          Oe(
            "div",
            { class: Ke(["page-wrapper", s.value]) },
            [
              me(
                Zg,
                { parent: "/information", mode: s.value, class: "side-navi" },
                null,
                8,
                ["mode"]
              ),
              ee("div", sm, [
                me(
                  v,
                  {
                    class: "mobile-only-work-link",
                    style: pt("--backroundworks:" + oe(n).works.color + ";"),
                    to: "/arbeiten",
                  },
                  { default: wt(() => [Mt("Arbeiten")]), _: 1 },
                  8,
                  ["style"]
                ),
                ee(
                  "div",
                  { class: Ke(["spacer", { flexone: c.value }]) },
                  null,
                  2
                ),
                (fe(!0),
                Oe(
                  Pe,
                  null,
                  Fr(
                    (x = oe(i).children) == null ? void 0 : x.slice().reverse(),
                    (T, k) => (
                      fe(),
                      Oe(
                        "div",
                        {
                          key: k,
                          class: Ke([
                            "child",
                            [T.slug, f.value == k ? "open" : ""],
                          ]),
                          style: pt({
                            top: o.value[k].top + "px",
                            left: o.value[k].left + "px",
                            "z-index": o.value[k].zindex,
                            flex: o.value[k].flex,
                          }),
                          onMousedown: (A) => d(A, k),
                          onClick: (A) => g(k),
                        },
                        [
                          me(
                            rm,
                            {
                              pagedata: T,
                              "child-index": k,
                              slug: T.slug,
                              "is-open": f.value == k,
                            },
                            null,
                            8,
                            ["pagedata", "child-index", "slug", "is-open"]
                          ),
                        ],
                        46,
                        om
                      )
                    )
                  ),
                  128
                )),
                ee("div", lm, [
                  ee("h1", null, [
                    me(
                      v,
                      { to: "/" },
                      { default: wt(() => [Mt(Lt(oe(n).title), 1)]), _: 1 }
                    ),
                  ]),
                  am,
                ]),
              ]),
              ee("div", um, [
                ee(
                  "button",
                  {
                    class: Ke({ active: s.value == "dark" }),
                    onClick: b[0] || (b[0] = (T) => (s.value = "dark")),
                  },
                  " 1 ",
                  2
                ),
                ee(
                  "button",
                  {
                    class: Ke({ active: s.value == "light" }),
                    onClick: b[1] || (b[1] = (T) => (s.value = "light")),
                  },
                  " 2 ",
                  2
                ),
              ]),
              ee("div", cm, [
                me(
                  w,
                  { to: "/information/impressum" },
                  { default: wt(() => [Mt("Impressum")]), _: 1 }
                ),
                me(
                  w,
                  { to: "/information/privatsphare" },
                  { default: wt(() => [Mt("Privatsphäre")]), _: 1 }
                ),
              ]),
            ],
            2
          )
        );
      };
    },
  },
  Wc = Nn(fm, [["__scopeId", "data-v-e852deb7"]]),
  ha = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Wc },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  hm = /\d/,
  dm = ["-", "_", "/", "."];
function pm(t = "") {
  if (!hm.test(t)) return t.toUpperCase() === t;
}
function _m(t, e) {
  const n = e ?? dm,
    r = [];
  if (!t || typeof t != "string") return r;
  let i = "",
    s,
    o;
  for (const l of t) {
    const u = n.includes(l);
    if (u === !0) {
      r.push(i), (i = ""), (s = void 0);
      continue;
    }
    const a = pm(l);
    if (o === !1) {
      if (s === !1 && a === !0) {
        r.push(i), (i = l), (s = a);
        continue;
      }
      if (s === !0 && a === !1 && i.length > 1) {
        const c = i[i.length - 1];
        r.push(i.slice(0, Math.max(0, i.length - 1))), (i = c + l), (s = a);
        continue;
      }
    }
    (i += l), (s = a), (o = u);
  }
  return r.push(i), r;
}
function gm(t) {
  return t ? t[0].toUpperCase() + t.slice(1) : "";
}
function da(t) {
  return t ? (Array.isArray(t) ? t : _m(t)).map((e) => gm(e)).join("") : "";
}
const mm = { class: "home-wrapper" },
  vm = { class: "work-navigation" },
  ym = ["onMousedown"],
  bm = ["canMoveLeft", "canMoveRight", "onClick"],
  wm = { class: "info-navigation" },
  xm = ["onMousedown"],
  Em = ["canMoveLeft", "canMoveRight", "onClick"],
  Tm = {
    __name: "Home",
    setup(t) {
      const e = In(),
        n = Ce([]),
        r = Ce([]),
        i = Ce(!1),
        s = Ce(!1),
        o = Ce(null),
        l = Ce(null),
        u = 32 * (window.innerWidth / 100),
        a = 1 * (window.innerWidth / 100),
        c = Eo(),
        f = async () => {
          try {
            const O = await In(),
              E = se(O);
            p(
              E.works.children,
              n,
              u,
              "Arbeiten",
              (window.innerWidth / 100) * -18
            ),
              p(
                E.information.children,
                r,
                a,
                "Information",
                window.innerWidth / 2
              ),
              n.value.length !== r.value.length &&
                (n.value.length > r.value.length
                  ? r.value.push(h(a, r.value.length, "Information"))
                  : n.value.push(h(u, n.value.length, "Arbeiten")));
          } catch (O) {
            console.error("Failed to initialize data:", O);
          }
        },
        h = (O, E, I) => {
          function D(j) {
            const z = window.innerWidth / 100;
            return I == "Arbeiten"
              ? O - 5 * z * (j + 1)
              : (console.log(O), O + 5 * z * (j + 1));
          }
          return {
            id: E,
            title: "empty",
            left: D(E),
            previous: E - 1,
            uri: null,
            isDragging: !1,
            canMoveRight: !0,
            canMoveLeft: !0,
            width: (window.innerWidth / 100) * 17,
          };
        },
        p = (O, E, I, D, j) => {
          D == "Arbeiten" && console.log("hi"),
            (E.value[0] = {
              id: 0,
              title: D,
              left: j,
              previous: null,
              uri: null,
              isDragging: !1,
              canMoveRight: !1,
              canMoveLeft: !1,
              width: (window.innerWidth / 100) * 17,
              addClass: "heading-category",
              top: 0,
            }),
            O.forEach((q, X) => {
              E.value.push({
                top: 0,
                id: X + 1,
                left: z(X),
                title: q.title,
                previous: X,
                uri: q.uri,
                isDragging: !1,
                startX: 0,
                dragStartLeft: 0,
                canMoveRight: !0,
                canMoveLeft: !0,
                width: (window.innerWidth / 100) * 17,
                addClass: "link-element",
              });
            });
          function z(q) {
            const X = window.innerWidth / 100;
            return D == "Arbeiten"
              ? I - 5 * X * (q + 1)
              : (console.log(I), I + 5 * X * (q + 1));
          }
        };
      tr(() => {
        f(),
          setTimeout(() => {
            (n.value[0].left = u), (r.value[0].left = a);
          }, 500);
      });
      const g = (O) => {
        O == "works"
          ? i.value
            ? (i.value = !1)
            : ((i.value = !0),
              Pn.set(
                o.value.map((E) => E),
                { y: -window.innerHeight }
              ),
              Pn.to(
                o.value.map((E) => E),
                { y: 0, duration: 1.5, ease: "bounce.out" }
              ))
          : s.value
          ? (s.value = !1)
          : ((s.value = !0),
            Pn.set(
              l.value.map((E) => E),
              { y: -window.innerHeight }
            ),
            Pn.to(
              l.value.map((E) => E),
              { y: 0, duration: 1.5, ease: "bounce.out" }
            ));
      };
      let d, m, b;
      const v = (O, E, I, D) => {
          console.log(D),
            (m = D),
            (d = I.clientX),
            (b = Date.now()),
            E === "work"
              ? ((n.value[O].isDragging = !0),
                (n.value[O].startX = I.clientX),
                (n.value[O].dragStartLeft = n.value[O].left))
              : E === "info" &&
                ((r.value[O].isDragging = !0),
                (r.value[O].startX = I.clientX),
                (r.value[O].dragStartLeft = r.value[O].left)),
            document.addEventListener("mousemove", (j) => w(O, E, j)),
            document.addEventListener("mouseup", U);
        },
        w = (O, E, I, D = !1) => {
          let j, z, q;
          if (
            (D
              ? (q = !0)
              : E === "work"
              ? (q = n.value[O].isDragging)
              : (q = r.value[O].isDragging),
            E === "work" && q
              ? ((j = n.value[O]), (z = n.value))
              : E === "info" && q && ((j = r.value[O]), (z = r.value)),
            !j || !z)
          )
            return;
          let X;
          if (D)
            E == "work" ? (X = j.left - I.clientX) : (X = j.left + I.clientX);
          else {
            const _e = I.clientX - j.startX;
            X = j.dragStartLeft + _e;
          }
          if (O === 0) {
            (j.canMoveLeft = !1), (j.canMoveRight = !1);
            return;
          }
          if (!T(j, X, z)) return;
          X < j.left ? (j.canMoveRight = !0) : (j.canMoveLeft = !0),
            (j.left = X);
          const Ee = x(j, E);
          if (Ee > 0) {
            let _e;
            E == "work" ? (_e = "info") : (_e = "work");
            const Ie = { clientX: Ee };
            w(j.id, _e, Ie, !0);
          }
          k(O, z, E);
        },
        x = (O, E) => {
          let I, D;
          if (E == "work") {
            if (((I = r.value[O.id]), !I)) return 0;
            D = O.left + O.width + 10 - (I.left + window.innerWidth / 2);
          } else {
            if (((I = n.value[O.id]), !I)) return 0;
            D = I.left + I.width + 10 - (O.left + window.innerWidth / 2);
          }
          return D;
        },
        T = (O, E, I) => {
          const D = O.previous,
            j = I[D],
            z = j.left + j.width / 2;
          if (E + O.width < z) {
            if (!j.canMoveLeft) return (O.canMoveLeft = !1), !1;
            O.canMoveRight = !0;
          }
          if (E > z) {
            if (!j.canMoveRight) return (O.canMoveRight = !1), !1;
            O.canMoveLeft = !0;
          }
          return !0;
        },
        k = (O, E, I) => {
          O !== 0 && (A(O, E, I), P(O, E));
        },
        A = (O, E, I) => {
          if (O === 0) return;
          const D = E[O],
            j = D.previous;
          if (j === null || j === 0) return;
          const z = E[j],
            q = z.left + z.width / 2,
            X = E[j - 1] || null,
            Ee = X ? X.left + X.width / 2 : null;
          if (D.left + D.width < q) {
            const _e = D.left + z.width / 2;
            R(z, _e, Ee, "left", I) && ((z.left = _e), A(j, E, I));
          }
          if (D.left > q) {
            const _e = D.left - z.width / 2;
            R(z, _e, Ee, "right", I) && ((z.left = _e), A(j, E, I));
          }
        },
        P = (O, E) => {
          const I = O + 1;
          if (I >= E.length) return;
          const D = E[O],
            j = E[I],
            z = j.left + j.width / 2;
          D.left + D.width < z && ((j.left = D.left + D.width / 2), P(I, E)),
            D.left > z && ((j.left = D.left - j.width / 2), P(I, E));
        },
        R = (O, E, I, D, j) => {
          let z;
          if (
            (j == "work"
              ? (z = n.value[O.previous])
              : (z = r.value[O.previous]),
            D === "left" && I !== null)
          ) {
            if (E + O.width < I && !z.canMoveLeft)
              return (O.canMoveLeft = !1), !1;
            O.canMoveRight = !0;
          }
          if (D === "right" && I !== null) {
            if (E > I && !z.canMoveRight) return (O.canMoveRight = !1), !1;
            O.canMoveLeft = !0;
          }
          return !0;
        },
        U = (O) => {
          n.value.forEach((E) => {
            E.isDragging && (E.isDragging = !1);
          }),
            r.value.forEach((E) => {
              E.isDragging && (E.isDragging = !1);
            }),
            Math.abs(O.clientX - d) < 3 &&
              b - Date.now() < 300 &&
              (console.log("click!!!"), m && c.push("/" + m)),
            document.removeEventListener("mousemove", w),
            document.removeEventListener("mouseup", U);
        };
      return (
        $i(() => {
          document.removeEventListener("mousemove", w),
            document.removeEventListener("mouseup", U);
        }),
        (O, E) => {
          var I;
          return (
            fe(),
            Oe(
              Pe,
              null,
              [
                ee("div", mm, [
                  ee("h1", null, Lt((I = oe(e)) == null ? void 0 : I.title), 1),
                ]),
                ee(
                  "div",
                  {
                    class: "home-navigation",
                    style: pt(
                      "--workcolor: " +
                        oe(e).works.color +
                        "; --infocolor: " +
                        oe(e).information.color
                    ),
                  },
                  [
                    ee("div", vm, [
                      (fe(!0),
                      Oe(
                        Pe,
                        null,
                        Fr(n.value, (D, j) => {
                          var z;
                          return (
                            fe(),
                            Oe(
                              "div",
                              {
                                key: D.uri,
                                class: "drag-track",
                                onMousedown: (q) => v(j, "work", q, D.uri),
                              },
                              [
                                ee(
                                  "div",
                                  {
                                    ref_for: !0,
                                    ref: D.id === 0 ? "" : "draggableWorks",
                                    class: Ke([
                                      "draggable-link",
                                      [
                                        D.title === "empty" ? "empty" : "",
                                        D.addClass,
                                        i.value ? "" : "hide",
                                      ],
                                    ]),
                                    style: pt({
                                      backgroundColor:
                                        (z = oe(e)) == null
                                          ? void 0
                                          : z.works.color,
                                      left: `${D.left}px`,
                                      top: `${D.top}px`,
                                    }),
                                    canMoveLeft: D.canMoveLeft,
                                    canMoveRight: D.canMoveRight,
                                    onClick: (q) =>
                                      D.id === 0 ? g("works") : null,
                                  },
                                  Lt(D.title),
                                  15,
                                  bm
                                ),
                              ],
                              40,
                              ym
                            )
                          );
                        }),
                        128
                      )),
                    ]),
                    ee("div", wm, [
                      (fe(!0),
                      Oe(
                        Pe,
                        null,
                        Fr(r.value, (D, j) => {
                          var z;
                          return (
                            fe(),
                            Oe(
                              "div",
                              {
                                key: D.uri,
                                class: "drag-track",
                                onMousedown: (q) => v(j, "info", q, D.uri),
                              },
                              [
                                ee(
                                  "div",
                                  {
                                    ref_for: !0,
                                    ref: D.id === 0 ? "" : "draggableInfos",
                                    class: Ke([
                                      "draggable-link",
                                      [
                                        D.title === "empty" ? "empty" : "",
                                        D.addClass,
                                        s.value ? "" : "hide",
                                      ],
                                    ]),
                                    style: pt({
                                      backgroundColor:
                                        (z = oe(e)) == null
                                          ? void 0
                                          : z.information.color,
                                      left: `${D.left}px`,
                                      top: `${D.top}px`,
                                    }),
                                    canMoveLeft: D.canMoveLeft,
                                    canMoveRight: D.canMoveRight,
                                    onClick: (q) =>
                                      D.id === 0 ? g("info") : null,
                                  },
                                  Lt(D.title),
                                  15,
                                  Em
                                ),
                              ],
                              40,
                              xm
                            )
                          );
                        }),
                        128
                      )),
                    ]),
                  ],
                  4
                ),
              ],
              64
            )
          );
        }
      );
    },
  },
  qc = Nn(Tm, [["__scopeId", "data-v-a9cf3934"]]),
  pa = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: qc },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
const Jr = (t) => (qa("data-v-bb2ee95b"), (t = t()), Ka(), t),
  Cm = { class: "page-wrapper" },
  Pm = {
    id: "Ebene_1",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 43 43",
    style: { "enable-background": "new 0 0 43 43" },
    "xml:space": "preserve",
    width: "25",
    height: "25",
  },
  Rm = Jr(() =>
    ee(
      "g",
      null,
      [
        ee("path", {
          class: "st0",
          d: `M21.5,41.7c-11.1,0-20.2-9.1-20.2-20.2c0-11.1,9.1-20.2,20.2-20.2s20.2,9.1,20.2,20.2
		C41.7,32.7,32.6,41.7,21.5,41.7z`,
        }),
        ee("path", {
          class: "st1",
          d: `M21.5,2.3c10.6,0,19.2,8.6,19.2,19.2s-8.6,19.2-19.2,19.2S2.3,32.1,2.3,21.5S10.9,2.3,21.5,2.3 M21.5,0.3
		C9.8,0.3,0.3,9.8,0.3,21.5s9.5,21.2,21.2,21.2s21.2-9.5,21.2-21.2S33.2,0.3,21.5,0.3L21.5,0.3z`,
        }),
      ],
      -1
    )
  ),
  Sm = Jr(() =>
    ee(
      "line",
      { class: "st2", x1: "12", y1: "21.5", x2: "31", y2: "21.5" },
      null,
      -1
    )
  ),
  km = [Rm, Sm],
  Om = { class: "image-wrapper" },
  Mm = ["src"],
  Am = Jr(() => ee("div", { class: "spacer" }, null, -1)),
  Lm = {
    id: "Ebene_1",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 28 28",
    style: { "enable-background": "new 0 0 28 28" },
    "xml:space": "preserve",
  },
  Im = Jr(() =>
    ee(
      "line",
      { class: "st0", x1: "4.1", y1: "4.1", x2: "23.9", y2: "23.9" },
      null,
      -1
    )
  ),
  Dm = Jr(() =>
    ee(
      "line",
      { class: "st0", x1: "23.9", y1: "4.1", x2: "4.1", y2: "23.9" },
      null,
      -1
    )
  ),
  Fm = [Im, Dm],
  Nm = ["innerHTML"],
  $m = ["innerHTML"],
  zm = ["innerHTML"],
  Bm = {
    __name: "Work",
    setup(t, { expose: e }) {
      const n = Wi();
      console.log(n);
      const r = Ce({ x: window.innerWidth / 2, y: window.innerHeight / 2 }),
        i = Ce(!1),
        s = Ce({ x: 0, y: 0 }),
        o = Ce(!1),
        l = Ce(null),
        u = Ce(null);
      e({ title: l, infoSection: u });
      async function a() {
        if (((o.value = !o.value), console.log("hi"), o.value)) {
          await uo();
          const d = l.value.getBoundingClientRect().width,
            m = parseFloat(c());
          d > m &&
            ((l.value.style.whiteSpace = "break-spaces"),
            (u.value.style.width = c()));
        }
      }
      function c() {
        return (
          (window.innerHeight - 2 * (window.innerWidth / 100)) *
            n.coverimageRatio +
          "px"
        );
      }
      function f() {
        history.back();
      }
      function h(d) {
        (i.value = !0),
          (s.value = { x: d.clientX - r.value.x, y: d.clientY - r.value.y }),
          document.addEventListener("mousemove", p),
          document.addEventListener("mouseup", g);
      }
      function p(d) {
        i.value &&
          (r.value = { x: d.clientX - s.value.x, y: d.clientY - s.value.y });
      }
      function g() {
        (i.value = !1),
          document.removeEventListener("mousemove", p),
          document.removeEventListener("mouseup", g);
      }
      return (
        console.log(n),
        (d, m) => {
          const b = ru("kirbytext");
          return (
            fe(),
            Oe("div", Cm, [
              ee("div", { class: "close-work", onClick: f }, [
                (fe(), Oe("svg", Pm, km)),
              ]),
              ee("div", { class: "overlay", onClick: f }),
              ee("button", { onClick: a }, "Information"),
              ee("div", Om, [
                ee(
                  "figure",
                  {
                    class: Ke(
                      oe(n).coverimageRatio > 1.1 ? "landscape" : "portrait"
                    ),
                  },
                  [ee("img", { src: oe(n).coverimage }, null, 8, Mm)],
                  2
                ),
              ]),
              Am,
              br(
                ee(
                  "div",
                  {
                    ref_key: "infoSection",
                    ref: u,
                    class: "info-section-work",
                    style: pt({
                      top: `${r.value.y}px`,
                      left: `${r.value.x}px`,
                      "--bgcolor": oe(n).color,
                      "max-width": c(),
                    }),
                    onMousedown: h,
                  },
                  [
                    ee("div", { class: "close-me-mobile", onClick: a }, [
                      (fe(), Oe("svg", Lm, Fm)),
                    ]),
                    ee(
                      "h1",
                      { ref_key: "title", ref: l },
                      Lt(oe(n).title),
                      513
                    ),
                    br(
                      ee(
                        "div",
                        { class: "infofield", innerHTML: oe(n).infofield },
                        null,
                        8,
                        Nm
                      ),
                      [[b]]
                    ),
                    br(
                      ee(
                        "div",
                        { class: "ratio", innerHTML: oe(n).ratio },
                        null,
                        8,
                        $m
                      ),
                      [[b]]
                    ),
                    br(
                      ee(
                        "div",
                        { class: "year", innerHTML: oe(n).year },
                        null,
                        8,
                        zm
                      ),
                      [[b]]
                    ),
                  ],
                  36
                ),
                [[kd, o.value]]
              ),
            ])
          );
        }
      );
    },
  },
  Kc = Nn(Bm, [["__scopeId", "data-v-bb2ee95b"]]),
  _a = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Kc },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  jm = () => {
    let t = !1;
    return (
      (function (e) {
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          e
        ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            e.substr(0, 4)
          )) &&
          (t = !0);
      })(navigator.userAgent || navigator.vendor || window.opera),
      t
    );
  },
  Um = (t, e, n) => {
    const r = document.documentElement.style.scrollBehavior || "auto";
    return n
      ? { ...n, behavior: r }
      : t.hash
      ? { el: decodeURI(t.hash), behavior: r }
      : { top: 0, left: 0, behavior: r };
  },
  Hm = (t) => {
    const { isMultilang: e, languageCode: n } = Vu(),
      r = e ? `/${n}/` : "",
      i = In(),
      s = [
        { path: "/", component: qc },
        { path: "/arbeiten", redirect: "/" + i.works.children[0].uri },
        {
          path: "/information",
          beforeEnter: (l, u, a) => {
            jm() ? a("/information/ausstellungen") : a();
          },
        },
        ...i.children.map((l) => ({
          path: `/${l.uri}`,
          component: () =>
            Qo(
              Object.assign({
                "../views/Default.vue": () =>
                  je(() => Promise.resolve().then(() => Yl), void 0),
                "../views/Error.vue": () =>
                  je(
                    () => import("./Error-c80c248e.js"),
                    ["assets/Error-c80c248e.js", "assets/Error-b4239293.css"]
                  ),
                "../views/Home copy_pre241126.vue": () =>
                  je(
                    () => import("./Home copy_pre241126-9af14c76.js"),
                    [
                      "assets/Home copy_pre241126-9af14c76.js",
                      "assets/HomeNavLink-52c954cb.js",
                      "assets/HomeNavLink-85abe883.css",
                      "assets/Home copy_pre241126-3c586336.css",
                    ]
                  ),
                "../views/Home.vue": () =>
                  je(() => Promise.resolve().then(() => pa), void 0),
                "../views/Home_copy_241203.vue": () =>
                  je(
                    () => import("./Home_copy_241203-7430fa69.js"),
                    [
                      "assets/Home_copy_241203-7430fa69.js",
                      "assets/HomeNavLink-52c954cb.js",
                      "assets/HomeNavLink-85abe883.css",
                      "assets/Home_copy_241203-51b19111.css",
                    ]
                  ),
                "../views/Infohub.vue": () =>
                  je(() => Promise.resolve().then(() => ha), void 0),
                "../views/Work.vue": () =>
                  je(() => Promise.resolve().then(() => _a), void 0),
                "../views/Workcategory.vue": () =>
                  je(
                    () => import("./Workcategory-c2214556.js"),
                    [
                      "assets/Workcategory-c2214556.js",
                      "assets/Workcategory-96d9c295.css",
                    ]
                  ),
              }),
              `../views/${da(l.template)}.vue`
            ).catch(() => ui),
          meta: { title: l.title },
        })),
        ...i.works.children.map((l) => ({
          path: `/${l.uri}`,
          component: () =>
            Qo(
              Object.assign({
                "../views/Default.vue": () =>
                  je(() => Promise.resolve().then(() => Yl), void 0),
                "../views/Error.vue": () =>
                  je(
                    () => import("./Error-c80c248e.js"),
                    ["assets/Error-c80c248e.js", "assets/Error-b4239293.css"]
                  ),
                "../views/Home copy_pre241126.vue": () =>
                  je(
                    () => import("./Home copy_pre241126-9af14c76.js"),
                    [
                      "assets/Home copy_pre241126-9af14c76.js",
                      "assets/HomeNavLink-52c954cb.js",
                      "assets/HomeNavLink-85abe883.css",
                      "assets/Home copy_pre241126-3c586336.css",
                    ]
                  ),
                "../views/Home.vue": () =>
                  je(() => Promise.resolve().then(() => pa), void 0),
                "../views/Home_copy_241203.vue": () =>
                  je(
                    () => import("./Home_copy_241203-7430fa69.js"),
                    [
                      "assets/Home_copy_241203-7430fa69.js",
                      "assets/HomeNavLink-52c954cb.js",
                      "assets/HomeNavLink-85abe883.css",
                      "assets/Home_copy_241203-51b19111.css",
                    ]
                  ),
                "../views/Infohub.vue": () =>
                  je(() => Promise.resolve().then(() => ha), void 0),
                "../views/Work.vue": () =>
                  je(() => Promise.resolve().then(() => _a), void 0),
                "../views/Workcategory.vue": () =>
                  je(
                    () => import("./Workcategory-c2214556.js"),
                    [
                      "assets/Workcategory-c2214556.js",
                      "assets/Workcategory-96d9c295.css",
                    ]
                  ),
              }),
              `../views/${da(l.template)}.vue`
            ).catch(() => ui),
          meta: { title: l.title },
        })),
        { path: "/arbeiten/:malerei/:workId", component: Kc },
        { path: "/information/:workId", component: Wc },
      ];
    s.push({ path: "/:pathMatch(.*)*", component: ui });
    const o = Dp({ history: Qd(r), routes: s, scrollBehavior: Um });
    o.beforeEach((l, u, a) => {
      (Vi.previousRoute = u), a();
    }),
      t.use(o);
  },
  Vm = Object.freeze(
    Object.defineProperty(
      { __proto__: null, install: Hm },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
const Wm = ["aria-live", "textContent"],
  qm = {
    __name: "Announcer",
    setup(t) {
      const { announcer: e } = Du();
      return (n, r) => (
        fe(),
        Oe(
          "div",
          {
            id: "announcer",
            "aria-live": oe(e).politeness,
            textContent: Lt(oe(e).content),
          },
          null,
          8,
          Wm
        )
      );
    },
  };
const Km = {
    __name: "App",
    setup(t) {
      const e = jr();
      In(), Ce("scrollContainer"), Ce(!1);
      const n = Ye(() => !e.path.startsWith("/information/"));
      return (
        Ht(e, () => {
          console.log(e.path.split("/")[1]),
            e.path.split("/")[1] == "information"
              ? document.body.classList.add("info")
              : document.body.classList.remove("info");
        }),
        console.log(In()),
        (r, i) => {
          const s = qm,
            o = mi("router-view");
          return (
            fe(),
            Oe(
              Pe,
              null,
              [
                me(s),
                ee(
                  "div",
                  { class: Ke(["page", { home: oe(e).path == "/" }]) },
                  [
                    me(o, null, {
                      default: wt(({ Component: l }) => [
                        (fe(),
                        Sn(
                          dh,
                          { include: "Workcategory,Home" },
                          [
                            (fe(),
                            Sn(Eh(l), {
                              key: oe(n)
                                ? r.$route.path
                                : "/information/static",
                            })),
                          ],
                          1024
                        )),
                      ]),
                      _: 1,
                    }),
                  ],
                  2
                ),
              ],
              64
            )
          );
        }
      );
    },
  },
  Xm = Nn(Km, [["__scopeId", "data-v-f22ba52d"]]);
function Ym(t) {
  return {
    all: (t = t || new Map()),
    on: function (e, n) {
      var r = t.get(e);
      r ? r.push(n) : t.set(e, [n]);
    },
    off: function (e, n) {
      var r = t.get(e);
      r && (n ? r.splice(r.indexOf(n) >>> 0, 1) : t.set(e, []));
    },
    emit: function (e, n) {
      var r = t.get(e);
      r &&
        r.slice().map(function (i) {
          i(n);
        }),
        (r = t.get("*")) &&
          r.slice().map(function (i) {
            i(e, n);
          });
    },
  };
}
const Gm = Ym(),
  Vo = Ad(Xm);
var ga;
for (const t of Object.values(
  Object.assign({
    "./modules/kirbytext.js": Yc,
    "./modules/router.js": Vm,
    "./modules/store.js": M_,
  })
))
  (ga = t.install) == null || ga.call(t, Vo);
Vo.config.globalProperties.emitter = Gm;
Vo.mount("#app");
export {
  Pn as A,
  qa as B,
  Ka as C,
  eu as D,
  Vi as E,
  Pe as F,
  kd as G,
  Zg as H,
  Jm as T,
  Nn as _,
  me as a,
  oe as b,
  Oe as c,
  br as d,
  Rs as e,
  F_ as f,
  Mt as g,
  Ce as h,
  tr as i,
  In as j,
  jr as k,
  ee as l,
  Ke as m,
  uo as n,
  fe as o,
  Fr as p,
  pt as q,
  ru as r,
  Sn as s,
  Lt as t,
  Wi as u,
  Eo as v,
  wt as w,
  po as x,
  Qm as y,
  mi as z,
};
