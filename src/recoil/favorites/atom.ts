import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const favoritesAtom = atom({
  key: "favorites",
  default: [] as number[],
  effects_UNSTABLE: [persistAtom],
});

export default favoritesAtom;
