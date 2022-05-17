import React, { useRef, useLayoutEffect } from "react"
import gsap from "gsap"

//styles
import * as styles from "../styles/component_styles/footer.module.scss"

const Footer = () => {
  const footerRef = useRef(null)
  const q = gsap.utils.selector(footerRef)
  useLayoutEffect(() => {
    gsap.from(footerRef.current, {
      opacity: 0,
    })
  }, [])
  return (
    <footer className={`${styles.footer}`} ref={footerRef}>
      <span className={`${styles.footer_item}`}>
        <h1>Background:</h1>
      </span>
      <span className={`${styles.footer_item} footer_button`}>
        <button>{`[•]`} &nbsp;photo</button>
      </span>
      <span className={`${styles.footer_item} footer_button`}>
        <button>{`[ ]`} &nbsp;white</button>
      </span>
      <span className={`${styles.footer_item} footer_button`}>
        <button>{`[ ]`} &nbsp;black</button>
      </span>
    </footer>
  )
}

export default Footer
