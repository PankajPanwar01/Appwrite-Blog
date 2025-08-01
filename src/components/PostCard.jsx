import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  const imageUrl = appwriteService.getFileView(featuredImage);

  return (
    <Link
      to={`/post/${$id}`}
      className="block group transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
