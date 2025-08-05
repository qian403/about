<template>
    <md-card class="custom-card">
        <md-card-content>
            <slot/>
        </md-card-content>
    </md-card>
</template>

<script setup lang="ts">
// Card 組件不需要額外的邏輯

// 確保組件可以被正確導入
defineOptions({
    name: 'Card'
})
</script>

<style scoped>
.custom-card {
    background: #fffbfe;
    border: 2px solid #d0bcff;
    border-radius: 16px;
    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding: 0;
    margin: 0;
}

.custom-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px 0 rgb(0 0 0 / 0.15);
}

/* 確保卡片內容有足夠的內邊距 */
:deep(md-card-content) {
    padding: 2rem;
}
</style>