import {shallowMount} from '@vue/test-utils';
import Canvas from '../../src/components/canvas.vue';

jest.mock('konva', () => ({
  stages: [
    {
      getContainer: () => ({style: {}})
    }
  ]
}));

describe('canvas.vue', () => {
  it('mounts and renders GraphControls', () => {
    const wrapper = shallowMount(Canvas, {
      stubs: {
        GraphControls: true,
        'v-stage': true,
        'v-layer': true,
        'v-line': true,
        'v-group': true,
        'v-circle': true,
        'v-text': true,
        'b-container': true,
        'b-row': true,
        'b-col': true,
        'b-list-group': true,
        'b-list-group-item': true
      }
    });

    expect(wrapper.findComponent({name: 'GraphControls'}).exists()).toBe(true);
  });
});
