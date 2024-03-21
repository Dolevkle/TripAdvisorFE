import {createLazyFileRoute} from "@tanstack/react-router";
import Posts from "../components/Posts/Posts";
import NoPost from "../components/Posts/NoPost";
import { useQuery } from "@tanstack/react-query";
import { getOtherUserPosts} from "../services/post-service";
import {getUserById} from "../services/user-service.ts";
import {useEffect} from "react";


export const Route = createLazyFileRoute("/home/$userId")({
  component: HomeOther,
});

function HomeOther() {
  const { userId } = Route.useParams();
  const {data: user, isFetching,refetch: refetchUser } = useQuery({ queryKey: ['user'], queryFn: async () => await getUserById(userId) })
  const {data: posts, isLoading, refetch: refetchPosts} = useQuery({ queryKey: ['posts', user], queryFn: () => getOtherUserPosts(user), enabled: !!user });

  useEffect(() => {
    refetchUser()
  }, [userId]);

console.log(posts)
  return (
    <div className="m-10 flex flex-col items-center space-y-8">
      {posts?.length && !isLoading && !isFetching? <Posts posts={posts} refetch={refetchPosts} /> : <NoPost />}
    </div>
  );
}
