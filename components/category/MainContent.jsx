import React from 'react'
import { convert } from 'html-to-text';
import moment from 'moment';
import Link from 'next/link';
import url from '@/config/url';
import slugify from 'slugify';
import webp from 'utils/webp';
export default function MainContent({ thisPagePosts, thisPageSubCategory, category }) {
    const postLength = 1765
    const charecterLength = 52
    return (
        <>
            <div className="col-md-8 blog-single">
                <div className="bs-meta">

                    <span className="bs-cat">
                        {
                            category[0].category
                        }
                    </span>
                    {/* <span className="bs-comments"><a href="#"><i className="fa fa-comments-o"></i> 4 Comments</a> <em></em> <a href="#"><i className="fa fa-heart-o"></i> 23 Likes</a></span> */}
                </div>
                {
                    thisPagePosts.slice(0, 1)
                        .map((post) => (
                            <>
                                <h3>
                                    {post.postitle}
                                </h3>
                                <img loading='lazy' src={webp(post.img.replace('/upload/', '/upload/w_770,h_500/'))} alt={post.imgAlt} className="img-responsive space30" />
                                <div className="row">
                                    <div className="col-md-3 bs-aside">
                                        {/* <img src="images/xtra/2.png" alt="" /> */}
                                        <h6>{post.author.name}</h6>
                                        <div className="sep1"></div>
                                        <div className="space10"></div>
                                        <div className="rp-date">
                                            <span>
                                                {moment(post.createdAt).format("MMMM")}
                                            </span>
                                            {moment(post.createdAt).format("D")}
                                            <span><em>/</em> {moment(post.createdAt).format("Y")}</span>
                                        </div>
                                        <div className="space30"></div>
                                        <div className="sep1"></div>
                                        <div className="space20"></div>
                                        {/* <em className="share-count">10K SHARE</em> */}
                                        <span className="bsa-social">
                                            <a href="#"><i className="fa fa-facebook"></i></a>
                                            <a href="#"><i className="fa fa-twitter"></i></a>
                                            <a href="#"><i className="fa fa-plus"></i></a>
                                        </span>
                                    </div>
                                    <div className="col-md-9">
                                        <p>
                                            {
                                                convert(
                                                    post.description, {
                                                    wordwrap: 130
                                                }
                                                )
                                                    .substr(0, postLength)
                                                    .substr(
                                                        0,
                                                        Math.min(
                                                            convert(
                                                                post.description, {
                                                                wordwrap: 130
                                                            }
                                                            ).length,
                                                            convert(
                                                                post.description, {
                                                                wordwrap: 130
                                                            }
                                                            ).lastIndexOf(' ')
                                                        )
                                                    ) + ' ...'
                                            }
                                        </p>
                                        <Link href={url.post.single.replace(':title', slugify(post.postitle)).replace(':id', post._id)}>

                                            <a className="post-more">Continue Reading <em>&#8594;</em></a>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ))
                }


                <div className="related-posts related-posts-cat">
                    <h5>More about <span>   {
                        category[0].category
                    } <i className="fa fa-angle-down"></i></span></h5>
                    <ul>
                        {
                            thisPagePosts.slice(1, thisPagePosts.length)
                                .map((post) => (
                                    <>
                                        <li>
                                            <div className="col-md-3">
                                                <div className="rp-date">
                                                    <span>
                                                        {moment(post.createdAt).format("MMMM")}
                                                    </span>
                                                    {moment(post.createdAt).format("D")}
                                                    <span><em>/</em> {moment(post.createdAt).format("Y")}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <img loading='lazy' src={webp(post.img.replace('/upload/', '/upload/w_280,h_190/'))} className="img-responsive" alt={post.imgAlt} />
                                                <div className="rp-inner">

                                                    {
                                                        thisPageSubCategory.filter((filtered) => filtered._id === post.subCategory.id)
                                                            .map((subCat) => (
                                                                <>
                                                                    <span className="rp-cat">
                                                                        <Link href={url.subCategory.single.replace(':name', subCat.subCategoryName).replace(':id', subCat._id)}>
                                                                            <a style={{
                                                                                color: '#fff'
                                                                            }}>
                                                                                {subCat.subCategoryName}
                                                                            </a>
                                                                        </Link>


                                                                    </span>
                                                                </>
                                                            ))
                                                    }

                                                    <h4>
                                                        <Link href={url.post.single.replace(':title', slugify(post.postitle)).replace(':id', post._id)}>

                                                            <a >
                                                                {
                                                                    post.postitle.length > charecterLength ? <>
                                                                        {
                                                                            post.postitle
                                                                                .substr(0, charecterLength)
                                                                                .substr(
                                                                                    0,
                                                                                    Math.min(
                                                                                        post.postitle.length,
                                                                                        post.postitle.lastIndexOf(' ')
                                                                                    )
                                                                                ) + ' ...'
                                                                        }
                                                                    </> : post.postitle
                                                                }
                                                            </a>
                                                        </Link>
                                                    </h4>
                                                    <Link href={url.post.single.replace(':title', slugify(post.postitle)).replace(':id', post._id)}>

                                                        <a
                                                            className="rp-more">Read more  <em>&#8594;</em></a>
                                                    </Link>

                                                </div>
                                            </div>
                                        </li>
                                    </>
                                ))
                        }



                    </ul>
                </div>


            </div>
        </>
    )
}
