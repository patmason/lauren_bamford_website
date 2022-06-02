import React, { useRef, useEffect, useState, useCallback } from "react"

//Styles
import * as styles from "../styles/component_styles/cursor.module.scss"

//Helper functions
function useEventListener(eventName, handler, element) {
  const savedHandler = useRef(null)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = event => savedHandler.current(event)

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

const Cursor = ({
  color = "220, 220, 220",
  outerAlpha = 1,
  innerSize = 8,
  outerSize = 8,
  outerScale = 5,
  innerScale = 0.7,
  view,
}) => {
  const cursorOuterRef = useRef(null)
  const cursorInnerRef = useRef(null)
  const requestRef = useRef(null)
  const previousTimerRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [content, setContent] = useState("DEFAULT CONTENT")
  let endX = useRef(0)
  let endY = useRef(0)

  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY })
    cursorInnerRef.current.style.top = clientY + "px"
    cursorInnerRef.current.style.left = clientX + "px"
    endX.current = clientX
    endY.current = clientY
  }, [])

  const animateOuterCursor = useCallback(
    time => {
      if (previousTimerRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / 4
        coords.y += (endY.current - coords.y) / 4
        cursorOuterRef.current.style.top = coords.y + 10 + "px"
        cursorOuterRef.current.style.left = coords.x + "px"
      }
      previousTimerRef.current = time
      requestRef.current = requestAnimationFrame(animateOuterCursor)
    },
    [requestRef]
  )

  useEffect(
    () => (requestRef.current = requestAnimationFrame(animateOuterCursor)),
    [animateOuterCursor]
  )

  const onMouseEnter = React.useCallback(() => setIsVisible(true), [])
  const onMouseLeave = React.useCallback(() => setIsVisible(false), [])

  useEventListener("mousemove", onMouseMove, document)
  useEventListener("mouseenter", onMouseEnter, document)
  useEventListener("mouseleave", onMouseLeave, document)

  useEffect(() => {
    if (isActive) {
      cursorInnerRef.current.style.transform = `scale(1)`
      cursorOuterRef.current.style.transform = `scale(1) translateX(-50%)`
    } else {
      cursorInnerRef.current.style.transform = "scale(0)"
      cursorOuterRef.current.style.transform = "scale(0) translateX(-50%)"
    }
  }, [innerScale, outerScale, isActive])

  React.useEffect(() => {
    if (isVisible) {
      cursorInnerRef.current.style.opacity = 1
      cursorOuterRef.current.style.opacity = 1
    } else {
      cursorInnerRef.current.style.opacity = 0
      cursorOuterRef.current.style.opacity = 0
    }
  }, [isVisible])

  useEffect(() => {
    const handleMouseOver = e => {
      setIsActive(true)
      setContent(e.currentTarget.dataset.cursorContent)
    }

    const handleMouseOut = () => {
      setIsActive(false)
      setContent("")
    }
    const clickables = document.querySelectorAll("[data-cursor-content]")
    clickables.forEach(el => {
      // el.style.cursor = "none"

      el.addEventListener("mouseover", handleMouseOver)
      el.addEventListener("mouseout", handleMouseOut)
    })

    return () => {
      clickables.forEach(el => {
        el.removeEventListener("mouseover", handleMouseOver)
        el.removeEventListener("mouseout", handleMouseOut)
      })
    }
  }, [isActive, view])

  const cursorStyles = {
    cursorInner: {
      zIndex: 99998,
      position: "fixed",
      borderRadius: "50%",
      display: "none",
      // width: innerSize,
      // height: innerSize,
      pointerEvents: "none",
      backgroundColor: `rgba(${color}, 1)`,
      transition: "opacity 0.15s ease-in-out, transform 0.25s ease-in-out",
    },
    cursorOuter: {
      zIndex: 99999,
      position: "fixed",
      borderRadius: "0.3em",
      pointerEvents: "none",
      // backgroundColor: `rgba(${color}, ${outerAlpha})`,
      transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
    },
  }

  return (
    <>
      <div
        ref={cursorOuterRef}
        className={styles.cursor_content}
        style={cursorStyles.cursorOuter}
      >
        <span>{content}</span>
      </div>
      <div
        ref={cursorInnerRef}
        className={styles.cursor}
        style={cursorStyles.cursorInner}
      ></div>
    </>
  )
}

export default Cursor
