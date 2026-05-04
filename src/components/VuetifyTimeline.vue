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
                                <v-icon class="timeline-icon mr-2"><svg viewBox="0 0 24 24" style="width:1em;height:1em"><path :d="item.icon" fill="currentColor"/></svg></v-icon>
                                {{ item.title }}
                            </v-card-title>
                            <v-card-subtitle class="timeline-company">
                                {{ item.company }}
                            </v-card-subtitle>
                            <v-card-text v-if="item.description" class="timeline-description">
                                {{ item.description }}
                            </v-card-text>
                            <div class="timeline-period">{{ item.period }}<span v-if="item.duration" class="timeline-duration">（{{ item.duration }}）</span></div>
                        </v-card>
                    </template>
                    <template v-else>
                        <div class="timeline-card-compact">
                            <div class="timeline-title-compact">
                                <span class="timeline-icon-compact"><svg viewBox="0 0 24 24" style="width:1em;height:1em"><path :d="item.icon" fill="currentColor"/></svg></span>
                                <span>{{ item.title }}</span>
                            </div>
                            <div v-if="item.company" class="timeline-company-compact">{{ item.company }}</div>
                            <div v-if="item.duration" class="timeline-duration-compact">{{ item.duration }}</div>
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
    duration?: string
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
    max-width: 680px;
    margin: 0;
    padding: 0.5rem 0 0.5rem 24px;
}

.timeline-line {
    position: absolute;
    left: 30px;
    top: 0.5rem;
    bottom: 0.5rem;
    width: 1px;
    background: var(--color-border, rgba(0,0,0,0.1));
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
    width: 8px;
    height: 8px;
    background: var(--color-text, #111);
    border: 1.5px solid var(--color-bg, #fff);
    border-radius: 50%;
    z-index: 10;
    box-shadow: 0 0 0 1px var(--color-border-strong, rgba(0,0,0,0.2));
}

.timeline-content {
    width: 100%;
}

.timeline-card-compact {
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid var(--color-border, rgba(0,0,0,0.1));
    border-radius: var(--radius-lg, 10px);
    padding: 0.875rem 1.125rem;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
    position: relative;
}

.timeline-card-compact:hover {
    border-color: var(--color-border-strong, rgba(0,0,0,0.2));
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.06));
}

.timeline-title-compact {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text, #111);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.timeline-icon-compact {
    color: var(--color-text-muted, #999);
    font-size: 1rem;
    flex-shrink: 0;
}

.timeline-company-compact {
    font-size: 0.875rem;
    color: var(--color-text-secondary, #555);
    font-weight: 400;
    margin-top: 0.25rem;
}

.timeline-description-compact {
    font-size: 0.875rem;
    color: var(--color-text-secondary, #555);
    line-height: 1.5;
    margin-top: 0.375rem;
}

.timeline-period-compact {
    font-size: 0.75rem;
    color: var(--color-text-muted, #999);
    font-weight: 400;
    margin-top: 0.375rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.timeline-duration {
    color: var(--color-text-secondary, #555);
    font-weight: 400;
}

.timeline-duration-compact {
    font-size: 0.75rem;
    color: var(--color-text-muted, #999);
    font-weight: 400;
    margin-top: 0.2rem;
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