import { createLazyFileRoute } from "@tanstack/react-router";
import Posts, { Post } from "../components/Posts";
import useCurrentUser from "../hooks/useCurrentUser";
import UploadPostCard from "../components/Posts/UploadPostCard";

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
      title: "Daily Mix",
      subtitle: "Frontend Radio",
      header: "12 Tracks",
      imgUrl: user.imgUrl,
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
      <UploadPostCard/>
      <Posts posts={posts} />
    </div>
  );
}
