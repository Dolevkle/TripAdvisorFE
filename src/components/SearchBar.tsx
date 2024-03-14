import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { SearchIcon } from "../assets/SearchIcon";
import { getAllUsers } from "../services/user-service";
import useCurrentUser from "../hooks/useCurrentUser";

{
  /* <Input
classNames={{
  base: "max-w-full sm:max-w-[10rem] h-10",
  mainWrapper: "h-full",
  input: "text-small",
  inputWrapper:
    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
}}
placeholder="Type to search..."
size="sm"
startContent={<SearchIcon size={18} />}
type="search"
/> */
}
export default function SearchBar() {
  const currentUser = useCurrentUser();
  const list = useAsyncList({
    async load({ signal, filterText }) {
        // TODO change to route which works with typed content
      const users = await getAllUsers(currentUser._id);
      return {
        items: users,
      };
    },
  });

  return (
    <Autocomplete
      classNames={{
        base: "w-7/12",
        listboxWrapper: "max-h-[320px]",
        selectorButton: "text-default-500",
      }}
      inputProps={{
        classNames: {
          input: "ml-1",
          inputWrapper: "h-[40px]",
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            "rounded-medium",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "dark:data-[hover=true]:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[hover=true]:bg-default-200",
            "data-[selectable=true]:focus:bg-default-100",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      popoverProps={{
        offset: 5,
        classNames: {
          base: "rounded-large",
          content: "p-1 border-small border-default-100 bg-background",
        },
      }}
      radius="full"
      variant="bordered"
      size="sm"
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items}
      placeholder="Type to search..."
      onInputChange={list.setFilterText}
      startContent={<SearchIcon size={24} />}
      selectorIcon={null}
      isClearable={false}
    >
      {(item) => (
        <AutocompleteItem
          key={item.username}
          className="capitalize"
          startContent={
            <Avatar
              alt="user avatar"
              className="w-6 h-6"
              src={item.imgUrl}
            />
          }
        >
          {item.username}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
