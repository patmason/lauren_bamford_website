import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

//styles
import * as styles from "../styles/component_styles/header.module.scss"

const Header = ({
  handleViewChange,
  view,
  dispatch,
  ACTIONS,
  showInfo,
  showImageDetails,
}) => {
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
      <span
        className={`${styles.header_item} ${styles.right_align} header_button`}
      >
        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.TOGGLE_INFO,
            })
          }
        >
          {showInfo ? `[•]` : `[ ]`} &nbsp;about
        </button>
      </span>
      <span className={`${styles.header_item} header_button`}>
        <button
          style={view === "grid" ? { cursor: "not-allowed" } : {}}
          onClick={
            view === "slides"
              ? () =>
                  dispatch({
                    type: ACTIONS.TOGGLE_IMAGE_DETAILS,
                  })
              : null
          }
        >
          {showImageDetails ? `[•]` : `[ ]`} &nbsp;image info
        </button>
      </span>
      <span
        className={`${styles.header_item} ${styles.right_align} header_button`}
      >
        <button
          style={view === "grid" ? { cursor: "not-allowed" } : {}}
          onClick={view === "slides" ? handleViewChange : null}
        >
          {view === "grid" ? `[•]` : `[ ]`} &nbsp;index
        </button>
      </span>
    </header>
  )
}

export default Header
