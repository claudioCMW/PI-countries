import { configure, shallow, mount } from "enzyme";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Nav from "./nav";
configure({ adapter: new Adapter() });

describe("<AddActivity />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Nav />);
  });

  it("Renderiza un <form>", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });

  it('Renderiza un boton con el "type" "submit"', () => {
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
  });

  it("Renderiza un boton", () => {
    expect(
      wrapper.find('button[className="button-create-nav"]').at(0)
    ).toHaveLength(1);
  });
  it("Renderiza un <header>", () => {
    expect(wrapper.find("header")).toHaveLength(1);
  });

  it("Renderiza un <input>", () => {
    expect(wrapper.find("input").at(0)).toHaveLength(1);
  });

  it("Renderiza un <h3>", () => {
    expect(wrapper.find("h3").at(0)).toHaveLength(1);
  });










});
