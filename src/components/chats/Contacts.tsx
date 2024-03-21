import {
  Avatar,
  Chip,
  Listbox,
  ListboxItem,
  ScrollShadow,
} from "@nextui-org/react";
import React from "react";

export default function Contacts({ contacts, changeChat }) {

  return (
        <Listbox
          // topContent={topContent}
          classNames={{
            base: "max-w-xs border-r-2 border-divider",
            list: "h-full overflow-auto",
          }}
          defaultSelectedKeys={["1"]}
          items={contacts}
          label="Assigned to"
          selectionMode="single"
          onSelectionChange={changeChat}
          variant="faded"
          color='primary'
          hideSelectedIcon
        >
          {(item) => (
            // key is the value selected
            <ListboxItem key={item._id} textValue={item.email}>
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={item.email}
                  className="flex-shrink-0"
                  size="sm"
                  src={item.imgUrl}
                />
                <div className="flex flex-col">
                  <span className="text-small">{item.username}</span>
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
