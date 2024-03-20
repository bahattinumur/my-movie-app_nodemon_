// Isteğin body kısmını oluştur.

module.exports = async (request) => {
  return new Promise((resolve, reject) => {
    try {
      // Isteğin body kısmını belirliyoruz.
      let body = "";

      // Aldığımız her parçayı body kısmına ekliyoruz.
      request.on("data", (chunk) => {
        body += chunk;
      });

      // Bütün parçaların bitme olayını izleyoruz.
      request.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (err) {
      reject(err);
    }
  });
};
