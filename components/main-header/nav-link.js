'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from './nav-link.module.css'

export default function Navlink({href, children}) {

  const path = usePathname()
  return (
    <Link
      href={href}
      className={path.startsWith(href) ? `${styles.link} ${styles.active}` :  styles.link}
    >
      {children}
    </Link>
    //  {/* using startsWith cos there are other nested pages inside the meals route  */}
    // {/* using === cos there are no other nested pages or components insode the community route*/}
  );
}
