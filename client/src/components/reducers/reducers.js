const initialState = {
  initialData: {
    users: [],
    organizations: [],
    groups: [],
  },
  filteredData: {
    users: [],
    organizations: [],
    groups: [],
  },
  search: "",
  searchBy: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HANDLE_DATA":
      return {
        ...state,
        initialData: {
          ...state.initialData,
          ...action.payload,
        },
      };

    case "HANDLE_FILTER_DATA":
      return {
        ...state,
        filteredData: {
          ...state.filteredData,
          ...action.payload,
        },
      };
    case "HANDLE_SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "HANDLE_SEARCH_BY":
      return {
        ...state,
        searchBy: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
