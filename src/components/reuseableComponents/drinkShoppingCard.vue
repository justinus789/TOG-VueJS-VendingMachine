<template>
    <v-card
    flat
    class="my-2"
    style="border: 1px solid #EDEDED"
    width="105">
        <v-img
        :aspect-ratio="1"
        cover
        width="80"
        class="ml-3 mt-2"
        :src="props.item.img"
        style="cursor: pointer;"
        @click="openDialog" />
        <div @click="openDialog" style="min-height: 40px;cursor: pointer;">
            <p class="text-1-normal text-center my-1">{{ props.item.name }}</p>
            <p class="text-1-normal text-center">{{ props.item.weight }}</p>
        </div>
        <v-row no-gutters>
            <v-col cols="8">
                <v-card height="100%" flat color="#F5F5F5">
                    <v-card-text class="pa-1">
                        <p class="mt-2 text-1"> {{ store.parseRupiah(props.item.price) }} </p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-btn
                flat
                rounded="0"
                size="small"
                class="text-none text-white"
                icon="mdi-cart-outline"
                color="#3267E3"
                @click="store.addToCart(item)" />
            </v-col>
        </v-row>
    </v-card>

    <v-dialog
    v-model="detailProduct"
    max-width="400">
        <v-card>
            <v-card-text >
                <div class="d-flex flex row justify-space-between">
                    <div id="content-title">
                        <v-badge style="cursor: pointer;" @click="detailProduct = false" v-if="store.cart.length" :content="store.cart.length" color="white">
                            <v-icon
                            color="#3267E3"
                            @click="detailProduct = false" >
                                mdi-cart-outline
                            </v-icon>
                        </v-badge>
                        <v-icon
                        v-else
                        color="#3267E3"
                        @click="detailProduct = false" >
                            mdi-cart-outline
                        </v-icon>
                    </div>

                    <p class="mt-1 text-subtitle-2">Detail Product</p>
                    
                    <v-icon
                    style="cursor: pointer;"
                    color="#404040"
                    @click="detailProduct = false" >
                        mdi-close
                    </v-icon>
                </div>
            </v-card-text>

            <v-divider />

            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="5">
                        <v-img
                        :aspect-ratio="1"
                        cover
                        width="100"
                        class="mt-2"
                        :src="props.item.img" />
                    </v-col>

                    <v-col cols="7">
                        <p class="text-1"> {{ props.item.name }} - {{ props.item.weight }}</p>
                        <p class="my-2 text-subtitle-2" style="color: #404040;"> {{ store.parseRupiah(props.item.price) }} </p>
                        <p class="text-1-normal" style="color: #616161;">{{ props.item.desc }}</p>
                    </v-col>
                </v-row>

                <p class="mt-2 text-subtitle-2 text-center">Jumlah Barang</p>

                <div class="mt-2 d-flex justify-space-evenly">
                    <v-btn
                    flat
                    size="x-small"
                    icon="mdi-minus"
                    color="#F0F3FF"
                    @click="decrement()" />

                    <p class="text-h5">{{ productAmount }}</p>

                    <v-btn
                    flat
                    size="x-small"
                    icon="mdi-plus"
                    color="#3267E3"
                    class="text-white"
                    @click="increment()" />
                </div>

                <div class="d-flex justify-center mt-3 ">
                    <v-btn
                    flat
                    class="text-none text-white"
                    color="#3267E3"
                    @click="store.updateCart(props.item,productAmount); detailProduct = false">
                        Tambah ke keranjang
                    </v-btn>
                </div>

                <p class="mt-6 text-1">Supported e-Wallet</p>
                
                <div class="my-2 d-flex justify-space-around">
                    <img style="object-fit: contain;" src="@/assets/images/shopee.png" width="55"  alt="shopee">
                    <img style="object-fit: contain;" src="@/assets/images/ovo.png" width="55" alt="ovo">
                    <img style="object-fit: contain;" src="@/assets/images/linkAja.png" width="55" alt="linkAja">
                    <img style="object-fit: contain;" src="@/assets/images/gopay.png" width="55" alt="gopay">
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { store } from '@/store/store'
import { ref } from 'vue'

const props = defineProps(['item'])

const detailProduct = ref(false)
const productAmount = ref(1)

const openDialog = () => {
    detailProduct.value = true
    let found  = store.cart.find(el => el.drinkId === props.item.id)
    if(found){
        productAmount.value = found.amount
    }else{
        productAmount.value = 1
    }
}

const increment = () => {
    productAmount.value++
}
const decrement = () => {
    if(productAmount.value > 1){
        productAmount.value--
    }
}
</script>