import React, { Component } from "react";
import './App.css';
import $ from 'jquery';
import MovieRow from "./MovieRow";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {}
        this.performSearch("all")
        }

        performSearch(searchTerm) {
            const urlString = "https://api.themoviedb.org/3/search/movie?api_key=42d9e0cc02fafd599f0e029afe43b56d&language=en-US&page=1&include_adult=false&query=" + searchTerm
            $.ajax({
                url: urlString,
                success: (searchResults) => {
                    const results = searchResults.results
                    var movieRows = []
                    results.forEach((movie) => {
                        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
                        const movieRow = <MovieRow key = {movie.id} movie={movie}/>
                        movieRows.push(movieRow)
                    })
                    console.log(movieRows)
                    this.setState({rows:movieRows})

                },
                error :(xhr,status,err) => {
                    console.error("Failed to fetch data")
                }
            })
        }
    filter(){
        const urlString = "https://api.themoviedb.org/3/movie/popular?api_key=42d9e0cc02fafd599f0e029afe43b56d&language=en-US&page=1"
        $.ajax({
            url: urlString,
            success: (searchResults) => {
                const results = searchResults.results
                var movieRows = []
                    results.sort(function (a,b) {
                        if(a.popularity > b.popularity)
                        {
                            return 1;
                        }
                        if(a.popularity < b.popularity)
                        {
                            return -1;
                        }
                        return 0
                    })
                results.forEach((movie) => {
                    movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
                    const movieRow = <MovieRow key = {movie.id} movie={movie}/>
                    movieRows.push(movieRow)
                })
                this.setState({rows:movieRows})
            },
            error :(xhr,status,err) => {
                console.error("Failed to fetch data")
            }
    })
    }




searchChangeHandler(event) {
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
}

render(){
    return <div className="App">
        <table className = "titleBar">
            <tbody>
            <tr>
                <td>
                   <img alt = "app icon" width = "50" src ="logo192.png"/>
                </td>
                <td width="8"/>
                <td>
                    <h1>MovieDB</h1>
                </td>
            </tr>
            </tbody>
        </table>

        <input className = "placeHolder" onChange={this.searchChangeHandler.bind(this)} placeholder= "Enter search team"/>
       <input type="button" onClick= {this.filter.bind(this)} value = "filter popularity movie"/>
        {/*<button className="btn btn-default" onClick={() => this.filterMovie('popular')}>*/}
        {/*    <i className="fa fa-sort-alpha-asc"></i>  Sort by popular</button>*/}
        {this.state.rows}

    </div>


}
}
export default App;

