import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

export class news extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  articles = [];
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `The Morning Newsletter: ${this.props.category}`;
  }
  updateNews = async () => {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=4d26820f6418423a92b1dfbafbb7bdd2&pageSize=${this.props.pageSize}&page=${this.state.page}&category=${this.props.category}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      loading: false,
      page: this.state.page,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);
  };
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=4d26820f6418423a92b1dfbafbb7bdd2&pageSize=${this.props.pageSize}&page=${this.state.page}&category=${this.props.category}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      page: this.state.page,
      totalResults: parsedData.totalResults,
    });
  };
  render() {
    return (
      <>
        <h1 className="text-center">The Morning Newsletter: Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => {
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
  }
  async componentDidMount() {
    this.updateNews();
  }
}
export default news;
