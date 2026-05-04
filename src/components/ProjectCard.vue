<template>
  <article class="project-card" :aria-labelledby="`proj-${projectId}`">
    <div class="card-image" v-if="project.image">
      <picture>
        <source :srcset="project.image.replace('.png', '.webp')" type="image/webp" />
        <img
          :src="project.image"
          :alt="`${project.name} 截圖`"
          loading="lazy"
          width="792"
          height="498"
          decoding="async"
        />
      </picture>
    </div>
    <div class="card-placeholder" v-else aria-hidden="true">
      <span class="placeholder-icon">{ }</span>
    </div>

    <div class="card-body">
      <h3 :id="`proj-${projectId}`" class="project-name">{{ project.name }}</h3>
      <p class="project-description">{{ project.description }}</p>

      <div class="project-tags" role="list" aria-label="使用技術">
        <span v-for="tag in project.tags" :key="tag" class="tag" role="listitem">{{ tag }}</span>
      </div>

      <div class="project-links" v-if="hasLinks">
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link card-link"
          :aria-label="`${project.name} GitHub`"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link card-link-primary"
          :aria-label="`${project.name} ${project.demoLabel || 'Demo'}`"
        >
          {{ project.demoLabel || 'Demo' }} →
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
    required: true
  }
})

const projectId = computed(() => props.project.name.toLowerCase().replace(/\s+/g, '-'))
const hasLinks = computed(() => props.project.github || props.project.demo)
</script>

<style scoped>
.project-card {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow var(--transition-normal) var(--ease-out),
              border-color var(--transition-normal) var(--ease-out),
              transform var(--transition-normal) var(--ease-out);
}

.project-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-border-strong);
  transform: translateY(-2px);
}

.card-image img {
  width: 100%;
  height: 170px;
  object-fit: cover;
  display: block;
}

.card-placeholder {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-alt);
  border-bottom: 1px solid var(--color-border);
}

.placeholder-icon {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--color-text-muted);
  font-family: monospace;
  letter-spacing: 0.2em;
}

.card-body {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.project-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-md);
  flex: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
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
  gap: 5px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  padding: 4px 0;
  transition: color var(--transition-fast) var(--ease-out);
}

.project-link:hover {
  color: var(--color-text);
}

.card-link, .card-link:hover {
  color: inherit;
}

.card-link-primary {
  color: var(--color-accent);
}

.card-link-primary:hover {
  color: var(--color-accent-hover);
}
</style>
