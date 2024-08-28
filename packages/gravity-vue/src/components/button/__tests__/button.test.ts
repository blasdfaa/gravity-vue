import { mount } from '@vue/test-utils'
import Button from '../button.vue'
import type { ButtonPin, ButtonSize, ButtonView } from '../types'

const qa = 'button'
const label = 'Button'

const buttonSizes: ButtonSize[] = ['xs', 's', 'm', 'l', 'xl']
const buttonViews: ButtonView[] = ['normal', 'action', 'outlined', 'outlined-info', 'outlined-danger', 'raised', 'flat', 'flat-info', 'flat-danger', 'flat-secondary', 'normal-contrast', 'outlined-contrast', 'flat-contrast']
const buttonPins: ButtonPin[] = ['round-round', 'brick-brick', 'clear-clear', 'circle-circle', 'round-brick', 'brick-round', 'round-clear', 'clear-round', 'brick-clear', 'clear-brick', 'circle-brick', 'brick-circle', 'circle-clear', 'clear-circle']
const buttonTypes = ['button', 'submit', 'reset'] as const

describe('button.vue', () => {
  it('render button by default', () => {
    const wrapper = mount(Button, { props: { qa } })
    const button = wrapper.get(`[data-qa=${qa}]`)

    expect(button.isVisible()).toBeTruthy()
    expect(button.attributes().disabled).toBeUndefined()
  })

  it.each(buttonSizes)('render with given "%s" size', (size) => {
    const wrapper = mount(Button, { props: { qa, size } })
    const button = wrapper.get(`[data-qa=${qa}]`)

    expect(button.classes()).toContain(`g-button_size_${size}`)
  })

  it.each(buttonViews)('render with given "%s" view', (view) => {
    const wrapper = mount(Button, { props: { qa, view } })
    const button = wrapper.get(`[data-qa=${qa}]`)

    expect(button.classes()).toContain(`g-button_view_${view}`)
  })

  it.each(buttonPins)('render with given "%s" pin', (pin) => {
    const wrapper = mount(Button, { props: { qa, pin } })
    const button = wrapper.get(`[data-qa=${qa}]`)

    expect(button.classes()).toContain(`g-button_pin_${pin}`)
  })

  it.each(buttonTypes)('render with given "%s" type', (type) => {
    const wrapper = mount(Button, { props: { qa, type } })
    const button = wrapper.get(`[data-qa=${qa}]`)

    expect(button.attributes().type).toEqual(type)
  })

  it('render button with label prop', () => {
    const wrapper = mount(Button, { props: { label } })

    expect(wrapper.html()).toContain(label)
  })

  it('render button with label prop and default slot', () => {
    const defaultSlot = 'I\'m default slot'

    const wrapper = mount(Button, { props: { label }, slots: { default: defaultSlot } })

    expect(wrapper.html()).toContain(defaultSlot)
  })
})
