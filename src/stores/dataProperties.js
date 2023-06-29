import  no_image  from '../assets/no_image.webp'
const noImage = no_image
// writable: leer y sobre-escribir una variable
// readable: leer una variable
import { writable, readable } from 'svelte/store'

// exportando la variable dataProperties de tipo writable
export const dataProperties = writable([])
export const propertiesFilter = writable([])
export const viewPropertie = writable(null)
export const cardsRenders = writable(true)
export const imagePreview = readable(noImage)