<template>
    <v-card flat color="white">
        <v-card-text>
            <div id="content-title" class="d-flex flex-wrap justify-space-between">
                <p class="mt-1 text-1">Our Drink Product</p>

                <v-badge v-if="store.cart.length" :content="store.cart.length" color="white">
                    <v-btn
                    flat
                    size="small"
                    class="text-none text-white"
                    prepend-icon="mdi-cart-outline"
                    color="#3267E3"
                    @click="cartDialog= true" >
                        Keranjang
                    </v-btn>
                </v-badge>

                <v-btn
                v-else
                flat
                size="small"
                class="text-none text-white"
                prepend-icon="mdi-cart-outline"
                color="#3267E3"
                @click="cartDialog= true" >
                    Keranjang
                </v-btn>
            </div>

            <div class="mt-4 d-flex flex-row flex-wrap justify-space-around">
                <div v-for="item in store.drinkList" :key="item.id">
                    <v-badge v-if="calcDrinkAmount(item.id)" :content="calcDrinkAmount(item.id)" color="#3267E3">
                        <drinkShoppingCard :item="item" />
                    </v-badge>
                    <drinkShoppingCard v-else :item="item" />
                 </div>
            </div>
        </v-card-text>
    </v-card>

    <v-dialog
    v-model="cartDialog"
    max-width="500">
        <v-card>
            <v-card-text>
                <div class="d-flex justify-space-between">
                    <p class="text-subtitle-2">Keranjang</p>

                    <v-icon
                    style="cursor: pointer;"
                    color="#404040"
                    @click="cartDialog = false" >
                        mdi-close
                    </v-icon>
                </div>
            </v-card-text>

            <v-divider />

            <div style="background-color: #F0F3FF">
                <div class="pa-3 d-flex flex-wrap justify-space-between">
                    <p class="ml-2 text-1-normal">Total Harga <span class="ml-1 text-h6" style="color: #3267E3;">{{ store.getTotalPrice() }}</span></p>
                    
                    <div id="cart-btn" class="mt-1">
                        <v-btn
                        size="x-small"
                        height="32"
                        variant="outlined"
                        color="#3267E3"
                        class="text-none mr-2"
                        rounded="pill"
                        @click="store.resetCart()" >
                            Kosongkan Keranjang
                        </v-btn>

                        <v-btn
                        flat
                        size="x-small"
                        height="32"
                        color="#3267E3"
                        class="text-none text-white"
                        rounded="pill"
                        @click="order()" >
                            Beli Sekarang
                        </v-btn>
                    </div>
                </div>
            </div>

            <div style="background-color: #F4F4F4">
                <div class="px-5 py-4 my-2">
                    <div class="d-flex flex-wrap flex-row justify-center">
                        <v-card
                        v-for="(drinkItem, index) in store.cart"
                        :key="index"
                        class="rounded-lg mx-1 my-2"
                        width="107"
                        flat >
                            <v-img
                            :aspect-ratio="1"
                            cover
                            width="80"
                            class="ml-3 mt-2"
                            :src="drinkItem.img" />
                                <p class="text-1-normal text-center my-1">{{drinkItem.name }}</p>
                                <p class="text-1-normal text-center">{{drinkItem.weight }}</p>
                                <p class="my-1 text-1 text-center">{{ store.parseRupiah(drinkItem.price) }}</p>
                                
                                <div class="pt-2 d-flex justify-space-around" style="background-color: #F4F4F4;">
                                    <v-btn
                                    flat
                                    density="compact"
                                    size="small"
                                    icon="mdi-minus"
                                    color="#3267E3"
                                    class="text-white"
                                    @click="store.decrementCartAmount(index)" />

                                    <p class="text-1">{{ drinkItem.amount }}</p>

                                    <v-btn
                                    flat
                                    density="compact"
                                    size="small"
                                    icon="mdi-plus"
                                    color="#3267E3"
                                    class="text-white"
                                    @click="store.incrementCartAmount(index)" />
                                </div>
                        </v-card>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <v-dialog
    v-model="eWalletDialog"
    max-width="500"
    transition="slide-x-reverse-transition"
    persistent >
        <v-card >
            <v-card-text>
                <div class="d-flex justify-space-between">
                    <p class="text-subtitle-2">Pilih e-Wallet</p>

                    <v-icon
                    style="cursor: pointer;"
                    color="#404040"
                    @click="eWalletDialog= false" >
                        mdi-close
                    </v-icon>
                </div>
            </v-card-text>

            <v-divider />

            <div style="background-color: #F4F4F4">
                <div class="px-5 py-4">
                    <p class="text-subtitle-2 mb-2">Product</p>
                    <v-card
                    flat >
                        <v-card-text>
                            <div class="d-flex flex-row flex-wrap justify-space-between">
                                <p class="text-subtitle-2">Quantity</p>
                                <p class="text-subtitle-2"> {{ store.cart.length }}x </p>
                            </div>

                            <div class="mt-4 d-flex flex-row flex-wrap justify-space-between">
                                <p class="text-subtitle-2">Jumlah Bayar</p>
                                <p class="text-subtitle-2" style="color: #3267E3;"> {{ store.getTotalPrice() }} </p>
                            </div>
                        </v-card-text>
                    </v-card>

                    <v-divider class="my-4" />

                    <p class="text-subtitle-2">Pilih wallet pembayaran</p>
                    <div class="d-flex flex-column flex-wrap justify-space-around">
                        <v-card
                        style="cursor: pointer;box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12)"
                        class="my-2 text-center"
                        @click="chooseEWallet('shopee')" >
                            <img style="object-fit: contain;" src="@/assets/images/shopee.png" width="55" height="50" alt="shopee">
                        </v-card>
                        <v-card
                        style="cursor: pointer;box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12)"
                        class="my-2 text-center"
                        @click="chooseEWallet('ovo')" >
                            <img style="object-fit: contain;" src="@/assets/images/ovo.png" width="55" height="50" alt="ovo">
                        </v-card>
                        <v-card
                        style="cursor: pointer;box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12)"
                        class="my-2 text-center"
                        @click="chooseEWallet('linkAja')" >
                            <img style="object-fit: contain;" src="@/assets/images/linkAja.png" width="55" height="50" alt="linkAja">
                        </v-card>
                        <v-card
                        style="cursor: pointer;box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12)"
                        class="my-2 text-center"
                        @click="chooseEWallet('gopay')" >
                            <img style="object-fit: contain;" src="@/assets/images/gopay.png" width="55" height="50" alt="gopay">
                        </v-card>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <v-dialog
    v-model="paymentDialog"
    max-width="500"
    transition="slide-x-reverse-transition"
    persistent >
        <v-card >
            <v-card-text>
                <div class="d-flex justify-space-between">
                    <p class="text-subtitle-2">Pembayaran QR Code</p>

                    <v-icon
                    style="cursor: pointer;"
                    color="#404040"
                    @click="paymentDialog= false" >
                        mdi-close
                    </v-icon>
                </div>
            </v-card-text>

            <v-divider />

            <div style="background-color: #F4F4F4">
                <div class="px-5 py-4">
                    <v-card flat>
                        <v-card-text @click="payment()" style="cursor: pointer;">
                            <v-row no-gutters>
                                <v-col cols="9">
                                    <v-progress-linear
                                    :model-value="countdownProgress"
                                    color="#3267E3"
                                    rounded
                                    :height="7"
                                    class="mt-2" />
                                </v-col>
                                <v-col cols="3">
                                    <p class="ml-2 text-subtitle-2" style="color: #3267E3;"> {{ countdown }} <span><v-icon size="small" color="#3267E3">mdi-alarm</v-icon></span> </p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <v-card flat class="my-2">
                        <v-card-text class="text-center" @click="payment()" style="cursor: pointer;">
                            <div>
                                <img style="object-fit: contain;" :src="`src/assets/images/${eWallet}.png`" width="100" height="100" :alt="eWallet">
                            </div>
                            <div>
                                <img style="object-fit: contain;" src="@/assets/images/qr-code.png" width="200" alt="qrcode">
                            </div>
                            <p class="my-2 text-h6">{{ store.getTotalPrice() }}</p>
                            <p class="text-2" style="color: #616161;">Lorem ipsum dolor sit amet, consec tetur adipiscing elit. </p>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <v-dialog
    v-model="waitingItemDialog"
    width="500"
    persistent>
        <v-card>
            <v-card-text>
                <div class="d-flex justify-space-between">
                    <p class="text-subtitle-2">Menunggu Barang</p>

                    <v-icon
                    style="cursor: pointer;"
                    color="#404040"
                    @click="waitingItemDialog= false" >
                        mdi-close
                    </v-icon>
                </div>
            </v-card-text>
            <v-divider class="my-2" />

                <div class="text-center">
                    <div class="pa-3">
                        <p class="text-h6"><span><v-icon class="mt-n1 mr-1" size="large" color="#43936C">mdi-checkbox-marked-circle</v-icon></span> Pembayaran di terima</p>
                        <p class="text-1-normal my-4">Lorem ipsum dolor sit amet, consectetur <br> adipiscing elit. Vitae, nunc integer volutpat non. <br> Fermentum in ipsum faucibus sed. </p>
                        
                        <v-divider />
                        
                        <v-row
                        class="my-2"
                        v-for="item in store.cart"
                        :key="item.drinkId" >
                            <v-col cols="3">
                                <v-img
                                :aspect-ratio="1"
                                cover
                                width="80"
                                class="ml-3 mt-2"
                                :src="item.img" />
                            </v-col>

                            <v-col cols="5">
                                <div class="mt-4 text-left">
                                    <p class="text-subtitle-2">{{ item.name }} - {{ item.weight }}</p>
                                    <p class="text-1">{{ item.amount }}x</p>
                                </div>
                            </v-col>

                            <v-col cols="4">
                                <div class="mt-6">
                                    <v-progress-circular
                                    :width="3"
                                    color="#3267E3"
                                    indeterminate
                                    size="28" > 
                                    <p class="text-1">1/2 </p>
                                    </v-progress-circular>
                                    <span class="ml-2 text-subtitle-2" style="color: #3267E3;">Proses</span>
                                </div>
                            </v-col>
                        </v-row>

                        <span @click="done()" class="mt-2 text-subtitle-2" style="color: #3267E3;cursor: pointer;">Ambil di bawah <br>
                        <v-icon
                        color="#3267E3" >
                            mdi-chevron-double-down
                        </v-icon></span>
                    </div>
                </div>
        </v-card>
    </v-dialog>

    <v-dialog
    v-model="successDialog"
    fullscreen
    persistent >
        <v-card>
            <v-card-text class="d-flex justify-center align-center">
                <div class="text-center">
                    <p class="text-h6" color="#404040">Transaksi Berhasil!!</p>
                    <p class="mt-2 text-1-normal">Lorem ipsum dolor sit amet, consectetur <br> adipiscing elit. Vitae, nunc integer volutpat <br> non. Fermentum in ipsum faucibus sed. </p>
                    <v-icon class="text-h1 mt-5" size="x-large" color="#43936C">mdi-checkbox-marked-circle</v-icon>
                </div>
                <div class="footer-info">
                    <p class="text-subtitle-2 mt-n10" style="color: #3267E3;">Kembail ke halaman awal ({{ countdown }})</p>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import { store } from '../store/store.js'
