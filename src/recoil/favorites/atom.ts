import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export default atom({
  key: "favorites",
  default: [] as number[],
  effects_UNSTABLE: [persistAtom],
});
