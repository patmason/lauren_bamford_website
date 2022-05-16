import React, { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"

//styles
import * as styles from "../styles/component_styles/header.module.scss"

const Header = () => {
  const headerRef = useRef(null)
  const q = gsap.utils.selector(headerRef)
  useLayoutEffect(() => {
    gsap.from(q(".header_button"), {
      opacity: 0,
    })
  }, [])
  return (
    <header className={`${styles.header}`} ref={headerRef}>
      <span className={`${styles.header_item}`}>
        <h1>Lauren Bamford</h1>
      </span>
      <span className={`${styles.header_item} header_button`}>
        <button>{`[•]`} &nbsp;info</button>
      </span>
      <span className={`${styles.header_item} header_button`}>
        <button>{`[ ]`} &nbsp;image details</button>
      </span>
      <span className={`${styles.header_item} header_button`}>
        <button>{`[ ]`} &nbsp;thumbs</button>
      </span>
    </header>
  )
}

export default Header
