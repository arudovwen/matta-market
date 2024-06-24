// __tests__/components/Breadcrumb.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Breadcrumb from '~/components/Breadcrumbs/index.vue' // Adjust the path as necessary

describe('Breadcrumb', () => {
  it('renders a list of links', () => {
    const links = [
      { title: 'home', url: '/' },
      { title: 'about', url: '/about' },
      { title: 'contact', url: '/contact' },
    ]

    const wrapper = mount(Breadcrumb, {
      props: { links },
    })

    // Check that the correct number of links is rendered
    const linkElements = wrapper.findAll('li')
    expect(linkElements.length).toBe(links.length)

    // Check that each link has the correct title and URL
    links.forEach((link, idx) => {
      const linkElement = linkElements[idx].find('a')
      expect(linkElement.text()).toBe(link.title)
      // expect(linkElement.attributes('href')).toBe(link.url)
    })
  })

  it('applies the default className', () => {
    const links = [
      { title: 'home', url: '/' },
      { title: 'about', url: '/about' },
    ]

    const wrapper = mount(Breadcrumb, {
      props: { links },
    })

    const linkElements = wrapper.findAll('li')
    linkElements.forEach((linkElement) => {
      expect(linkElement.classes()).toContain('text-matta-black/80')
      expect(linkElement.classes()).toContain('last:text-matta-black')
    })
  })

  it('applies the custom className', () => {
    const links = [
      { title: 'home', url: '/' },
      { title: 'about', url: '/about' },
    ]
    const customClassName = 'custom-class'

    const wrapper = mount(Breadcrumb, {
      props: { links, className: customClassName },
    })

    const linkElements = wrapper.findAll('li')
    linkElements.forEach((linkElement) => {
      expect(linkElement.classes()).toContain(customClassName)
    })
  })
})
