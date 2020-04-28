import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Global from '../Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

//1. Obtener el ID del articulo a editar de la url
//2. Crear metodo para sacar objeto del backend
//3. Rellenar el formulario con esos datos
//4. Actualizar el objeto haciendo una peticion al back
class EditArticle extends Component {
    url = Global.url;

    articleId = null;
    titleRef = React.createRef();
    ContentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    componentWillMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido'
            }
        });
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                });
            });
    }
    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.ContentRef.current.value,
                image: this.state.article.image
            }
        });

        this.validator.showMessages();
        this.forceUpdate();
    }

    fileChange = (event) => {
        this.setState({
            //el primer archivo es el que subo
            selectedFile: event.target.files[0]
        });
    }

    saveArticle = (e) => {
        e.preventDefault();

        //Rellenar el State con formulario
        this.changeState();

        if (this.validator.allValid()) {
            //Hacer peticion http por post para guardar el articulo
            axios.put(this.url + 'article/'+this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        swal(
                            'Articulo Creado',
                            'El articulo se creo correctamente',
                            'success'
                        )
                        //subir la imagen
                        if (this.state.selectedFile !== null) {
                            // sacar el id de el articulo guardado
                            var articleId = this.state.article._id;
                            //crear formdata y añadir fichero

                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );



                            //peticion ajax
                            axios.post(this.url + 'upload-image/' + articleId, formData)
                                .then(res => {

                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                })

                        } else {
                            this.setState({
                                status: 'success'
                            });
                        }

                    } else {
                        this.setState({
                            status: 'failed'
                        })
                    }
                });
        } else {
            swal(
                'Ups.!',
                'Hubo un error',
                'error'
            )
            this.setState({
                status: 'failed'
            });
            this.validator.showMessages();
            this.forceUpdate();
        }

    }
    render() {
        console.log(this.state.article);

        if (this.state.status === 'success') {
            return <Redirect to="/blog" />
        }
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar Articulo</h1>
                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" defaultValue={this.state.article.title} name="title" ref={this.titleRef} onChange={this.changeState} />

                                {this.validator.message('title', this.state.article.title, 'required|alpha_space')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" defaultValue={this.state.article.content} ref={this.ContentRef} onChange={this.changeState}></textarea>

                                {this.validator.message('content', this.state.article.title, 'required')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.fileChange} />
                            </div>

                            <div className="image-wrap">
                                {
                                    this.state.article.image !== null ? (
                                        <img src={this.url + 'get-image/' + this.state.article.image} alt={this.state.article.title} className="thumb" />
                                    ) : (
                                            <img src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8" className="thumb" alt="Paisaje" />
                                        )
                                }
                            </div>

                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    }
                    {!this.state.article.title &&
                        <h1 className="subheader">Cargando</h1>
                    }

                </section>

                <Sidebar />
            </div>
        )
    }
}

export default EditArticle;
