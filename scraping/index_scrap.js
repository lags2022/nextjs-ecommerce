import fs from "fs-extra";
import axios from "axios";

const INITIAL_ID_XKCD_COMIC = 2700;
const FINAL_ID_XKCD_COMIC = 2750;

for (let id = INITIAL_ID_XKCD_COMIC; id <= FINAL_ID_XKCD_COMIC; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`;
  const { data } = await axios.get(url);
  const { num, news, transcript, ...restOfComic } = data;
  const comicToStore = { id, ...restOfComic };
  await fs.writeJSON(`./comics/${id}.json`, comicToStore);
}