const SC = require("./lib/design-tokens");
const rm = require("rimraf");
const fs = require("fs");

describe("GoA Design Tokens", () => {
  beforeEach((next) => {
    rm("./tmp", next);
    console.log = () => { }; // one of the libs has some console.log statements
  });

  it("should create css and scss files", async () => {
    SC.generate("./tmp");
    const dirs = fs.readdirSync("./tmp");
    expect(dirs.length).toBe(2);
    expect(dirs).toContain("css");
    expect(dirs).toContain("scss");

    for (const dir of dirs) {
      const files = fs.readdirSync("./tmp/" + dir);
      expect(files.length).toBe(1);
      expect(files[0]).toBe(`tokens.${dir}`);
    }
  });

  it("should create valid css output", async () => {
    SC.generate("./tmp");
    const raw = fs.readFileSync("./tmp/css/tokens.css", { encoding: "utf8" });
    expect(raw).toContain("--goa-colour-brand-default");
  });
  it("should create valid scss output", async () => {
    SC.generate("./tmp");
    const raw = fs.readFileSync("./tmp/scss/tokens.scss", { encoding: "utf8" });
    expect(raw).toContain("$goa-colour-brand-default");
  });
});
