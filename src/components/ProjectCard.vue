<template>
  <article class="project-card" :aria-labelledby="`project-${projectId}`">
    <div class="project-image" v-if="project.image">
      <img 
        :src="project.image" 
        :alt="`${project.name} 專案截圖`" 
        loading="lazy" 
      />
    </div>
    <div class="project-placeholder" v-else aria-hidden="true">
      <md-icon>code</md-icon>
    </div>
    <div class="project-content">
      <h3 :id="`project-${projectId}`" class="project-name">{{ project.name }}</h3>
      <p class="project-description">{{ project.description }}</p>
      <div class="project-tags" role="list" aria-label="使用技術">
        <span 
          v-for="tag in project.tags" 
          :key="tag" 
          class="tag"
          role="listitem"
        >
          {{ tag }}
        </span>
      </div>
      <div class="project-links" v-if="hasLinks">
        <a 
          v-if="project.github" 
          :href="project.github" 
          target="_blank" 
          rel="noopener noreferrer"
          class="project-link"
          :aria-label="`${project.name} GitHub 連結`"
        >
          <svg class="link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a 
          v-if="project.demo" 
          :href="project.demo" 
          target="_blank" 
          rel="noopener noreferrer"
          class="project-link"
          :aria-label="`${project.name} Demo 連結`"
        >
          <md-icon aria-hidden="true">open_in_new</md-icon>
          Demo
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.name && value.description && Array.isArray(value.tags)
    }
  }
})

const projectId = computed(() => {
  return props.project.name.toLowerCase().replace(/\s+/g, '-')
})

const hasLinks = computed(() => {
  return props.project.github || props.project.demo
})
</script>

<style scoped>
.project-card {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal) var(--ease-out);
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-border-light);
}

.project-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.project-placeholder {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-bg-tertiary) 0%, var(--color-bg-secondary) 100%);
  color: var(--color-text-muted);
}

.project-placeholder md-icon {
  font-size: 48px;
  width: 48px;
  height: 48px;
}

.project-content {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.project-description {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-md);
  flex: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.project-links {
  display: flex;
  gap: var(--spacing-md);
  margin-top: auto;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  transition: color var(--transition-fast) var(--ease-out);
  min-height: var(--min-touch-target);
  padding: var(--spacing-xs) var(--spacing-sm);
}

.project-link:hover {
  color: var(--color-primary-light);
  text-decoration: underline;
}

.link-icon {
  width: 16px;
  height: 16px;
}

.project-link md-icon {
  font-size: 16px;
  width: 16px;
  height: 16px;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .project-content {
    padding: var(--spacing-md);
  }
  
  .project-name {
    font-size: var(--font-size-lg);
  }
  
  .project-description {
    font-size: var(--font-size-sm);
  }
  
  .project-link {
    min-height: var(--min-touch-target);
    padding: var(--spacing-sm) var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .project-links {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .project-link {
    justify-content: center;
    width: 100%;
  }
}

/* 減少動畫偏好 */
@media (prefers-reduced-motion: reduce) {
  .project-card {
    transition: none;
  }
  
  .project-card:hover {
    transform: none;
  }
}
</style>
