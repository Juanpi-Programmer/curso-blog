import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import Moment from 'react-moment';
import { Link, Redirect } from 'react-router-dom';
import 'moment/locale/es';
import swal from 'sweetalert';

class Article extends Component {
    url = Global.url;
    state = {
        articles: {},
        status: null
    }

    componentDidMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(`${this.url}article/${id}`)
            .then(res => {
                this.setState({
                    articles: res.data.article,
                    status: 'success'
                })
            }).catch(err => {
                this.setState({
                    articles: [],
                    status: 'success'
                })
            });
    }

    deleteArticle = (id) => {
        swal({
            title: "Eliminar",
            text: "Esta seguro?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Eliminado Correctamente", {
                        icon: "success",
                    });
                    axios.delete(this.url + 'article/' + id)
                        .then(res => {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            })
                        });
                }
            });
    }

    render() {
        if (this.state.status === 'deleted') {
            return <Redirect to="/blog" />
        }
        let { articles } = this.state;

        return (
            <div className="center">
                <section id="content">
                    {this.state.articles &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {
                                    articles.image !== null ? (
                                        <img src={this.url + 'get-image/' + articles.image} alt={articles.title} />
                                    ) : (
                                            <img src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8" alt="Paisaje" />
                                        )
                                }
                            </div>

                            <h1 className="subheader">{articles.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>{articles.date}</Moment>
                            </span>
                            <p>
                                {articles.content}
                            </p>


                            <button onClick={
                                () => {
                                    this.deleteArticle(articles._id);
                                }

                            }className="btn btn-danger">Eliminar</button>
                            <Link to={'/blog/editar/'+articles._id} className="btn btn-warning">Editar</Link>


                            <div className="clearfix"></div>
                        </article>

                    }
                    {!this.state.articles && this.state.status === 'success' &&
                        <p>No hay nada que mostrar mi amor</p>
                    }
                </section>

                <Sidebar />
            </div>
        );
    }
}

export default Article;