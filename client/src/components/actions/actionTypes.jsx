export const handleData = (initialData) => {
  return {
    type: "HANDLE_DATA",
    payload: initialData,
  };
};
export const handleFilterData = (filterData) => {
  return {
    type: "HANDLE_FILTER_DATA",
    payload: filterData,
  };
};

export const handleSearch = (search) => {
  return {
    type: "HANDLE_SEARCH",
    payload: search,
  };
};
export const handleSearchBy = (searchBy) => {
  return {
    type: "HANDLE_SEARCH_BY",
    payload: searchBy,
  };
};
