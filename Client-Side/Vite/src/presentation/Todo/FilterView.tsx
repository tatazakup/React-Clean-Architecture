import {
  SEARCH_OPTION,
  SORT_OPTION,
  SearchByTextProps,
  SortByProps,
  UpdateSearchByProps,
} from "./hook/useTodoModelController";
import { IFilter } from "@domain/Todo/Model/TodoModel";
import { Select } from "@components/Select/Select";

interface FilterViewProps {
  filter: IFilter;
  search: SearchByTextProps;
  searchBy: UpdateSearchByProps;
  sortBy: SortByProps;
}

export const FilterView = (props: FilterViewProps) => {
  const { filter, search, searchBy, sortBy } = props;
  const onSearchText = (text: string) => {
    search(text);
  };

  return (
    <>
      <nav className="w-100 my-2">
        <div className="d-flex gap-2 align-item-center">
          <Select
            name="searchby"
            selected={filter.searchBy}
            setSelected={(input) => searchBy(input)}
            options={SEARCH_OPTION}
          />

          <input
            data-cy="search-field"
            type="text"
            value={filter.search}
            className="px-5 rounded-4 w-100"
            placeholder="Search Text"
            onChange={(e) => onSearchText(e.target.value)}
          />
        </div>
      </nav>

      <nav className="d-flex justify-content-between align-item-center my-2">
        <p className="header-2">Todo</p>
        <div className="d-flex align-item-center gap-2">
          <p className="small">sort by : </p>
          <Select
            name="sortby"
            selected={filter.sortBy}
            setSelected={(input) => sortBy(input)}
            options={SORT_OPTION}
          />
        </div>
      </nav>
    </>
  );
};
