import Header from "../../header/Header.logic";
import useSearch from "../../header/SearchBox/useSearch.hook";
import NoResultFound from "./NoResultsFound/NoResultFound";
import SearchList from "./SearchList/SearchList";
import "./SearchContainer.scss";
import Spinner from "../../common/Spinner/Spinner";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/reducer/CombineReducer";

export const SearchContainer = () => {
  const { searchList } = useSearch();
  const { spinnerData } = useSelector((state: IRootState) => state);
  const isLoading = spinnerData && spinnerData.isLoading;
  return (
    <div>
      <Header />

      {isLoading ? (
        <Spinner />
      ) : searchList.length > 0 ? (
        <SearchList />
      ) : (
        <NoResultFound />
      )}
    </div>
  );
};

export default SearchContainer;
