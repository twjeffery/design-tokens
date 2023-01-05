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
    expect(dirs[0]).toContain("css");
    expect(dirs[1]).toContain("scss");

    const cssfiles = fs.readdirSync("./tmp/css");
    expect(cssfiles.length).toBe(1);
    expect(cssfiles[0]).toBe(`index.css`);

    const scssfiles = fs.readdirSync("./tmp/scss");
    expect(scssfiles.length).toBe(1);
    expect(scssfiles[0]).toBe(`index.scss`);
  });

  it("should create valid css output", async () => {
    SC.generate("./tmp");
    const raw = fs.readFileSync("./tmp/css/index.css", { encoding: "utf8" });
    expect(raw).not.toContain("[object Object]");
  });
  it("should create valid scss output", async () => {
    SC.generate("./tmp");
    const raw = fs.readFileSync("./tmp/scss/index.scss", { encoding: "utf8" });
    expect(raw).not.toContain("[object Object]");
  });
});
