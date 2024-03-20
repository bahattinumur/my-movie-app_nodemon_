const fs = require("fs");
const crypto = require("crypto");
const bodyParser = require("../utils/body-parser");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      // İsteğin body kısmına eriş
      let body = await bodyParser(req);

      // Hata kontrolü
      if (!body.title || !body.year || !body.genre || !body.rating) {
        res.writeHead(404);
        res.end("Describe the movie in detail, covering all aspects.");
        return;
      }

      // Yeni film verisine benzersiz ID ekle.
      body.id = crypto.randomUUID();

      // Bütün filmleri al ve JS verisine çevir.
      let data = fs.readFileSync("./data/movies.json", "utf-8");
      data = JSON.parse(data);

      // Yeni filmi bütün filmlerin arasına ekle.
      data.movies.push(body);

      // Json dosyasına güncelle.
      fs.writeFileSync("./data/movies.json", JSON.stringify(data));

      // Client'a cevap gönder.
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    } catch (err) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "The path does not exist." }));
    }
  }
};
