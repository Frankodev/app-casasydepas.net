// writable: leer y sobre-escribir una variable
// readable: leer una variable
import { writable, readable } from 'svelte/store'

// exportando la variable usuario de tipo writable
export const user = writable(null)