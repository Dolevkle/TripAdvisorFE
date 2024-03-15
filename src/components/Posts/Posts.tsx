import { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import FullPost from "./FullPost";
import EditPost from "./EditPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

export type Post = {
  title: string;
  subtitle: string;
  imgUrl: string;
  header: string;
  content: string;
};

interface Props {
  posts: Post[];
}
export default function Posts({ posts }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(posts[0]);

  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handlePostPress = (post: Post) => {
    setSelectedPost(post);
    onOpen();
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
            <div className="flex flex-col items-start">
              <p className="text-tiny uppercase font-bold">{post.title}</p>
              <small className="text-default-500">{post.header}</small>
              <h4 className="font-bold text-large">{post.subtitle}</h4>
            </div>
            <Popover placement="bottom">
              <PopoverTrigger>
                <FontAwesomeIcon icon={faEllipsis} className="self-start" />
              </PopoverTrigger>
              <PopoverContent className="p-0">
               <Button onClick={onEditOpen} variant="light" fullWidth>Edit Post</Button>
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={post.imgUrl}
              width={270}
            />
            <p>{post.content}</p>
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
      />
    </>
  );
}
