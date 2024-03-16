import { faEllipsis, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import EditPost from "./EditPost";
import FullPost from "./FullPost";
import { Post } from "../../services/post-service";
import useCurrentUser from "../../hooks/useCurrentUser";

interface Props {
  posts: Post[];
  refetch?: () => void;
}
export default function Posts({ posts, refetch }: Props) {
  const currentUser = useCurrentUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(posts[0]);

  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handlePostPress = (post: Post) => {
    setSelectedPost(post);
    onOpen();
  };

  const handleEditOpen = (isPopOverOpen: boolean) => {
    setIsPopOverOpen(isPopOverOpen);
    onEditOpen();
  };

  return (
    <>
      {posts.map((post) => (
        <Card
          className="py-4 w-3/6"
          isPressable
          onPress={() => handlePostPress(post)}
        >
          <CardHeader className="pb-0 pt-2 px-4 justify-between">
            <div className="flex space-x-4">
              <Avatar
                alt="user avatar"
                className="w-10 h-10 self-center"
                src={post.userImgUrl}
              />
              <div className="flex flex-col items-center space-y-0.5">
                <span className="self-start">{post.username}</span>
                <Chip
                  size="sm"
                  startContent={<FontAwesomeIcon icon={faUserGroup} />}
                  className="text-white h-fit py-0.5 rounded-md w-full"
                >
                  public
                </Chip>
              </div>
            </div>
            <Popover
              placement="bottom"
              isOpen={isPopOverOpen}
              onOpenChange={(open) => setIsPopOverOpen(open)}
            >
              <PopoverTrigger>
                <FontAwesomeIcon icon={faEllipsis} className="self-start" />
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Button
                  onClick={() => handleEditOpen(false)}
                  variant="light"
                  fullWidth
                >
                  Edit Post
                </Button>
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardBody className=" flex overflow-visible py-2 items-center">
            <Image
              alt="Card background"
              className="object-cover rounded-xl my-4"
              src={post.imgUrl}
              width={500}
              height={200}/>
            <p className="self-start">{post.content}</p>
          </CardBody>
        </Card>
      ))}
      <FullPost
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        post={selectedPost}
      />
      <EditPost
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        post={selectedPost}
        refetch={refetch}
      />
    </>
  );
}
