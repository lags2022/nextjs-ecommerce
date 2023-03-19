import fs from "fs-extra";
import axios from "axios";
import { getImageSizefunction } from "./getImageSize.js";
import { log, time } from "./log.js";

const endTime = time();

const INITIAL_ID_XKCD_COMIC = 2700;
const FINAL_ID_XKCD_COMIC = 2750;

for (let id = INITIAL_ID_XKCD_COMIC; id <= FINAL_ID_XKCD_COMIC; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`;
  log(`Fetching ${url}...`);
  const { data } = await axios.get(url);
  const { num, news, transcript, img, ...restOfComic } = data;
  log(`Fetched comic #${num}.Getting image dimensions...`);
  const { height, width } = await getImageSizefunction({ url: img });
  log(`Got image dimensions: ${width}x${height}`);
  const comicToStore = { id, img, height, width, ...restOfComic };
  const jsonFile = `./comics/${id}.json`;
  await fs.writeJSON(jsonFile, comicToStore);
  log(`Wrote ${jsonFile}! ✅\n`);
}

endTime();
