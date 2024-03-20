const fs = require("fs");

/*
 - Eğer ki istek direkt "/api/movies"'e istek atıldıysa bütün filmleri göndereğiz,
 -  Ama isteğin base'url i  "/api/movies" ise ve id de bulunuyosa o ID'li filmi göndereceğiz.
 */

module.exports = async (req, res) => {
  //  URL'in yol kısmını al.
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));

  // URL'i parçalara ayır ve ID parametresini al.
  const id = req.url.split("/")[3];

  if (req.url === "/api/movies") {
    //1- Durum kodunu belirle
    res.status = 200;

    //2- Headerları belirle
    res.setHeader("Content-Type", "application/json");

    //3- Json dosyasından film veilerini al
    const movies = fs.readFileSync("./data/movies.json", "utf-8");

    //4- Cevabı gönder
    res.end(movies);
  } else if (baseUrl === "/api/movies" && id) {
    // Bütün filmleri al
    let data = fs.readFileSync("./data/movies.json", "utf-8");

    // Json fomatındaki veriyi JS formatına çevir.
    data = JSON.parse(data);

    // filmlerin arsasından ID'sini bildiğimiz filmi seç.
    const movie = data.movies.find((item) => item.id == id);

    if (movie) {
      // Eğerki film bulunduysa filmi gönder.
      // Cevap ayarlarını belirle
      res.writeHead(200, { "Content-Type": "application/json" });

      // Cevabı gönder.
      res.end(JSON.stringify(movie));
    } else {
      // F,lm bulunamadıysa
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      // Cevabu gönder.
      res.end(
        JSON.stringify({
          message: "Movie with the given ID could not be found.",
        })
      );
    }
  } else {
    // Doğru url'e istek atmadıysa hata gönder.
    res.writeHead(404, { "Content-Type": "application/json" });

    res.end(
      JSON.stringify({
        title: "Could not be found!",
        message: "The path does not exist.",
      })
    );
  }
};
