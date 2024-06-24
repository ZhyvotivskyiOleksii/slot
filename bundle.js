/*! For license information please see bundle.js.LICENSE.txt */
(() => {
  function t(e) {
    return (
      (t =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      t(e)
    );
  }
  function e() {
    "use strict";
    e = function () {
      return r;
    };
    var n,
      r = {},
      o = Object.prototype,
      i = o.hasOwnProperty,
      a =
        Object.defineProperty ||
        function (t, e, n) {
          t[e] = n.value;
        },
      c = "function" == typeof Symbol ? Symbol : {},
      u = c.iterator || "@@iterator",
      l = c.asyncIterator || "@@asyncIterator",
      s = c.toStringTag || "@@toStringTag";
    function f(t, e, n) {
      return (
        Object.defineProperty(t, e, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        t[e]
      );
    }
    try {
      f({}, "");
    } catch (n) {
      f = function (t, e, n) {
        return (t[e] = n);
      };
    }
    function d(t, e, n, r) {
      var o = e && e.prototype instanceof b ? e : b,
        i = Object.create(o.prototype),
        c = new _(r || []);
      return a(i, "_invoke", { value: A(t, n, c) }), i;
    }
    function y(t, e, n) {
      try {
        return { type: "normal", arg: t.call(e, n) };
      } catch (t) {
        return { type: "throw", arg: t };
      }
    }
    r.wrap = d;
    var h = "suspendedStart",
      m = "suspendedYield",
      p = "executing",
      v = "completed",
      g = {};
    function b() {}
    function w() {}
    function E() {}
    var L = {};
    f(L, u, function () {
      return this;
    });
    var x = Object.getPrototypeOf,
      B = x && x(x(N([])));
    B && B !== o && i.call(B, u) && (L = B);
    var I = (E.prototype = b.prototype = Object.create(L));
    function k(t) {
      ["next", "throw", "return"].forEach(function (e) {
        f(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function S(e, n) {
      function r(o, a, c, u) {
        var l = y(e[o], e, a);
        if ("throw" !== l.type) {
          var s = l.arg,
            f = s.value;
          return f && "object" == t(f) && i.call(f, "__await")
            ? n.resolve(f.__await).then(
                function (t) {
                  r("next", t, c, u);
                },
                function (t) {
                  r("throw", t, c, u);
                }
              )
            : n.resolve(f).then(
                function (t) {
                  (s.value = t), c(s);
                },
                function (t) {
                  return r("throw", t, c, u);
                }
              );
        }
        u(l.arg);
      }
      var o;
      a(this, "_invoke", {
        value: function (t, e) {
          function i() {
            return new n(function (n, o) {
              r(t, e, n, o);
            });
          }
          return (o = o ? o.then(i, i) : i());
        },
      });
    }
    function A(t, e, r) {
      var o = h;
      return function (i, a) {
        if (o === p) throw Error("Generator is already running");
        if (o === v) {
          if ("throw" === i) throw a;
          return { value: n, done: !0 };
        }
        for (r.method = i, r.arg = a; ; ) {
          var c = r.delegate;
          if (c) {
            var u = O(c, r);
            if (u) {
              if (u === g) continue;
              return u;
            }
          }
          if ("next" === r.method) r.sent = r._sent = r.arg;
          else if ("throw" === r.method) {
            if (o === h) throw ((o = v), r.arg);
            r.dispatchException(r.arg);
          } else "return" === r.method && r.abrupt("return", r.arg);
          o = p;
          var l = y(t, e, r);
          if ("normal" === l.type) {
            if (((o = r.done ? v : m), l.arg === g)) continue;
            return { value: l.arg, done: r.done };
          }
          "throw" === l.type &&
            ((o = v), (r.method = "throw"), (r.arg = l.arg));
        }
      };
    }
    function O(t, e) {
      var r = e.method,
        o = t.iterator[r];
      if (o === n)
        return (
          (e.delegate = null),
          ("throw" === r &&
            t.iterator.return &&
            ((e.method = "return"),
            (e.arg = n),
            O(t, e),
            "throw" === e.method)) ||
            ("return" !== r &&
              ((e.method = "throw"),
              (e.arg = new TypeError(
                "The iterator does not provide a '" + r + "' method"
              )))),
          g
        );
      var i = y(o, t.iterator, e.arg);
      if ("throw" === i.type)
        return (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), g;
      var a = i.arg;
      return a
        ? a.done
          ? ((e[t.resultName] = a.value),
            (e.next = t.nextLoc),
            "return" !== e.method && ((e.method = "next"), (e.arg = n)),
            (e.delegate = null),
            g)
          : a
        : ((e.method = "throw"),
          (e.arg = new TypeError("iterator result is not an object")),
          (e.delegate = null),
          g);
    }
    function j(t) {
      var e = { tryLoc: t[0] };
      1 in t && (e.catchLoc = t[1]),
        2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
        this.tryEntries.push(e);
    }
    function C(t) {
      var e = t.completion || {};
      (e.type = "normal"), delete e.arg, (t.completion = e);
    }
    function _(t) {
      (this.tryEntries = [{ tryLoc: "root" }]),
        t.forEach(j, this),
        this.reset(!0);
    }
    function N(e) {
      if (e || "" === e) {
        var r = e[u];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            a = function t() {
              for (; ++o < e.length; )
                if (i.call(e, o)) return (t.value = e[o]), (t.done = !1), t;
              return (t.value = n), (t.done = !0), t;
            };
          return (a.next = a);
        }
      }
      throw new TypeError(t(e) + " is not iterable");
    }
    return (
      (w.prototype = E),
      a(I, "constructor", { value: E, configurable: !0 }),
      a(E, "constructor", { value: w, configurable: !0 }),
      (w.displayName = f(E, s, "GeneratorFunction")),
      (r.isGeneratorFunction = function (t) {
        var e = "function" == typeof t && t.constructor;
        return (
          !!e && (e === w || "GeneratorFunction" === (e.displayName || e.name))
        );
      }),
      (r.mark = function (t) {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(t, E)
            : ((t.__proto__ = E), f(t, s, "GeneratorFunction")),
          (t.prototype = Object.create(I)),
          t
        );
      }),
      (r.awrap = function (t) {
        return { __await: t };
      }),
      k(S.prototype),
      f(S.prototype, l, function () {
        return this;
      }),
      (r.AsyncIterator = S),
      (r.async = function (t, e, n, o, i) {
        void 0 === i && (i = Promise);
        var a = new S(d(t, e, n, o), i);
        return r.isGeneratorFunction(e)
          ? a
          : a.next().then(function (t) {
              return t.done ? t.value : a.next();
            });
      }),
      k(I),
      f(I, s, "Generator"),
      f(I, u, function () {
        return this;
      }),
      f(I, "toString", function () {
        return "[object Generator]";
      }),
      (r.keys = function (t) {
        var e = Object(t),
          n = [];
        for (var r in e) n.push(r);
        return (
          n.reverse(),
          function t() {
            for (; n.length; ) {
              var r = n.pop();
              if (r in e) return (t.value = r), (t.done = !1), t;
            }
            return (t.done = !0), t;
          }
        );
      }),
      (r.values = N),
      (_.prototype = {
        constructor: _,
        reset: function (t) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = n),
            (this.done = !1),
            (this.delegate = null),
            (this.method = "next"),
            (this.arg = n),
            this.tryEntries.forEach(C),
            !t)
          )
            for (var e in this)
              "t" === e.charAt(0) &&
                i.call(this, e) &&
                !isNaN(+e.slice(1)) &&
                (this[e] = n);
        },
        stop: function () {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function (t) {
          if (this.done) throw t;
          var e = this;
          function r(r, o) {
            return (
              (c.type = "throw"),
              (c.arg = t),
              (e.next = r),
              o && ((e.method = "next"), (e.arg = n)),
              !!o
            );
          }
          for (var o = this.tryEntries.length - 1; o >= 0; --o) {
            var a = this.tryEntries[o],
              c = a.completion;
            if ("root" === a.tryLoc) return r("end");
            if (a.tryLoc <= this.prev) {
              var u = i.call(a, "catchLoc"),
                l = i.call(a, "finallyLoc");
              if (u && l) {
                if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                if (this.prev < a.finallyLoc) return r(a.finallyLoc);
              } else if (u) {
                if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
              } else {
                if (!l) throw Error("try statement without catch or finally");
                if (this.prev < a.finallyLoc) return r(a.finallyLoc);
              }
            }
          }
        },
        abrupt: function (t, e) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var r = this.tryEntries[n];
            if (
              r.tryLoc <= this.prev &&
              i.call(r, "finallyLoc") &&
              this.prev < r.finallyLoc
            ) {
              var o = r;
              break;
            }
          }
          o &&
            ("break" === t || "continue" === t) &&
            o.tryLoc <= e &&
            e <= o.finallyLoc &&
            (o = null);
          var a = o ? o.completion : {};
          return (
            (a.type = t),
            (a.arg = e),
            o
              ? ((this.method = "next"), (this.next = o.finallyLoc), g)
              : this.complete(a)
          );
        },
        complete: function (t, e) {
          if ("throw" === t.type) throw t.arg;
          return (
            "break" === t.type || "continue" === t.type
              ? (this.next = t.arg)
              : "return" === t.type
              ? ((this.rval = this.arg = t.arg),
                (this.method = "return"),
                (this.next = "end"))
              : "normal" === t.type && e && (this.next = e),
            g
          );
        },
        finish: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var n = this.tryEntries[e];
            if (n.finallyLoc === t)
              return this.complete(n.completion, n.afterLoc), C(n), g;
          }
        },
        catch: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var n = this.tryEntries[e];
            if (n.tryLoc === t) {
              var r = n.completion;
              if ("throw" === r.type) {
                var o = r.arg;
                C(n);
              }
              return o;
            }
          }
          throw Error("illegal catch attempt");
        },
        delegateYield: function (t, e, r) {
          return (
            (this.delegate = { iterator: N(t), resultName: e, nextLoc: r }),
            "next" === this.method && (this.arg = n),
            g
          );
        },
      }),
      r
    );
  }
  function n(t, e, n, r, o, i, a) {
    try {
      var c = t[i](a),
        u = c.value;
    } catch (t) {
      return void n(t);
    }
    c.done ? e(u) : Promise.resolve(u).then(r, o);
  }
  function r(t) {
    return function () {
      var e = this,
        r = arguments;
      return new Promise(function (o, i) {
        var a = t.apply(e, r);
        function c(t) {
          n(a, o, i, c, u, "next", t);
        }
        function u(t) {
          n(a, o, i, c, u, "throw", t);
        }
        c(void 0);
      });
    };
  }
  function o(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
    return r;
  }
  document.addEventListener("DOMContentLoaded", function () {
    var t = ["star", "lemon", "orange", "watermelon", "cherries", "bell"],
      n = [
        document.getElementById("reel1"),
        document.getElementById("reel2"),
        document.getElementById("reel3"),
        document.getElementById("reel4"),
        document.getElementById("reel5"),
      ],
      i = document.getElementById("spinButton"),
      a = document.getElementById("bet"),
      c = document.getElementById("win"),
      u = document.getElementById("totalBalance"),
      l = document.getElementById("loadingScreen"),
      s = document.getElementById("startButton"),
      f = document.querySelector(".slot-machine"),
      d = document.getElementById("closeButton"),
      y = document.getElementById("muteButton"),
      h = document.getElementById("volumeControl"),
      m = document.getElementById("winModal"),
      p = document.getElementById("winAmount"),
      v = 1e3,
      g = 0.5,
      b = 0,
      w = !1,
      E = new Audio("/sounds/bg21.mp3"),
      L = new Audio("/sounds/spin.mp3"),
      x = new Audio("/sounds/reel-stop.mp3"),
      B = new Audio("/sounds/win.mp3"),
      I = new Audio("/sounds/change-coin.mp3"),
      k = new Audio("/sounds/insufficient-balance.mp3");
    function S(t, e) {
      return new Promise(function (n) {
        var r = t.querySelector(".symbol-container");
        (r.style.animationDuration = "".concat(e, "s")),
          r.classList.add("spin"),
          setTimeout(function () {
            r.classList.remove("spin"),
              (r.style.top = "0"),
              r.classList.add("bounce"),
              setTimeout(function () {
                r.classList.remove("bounce"), x.play(), n();
              }, 300);
          }, 1e3 * e);
      });
    }
    function A() {
      b = 0;
      var t,
        e = [],
        r = n.map(function (t) {
          return t
            .querySelector(".symbol-container")
            .children[0].className.split(" ")[1];
        });
      r.every(function (t) {
        return t === r[0];
      }) &&
        ((v += b = 10 * g),
        (u.textContent = v),
        (c.textContent = b),
        e.push.apply(
          e,
          (function (t) {
            if (Array.isArray(t)) return o(t);
          })((t = r)) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(t) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return o(t, e);
                var n = {}.toString.call(t).slice(8, -1);
                return (
                  "Object" === n && t.constructor && (n = t.constructor.name),
                  "Map" === n || "Set" === n
                    ? Array.from(t)
                    : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? o(t, e)
                    : void 0
                );
              }
            })(t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
        ),
        (function (t) {
          t.forEach(function (t) {
            document
              .querySelectorAll(".symbol.".concat(t))
              .forEach(function (t) {
                t.classList.add("highlight");
              });
          });
        })(e),
        B.play(),
        (function (t) {
          t > 0 &&
            ((p.textContent = t),
            (m.style.display = "block"),
            m.querySelector(".close").addEventListener("click", function () {
              m.style.display = "none";
            }),
            setTimeout(function () {
              m.style.display = "none";
            }, 3e3));
        })(b));
    }
    function O() {
      a.textContent = g;
    }
    function j() {
      var t = document.createElement("div");
      (t.className = "modal"),
        (t.innerHTML =
          '\n      <div class="modal-content">\n        <span class="close">&times;</span>\n        <p>Недостатньо коштів. Будь ласка, оновіть cторінку для поповнення балансу на 1000 кредитів.</p>\n      </div>\n    '),
        document.body.appendChild(t),
        t.querySelector(".close").addEventListener("click", function () {
          (t.style.display = "none"), t.remove(), location.reload();
        }),
        (t.style.display = "block"),
        setTimeout(function () {
          (t.style.display = "none"), t.remove(), location.reload();
        }, 3e3),
        k.play();
    }
    (E.loop = !0),
      n.forEach(function (e) {
        !(function (e) {
          var n = document.createElement("div");
          n.className = "symbol-container";
          for (var r = 0; r < 16; r++) {
            var o = document.createElement("div");
            (o.className = "symbol ".concat(
              t[Math.floor(Math.random() * t.length)]
            )),
              n.appendChild(o);
          }
          !(function (t) {
            for (; t.firstChild; ) t.removeChild(t.firstChild);
          })(e),
            e.appendChild(n);
        })(e);
      }),
      i.addEventListener(
        "click",
        r(
          e().mark(function t() {
            var r, o;
            return e().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (!(v < g)) {
                      t.next = 3;
                      break;
                    }
                    return j(), t.abrupt("return");
                  case 3:
                    return (
                      (v -= g),
                      (u.textContent = v),
                      (i.disabled = !0),
                      L.play(),
                      (r = [2, 2.5, 3, 3.5, 4]),
                      (o = n.map(function (t, e) {
                        return S(t, r[e]);
                      })),
                      (t.next = 11),
                      Promise.all(o)
                    );
                  case 11:
                    L.pause(), A(), (i.disabled = !1);
                  case 14:
                  case "end":
                    return t.stop();
                }
            }, t);
          })
        )
      ),
      document
        .getElementById("coinPlusButton")
        .addEventListener("click", function () {
          (g += 0.5), O(), I.play();
        }),
      document
        .getElementById("coinMinusButton")
        .addEventListener("click", function () {
          g > 0.5 && (g -= 0.5), O(), I.play();
        }),
      document
        .getElementById("maxBetButton")
        .addEventListener("click", function () {
          (g = Math.floor(v)), O(), I.play();
        }),
      s.addEventListener("click", function () {
        (l.style.display = "none"), (f.style.display = "block"), E.play();
      }),
      d.addEventListener("click", function () {
        (f.style.display = "none"), (l.style.display = "block"), E.pause();
      }),
      y.addEventListener("click", function () {
        (w = !w), (E.muted = w), (y.textContent = w ? "🔇" : "🔊");
      }),
      h.addEventListener("input", function (t) {
        E.volume = t.target.value;
      }),
      O();
  });
})();
