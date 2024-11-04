# [KVYTECH] Take-Home Test

(This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)).

### Live Site: [Live site](http://www.interview.khoa-life.com)

# How to Run the Project Locally

1. **Load the environment variables by renaming** `.env.example` to `.env`.
2. **Install the necessary libraries by running**:

   #### `yarn install`

3. **Start the application in development mode by executing**:

   #### `yarn start`

   You can view the application in your browser at [http://localhost:3000](http://localhost:3000).

   The page will automatically reload if you make any edits. Additionally, any linting errors will be displayed in the console.

---

## Additional Commands

1. **To run the tests, execute**:

   #### `yarn test`

   This command will run the test suite for the application, allowing you to verify that all functionalities are working as intended. You will receive feedback in the console regarding the results of the tests.

2. **To build the application for production, execute**:

   #### `yarn build`

   This command compiles the application into an optimized bundle that is ready for deployment. The output will be located in the `build` directory, which you can then serve using a web server.

---

## Approach and Challenges Faced During Development

**1. Project Initialization**:

- I utilized `Create React App` with the `TypeScript` template to initialize the project.
- In addition to `ESLint`, I use many strict check props in the `tsconfig.json` configuration file. This setting ensures that TypeScript applies rigorous type-checking throughout the codebase.

**2. Fetching and Displaying Product Data**:

- Using `Redux` to store product data in the global state, making it accessible throughout the application.
- I used a limit query to manage product data, loading only three products for mobile devices and six for desktop when the page first loads.
- I used the `react-virtualized` library for windowing, improving performance by rendering only the visible products.
- To facilitate infinite scrolling, I integrated the `IntersectionObserver` API, enhancing user experience by allowing continuous scrolling. These techniques improve web performance by reducing Total Blocking Time (TBT) and optimizing Largest Contentful Paint (LCP).

**3. Implement product filters and sort**:

- **Limitations of Back-end Support**: Since the back-end does not support sorting and filtering, I simulated these features by querying all products and applying sorting and filtering on the front-end, limiting the displayed results.

- **Debounced Fetching**: I used `useDebounce` to delay fetching data until the user completes sorting and filtering, improving performance by minimizing unnecessary API calls.

- I utilized the `react-select` library to customize the Select component for reusable purposes.

- I implemented functionality that allows users to combine multiple filtering options, as well as to sort the results concurrently

**4. Shopping cart functionality**

- Using `Redux` to manage cart data in the global state.
- I stored the cart state in `localStorage` to ensure data persistence across sessions and after page refreshes.
- Update the cart badge in the header with the number of products.

**5. Responsive**

- All components on the home page and cart page function effectively on both desktop and mobile devices.

**6. Bonus**
- **UX**: I implemented product skeleton instead of traditional loading indicators to enhance the user experience during data loading."

- **Code Organization**: I organized the code according to standard practices for React projects, facilitating future scalability.

- **Code Splitting and Resource Optimization**: I implemented code splitting, lazy loading, and resource preloading to enhance performance.

- **Windowing and Infinite Scrolling**: I utilized windowing techniques and infinite scrolling for efficient rendering of product lists.

- **Global State Management**: I employed a global state management solution (e.g., Redux, Zustand, or React Context) to manage the cart state effectively.

- **Unit Testing**: I wrote unit tests with `Jest` and `Testing-Library-React` for both Redux components and UI components to ensure reliability and maintainability.

- **Product Search Functionality**: I added a search bar to filter products by name and description, improving user experience.
***

## Challenges

- **Performance Maintenance**: I have to ensure optimal performance and adherence to best practices (e.g., PageSpeed and Chrome Lighthouse scores) during application development. Just some changes in CSS can seriously reduce performance scores.

- **Component Refactoring**: I need to refactor the entire product list component when implementing windowing techniques.

- **Testing Difficulties**: Encountering challenges while writing tests for components that utilize Redux or Redux Saga. I had trouble configuring `babel` and `jest` config.
