const { writeFileSync, mkdirSync, existsSync } = require("fs");
const { resolve, join } = require("path");
require("dotenv").config();

const download = require("image-downloader");

let publicPath = join(process.cwd(), "public");
let imgPath = join(publicPath, "posters");
const movies = require(join(process.cwd(), "static", "movies.json"));

function saveImage(url, dest) {
  if (!url || !dest) return;

  download
    .image({
      url,
      dest,
    })
    .then(({ filename }) => {
      // console.log("Saved to", filename);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function main() {
  try {
    mkdirSync(imgPath, { recursive: true });

    let count = 0;
    movies.map((movie) => {
      let filename = `${movie.id}.png`;
      let url = movie.fields.Images[0].url;
      let filePath = join(imgPath, filename);
      if (!existsSync(filePath)) {
        saveImage(url, filePath);
        count++;
      }
    });

    console.log(`Saved ${count} images to ${imgPath}`);
  } catch (error) {
    console.error("Failed: writeLocalImages.js", error);
  }
}

main();
