import reducer, { ICategoryState, setCategoriesReducer } from "appRedux/reducers/categories";
import { ICategory } from "interfaces/categories";

describe("categorySlice", () => {
  const initialState: ICategoryState = {
    isLoading: false,
    data: null,
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle setCategoriesReducer", () => {
    const mockCategories: ICategory[] = [
      { title: "Category 1" }, // updated to match the ICategory structure
      { title: "Category 2" },
    ];

    const newState = reducer(
      initialState,
      setCategoriesReducer({
        isLoading: true,
        data: mockCategories,
      })
    );

    expect(newState.isLoading).toBe(true);
    expect(newState.data).toEqual(mockCategories);
  });

  it("should handle setCategoriesReducer with null data", () => {
    const newState = reducer(
      initialState,
      setCategoriesReducer({
        isLoading: false,
        data: null,
      })
    );

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toBeNull();
  });
});
