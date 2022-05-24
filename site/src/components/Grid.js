import React, { useState, useLayoutEffect, useRef, useEffect } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"

//Styles
import * as styles from "../styles/component_styles/grid.module.scss"

const Grid = ({ images, current, dispatch, ACTIONS, background }) => {
  const [isSelected, setIsSelected] = useState(false)
  const [selectedImage, setSelectedImage] = useState(current)
  const gridRef = useRef()
  const q = gsap.utils.selector(gridRef)
  const bg_image =
    current === 0 ? images[images.length - 1] : images[current - 1]

  //enter effect
  useLayoutEffect(() => {
    gsap.from(q(".not_current"), {
      opacity: 0,
      y: 200,
      scale: 0,
      delay: 0.5,
      duration: 1,
      // stagger: 0.1,
      ease: "expo.inOut",
    })
  }, [])

  //leave effect
  useEffect(() => {
    if (!isSelected) return
    gsap.to(q(".not_current"), {
      opacity: 0,
      y: 200,
      scale: 0,
      duration: 1,
      // stagger: 0.1,
      ease: "expo.inOut",
      onComplete: () => {
        dispatch({
          type: ACTIONS.SELECT_FROM_GRID,
          payload: {
            selectedImage: selectedImage,
            flipState: Flip.getState(q(".current")),
          },
        })
      },
    })
  }, [isSelected])

  return (
    <div className={styles.grid_wrapper} ref={gridRef}>
      {images.map((node, index) => {
        if (index === current - 1) return null
        if (current === 0 && index === images.length - 1) return null
        return (
          <div
            className={`${styles.grid_image_wrapper} ${
              index === selectedImage ? "current grid_current" : "not_current"
            }`}
            key={node.image.asset.assetId}
            data-flip-id={node.image.asset.assetId}
            onClick={() => {
              setIsSelected(true)
              setSelectedImage(index)
            }}
          >
            <GatsbyImage
              image={node.image.asset.gatsbyImageData}
              alt={node.client}
            />
          </div>
        )
      })}
      <div
        className={`${styles.background} ${
          background === "photo" ? styles.background_photo : ""
        } ${background === "white" ? styles.background_white : ""}
        ${background === "black" ? styles.background_black : ""}`}
      ></div>
      <div className={styles.grid_bg_image_wrapper}>
        <div
          className={styles.grid_bg_image}
          style={{
            minWidth: `calc(100vh * (${bg_image.image.asset.width} / ${bg_image.image.asset.height})`,
          }}
        >
          <GatsbyImage
            image={bg_image.image.asset.gatsbyImageData}
            alt={bg_image.client}
          />
        </div>
      </div>
    </div>
  )
}

export default Grid