<template>
    <v-card flat min-height="130" class="text-center rounded-0" color="#F0F3FF">
        <v-card-text>
            <p class="text-1">Cara pakai Mesin Vending</p>
            <div class="d-flex flex-row flex-wrap justify-space-around">
                <v-card
                v-for="item in guide"
                :key="item.id"
                flat
                color="#F0F3FF"
                class="my-2 text-left"
                width="110">
                <v-icon>
                    {{ item.icon }}
                </v-icon>
                <p class="text-1 mt-2">{{ item.title }}</p>
                <p class="text-2 text-grey">{{ item.subtitle }}</p>
                </v-card>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
export default{
    data(){
        return{
            guide: [
                { id: 1, icon: '$VendingMachine', title: 'Touch Vending', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                { id: 2, icon: '$Bottle', title: 'Choose Drink', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                { id: 3, icon: '$eWallet', title: 'Pay with e-wallet', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                { id: 4, icon: '$WaitDrink', title: 'Wait for you drink', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
            ]
        }
    }
}
</script>