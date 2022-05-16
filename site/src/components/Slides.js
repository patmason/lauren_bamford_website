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
      {images.map((node, index) => {
        return (
          <div
            className={`${styles.slide_wrapper} ${
              index === current ? "current_slide" : ""
            } slide`}
            key={node.image.asset.assetId}
            style={getImageStyles(node.image, current, index)}
          >
            <GatsbyImage
              image={node.image.asset.gatsbyImageData}
              alt={node.client}
            />
          </div>
        )
      })}
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
