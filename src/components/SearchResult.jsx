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
  if (!result) return;

  const { items, queries, searchInformation } = result;
  return (
    <div className="flex flex-col min-h-screen">
      <SearchResultHeader />
      <main className="grow p-[12px] pb-0 md:pl-20">
        <div className="flex text-sm text-[#70757a] mb-3">
          {`About ${searchInformation.formattedTotalResults} results in ${searchInformation.formattedSearchTime}`}
        </div>
        {!imagesearch ? (
          <>
            {items.map((item, index) => (
              <SearchedItemTemplate key={index} data={item} />
            ))}
          </>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
            {items.map((item, index) => (
              <SearchedImageItemTemplate key={index} data={item} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchResult;
