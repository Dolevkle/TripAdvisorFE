import {
  Card,
  CardBody,
  Divider,
  Image,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import useCurrentUser from "../../hooks/useCurrentUser";
import CreatePost from "./CreatePost";

export default function UploadPostCard() {
  const currentUser = useCurrentUser();
  const createPostDisclosure = useDisclosure();

  return (
    <>
      <Card className="py-4 w-3/6 ">
        {/* <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{title}</p>
        <small className="text-default-500">{header}</small>
        <h4 className="font-bold text-large">{subtitle}</h4>
      </CardHeader> */}
        <CardBody className="overflow-visible py-2 flex justify-around h-32">
          <div className="flex flex-row items-center space-x-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={currentUser.imgUrl}
              width={48}
              height={48}
            />
            <div onClick={createPostDisclosure.onOpen} className="w-full">
              <Input
                classNames={{
                  base: "h-10",
                  mainWrapper: "h-full",
                  input: "text-small  cursor-pointer",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder={`What are you Thinking on, ${currentUser.username}?`}
                size="sm"
                isReadOnly
              />
            </div>
          </div>
          <Divider />
          <span className="text-foreground-600 pl-2">
            Add your Advize on a vacation
          </span>
        </CardBody>
      </Card>
      <CreatePost {...createPostDisclosure} />
    </>
  );
}
