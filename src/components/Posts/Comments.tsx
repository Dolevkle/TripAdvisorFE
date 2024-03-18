import React from "react";
import { Comment } from "../../services/post-service";
import { Avatar } from "@nextui-org/react";

interface Props {
  comments: Comment[];
}
export default function Comments({ comments }: Props) {
  return (
    <div className="h-52 overflow-y-auto ml-5">
      {comments?.map(({ userImgUrl, content, username }) => (
        <div className="flex items-center space-x-2 my-6">
          <Avatar alt="user avatar" className="w-7 h-7" src={userImgUrl} />
          <div className="flex flex-col rounded-lg bg-foreground-300 w-fit min-w-24 px-2 ">
            <span className="text-foreground-50 text-bold">{username}</span>
            <p className='text-sm'>{content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
