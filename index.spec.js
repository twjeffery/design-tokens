const SC = require("./lib/styled-components");
const rm = require("rimraf");
const fs = require("fs");

describe("GoAStyleDictionary", () => {
  beforeEach((next) => {
    rm("./tmp", next)
  })

  it('should create css and scss files', async () => {
    SC.generate("./tmp")
    const dirs = fs.readdirSync("./tmp");
    expect(dirs.length).toBe(2);
    expect(dirs).toContain("css")
    expect(dirs).toContain("scss")

    for (const dir of dirs) {
      const files = fs.readdirSync("./tmp/" + dir);
      expect(files.length).toBe(1);
      expect(files[0]).toBe(`tokens.${dir}`)
    }
  });
})
