const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const depth_fourth = require("./depth_fourth");
const depth_triple = require("./depth_triple");
const depth_double = require("./depth_double");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Kwall 30101",
      description: `
      ㅇ sid list
      - kw-airkorea2
      - kw-aws-min2
      - kw-aws-1hr2
      - kw-cbko2
      - kw-vsrt2
      - kw-shko2
      - kw-vhko
      - kw-vbko
      - kw-odam2
      - kw-ktko512
      - kw-ktko60
      - kw-ktko62
      - kw-3d1h2
      - kw-3d3h2
      - kw-3d6h2
      - kw-3d12h2
      - kw-3d24h2
      - kw-7d12h2
      - kw-7d24h2
      - kw-30d24h
      - kw-idx-j2
      - kw-dust-f2
      - kw-ajko
      - kw-dust-r2
      - kw-kgkw1
      - kw-gps-busantp
      - kw-gps1
      - kw-fct-dl2
      - kw-fcl-do
      - kw-fct-ds
      - kw-fct-wl2
      - kw-fct-wc2
      - kw-fct-wo
      - kw-fct-ws
      - kw-fct-idx-foodPoisoning2
      - kw-fct-idx-senTa2
      - kw-fct-idx-uv2
      - kw-fct-idx-freeze2
      - kw-fct-idx-airDiffusion2
      - kw-fct-idx-asthema2
      - kw-fct-idx-stroke2
      - kw-fct-idx-cold2
      - kw-fct-idx-oak2
      - kw-fct-idx-pine2
      - kw-fct-idx-weeds2
      `,
    },
    description: `Data`,
    paths: {
      ...depth_double,
      ...depth_triple,
      ...depth_fourth,
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
