import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { fetchPostById } from "../../store/utils/thunks";
import { Spinner } from "react-bootstrap";

const PostComponent = () => {
  const posts = useSelector((state) => state.posts);
  const dispath = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispath(fetchPostById(params.id));
  }, []);

  return (
    <>
      {posts.postById ? (
        <div className="article_container">
          <h1>{posts.postById.title}</h1>
          <div
            className="image"
            style={{ background: `url(${posts.postById.imagexl})` }}
          ></div>
          <div className="author">
            Created by: <span>{posts.postById.author} -</span>
            <Moment format="DD MMMM">{posts.postById.createdAt}</Moment>
          </div>
          <div className="mt-3 content">
            <div
              dangerouslySetInnerHTML={{ __html: posts.postById.content }}
            ></div>
          </div>
        </div>
      ) : null}
      {posts.loading ? (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : null}
    </>
  );
};

export default PostComponent;
