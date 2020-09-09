import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddCardModal from "../Components/Navbars/AddCardModal";
Enzyme.configure({ adapter: new Adapter() });

describe('AddCardModal', () => {
  it('should do something', () => {
    const wrapper = shallow(<AddCardModal />);
    const text = wrapper.find('div div');
    expect(text.text()).toBe('Text goes here')
  })
})