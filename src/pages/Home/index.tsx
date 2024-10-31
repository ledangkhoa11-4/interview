import { IRootState } from "appRedux/reducers";
import { memo } from "react";
import { useSelector } from "react-redux";
// import classes from "./styles.module.scss";
import Select from "components/Select";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = memo((props: HomePageProps) => {
  const products = useSelector((state: IRootState) => state.products);

  console.log(products);
  return (
    <>
      <Select
        label="Sort by:"
        placeholder="Sort by"
        options={[
          { value: "", label: "Name A-Z" },
          { value: "", label: "Name Z-A" },
          { value: "", label: "Rating: High to Low" },
          { value: "", label: "Rating: Low to High" },
          { value: "", label: "Price: High to Low" },
          { value: "", label: "Price: Low to High" },
        ]}
      />
    </>
  );
});

export default HomePage;
