<template>
    <div class="timeline-container">
        <div class="timeline-line"></div>
        <div class="timeline-items">
            <div v-for="(item, index) in items" :key="index" class="timeline-item"
                :class="{ 'timeline-item-right': index % 2 === 1 }">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <v-card class="timeline-card" elevation="2">
                        <v-card-title class="timeline-title">
                            <v-icon :icon="item.icon" class="timeline-icon mr-2"></v-icon>
                            {{ item.title }}
                        </v-card-title>
                        <v-card-subtitle class="timeline-company">
                            {{ item.company }}
                        </v-card-subtitle>
                        <v-card-text v-if="item.description" class="timeline-description">
                            {{ item.description }}
                        </v-card-text>
                        <div class="timeline-period">{{ item.period }}</div>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface TimelineItem {
    icon: string
    title: string
    company: string
    period: string
    description?: string
    color?: string
}

interface Props {
    items: TimelineItem[]
}

defineProps<Props>()

// 確保組件可以被正確導入
defineOptions({
    name: 'VuetifyTimeline'
})
</script>

<style scoped>
.timeline-container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 0;
}

.timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #6750a4, #d0bcff);
    transform: translateX(-50%);
    border-radius: 2px;
}

.timeline-items {
    position: relative;
    z-index: 1;
}

.timeline-item {
    position: relative;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
}

.timeline-item:last-child {
    margin-bottom: 0;
}

.timeline-dot {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 20px;
    height: 20px;
    background: #6750a4;
    border: 4px solid #fffbfe;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 3px #d0bcff;
    z-index: 10;
}

.timeline-content {
    width: 45%;
    margin-left: 0;
    margin-right: auto;
}

.timeline-item-right .timeline-content {
    margin-left: auto;
    margin-right: 0;
}

.timeline-card {
    background: #fffbfe !important;
    border: 2px solid #d0bcff !important;
    border-radius: 16px !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
}

.timeline-card::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border-style: solid;
    transform: translateY(-50%);
}

.timeline-item:not(.timeline-item-right) .timeline-card::before {
    right: -10px;
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent #d0bcff;
}

.timeline-item-right .timeline-card::before {
    left: -10px;
    border-width: 10px 10px 10px 0;
    border-color: transparent #d0bcff transparent transparent;
}

.timeline-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px 0 rgb(0 0 0 / 0.15) !important;
}

.timeline-title {
    font-size: 1.25rem !important;
    font-weight: 600 !important;
    color: #1c1b1f !important;
    padding-bottom: 0.5rem !important;
}

.timeline-icon {
    color: #6750a4 !important;
}

.timeline-company {
    font-size: 1rem !important;
    color: #6750a4 !important;
    font-weight: 500 !important;
    padding-bottom: 0.5rem !important;
}

.timeline-description {
    font-size: 1rem !important;
    line-height: 1.6 !important;
    color: #49454f !important;
    padding-top: 0.5rem !important;
}

.timeline-period {
    font-size: 0.875rem;
    color: #49454f;
    font-weight: 500;
    text-align: center;
    padding: 0.5rem;
    background: #f3f2f3;
    border-radius: 8px;
    margin-top: 1rem;
}

/* 響應式設計 */
@media (max-width: 768px) {
    .timeline-line {
        left: 30px;
        transform: none;
    }

    .timeline-dot {
        left: 30px;
        transform: translate(-50%, -50%);
    }

    .timeline-content {
        width: calc(100% - 80px);
        margin-left: 60px;
        margin-right: 0;
    }

    .timeline-item-right .timeline-content {
        margin-left: 60px;
        margin-right: 0;
    }

    .timeline-item:not(.timeline-item-right) .timeline-card::before {
        left: -10px;
        right: auto;
        border-width: 10px 10px 10px 0;
        border-color: transparent #d0bcff transparent transparent;
    }

    .timeline-item-right .timeline-card::before {
        left: -10px;
        border-width: 10px 10px 10px 0;
        border-color: transparent #d0bcff transparent transparent;
    }
}
</style>