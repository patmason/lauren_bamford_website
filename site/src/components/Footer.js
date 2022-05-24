import React, { useRef, useLayoutEffect } from "react"
import gsap from "gsap"

//styles
import * as styles from "../styles/component_styles/footer.module.scss"

const Footer = ({ background, dispatch, ACTIONS }) => {
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
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.CHANGE_BACKGROUND,
              payload: { background: "photo" },
            })
          }
        >
          {`${background === "photo" ? `[•]` : `[ ]`}`} &nbsp;photo
        </button>
      </span>
      <span className={`${styles.footer_item} footer_button`}>
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.CHANGE_BACKGROUND,
              payload: { background: "white" },
            })
          }
        >
          {`${background === "white" ? `[•]` : `[ ]`}`} &nbsp;white
        </button>
      </span>
      <span className={`${styles.footer_item} footer_button`}>
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.CHANGE_BACKGROUND,
              payload: { background: "black" },
            })
          }
        >
          {`${background === "black" ? `[•]` : `[ ]`}`} &nbsp;black
        </button>
      </span>
    </footer>
  )
}

export default Footer
