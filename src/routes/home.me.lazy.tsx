import { createLazyFileRoute } from "@tanstack/react-router";
import Posts, { Post } from "../components/Posts/Posts";
import useCurrentUser from "../hooks/useCurrentUser";
import UploadPostCard from "../components/Posts/UploadPostCard";
import NoPost from "../components/Posts/NoPost";

export const Route = createLazyFileRoute("/home/me")({
  component: HomeMe,
});

function HomeMe() {
  const user = useCurrentUser();
  const posts = [
    {
      title: "Daily Mix",
      subtitle: "Frontend Radio",
      header: "12 Tracks",
      imgUrl: user.imgUrl,
      content: "hello world",
    },
    {
      title: "Daily BolBol",
      subtitle: "Roni",
      header: "13 reasons why",
      imgUrl: null,
      content: "hello world",
    },
    {
      title: "Daily Mix",
      subtitle: "Frontend Radio",
      header: "12 Tracks",
      imgUrl: user.imgUrl,
      content: "hello world",
    },
  ] as Post[];
  return (
    <div className="m-10 flex flex-col items-center space-y-8">
      <UploadPostCard />
      {posts.length ? <Posts posts={posts} /> : <NoPost />}
    </div>
  );
}
