/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// Customize icons
import VendingMachineIcon from '@/components/icons/VendingMachine.vue'
import BottleIcon from '@/components/icons/Bottle.vue'
import eWalletIcon from '@/components/icons/E-Wallet.vue'
import WaitDrinkIcon from '@/components/icons/WaitDrink.vue'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  icons: {
    aliases: {
      VendingMachine: VendingMachineIcon,
      Bottle: BottleIcon,
      eWallet:eWalletIcon,
      WaitDrink: WaitDrinkIcon,
    },
  },
})
