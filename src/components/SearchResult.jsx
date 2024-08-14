import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import SearchResultHeader from "./SearchResultHeader";
import Footer from "./Footer";
import SearchedItemTemplate from "./SearchedItemTemplate";
import SearchedImageItemTemplate from "./SearchedImageItemTemplate";
import Pagination from "./Pagination";
import { Context } from "../utils/ContextApi";

const SearchResult = () => {
  const [result, setResult] = useState();
  const { query, startIndex } = useParams();
  const { imagesearch } = useContext(Context);

  useEffect(() => {
    fetchSearchResult();
  }, [query, startIndex, imagesearch]);
  const fetchSearchResult = () => {
    let payload = { q: query, start: startIndex };
    if (imagesearch) {
      payload.searchType = "image";
    }
    fetchDataFromApi(payload).then((res) => {
      console.log(res);
      setResult(res);
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SearchResultHeader />
      <main className="grow p-[12px] pb-0 md:pl-20"></main>
      <Footer />
    </div>
  );
};

export default SearchResult;
