import { atom } from 'nanostores'

export const character = atom({
    class: '',
    race: '',
    background: '',
    abilityScores: new Array(6).fill(10),
    skills: [],
    powers: [],
    feats: []
})