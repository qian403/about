<template>
  <div class="filterable-timeline">
    <!-- 篩選按鈕 -->
    <div class="timeline-filters" role="tablist" aria-label="經歷類別篩選">
      <button 
        v-for="filterOption in filterOptions" 
        :key="filterOption.value"
        class="filter-btn"
        :class="{ active: currentFilter === filterOption.value }"
        role="tab"
        :aria-selected="currentFilter === filterOption.value"
        :aria-controls="'timeline-items'"
        @click="setFilter(filterOption.value)"
      >
        <md-icon aria-hidden="true">{{ filterOption.icon }}</md-icon>
        <span>{{ filterOption.label }}</span>
      </button>
    </div>
    
    <!-- 時間軸 -->
    <div id="timeline-items" class="timeline" role="list" aria-label="經歷時間軸">
      <div class="timeline-line"></div>
      <TransitionGroup name="timeline-item">
        <div 
          v-for="item in filteredItems" 
          :key="item.id"
          class="timeline-item"
          :class="[item.type, { expanded: item.expanded }]"
          role="listitem"
          tabindex="0"
          :aria-expanded="item.expanded"
          @click="toggleExpand(item)"
          @keydown.enter="toggleExpand(item)"
          @keydown.space.prevent="toggleExpand(item)"
        >
          <div class="timeline-marker" :class="item.type">
            <md-icon aria-hidden="true">{{ getTypeIcon(item.type) }}</md-icon>
          </div>
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="timeline-date">{{ item.period }}</span>
              <span class="timeline-type-badge" :class="item.type">{{ getTypeLabel(item.type) }}</span>
            </div>
            <h3 class="timeline-title">{{ item.title }}</h3>
            <p v-if="item.subtitle" class="timeline-subtitle">{{ item.subtitle }}</p>
            <Transition name="expand">
              <div v-if="item.expanded" class="timeline-details">
                <p class="timeline-description">{{ item.description }}</p>
                <div v-if="item.tags && item.tags.length" class="timeline-tags">
                  <span v-for="tag in item.tags" :key="tag" class="timeline-tag">{{ tag }}</span>
                </div>
              </div>
            </Transition>
            <button 
              class="expand-btn" 
              :aria-label="item.expanded ? '收合詳情' : '展開詳情'"
              @click.stop="toggleExpand(item)"
            >
              <md-icon aria-hidden="true">{{ item.expanded ? 'expand_less' : 'expand_more' }}</md-icon>
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['filter-change', 'item-expand'])

// 篩選選項
const filterOptions = [
  { value: 'work', label: '工作', icon: 'work' },
  { value: 'education', label: '教育', icon: 'school' },
  { value: 'community', label: '社群', icon: 'groups' },
  { value: 'competition', label: '比賽', icon: 'emoji_events' }
]

// 當前篩選條件
const currentFilter = ref('work')

// 類別圖示對應
const typeIcons = {
  work: 'work',
  education: 'school',
  community: 'groups',
  competition: 'emoji_events'
}

// 類別標籤對應
const typeLabels = {
  work: '工作',
  education: '教育',
  community: '社群',
  competition: '比賽'
}

// 取得類別圖示
const getTypeIcon = (type) => typeIcons[type] || 'circle'

// 取得類別標籤
const getTypeLabel = (type) => typeLabels[type] || type

// 篩選後的項目
const filteredItems = computed(() => {
  if (currentFilter.value === 'all') {
    return props.items
  }
  return props.items.filter(item => item.type === currentFilter.value)
})

// 設定篩選條件
const setFilter = (filter) => {
  currentFilter.value = filter
  emit('filter-change', filter)
}

// 切換展開狀態
const toggleExpand = (item) => {
  item.expanded = !item.expanded
  emit('item-expand', item)
}

// 暴露方法供測試使用
defineExpose({
  currentFilter,
  filteredItems,
  setFilter,
  toggleExpand
})
</script>


