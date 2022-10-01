import { shallowMount } from '@vue/test-utils';
import Nickname from '@/components/Nickname.vue';

describe('Nickname.vue', () => {
  it('renders props.nickname when passed', () => {
    const nickname = 'Player';
    const wrapper = shallowMount(Nickname, {
      props: { nickname },
    });
    expect(wrapper.find('input').element.value).toBe(nickname);
  });
});
