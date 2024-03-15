import {
  faImage,
  faMinus,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { Post } from "./Posts";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  post: Post;
}

export default function EditPost({ isOpen, onOpenChange, post }: Props) {
  const currentUser = useCurrentUser();

  const [imgSrc, setImgSrc] = useState<File | null>(post.imgUrl);
  const [content, setContent] = useState<string>(post.content);

  const fileInputRef = useRef<HTMLInputElement>(null);
  //   const emailInputRef = useRef<HTMLInputElement>(null)
  //   const passwordInputRef = useRef<HTMLInputElement>(null)
  const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0]);
    }
  };
  const selectImg = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (!isOpen) {
      setImgSrc(post.imgUrl);
      setContent(post.content);
    }
  }, [isOpen, post]);

  const handleEdit = async () => {
    // setIsSubmitted(true);
    // const imgUrl = await uploadPhoto(imgSrc!);
    // const user: IUser = {
    //   email,
    //   username,
    //   password,
    //   imgUrl,
    // };
    // const registeredUser = await registerUser(user);
    // if(registeredUser && !isInvalid) {
    //     localStorage.setItem('currentUser', JSON.stringify(registeredUser))
    //     navigate({ to: '/home/me' });
    // }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissible={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Edit Post
              </ModalHeader>
              <Divider />
              <ModalBody>
                <div className="flex space-x-4">
                  <Avatar
                    alt="user avatar"
                    className="w-12 h-12 self-center"
                    src={currentUser.imgUrl}
                  />
                  <div className="flex flex-col items-center space-y-0.5">
                    <span className="self-start">{currentUser.username}</span>
                    <Chip
                      size="sm"
                      startContent={<FontAwesomeIcon icon={faUserGroup} />}
                      className="text-white h-fit py-0.5 rounded-md w-full"
                    >
                      public
                    </Chip>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center position-relative">
                  {imgSrc && (
                    <>
                      <Badge
                        content={<FontAwesomeIcon icon={faMinus} />}
                        className="cursor-pointer py-1 px-1.5"
                        onClick={() => setImgSrc(null)}
                      >
                        <img
                          src={
                            typeof imgSrc !== "string"
                              ? URL.createObjectURL(imgSrc)
                              : post.imgUrl
                          }
                          className="h-52 w-52 rounded"
                        />
                      </Badge>
                    </>
                  )}
                </div>

                <input
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  type="file"
                  onChange={imgSelected}
                />
                <Textarea
                  placeholder={`What are you Thinking on, ${currentUser.username}?`}
                  value={content}
                  onValueChange={setContent}
                />

                <div
                  onClick={selectImg}
                  className="border-[2px] text-sm text-foreground-600 rounded-xl w-full h-12 flex justify-between p-2 items-center cursor-pointer"
                >
                  <span>Edit your Post</span>
                  <FontAwesomeIcon
                    icon={faImage}
                    className="fa-xl text-default cursor-pointer"
                    onClick={selectImg}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="solid"
                  onPress={handleEdit}
                  fullWidth
                >
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
