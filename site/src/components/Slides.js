import React, { useState, useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { Flip } from "gsap/Flip"

//components
import { GatsbyImage } from "gatsby-plugin-image"

//Styles
import * as styles from "../styles/component_styles/slides.module.scss"

function getImageStyles(image, current, index) {
  if (index === current) {
    return {
      width: `calc(75vh * (${image.asset.width} / ${image.asset.height})`,
      maxWidth: `80%`,
      zIndex: 1,
    }
  } else if (index === current - 2) {
    return {
      minWidth: `calc(100vh * (${image.asset.width} / ${image.asset.height})`,
    }
  } else if (index === current - 1) {
    return {
      minWidth: `calc(100vh * (${image.asset.width} / ${image.asset.height})`,
    }
  } else if (index === current + 1) {
    return {
      width: `0`,
      zIndex: 2,
    }
  } else {
    return {
      display: "none",
    }
  }
}

const Slides = ({
  images,
  current,
  handleNext,
  handlePrev,
  background,
  dispatch,
  ACTIONS,
}) => {
  const [zoom, setZoom] = useState(false)
  const zoomFlipRef = useRef(null)
  const slidesWrapperRef = useRef(null)
  const q = gsap.utils.selector(slidesWrapperRef)

  function handleZoom() {
    zoomFlipRef.current = Flip.getState(
      zoom ? q(".zoom_current") : q(".current")
    )
    setZoom(zoom => !zoom)
  }

  useLayoutEffect(() => {
    if (!zoomFlipRef.current) return
    Flip.from(zoomFlipRef.current, {
      targets: zoom ? q(".zoom_current") : q(".current"),
      absolute: true,
      duration: 0.75,
      ease: "expo.inOut",
    })
  }, [zoom])
  return (
    <div
      ref={slidesWrapperRef}
      className={`${styles.slides_wrapper} ${
        zoom ? styles.zoomed : ""
      } slides_wrapper`}
    >
      {background === "photo" ? (
        <div
          className={`${styles.slide_wrapper} slide flip_slide`}
          key={`${images[images.length - 1].image.asset.assetId}_looper`}
          data-flip-id={`${
            images[images.length - 1].image.asset.assetId
          }_looper`}
          style={
            current === 0
              ? {
                  minWidth: `calc(100vh * (${
                    images[images.length - 1].image.asset.width
                  } / ${images[images.length - 1].image.asset.height})`,
                }
              : {
                  display: "none",
                }
          }
        >
          <GatsbyImage
            image={images[images.length - 1].image.asset.gatsbyImageData}
            alt={
              images[images.length - 1].client || "Lauren Bamford Photography"
            }
          />
        </div>
      ) : null}
      {images.map((node, index) => {
        if (
          index === current ||
          index === current + 1 ||
          index === current - 1 ||
          index === current + 2 ||
          index === current - 2
        ) {
          return (
            <div
              className={`${styles.slide_wrapper} ${
                index === current ? "current_slide current" : ""
              } slide ${
                //class to only target current, front and back slides to flip
                index === current ||
                index === current - 1 ||
                index === current + 1
                  ? "flip_slide"
                  : ""
              }`}
              onClick={index === current ? () => handleZoom() : null}
              key={node.image.asset.assetId}
              style={getImageStyles(node.image, current, index)}
              data-flip-id={node.image.asset.assetId}
              data-cursor-content={"ZOOM"}
            >
              <GatsbyImage
                image={node.image.asset.gatsbyImageData}
                alt={node.client || "Lauren Bamford Photography"}
                loading={"lazy"}
              />
            </div>
          )
        } else return null
      })}
      {background === "photo" ? (
        <div
          className={`${styles.slide_wrapper} slide flip_slide`}
          key={`${images[0].image.asset.assetId}_looper`}
          data-flip-id={`${images[0].image.asset.assetId}_looper`}
          style={
            current === images.length
              ? {
                  width: `calc(75vh * (${images[0].image.asset.width} / ${images[0].image.asset.height})`,
                  maxWidth: `80%`,
                  zIndex: 1,
                }
              : current === 0
              ? {
                  display: "none",
                }
              : {
                  width: `0`,
                  zIndex: 2,
                }
          }
        >
          <GatsbyImage
            image={images[0].image.asset.gatsbyImageData}
            alt={images[0].client || "Lauren Bamford Photography"}
          />
        </div>
      ) : null}
      {zoom ? (
        <div
          className={`${styles.slide_wrapper} zoom_current`}
          data-flip-id={`${images[current].image.asset.assetId}`}
          data-cursor-content={"CLOSE"}
          onClick={() => handleZoom()}
          style={{
            minWidth: `calc(100vh * (${images[current].image.asset.width} / ${images[current].image.asset.height})`,
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 100,
            overflowY: "scroll",
            scrollbarWidth: "none",
            display: zoom ? "block" : "none",
          }}
        >
          <GatsbyImage
            image={images[current].image.asset.gatsbyImageData}
            alt={images[current].client || "Lauren Bamford Photography"}
          />
        </div>
      ) : null}
      <div
        className={`${styles.background} ${
          background === "photo" ? styles.background_photo : ""
        } ${background === "white" ? styles.background_white : ""}
        ${background === "black" ? styles.background_black : ""}`}
      ></div>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.prev_button}`}
          onClick={() => handlePrev()}
          data-cursor-content={"PREVIOUS"}
        ></button>
        <button
          className={`${styles.button} ${styles.next_button}`}
          onClick={() => handleNext()}
          data-cursor-content={"NEXT"}
        ></button>
      </div>
    </div>
  )
}

export default Slides
