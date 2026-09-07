window.__ModuleLoader__.load({ id: 'dsh-personal-studio', factory: (require) => { var module = { exports: {} }; var exports = module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react3 = require("react");
var import_react_dom = require("react-dom");

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var import_react2 = require("react");

// node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// node_modules/lucide-react/dist/esm/Icon.js
var import_react = require("react");

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/Icon.js
var Icon = (0, import_react.forwardRef)(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return (0, import_react.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = (0, import_react2.forwardRef)(
    ({ className, ...props }, ref) => (0, import_react2.createElement)(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};

// node_modules/lucide-react/dist/esm/icons/activity.js
var Activity = createLucideIcon("Activity", [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/at-sign.js
var AtSign = createLucideIcon("AtSign", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8", key: "7n84p3" }]
]);

// node_modules/lucide-react/dist/esm/icons/atom.js
var Atom = createLucideIcon("Atom", [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  [
    "path",
    {
      d: "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z",
      key: "1l2ple"
    }
  ],
  [
    "path",
    {
      d: "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z",
      key: "1wam0m"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/badge-dollar-sign.js
var BadgeDollarSign = createLucideIcon("BadgeDollarSign", [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }]
]);

// node_modules/lucide-react/dist/esm/icons/bell.js
var Bell = createLucideIcon("Bell", [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/binary.js
var Binary = createLucideIcon("Binary", [
  ["rect", { x: "14", y: "14", width: "4", height: "6", rx: "2", key: "p02svl" }],
  ["rect", { x: "6", y: "4", width: "4", height: "6", rx: "2", key: "xm4xkj" }],
  ["path", { d: "M6 20h4", key: "1i6q5t" }],
  ["path", { d: "M14 10h4", key: "ru81e7" }],
  ["path", { d: "M6 14h2v6", key: "16z9wg" }],
  ["path", { d: "M14 4h2v6", key: "1idq9u" }]
]);

// node_modules/lucide-react/dist/esm/icons/book-open.js
var BookOpen = createLucideIcon("BookOpen", [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/boxes.js
var Boxes = createLucideIcon("Boxes", [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
      key: "lc1i9w"
    }
  ],
  ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }],
  ["path", { d: "m7 16.5 5-3", key: "va8pkn" }],
  ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
      key: "8zsnat"
    }
  ],
  ["path", { d: "m17 16.5-5-3", key: "8arw3v" }],
  ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }],
  ["path", { d: "M17 16.5v5.17", key: "k6z78m" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
      key: "1xygjf"
    }
  ],
  ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }],
  ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }],
  ["path", { d: "M12 13.5V8", key: "1io7kd" }]
]);

// node_modules/lucide-react/dist/esm/icons/braces.js
var Braces = createLucideIcon("Braces", [
  [
    "path",
    { d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1", key: "ezmyqa" }
  ],
  [
    "path",
    {
      d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
      key: "e1hn23"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/brain-circuit.js
var BrainCircuit = createLucideIcon("BrainCircuit", [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  ["path", { d: "M9 13a4.5 4.5 0 0 0 3-4", key: "10igwf" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M12 13h4", key: "1ku699" }],
  ["path", { d: "M12 18h6a2 2 0 0 1 2 2v1", key: "105ag5" }],
  ["path", { d: "M12 8h8", key: "1lhi5i" }],
  ["path", { d: "M16 8V5a2 2 0 0 1 2-2", key: "u6izg6" }],
  ["circle", { cx: "16", cy: "13", r: ".5", key: "ry7gng" }],
  ["circle", { cx: "18", cy: "3", r: ".5", key: "1aiba7" }],
  ["circle", { cx: "20", cy: "21", r: ".5", key: "yhc1fs" }],
  ["circle", { cx: "20", cy: "8", r: ".5", key: "1e43v0" }]
]);

// node_modules/lucide-react/dist/esm/icons/briefcase.js
var Briefcase = createLucideIcon("Briefcase", [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
]);

// node_modules/lucide-react/dist/esm/icons/brush.js
var Brush = createLucideIcon("Brush", [
  ["path", { d: "m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08", key: "1styjt" }],
  [
    "path",
    {
      d: "M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z",
      key: "z0l1mu"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/bug.js
var Bug = createLucideIcon("Bug", [
  ["path", { d: "m8 2 1.88 1.88", key: "fmnt4t" }],
  ["path", { d: "M14.12 3.88 16 2", key: "qol33r" }],
  ["path", { d: "M9 7.13v-1a3.003 3.003 0 1 1 6 0v1", key: "d7y7pr" }],
  [
    "path",
    {
      d: "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",
      key: "xs1cw7"
    }
  ],
  ["path", { d: "M12 20v-9", key: "1qisl0" }],
  ["path", { d: "M6.53 9C4.6 8.8 3 7.1 3 5", key: "32zzws" }],
  ["path", { d: "M6 13H2", key: "82j7cp" }],
  ["path", { d: "M3 21c0-2.1 1.7-3.9 3.8-4", key: "4p0ekp" }],
  ["path", { d: "M20.97 5c0 2.1-1.6 3.8-3.5 4", key: "18gb23" }],
  ["path", { d: "M22 13h-4", key: "1jl80f" }],
  ["path", { d: "M17.2 17c2.1.1 3.8 1.9 3.8 4", key: "k3fwyw" }]
]);

// node_modules/lucide-react/dist/esm/icons/building-2.js
var Building2 = createLucideIcon("Building2", [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
]);

// node_modules/lucide-react/dist/esm/icons/calendar-days.js
var CalendarDays = createLucideIcon("CalendarDays", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
]);

// node_modules/lucide-react/dist/esm/icons/camera.js
var Camera = createLucideIcon("Camera", [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
]);

// node_modules/lucide-react/dist/esm/icons/chart-column.js
var ChartColumn = createLucideIcon("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);

// node_modules/lucide-react/dist/esm/icons/chart-line.js
var ChartLine = createLucideIcon("ChartLine", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "m19 9-5 5-4-4-3 3", key: "2osh9i" }]
]);

// node_modules/lucide-react/dist/esm/icons/chart-pie.js
var ChartPie = createLucideIcon("ChartPie", [
  [
    "path",
    {
      d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
      key: "pzmjnu"
    }
  ],
  ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }]
]);

// node_modules/lucide-react/dist/esm/icons/circle-help.js
var CircleHelp = createLucideIcon("CircleHelp", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);

// node_modules/lucide-react/dist/esm/icons/clipboard-check.js
var ClipboardCheck = createLucideIcon("ClipboardCheck", [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m9 14 2 2 4-4", key: "df797q" }]
]);

// node_modules/lucide-react/dist/esm/icons/clock-3.js
var Clock3 = createLucideIcon("Clock3", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16.5 12", key: "1aq6pp" }]
]);

// node_modules/lucide-react/dist/esm/icons/cloud.js
var Cloud = createLucideIcon("Cloud", [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
]);

// node_modules/lucide-react/dist/esm/icons/code-xml.js
var CodeXml = createLucideIcon("CodeXml", [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
]);

// node_modules/lucide-react/dist/esm/icons/coffee.js
var Coffee = createLucideIcon("Coffee", [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti"
    }
  ],
  ["path", { d: "M6 2v2", key: "colzsn" }]
]);

// node_modules/lucide-react/dist/esm/icons/compass.js
var Compass = createLucideIcon("Compass", [
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);

// node_modules/lucide-react/dist/esm/icons/cpu.js
var Cpu = createLucideIcon("Cpu", [
  ["rect", { width: "16", height: "16", x: "4", y: "4", rx: "2", key: "14l7u7" }],
  ["rect", { width: "6", height: "6", x: "9", y: "9", rx: "1", key: "5aljv4" }],
  ["path", { d: "M15 2v2", key: "13l42r" }],
  ["path", { d: "M15 20v2", key: "15mkzm" }],
  ["path", { d: "M2 15h2", key: "1gxd5l" }],
  ["path", { d: "M2 9h2", key: "1bbxkp" }],
  ["path", { d: "M20 15h2", key: "19e6y8" }],
  ["path", { d: "M20 9h2", key: "19tzq7" }],
  ["path", { d: "M9 2v2", key: "165o2o" }],
  ["path", { d: "M9 20v2", key: "i2bqo8" }]
]);

// node_modules/lucide-react/dist/esm/icons/credit-card.js
var CreditCard = createLucideIcon("CreditCard", [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
]);

// node_modules/lucide-react/dist/esm/icons/crown.js
var Crown = createLucideIcon("Crown", [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
]);

// node_modules/lucide-react/dist/esm/icons/database.js
var Database = createLucideIcon("Database", [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
]);

// node_modules/lucide-react/dist/esm/icons/dna.js
var Dna = createLucideIcon("Dna", [
  ["path", { d: "m10 16 1.5 1.5", key: "11lckj" }],
  ["path", { d: "m14 8-1.5-1.5", key: "1ohn8i" }],
  ["path", { d: "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993", key: "80uv8i" }],
  ["path", { d: "m16.5 10.5 1 1", key: "696xn5" }],
  ["path", { d: "m17 6-2.891-2.891", key: "xu6p2f" }],
  ["path", { d: "M2 15c6.667-6 13.333 0 20-6", key: "1pyr53" }],
  ["path", { d: "m20 9 .891.891", key: "3xwk7g" }],
  ["path", { d: "M3.109 14.109 4 15", key: "q76aoh" }],
  ["path", { d: "m6.5 12.5 1 1", key: "cs35ky" }],
  ["path", { d: "m7 18 2.891 2.891", key: "1sisit" }],
  ["path", { d: "M9 22c1.798-1.998 2.518-3.995 2.807-5.993", key: "q3hbxp" }]
]);

// node_modules/lucide-react/dist/esm/icons/dumbbell.js
var Dumbbell = createLucideIcon("Dumbbell", [
  ["path", { d: "M14.4 14.4 9.6 9.6", key: "ic80wn" }],
  [
    "path",
    {
      d: "M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z",
      key: "nnl7wr"
    }
  ],
  ["path", { d: "m21.5 21.5-1.4-1.4", key: "1f1ice" }],
  ["path", { d: "M3.9 3.9 2.5 2.5", key: "1evmna" }],
  [
    "path",
    {
      d: "M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z",
      key: "yhosts"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/earth.js
var Earth = createLucideIcon("Earth", [
  ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54", key: "1djwo0" }],
  [
    "path",
    {
      d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
      key: "1tzkfa"
    }
  ],
  ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05", key: "14pb5j" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);

// node_modules/lucide-react/dist/esm/icons/file-text.js
var FileText = createLucideIcon("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);

// node_modules/lucide-react/dist/esm/icons/filter.js
var Filter = createLucideIcon("Filter", [
  ["polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3", key: "1yg77f" }]
]);

// node_modules/lucide-react/dist/esm/icons/flag.js
var Flag = createLucideIcon("Flag", [
  ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }],
  ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]
]);

// node_modules/lucide-react/dist/esm/icons/flask-conical.js
var FlaskConical = createLucideIcon("FlaskConical", [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
]);

// node_modules/lucide-react/dist/esm/icons/folder-kanban.js
var FolderKanban = createLucideIcon("FolderKanban", [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
      key: "1fr9dc"
    }
  ],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M12 10v2", key: "hh53o1" }],
  ["path", { d: "M16 10v6", key: "1d6xys" }]
]);

// node_modules/lucide-react/dist/esm/icons/gauge.js
var Gauge = createLucideIcon("Gauge", [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
]);

// node_modules/lucide-react/dist/esm/icons/gem.js
var Gem = createLucideIcon("Gem", [
  ["path", { d: "M6 3h12l4 6-10 13L2 9Z", key: "1pcd5k" }],
  ["path", { d: "M11 3 8 9l4 13 4-13-3-6", key: "1fcu3u" }],
  ["path", { d: "M2 9h20", key: "16fsjt" }]
]);

// node_modules/lucide-react/dist/esm/icons/git-branch.js
var GitBranch = createLucideIcon("GitBranch", [
  ["line", { x1: "6", x2: "6", y1: "3", y2: "15", key: "17qcm7" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M18 9a9 9 0 0 1-9 9", key: "n2h4wq" }]
]);

// node_modules/lucide-react/dist/esm/icons/graduation-cap.js
var GraduationCap = createLucideIcon("GraduationCap", [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
]);

// node_modules/lucide-react/dist/esm/icons/hammer.js
var Hammer = createLucideIcon("Hammer", [
  ["path", { d: "m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9", key: "eefl8a" }],
  ["path", { d: "m18 15 4-4", key: "16gjal" }],
  [
    "path",
    {
      d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",
      key: "b7pghm"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/heart.js
var Heart = createLucideIcon("Heart", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/house.js
var House = createLucideIcon("House", [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/image.js
var Image = createLucideIcon("Image", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
]);

// node_modules/lucide-react/dist/esm/icons/key-round.js
var KeyRound = createLucideIcon("KeyRound", [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
]);

// node_modules/lucide-react/dist/esm/icons/landmark.js
var Landmark = createLucideIcon("Landmark", [
  ["line", { x1: "3", x2: "21", y1: "22", y2: "22", key: "j8o0r" }],
  ["line", { x1: "6", x2: "6", y1: "18", y2: "11", key: "10tf0k" }],
  ["line", { x1: "10", x2: "10", y1: "18", y2: "11", key: "54lgf6" }],
  ["line", { x1: "14", x2: "14", y1: "18", y2: "11", key: "380y" }],
  ["line", { x1: "18", x2: "18", y1: "18", y2: "11", key: "1kevvc" }],
  ["polygon", { points: "12 2 20 7 4 7", key: "jkujk7" }]
]);

// node_modules/lucide-react/dist/esm/icons/languages.js
var Languages = createLucideIcon("Languages", [
  ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
  ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
  ["path", { d: "M2 5h12", key: "or177f" }],
  ["path", { d: "M7 2h1", key: "1t2jsx" }],
  ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
  ["path", { d: "M14 18h6", key: "1m8k6r" }]
]);

// node_modules/lucide-react/dist/esm/icons/leaf.js
var Leaf = createLucideIcon("Leaf", [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
]);

// node_modules/lucide-react/dist/esm/icons/library.js
var Library = createLucideIcon("Library", [
  ["path", { d: "m16 6 4 14", key: "ji33uf" }],
  ["path", { d: "M12 6v14", key: "1n7gus" }],
  ["path", { d: "M8 8v12", key: "1gg7y9" }],
  ["path", { d: "M4 4v16", key: "6qkkli" }]
]);

// node_modules/lucide-react/dist/esm/icons/lightbulb.js
var Lightbulb = createLucideIcon("Lightbulb", [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
]);

// node_modules/lucide-react/dist/esm/icons/list-todo.js
var ListTodo = createLucideIcon("ListTodo", [
  ["rect", { x: "3", y: "5", width: "6", height: "6", rx: "1", key: "1defrl" }],
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "M13 6h8", key: "15sg57" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 18h8", key: "oe0vm4" }]
]);

// node_modules/lucide-react/dist/esm/icons/lock-keyhole.js
var LockKeyhole = createLucideIcon("LockKeyhole", [
  ["circle", { cx: "12", cy: "16", r: "1", key: "1au0dj" }],
  ["rect", { x: "3", y: "10", width: "18", height: "12", rx: "2", key: "6s8ecr" }],
  ["path", { d: "M7 10V7a5 5 0 0 1 10 0v3", key: "1pqi11" }]
]);

// node_modules/lucide-react/dist/esm/icons/mail.js
var Mail = createLucideIcon("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);

// node_modules/lucide-react/dist/esm/icons/map-pin.js
var MapPin = createLucideIcon("MapPin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
]);

// node_modules/lucide-react/dist/esm/icons/message-circle.js
var MessageCircle = createLucideIcon("MessageCircle", [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
]);

// node_modules/lucide-react/dist/esm/icons/messages-square.js
var MessagesSquare = createLucideIcon("MessagesSquare", [
  ["path", { d: "M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z", key: "p1xzt8" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1", key: "1cx29u" }]
]);

// node_modules/lucide-react/dist/esm/icons/mic-vocal.js
var MicVocal = createLucideIcon("MicVocal", [
  [
    "path",
    {
      d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
      key: "80a601"
    }
  ],
  [
    "path",
    {
      d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
      key: "j0ngtp"
    }
  ],
  ["circle", { cx: "16", cy: "7", r: "5", key: "d08jfb" }]
]);

// node_modules/lucide-react/dist/esm/icons/microscope.js
var Microscope = createLucideIcon("Microscope", [
  ["path", { d: "M6 18h8", key: "1borvv" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M14 22a7 7 0 1 0 0-14h-1", key: "1jwaiy" }],
  ["path", { d: "M9 14h2", key: "197e7h" }],
  ["path", { d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z", key: "1bmzmy" }],
  ["path", { d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3", key: "1drr47" }]
]);

// node_modules/lucide-react/dist/esm/icons/milestone.js
var Milestone = createLucideIcon("Milestone", [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M12 3v3", key: "1n5kay" }],
  [
    "path",
    {
      d: "M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z",
      key: "1btarq"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/moon.js
var Moon = createLucideIcon("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);

// node_modules/lucide-react/dist/esm/icons/music-2.js
var Music2 = createLucideIcon("Music2", [
  ["circle", { cx: "8", cy: "18", r: "4", key: "1fc0mg" }],
  ["path", { d: "M12 18V2l7 4", key: "g04rme" }]
]);

// node_modules/lucide-react/dist/esm/icons/package.js
var Package = createLucideIcon("Package", [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["path", { d: "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7", key: "yx3hmr" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
]);

// node_modules/lucide-react/dist/esm/icons/palette.js
var Palette = createLucideIcon("Palette", [
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  [
    "path",
    {
      d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
      key: "12rzf8"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/panels-top-left.js
var PanelsTopLeft = createLucideIcon("PanelsTopLeft", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M9 21V9", key: "1oto5p" }]
]);

// node_modules/lucide-react/dist/esm/icons/pen-tool.js
var PenTool = createLucideIcon("PenTool", [
  [
    "path",
    {
      d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
      key: "nt11vn"
    }
  ],
  [
    "path",
    {
      d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
      key: "15qc1e"
    }
  ],
  ["path", { d: "m2.3 2.3 7.286 7.286", key: "1wuzzi" }],
  ["circle", { cx: "11", cy: "11", r: "2", key: "xmgehs" }]
]);

// node_modules/lucide-react/dist/esm/icons/phone.js
var Phone = createLucideIcon("Phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/plane.js
var Plane = createLucideIcon("Plane", [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/podcast.js
var Podcast = createLucideIcon("Podcast", [
  ["path", { d: "M16.85 18.58a9 9 0 1 0-9.7 0", key: "d71mpg" }],
  ["path", { d: "M8 14a5 5 0 1 1 8 0", key: "fc81rn" }],
  ["circle", { cx: "12", cy: "11", r: "1", key: "1gvufo" }],
  ["path", { d: "M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z", key: "za5kbj" }]
]);

// node_modules/lucide-react/dist/esm/icons/radio.js
var Radio = createLucideIcon("Radio", [
  ["path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9", key: "1vaf9d" }],
  ["path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5", key: "u1ii0m" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5", key: "1j5fej" }],
  ["path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19", key: "10b0cb" }]
]);

// node_modules/lucide-react/dist/esm/icons/receipt.js
var Receipt = createLucideIcon("Receipt", [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
]);

// node_modules/lucide-react/dist/esm/icons/rocket.js
var Rocket = createLucideIcon("Rocket", [
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      key: "m3kijz"
    }
  ],
  [
    "path",
    {
      d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
      key: "1fmvmk"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" }],
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }]
]);

// node_modules/lucide-react/dist/esm/icons/scale.js
var Scale = createLucideIcon("Scale", [
  ["path", { d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "7g6ntu" }],
  ["path", { d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "ijws7r" }],
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2", key: "3gwbw2" }]
]);

// node_modules/lucide-react/dist/esm/icons/scan-line.js
var ScanLine = createLucideIcon("ScanLine", [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }]
]);

// node_modules/lucide-react/dist/esm/icons/search.js
var Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);

// node_modules/lucide-react/dist/esm/icons/send.js
var Send = createLucideIcon("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
]);

// node_modules/lucide-react/dist/esm/icons/server.js
var Server = createLucideIcon("Server", [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
]);

// node_modules/lucide-react/dist/esm/icons/settings-2.js
var Settings2 = createLucideIcon("Settings2", [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
]);

// node_modules/lucide-react/dist/esm/icons/share-2.js
var Share2 = createLucideIcon("Share2", [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
]);

// node_modules/lucide-react/dist/esm/icons/shield-check.js
var ShieldCheck = createLucideIcon("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);

// node_modules/lucide-react/dist/esm/icons/shopping-bag.js
var ShoppingBag = createLucideIcon("ShoppingBag", [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
]);

// node_modules/lucide-react/dist/esm/icons/sigma.js
var Sigma = createLucideIcon("Sigma", [
  [
    "path",
    {
      d: "M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",
      key: "wuwx1p"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js
var SlidersHorizontal = createLucideIcon("SlidersHorizontal", [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
]);

// node_modules/lucide-react/dist/esm/icons/sparkles.js
var Sparkles = createLucideIcon("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);

// node_modules/lucide-react/dist/esm/icons/square-terminal.js
var SquareTerminal = createLucideIcon("SquareTerminal", [
  ["path", { d: "m7 11 2-2-2-2", key: "1lz0vl" }],
  ["path", { d: "M11 13h4", key: "1p7l4v" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }]
]);

// node_modules/lucide-react/dist/esm/icons/star.js
var Star = createLucideIcon("Star", [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/store.js
var Store = createLucideIcon("Store", [
  ["path", { d: "m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7", key: "ztvudi" }],
  ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", key: "1b2hhj" }],
  ["path", { d: "M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4", key: "2ebpfo" }],
  ["path", { d: "M2 7h20", key: "1fcdvo" }],
  [
    "path",
    {
      d: "M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7",
      key: "6c3vgh"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/sun.js
var Sun = createLucideIcon("Sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
]);

// node_modules/lucide-react/dist/esm/icons/table-2.js
var Table2 = createLucideIcon("Table2", [
  [
    "path",
    {
      d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
      key: "gugj83"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/target.js
var Target = createLucideIcon("Target", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
]);

// node_modules/lucide-react/dist/esm/icons/timer.js
var Timer = createLucideIcon("Timer", [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
]);

// node_modules/lucide-react/dist/esm/icons/trending-up.js
var TrendingUp = createLucideIcon("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);

// node_modules/lucide-react/dist/esm/icons/truck.js
var Truck = createLucideIcon("Truck", [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
]);

// node_modules/lucide-react/dist/esm/icons/users.js
var Users = createLucideIcon("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);

// node_modules/lucide-react/dist/esm/icons/utensils.js
var Utensils = createLucideIcon("Utensils", [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
]);

// node_modules/lucide-react/dist/esm/icons/video.js
var Video = createLucideIcon("Video", [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
]);

// node_modules/lucide-react/dist/esm/icons/wallet-cards.js
var WalletCards = createLucideIcon("WalletCards", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2", key: "4125el" }],
  [
    "path",
    {
      d: "M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21",
      key: "1dpki6"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/workflow.js
var Workflow = createLucideIcon("Workflow", [
  ["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2", key: "by2w9f" }],
  ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4", key: "xkn7yn" }],
  ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2", key: "1cgmvn" }]
]);

// node_modules/lucide-react/dist/esm/icons/wrench.js
var Wrench = createLucideIcon("Wrench", [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi"
    }
  ]
]);

// node_modules/lucide-react/dist/esm/icons/zap.js
var Zap = createLucideIcon("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]);

// src/client/index.tsx
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/icon-library.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ICON_CATEGORIES = ["\u5DE5\u4F5C", "\u6570\u636E", "\u5F00\u53D1", "\u521B\u4F5C", "\u6C9F\u901A", "\u5546\u52A1", "\u751F\u6D3B", "\u5DE5\u5177", "\u77E5\u8BC6", "\u6807\u8BC6"];
var icon = (id, label, category, keywords, component) => ({ id, label, category, keywords: `${label} ${category} ${keywords}`.toLowerCase(), component });
var PROJECT_ICONS = [
  icon("briefcase", "\u516C\u6587\u5305", "\u5DE5\u4F5C", "\u5DE5\u4F5C \u9879\u76EE office work", Briefcase),
  icon("kanban", "\u770B\u677F", "\u5DE5\u4F5C", "\u4EFB\u52A1 \u7BA1\u7406 kanban board", FolderKanban),
  icon("todo", "\u5F85\u529E", "\u5DE5\u4F5C", "\u6E05\u5355 \u4EFB\u52A1 todo checklist", ListTodo),
  icon("calendar", "\u65E5\u5386", "\u5DE5\u4F5C", "\u65E5\u671F \u8BA1\u5212 calendar schedule", CalendarDays),
  icon("clipboard", "\u68C0\u67E5", "\u5DE5\u4F5C", "\u5BA1\u6838 \u5B8C\u6210 clipboard check", ClipboardCheck),
  icon("target", "\u76EE\u6807", "\u5DE5\u4F5C", "\u76EE\u6807 \u7EE9\u6548 target goal", Target),
  icon("milestone", "\u91CC\u7A0B\u7891", "\u5DE5\u4F5C", "\u8282\u70B9 \u8DEF\u7EBF milestone roadmap", Milestone),
  icon("workflow", "\u6D41\u7A0B", "\u5DE5\u4F5C", "\u81EA\u52A8\u5316 \u6D41\u7A0B workflow automation", Workflow),
  icon("users", "\u56E2\u961F", "\u5DE5\u4F5C", "\u6210\u5458 \u4EBA\u5458 users team", Users),
  icon("building", "\u7EC4\u7EC7", "\u5DE5\u4F5C", "\u516C\u53F8 \u90E8\u95E8 building organization", Building2),
  icon("bar-chart", "\u67F1\u72B6\u56FE", "\u6570\u636E", "\u62A5\u8868 \u6307\u6807 chart analytics", ChartColumn),
  icon("line-chart", "\u8D8B\u52BF\u56FE", "\u6570\u636E", "\u8D8B\u52BF \u66F2\u7EBF line chart", ChartLine),
  icon("pie-chart", "\u997C\u56FE", "\u6570\u636E", "\u5360\u6BD4 \u5206\u5E03 pie chart", ChartPie),
  icon("database", "\u6570\u636E\u5E93", "\u6570\u636E", "\u5B58\u50A8 sql database", Database),
  icon("table", "\u6570\u636E\u8868", "\u6570\u636E", "\u8868\u683C spreadsheet table", Table2),
  icon("gauge", "\u4EEA\u8868\u76D8", "\u6570\u636E", "\u76D1\u63A7 dashboard gauge", Gauge),
  icon("activity", "\u6D3B\u52A8", "\u6570\u636E", "\u76D1\u6D4B \u6CE2\u5F62 activity monitor", Activity),
  icon("trending", "\u589E\u957F", "\u6570\u636E", "\u4E0A\u5347 \u4E1A\u7EE9 trending growth", TrendingUp),
  icon("binary", "\u4E8C\u8FDB\u5236", "\u6570\u636E", "\u6570\u5B57 \u7F16\u7801 binary", Binary),
  icon("sigma", "\u7EDF\u8BA1", "\u6570\u636E", "\u6570\u5B66 \u6C47\u603B sigma statistics", Sigma),
  icon("code", "\u4EE3\u7801", "\u5F00\u53D1", "\u7F16\u7A0B source code", CodeXml),
  icon("terminal", "\u7EC8\u7AEF", "\u5F00\u53D1", "\u547D\u4EE4\u884C shell terminal", SquareTerminal),
  icon("git-branch", "\u5206\u652F", "\u5F00\u53D1", "\u7248\u672C git branch", GitBranch),
  icon("braces", "\u63A5\u53E3", "\u5F00\u53D1", "json api braces", Braces),
  icon("bug", "\u7F3A\u9677", "\u5F00\u53D1", "\u95EE\u9898 \u8C03\u8BD5 bug debug", Bug),
  icon("cpu", "\u8BA1\u7B97", "\u5F00\u53D1", "\u82AF\u7247 \u5904\u7406\u5668 cpu compute", Cpu),
  icon("server", "\u670D\u52A1\u5668", "\u5F00\u53D1", "\u540E\u7AEF \u4E3B\u673A server backend", Server),
  icon("cloud", "\u4E91\u670D\u52A1", "\u5F00\u53D1", "\u4E91\u7AEF cloud service", Cloud),
  icon("globe", "\u7F51\u7AD9", "\u5F00\u53D1", "\u7F51\u9875 \u7F51\u7EDC globe web", Earth),
  icon("boxes", "\u6A21\u5757", "\u5F00\u53D1", "\u7EC4\u4EF6 package module", Boxes),
  icon("palette", "\u8C03\u8272\u677F", "\u521B\u4F5C", "\u8BBE\u8BA1 \u989C\u8272 palette design", Palette),
  icon("pen-tool", "\u94A2\u7B14", "\u521B\u4F5C", "\u77E2\u91CF \u7ED8\u56FE pen vector", PenTool),
  icon("brush", "\u753B\u7B14", "\u521B\u4F5C", "\u7ED8\u753B \u7F8E\u672F brush art", Brush),
  icon("image", "\u56FE\u7247", "\u521B\u4F5C", "\u7167\u7247 \u56FE\u50CF image photo", Image),
  icon("camera", "\u76F8\u673A", "\u521B\u4F5C", "\u6444\u5F71 \u62CD\u6444 camera photo", Camera),
  icon("video", "\u89C6\u9891", "\u521B\u4F5C", "\u5F71\u7247 \u526A\u8F91 video film", Video),
  icon("music", "\u97F3\u4E50", "\u521B\u4F5C", "\u97F3\u9891 \u6B4C\u66F2 music audio", Music2),
  icon("microphone", "\u5F55\u97F3", "\u521B\u4F5C", "\u8BED\u97F3 \u9EA6\u514B\u98CE microphone voice", MicVocal),
  icon("sparkles", "\u7075\u611F", "\u521B\u4F5C", "ai \u521B\u610F sparkle idea", Sparkles),
  icon("lightbulb", "\u521B\u610F", "\u521B\u4F5C", "\u60F3\u6CD5 \u706F\u6CE1 lightbulb idea", Lightbulb),
  icon("mail", "\u90AE\u4EF6", "\u6C9F\u901A", "\u90AE\u7BB1 email mail", Mail),
  icon("message", "\u6D88\u606F", "\u6C9F\u901A", "\u804A\u5929 message chat", MessageCircle),
  icon("messages", "\u8BA8\u8BBA", "\u6C9F\u901A", "\u5BF9\u8BDD \u7FA4\u804A messages discussion", MessagesSquare),
  icon("phone", "\u7535\u8BDD", "\u6C9F\u901A", "\u8054\u7CFB \u547C\u53EB phone call", Phone),
  icon("send", "\u53D1\u9001", "\u6C9F\u901A", "\u6295\u9012 send paper plane", Send),
  icon("bell", "\u901A\u77E5", "\u6C9F\u901A", "\u63D0\u9192 bell notification", Bell),
  icon("at-sign", "\u8D26\u53F7", "\u6C9F\u901A", "\u63D0\u53CA \u7528\u6237 at account", AtSign),
  icon("share", "\u5206\u4EAB", "\u6C9F\u901A", "\u534F\u4F5C share collaboration", Share2),
  icon("radio", "\u5E7F\u64AD", "\u6C9F\u901A", "\u4FE1\u53F7 radio broadcast", Radio),
  icon("podcast", "\u64AD\u5BA2", "\u6C9F\u901A", "\u8282\u76EE podcast audio", Podcast),
  icon("shopping-bag", "\u5546\u54C1", "\u5546\u52A1", "\u8D2D\u7269 \u4EA7\u54C1 shopping product", ShoppingBag),
  icon("store", "\u5546\u5E97", "\u5546\u52A1", "\u95E8\u5E97 \u7535\u5546 store shop", Store),
  icon("credit-card", "\u652F\u4ED8", "\u5546\u52A1", "\u4FE1\u7528\u5361 payment card", CreditCard),
  icon("wallet", "\u94B1\u5305", "\u5546\u52A1", "\u8D22\u52A1 \u8D26\u6237 wallet finance", WalletCards),
  icon("receipt", "\u8BA2\u5355", "\u5546\u52A1", "\u5C0F\u7968 \u8D26\u5355 receipt order", Receipt),
  icon("dollar", "\u8425\u6536", "\u5546\u52A1", "\u91D1\u989D \u6536\u5165 dollar revenue", BadgeDollarSign),
  icon("landmark", "\u91D1\u878D", "\u5546\u52A1", "\u94F6\u884C \u673A\u6784 finance bank", Landmark),
  icon("scale", "\u6CD5\u52A1", "\u5546\u52A1", "\u6CD5\u5F8B \u5408\u89C4 scale legal", Scale),
  icon("package", "\u5305\u88F9", "\u5546\u52A1", "\u5E93\u5B58 \u7269\u6D41 package inventory", Package),
  icon("truck", "\u8FD0\u8F93", "\u5546\u52A1", "\u914D\u9001 \u7269\u6D41 truck delivery", Truck),
  icon("home", "\u5BB6\u5EAD", "\u751F\u6D3B", "\u4F4F\u5B85 home house", House),
  icon("heart", "\u5065\u5EB7", "\u751F\u6D3B", "\u559C\u6B22 \u5173\u7231 heart health", Heart),
  icon("coffee", "\u5496\u5561", "\u751F\u6D3B", "\u4F11\u606F \u996E\u54C1 coffee break", Coffee),
  icon("utensils", "\u9910\u996E", "\u751F\u6D3B", "\u98DF\u7269 \u9910\u5385 food restaurant", Utensils),
  icon("dumbbell", "\u8FD0\u52A8", "\u751F\u6D3B", "\u5065\u8EAB exercise fitness", Dumbbell),
  icon("plane", "\u65C5\u884C", "\u751F\u6D3B", "\u822A\u73ED \u51FA\u884C plane travel", Plane),
  icon("map-pin", "\u5730\u70B9", "\u751F\u6D3B", "\u4F4D\u7F6E \u5730\u56FE location map", MapPin),
  icon("sun", "\u5929\u6C14", "\u751F\u6D3B", "\u767D\u5929 \u6674\u5929 sun weather", Sun),
  icon("moon", "\u591C\u95F4", "\u751F\u6D3B", "\u6DF1\u8272 \u7761\u7720 moon night", Moon),
  icon("leaf", "\u81EA\u7136", "\u751F\u6D3B", "\u73AF\u4FDD \u690D\u7269 leaf nature", Leaf),
  icon("settings", "\u8BBE\u7F6E", "\u5DE5\u5177", "\u914D\u7F6E settings preferences", Settings2),
  icon("wrench", "\u7EF4\u62A4", "\u5DE5\u5177", "\u4FEE\u7406 wrench maintenance", Wrench),
  icon("hammer", "\u6784\u5EFA", "\u5DE5\u5177", "\u5236\u4F5C build hammer", Hammer),
  icon("key", "\u5BC6\u94A5", "\u5DE5\u5177", "\u6743\u9650 key access", KeyRound),
  icon("lock", "\u5B89\u5168", "\u5DE5\u5177", "\u9690\u79C1 \u9501 lock security", LockKeyhole),
  icon("shield", "\u4FDD\u62A4", "\u5DE5\u5177", "\u9A8C\u8BC1 \u9632\u62A4 shield secure", ShieldCheck),
  icon("search", "\u641C\u7D22", "\u5DE5\u5177", "\u67E5\u627E search find", Search),
  icon("filter", "\u7B5B\u9009", "\u5DE5\u5177", "\u8FC7\u6EE4 filter sort", Filter),
  icon("sliders", "\u8C03\u8282", "\u5DE5\u5177", "\u63A7\u5236 \u53C2\u6570 sliders controls", SlidersHorizontal),
  icon("scan", "\u626B\u63CF", "\u5DE5\u5177", "\u8BC6\u522B scan capture", ScanLine),
  icon("flask", "\u5B9E\u9A8C", "\u77E5\u8BC6", "\u5316\u5B66 \u7814\u7A76 flask science", FlaskConical),
  icon("microscope", "\u663E\u5FAE\u955C", "\u77E5\u8BC6", "\u79D1\u7814 microscope research", Microscope),
  icon("dna", "\u751F\u547D\u79D1\u5B66", "\u77E5\u8BC6", "\u57FA\u56E0 \u751F\u7269 dna biology", Dna),
  icon("atom", "\u7269\u7406", "\u77E5\u8BC6", "\u539F\u5B50 \u79D1\u5B66 atom physics", Atom),
  icon("brain", "\u667A\u80FD", "\u77E5\u8BC6", "\u5927\u8111 ai brain intelligence", BrainCircuit),
  icon("book", "\u4E66\u7C4D", "\u77E5\u8BC6", "\u9605\u8BFB \u6587\u6863 book reading", BookOpen),
  icon("graduation", "\u6559\u80B2", "\u77E5\u8BC6", "\u5B66\u4E60 \u5B66\u4F4D graduation education", GraduationCap),
  icon("library", "\u77E5\u8BC6\u5E93", "\u77E5\u8BC6", "\u8D44\u6599 library knowledge", Library),
  icon("file-text", "\u6587\u6863", "\u77E5\u8BC6", "\u6587\u7AE0 \u6587\u4EF6 document text", FileText),
  icon("languages", "\u8BED\u8A00", "\u77E5\u8BC6", "\u7FFB\u8BD1 \u591A\u8BED\u8A00 languages translation", Languages),
  icon("rocket", "\u706B\u7BAD", "\u6807\u8BC6", "\u542F\u52A8 \u63A2\u7D22 rocket launch", Rocket),
  icon("zap", "\u95EA\u7535", "\u6807\u8BC6", "\u5FEB\u901F \u80FD\u91CF zap lightning", Zap),
  icon("star", "\u661F\u6807", "\u6807\u8BC6", "\u6536\u85CF \u91CD\u70B9 star favorite", Star),
  icon("gem", "\u5B9D\u77F3", "\u6807\u8BC6", "\u7CBE\u54C1 \u73CD\u8D35 gem premium", Gem),
  icon("crown", "\u7687\u51A0", "\u6807\u8BC6", "\u9AD8\u7EA7 \u9886\u5148 crown", Crown),
  icon("flag", "\u65D7\u5E1C", "\u6807\u8BC6", "\u6807\u8BB0 \u76EE\u6807 flag marker", Flag),
  icon("compass", "\u6307\u5357\u9488", "\u6807\u8BC6", "\u5BFC\u822A \u65B9\u5411 compass navigation", Compass),
  icon("clock", "\u65F6\u949F", "\u6807\u8BC6", "\u65F6\u95F4 \u8BA1\u5212 clock time", Clock3),
  icon("timer", "\u8BA1\u65F6\u5668", "\u6807\u8BC6", "\u5012\u8BA1\u65F6 timer stopwatch", Timer),
  icon("help", "\u5E2E\u52A9", "\u6807\u8BC6", "\u95EE\u9898 \u652F\u6301 help question", CircleHelp)
];
function PresetProjectIcon({ id, size }) {
  const preset = PROJECT_ICONS.find((item) => item.id === id);
  if (preset === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size, strokeWidth: 1.8 });
  const Component = preset.component;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { size, strokeWidth: 1.8 });
}

// src/client/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var STORAGE_KEY = "dsh.personal-studio.projects.v1";
var THEME_KEY = "dsh.personal-studio.theme.v1";
var BRAND_KEY = "dsh.personal-studio.brand.v1";
var DEFAULT_BRAND = { name: "DSH Personal Studio", tagline: "\u4E2A\u4EBA\u667A\u80FD\u5DE5\u4F5C\u7A7A\u95F4", logo: "" };
function loadProjects() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.map((item) => ({
      id: String(item.id ?? projectId()),
      name: String(item.name ?? "\u672A\u547D\u540D\u9879\u76EE"),
      icon: typeof item.icon === "string" ? item.icon : "",
      layout: "single",
      kind: item.kind === "generated" ? "generated" : "attached",
      workspaceId: String(item.workspaceId ?? ""),
      path: String(item.path ?? ""),
      panes: ["overview"],
      paneSources: Array.isArray(item.paneSources) ? item.paneSources.map(String) : [],
      sections: Array.isArray(item.sections) && item.sections.length > 0 ? item.sections.map((section) => ({
        id: String(section.id ?? projectId()),
        name: String(section.name ?? "\u9879\u76EE\u5206\u533A"),
        workspaceId: String(section.workspaceId ?? item.workspaceId ?? ""),
        path: String(section.path ?? item.path ?? "")
      })).filter((section) => section.workspaceId !== "" && section.path !== "") : [{ id: projectId(), name: "\u4E3B\u9879\u76EE", workspaceId: String(item.workspaceId ?? ""), path: String(item.path ?? "") }],
      data: {
        kind: ["project-files", "sqlite", "http"].includes(item.data?.kind) ? item.data.kind : "project-files",
        location: String(item.data?.location ?? ""),
        readOnly: item.data?.readOnly !== false
      },
      aiMode: item.aiMode === "build" ? "build" : "analyze",
      sessions: item.sessions && typeof item.sessions === "object" ? item.sessions : {}
    })).filter((item) => item.workspaceId !== "" && item.path !== "");
  } catch {
    return [];
  }
}
function loadBrand() {
  try {
    const value = JSON.parse(localStorage.getItem(BRAND_KEY) ?? "null");
    if (value === null || typeof value !== "object") return DEFAULT_BRAND;
    return {
      name: String(value.name ?? DEFAULT_BRAND.name),
      tagline: String(value.tagline ?? DEFAULT_BRAND.tagline),
      logo: typeof value.logo === "string" ? value.logo : ""
    };
  } catch {
    return DEFAULT_BRAND;
  }
}
function loadTheme() {
  if (document.body.hasAttribute("data-ds-dark-theme")) return "dark";
  return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
}
var snapshot = { projects: loadProjects(), activeId: null, theme: loadTheme(), brand: loadBrand() };
var listeners = /* @__PURE__ */ new Set();
function commit(next) {
  snapshot = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next.projects));
  localStorage.setItem(THEME_KEY, next.theme);
  localStorage.setItem(BRAND_KEY, JSON.stringify(next.brand));
  listeners.forEach((listener) => {
    listener();
  });
}
var studio = {
  subscribe(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot() {
    return snapshot;
  },
  setActive(activeId) {
    commit({ ...snapshot, activeId });
  },
  setTheme(theme) {
    commit({ ...snapshot, theme });
  },
  setBrand(brand) {
    commit({ ...snapshot, brand });
  },
  add(project) {
    commit({ ...snapshot, projects: [...snapshot.projects, project], activeId: project.id });
  },
  update(project) {
    commit({ ...snapshot, projects: snapshot.projects.map((item) => item.id === project.id ? project : item) });
  },
  remove(id) {
    commit({
      ...snapshot,
      projects: snapshot.projects.filter((project) => project.id !== id),
      activeId: snapshot.activeId === id ? null : snapshot.activeId
    });
  }
};
function useStudio() {
  return (0, import_react3.useSyncExternalStore)(studio.subscribe, studio.getSnapshot, studio.getSnapshot);
}
function projectId() {
  return globalThis.crypto?.randomUUID?.() ?? `project-${Date.now()}`;
}
function paneCount(layout) {
  if (layout === "single") return 1;
  if (layout === "triple") return 3;
  return 2;
}
async function launchProjectPreview(path) {
  const response = await fetch("/api/personal-studio/launch", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ path })
  });
  const value = await response.json();
  if (!response.ok) {
    throw new Error(typeof value.error === "string" ? value.error : "\u65E0\u6CD5\u542F\u52A8\u9879\u76EE\u9884\u89C8");
  }
  if (value.kind === "workspace") return { status: "workspace" };
  if (value.kind === "web" && typeof value.url === "string") return { status: "ready", url: value.url };
  throw new Error("\u65E0\u6CD5\u8BC6\u522B\u9879\u76EE\u542F\u52A8\u65B9\u5F0F");
}
async function createProjectDirectory(parentPath, name) {
  const response = await fetch("/api/personal-studio/create-directory", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ parentPath, name })
  });
  const value = await response.json();
  if (!response.ok || typeof value.path !== "string") {
    throw new Error(typeof value.error === "string" ? value.error : "\u65E0\u6CD5\u521B\u5EFA\u9879\u76EE\u76EE\u5F55");
  }
  return value.path;
}
var dshBridge = null;
function listWorkspaces() {
  try {
    const items = dshBridge?.workspaces?.list?.getSnapshot?.()?.items ?? [];
    return items.map((item) => ({
      id: String(item.workspaceId ?? item.id ?? ""),
      title: String(item.title ?? item.path ?? "\u672A\u547D\u540D\u5DE5\u4F5C\u533A"),
      path: String(item.path ?? "")
    })).filter((item) => item.id && item.path);
  } catch {
    return [];
  }
}
async function promptIntoSession(sessionId, text) {
  const bridge = dshBridge;
  if (bridge === null) throw new Error("AI \u4F1A\u8BDD\u670D\u52A1\u4E0D\u53EF\u7528");
  let session = null;
  for (let attempt = 0; attempt < 10; attempt += 1) {
    session = bridge.sessions?.binding?.(sessionId)?.session ?? null;
    if (session !== null) break;
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
  }
  if (session !== null && typeof bridge.conversation?.sendSession === "function") {
    await bridge.conversation.sendSession(session, text, [], "queue");
    return;
  }
  if (session !== null && typeof session.prompt === "function") {
    const result = await session.prompt([{ type: "text", text }], "queue");
    if (result?.ok !== false) return;
  }
  throw new Error("\u65E0\u6CD5\u8FDE\u63A5\u9879\u76EE AI \u4F1A\u8BDD");
}
function modePrompt(project, mode) {
  const sections = project.sections.map((section) => `- ${section.name}: ${section.path}`).join("\n");
  const data = project.data.kind === "project-files" ? "\u9879\u76EE\u6587\u4EF6\u4E0E\u4EA7\u7269\u76EE\u5F55" : `${project.data.kind.toUpperCase()}\uFF1A${project.data.location || "\u5C1A\u672A\u914D\u7F6E\u5730\u5740"}`;
  const boundary = `\u9879\u76EE\u540D\u79F0\uFF1A${project.name}
\u9879\u76EE\u6839\u76EE\u5F55\uFF1A${project.path}
\u9879\u76EE\u5206\u533A\uFF1A
${sections}
\u6570\u636E\u63A5\u53E3\uFF1A${data}
\u6570\u636E\u6743\u9650\uFF1A${project.data.readOnly ? "\u53EA\u8BFB" : "\u5141\u8BB8\u5199\u5165"}`;
  if (mode === "analyze") {
    return `\u3010\u9879\u76EE\u5206\u6790\u6A21\u5F0F\u3011
${boundary}
\u8BF7\u628A\u5F53\u524D\u5DE5\u4F5C\u533A\u89C6\u4E3A\u552F\u4E00\u9879\u76EE\u6570\u636E\u8FB9\u754C\u3002\u9ED8\u8BA4\u53EA\u8BFB\u53D6\u9879\u76EE\u6587\u4EF6\u3001\u6570\u636E\u4EA7\u7269\u548C\u7248\u672C\u72B6\u6001\uFF0C\u5148\u4E0D\u8981\u4FEE\u6539\u6587\u4EF6\u3002\u4F60\u53EF\u4EE5\u4E3A\u6211\u603B\u7ED3\u3001\u5206\u6790\u3001\u6838\u5BF9\u548C\u5F62\u6210\u62A5\u544A\u3002\u8BF7\u7B80\u77ED\u786E\u8BA4\u5DF2\u8FDB\u5165\u5206\u6790\u6A21\u5F0F\u3002`;
  }
  return `\u3010\u9879\u76EE\u6784\u5EFA\u6A21\u5F0F\u3011
${boundary}
\u8BF7\u628A\u5F53\u524D\u5DE5\u4F5C\u533A\u89C6\u4E3A\u552F\u4E00\u9879\u76EE\u6570\u636E\u8FB9\u754C\u3002\u4F60\u53EF\u4EE5\u6309\u6211\u7684\u540E\u7EED\u8981\u6C42\u751F\u6210\u65B0\u9879\u76EE\uFF0C\u6216\u4FEE\u6539\u5DF2\u63A5\u5165\u9879\u76EE\uFF1B\u52A8\u624B\u524D\u5148\u68C0\u67E5\u73B0\u6709\u7ED3\u6784\uFF0C\u6240\u6709\u5199\u5165\u4EC5\u9650\u6B64\u76EE\u5F55\u3002\u8BF7\u7B80\u77ED\u786E\u8BA4\u5DF2\u8FDB\u5165\u6784\u5EFA\u6A21\u5F0F\u3002`;
}
async function openProjectMode(project, mode) {
  if (dshBridge === null || typeof dshBridge.sessions?.create !== "function") return project;
  let sessionId = project.sessions[mode];
  if (!sessionId) {
    sessionId = await dshBridge.sessions.create({ workspaceId: project.workspaceId });
    const next2 = { ...project, aiMode: mode, sessions: { ...project.sessions, [mode]: sessionId } };
    studio.update(next2);
    await dshBridge.sessions.open?.(sessionId);
    await promptIntoSession(sessionId, modePrompt(next2, mode));
    return next2;
  }
  const next = { ...project, aiMode: mode };
  studio.update(next);
  await dshBridge.sessions.open?.(sessionId);
  return next;
}
var styles = String.raw`
:root {
  --studio-ink: #edf5ff;
  --studio-muted: #7f93aa;
  --studio-dim: #41556a;
  --studio-blue: #4ba8ff;
  --studio-blue-soft: rgba(75,168,255,.16);
  --studio-orange: #ff9d5c;
  --studio-field: #03080d;
  --studio-panel: rgba(7,16,26,.94);
}

html[data-dsh-studio-active] body {
  background: var(--studio-field) !important;
}

[data-dsh-studio-sidebar-root] {
  position: relative;
  background: #050b12 !important;
  border-right-color: rgba(91,147,190,.12) !important;
}

[data-dsh-studio-native-region] {
  min-height: 42px !important;
  transition: flex-basis 260ms cubic-bezier(.2,.8,.2,1), opacity 180ms ease;
}

html[data-dsh-studio-active] [data-dsh-studio-native-region] {
  flex: 0 0 42px !important;
  overflow: hidden !important;
  opacity: .74;
  cursor: pointer;
}

.dsh-studio-sidebar {
  color: var(--studio-ink);
  font-family: var(--studio-font-text);
  padding: 2px 0 6px;
  user-select: none;
}

html[data-dsh-studio-active] [data-dsh-studio-foot-area] {
  flex: 1 1 auto !important;
  min-height: 0 !important;
}

html[data-dsh-studio-active] [data-dsh-studio-footer-actions] {
  flex: 1 1 auto !important;
  min-height: 0 !important;
  align-items: flex-start;
}

.dsh-studio-section-head {
  height: 38px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  border-radius: 9px;
  color: #b7c8d9;
  cursor: default;
}

.dsh-studio-section-head:hover { background: rgba(112,163,204,.07); }
.dsh-studio-section-head strong { flex: 1; font-size: 13px; font-weight: 560; letter-spacing: .01em; }
.dsh-studio-section-head .hint { color: #52687d; font-size: 10px; }
.dsh-studio-theme-button {
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #758b9f;
  cursor: pointer;
}
.dsh-studio-theme-button:hover { background: rgba(91,151,197,.12); color: #d8edff; }

.dsh-studio-projects {
  display: grid;
  gap: 4px;
  padding: 4px 4px 2px;
  max-height: min(40vh, 360px);
  overflow: auto;
}

.dsh-studio-empty {
  margin: 5px 5px 2px;
  padding: 18px 12px;
  border: 1px dashed rgba(93,137,173,.18);
  border-radius: 12px;
  color: #53687d;
  font-size: 11px;
  line-height: 1.6;
  text-align: center;
}

.dsh-studio-project-row {
  position: relative;
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #9eb1c4;
  text-align: left;
  cursor: pointer;
}

.dsh-studio-project-row:hover { background: rgba(89,146,190,.08); color: #dfefff; }
.dsh-studio-project-row.active {
  background: rgba(56,128,187,.13);
  color: #edf7ff;
  box-shadow: inset 2px 0 0 #4ba8ff;
}
.dsh-studio-project-row span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsh-studio-project-row small { margin-left: auto; color: #526a80; font-size: 9px; text-transform: uppercase; }

.dsh-studio-rail-button {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #93a9bc;
}
.dsh-studio-rail-button:hover { background: rgba(112,163,204,.1); }

.dsh-studio-menu {
  position: fixed;
  z-index: 180;
  min-width: 168px;
  padding: 6px;
  border: 1px solid rgba(105,162,206,.18);
  border-radius: 12px;
  background: rgba(7,16,26,.98);
  box-shadow: 0 18px 50px rgba(0,0,0,.42);
  color: #d8e8f7;
}
.dsh-studio-menu button {
  width: 100%;
  height: 34px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.dsh-studio-menu button:hover { background: rgba(76,154,214,.12); }
.dsh-studio-menu button.danger { color: #ff8f91; }

.dsh-studio-dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  background: rgba(0,3,7,.56);
  backdrop-filter: blur(8px);
}
.dsh-studio-dialog {
  width: min(430px, calc(100vw - 40px));
  padding: 22px;
  border: 1px solid rgba(100,165,214,.2);
  border-radius: 18px;
  background: #07111b;
  box-shadow: 0 30px 90px rgba(0,0,0,.58);
  color: var(--studio-ink);
}
.dsh-studio-dialog-head { display: flex; align-items: center; margin-bottom: 20px; }
.dsh-studio-dialog-head h2 { flex: 1; margin: 0; font-size: 17px; font-weight: 600; }
.dsh-studio-icon-button { width: 30px; height: 30px; display: grid; place-items: center; border: 0; border-radius: 50%; background: transparent; color: #8196a9; cursor: pointer; }
.dsh-studio-icon-button:hover { background: rgba(95,158,207,.1); color: #d9edff; }
.dsh-studio-field { display: grid; gap: 7px; margin: 14px 0; }
.dsh-studio-field label { color: #8297aa; font-size: 11px; }
.dsh-studio-field input, .dsh-studio-field select {
  height: 40px;
  box-sizing: border-box;
  padding: 0 12px;
  border: 1px solid rgba(101,153,193,.18);
  border-radius: 10px;
  outline: 0;
  background: #050c14;
  color: #e6f3ff;
  font: inherit;
}
.dsh-studio-field input:focus, .dsh-studio-field select:focus { border-color: #4ba8ff; box-shadow: 0 0 0 3px rgba(75,168,255,.1); }
.dsh-studio-folder-button { height: 36px; display: flex; align-items: center; justify-content: center; gap: 7px; border: 1px solid rgba(101,153,193,.14); border-radius: 9px; background: rgba(77,137,183,.08); color: #94acc0; font: inherit; font-size: 11px; cursor: pointer; }
.dsh-studio-folder-button:hover { border-color: rgba(75,168,255,.3); background: rgba(75,168,255,.11); color: #c8e2f6; }
.dsh-studio-folder-button:disabled { opacity: .45; cursor: default; }
.dsh-studio-dialog-actions { display: flex; justify-content: flex-end; gap: 9px; margin-top: 20px; }
.dsh-studio-button { height: 36px; padding: 0 15px; border: 0; border-radius: 10px; background: rgba(91,145,185,.12); color: #bbcede; cursor: pointer; }
.dsh-studio-button.primary { background: var(--studio-orange); color: #1d0e04; font-weight: 650; }
.dsh-studio-button:disabled { opacity: .35; cursor: default; }
.dsh-studio-project-binding { display: grid; gap: 6px; margin: 14px 0; padding: 11px 12px; border-radius: 10px; background: rgba(76,143,194,.08); }
.dsh-studio-project-binding span { color: #71879a; font-size: 10px; }
.dsh-studio-project-binding strong { overflow: hidden; color: #c5d9e9; font-size: 11px; font-weight: 520; text-overflow: ellipsis; white-space: nowrap; }
.dsh-studio-dialog-error { margin-top: 10px; color: #ff999b; font-size: 11px; line-height: 1.5; }

.dsh-studio-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 36;
  overflow: hidden;
  background: var(--studio-field);
  color: var(--studio-ink);
  font-family: var(--studio-font-text);
}
.dsh-studio-grid { position: absolute; inset: 0; width: 100%; height: 100%; opacity: .42; pointer-events: none; }
.dsh-studio-topbar {
  position: relative;
  z-index: 2;
  height: 58px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 22px;
  border-bottom: 1px solid rgba(89,146,190,.1);
  background: rgba(3,8,13,.82);
  backdrop-filter: blur(18px);
}
.dsh-studio-topbar .project-mark { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 9px; background: rgba(75,168,255,.12); color: #65b6ff; }
.dsh-studio-topbar h1 { margin: 0; font-size: 14px; font-weight: 590; letter-spacing: .01em; }
.dsh-studio-topbar .path { color: #536b81; font-size: 10px; }
.dsh-studio-topbar-actions { margin-left: auto; display: flex; align-items: center; gap: 9px; }
.dsh-studio-ai-toggle { width: 32px; height: 32px; display: grid; place-items: center; border: 0; border-radius: 8px; background: transparent; color: #71879b; cursor: pointer; }
.dsh-studio-ai-toggle svg { transform: scaleX(-1); }
.dsh-studio-ai-toggle:hover, .dsh-studio-ai-toggle.active { background: rgba(75,168,255,.12); color: #7dc3ff; }

.dsh-studio-stage {
  position: absolute;
  inset: 58px 0 0;
  z-index: 1;
  padding: 18px;
  transition: padding-right 220ms cubic-bezier(.2,.8,.2,1);
}
.dsh-studio-stage.ai-open { padding-right: 404px; }
.dsh-studio-surface { width: 100%; height: 100%; display: flex; overflow: hidden; border-radius: 18px; background: rgba(7,16,26,.7); box-shadow: 0 26px 70px rgba(0,0,0,.2); }
.dsh-studio-surface.vertical { flex-direction: column; }
.dsh-studio-pane { position: relative; width: 100%; height: 100%; min-width: 0; min-height: 0; flex: 1 1 0; overflow: hidden; background: rgba(8,18,28,.78); }
.dsh-studio-pane:nth-of-type(even) { background: rgba(6,15,24,.82); }
.dsh-studio-empty-pane { height: 100%; display: grid; place-items: center; padding: 36px; box-sizing: border-box; }
.dsh-studio-empty-pane-content { width: min(340px, 80%); display: grid; justify-items: center; gap: 13px; color: #60768b; text-align: center; }
.dsh-studio-empty-pane-content .glyph { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 14px; background: rgba(74,156,218,.1); color: #5baff2; }
.dsh-studio-empty-pane-content strong { color: #a7bbcd; font-size: 13px; font-weight: 540; }
.dsh-studio-project-pane { height: 100%; display: grid; align-content: center; justify-items: start; gap: 10px; box-sizing: border-box; padding: clamp(34px, 6vw, 82px); }
.dsh-studio-project-pane .glyph { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 13px; background: rgba(75,168,255,.11); color: #5eb4fb; }
.dsh-studio-project-pane .eyebrow { margin-top: 7px; color: #577086; font-size: 9px; letter-spacing: .14em; text-transform: uppercase; }
.dsh-studio-project-pane strong { color: #bfd2e2; font-size: 17px; font-weight: 570; }
.dsh-studio-project-pane p { max-width: 360px; margin: 0; color: #6f8498; font-size: 11px; line-height: 1.65; }
.dsh-studio-project-pane code { max-width: 100%; overflow: hidden; padding: 6px 9px; border-radius: 7px; background: rgba(91,151,197,.065); color: #7890a5; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 9px; text-overflow: ellipsis; white-space: nowrap; }
.dsh-studio-pane-actions { display: flex; gap: 8px; margin-top: 8px; }
.dsh-studio-pane-actions button { height: 32px; padding: 0 12px; border: 0; border-radius: 9px; background: var(--studio-orange); color: #201006; font-size: 10px; font-weight: 620; cursor: pointer; }
.dsh-studio-divider { position: relative; z-index: 3; flex: 0 0 9px; margin: 0 -4px; cursor: col-resize; }
.vertical > .dsh-studio-divider { cursor: row-resize; }
.dsh-studio-divider::after { content: ""; position: absolute; background: rgba(78,169,237,.05); transition: background 150ms ease; }
.dsh-studio-divider:not(.row)::after { top: 0; bottom: 0; left: 4px; width: 1px; }
.dsh-studio-divider.row::after { left: 0; right: 0; top: 4px; height: 1px; }
.dsh-studio-divider:hover::after { background: rgba(78,169,237,.5); }

html[data-dsh-studio-active] [data-dsh-studio-conversation] {
  position: fixed !important;
  z-index: 84 !important;
  top: 110px !important;
  right: 0 !important;
  bottom: 0 !important;
  left: auto !important;
  width: 386px !important;
  height: auto !important;
  min-width: 320px !important;
  overflow: hidden !important;
  border: 0 !important;
  border-left: 1px solid rgba(96,166,220,.14) !important;
  border-radius: 0 !important;
  background: #07101a !important;
  box-shadow: none !important;
  transition: opacity 150ms ease, transform 200ms cubic-bezier(.2,.8,.2,1) !important;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation][data-studio-open="false"] { opacity: 0 !important; transform: translateX(100%) !important; pointer-events: none !important; }
html[data-dsh-studio-active] [data-dsh-studio-conversation][data-studio-switching="true"] { visibility: hidden !important; transition: none !important; }
.dsh-studio-ai-sidebar {
  position: fixed;
  z-index: 90;
  top: 58px;
  right: 0;
  bottom: 0;
  width: 386px;
  border-left: 1px solid rgba(96,166,220,.14);
  background: #07101a;
  color: #98aec2;
}
.dsh-studio-ai-sidebar-head {
  height: 52px;
  display: flex;
  align-items: center;
  gap: 9px;
  box-sizing: border-box;
  padding: 0 10px 0 15px;
  border-bottom: 1px solid rgba(96,166,220,.1);
}
.dsh-studio-ai-sidebar-head .status { width: 6px; height: 6px; border-radius: 50%; background: #57b1ff; box-shadow: 0 0 9px rgba(87,177,255,.55); }
.dsh-studio-ai-sidebar-head .title { min-width: 0; display: grid; gap: 1px; margin-right: auto; }
.dsh-studio-ai-sidebar-head .title strong { color: #c7d9e9; font-size: 11px; font-weight: 570; }
.dsh-studio-ai-sidebar-head .title span { max-width: 125px; overflow: hidden; color: #62798d; font-size: 9px; text-overflow: ellipsis; white-space: nowrap; }
.dsh-studio-ai-sidebar-head button { border: 0; background: transparent; color: #70869a; cursor: pointer; }
.dsh-studio-ai-sidebar-head button:hover { background: rgba(83,151,203,.1); color: #cae1f4; }
.dsh-studio-ai-sidebar-head .close { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 7px; }
.dsh-studio-ai-modes { display: flex; gap: 2px; padding: 2px; border-radius: 8px; background: rgba(64,113,151,.1); }
.dsh-studio-ai-modes button { height: 24px; padding: 0 9px; border-radius: 6px; color: #6e8498; font-size: 9px; }
.dsh-studio-ai-modes button.active { background: rgba(75,168,255,.16); color: #79c2ff; }

html[data-dsh-studio-theme="light"] {
  color-scheme: light;
  --studio-ink: #182431;
  --studio-muted: #627384;
  --studio-dim: #93a0ad;
  --studio-blue: #1776bc;
  --studio-blue-soft: rgba(23,118,188,.1);
  --studio-orange: #e97832;
  --studio-field: #f3f5f7;
  --studio-panel: rgba(255,255,255,.94);
}

html[data-dsh-studio-theme="light"] body {
  background: #f3f5f7 !important;
}

html[data-dsh-studio-theme="light"] [data-dsh-studio-sidebar-root] {
  background: #f7f8f9 !important;
  border-right-color: rgba(50,78,101,.1) !important;
}

html[data-dsh-studio-theme="light"] .dsh-studio-sidebar { color: #253545; }
html[data-dsh-studio-theme="light"] .dsh-studio-section-head { color: #3f5365; }
html[data-dsh-studio-theme="light"] .dsh-studio-section-head:hover { background: rgba(34,105,157,.055); }
html[data-dsh-studio-theme="light"] .dsh-studio-section-head .hint { color: #94a0ab; }
html[data-dsh-studio-theme="light"] .dsh-studio-theme-button { color: #677b8d; }
html[data-dsh-studio-theme="light"] .dsh-studio-theme-button:hover { background: rgba(34,105,157,.08); color: #1e669b; }
html[data-dsh-studio-theme="light"] .dsh-studio-empty {
  border-color: rgba(45,91,126,.15);
  background: rgba(255,255,255,.42);
  color: #8996a2;
}
html[data-dsh-studio-theme="light"] .dsh-studio-project-row { color: #617386; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-row:hover { background: rgba(29,103,157,.06); color: #243b4e; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-row.active {
  background: rgba(23,118,188,.085);
  color: #153a55;
  box-shadow: inset 2px 0 0 #2889cc;
}
html[data-dsh-studio-theme="light"] .dsh-studio-project-row small { color: #9aa6b0; }
html[data-dsh-studio-theme="light"] .dsh-studio-rail-button { color: #66798b; }
html[data-dsh-studio-theme="light"] .dsh-studio-rail-button:hover { background: rgba(34,105,157,.07); }

html[data-dsh-studio-theme="light"] .dsh-studio-menu {
  border-color: rgba(52,91,121,.14);
  background: rgba(255,255,255,.985);
  box-shadow: 0 18px 50px rgba(33,51,66,.16);
  color: #314657;
}
html[data-dsh-studio-theme="light"] .dsh-studio-menu button:hover { background: rgba(35,111,166,.075); }
html[data-dsh-studio-theme="light"] .dsh-studio-menu button.danger { color: #c95355; }
html[data-dsh-studio-theme="light"] .dsh-studio-dialog-backdrop { background: rgba(66,79,91,.22); }
html[data-dsh-studio-theme="light"] .dsh-studio-dialog {
  border-color: rgba(52,91,121,.14);
  background: #ffffff;
  box-shadow: 0 30px 90px rgba(39,55,68,.2);
  color: #1b2b39;
}
html[data-dsh-studio-theme="light"] .dsh-studio-icon-button { color: #778896; }
html[data-dsh-studio-theme="light"] .dsh-studio-icon-button:hover { background: rgba(35,111,166,.075); color: #285d84; }
html[data-dsh-studio-theme="light"] .dsh-studio-field label { color: #657685; }
html[data-dsh-studio-theme="light"] .dsh-studio-field input,
html[data-dsh-studio-theme="light"] .dsh-studio-field select {
  border-color: rgba(51,87,114,.16);
  background: #f7f8f9;
  color: #243746;
}
html[data-dsh-studio-theme="light"] .dsh-studio-folder-button { border-color: rgba(51,87,114,.13); background: #f7f8f9; color: #607688; }
html[data-dsh-studio-theme="light"] .dsh-studio-folder-button:hover { border-color: rgba(23,118,188,.28); background: rgba(23,118,188,.06); color: #245f89; }
html[data-dsh-studio-theme="light"] .dsh-studio-button { background: #edf1f4; color: #536574; }
html[data-dsh-studio-theme="light"] .dsh-studio-button.primary { background: #e97832; color: #fffaf6; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-binding { background: rgba(35,111,166,.055); }
html[data-dsh-studio-theme="light"] .dsh-studio-project-binding strong { color: #3b5365; }
html[data-dsh-studio-theme="light"] .dsh-studio-dialog-error { color: #c95355; }

html[data-dsh-studio-theme="light"] .dsh-studio-overlay { background: #f3f5f7; color: #182431; }
html[data-dsh-studio-theme="light"] .dsh-studio-grid { opacity: .28; }
html[data-dsh-studio-theme="light"] .dsh-studio-topbar {
  border-bottom-color: rgba(43,83,113,.1);
  background: rgba(248,250,251,.9);
}
html[data-dsh-studio-theme="light"] .dsh-studio-topbar .project-mark { background: rgba(23,118,188,.09); color: #267fbe; }
html[data-dsh-studio-theme="light"] .dsh-studio-topbar .path { color: #8b98a3; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-toggle { color: #6d7f8e; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-toggle:hover,
html[data-dsh-studio-theme="light"] .dsh-studio-ai-toggle.active { background: rgba(23,118,188,.09); color: #176ea9; }
html[data-dsh-studio-theme="light"] .dsh-studio-surface {
  background: rgba(255,255,255,.7);
  box-shadow: 0 24px 64px rgba(47,65,79,.11);
}
html[data-dsh-studio-theme="light"] .dsh-studio-pane { background: rgba(255,255,255,.86); }
html[data-dsh-studio-theme="light"] .dsh-studio-pane:nth-of-type(even) { background: rgba(248,250,251,.9); }
html[data-dsh-studio-theme="light"] .dsh-studio-empty-pane-content { color: #8997a2; }
html[data-dsh-studio-theme="light"] .dsh-studio-empty-pane-content .glyph { background: rgba(23,118,188,.085); color: #2580bf; }
html[data-dsh-studio-theme="light"] .dsh-studio-empty-pane-content strong { color: #516574; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane .glyph { background: rgba(23,118,188,.085); color: #2580bf; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane .eyebrow { color: #91a0ac; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane strong { color: #425969; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane p { color: #7c8b96; }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane code { background: rgba(35,111,166,.055); color: #708392; }

html[data-dsh-studio-theme="light"][data-dsh-studio-active] [data-dsh-studio-conversation] {
  border-left-color: rgba(43,99,140,.13) !important;
  background: #ffffff !important;
  box-shadow: none !important;
}
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar {
  border-left-color: rgba(43,99,140,.13);
  background: #ffffff;
  color: #667989;
}
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head { border-bottom-color: rgba(43,99,140,.1); }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head .title strong { color: #304759; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head .status { background: #2786c8; box-shadow: 0 0 9px rgba(39,134,200,.3); }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head button { color: #758694; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head button:hover { background: rgba(35,111,166,.075); color: #285d84; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-modes { background: rgba(35,111,166,.055); }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-modes button.active { background: rgba(23,118,188,.1); color: #176ea9; }

/* Apple-inspired desktop material system: quiet hierarchy, direct feedback, reversible panels. */
:root {
  --studio-ink: rgba(255,255,255,.94);
  --studio-muted: rgba(235,235,245,.6);
  --studio-dim: rgba(235,235,245,.3);
  --studio-blue: #0a84ff;
  --studio-blue-soft: rgba(10,132,255,.16);
  --studio-orange: #ff9f0a;
  --studio-field: #0b0b0d;
  --studio-panel: rgba(28,28,30,.82);
  --studio-separator: rgba(255,255,255,.08);
  --studio-fill: rgba(255,255,255,.075);
  --studio-fill-hover: rgba(255,255,255,.11);
}

[data-dsh-studio-sidebar-root] {
  background: rgba(22,22,24,.92) !important;
  border-right-color: var(--studio-separator) !important;
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  backdrop-filter: blur(28px) saturate(160%);
}
.dsh-studio-sidebar { color: var(--studio-ink); }
.dsh-studio-section-head { height: 40px; padding: 0 10px; border-radius: 10px; color: var(--studio-muted); }
.dsh-studio-section-head:hover { background: var(--studio-fill); }
.dsh-studio-section-head strong { color: var(--studio-ink); font-size: 12px; font-weight: 590; letter-spacing: 0; }
.dsh-studio-section-head .hint { color: var(--studio-dim); font-size: 9px; }
.dsh-studio-theme-button, .dsh-studio-ai-toggle, .dsh-studio-icon-button, .dsh-studio-rail-button { color: var(--studio-muted); }
.dsh-studio-theme-button:hover, .dsh-studio-ai-toggle:hover, .dsh-studio-ai-toggle.active, .dsh-studio-icon-button:hover, .dsh-studio-rail-button:hover { background: var(--studio-fill-hover); color: var(--studio-ink); }
.dsh-studio-projects { gap: 3px; padding: 4px 6px 2px; }
.dsh-studio-project-row { height: 34px; padding: 0 9px; border-radius: 8px; color: var(--studio-muted); }
.dsh-studio-project-row:hover { background: var(--studio-fill); color: var(--studio-ink); }
.dsh-studio-project-row.active { background: rgba(10,132,255,.18); color: #fff; box-shadow: none; }
.dsh-studio-project-row small { color: var(--studio-dim); font-size: 8px; font-weight: 560; letter-spacing: .04em; }
.dsh-studio-empty { border: 0; border-radius: 10px; background: rgba(255,255,255,.035); color: var(--studio-dim); }

.dsh-studio-menu {
  padding: 5px;
  border-color: rgba(255,255,255,.1);
  border-radius: 12px;
  background: rgba(38,38,40,.9);
  box-shadow: 0 18px 50px rgba(0,0,0,.38), 0 1px 0 rgba(255,255,255,.08) inset;
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  backdrop-filter: blur(30px) saturate(180%);
}
.dsh-studio-menu button { height: 32px; border-radius: 7px; font-size: 12px; }
.dsh-studio-menu button:hover { background: rgba(255,255,255,.09); }

.dsh-studio-dialog-backdrop { background: rgba(0,0,0,.38); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); }
.dsh-studio-dialog {
  width: min(440px, calc(100vw - 40px));
  max-height: calc(100vh - 40px);
  overflow: auto;
  padding: 24px;
  border-color: rgba(255,255,255,.1);
  border-radius: 20px;
  background: rgba(30,30,32,.9);
  box-shadow: 0 28px 80px rgba(0,0,0,.48), 0 1px 0 rgba(255,255,255,.09) inset;
  -webkit-backdrop-filter: blur(34px) saturate(170%);
  backdrop-filter: blur(34px) saturate(170%);
}
.dsh-studio-dialog-head h2 { font-size: 18px; font-weight: 650; letter-spacing: -.012em; }
.dsh-studio-field { gap: 8px; margin: 15px 0; }
.dsh-studio-field label { color: var(--studio-muted); font-size: 11px; font-weight: 510; }
.dsh-studio-field input, .dsh-studio-field select {
  height: 42px;
  border-color: rgba(255,255,255,.1);
  border-radius: 10px;
  background: rgba(255,255,255,.065);
  color: var(--studio-ink);
}
.dsh-studio-field input:focus, .dsh-studio-field select:focus { border-color: var(--studio-blue); box-shadow: 0 0 0 3px rgba(10,132,255,.2); }
.dsh-studio-field input[type="file"] { height: auto; min-height: 42px; padding: 5px; color: var(--studio-muted); font-size: 11px; }
.dsh-studio-field input[type="file"]::file-selector-button { height: 30px; margin-right: 9px; border: 0; border-radius: 7px; padding: 0 11px; background: var(--studio-fill); color: var(--studio-ink); font: inherit; cursor: pointer; }
.dsh-studio-folder-button, .dsh-studio-button { border-radius: 10px; background: var(--studio-fill); color: var(--studio-ink); }
.dsh-studio-folder-button { height: 38px; border-color: rgba(255,255,255,.08); }
.dsh-studio-folder-button:hover, .dsh-studio-button:hover { background: var(--studio-fill-hover); }
.dsh-studio-button.primary { background: var(--studio-blue); color: #fff; font-weight: 620; }
.dsh-studio-project-binding { border-radius: 11px; background: var(--studio-fill); }
.dsh-studio-project-binding strong { color: var(--studio-ink); }

.dsh-studio-overlay { background: var(--studio-field); }
.dsh-studio-topbar {
  border-bottom-color: var(--studio-separator);
  background: rgba(22,22,24,.78);
  -webkit-backdrop-filter: blur(28px) saturate(170%);
  backdrop-filter: blur(28px) saturate(170%);
}
.dsh-studio-topbar .project-mark { border-radius: 8px; background: rgba(10,132,255,.16); color: #409cff; }
.dsh-studio-topbar h1 { color: var(--studio-ink); font-size: 13px; font-weight: 620; letter-spacing: -.006em; }
.dsh-studio-topbar .path { color: var(--studio-dim); font-size: 9px; }

.dsh-studio-stage { padding: 14px; transition: padding-right 320ms cubic-bezier(.22,1,.36,1); }
.dsh-studio-stage.ai-open { padding-right: 400px; }
.dsh-studio-surface {
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px;
  background: rgba(28,28,30,.76);
  box-shadow: 0 18px 50px rgba(0,0,0,.24), 0 1px 0 rgba(255,255,255,.055) inset;
  -webkit-backdrop-filter: blur(22px) saturate(145%);
  backdrop-filter: blur(22px) saturate(145%);
}
.dsh-studio-pane, .dsh-studio-pane:nth-of-type(even) { background: rgba(28,28,30,.58); }
.dsh-studio-project-pane .glyph, .dsh-studio-empty-pane-content .glyph { border-radius: 12px; background: rgba(10,132,255,.14); color: #409cff; }
.dsh-studio-project-pane .eyebrow { color: var(--studio-dim); font-weight: 600; letter-spacing: .12em; }
.dsh-studio-project-pane strong { color: var(--studio-ink); font-size: 18px; font-weight: 650; letter-spacing: -.014em; }
.dsh-studio-project-pane p { color: var(--studio-muted); font-size: 12px; line-height: 1.55; }
.dsh-studio-pane-actions button { height: 34px; border-radius: 9px; background: var(--studio-blue); color: #fff; }
.dsh-studio-divider::after { background: transparent; }
.dsh-studio-divider:hover::after { background: rgba(10,132,255,.55); }

.dsh-studio-ai-sidebar {
  border-left-color: var(--studio-separator);
  background: rgba(22,22,24,.88);
  -webkit-backdrop-filter: blur(30px) saturate(170%);
  backdrop-filter: blur(30px) saturate(170%);
}
.dsh-studio-ai-sidebar-head { border-bottom-color: var(--studio-separator); }
.dsh-studio-ai-sidebar-head .status { background: #30d158; box-shadow: none; }
.dsh-studio-ai-sidebar-head .title strong { color: var(--studio-ink); font-weight: 610; }
.dsh-studio-ai-sidebar-head .title span { color: var(--studio-dim); }
.dsh-studio-ai-modes { background: rgba(255,255,255,.055); }
.dsh-studio-ai-modes button { color: var(--studio-muted); }
.dsh-studio-ai-modes button.active { background: rgba(255,255,255,.13); color: var(--studio-ink); box-shadow: 0 1px 3px rgba(0,0,0,.2); }
html[data-dsh-studio-active] [data-dsh-studio-conversation] {
  border-left-color: var(--studio-separator) !important;
  background: rgba(22,22,24,.9) !important;
  transition: opacity 180ms ease, transform 320ms cubic-bezier(.22,1,.36,1) !important;
}

.dsh-studio-section-head, .dsh-studio-project-row, .dsh-studio-theme-button, .dsh-studio-rail-button,
.dsh-studio-menu button, .dsh-studio-icon-button, .dsh-studio-folder-button, .dsh-studio-button,
.dsh-studio-ai-toggle, .dsh-studio-ai-sidebar-head button,
.dsh-studio-pane-actions button {
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, transform 100ms ease-out;
}
.dsh-studio-project-row:active, .dsh-studio-theme-button:active, .dsh-studio-rail-button:active,
.dsh-studio-menu button:active, .dsh-studio-icon-button:active, .dsh-studio-folder-button:active,
.dsh-studio-button:active, .dsh-studio-ai-toggle:active,
.dsh-studio-ai-sidebar-head button:active, .dsh-studio-pane-actions button:active { transform: scale(.97); }
.dsh-studio-project-row:focus-visible, .dsh-studio-theme-button:focus-visible, .dsh-studio-rail-button:focus-visible,
.dsh-studio-menu button:focus-visible, .dsh-studio-icon-button:focus-visible, .dsh-studio-folder-button:focus-visible,
.dsh-studio-button:focus-visible, .dsh-studio-ai-toggle:focus-visible,
.dsh-studio-ai-sidebar-head button:focus-visible, .dsh-studio-pane-actions button:focus-visible {
  outline: 2px solid var(--studio-blue);
  outline-offset: 2px;
}

html[data-dsh-studio-theme="light"] {
  --studio-ink: rgba(0,0,0,.88);
  --studio-muted: rgba(60,60,67,.68);
  --studio-dim: rgba(60,60,67,.38);
  --studio-blue: #007aff;
  --studio-blue-soft: rgba(0,122,255,.12);
  --studio-orange: #ff9500;
  --studio-field: #f5f5f7;
  --studio-panel: rgba(255,255,255,.8);
  --studio-separator: rgba(60,60,67,.12);
  --studio-fill: rgba(120,120,128,.1);
  --studio-fill-hover: rgba(120,120,128,.15);
}
html[data-dsh-studio-theme="light"] body, html[data-dsh-studio-theme="light"] .dsh-studio-overlay { background: var(--studio-field) !important; }
html[data-dsh-studio-theme="light"] [data-dsh-studio-sidebar-root] { background: rgba(246,246,248,.88) !important; border-right-color: var(--studio-separator) !important; }
html[data-dsh-studio-theme="light"] .dsh-studio-section-head, html[data-dsh-studio-theme="light"] .dsh-studio-project-row { color: var(--studio-muted); }
html[data-dsh-studio-theme="light"] .dsh-studio-section-head strong, html[data-dsh-studio-theme="light"] .dsh-studio-project-row:hover { color: var(--studio-ink); }
html[data-dsh-studio-theme="light"] .dsh-studio-section-head:hover, html[data-dsh-studio-theme="light"] .dsh-studio-project-row:hover { background: var(--studio-fill); }
html[data-dsh-studio-theme="light"] .dsh-studio-project-row.active { background: rgba(0,122,255,.12); color: #065ea8; box-shadow: none; }
html[data-dsh-studio-theme="light"] .dsh-studio-empty { border: 0; background: rgba(120,120,128,.06); color: var(--studio-dim); }
html[data-dsh-studio-theme="light"] .dsh-studio-menu, html[data-dsh-studio-theme="light"] .dsh-studio-dialog { border-color: rgba(60,60,67,.14); background: rgba(250,250,252,.9); }
html[data-dsh-studio-theme="light"] .dsh-studio-field input, html[data-dsh-studio-theme="light"] .dsh-studio-field select,
html[data-dsh-studio-theme="light"] .dsh-studio-folder-button { border-color: rgba(60,60,67,.13); background: rgba(120,120,128,.08); color: var(--studio-ink); }
html[data-dsh-studio-theme="light"] .dsh-studio-button { background: var(--studio-fill); color: var(--studio-ink); }
html[data-dsh-studio-theme="light"] .dsh-studio-button.primary { background: var(--studio-blue); color: #fff; }
html[data-dsh-studio-theme="light"] .dsh-studio-topbar { border-bottom-color: var(--studio-separator); background: rgba(248,248,250,.78); }
html[data-dsh-studio-theme="light"] .dsh-studio-topbar h1 { color: var(--studio-ink); }
html[data-dsh-studio-theme="light"] .dsh-studio-topbar .path, html[data-dsh-studio-theme="light"] .dsh-studio-project-pane .eyebrow { color: var(--studio-dim); }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-modes { background: rgba(120,120,128,.09); }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-modes button { color: var(--studio-muted); }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-modes button.active { background: rgba(255,255,255,.9); color: var(--studio-ink); box-shadow: 0 1px 4px rgba(0,0,0,.12); }
html[data-dsh-studio-theme="light"] .dsh-studio-surface { border-color: rgba(60,60,67,.1); background: rgba(255,255,255,.76); box-shadow: 0 16px 44px rgba(0,0,0,.09), 0 1px 0 rgba(255,255,255,.9) inset; }
html[data-dsh-studio-theme="light"] .dsh-studio-pane, html[data-dsh-studio-theme="light"] .dsh-studio-pane:nth-of-type(even) { background: rgba(255,255,255,.58); }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane strong { color: var(--studio-ink); }
html[data-dsh-studio-theme="light"] .dsh-studio-project-pane p { color: var(--studio-muted); }
html[data-dsh-studio-theme="light"] .dsh-studio-pane-actions button { background: var(--studio-blue); color: #fff; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar, html[data-dsh-studio-theme="light"][data-dsh-studio-active] [data-dsh-studio-conversation] { border-left-color: var(--studio-separator) !important; background: rgba(248,248,250,.9) !important; }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head { border-bottom-color: var(--studio-separator); }
html[data-dsh-studio-theme="light"] .dsh-studio-ai-sidebar-head .title strong { color: var(--studio-ink); }

@media (prefers-reduced-motion: reduce) {
  .dsh-studio-stage, html[data-dsh-studio-active] [data-dsh-studio-conversation] { transition: opacity 160ms ease !important; }
  .dsh-studio-project-row:active, .dsh-studio-theme-button:active, .dsh-studio-rail-button:active,
  .dsh-studio-menu button:active, .dsh-studio-icon-button:active, .dsh-studio-folder-button:active,
  .dsh-studio-button:active, .dsh-studio-ai-toggle:active,
  .dsh-studio-ai-sidebar-head button:active, .dsh-studio-pane-actions button:active { transform: none; }
}
@media (prefers-reduced-transparency: reduce) {
  [data-dsh-studio-sidebar-root], .dsh-studio-topbar, .dsh-studio-menu, .dsh-studio-dialog,
  .dsh-studio-surface, .dsh-studio-ai-sidebar, html[data-dsh-studio-active] [data-dsh-studio-conversation] {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
  }
}
@media (prefers-contrast: more) {
  .dsh-studio-menu, .dsh-studio-dialog, .dsh-studio-surface, .dsh-studio-ai-sidebar,
  html[data-dsh-studio-active] [data-dsh-studio-conversation] { border-color: currentColor !important; }
}

@media (max-width: 1050px) {
  .dsh-studio-stage.ai-open { padding-right: 322px; }
  .dsh-studio-ai-sidebar { width: 304px; }
  html[data-dsh-studio-active] [data-dsh-studio-conversation] { width: 304px !important; min-width: 280px !important; }
}

/* Unified plugin-owned sidebar shell. DSH's native workspace browser remains mounted as a child slot. */
.dsh-studio-shell {
  width: 100%; height: 100%; min-width: 0; display: flex; flex-direction: column; overflow: hidden;
  box-sizing: border-box; padding: 8px 8px 10px; color: var(--studio-ink);
  background: rgba(22,22,24,.92); border-right: 1px solid var(--studio-separator);
  font: 13px/18px var(--studio-font-text);
  -webkit-backdrop-filter: blur(28px) saturate(160%); backdrop-filter: blur(28px) saturate(160%);
}
.dsh-studio-shell:has(.dsh-studio-native-settings [role="dialog"]) {
  overflow: visible;
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
}
.dsh-studio-shell.rail { width: 56px; padding-inline: 10px; align-items: center; }
.dsh-studio-shell-head { width: 100%; height: 44px; display: flex; align-items: center; gap: 8px; }
.dsh-studio-brand { min-width: 0; flex: 1; display: flex; align-items: center; gap: 9px; border: 0; padding: 4px 2px; background: transparent; color: inherit; text-align: left; cursor: pointer; }
.dsh-studio-brand-image, .dsh-studio-brand-fallback { flex: none; display: grid; place-items: center; overflow: hidden; border-radius: 7px; object-fit: contain; color: var(--studio-blue); }
.dsh-studio-brand-copy { min-width: 0; display: grid; gap: 0; }
.dsh-studio-brand-copy strong, .dsh-studio-brand-copy small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dsh-studio-brand-copy strong { color: var(--studio-ink); font-size: 12px; line-height: 16px; font-weight: 650; letter-spacing: -.01em; }
.dsh-studio-brand-copy small { color: var(--studio-dim); font-size: 9px; line-height: 12px; }
.dsh-studio-shell-icon, .dsh-studio-new-session { border: 0; background: transparent; color: var(--studio-muted); cursor: pointer; }
.dsh-studio-shell-icon { width: 30px; height: 30px; flex: none; display: grid; place-items: center; border-radius: 9px; }
.dsh-studio-shell-icon:hover { background: var(--studio-fill); color: var(--studio-ink); }
.dsh-studio-new-session { width: 100%; min-height: 36px; display: flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid var(--studio-separator); border-radius: 10px; margin: 2px 0 10px; background: var(--studio-fill); color: var(--studio-ink); font: inherit; font-weight: 560; }
.dsh-studio-new-session:hover { background: var(--studio-fill-hover); }
.dsh-studio-shell.rail .dsh-studio-new-session { width: 36px; height: 36px; padding: 0; border-radius: 10px; }
.dsh-studio-navigation { width: 100%; min-height: 0; flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.dsh-studio-native-workspaces { min-height: 116px; max-height: 56%; flex: 0 1 56%; display: flex; overflow: hidden; }
.dsh-studio-native-workspaces > * { min-width: 0; flex: 1; }
.dsh-studio-project-list { flex: none; max-height: 42%; display: grid; gap: 2px; overflow: auto; padding: 7px 0 6px; border-top: 1px solid var(--studio-separator); }
.dsh-studio-shell.rail .dsh-studio-project-list { width: 36px; max-height: 40%; justify-items: center; border-top: 0; }
.dsh-studio-project-row { width: 100%; min-height: 36px; display: grid; grid-template-columns: 20px minmax(0,1fr) auto 12px; align-items: center; gap: 7px; border: 0; border-radius: 9px; padding: 0 7px; background: transparent; color: var(--studio-muted); font: inherit; text-align: left; cursor: pointer; }
.dsh-studio-shell.rail .dsh-studio-project-row { width: 36px; grid-template-columns: 1fr; place-items: center; padding: 0; }
.dsh-studio-project-icon { display: grid; place-items: center; color: currentColor; }
.dsh-studio-project-icon img { display: block; border-radius: 5px; object-fit: contain; }
.dsh-studio-project-chevron { opacity: 0; color: var(--studio-dim); transition: opacity 120ms ease, transform 180ms cubic-bezier(.2,.8,.2,1); }
.dsh-studio-project-row:hover .dsh-studio-project-chevron { opacity: 1; transform: translateX(1px); }
.dsh-studio-project-row.active { background: var(--studio-blue-soft); color: #70b7ff; }
.dsh-studio-project-empty { min-height: 36px; display: flex; align-items: center; justify-content: center; gap: 6px; border: 0; border-radius: 9px; background: transparent; color: var(--studio-dim); font: 11px/16px inherit; cursor: pointer; }
.dsh-studio-project-empty:hover { background: var(--studio-fill); color: var(--studio-muted); }
.dsh-studio-shell-foot { width: 100%; flex: none; display: grid; gap: 2px; padding-top: 7px; border-top: 1px solid var(--studio-separator); }
.dsh-studio-native-settings > button { width: 100% !important; min-height: 34px !important; border-radius: 9px !important; }
.dsh-studio-brand-preview { display: flex; align-items: center; gap: 12px; padding: 14px; border: 1px solid var(--studio-separator); border-radius: 14px; background: var(--studio-fill); }
.dsh-studio-brand-preview > div { min-width: 0; display: grid; gap: 2px; }
.dsh-studio-brand-preview strong { color: var(--studio-ink); font-size: 15px; }
.dsh-studio-brand-preview span { color: var(--studio-muted); font-size: 11px; }
.dsh-studio-project-icon-editor { display: flex; align-items: center; gap: 12px; }
.dsh-studio-project-icon-editor .dsh-studio-project-icon { width: 42px; height: 42px; flex: none; border: 1px solid var(--studio-separator); border-radius: 12px; background: var(--studio-fill); }
.dsh-studio-project-icon-editor input { min-width: 0; flex: 1; }
.dsh-studio-icon-library { display: grid; gap: 10px; padding: 11px; border: 1px solid var(--studio-separator); border-radius: 14px; background: rgba(255,255,255,.035); }
.dsh-studio-icon-search { width: 100%; height: 36px !important; border-radius: 9px !important; }
.dsh-studio-icon-categories { display: flex; gap: 5px; overflow-x: auto; padding-bottom: 1px; scrollbar-width: none; }
.dsh-studio-icon-categories::-webkit-scrollbar { display: none; }
.dsh-studio-icon-category { height: 28px; flex: none; padding: 0 10px; border: 0; border-radius: 8px; background: transparent; color: var(--studio-muted); font: 500 11px/1 inherit; cursor: pointer; }
.dsh-studio-icon-category:hover { background: var(--studio-fill); color: var(--studio-ink); }
.dsh-studio-icon-category.active { background: rgba(10,132,255,.18); color: #58aaff; }
.dsh-studio-icon-grid { max-height: 204px; display: grid; grid-template-columns: repeat(8, minmax(0,1fr)); gap: 5px; overflow-y: auto; padding: 1px; }
.dsh-studio-icon-choice { aspect-ratio: 1; min-width: 0; display: grid; place-items: center; border: 1px solid transparent; border-radius: 10px; background: transparent; color: var(--studio-muted); cursor: pointer; transition: color 120ms ease, background 120ms ease, border-color 120ms ease, transform 100ms ease-out; }
.dsh-studio-icon-choice:hover { background: var(--studio-fill-hover); color: var(--studio-ink); }
.dsh-studio-icon-choice:active { transform: scale(.92); }
.dsh-studio-icon-choice.selected { border-color: rgba(10,132,255,.42); background: rgba(10,132,255,.18); color: #58aaff; }
.dsh-studio-icon-empty { grid-column: 1 / -1; min-height: 76px; display: grid; place-items: center; color: var(--studio-dim); font-size: 11px; }
.dsh-studio-icon-library-foot { display: flex; align-items: center; justify-content: space-between; color: var(--studio-dim); font-size: 10px; }
.dsh-studio-icon-reset { border: 0; padding: 3px 5px; background: transparent; color: var(--studio-muted); font: inherit; cursor: pointer; }
.dsh-studio-icon-reset:hover { color: var(--studio-blue); }
html[data-dsh-studio-theme="light"] .dsh-studio-icon-library { background: rgba(118,118,128,.045); }
html[data-dsh-studio-theme="light"] .dsh-studio-icon-category.active,
html[data-dsh-studio-theme="light"] .dsh-studio-icon-choice.selected { color: #007aff; }
.dsh-studio-dialog-spacer { flex: 1; }
.dsh-studio-section-picker { display: grid; grid-template-columns:minmax(0,1fr) 32px; gap: 7px; align-items: center; }
.dsh-studio-field-note { color: var(--studio-dim); font-size: 10px; line-height: 15px; }

/* Codex-inspired conversation rhythm, adapted to the studio's narrow AI column. */
html[data-dsh-studio-active] [data-dsh-studio-conversation] {
  --dsh-chat-content-width: 100%;
  --dsh-composer-card-max-width: 100%;
  --dsh-composer-side-clearance: 12px;
  --dsh-content-font-size: 13px;
  --dsh-content-font-size-secondary: 12px;
  --dsh-content-font-delta: -1px;
  --dsh-content-font-delta-secondary: -1px;
  --dsw-font-family: var(--studio-font-text);
  --dsw-specific-bubble: rgba(255,255,255,.075);
  --dsw-specific-input-major: rgba(255,255,255,.07);
  font-family: var(--studio-font-text);
  font-synthesis: style;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-conversation-scroll] {
  --dsh-chat-flow-gap: 18px;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-chat-flow-kind="user"] > [data-slot="conversation.chat.node"] > :first-child > :first-child,
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-chat-flow-kind="steering"] > [data-slot="conversation.chat.node"] > :first-child > :first-child {
  max-width: 82%;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] :is([data-chat-flow-kind="assistant-step"], [data-chat-flow-kind="user"], [data-chat-flow-kind="steering"]) {
  letter-spacing: 0;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-chat-flow-kind="assistant-step"] :is(p, ul, ol, blockquote, pre) {
  margin-block: 12px;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-chat-flow-kind="assistant-step"] :is(ul, ol) {
  padding-left: 20px;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-chat-flow-kind="assistant-step"] li:not(:first-child) {
  margin-top: 5px;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-chat-flow-kind="assistant-step"] :is(h1, h2, h3) {
  margin: 19px 0 8px;
  font-size: 15px;
  line-height: 22px;
  font-weight: 600;
  letter-spacing: -.012em;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-chat-flow-kind="assistant-step"] :is(h4, h5, h6) {
  margin: 14px 0 7px;
  font-size: 13px;
  line-height: 20px;
  font-weight: 600;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-chat-flow-kind="assistant-step"] :is(p, li) {
  line-height: 21px;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-composer-card] {
  min-height: 88px;
  gap: 10px;
  padding-top: 9px;
  border-radius: 18px;
  box-shadow: 0 1px 2px rgba(0,0,0,.06), 0 10px 30px rgba(0,0,0,.12);
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-composer-input] {
  min-height: 32px;
  padding: 3px 10px 0 14px;
  font: 400 13px/21px var(--studio-font-text);
  letter-spacing: 0;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-composer-placeholder] {
  inset: 3px 10px auto 14px;
  font-size: 13px;
  line-height: 21px;
}
html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-submission-echo] {
  transform-origin: right bottom;
  animation: dsh-studio-message-submit 160ms cubic-bezier(.2,.8,.2,1) both;
}
@keyframes dsh-studio-message-submit {
  from { opacity: .55; transform: translateY(5px) scale(.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  html[data-dsh-studio-active] [data-dsh-studio-conversation] [data-submission-echo] { animation: none; }
}

/* AI is a floating companion surface with the same 16px corner system as the canvas. */
html[data-dsh-studio-active] { --studio-ai-width: 372px; --studio-ai-clearance: 400px; }
.dsh-studio-ai-sidebar { top: 72px; right: 14px; bottom: 14px; height: auto; width: var(--studio-ai-width); overflow: hidden; border: 1px solid var(--studio-separator); border-radius: 16px; box-shadow: 0 18px 50px rgba(0,0,0,.24); }
html[data-dsh-studio-active] [data-dsh-studio-conversation] { top: 124px !important; right: 14px !important; bottom: 14px !important; width: var(--studio-ai-width) !important; min-width: 0 !important; height: auto !important; overflow: hidden !important; border: 1px solid var(--studio-separator) !important; border-top: 0 !important; border-radius: 0 0 16px 16px !important; box-shadow: 0 18px 50px rgba(0,0,0,.24) !important; }
.dsh-studio-stage { box-sizing: border-box; transition: right 320ms cubic-bezier(.22,1,.36,1); }
.dsh-studio-stage.ai-open { right: var(--studio-ai-clearance); padding-right: 14px; }
.dsh-studio-preview { position: absolute; inset: 0; overflow: hidden; background: #fff; }
.dsh-studio-preview iframe { width: 100%; height: 100%; display: block; border: 0; background: #fff; }

html[data-dsh-studio-theme="light"] .dsh-studio-shell { background: rgba(246,246,248,.9); border-right-color: var(--studio-separator); }
html[data-dsh-studio-theme="light"] .dsh-studio-project-row.active { background: var(--studio-blue-soft); color: #0068bd; }
html[data-dsh-studio-theme="light"] .dsh-studio-brand-fallback { color: #007aff; }

/* Portable typography contract: use Apple's named faces when installed.
   The font files are intentionally not redistributed with this public plugin. */
@font-face {
  font-family: "Studio SF Pro Text";
  src: local("SF Pro Text"), local("SFProText-Regular");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: "Studio SF Pro Text";
  src: local("SF Pro Text Medium"), local("SFProText-Medium");
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: "Studio SF Pro Text";
  src: local("SF Pro Text Semibold"), local("SFProText-Semibold");
  font-style: normal;
  font-weight: 600;
  font-display: swap;
}
@font-face {
  font-family: "Studio SF Pro Text";
  src: local("SF Pro Text Bold"), local("SFProText-Bold");
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}
@font-face {
  font-family: "Studio SF Pro Display";
  src: local("SF Pro Display"), local("SFProDisplay-Regular");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: "Studio SF Pro Display";
  src: local("SF Pro Display Medium"), local("SFProDisplay-Medium");
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: "Studio SF Pro Display";
  src: local("SF Pro Display Semibold"), local("SFProDisplay-Semibold");
  font-style: normal;
  font-weight: 600;
  font-display: swap;
}
@font-face {
  font-family: "Studio SF Pro Display";
  src: local("SF Pro Display Bold"), local("SFProDisplay-Bold");
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}
:root {
  --studio-font-text: "Studio SF Pro Text", "SF Pro Text", "PingFang SC", "苹方-简", sans-serif;
  --studio-font-display: "Studio SF Pro Display", "SF Pro Display", "PingFang SC", "苹方-简", sans-serif;
  --dsw-font-family: var(--studio-font-text);
}
html[data-dsh-studio-theme] body {
  --dsh-content-font-size: 13px;
  --dsh-content-font-size-secondary: 12px;
  --dsh-content-font-delta: -1px;
  --dsh-content-font-delta-secondary: -1px;
  font-family: var(--studio-font-text) !important;
  font-synthesis: style;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
html[data-dsh-studio-theme] :where(button, input, textarea, select, [contenteditable="true"]) {
  font-family: var(--studio-font-text) !important;
}
html[data-dsh-studio-theme] :where(h1, h2, h3),
.dsh-studio-brand-copy strong, .dsh-studio-topbar h1, .dsh-studio-project-pane strong {
  font-family: var(--studio-font-display) !important;
}

/* Bring DSH's native Workspace browser into the Personal Studio palette. */
.dsh-studio-native-workspaces {
  --dsw-alias-label-primary: rgba(255,255,255,.88);
  --dsw-alias-label-secondary: rgba(235,235,245,.58);
  --dsw-alias-label-tertiary: rgba(235,235,245,.34);
  --dsw-alias-label-caption: rgba(235,235,245,.5);
  --dsw-alias-interactive-bg-hover: rgba(255,255,255,.07);
  --dsw-alias-state-business-primary: #409cff;
}
.dsh-studio-native-workspaces > div > div:first-child { color: var(--studio-dim); font-size: 12px; }
.dsh-studio-native-workspaces [role="treeitem"] {
  border-radius: 9px !important;
  color: var(--studio-muted);
  font-family: var(--studio-font-text) !important;
  letter-spacing: -.004em;
}
.dsh-studio-native-workspaces [role="treeitem"] > span,
.dsh-studio-native-workspaces [role="treeitem"][aria-expanded] > span > span {
  font-size: 12px !important;
  line-height: 18px !important;
}
.dsh-studio-native-workspaces [role="treeitem"][aria-expanded] { color: var(--studio-ink); font-weight: 540; }
.dsh-studio-native-workspaces [role="treeitem"][aria-selected="true"] {
  background: rgba(10,132,255,.15) !important;
  color: #8bc4ff !important;
}

html[data-dsh-studio-theme="light"] .dsh-studio-shell,
html[data-dsh-studio-theme="light"] [data-dsh-studio-sidebar-root] {
  background: rgba(250,251,253,.94) !important;
  border-right-color: rgba(60,60,67,.1) !important;
}
html[data-dsh-studio-theme="light"] .dsh-studio-topbar {
  border-bottom-color: rgba(60,60,67,.09);
  background: rgba(251,252,253,.9);
  box-shadow: 0 1px 0 rgba(255,255,255,.82) inset;
}
html[data-dsh-studio-theme="light"] .dsh-studio-native-workspaces {
  --dsw-alias-label-primary: #35414d;
  --dsw-alias-label-secondary: #65717e;
  --dsw-alias-label-tertiary: #9aa3ad;
  --dsw-alias-label-caption: #77828d;
  --dsw-alias-interactive-bg-hover: rgba(60,64,67,.055);
  --dsw-alias-state-business-primary: #1683e1;
}
html[data-dsh-studio-theme="light"] .dsh-studio-native-workspaces > div > div:first-child { color: #8a949f; }
html[data-dsh-studio-theme="light"] .dsh-studio-native-workspaces [role="treeitem"] { color: #596673; }
html[data-dsh-studio-theme="light"] .dsh-studio-native-workspaces [role="treeitem"][aria-expanded] { color: #34414d; }
html[data-dsh-studio-theme="light"] .dsh-studio-native-workspaces [role="treeitem"][aria-selected="true"] {
  background: rgba(0,122,255,.09) !important;
  color: #0868b9 !important;
}
html[data-dsh-studio-theme="light"] .dsh-studio-project-row.active {
  background: rgba(0,122,255,.09);
  color: #0868b9;
}
html[data-dsh-studio-theme="light"] .dsh-studio-new-session {
  border-color: rgba(60,60,67,.09);
  background: rgba(118,118,128,.065);
  color: #33404c;
}
html[data-dsh-studio-theme="light"][data-dsh-studio-active] [data-dsh-studio-conversation] {
  --dsw-specific-bubble: #edf2f7;
  --dsw-specific-input-major: rgba(255,255,255,.97);
  --dsw-alias-bg-base: #f8f9fb;
}
html[data-dsh-studio-theme="light"][data-dsh-studio-active] [data-dsh-studio-conversation] [data-composer-card] {
  border: 1px solid rgba(60,60,67,.09);
  background: rgba(255,255,255,.97);
  box-shadow: 0 1px 2px rgba(20,35,50,.05), 0 12px 30px rgba(20,35,50,.09);
}

@media (max-width: 1050px) {
  html[data-dsh-studio-active] { --studio-ai-width: 304px; --studio-ai-clearance: 332px; }
}
`;
function StudioMark({ size = 24, className }) {
  const { brand } = useStudio();
  if (brand.logo !== "") {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { className: `dsh-studio-brand-image${className ? ` ${className}` : ""}`, src: brand.logo, width: size, height: size, alt: "" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `dsh-studio-brand-fallback${className ? ` ${className}` : ""}`, style: { width: size, height: size }, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconSparkle16, { size: Math.max(16, size - 4) }) });
}
function ProjectIcon({ icon: icon2 = "", size = 16 }) {
  const presetId = icon2.startsWith("preset:") ? icon2.slice("preset:".length) : "";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsh-studio-project-icon", "aria-hidden": "true", children: presetId !== "" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PresetProjectIcon, { id: presetId, size }) : icon2 !== "" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: icon2, width: size, height: size, alt: "" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconSparkle16, { size }) });
}
function SidebarBrandName() {
  const { brand } = useStudio();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dsh-studio-brand-copy", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: brand.name }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: brand.tagline })
  ] });
}
function HeroBrandMark({ size = 34, className }) {
  const { brand } = useStudio();
  const ref = (0, import_react3.useRef)(null);
  (0, import_react3.useLayoutEffect)(() => {
    const slot = ref.current?.closest('[data-slot="conversation.hero.brand.mark"]');
    const markSeat = slot?.parentElement;
    const title = markSeat?.nextElementSibling;
    const badge = title?.nextElementSibling;
    if (!(title instanceof HTMLElement) || !(badge instanceof HTMLElement)) return;
    const previousTitle = title.textContent;
    const previousBadge = badge.textContent;
    title.textContent = brand.name;
    badge.textContent = brand.tagline;
    return () => {
      title.textContent = previousTitle;
      badge.textContent = previousBadge;
    };
  }, [brand.name, brand.tagline]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { ref, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StudioMark, { size, className }) });
}
function BrandDialog({ onClose }) {
  const current = useStudio().brand;
  const [name, setName] = (0, import_react3.useState)(current.name);
  const [tagline, setTagline] = (0, import_react3.useState)(current.tagline);
  const [logo, setLogo] = (0, import_react3.useState)(current.logo);
  const upload = (file) => {
    if (file === void 0) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh-studio-dialog-backdrop", onMouseDown: (event) => {
      if (event.target === event.currentTarget) onClose();
    }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-dialog dsh-studio-brand-dialog", role: "dialog", "aria-modal": "true", "aria-label": "\u54C1\u724C\u4E0E Logo", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-dialog-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: "\u54C1\u724C\u4E0E Logo" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "dsh-studio-icon-button", type: "button", "aria-label": "\u5173\u95ED", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconCloseOutline16, {}) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-brand-preview", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StudioMark, { size: 42 }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: name || "\u672A\u547D\u540D\u5DE5\u4F5C\u53F0" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: tagline || "\u4E2A\u4EBA\u667A\u80FD\u5DE5\u4F5C\u7A7A\u95F4" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "studio-brand-name", children: "\u4E3B\u754C\u9762\u540D\u79F0" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { id: "studio-brand-name", value: name, onChange: (event) => {
          setName(event.target.value);
        }, placeholder: "\u4F8B\u5982\uFF1A\u7384\u6728\u5DE5\u4F5C\u53F0" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "studio-brand-tagline", children: "\u6807\u8BC6\u6587\u5B57" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { id: "studio-brand-tagline", value: tagline, onChange: (event) => {
          setTagline(event.target.value);
        }, placeholder: "\u4F8B\u5982\uFF1A\u4E2A\u4EBA\u667A\u80FD\u5DE5\u4F5C\u7A7A\u95F4" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "studio-brand-logo", children: "Logo \u56FE\u7247" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { id: "studio-brand-logo", type: "file", accept: "image/png,image/jpeg,image/webp,image/svg+xml", onChange: (event) => {
          upload(event.target.files?.[0]);
        } })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-dialog-actions", children: [
        logo !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "dsh-studio-button", type: "button", onClick: () => {
          setLogo("");
        }, children: "\u6062\u590D\u9ED8\u8BA4\u56FE\u6807" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsh-studio-dialog-spacer" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "dsh-studio-button", type: "button", onClick: onClose, children: "\u53D6\u6D88" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "dsh-studio-button primary", type: "button", disabled: name.trim() === "", onClick: () => {
          studio.setBrand({ name: name.trim(), tagline: tagline.trim(), logo });
          onClose();
        }, children: "\u4FDD\u5B58" })
      ] })
    ] }) }),
    document.body
  );
}
function ProjectDialog({
  project,
  onClose
}) {
  const [name, setName] = (0, import_react3.useState)(project?.name ?? "");
  const [icon2, setIcon] = (0, import_react3.useState)(project?.icon ?? "");
  const [iconSearch, setIconSearch] = (0, import_react3.useState)("");
  const [iconCategory, setIconCategory] = (0, import_react3.useState)("\u5168\u90E8");
  const [kind, setKind] = (0, import_react3.useState)(project?.kind ?? "attached");
  const [workspaces, setWorkspaces] = (0, import_react3.useState)(listWorkspaces);
  const [workspaceId, setWorkspaceId] = (0, import_react3.useState)(project?.workspaceId ?? workspaces[0]?.id ?? "");
  const [folderName, setFolderName] = (0, import_react3.useState)("");
  const [sectionWorkspaceIds, setSectionWorkspaceIds] = (0, import_react3.useState)(project?.sections.map((section) => section.workspaceId) ?? []);
  const [dataKind, setDataKind] = (0, import_react3.useState)(project?.data.kind ?? "project-files");
  const [dataLocation, setDataLocation] = (0, import_react3.useState)(project?.data.location ?? "");
  const [saving, setSaving] = (0, import_react3.useState)(false);
  const [picking, setPicking] = (0, import_react3.useState)(false);
  const [error, setError] = (0, import_react3.useState)("");
  const iconQuery = iconSearch.trim().toLowerCase();
  const visibleIcons = PROJECT_ICONS.filter((item) => (iconQuery !== "" || iconCategory === "\u5168\u90E8" || item.category === iconCategory) && (iconQuery === "" || `${item.id} ${item.keywords}`.includes(iconQuery)));
  const uploadIcon = (file) => {
    if (file === void 0 || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setIcon(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const pickLocalFolder = async () => {
    setPicking(true);
    setError("");
    try {
      const path = await dshBridge?.uiWorkspace?.pickDirectory?.();
      if (!path) return;
      const workspace = await dshBridge?.workspaces?.create?.({ path });
      const id = String(workspace?.workspaceId ?? workspace?.id ?? "");
      if (!id) throw new Error("\u6240\u9009\u6587\u4EF6\u5939\u65E0\u6CD5\u6CE8\u518C\u4E3A DSH \u5DE5\u4F5C\u533A");
      const title = String(workspace?.title ?? path.split(/[\\/]/).filter(Boolean).at(-1) ?? "\u672C\u5730\u9879\u76EE");
      const option = { id, title, path: String(workspace?.path ?? path) };
      setWorkspaces((current) => [...current.filter((item) => item.id !== id), option]);
      setWorkspaceId(id);
      if (name.trim() === "") setName(title);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setPicking(false);
    }
  };
  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const parent = workspaces.find((item) => item.id === workspaceId);
      if (parent === void 0) throw new Error("\u8BF7\u5148\u5728 DSH \u5DE5\u4F5C\u533A\u4E2D\u6DFB\u52A0\u4E00\u4E2A\u672C\u5730\u76EE\u5F55");
      let binding = parent;
      if (project === void 0 && kind === "generated") {
        const folder = folderName.trim().replace(/^[\\/]+|[\\/]+$/g, "");
        if (!folder) throw new Error("\u8BF7\u8F93\u5165\u65B0\u9879\u76EE\u6587\u4EF6\u5939\u540D\u79F0");
        const path = await createProjectDirectory(parent.path, folder);
        const created = await dshBridge?.workspaces?.create?.({ path });
        const createdId = created?.workspaceId ?? created?.id;
        if (!createdId) throw new Error("\u9879\u76EE\u76EE\u5F55\u5DF2\u521B\u5EFA\uFF0C\u4F46\u65E0\u6CD5\u6CE8\u518C\u4E3A DSH \u5DE5\u4F5C\u533A");
        binding = { id: String(createdId), title: name.trim(), path };
      }
      const next = {
        id: project?.id ?? projectId(),
        name: name.trim(),
        icon: icon2,
        layout: "single",
        kind,
        workspaceId: project === void 0 ? binding.id : project.workspaceId,
        path: project === void 0 ? binding.path : project.path,
        panes: ["overview"],
        paneSources: project?.paneSources ?? [],
        sections: (() => {
          const ids = Array.from(new Set([binding.id, ...sectionWorkspaceIds].filter(Boolean)));
          return ids.map((id, index) => {
            if (id === binding.id) return { id: project?.sections.find((section) => section.workspaceId === id)?.id ?? projectId(), name: index === 0 ? "\u4E3B\u9879\u76EE" : binding.title, workspaceId: id, path: binding.path };
            const workspace = workspaces.find((item) => item.id === id);
            return { id: project?.sections.find((section) => section.workspaceId === id)?.id ?? projectId(), name: workspace.title, workspaceId: id, path: workspace.path };
          });
        })(),
        data: { kind: dataKind, location: dataLocation.trim(), readOnly: true },
        aiMode: project?.aiMode ?? (kind === "generated" ? "build" : "analyze"),
        sessions: project?.sessions ?? {}
      };
      if (project === void 0) studio.add(next);
      else studio.update(next);
      onClose();
      await openProjectMode(next, next.aiMode);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setSaving(false);
    }
  };
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh-studio-dialog-backdrop", onMouseDown: (event) => {
      if (event.target === event.currentTarget) onClose();
    }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-dialog", role: "dialog", "aria-modal": "true", "aria-label": project ? "\u7F16\u8F91\u9879\u76EE" : "\u65B0\u5EFA\u9879\u76EE", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-dialog-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: project ? "\u7F16\u8F91\u9879\u76EE" : "\u65B0\u5EFA\u9879\u76EE" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "dsh-studio-icon-button", type: "button", "aria-label": "\u5173\u95ED", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconCloseOutline16, {}) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "studio-project-name", children: "\u9879\u76EE\u540D\u79F0" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { id: "studio-project-name", autoFocus: true, value: name, onChange: (event) => {
          setName(event.target.value);
        }, placeholder: "\u4F8B\u5982\uFF1A\u6211\u7684\u5206\u6790\u9879\u76EE" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "studio-project-icon", children: "\u9879\u76EE\u56FE\u6807" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-project-icon-editor", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ProjectIcon, { icon: icon2, size: 30 }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { id: "studio-project-icon", type: "file", accept: "image/png,image/jpeg,image/webp,image/svg+xml", onChange: (event) => {
            uploadIcon(event.target.files?.[0]);
          } })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-icon-library", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { className: "dsh-studio-icon-search", value: iconSearch, onChange: (event) => {
            setIconSearch(event.target.value);
          }, placeholder: "\u641C\u7D22\u56FE\u6807\uFF0C\u4F8B\u5982\uFF1A\u90AE\u4EF6\u3001\u6570\u636E\u3001\u65E5\u5386", "aria-label": "\u641C\u7D22\u9879\u76EE\u56FE\u6807" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh-studio-icon-categories", "aria-label": "\u56FE\u6807\u5206\u7C7B", children: ["\u5168\u90E8", ...ICON_CATEGORIES].map((category) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: `dsh-studio-icon-category${iconCategory === category ? " active" : ""}`, type: "button", onClick: () => {
            setIconCategory(category);
            setIconSearch("");
          }, children: category }, category)) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-icon-grid", role: "listbox", "aria-label": "\u9879\u76EE\u56FE\u6807\u5E93", children: [
            visibleIcons.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                className: `dsh-studio-icon-choice${icon2 === `preset:${item.id}` ? " selected" : ""}`,
                type: "button",
                role: "option",
                "aria-label": item.label,
                "aria-selected": icon2 === `preset:${item.id}`,
                title: item.label,
                onClick: () => {
                  setIcon(`preset:${item.id}`);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(item.component, { size: 19, strokeWidth: 1.8 })
              },
              item.id
            )),
            visibleIcons.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh-studio-icon-empty", children: "\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u56FE\u6807" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-icon-library-foot", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
              iconQuery === "" ? `${iconCategory} \xB7 ` : "\u641C\u7D22\u7ED3\u679C \xB7 ",
              visibleIcons.length,
              " \u4E2A\u56FE\u6807"
            ] }),
            icon2 !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "dsh-studio-icon-reset", type: "button", onClick: () => {
              setIcon("");
            }, children: "\u6062\u590D\u9ED8\u8BA4" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "studio-project-kind", children: "\u63A5\u5165\u65B9\u5F0F" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { id: "studio-project-kind", value: kind, disabled: project !== void 0, onChange: (event) => {
          setKind(event.target.value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "attached", children: "\u63A5\u5165\u672C\u5730\u9879\u76EE" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "generated", children: "AI \u521B\u5EFA\u65B0\u9879\u76EE" })
        ] })
      ] }),
      project === void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "studio-project-workspace", children: kind === "attached" ? "\u9009\u62E9 DSH \u5DE5\u4F5C\u533A" : "\u9009\u62E9\u65B0\u9879\u76EE\u7684\u7236\u5DE5\u4F5C\u533A" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { id: "studio-project-workspace", value: workspaceId, onChange: (event) => {
          setWorkspaceId(event.target.value);
        }, children: [
          workspaces.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "", children: "\u6682\u65E0\u53EF\u7528\u5DE5\u4F5C\u533A" }),
          workspaces.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: item.id, children: item.title }, item.id))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "dsh-studio-folder-button", type: "button", disabled: picking, onClick: () => {
          void pickLocalFolder();
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconFolderClose16, { size: 14 }),
          picking ? "\u6B63\u5728\u6253\u5F00\u2026" : kind === "attached" ? "\u4ECE\u7535\u8111\u9009\u62E9\u9879\u76EE\u6587\u4EF6\u5939" : "\u4ECE\u7535\u8111\u9009\u62E9\u7236\u6587\u4EF6\u5939"
        ] })
      ] }),
      project === void 0 && kind === "generated" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "studio-project-folder", children: "\u65B0\u9879\u76EE\u6587\u4EF6\u5939" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { id: "studio-project-folder", value: folderName, onChange: (event) => {
          setFolderName(event.target.value);
        }, placeholder: "\u4F8B\u5982\uFF1Amy-new-project" })
      ] }),
      project !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-project-binding", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u5DE5\u4F5C\u533A\u8FDE\u63A5" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "\u5DF2\u8FDE\u63A5\u5230 DSH \u5DE5\u4F5C\u533A" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "\u6302\u8F7D\u5230\u5206\u533A\u7684 DSH \u9879\u76EE" }),
        sectionWorkspaceIds.map((id, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-section-picker", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("select", { value: id, onChange: (event) => {
            setSectionWorkspaceIds((items) => items.map((item, itemIndex) => itemIndex === index ? event.target.value : item));
          }, children: workspaces.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: item.id, children: item.title }, item.id)) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "dsh-studio-icon-button", type: "button", "aria-label": "\u79FB\u9664\u5206\u533A", onClick: () => {
            setSectionWorkspaceIds((items) => items.filter((_, itemIndex) => itemIndex !== index));
          }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconCloseOutline16, { size: 13 }) })
        ] }, `${id}-${index}`)),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "dsh-studio-folder-button", type: "button", disabled: workspaces.length === 0, onClick: () => {
          setSectionWorkspaceIds((items) => [...items, workspaces[0].id]);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconPlusOutline16, { size: 14 }),
          "\u6DFB\u52A0\u9879\u76EE\u5206\u533A"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "studio-project-data", children: "AI \u6570\u636E\u63A5\u53E3" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { id: "studio-project-data", value: dataKind, onChange: (event) => {
          setDataKind(event.target.value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "project-files", children: "\u9879\u76EE\u6587\u4EF6\u4E0E\u4EA7\u7269\uFF08\u9ED8\u8BA4\uFF09" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "sqlite", children: "SQLite \u6570\u636E\u5E93" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "http", children: "HTTP \u6570\u636E\u63A5\u53E3" })
        ] }),
        dataKind !== "project-files" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { value: dataLocation, onChange: (event) => {
          setDataLocation(event.target.value);
        }, placeholder: dataKind === "sqlite" ? "\u6570\u636E\u5E93\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u4F8B\u5982 data/app.db" : "\u63A5\u53E3\u5730\u5740\uFF0C\u4F8B\u5982 http://127.0.0.1:4000/api" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { className: "dsh-studio-field-note", children: "AI \u9ED8\u8BA4\u53EA\u8BFB\u8BBF\u95EE\uFF1B\u51ED\u636E\u4E0D\u4F1A\u4FDD\u5B58\u5728\u8FD9\u4E2A\u63D2\u4EF6\u4E2D\u3002" })
      ] }),
      error !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh-studio-dialog-error", children: error }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-dialog-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "dsh-studio-button", type: "button", onClick: onClose, children: "\u53D6\u6D88" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "dsh-studio-button primary", type: "button", disabled: saving || picking || name.trim() === "" || workspaceId === "", onClick: () => {
          void save();
        }, children: saving ? "\u6B63\u5728\u8FDE\u63A5\u2026" : "\u4FDD\u5B58\u9879\u76EE" })
      ] })
    ] }) }),
    document.body
  );
}
function PersonalSidebar(props) {
  const { collapsed, width, renderSlot, startSession, toggleSidebar } = props;
  const state = useStudio();
  const wide = !collapsed;
  const [menu, setMenu] = (0, import_react3.useState)(null);
  const [editing, setEditing] = (0, import_react3.useState)(false);
  const [editingBrand, setEditingBrand] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
    document.documentElement.toggleAttribute("data-dsh-studio-active", state.activeId !== null);
    document.documentElement.setAttribute("data-dsh-studio-theme", state.theme);
    return () => {
      document.documentElement.removeAttribute("data-dsh-studio-active");
    };
  }, [state.activeId, state.theme]);
  (0, import_react3.useEffect)(() => {
    if (menu === null) return;
    const close = () => {
      setMenu(null);
    };
    window.addEventListener("pointerdown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
    };
  }, [menu]);
  const showContext = (event, project, brand = false) => {
    event.preventDefault();
    event.stopPropagation();
    setMenu({ x: event.clientX, y: event.clientY, project, brand });
  };
  const openProject = (project) => {
    studio.setActive(project.id);
    void openProjectMode(project, project.aiMode);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "aside",
    {
      className: `dsh-studio-shell${wide ? " wide" : " rail"}`,
      "data-dsh-studio-sidebar-root": "",
      style: wide ? { width } : void 0,
      onContextMenu: (event) => {
        if (event.target === event.currentTarget) showContext(event);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { className: "dsh-studio-shell-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "dsh-studio-brand", type: "button", "aria-label": wide ? "\u54C1\u724C\u8BBE\u7F6E" : "\u5C55\u5F00\u4FA7\u8FB9\u680F", onContextMenu: (event) => {
            showContext(event, void 0, true);
          }, onClick: () => {
            if (!wide) toggleSidebar();
            else setEditingBrand(true);
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StudioMark, { size: wide ? 26 : 24 }),
            wide && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SidebarBrandName, {})
          ] }),
          wide && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "dsh-studio-shell-icon", type: "button", "aria-label": "\u6536\u8D77\u4FA7\u8FB9\u680F", onClick: toggleSidebar, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconPanelLeftOutline16, { size: 16 }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "dsh-studio-new-session", type: "button", "aria-label": "\u65B0\u5EFA\u4F1A\u8BDD", onClick: () => {
          studio.setActive(null);
          startSession();
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconPlusOutline16, { size: wide ? 14 : 18 }),
          wide && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u65B0\u5EFA\u4F1A\u8BDD" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-navigation", onContextMenu: (event) => {
          if (event.target.closest("button") === null) showContext(event);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh-studio-native-workspaces", children: renderSlot("sidebar.workspaces", { wide, expandSidebar: () => {
            if (!wide) toggleSidebar();
          } }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-project-list", role: "tree", "aria-label": "\u9879\u76EE", children: [
            state.projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", role: "treeitem", className: `dsh-studio-project-row${state.activeId === project.id ? " active" : ""}`, onClick: () => {
              openProject(project);
            }, onContextMenu: (event) => {
              showContext(event, project);
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ProjectIcon, { icon: project.icon, size: wide ? 14 : 18 }),
              wide && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: project.name }),
                project.sections.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: project.sections.length }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconChevronRightOutline14, { className: "dsh-studio-project-chevron", size: 12 })
              ] })
            ] }, project.id)),
            wide && state.projects.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "dsh-studio-project-empty", type: "button", onClick: () => {
              setEditing(void 0);
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconPlusOutline16, { size: 13 }),
              "\u53F3\u952E\u6216\u70B9\u51FB\u6DFB\u52A0\u9879\u76EE"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("footer", { className: "dsh-studio-shell-foot", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh-studio-native-settings", children: renderSlot("sidebar.settings", { wide }) }),
          renderSlot("sidebar.footer.action", { wide })
        ] }),
        menu !== null && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh-studio-menu", style: { left: menu.x, top: menu.y }, onPointerDown: (event) => {
          event.stopPropagation();
        }, children: menu.brand ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", onClick: () => {
          setMenu(null);
          setEditingBrand(true);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconEditOutline16, {}),
          "\u4FEE\u6539\u54C1\u724C\u4E0E Logo"
        ] }) : menu.project === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", onClick: () => {
          setMenu(null);
          setEditing(void 0);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconPlusOutline16, {}),
          "\u65B0\u5EFA\u9879\u76EE"
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", onClick: () => {
            setMenu(null);
            setEditing(menu.project);
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconEditOutline16, {}),
            "\u7F16\u8F91\u9879\u76EE"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "danger", type: "button", onClick: () => {
            studio.remove(menu.project.id);
            setMenu(null);
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconTrashOutline16, {}),
            "\u5220\u9664\u9879\u76EE"
          ] })
        ] }) }), document.body),
        editing !== false && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ProjectDialog, { project: editing, onClose: () => {
          setEditing(false);
        } }),
        editingBrand && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(BrandDialog, { onClose: () => {
          setEditingBrand(false);
        } })
      ]
    }
  );
}
var paneLabels = {
  overview: { title: "\u9879\u76EE\u6982\u89C8", description: "\u9879\u76EE\u8FDE\u63A5\u4E0E\u5F53\u524D\u8FD0\u884C\u72B6\u6001" },
  files: { title: "\u6587\u4EF6\u4E0E\u4EE3\u7801", description: "\u7531\u9879\u76EE AI \u8BFB\u53D6\u3001\u68C0\u7D22\u6216\u4FEE\u6539\u5F53\u524D\u5DE5\u4F5C\u533A\u6587\u4EF6" },
  data: { title: "\u6570\u636E\u4E0E\u4EA7\u7269", description: "\u5206\u6790\u9879\u76EE\u751F\u6210\u7684\u6570\u636E\u3001\u65E5\u5FD7\u3001\u8868\u683C\u548C\u5176\u4ED6\u4EA7\u7269" },
  report: { title: "\u603B\u7ED3\u4E0E\u62A5\u544A", description: "\u628A\u9879\u76EE\u6570\u636E\u6574\u7406\u4E3A\u7ED3\u8BBA\u3001\u98CE\u9669\u4E0E\u4E0B\u4E00\u6B65\u884C\u52A8" }
};
function Pane({ project, index, preview, onRetry }) {
  const kind = project.panes[index] ?? "overview";
  const section = project.sections.find((item) => item.id === project.paneSources[index]) ?? project.sections[index] ?? project.sections[0];
  const details = paneLabels[kind];
  const showPreview = index === 0 && kind === "overview";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "dsh-studio-pane", children: showPreview && preview.status === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh-studio-preview", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("iframe", { src: preview.url, title: `${project.name} \u9879\u76EE\u9884\u89C8` }) }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-project-pane", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "glyph", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconSparkle16, { size: 18 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "eyebrow", children: project.kind === "generated" ? "AI \u751F\u6210\u9879\u76EE" : "\u672C\u5730\u9879\u76EE" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: showPreview && preview.status === "loading" ? "\u6B63\u5728\u542F\u52A8\u9879\u76EE" : details.title }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: showPreview && preview.status === "loading" ? "\u6B63\u5728\u8BFB\u53D6\u9879\u76EE\u542F\u52A8\u811A\u672C\u5E76\u51C6\u5907\u7F51\u9875\u9884\u89C8\u2026" : showPreview && preview.status === "unavailable" ? preview.message : `${details.description}${section !== void 0 ? `\uFF0C\u6570\u636E\u8303\u56F4\u4E3A\u201C${section.name}\u201D` : ""}\u3002` }),
    showPreview && preview.status === "unavailable" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh-studio-pane-actions", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", onClick: onRetry, children: "\u91CD\u65B0\u542F\u52A8" }) })
  ] }) });
}
function SplitSurface({ project }) {
  const [sizes, setSizes] = (0, import_react3.useState)(() => Array.from({ length: paneCount(project.layout) }, () => 1 / paneCount(project.layout)));
  const [preview, setPreview] = (0, import_react3.useState)({ status: "loading" });
  const surface = (0, import_react3.useRef)(null);
  const vertical = project.layout === "vertical";
  (0, import_react3.useEffect)(() => {
    const count = paneCount(project.layout);
    setSizes(Array.from({ length: count }, () => 1 / count));
  }, [project.layout]);
  const startPreview = () => {
    setPreview({ status: "loading" });
    void launchProjectPreview(project.path).then(
      (result) => {
        setPreview(result);
      },
      (reason) => {
        setPreview({ status: "unavailable", message: reason instanceof Error ? reason.message : String(reason) });
      }
    );
  };
  (0, import_react3.useEffect)(startPreview, [project.id, project.path]);
  const startResize = (event, dividerIndex) => {
    event.preventDefault();
    const rect = surface.current?.getBoundingClientRect();
    if (rect === void 0) return;
    const initial = vertical ? event.clientY : event.clientX;
    const extent = vertical ? rect.height : rect.width;
    const before = sizes[dividerIndex];
    const after = sizes[dividerIndex + 1];
    const onMove = (move) => {
      const delta = ((vertical ? move.clientY : move.clientX) - initial) / extent;
      const nextBefore = Math.max(0.16, Math.min(before + after - 0.16, before + delta));
      const next = [...sizes];
      next[dividerIndex] = nextBefore;
      next[dividerIndex + 1] = before + after - nextBefore;
      setSizes(next);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref: surface, className: `dsh-studio-surface${vertical ? " vertical" : ""}`, children: sizes.map((size, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "contents" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flexGrow: 0, flexShrink: 0, flexBasis: `${size * 100}%`, minWidth: 0, minHeight: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Pane, { project, index, preview, onRetry: startPreview }) }),
    index < sizes.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `dsh-studio-divider${vertical ? " row" : ""}`, onPointerDown: (event) => {
      startResize(event, index);
    } })
  ] }, index)) });
}
function findConversationRoot() {
  const scrolls = document.querySelectorAll("[data-conversation-scroll]");
  return scrolls.item(scrolls.length - 1)?.parentElement ?? null;
}
function StudioOverlay() {
  const state = useStudio();
  const project = state.projects.find((item) => item.id === state.activeId);
  const [sidebarRight, setSidebarRight] = (0, import_react3.useState)(0);
  const [aiProjectId, setAiProjectId] = (0, import_react3.useState)(null);
  const previousProjectId = (0, import_react3.useRef)(project?.id);
  const aiOpen = project !== void 0 && aiProjectId === project.id;
  (0, import_react3.useLayoutEffect)(() => {
    if (project === void 0) return;
    const update = () => {
      const sidebar2 = document.querySelector("[data-dsh-studio-sidebar-root]");
      setSidebarRight(sidebar2?.getBoundingClientRect().right ?? 0);
    };
    update();
    const observer = new ResizeObserver(update);
    const sidebar = document.querySelector("[data-dsh-studio-sidebar-root]");
    if (sidebar !== null) observer.observe(sidebar);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [project?.id]);
  (0, import_react3.useLayoutEffect)(() => {
    const projectId2 = project?.id;
    const projectChanged = previousProjectId.current !== projectId2;
    previousProjectId.current = projectId2;
    if (projectId2 === void 0) return;
    let root = null;
    let animationFrame;
    let switchingTimer;
    const clearRoot = (target) => {
      target.removeAttribute("data-dsh-studio-conversation");
      target.removeAttribute("data-studio-open");
      target.removeAttribute("data-studio-switching");
    };
    const attachRoot = () => {
      const nextRoot = findConversationRoot();
      if (nextRoot === root) {
        root?.setAttribute("data-studio-open", String(aiOpen));
        return;
      }
      if (root !== null) clearRoot(root);
      if (switchingTimer !== void 0) window.clearTimeout(switchingTimer);
      root = nextRoot;
      if (root === null) return;
      root.setAttribute("data-dsh-studio-conversation", "");
      root.setAttribute("data-studio-open", String(aiOpen));
      if (projectChanged) {
        root.setAttribute("data-studio-switching", "true");
        const attachedRoot = root;
        switchingTimer = window.setTimeout(() => {
          attachedRoot.removeAttribute("data-studio-switching");
        }, 80);
      }
    };
    attachRoot();
    const observer = new MutationObserver(() => {
      if (animationFrame !== void 0) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = void 0;
        attachRoot();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      if (animationFrame !== void 0) window.cancelAnimationFrame(animationFrame);
      if (switchingTimer !== void 0) window.clearTimeout(switchingTimer);
      if (root !== null) clearRoot(root);
    };
  }, [project?.id, aiOpen]);
  if (project === void 0) return null;
  const handleMode = async (mode, prompt) => {
    try {
      const next = await openProjectMode(project, mode);
      setAiProjectId(next.id);
      const sessionId = next.sessions[mode];
      if (prompt && sessionId) await promptIntoSession(sessionId, prompt);
    } catch (reason) {
      window.alert(reason instanceof Error ? reason.message : String(reason));
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("main", { className: "dsh-studio-overlay", style: { left: sidebarRight }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { className: "dsh-studio-topbar", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "project-mark", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PanelsTopLeft, { size: 16, strokeWidth: 1.8 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { children: "Workspace" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh-studio-topbar-actions", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: `dsh-studio-ai-toggle${aiOpen ? " active" : ""}`, type: "button", "aria-label": aiOpen ? "\u6536\u8D77 AI \u4FA7\u680F" : "\u5C55\u5F00 AI \u4FA7\u680F", title: aiOpen ? "\u6536\u8D77 AI \u4FA7\u680F" : "\u5C55\u5F00 AI \u4FA7\u680F", onClick: () => {
          if (aiOpen) setAiProjectId(null);
          else void handleMode(project.aiMode);
        }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconPanelLeftOutline16, { size: 17 }) }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `dsh-studio-stage${aiOpen ? " ai-open" : ""}`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SplitSurface, { project }) })
    ] }),
    aiOpen && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("aside", { className: "dsh-studio-ai-sidebar", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-ai-sidebar-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "status" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "AI \u52A9\u624B" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: project.name })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-studio-ai-modes", "aria-label": "AI \u5DE5\u4F5C\u6A21\u5F0F", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: project.aiMode === "analyze" ? "active" : "", onClick: () => {
          void handleMode("analyze");
        }, children: "\u5206\u6790" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: project.aiMode === "build" ? "active" : "", onClick: () => {
          void handleMode("build");
        }, children: "\u6784\u5EFA" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "close", type: "button", "aria-label": "\u6536\u8D77 AI \u4FA7\u680F", title: "\u6536\u8D77 AI \u4FA7\u680F", onClick: () => {
        setAiProjectId(null);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconCloseOutline16, { size: 14 }) })
    ] }) })
  ] });
}
var inject = ["slots", "theme", "sessions", "conversation", "workspaces", "uiWorkspace", "layout"];
function apply(ctx) {
  dshBridge = { sessions: ctx.sessions, conversation: ctx.conversation, workspaces: ctx.workspaces, uiWorkspace: ctx.uiWorkspace };
  const syncTheme = (themeSnapshot = ctx.theme.getTheme()) => {
    const theme = themeSnapshot.active.colorScheme;
    if (studio.getSnapshot().theme !== theme) studio.setTheme(theme);
  };
  syncTheme();
  ctx.on("theme/change", syncTheme);
  ctx.effect(() => () => {
    dshBridge = null;
  }, "dsh-personal-studio: native bridges");
  ctx.effect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-dsh-plugin", "dsh-personal-studio");
    style.textContent = styles;
    document.head.appendChild(style);
    return () => {
      style.remove();
      document.documentElement.removeAttribute("data-dsh-studio-active");
      document.documentElement.removeAttribute("data-dsh-studio-theme");
    };
  }, "dsh-personal-studio: styles");
  ctx.slots.inject("sidebar", () => ctx.slots.register({
    name: "sidebar",
    priority: -10,
    children: {
      "sidebar.brand.mark": { kind: "single", scope: "root" },
      "sidebar.brand.name": { kind: "single", scope: "root" },
      "sidebar.workspaces": { kind: "single", scope: "root" },
      "sidebar.settings": { kind: "single", scope: "root" },
      "sidebar.footer.action": { kind: "list", scope: "root" }
    },
    inject: () => ({
      startSession: (workspaceId) => {
        ctx.uiWorkspace.startSession(workspaceId);
      },
      toggleSidebar: () => {
        ctx.layout.toggleSidebar();
      }
    })
  }, PersonalSidebar), "dsh-personal-studio: sidebar shell");
  ctx.slots.inject("sidebar.brand.mark", () => ctx.slots.register({ name: "sidebar.brand.mark", priority: -10 }, StudioMark), "dsh-personal-studio: sidebar brand mark");
  ctx.slots.inject("sidebar.brand.name", () => ctx.slots.register({ name: "sidebar.brand.name", priority: -10 }, SidebarBrandName), "dsh-personal-studio: sidebar brand name");
  ctx.slots.inject("conversation.hero.brand.mark", () => ctx.slots.register({ name: "conversation.hero.brand.mark", priority: -10 }, HeroBrandMark), "dsh-personal-studio: hero brand mark");
  ctx.slots.inject("shell.overlay", () => ctx.slots.register({
    name: "shell.overlay",
    id: "dsh-personal-studio-overlay",
    order: 100
  }, StudioOverlay), "dsh-personal-studio: overlay");
}
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/activity.js:
lucide-react/dist/esm/icons/at-sign.js:
lucide-react/dist/esm/icons/atom.js:
lucide-react/dist/esm/icons/badge-dollar-sign.js:
lucide-react/dist/esm/icons/bell.js:
lucide-react/dist/esm/icons/binary.js:
lucide-react/dist/esm/icons/book-open.js:
lucide-react/dist/esm/icons/boxes.js:
lucide-react/dist/esm/icons/braces.js:
lucide-react/dist/esm/icons/brain-circuit.js:
lucide-react/dist/esm/icons/briefcase.js:
lucide-react/dist/esm/icons/brush.js:
lucide-react/dist/esm/icons/bug.js:
lucide-react/dist/esm/icons/building-2.js:
lucide-react/dist/esm/icons/calendar-days.js:
lucide-react/dist/esm/icons/camera.js:
lucide-react/dist/esm/icons/chart-column.js:
lucide-react/dist/esm/icons/chart-line.js:
lucide-react/dist/esm/icons/chart-pie.js:
lucide-react/dist/esm/icons/circle-help.js:
lucide-react/dist/esm/icons/clipboard-check.js:
lucide-react/dist/esm/icons/clock-3.js:
lucide-react/dist/esm/icons/cloud.js:
lucide-react/dist/esm/icons/code-xml.js:
lucide-react/dist/esm/icons/coffee.js:
lucide-react/dist/esm/icons/compass.js:
lucide-react/dist/esm/icons/cpu.js:
lucide-react/dist/esm/icons/credit-card.js:
lucide-react/dist/esm/icons/crown.js:
lucide-react/dist/esm/icons/database.js:
lucide-react/dist/esm/icons/dna.js:
lucide-react/dist/esm/icons/dumbbell.js:
lucide-react/dist/esm/icons/earth.js:
lucide-react/dist/esm/icons/file-text.js:
lucide-react/dist/esm/icons/filter.js:
lucide-react/dist/esm/icons/flag.js:
lucide-react/dist/esm/icons/flask-conical.js:
lucide-react/dist/esm/icons/folder-kanban.js:
lucide-react/dist/esm/icons/gauge.js:
lucide-react/dist/esm/icons/gem.js:
lucide-react/dist/esm/icons/git-branch.js:
lucide-react/dist/esm/icons/graduation-cap.js:
lucide-react/dist/esm/icons/hammer.js:
lucide-react/dist/esm/icons/heart.js:
lucide-react/dist/esm/icons/house.js:
lucide-react/dist/esm/icons/image.js:
lucide-react/dist/esm/icons/key-round.js:
lucide-react/dist/esm/icons/landmark.js:
lucide-react/dist/esm/icons/languages.js:
lucide-react/dist/esm/icons/leaf.js:
lucide-react/dist/esm/icons/library.js:
lucide-react/dist/esm/icons/lightbulb.js:
lucide-react/dist/esm/icons/list-todo.js:
lucide-react/dist/esm/icons/lock-keyhole.js:
lucide-react/dist/esm/icons/mail.js:
lucide-react/dist/esm/icons/map-pin.js:
lucide-react/dist/esm/icons/message-circle.js:
lucide-react/dist/esm/icons/messages-square.js:
lucide-react/dist/esm/icons/mic-vocal.js:
lucide-react/dist/esm/icons/microscope.js:
lucide-react/dist/esm/icons/milestone.js:
lucide-react/dist/esm/icons/moon.js:
lucide-react/dist/esm/icons/music-2.js:
lucide-react/dist/esm/icons/package.js:
lucide-react/dist/esm/icons/palette.js:
lucide-react/dist/esm/icons/panels-top-left.js:
lucide-react/dist/esm/icons/pen-tool.js:
lucide-react/dist/esm/icons/phone.js:
lucide-react/dist/esm/icons/plane.js:
lucide-react/dist/esm/icons/podcast.js:
lucide-react/dist/esm/icons/radio.js:
lucide-react/dist/esm/icons/receipt.js:
lucide-react/dist/esm/icons/rocket.js:
lucide-react/dist/esm/icons/scale.js:
lucide-react/dist/esm/icons/scan-line.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/send.js:
lucide-react/dist/esm/icons/server.js:
lucide-react/dist/esm/icons/settings-2.js:
lucide-react/dist/esm/icons/share-2.js:
lucide-react/dist/esm/icons/shield-check.js:
lucide-react/dist/esm/icons/shopping-bag.js:
lucide-react/dist/esm/icons/sigma.js:
lucide-react/dist/esm/icons/sliders-horizontal.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/icons/square-terminal.js:
lucide-react/dist/esm/icons/star.js:
lucide-react/dist/esm/icons/store.js:
lucide-react/dist/esm/icons/sun.js:
lucide-react/dist/esm/icons/table-2.js:
lucide-react/dist/esm/icons/target.js:
lucide-react/dist/esm/icons/timer.js:
lucide-react/dist/esm/icons/trending-up.js:
lucide-react/dist/esm/icons/truck.js:
lucide-react/dist/esm/icons/users.js:
lucide-react/dist/esm/icons/utensils.js:
lucide-react/dist/esm/icons/video.js:
lucide-react/dist/esm/icons/wallet-cards.js:
lucide-react/dist/esm/icons/workflow.js:
lucide-react/dist/esm/icons/wrench.js:
lucide-react/dist/esm/icons/zap.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
return module.exports; } });
