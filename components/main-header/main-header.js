

import Link from "next/link";
import React from "react";
import styles from "./main-header.module.css";

import logo from "@/assets/logo.png";
import Image from "next/image";
import MainHeaderBackground from "./main-header-backgroud";
import Navlink from "./nav-link";

export default function MainHeader() {

  return (
    <>
    <MainHeaderBackground />
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image src={logo} alt="A plate with food in it" priority />
          NextLevel Food
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Navlink href='/meals'>Browse Meals</Navlink>
            </li>
            <li>
              <Navlink href='/community'>Foodies Community </Navlink>  
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
