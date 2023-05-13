import Home from "../pages/Home.svelte"
import Properties from "../pages/properties/index.svelte"
import Propertie from '../pages/properties/[propertie].svelte'
import Market from "../pages/Market.svelte"
import UserLog from "../pages/UserLog.svelte"
import UserLogProperties from '../pages/UserLogProperties.svelte'
import Error from '../pages/Error.svelte'

export const routes = {
    '/': Home,
    '/ventas-rentas': Properties,
    '/ventas-rentas/#/:propertie': Propertie,
    '/marketplace': Market,
    '/mis-propiedades': UserLogProperties,
    '/mi-informacion': UserLog,
    '*': Error
}