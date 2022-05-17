import React from "react"

//components
import { GatsbyImage } from "gatsby-plugin-image"

//Styles
import * as styles from "../styles/component_styles/slides.module.scss"

function getImageStyles(image, current, index) {
  if (index === current) {
    return {
      width: `calc(70vh * (${image.asset.width} / ${image.asset.height})`,
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

const Slides = ({ images, current, handleNext, handlePrev }) => {
  return (
    <div className={styles.slides_wrapper}>
      <div
        className={`${styles.slide_wrapper} slide`}
        key={`${images[images.length - 1].image.asset.assetId}_looper`}
        data-flip-id={`${images[images.length - 1].image.asset.assetId}_looper`}
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
          alt={images[images.length - 1].client}
        />
      </div>
      {images.map((node, index) => {
        return (
          <div
            className={`${styles.slide_wrapper} ${
              index === current ? "current_slide" : ""
            } slide`}
            key={node.image.asset.assetId}
            style={getImageStyles(node.image, current, index)}
            data-flip-id={node.image.asset.assetId}
          >
            <GatsbyImage
              image={node.image.asset.gatsbyImageData}
              alt={node.client}
            />
          </div>
        )
      })}
      <div
        className={`${styles.slide_wrapper} slide`}
        key={`${images[0].image.asset.assetId}_looper`}
        data-flip-id={`${images[0].image.asset.assetId}_looper`}
        style={
          current === images.length
            ? {
                width: `calc(70vh * (${images[0].image.asset.width} / ${images[0].image.asset.height})`,
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
          alt={images[0].client}
        />
      </div>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.prev_button}`}
          onClick={() => handlePrev()}
        >
          PREV
        </button>
        <button
          className={`${styles.button} ${styles.next_button}`}
          onClick={() => handleNext()}
        >
          NEXT
        </button>
      </div>
    </div>
  )
}

export default Slides
