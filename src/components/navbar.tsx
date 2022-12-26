import { Button, Container, Menu, MenuItem } from "semantic-ui-react";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <Menu inverted attached style={{ padding: "1.5rem" }}>
      <Container>
        <Menu.Item
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src="https://react.semantic-ui.com/logo.png"
            width={30}
            height={35}
            alt="Logo"
          />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            onClick={() => {
              router.push("/tasks/new");
            }}
          >
            <Button>new Task</Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
