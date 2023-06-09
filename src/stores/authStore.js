// writable: leer y sobre-escribir una variable
// readable: leer una variable
import { writable, readable } from 'svelte/store'

// exportando la variable usuario de tipo writable
export const user = writable(null)
export const userEmail = writable(null)
export const brokerName = writable(null)
export const propertiesUser = writable([])
export const imagesPropertie = writable([])
export const limitPropertiesUser = readable(5)