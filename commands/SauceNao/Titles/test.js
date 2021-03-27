const pixiv = require("./pixiv.js");

async function a(){
result = await pixiv.getTitle("https://www.pixiv.net/en/artworks/88677365");
console.log(result);
}a();
/*describe("pixiv read test", () => {
    it("titlelize()", async () => {
      const result = await pixiv.getTitle("https://www.pixiv.net/en/artworks/62715758");
      result.should.have.property("title");
      console.log(result.title);
    });
});*/