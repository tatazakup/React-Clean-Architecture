import $ from "jquery";
import { useEffect, useState } from "react";

export interface ISelect<T> {
  name: string;
  selected: T;
  setSelected: (input: T) => void;
  options: T[];
}

export const Select = <T extends string>(props: ISelect<T>) => {
  const { name, selected, setSelected, options } = props;

  const [SelectionId] = useState(`${name}-selection`);

  const handleDropdownClick = (event: JQuery.ClickEvent) => {
    const selectDom = $(event.currentTarget);

    if (selectDom.hasClass("active")) {
      selectDom.removeClass("active");
      selectDom.find(".dropdown-menu").slideUp(300);
    } else {
      selectDom.addClass("active");
      selectDom.find(".dropdown-menu").slideDown(300);
    }
  };

  const onSelect = (e: T) => {
    setSelected(e);
  };

  useEffect(() => {
    $(`#${SelectionId}`).on("click", handleDropdownClick);

    return () => {
      $(`#${SelectionId}`).off("click", handleDropdownClick);
    };
  }, []);

  return (
    <>
      <div id={SelectionId} className="selection">
        <div className="select">
          <p className="select">{selected}</p>
        </div>
        <ul id={`menus-${SelectionId}`} className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              id={option}
              onClick={() => {
                onSelect(option);
              }}
            >
              <p className="select">{option}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
