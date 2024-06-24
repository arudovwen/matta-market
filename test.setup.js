import { config } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Stub the NuxtLink component globally
config.global.stubs = {
  NuxtLink: defineComponent({
    name: 'NuxtLink',
    props: ['to'],
    template: '<a><slot /></a>',
  }),
}
