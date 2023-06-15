import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

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
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&apiKey=4d26820f6418423a92b1dfbafbb7bdd2&pageSize=${
      this.props.pageSize
    }&page=${this.state.page + 1}&category=${this.props.category}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false,
    });
    console.log("Next");
  };
  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&apiKey=4d26820f6418423a92b1dfbafbb7bdd2&pageSize=${
      this.props.pageSize
    }&page=${this.state.page - 1}&category=${this.props.category}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
    console.log("Previous");
  };
  render() {
    return (
      <div>
        <h1 className="text-center">The Morning Newsletter: Top Headlines</h1>
        <div className="row">
          {!this.state.loading}&
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage===null?"https://c.ndtvimg.com/2023-06/53rrda94_ayodhya-ram-temple_625x300_12_June_23.jpg":element.urlToImage}
                  newsUrl={element.url}
                  author={element.author===null?"Unknown":element.author}
                  date={element.publishedAt===null?"Unknown":element.publishedAt.slice(0,10)}
                  source={element.source.name}
                />
              </div>
            );
          })}
          <div className="container d-flex justify-content-between">
            <button
              className="btn btn-dark my-3"
              onClick={this.handlePreviousClick}
              disabled={this.state.page <= 1}
            >
              &larr; Previous
            </button>
            <button
              className="btn btn-dark my-3"
              onClick={this.handleNextClick}
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.articles / this.props.pageSize)
              }
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=4d26820f6418423a92b1dfbafbb7bdd2&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: 1,
      loading: false,
    });
  }
}
export default news;
