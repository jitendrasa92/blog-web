import React, { useState, useEffect } from 'react';
//import React, { Component } from "react";
import Header from "./elements/Header";
import Footer from "./elements/Footer";
import apiUrl from "../constants/apiPath";
import Helper from "../constants/helper";
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

const Home = (props) => {


    const [error, setError] = React.useState();
    const [isLoaded, setIsLoaded] = React.useState();
    const [articleList, setarticleList] = React.useState([]);
    const [activepage, setActivePage] = useState(1);

    const getArticleList = async (page = activepage) => {
        let path = apiUrl.getArticles + '?page=' + `${page}`;
        const fr = await Helper.get(path);
        const res = await fr.response.json();
        if (res.status) {
            console.log(res.data)
            setarticleList(res.data);
        } else {
            Toast.fire({
                type: "error",
                title: res.msg,
            });
        }
    }

    useEffect(() => {
        console.log(articleList)
    }, [articleList])

    useEffect(() => {
        getArticleList()
        //api call list
        return () => {

        }

    }, [])

    return (
        <React.Fragment>
            <div classNam="edica-loader"></div>
            <Header />
            <main className="blog">
                <div className="container">
                    <h1 className="edica-page-title" data-aos="fade-up">Blog</h1>
                    <section className="featured-posts-section">
                        <div className="row">
                            <div className="col-md-4 fetured-post blog-post" data-aos="fade-right">
                                <div className="blog-post-thumbnail-wrapper">
                                    <img src="assets/images/blog_1.jpg" alt="blog post" />
                                </div>
                                <p className="blog-post-category">Blog post</p>
                                <a href="#!" className="blog-post-permalink">
                                    <h6 className="blog-post-title">Front becomes an official Instagram Marketing Partner</h6>
                                </a>
                            </div>
                            <div className="col-md-4 fetured-post blog-post" data-aos="fade-up">
                                <div className="blog-post-thumbnail-wrapper">
                                    <img src="assets/images/blog_2.jpg" alt="blog post" />
                                </div>
                                <p className="blog-post-category">Blog post</p>
                                <a href="#" className="blog-post-permalink">
                                    <h6 className="blog-post-title">Front becomes an official Instagram Marketing Partner</h6>
                                </a>
                            </div>
                            <div className="col-md-4 fetured-post blog-post" data-aos="fade-left">
                                <div className="blog-post-thumbnail-wrapper">
                                    <img src="assets/images/blog_3.jpg" alt="blog post" />
                                </div>
                                <p className="blog-post-category">Blog post</p>
                                <a href="#" className="blog-post-permalink">
                                    <h6 className="blog-post-title">Front becomes an official Instagram Marketing Partner</h6>
                                </a>
                            </div>
                        </div>
                    </section>
                    <div className="row">
                        <div className="col-md-8">
                            <section>
                                <div className="row blog-post-row">
                                    <div className="col-md-6 blog-post" data-aos="fade-up">
                                        <div className="blog-post-thumbnail-wrapper">
                                            <img src="assets/images/blog_4.jpg" alt="blog post" />
                                        </div>
                                        <p className="blog-post-category">Blog post</p>
                                        <a href="#!" className="blog-post-permalink">
                                            <h6 className="blog-post-title">Front becomes an official Instagram Marketing Partner</h6>
                                        </a>
                                    </div>
                                    <div className="col-md-6 blog-post" data-aos="fade-up">
                                        <div className="blog-post-thumbnail-wrapper">
                                            <img src="assets/images/blog_5.jpg" alt="blog post" />
                                        </div>
                                        <p className="blog-post-category">Blog post</p>
                                        <a href="#!" className="blog-post-permalink">
                                            <h6 className="blog-post-title">Front becomes an official Instagram Marketing Partner</h6>
                                        </a>
                                    </div>
                                </div>
                                <div className="row blog-post-row">
                                    {articleList.map((item, key) => {
                                        return (
                                            <div className="col-md-6 blog-post" data-aos="fade-up" key={key}>
                                                <div className="blog-post-thumbnail-wrapper">
                                                    <img src={process.env.REACT_APP_API_BASE_URL + item.img} alt="blog post" />
                                                </div>
                                                <p className="blog-post-category">{item.title}</p>
                                                <a href="#!" className="blog-post-permalink">
                                                    <h6 className="blog-post-title">{item.content}</h6>
                                                </a>
                                            </div>
                                        )
                                    })}
                                    <div className="col-md-6 blog-post" data-aos="fade-up">
                                        <div className="blog-post-thumbnail-wrapper">
                                            <img src="assets/images/blog_6.jpg" alt="blog post" />
                                        </div>
                                        <p className="blog-post-category">Blog post</p>
                                        <a href="#!" className="blog-post-permalink">
                                            <h6 className="blog-post-title">Front becomes an official Instagram Marketing Partner</h6>
                                        </a>
                                    </div>
                                    <div className="col-md-6 blog-post" data-aos="fade-up">
                                        <div className="blog-post-thumbnail-wrapper">
                                            <img src="assets/images/blog_7.jpg" alt="blog post" />
                                        </div>
                                        <p className="blog-post-category">Blog post</p>
                                        <a href="#!" className="blog-post-permalink">
                                            <h6 className="blog-post-title">Front becomes an official Instagram Marketing Partner</h6>
                                        </a>
                                    </div>
                                </div>
                                <div className="row blog-post-row">
                                    <div className="col-md-6 blog-post" data-aos="fade-up">
                                        <div className="blog-post-thumbnail-wrapper">
                                            <img src="assets/images/blog_8.jpg" alt="blog post" />
                                        </div>
                                        <p className="blog-post-category">Blog post</p>
                                        <a href="#!" className="blog-post-permalink">
                                            <h6 className="blog-post-title">Front becomes an official Instagram Marketing Partner</h6>
                                        </a>
                                    </div>
                                    <div className="col-md-6 blog-post" data-aos="fade-up">
                                        <div className="blog-post-thumbnail-wrapper">
                                            <img src="assets/images/blog_9.jpg" alt="blog post" />
                                        </div>
                                        <p className="blog-post-category">Blog post</p>
                                        <a href="#!" className="blog-post-permalink">
                                            <h6 className="blog-post-title">Front becomes an official Instagram Marketing Partner</h6>
                                        </a>
                                    </div>
                                </div>
                                <div className="row blog-post-row">
                                    <div className="col-md-6 blog-post" data-aos="fade-up">
                                        <div className="blog-post-thumbnail-wrapper">
                                            <img src="assets/images/blog_10.jpg" alt="blog post" />
                                        </div>
                                        <p className="blog-post-category">Blog post</p>
                                        <a href="#!" className="blog-post-permalink">
                                            <h6 className="blog-post-title">Front becomes an official Instagram Marketing Partner</h6>
                                        </a>
                                    </div>
                                    <div className="col-md-6 blog-post" data-aos="fade-up">
                                        <div className="blog-post-thumbnail-wrapper">
                                            <img src="assets/images/blog_11.jpg" alt="blog post" />
                                        </div>
                                        <p className="blog-post-category">Blog post</p>
                                        <a href="#!" className="blog-post-permalink">
                                            <h6 className="blog-post-title">Front becomes an official Instagram Marketing Partner</h6>
                                        </a>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="col-md-4 sidebar" data-aos="fade-left">
                            <div className="widget widget-post-carousel">
                                <h5 className="widget-title">Post Lists</h5>
                                <div className="post-carousel">
                                    <div id="carouselId" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li data-target="#carouselId" data-slide-to="0" className="active"></li>
                                            <li data-target="#carouselId" data-slide-to="1"></li>
                                            <li data-target="#carouselId" data-slide-to="2"></li>
                                        </ol>
                                        <div className="carousel-inner" role="listbox">
                                            <figure className="carousel-item active">
                                                <img src="assets/images/blog_widget_carousel.jpg" alt="First slide" />
                                                <figcaption className="post-title">
                                                    <a href="#!">Front becomes an official Instagram Marketing Partner</a>
                                                </figcaption>
                                            </figure>
                                            <figure className="carousel-item">
                                                <img src="assets/images/blog_7.jpg" alt="First slide" />
                                                <figcaption className="post-title">
                                                    <a href="#!">Front becomes an official Instagram Marketing Partner</a>
                                                </figcaption>
                                            </figure>
                                            <div className="carousel-item">
                                                <img src="assets/images/blog_5.jpg" alt="First slide" />
                                                <figcaption className="post-title">
                                                    <a href="#!">Front becomes an official Instagram Marketing Partner</a>
                                                </figcaption>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="widget widget-post-list">
                                <h5 className="widget-title">Post List</h5>
                                <ul className="post-list">
                                    <li className="post">
                                        <a href="#!" className="post-permalink media">
                                            <img src="assets/images/blog_widget_1.jpg" alt="blog post" />
                                            <div className="media-body">
                                                <h6 className="post-title">Front becomes an official Instagram Marketing Partner</h6>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="post">
                                        <a href="#!" className="post-permalink media">
                                            <img src="assets/images/blog_widget_2.jpg" alt="blog post" />
                                            <div className="media-body">
                                                <h6 className="post-title">Front becomes an official Instagram Marketing Partner</h6>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="post">
                                        <a href="#!" className="post-permalink media">
                                            <img src="assets/images/blog_widget_3.jpg" alt="blog post" />
                                            <div className="media-body">
                                                <h6 className="post-title">Front becomes an official Instagram Marketing Partner</h6>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="post">
                                        <a href="#!" className="post-permalink media">
                                            <img src="assets/images/blog_widget_4.jpg" alt="blog post" />
                                            <div className="media-body">
                                                <h6 className="post-title">Front becomes an official Instagram Marketing Partner</h6>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="widget">
                                <h5 className="widget-title">Categories</h5>
                                <img src="assets/images/blog_widget_categories.jpg" alt="categories" className="w-100" />
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <section className="edica-footer-banner-section">
                <div className="container">
                    <div className="footer-banner" data-aos="fade-up">
                        <h1 className="banner-title">Download it now.</h1>
                        <div className="banner-btns-wrapper">
                            <button className="btn btn-success"> <img src="assets/images/apple@1x.svg" alt="ios" className="mr-2" /> App Store</button>
                            <button className="btn btn-success"> <img src="assets/images/android@1x.svg" alt="android" className="mr-2" /> Google Play</button>
                        </div>
                        <p className="banner-text">Add some helper text here to explain the finer details of your <br /> product or service.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </React.Fragment>
    )
}

export default Home;