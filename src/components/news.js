import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

const News = (props) => {
  let apiKey = process.env.REACT_APP_NEWS_API;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  document.title = `The Morning Newsletter: ${props.category}`;

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${apiKey}&pageSize=${props.pageSize}&page=${page}&category=${props.category}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  const handleNextClick = async () => {
    setPage(page + 1);
    updateNews();
  };
  const handlePreviousClick = async () => {
    setPage(page - 1);
    updateNews();
  };
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${apiKey}&pageSize=${props.pageSize}&page=${page+1}&category=${props.category}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setLoading(false);
    setTotalResults(parsedData.totalResults);
  };
  useEffect(() => {
    updateNews();
  }, []);
  return (
    <>
      <h1 className="text-center" style={{marginTop: 60}}>The Morning Newsletter: Top Headlines</h1>
      {loading && <Spinner />}
      <div className="row">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={
                        element.urlToImage === null
                          ? "https://c.ndtvimg.com/2023-06/53rrda94_ayodhya-ram-temple_625x300_12_June_23.jpg"
                          : element.urlToImage
                      }
                      newsUrl={element.url}
                      author={
                        element.author === null ? "Unknown" : element.author
                      }
                      date={
                        element.publishedAt === null
                          ? "Unknown"
                          : element.publishedAt.slice(0, 10)
                      }
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
