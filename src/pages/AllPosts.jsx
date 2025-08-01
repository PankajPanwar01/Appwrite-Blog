import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-10 " style={{ backgroundColor: "#9CA3AF" }}>

      <Container>
        <div className="flex flex-wrap -mx-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.$id}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
              >
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-12 text-gray-500">
              No posts available.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
