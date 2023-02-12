<template>
    <VendingMachineHeader />
    <VendingMachineContent />
    <VendingMachineFooter />
</template>

<script setup>
import VendingMachineHeader from '@/components/VendingMachineHeader.vue'
import VendingMachineContent from '@/components/VendingMachineContent.vue'
import VendingMachineFooter from '@/components/VendingMachineFooter.vue'
</script>

<style>
.text-1{
    font-size: 12px;
    font-weight: bold;
}

.text-1-normal{
    font-size: 12px;
    font-weight: normal;
    line-height: 14px;
}

.text-2{
    font-size: 8px;
    font-weight: normal;
    line-height: 12px;
}
</style>