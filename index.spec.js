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
    expect(dirs.length).toBe(1);
    expect(dirs[0]).toContain("dist");

    const files = fs.readdirSync("./tmp/dist");
    expect(files.length).toBe(2);
    expect(files[0]).toBe(`tokens.css`);
    expect(files[1]).toBe(`tokens.scss`);
  });

  it("should create valid css output", async () => {
    SC.generate("./tmp");
    const raw = fs.readFileSync("./tmp/dist/tokens.css", { encoding: "utf8" });
    expect(raw).toContain("--goa-color-brand-default");
  });
  it("should create valid scss output", async () => {
    SC.generate("./tmp");
    const raw = fs.readFileSync("./tmp/dist/tokens.scss", { encoding: "utf8" });
    expect(raw).toContain("$goa-color-brand-default");
  });
});
