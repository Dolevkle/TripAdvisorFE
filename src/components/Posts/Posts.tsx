import { Card, CardBody, CardHeader, Image, useDisclosure } from "@nextui-org/react";
import FullPost from "./FullPost";

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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return posts.map((post) => (
    <>
      <Card className="py-4 w-3/6" isPressable onPress={onOpen}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{post.title}</p>
          <small className="text-default-500">{post.header}</small>
          <h4 className="font-bold text-large">{post.subtitle}</h4>
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
      <FullPost isOpen={isOpen} onOpenChange={onOpenChange} post={post}/>
    </>
  ));
}