<style scoped>
.filterable-timeline {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

/* 篩選按鈕 */
.timeline-filters {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--color-bg-card, #1e3044);
  border: 1px solid var(--color-border, #2a4a5e);
  border-radius: 24px;
  color: var(--color-text-secondary, #a8c5d8);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
  min-width: 44px;
}

.filter-btn:hover {
  background: var(--color-bg-tertiary, #2a3f54);
  border-color: var(--color-primary, #64b5f6);
  color: var(--color-text-primary, #e8f4f8);
}

.filter-btn.active {
  background: var(--color-primary, #64b5f6);
  border-color: var(--color-primary, #64b5f6);
  color: var(--color-on-primary, #0d1b2a);
}

.filter-btn:focus-visible {
  outline: 2px solid var(--color-primary, #64b5f6);
  outline-offset: 2px;
}

.filter-btn md-icon {
  font-size: 1.125rem;
  width: 1.125rem;
  height: 1.125rem;
}

/* 時間軸 */
.timeline {
  position: relative;
  padding-left: 60px;
}

.timeline-line {
  position: absolute;
  left: 17px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border, #2a4a5e);
  border-radius: 2px;
}

/* 時間軸項目 */
.timeline-item {
  position: relative;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item:hover {
  transform: translateX(4px);
}

.timeline-item:focus-visible {
  outline: none;
}

.timeline-item:focus-visible .timeline-content {
  outline: 2px solid var(--color-primary, #64b5f6);
  outline-offset: 2px;
}

/* 時間軸標記 */
.timeline-marker {
  position: absolute;
  left: -60px;
  top: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary, #0d1b2a);
  border: 2px solid var(--color-border, #2a4a5e);
  z-index: 1;
  transition: all 0.3s ease;
}

.timeline-marker md-icon {
  font-size: 1rem;
  color: var(--color-text-muted, #6b8a9e);
}

/* 類別顏色 */
.timeline-marker.work {
  border-color: var(--color-work, #64b5f6);
  background: rgba(100, 181, 246, 0.1);
}
.timeline-marker.work md-icon { color: var(--color-work, #64b5f6); }

.timeline-marker.education {
  border-color: var(--color-education, #81c784);
  background: rgba(129, 199, 132, 0.1);
}
.timeline-marker.education md-icon { color: var(--color-education, #81c784); }

.timeline-marker.community {
  border-color: var(--color-community, #ffb74d);
  background: rgba(255, 183, 77, 0.1);
}
.timeline-marker.community md-icon { color: var(--color-community, #ffb74d); }

.timeline-marker.competition {
  border-color: var(--color-competition, #f06292);
  background: rgba(240, 98, 146, 0.1);
}
.timeline-marker.competition md-icon { color: var(--color-competition, #f06292); }

.timeline-item:hover .timeline-marker {
  transform: scale(1.1);
}

/* 時間軸內容 */
.timeline-content {
  background: var(--color-bg-card, #1e3044);
  border: 1px solid var(--color-border, #2a4a5e);
  border-radius: 12px;
  padding: 1.25rem;
  position: relative;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-content {
  border-color: var(--color-border-light, #3a5a6e);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.timeline-item.expanded .timeline-content {
  border-color: var(--color-primary, #64b5f6);
}

/* 時間軸標頭 */
.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.timeline-date {
  font-size: 0.8125rem;
  color: var(--color-text-muted, #6b8a9e);
  font-weight: 500;
}

.timeline-type-badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border-radius: 12px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-type-badge.work {
  background: rgba(100, 181, 246, 0.15);
  color: var(--color-work, #64b5f6);
}

.timeline-type-badge.education {
  background: rgba(129, 199, 132, 0.15);
  color: var(--color-education, #81c784);
}

.timeline-type-badge.community {
  background: rgba(255, 183, 77, 0.15);
  color: var(--color-community, #ffb74d);
}

.timeline-type-badge.competition {
  background: rgba(240, 98, 146, 0.15);
  color: var(--color-competition, #f06292);
}

.timeline-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary, #e8f4f8);
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.timeline-subtitle {
  font-size: 0.9375rem;
  color: var(--color-primary, #64b5f6);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

/* 展開詳情 */
.timeline-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border, #2a4a5e);
}

.timeline-description {
  font-size: 0.9375rem;
  color: var(--color-text-secondary, #a8c5d8);
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.timeline-tag {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background: rgba(100, 181, 246, 0.1);
  color: var(--color-primary, #64b5f6);
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* 展開按鈕 */
.expand-btn {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  width: 36px;
  height: 36px;
  border: none;
  background: var(--color-bg-tertiary, #2a3f54);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 44px;
  min-height: 44px;
}

.expand-btn:hover {
  background: var(--color-primary, #64b5f6);
}

.expand-btn:hover md-icon {
  color: var(--color-on-primary, #0d1b2a);
}

.expand-btn:focus-visible {
  outline: 2px solid var(--color-primary, #64b5f6);
  outline-offset: 2px;
}

.expand-btn md-icon {
  font-size: 1.25rem;
  color: var(--color-text-secondary, #a8c5d8);
}

/* 動畫 */
.timeline-item-enter-active,
.timeline-item-leave-active {
  transition: all 0.4s ease;
}

.timeline-item-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.timeline-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.timeline-item-move {
  transition: transform 0.4s ease;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  padding-top: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 500px;
}

/* 尊重使用者的動畫偏好 */
@media (prefers-reduced-motion: reduce) {
  .timeline-item,
  .timeline-marker,
  .timeline-content,
  .filter-btn,
  .expand-btn {
    transition: none;
  }
  
  .timeline-item:hover {
    transform: none;
  }
  
  .timeline-item:hover .timeline-marker {
    transform: none;
  }
  
  .timeline-item-enter-active,
  .timeline-item-leave-active,
  .timeline-item-move,
  .expand-enter-active,
  .expand-leave-active {
    transition: none;
  }
}

/* 響應式設計 */
@media (max-width: 768px) {
  .timeline-filters {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
  }
  
  .filter-btn span {
    display: none;
  }
  
  .filter-btn md-icon {
    font-size: 1.25rem;
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .timeline {
    padding-left: 50px;
  }
  
  .timeline-line {
    left: 14px;
  }
  
  .timeline-marker {
    left: -50px;
    width: 30px;
    height: 30px;
  }
  
  .timeline-marker md-icon {
    font-size: 1rem;
  }
  
  .timeline-content {
    padding: 1rem;
  }
  
  .timeline-title {
    font-size: 1rem;
  }
  
  .timeline-subtitle {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .timeline {
    padding-left: 40px;
  }
  
  .timeline-line {
    left: 12px;
  }
  
  .timeline-marker {
    left: -40px;
    width: 26px;
    height: 26px;
    border-width: 2px;
  }
  
  .timeline-marker md-icon {
    font-size: 0.875rem;
  }
  
  .timeline-content {
    padding: 0.875rem;
  }
  
  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .timeline-title {
    font-size: 0.9375rem;
  }
  
  .expand-btn {
    right: 0.5rem;
    bottom: 0.5rem;
  }
}
</style>
