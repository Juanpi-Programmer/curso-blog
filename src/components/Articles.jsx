import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';
import Global from '../Global';
import { Link } from 'react-router-dom';

class Articles extends Component {
    url = Global.url;

    state = {
        articles: [],
        status: null
    };

    componentDidMount() {
        var home = this.props.home;
        var search = this.props.search;

        if (home === 'true') {
            this.getLastArticles();
        } else if (search && search != null && search != undefined) {
            this.getArticlesBySearch(search);
        } else {
            this.getArticles();
        }


    }

    getArticles = () => {
        axios.get(this.url + 'articles')
            .then(res => {
                this.setState({
                    articles: res.data.article,
                    status: 'success'
                });
            });
    }

    getLastArticles = () => {
        axios.get(this.url + 'articles/last')
            .then(res => {
                this.setState({
                    articles: res.data.article,
                    status: 'success'
                });
            });
    }

    getArticlesBySearch = (searched) => {
        axios.get(this.url + 'search/' + searched)
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
                console.log(this.state.articles);
            })
            .catch(err =>{
                this.setState({
                    articles: [],
                    status: 'success'
                });
            })
        


    }

    render() {
        if (this.state.articles.length >= 1) {

            let listArticles = this.state.articles.map((article) => {
                return (
                    <article className="article-item" id="article-template" key={article._id}>
                        <div className="image-wrap">
                            {article.image !== null ? (
                                <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                            ) : (
                                    <img src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8" alt="Paisaje" />
                                )
                            }
                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment fromNow>{article.date}</Moment>
                        </span>

                        <Link to={'blog/articulo/' + article._id}>Leer más</Link>

                        <div className="clearfix"></div>
                    </article>
                );
            })
            return (
                <div id="articles">
                    <h1>Listado de Articulos</h1>
                    {listArticles}
                </div>
            );
        }
        if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h2>No hay articulos</h2>
                    <p>Todavia no hay contenido en esta seccion</p>
                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h2>Cargandoo....</h2>
                    <p>Espera bb</p>
                </div>
            );
        }
    }
}

export default Articles;

