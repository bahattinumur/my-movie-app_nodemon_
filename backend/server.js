const http = require('http');
const getRequest = require('./methods/get-request');
const postRequest = require('./methods/post-request');
const deleteRequest = require('./methods/delete-request');

// CORS ayarlarını içeren fonksiyon
const handleCorsHeaders = (req, res) => {
  // Gelen isteklerin origin başlığını kabul et
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Gelen isteklerin hangi yöntemleri desteklediğini belirt
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  // İsteğin başlıklarının hangilerinin kabul edilebileceğini belirt
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // CORS isteğinin maksimum ömrünü belirle
  res.setHeader('Access-Control-Max-Age', '3600');
};

// 1) HTTP sunucusunu oluştur
const server = http.createServer((req, res) => {
  // CORS ayarlarını uygula
  handleCorsHeaders(req, res);

  // OPTIONS isteği kontrolü
  if (req.method === 'OPTIONS') {
    // OPTIONS isteği ise 200 başarı kodu ile cevapla
    res.writeHead(200);
    res.end();
    return;
  }

  switch (req.method) {
    case 'GET':
      getRequest(req, res);
      break;

    case 'POST':
      postRequest(req, res);
      break;

    case 'DELETE':
      deleteRequest(req, res);
      break;

    default:
      // cevabın durum kodunu güncelle
      res.statusCode = 404;

      // gönderilen cevaba yeni header ekle
      res.setHeader('Content-Type', 'application/json');

      // gönderilecek cevabın içeriğini belirle
      res.write(
        JSON.stringify({
          message: 'The page does not exist.',
        })
      );

      // cevabı client'a gönder
      res.end();
  }
});

// 2) Belirli porta gelen istekleri dinle
const port = 5001;

server.listen(port, () => {
  console.log(`The server is listening on port ${port}.`);
});
