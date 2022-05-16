import React, { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"

//styles
import * as styles from "../styles/component_styles/header.module.scss"

const Header = () => {
  return (
    <header className={`${styles.header}`}>
      <span className={styles.header_item}>
        <h1>Lauren Bamford</h1>
      </span>
      <span className={styles.header_item}>
        <button>{`[•]`} info</button>
      </span>
      <span className={styles.header_item}>
        <button>{`[ ]`} image details</button>
      </span>
      <span className={styles.header_item}>
        <button>{`[ ]`} thumbs</button>
      </span>
    </header>
  )
}

export default Header
