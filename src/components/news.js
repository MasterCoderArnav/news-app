import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class news extends Component {
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
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4d26820f6418423a92b1dfbafbb7bdd2&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
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
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4d26820f6418423a92b1dfbafbb7bdd2&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false,
    });
    console.log("Previous");
  };
  render() {
    return (
      <div>
        <h1 className="text-center">The Morning Newsletter: Top Headlines</h1>
        <div className="row">
          {!this.state.loading}&&{this.state.articles.map((element) => {
            return (
              <>
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              </>
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
              disabled={this.state.page+1 > Math.ceil(this.state.articles / this.props.pageSize)}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=4d26820f6418423a92b1dfbafbb7bdd2&page=1&pageSize=${this.props.pageSize}}`;
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
