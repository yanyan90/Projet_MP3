import { ref, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

// variable
export const texte_recherche = ref("")
export const page_active = ref("acceuil")
export const params = ref(null)
export const chansons = ref([])
export const source_audio = ref("")
export const source_image = ref("")
export const balise_audio = ref(null)
export const barre_de_progression = ref(0)
export const progression = ref(0)
export const image = ref({ display: "None" })
export const volume = ref(50)
export const selection = ref(null)



// changer de page
export function changerPage(nom_page, params_page = null) {
    page_active.value = nom_page
    params.value = params_page
}

// fetch chansons
fetch("chansons/chansons.json").then(resp => resp.json()).then(fichier => {
    chansons.value = fichier
})

// ajuster temps

export function ajusterTemps(temps) {

    const tempsEnMinutes = temps / 60
    const minutes = Math.floor(tempsEnMinutes)
    const secondes = Math.round((tempsEnMinutes - minutes) * 60)
    const resultatFormate = minutes + ":" + (secondes < 10 ? "0" : "") + secondes

    return resultatFormate

}

// filter recherche
export function filtrer(chansons) {

    const chansons_filtres = chansons.filter(chanson => {
        const titre = chanson.titre.toLowerCase()
        const recherche = texte_recherche.value.toLowerCase()
        return titre.includes(recherche)
    })

    // Return la copie
    return chansons_filtres
}

// lancer audio / afficher images / 
export function lancerAudio(source) {

    source_audio.value = source.audio
    source_image.value = source.image
    image.value = source.image
    selection.value = source

}
// play et pause audio
export function toggleJouer() {
    if (balise_audio.value.paused == false) {
        balise_audio.value.pause()
    } else {
        balise_audio.value.play()
    }
}

// convertisseur minute:seconde
export function timeupdate() {
    const currentTime = balise_audio.value.currentTime

    const minutes = Math.floor(currentTime / 60)
    const seconds = Math.floor(currentTime % 60)
    const temps_formate = `${minutes}:${seconds.toString().padStart(2, '0')}`
    progression.value = temps_formate

    ajusterBarreProgression()

}

// ajuster volume
export function ajusterVolume() {
    balise_audio.value.volume = volume.value / 100

}

// ajuster barre progression
export function ajusterBarreProgression() {
    const temps_actuel = balise_audio.value.currentTime
    if (temps_actuel == 0) {
        barre_de_progression.value = 0
    } if (temps_actuel >= 0 && balise_audio.value.duration > 0) {
        barre_de_progression.value = (temps_actuel / balise_audio.value.duration) * 100

    }

}













































