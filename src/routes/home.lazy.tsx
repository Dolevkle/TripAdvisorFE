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
  NavbarItem,
} from "@nextui-org/react";
import {
  createLazyFileRoute,
  useNavigate,
  Outlet,
} from "@tanstack/react-router";
import { Key, useEffect, useState } from "react";
import { AdvizorsLogo } from "../assets/AdvizorsLogo";

export const Route = createLazyFileRoute("/home")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();

  const handleUserDropdownItem = (key: Key) => {
    if (key === "logout") navigate({ to: "/" });
  };

  // const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const currentTab = localStorage.getItem("currentTab");
    if (!currentTab) localStorage.setItem("currentTab", "1");
  }, []);

  const currentTab = localStorage.getItem("currentTab");

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
          <NavbarItem isActive={ currentTab === "0"}>
            <Link
              href="./chats"
              onClick={() => localStorage.setItem("currentTab","0")}
              color={currentTab === "0" ? "primary" : "foreground"}
            >
              Chats
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentTab === "1"}>
            <Link
              href="./kaki"
              onClick={() => localStorage.setItem("currentTab","1")}
              color={currentTab === "1" ? "primary" : "foreground"}
            >
              Views
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentTab === "2"}>
            <Link
              href="#"
              onClick={() =>localStorage.setItem("currentTab","2")}
              color={currentTab === "2" ? "primary" : "foreground"}
            >
              Settings
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="kaki Hughes"
                showFallback
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              onAction={handleUserDropdownItem}
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
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
