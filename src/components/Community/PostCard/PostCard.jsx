import { Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

const PostCard = ({ post, handleUpvote, handleDownvote }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div key={post._id} className="mt-6">
      <div className="max-w-4xl px-8 py-6 mx-auto bg-white rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <span className="font-light text-gray-600">
            {new Date(post?.timestamp).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-2">
          <h1 className="text-2xl md:text-3xl font-display text-gray-700">
            {post?.title}
          </h1>
          <p className="mt-2 text-gray-600">
            {readMore ? post?.content : post?.content.slice(0, 300)}{" "}
            <span
              onClick={() => setReadMore(!readMore)}
              className="text-primary font-bold hover:underline"
            >
              {readMore ? "see less" : "read more..."}
            </span>
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-4 border rounded-full  text-gray-500 p-1 px-3 divide-x">
            <button
              onClick={() => handleUpvote(post._id)}
              className="flex gap-2 items-center cursor-pointer"
            >
              <BiUpvote className="size-5" /> Upvote{" "}
              <span className="bg-primary text-white font-semibold px-2 rounded-full">
                {post?.upvote}
              </span>
            </button>
            <button
              onClick={() => handleDownvote(post._id)}
              className="hover:underline pl-2"
            >
              <BiDownvote className="size-5" />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <img
                src={post?.postedBy?.photo}
                alt="avatar"
                className="object-cover w-10 h-10 rounded-full"
              />
              <div>
                <h1 className="font-bold text-gray-700 hover:underline">
                  {post?.postedBy?.name}
                </h1>
                <div className="w-12">
                  <Badge color={"lime"}>{post?.postedBy?.role}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
  handleUpvote: PropTypes.func,
};

export default PostCard;
