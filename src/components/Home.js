import React, { useState, useEffect } from 'react';
import apiUrl from "../constants/apiPath";
import Helper from "../constants/helper";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { saveAuthData } from '../Services/actions/authAction';
import Loader from './elements/Loader';
import InfiniteScroll from "react-infinite-scroll-component";

import { useTranslation } from 'react-i18next';

const mapStateToProps = state => ({
    data: state
});

const mapDispatchToProps = dispatch => ({
    saveAuthData: data => dispatch(saveAuthData(data))
});


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
const Home = (props) => {
    const { t, i18n } = useTranslation();
    const [error, setError] = React.useState();
    const [isLoaded, setIsLoaded] = React.useState();
    const [articleList, setarticleList] = React.useState([]);
    const [popularArticle, setpopularArticle] = React.useState([]);
    const [oneBlockList, setoneBlockList] = React.useState([]);
    const [paginationData, setpaginationData] = React.useState([]);
    const [activepage, setActivePage] = React.useState(1);

    const getArticleList = async (page = activepage) => {
        setActivePage(page);
        //props.saveAuthData({ loader: true });
        let path = apiUrl.getArticles + '?page=' + `${page}`;
        const fr = await Helper.get(path);
        const res = await fr.response.json();
        if (res.status) {
            //props.saveAuthData({ loader: false });
            setarticleList([...articleList, ...res.data.docs]);
            setpaginationData(res.data);
            setActivePage(activepage + 1);

        } else {
            props.saveAuthData({ loader: false });
            Toast.fire({
                type: "error",
                title: res.msg,
            });
        }
    }
    const getPopularArticle = async (page = activepage) => {
        let path = apiUrl.getPopularArticle;
        const fr = await Helper.get(path);
        const res = await fr.response.json();
        if (res.status) {
            setpopularArticle(res.data);
        } else {
            Toast.fire({
                type: "error",
                title: res.msg,
            });
        }
    }

    const getOneBlockList = async (page = activepage) => {
        let path = apiUrl.getOneBlockList;
        const fr = await Helper.get(path);
        const res = await fr.response.json();
        if (res.status) {
            setoneBlockList(res.data);
        } else {
            Toast.fire({
                type: "error",
                title: res.msg,
            });
        }
    }

    // useEffect(() => {
    // console.log(articleList)
    //console.log(paginationData);
    //}, [articleList])

    useEffect(() => {
        getArticleList(activepage);
        getPopularArticle();
        getOneBlockList();
        //api call list

        return () => {

        }

    }, [])
    function characterLimitSet(text) {
        return text.length > 40
            ? text.substring(0, 40) + ".."
            : text;
    }

    function characterLimitSetMain(html) {
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent.length > 40
            ? temporalDivElement.textContent.substring(0, 40) + "..."
            : temporalDivElement.textContent &&
                temporalDivElement.innerText.length > 40
                ? temporalDivElement.innerText.substring(0, 40) + "..."
                : temporalDivElement.innerText || "";
    }
    function fetchMoreData() {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs

        // alert(activepage);
        //getArticleList(activepage + 1);
    }
    return (
        <React.Fragment>
            {props.data.authData.loader && <Loader></Loader>}
            <div classNam="edica-loader"></div>
            <main className="blog">
                <div className="container">
                    <h1 className="edica-page-title" data-aos="fade-up">Blog</h1>

                    <div className="row">
                        <div className="col-md-8">

                            <section>
                                <InfiniteScroll
                                    dataLength={articleList.length}
                                    next={getArticleList}
                                    hasMore={paginationData.hasNextPage}
                                    loader={<div className="InfiniteScrollLoader">Loading...</div>}

                                >

                                    <div className="row blog-post-row "  >
                                        {articleList.map((item, key) => {
                                            return (
                                                <div className="col-md-6 blog-post" data-aos="fade-up" key={key}>
                                                    <div className="blog-post-thumbnail-wrapper">
                                                        <img src={process.env.REACT_APP_API_BASE_URL + item.img} alt="blog post" />
                                                    </div>
                                                    <p className="blog-post-category">{characterLimitSetMain(item.content)}</p>
                                                    <Link className="blog-post-permalink" to={{ pathname: "/single-post/" + item.slug, state: item }}>
                                                        <h6 className="blog-post-title">{item.title}</h6>
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </InfiniteScroll>

                            </section>
                        </div>
                        <div className="col-md-4 sidebar" data-aos="fade-left">
                            <div className="widget widget-post-carousel">
                                <h5 className="widget-title">{t('General Article')}</h5>
                                <div className="post-carousel">
                                    <div id="carouselId" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li data-target="#carouselId" data-slide-to="0" className="active"></li>
                                            <li data-target="#carouselId" data-slide-to="1"></li>
                                            <li data-target="#carouselId" data-slide-to="2"></li>
                                        </ol>
                                        <div className="carousel-inner" role="listbox">
                                            {oneBlockList.map((itemOneBlock, keyO) => {
                                                return (
                                                    <figure className={`carousel-item ${keyO == 0 ? 'active' : ''}`} key={keyO}>
                                                        <img src={process.env.REACT_APP_API_BASE_URL + itemOneBlock.img} alt="blog post" />
                                                        <figcaption className="post-title">
                                                            <Link className="blog-post-permalink" to={{ pathname: "/single-post/" + itemOneBlock.slug, state: itemOneBlock }}>
                                                                {characterLimitSet(itemOneBlock.title)}
                                                            </Link>
                                                        </figcaption>
                                                    </figure>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="widget widget-post-list">
                                <h5 className="widget-title">{t('Popular articles')}</h5>
                                <ul className="post-list">
                                    {popularArticle.map((itemPopular, keyP) => {
                                        return (
                                            <li className="post" key={keyP}>
                                                <Link className="post-permalink media" to={{ pathname: "/single-post/" + itemPopular.slug, state: itemPopular }}>
                                                    <img src={process.env.REACT_APP_API_BASE_URL + itemPopular.img} alt="blog post" />
                                                    <div className="media-body">
                                                        <h6 className="post-title">{itemPopular.title}</h6>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })}

                                </ul>
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
        </React.Fragment >
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);