import React, { useState, useRef, useLayoutEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"

//Components
import Seo from "../components/seo"
import Intro from "../components/Intro"
import Header from "../components/Header"
import Slides from "../components/Slides"

//styles
import * as styles from "../styles/component_styles/index.module.scss"

gsap.registerPlugin(Flip)

const IndexPage = () => {
  const imageData = useStaticQuery(graphql`
    {
      allSanityPhoto {
        nodes {
          client
          image {
            asset {
              gatsbyImageData
              width
              height
              assetId
            }
          }
        }
      }
    }
  `)
  const [intro, setIntro] = useState(true)
  const [current, setCurrent] = useState(2)
  const [images, setImages] = useState([...imageData.allSanityPhoto.nodes])
  const appRef = useRef(null)
  const flipState = useRef(null)
  const q = gsap.utils.selector(appRef)

  //Event handlers
  const handleNext = () => {
    flipState.current = Flip.getState(q(".slide"))
    setCurrent(prev => (prev === images.length ? 0 : prev + 1))
  }

  const handlePrev = () => {
    flipState.current = Flip.getState(q(".slide"))
    setCurrent(prev => (prev === 0 ? images.length : prev - 1))
  }

  //Effects
  //Slide change effect
  useLayoutEffect(() => {
    if (!flipState.current) return
    Flip.from(flipState.current, {
      absolute: true,
      duration: 1,
      ease: "expo.inOut",
    })
  }, [current])

  return (
    <>
      <Seo title="Home" />
      <div className={StyleSheet.app_wrapper} ref={appRef}>
        {intro ? (
          <Intro
            intro={intro}
            setIntro={setIntro}
            images={images}
            current={current}
          />
        ) : (
          <>
            <Header />
          </>
        )}
        <Slides
          images={images}
          current={current}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    </>
  )
}

export default IndexPage
