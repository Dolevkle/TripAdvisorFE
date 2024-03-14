import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from "@nextui-org/react";
import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
} from "@tanstack/react-router";
import { Key, useEffect } from "react";
import { AdvizorsLogo } from "../assets/AdvizorsLogo";
import SearchBar from "../components/SearchBar";
import useCurrentUser from "../hooks/useCurrentUser";

export const Route = createLazyFileRoute("/home")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();

  const handleUserDropdownItem = (key: Key) => {
    if (key === "logout") {
      navigate({ to: "/" });
      localStorage.removeItem("currentTab");
      localStorage.removeItem("currentUser");
    }
  };

  // const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const currentTab = localStorage.getItem("currentTab");
    if (!currentTab) localStorage.setItem("currentTab", "1");
  }, []);

  const currentTab = localStorage.getItem("currentTab") ?? "1";
  const currentUser = useCurrentUser();

  return (
    <>
      <Navbar
        isBordered
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarBrand>
          <AdvizorsLogo />
          <p className="font-bold text-inherit">Advizors</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={currentTab === "0"}>
            <Link
              href="./chats"
              onClick={() => localStorage.setItem("currentTab", "0")}
              color={currentTab === "0" ? "primary" : "foreground"}
            >
              Chats
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentTab === "1"}>
            <Link
              href="./me"
              onClick={() => localStorage.setItem("currentTab", "1")}
              color={currentTab === "1" ? "primary" : "foreground"}
            >
              Views
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentTab === "2"}>
            <Link
              href="#"
              onClick={() => localStorage.setItem("currentTab", "2")}
              color={currentTab === "2" ? "primary" : "foreground"}
            >
              Settings
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <SearchBar/>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={currentUser.email}
                showFallback
                size="sm"
                src={currentUser.imgUrl}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              onAction={handleUserDropdownItem}
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{currentUser.username}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <Outlet />
    </>
  );
}
