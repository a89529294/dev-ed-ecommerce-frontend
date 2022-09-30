import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/future/image";
import { useUser } from "@auth0/nextjs-auth0";

function User() {
  const router = useRouter();
  const { user } = useUser();
  if (!user)
    return (
      <Profile onClick={() => router.push("/api/auth/login")}>
        <FaUserCircle />
        <h3>Profile</h3>
      </Profile>
    );
  return (
    <Profile onClick={() => router.push("/profile")}>
      <Image
        src={user.picture ?? ""}
        alt={user.name ?? ""}
        width={24}
        height={24}
      />
      <h3>{user.name}</h3>
    </Profile>
  );
}

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  img {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default User;
