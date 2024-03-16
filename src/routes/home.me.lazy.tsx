import { createLazyFileRoute } from "@tanstack/react-router";
import Posts, { Post } from "../components/Posts/Posts";
import useCurrentUser from "../hooks/useCurrentUser";
import UploadPostCard from "../components/Posts/UploadPostCard";
import NoPost from "../components/Posts/NoPost";
import { useQuery } from "@tanstack/react-query";
import { getAllUserPosts } from "../services/post-service";

export const Route = createLazyFileRoute("/home/me")({
  component: HomeMe,
});

function HomeMe() {
  const user = useCurrentUser();
  const {data: posts, isLoading, refetch} = useQuery({ queryKey: ['posts'], queryFn: getAllUserPosts })

  console.log(posts)

  

  return (
    <div className="m-10 flex flex-col items-center space-y-8">
      <UploadPostCard />
      {posts?.length && !isLoading ? <Posts posts={posts} refetch={refetch} /> : <NoPost />}
    </div>
  );
}