import drinkShoppingCard from './reuseableComponents/drinkShoppingCard.vue';

export default{
    components:{
        drinkShoppingCard,
    },

    data(){
        return{
            store,
            snackbar: false,
            text: '',
            cartDialog: false,
            eWalletDialog: false,
            paymentDialog: false,
            waitingItemDialog: false,
            successDialog: false,
            eWallet: 'gopay',
            countdown: 10,
            interval: null,
        }
    },

    computed: {
        countdownProgress() {
            return 100 - (this.countdown * 10);
        }
    },

    beforeDestroy() {
        clearInterval(this.interval);
    },

    methods:{
        calcDrinkAmount(drinkId){
            let found  = store.cart.find(el => el.drinkId === drinkId)
            if(found){
                return found.amount
            }

            return 0
        },
        counter(){
            this.countdown = 10

            this.interval = setInterval(() => {
                if (this.countdown === 0) {
                    clearInterval(this.interval)

                    if(this.successDialog) {
                        store.resetCart()
                        this.successDialog = false

                        this.$router.push('/')
                    } else {
                        this.snackbar = true
                        this.text = 'QR Code expired, please try again !'
    
                        this.paymentDialog = false
                    }
                } else {
                    this.countdown--;
                }
            }, 1000);
        },
        order(){
            if(!store.cart.length){
                this.snackbar = true
                this.text = 'Please input your cart first !'
            }else {
                this.eWalletDialog = true
                this.cartDialog = false
            }
        },
        chooseEWallet(val){
            this.eWallet = val
            this.paymentDialog = true
            this.eWalletDialog = false

            this.counter()
        },
        payment(){
            clearInterval(this.interval)

            this.paymentDialog = false
            this.waitingItemDialog = true
        },
        done(){
            this.waitingItemDialog = false
            this.successDialog = true

            this.counter()
        }
    }
}
</script>

<style scoped>
.footer-info{
    position: absolute;
    bottom: 0;
}
</style>

<style>
#content-title .v-badge__badge {
    border: 1px solid #3267E3;
    color: #3267E3 !important;
}
</style>