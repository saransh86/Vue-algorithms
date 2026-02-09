import {shallowMount} from '@vue/test-utils';
import GraphControls from '../../src/components/GraphControls.vue';

const BNavItemStub = {
  name: 'b-nav-item',
  props: ['disabled'],
  template: '<button :disabled="disabled" @click="$emit(\'click\')"><slot /></button>'
};

const BFormInputStub = {
  name: 'b-form-input',
  props: ['value'],
  template: '<input :value="value" @input="$emit(\'input\', $event.target.value)" />'
};

function buildWrapper(props = {}) {
  return shallowMount(GraphControls, {
    propsData: {
      node: '',
      nodeState: null,
      bstNode: '',
      bstNodeState: null,
      stackDfsStartNode: '',
      startNodeState: null,
      startBfsStartNode: '',
      startBfsNodeState: null,
      startNode: '',
      startState: null,
      destNode: '',
      destState: null,
      showInput: false,
      showBfsInput: false,
      showShortestPath: false,
      showBST: false,
      root: null,
      circlesLength: 0,
      connectionsLength: 0,
      tab: 0,
      ...props
    },
    stubs: {
      'b-navbar': true,
      'b-navbar-nav': true,
      'b-navbar-brand': true,
      'b-navbar-toggle': true,
      'b-collapse': true,
      'b-form-input': BFormInputStub,
      'b-form-invalid-feedback': true,
      'b-nav-item': BNavItemStub
    }
  });
}

describe('GraphControls', () => {
  it('emits update:node when input changes', async () => {
    const wrapper = buildWrapper();
    const input = wrapper.find('input');
    await input.setValue('A');
    expect(wrapper.emitted('update:node')[0]).toEqual(['A']);
  });

  it('emits click-circle when Add Node is clicked', async () => {
    const wrapper = buildWrapper();
    const buttons = wrapper.findAll('button');
    const addNodeButton = buttons.wrappers.find((b) => b.text() === 'Add Node');
    await addNodeButton.trigger('click');
    expect(wrapper.emitted('click-circle')).toBeTruthy();
  });

  it('disables Remove Node when circlesLength is 0', () => {
    const wrapper = buildWrapper({circlesLength: 0});
    const buttons = wrapper.findAll('button');
    const removeNodeButton = buttons.wrappers.find((b) => b.text() === 'Remove Node');
    expect(removeNodeButton.attributes('disabled')).toBe('disabled');
  });
});
