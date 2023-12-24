import {atom} from 'recoil';

export const userIdState = atom({
    key: 'userId',
    default: undefined
  });

export const entryIdState = atom({
    key: 'currentEntry',
    default: undefined
  });

export const scriptState = atom({
    key:'script',
    default: undefined
})

export const selectedEntryIdState = atom({
    key:"selectedEntry",
    default: undefined
})

export const userAddedState = atom({
  key:"userAdded",
  default:false
})
