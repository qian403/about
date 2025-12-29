<template>
    <div class="timeline-container" :class="{ compact }">
        <div class="timeline-line" :class="{ compact }"></div>
        <div class="timeline-items">
            <div v-for="(item, index) in items" :key="index" class="timeline-item"
                :class="{ 'timeline-item-right': alternate && index % 2 === 1 }">
                <div class="timeline-dot" :class="{ compact }"></div>
                <div class="timeline-content" :class="{ compact }">
                    <template v-if="!compact">
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
                    </template>
                    <template v-else>
                        <div class="timeline-card-compact">
                            <div class="timeline-title-compact">
                                <v-icon :icon="item.icon" class="timeline-icon-compact"></v-icon>
                                <span>{{ item.title }}</span>
                            </div>
                            <div v-if="item.company" class="timeline-company-compact">{{ item.company }}</div>
                            <div v-if="item.description" class="timeline-description-compact">{{ item.description }}
                            </div>
                            <div class="timeline-period-compact">{{ item.period }}</div>
                        </div>
                    </template>
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
    compact?: boolean
    alternate?: boolean
}

withDefaults(defineProps<Props>(), {
    compact: false,
    alternate: true
})

// 確保組件可以被正確導入
defineOptions({
    name: 'VuetifyTimeline'
})
</script>

<style scoped>
.timeline-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem 0 1rem 24px;
}

.timeline-line {
    position: absolute;
    left: 30px;
    top: 1rem;
    bottom: 1rem;
    width: 2px;
    background: linear-gradient(
        to bottom,
        var(--color-primary, #64b5f6) 0%,
        var(--color-border, #2a4a5e) 100%
    );
    border-radius: 2px;
}

.timeline-items {
    position: relative;
    z-index: 1;
}

.timeline-item {
    position: relative;
    margin-bottom: 1.25rem;
    padding-left: 28px;
}

.timeline-item:last-child {
    margin-bottom: 0;
}

.timeline-dot {
    position: absolute;
    left: 0;
    top: 18px;
    width: 14px;
    height: 14px;
    background: var(--color-primary, #64b5f6);
    border: 3px solid var(--color-bg-primary, #0d1b2a);
    border-radius: 50%;
    z-index: 10;
    box-shadow: 0 0 0 3px rgba(100, 181, 246, 0.2);
}

.timeline-content {
    width: 100%;
}

.timeline-card-compact {
    background: var(--color-bg-card, #1e3044);
    border: 1px solid var(--color-border, #2a4a5e);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    transition: all 0.3s ease;
    position: relative;
}

.timeline-card-compact::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 18px;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid var(--color-border, #2a4a5e);
}

.timeline-card-compact::after {
    content: '';
    position: absolute;
    left: -6px;
    top: 19px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 7px solid var(--color-bg-card, #1e3044);
}

.timeline-card-compact:hover {
    border-color: var(--color-primary, #64b5f6);
    transform: translateX(4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.timeline-card-compact:hover::before {
    border-right-color: var(--color-primary, #64b5f6);
}

.timeline-title-compact {
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--color-text-primary, #e8f4f8);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.timeline-icon-compact {
    color: var(--color-primary, #64b5f6);
    font-size: 1.125rem;
}

.timeline-company-compact {
    font-size: 0.9rem;
    color: var(--color-primary, #64b5f6);
    font-weight: 500;
    margin-top: 0.375rem;
}

.timeline-description-compact {
    font-size: 0.875rem;
    color: var(--color-text-secondary, #a8c5d8);
    line-height: 1.5;
    margin-top: 0.5rem;
}

.timeline-period-compact {
    font-size: 0.8rem;
    color: var(--color-text-muted, #6b8a9e);
    font-weight: 500;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}



/* 響應式設計 */
@media (max-width: 768px) {
    .timeline-container {
        max-width: 100%;
        padding-left: 20px;
    }
    
    .timeline-line {
        left: 26px;
    }
    
    .timeline-item {
        padding-left: 24px;
    }
    
    .timeline-card-compact {
        padding: 0.875rem 1rem;
    }
    
    .timeline-title-compact {
        font-size: 1rem;
    }
}

/* 減少動畫偏好 */
@media (prefers-reduced-motion: reduce) {
    .timeline-card-compact {
        transition: none;
    }
    
    .timeline-card-compact:hover {
        transform: none;
    }
}
</style>