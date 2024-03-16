import { faPaperPlane, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Image,
  Chip,
} from "@nextui-org/react";
import { Post } from "./Posts";
import useCurrentUser from "../../hooks/useCurrentUser";
import Comments from "./Comments";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  post: Post;
}
export default function FullPost({
  isOpen,
  onOpenChange,
  post,
}: Props) {
  const currentUser = useCurrentUser();

  // const {data: userPost, isLoading, refetch} = useQuery({ queryKey: [post.id], queryFn: getAllUserPosts })

  const { title, header, imgUrl, subtitle, content } = post;
  console.log(post)
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">
                Dolev's Post
              </ModalHeader>
              <Divider /> */}
              <ModalBody className="p-0">
                <Card className="rounded-none">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <div className="flex space-x-4">
                  <Avatar
                    alt="user avatar"
                    className="w-12 h-12 self-center"
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
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 items-center">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={imgUrl}
                      width={270}
                    />
                    <p className='self-start'>{content}</p>
                  </CardBody>
                </Card>
                <Comments/>
                {/* <Divider/> */}
                {/* <div>hello</div> */}
              </ModalBody>
              <Divider />
              <ModalFooter>
                <Avatar
                  alt="user avatar"
                  className="w-10 h-10"
                  src={currentUser.imgUrl}
                />
                <Textarea
                  placeholder="Enter your comment..."
                  fullWidth
                  endContent={
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="self-end cursor-pointer text-foreground-600"
                    />
                  }
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
