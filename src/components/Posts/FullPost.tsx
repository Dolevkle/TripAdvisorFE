import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
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
} from "@nextui-org/react";
import { Post } from "./Posts";
import useCurrentUser from "../../hooks/useCurrentUser";

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
  const { title, header, imgUrl, subtitle, content } = post;
  console.log(post)
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Dolev's Post
              </ModalHeader>
              <Divider />
              <ModalBody className="p-0">
                <Card className="rounded-none">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{title}</p>
                    <small className="text-default-500">{header}</small>
                    <h4 className="font-bold text-large">{subtitle}</h4>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={imgUrl}
                      width={270}
                    />
                    <p>{content}</p>
                  </CardBody>
                </Card>
                {/* <Divider/> */}
                <div>hello</div>
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
