import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

export type Post = {title: string, subtitle: string, imgUrl:string, header: string, content: string}

interface Props {
    posts: Post[];
}
export default function Posts({posts}: Props) {

  return (
    posts.map(({title, subtitle, imgUrl, header, content}) => (
        <Card className="py-4 w-3/6" isPressable>
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
          <p>
            {content}
          </p>
        </CardBody>
      </Card>
    ))
  );
}
