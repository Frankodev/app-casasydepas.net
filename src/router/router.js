import Home from "../pages/Home.svelte"
import Properties from "../pages/properties/index.svelte"
import Propertie from '../pages/properties/[propertie].svelte'
import MyAccount from '../pages/my-account/index.svelte'
import FormPropertie from '../pages/my-account/FormPropertie.svelte'
import InfoUser from "../pages/my-account/InfoUser.svelte"
import Market from "../pages/Market.svelte"
import Error from '../pages/Error.svelte'

export const routes = {
    '/': Home,
    '/ventas-rentas': Properties,
    '/ventas-rentas/#/:propertie': Propertie,
    '/mi-cuenta/#/mis-propiedades': MyAccount,
    '/mi-cuenta/#/publicar-propiedades': FormPropertie,
    '/mi-cuenta/#/mi-informacion': InfoUser,
    '/marketplace': Market,
    '*': Error
}