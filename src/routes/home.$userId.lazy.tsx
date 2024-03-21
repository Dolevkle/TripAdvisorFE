import {createLazyFileRoute} from "@tanstack/react-router";
import Posts from "../components/Posts/Posts";
import NoPost from "../components/Posts/NoPost";
import { useQuery } from "@tanstack/react-query";
import { getOtherUserPosts} from "../services/post-service";
import {getUserById} from "../services/user-service.ts";


export const Route = createLazyFileRoute("/home/$userId")({
  component: HomeOther,
});

function HomeOther() {
  const { userId } = Route.useParams();
  const {data: user, isFetching} = useQuery({ queryKey: ['user'], queryFn: async () => await getUserById(userId) })
  const {data: posts, isLoading, refetch} = useQuery({ queryKey: ['posts'], queryFn: () => getOtherUserPosts(user), enabled: !!user });


console.log(posts)
  return (
    <div className="m-10 flex flex-col items-center space-y-8">
      {posts?.length && !isLoading && !isFetching? <Posts posts={posts} refetch={refetch} /> : <NoPost />}
    </div>
  );
}
