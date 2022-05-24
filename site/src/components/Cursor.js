import React, { useRef } from "react"
import useMousePosition from "../custom_hooks/useMousePosition"

//Styles
import * as styles from "../styles/component_styles/cursor.module.scss"

const Cursor = ({ content }) => {
  const { clientX, clientY } = useMousePosition()
  // const delay = 18
  // const cursor = useRef(null)
  // const cursor_content = useRef(null)

  // const endX = useRef(window.innerWidth / 2)
  // const endY = useRef(window.innerHeight / 2)
  // const _x = useRef(0)
  // const _y = useRef(0)

  // const requestRef = useRef(null)

  return (
    <>
      <div
        className={styles.cursor_content}
        style={{ top: clientY, left: clientX }}
      >
        {content}
      </div>
      {/* <div
        className={styles.cursor}
        style={{ top: clientY, left: clientX }}
      ></div> */}
    </>
  )
}

export default Cursor
