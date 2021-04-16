import React, { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import apiUrl from "../constants/apiPath";
import Helper from "../constants/helper";
import Swal from 'sweetalert2';
import Moment from 'moment';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { useForm } from "react-hook-form";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

const SinglePost = (props) => {


    const [error, setError] = React.useState();
    const [isLoaded, setIsLoaded] = React.useState(true);
    const [articleData, setarticleData] = React.useState([]);
    const [relatedArticle, setrelatedArticle] = React.useState([]);
    const [comment, setComment] = useState('');
    const [activepage, setActivePage] = useState(1);
    const [commentList, setCommentList] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const [token, setToken] = useState(localStorage.getItem('isLogin') ? JSON.parse(localStorage.getItem('userData'))[1].accessToken : 0);
    useEffect(() => {
        setToken(localStorage.getItem('isLogin') ? JSON.parse(localStorage.getItem('userData'))[1].accessToken : 0);
    }, [])


    const { register, handleSubmit, watch, errors } = useForm();

    const onSumbit = async e => {
        if (localStorage.getItem('isLogin')) {
            let jsonData = {
                comment: comment, artical: articleData._id,
            }
            let path = apiUrl.addComment;
            const fr = await Helper.post(jsonData, path, token);
            const res = await fr.response.json();
            if (fr.status === 200) {
                if (res.status) {
                    setComment('');
                    getComment(articleData.id);
                    Toast.fire({
                        type: "success",
                        title: res.message,
                    })
                } else {
                    Toast.fire({
                        type: "error",
                        title: 'Please login first.',
                        //title: res.message,
                    });
                }
            } else {
                Toast.fire({
                    type: "error",
                    title: res.message,
                });
            }
            //props.history.push('/articlelisting');
        } else {
            Toast.fire({
                type: "error",
                title: "Please login first.",
            });
        }

    }

    useEffect(() => {
        var pathSlug = props.location.pathname.replace("/single-post/", "");
        if (props?.location?.state && props.location.state !== undefined) {
            if (props?.location?.state?.slug && pathSlug == props.location.state.slug) {
                var dataAr = Object.entries(props.location.state);
                dataAr.forEach(([key, value]) => {
                    dataAr[key] = value;
                });
                if (dataAr.length) {
                    setarticleData(dataAr);
                    getRelatedArticle(dataAr.category);
                    viewCount(dataAr.id);
                    getComment(dataAr.id);
                    setIsLoaded(false);
                } else {
                    // 404 page
                    props.history.push("/404")
                }

            }
        } else {
            // 404 page
            props.history.push("/404")
        }


    }, [])

    const getComment = async (artical_id) => {
        let path = apiUrl.listComment + '?artical_id=' + `${artical_id}`;
        const fr = await Helper.get(path, token);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.status) {
                console.log(res.data);
                setCommentCount(res.data.length);
                setCommentList(res.data);
            } else {
                Toast.fire({
                    type: "error",
                    title: res.message,
                });
            }
        } else {
            Toast.fire({
                type: "error",
                title: res.message,
            });
        }

    }

    const getRelatedArticle = async (category) => {
        let path = apiUrl.getRelatedArticle + '?category=' + `${category}`;
        const fr = await Helper.get(path);
        const res = await fr.response.json();
        if (res.status) {
            setrelatedArticle(res.data);
        } else {
            Toast.fire({
                type: "error",
                title: res.msg,
            });
        }
    }
    const viewCount = async (id) => {
        let path = apiUrl.viewCount + '?id=' + `${id}`;
        const fr = await Helper.get(path);
        const res = await fr.response.json();
        if (res.status) {
            //
        } else {
            Toast.fire({
                type: "error",
                title: res.message,
            });
        }
    }

    function handleClick(url) {
        window.location.href = url;
        window.scrollTo(0, 0);
    }
    return (
        <React.Fragment>
            {isLoaded && <div className="edica-loader"></div>}
            <main className="blog-post">
                <div className="container">
                    <h3 className="edica-page-title" data-aos="fade-up">{articleData.title}</h3>
                    <p className="edica-blog-post-meta" data-aos="fade-up" data-aos-delay="200">Written by Richard Searls • {Moment(articleData.created_at).format('DD MMMM YYYY')} • {commentCount} Comments</p>
                    <section className="blog-post-featured-img" data-aos="fade-up" data-aos-delay="300">

                        <img src={process.env.REACT_APP_API_BASE_URL + articleData.img} alt="featur" className="w-100" />
                    </section>
                    <section className="post-content">
                        <div className="row">
                            <div className="col-lg-9 mx-auto" data-aos="fade-up">
                                <p>{ReactHtmlParser(articleData.content)}</p>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-lg-9 mx-auto">
                                <p data-aos="fade-up"><a href="#">Lorem ipsum, or lipsum as it is sometimes known,</a> is dummy text used in laying out printed graphic or web designs. The passage is at attributed to an unknown typesetters in 1the 5th century who is thought scrambled with all parts of Cicero’s De. Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out printed graphic or web designs</p>
                                <h2 className="mb-4" data-aos="fade-up">Blog single page</h2>
                                <ul data-aos="fade-up">
                                    <li>What manner of thing was upon me I did not know, but that it was large and heavy and many-legged I could feel.</li>
                                    <li>My hands were at its throat before the fangs had a chance to bury themselves in my neck, and slowly</li>
                                    <li>I forced the hairy face from me and closed my fingers, vise-like, upon its windpipe.</li>
                                </ul>

                                <blockquote data-aos="fade-up">
                                    <p>You are safe here! I shouted above the sudden noise. She looked away from me downhill. The people were coming out of their houses, astonished.</p>
                                    <footer className="blockquote-footer">Oluchi Mazi</footer>
                                </blockquote>
                                <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out printed graphic or web designs. The passage is at attributed to an unknown typesetters in 1the 5th century who is thought scrambled with all parts of Cicero’s De. Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out printed graphic or web designs</p>
                            </div>
                        </div> */}
                    </section>
                    <div className="row">
                        <div className="col-lg-9 mx-auto">
                            <section className="related-posts">
                                <h2 className="section-title mb-4" data-aos="fade-up">Related Posts</h2>
                                <div className="row">
                                    {relatedArticle.map((item, key) => {
                                        return (
                                            <div className="col-md-4" data-aos="fade-right" data-aos-delay="100" key={key}>

                                                <Link className="blog-post-permalink" onClick={() => handleClick("/single-post/" + item.slug)} to={{ pathname: "/single-post/" + item.slug, state: item }}>
                                                    <img src={process.env.REACT_APP_API_BASE_URL + item.img} alt="blog post" className="post-thumbnail" />
                                                    {/* <p className="post-category">Blog post</p> */}
                                                    <h5 className="post-title">{item.title}</h5>
                                                </Link>
                                            </div>
                                        )
                                    })}

                                </div>
                            </section>
                            <hr />
                            <section className="comment-section">
                                <div className="headings justify-content-between align-items-center mb-3">
                                    <h2>Comments</h2>
                                    {commentList.map((item, key) => {
                                        console.log(item.user)
                                        return (
                                            <div className="card p-3 " data-aos="fade-up">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="user d-flex flex-row align-items-center">
                                                        <img src={process.env.REACT_APP_API_BASE_URL + item.user.image} width="50" className="user-img comment_user rounded-circle mr-2" />
                                                        <span>
                                                            <small class="font-weight-bold text-primary">{item.user.name}</small><br />
                                                            <small class="font-weight-bold">{item.comment}</small>
                                                        </span>
                                                    </div>
                                                    <small>{Moment(item.created_at).fromNow()}</small>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <h2 className="section-title mb-5" data-aos="fade-up">Leave a Reply</h2>
                                <Form onSubmit={handleSubmit(onSumbit)}>
                                    <div className="row">
                                        <div className="form-group col-12" data-aos="fade-up">
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as="textarea" name="comment" placeholder="Comment" ref={register({ required: true })} value={comment} onChange={(e) => setComment(e.target.value)} rows={10} />
                                                <span className="input_error">{errors.comment && 'Comment is required.'}</span>
                                            </Form.Group>
                                            <Button className="btn btn-warning" type="submit" >Submit</Button>
                                        </div>

                                    </div>
                                </Form>

                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment >
    )
}

export default SinglePost;