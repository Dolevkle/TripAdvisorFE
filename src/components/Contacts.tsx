import {
  Avatar,
  Chip,
  Listbox,
  ListboxItem,
  ScrollShadow,
} from "@nextui-org/react";
import React from "react";

export default function Contacts({ contacts, changeContact }) {
  const [values, setValues] = React.useState(new Set(["1"]));

  const arrayValues = Array.from(values);

  //   const topContent = React.useMemo(() => {
  //     if (!arrayValues.length) {
  //       return null;
  //     }

  //     return (
  //       <ScrollShadow
  //         // hideScrollBar
  //         // className="w-full flex py-0.5 px-2 gap-1"
  //         orientation="horizontal"
  //       >
  //         {arrayValues.map((value) => (
  //           <Chip key={value}>{contacts.find((contact) => `${contact.id}` === `${value}`).name}</Chip>
  //         ))}
  //       </ScrollShadow>
  //     );
  //   }, [arrayValues.length]);

  return (
        <Listbox
          // topContent={topContent}
          classNames={{
            base: "max-w-xs border-r-2 border-divider",
            list: "max-h-5/6 overflow-auto",
          }}
          defaultSelectedKeys={["1"]}
          items={contacts}
          label="Assigned to"
          selectionMode="single"
          onSelectionChange={setValues}
          variant="faded"
          color='primary'
          hideSelectedIcon
        >
          {(item) => (
            <ListboxItem key={item.id} textValue={item.email}>
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={item.email}
                  className="flex-shrink-0"
                  size="sm"
                  src={item.imgUrl}
                />
                <div className="flex flex-col">
                  <span className="text-small">{item.email}</span>
                  <span className="text-tiny text-default-400">
                    {item.email}
                  </span>
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>

  );
}
