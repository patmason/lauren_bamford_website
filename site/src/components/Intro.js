import React, { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Flip } from "gsap/Flip"

//styles
import * as styles from "../styles/component_styles/intro.module.scss"

//components
import { GatsbyImage } from "gatsby-plugin-image"

gsap.registerPlugin(Flip)

const Intro = ({ intro, images, current, dispatch, ACTIONS }) => {
  const introWrapperRef = useRef(null)
  const [flipImage, setFlipImage] = useState(false)
  const q = gsap.utils.selector(introWrapperRef)
  const tl = useRef()
  const flipState = useRef(null)

  useLayoutEffect(() => {
    if (!intro) return
    gsap.set(q(`.${styles.intro_header_item}`), { y: "45vh", opacity: 0 })
    gsap.set(q(`.intro_images_wrapper`), { opacity: 0 })
    tl.current = gsap
      .timeline({
        defaults: { ease: "expo.inOut" },
      })
      .to(q(`.first_item`), {
        opacity: 1,
        delay: 0.5,
        duration: 1,
      })
      .to(q(`.second_item`), {
        opacity: 1,
        // delay: 0.5,
        duration: 1,
      })
      .to(q(`.first_item`), {
        y: 0,
        duration: 1,
      })
      .to(
        q(`.second_item`),
        {
          opacity: 0,
          duration: 1,
        },
        "<"
      )
      .to(q(`.intro_images_wrapper`), {
        opacity: 1,
        duration: 1,
        onComplete: () => {
          flipState.current = Flip.getState(q(".front_image"))
          setFlipImage(true)
        },
      })
      .to(
        q(`.first_item`),
        {
          color: "white",
          duration: 1,
        },
        "<"
      )
  }, [])

  useLayoutEffect(() => {
    if (!flipImage) return
    Flip.from(flipState.current, {
      duration: 0.75,
      absolute: true,
      ease: "expo.inOut",
      onComplete: () => dispatch({ type: ACTIONS.FINISH_INTRO }),
    })
  }, [flipImage])

  return (
    <div className={styles.intro_wrapper} ref={introWrapperRef}>
      <div className={`${styles.intro_images_wrapper} intro_images_wrapper`}>
        <div
          className={styles.intro_fullscreen_image}
          style={{
            minWidth: `calc(100vh * ${
              images[current === 0 ? images.length - 1 : current - 1].image
                .asset.width /
              images[current === 0 ? images.length - 1 : current - 1].image
                .asset.height
            })`,
          }}
        >
          <GatsbyImage
            image={
              images[current === 0 ? images.length - 1 : current - 1].image
                .asset.gatsbyImageData
            }
            alt={
              images[current === 0 ? images.length - 1 : current - 1].client ||
              "Lauren Bamford Photographer"
            }
          />
        </div>
        <div
          className={
            !flipImage
              ? `${styles.intro_fullscreen_image} front_image`
              : `${styles.intro_front_image} front_image`
          }
          style={
            !flipImage
              ? {
                  minWidth: `calc(100vh * ${
                    images[current].image.asset.width /
                    images[current].image.asset.height
                  })`,
                }
              : {
                  width: `calc(75vh * ${
                    images[current].image.asset.width /
                    images[current].image.asset.height
                  })`,
                }
          }
        >
          <GatsbyImage
            image={images[current].image.asset.gatsbyImageData}
            alt={images[current].client || "Lauren Bamford Photography"}
          />
        </div>
      </div>
      <div className={`${styles.intro_header}`}>
        <span className={`${styles.intro_header_item} first_item`}>
          <h1>Lauren Bamford</h1>
        </span>
        <span className={`${styles.intro_header_item} second_item`}>
          <h2>Photographer</h2>
        </span>
        <span className={styles.intro_header_item}></span>
        <span className={styles.intro_header_item}></span>
      </div>
    </div>
  )
}

export default Intro
