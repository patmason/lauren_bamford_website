import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

//Components
import Seo from "../components/seo"
import Intro from "../components/Intro"
import Header from "../components/Header"

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
  return (
    <>
      <Seo title="Home" />
      <div>
        <Intro
          intro={intro}
          setIntro={setIntro}
          images={imageData.allSanityPhoto.nodes}
        />
        {/* {intro ? null : <Header intro={intro} setIntro={setIntro} />} */}
      </div>
    </>
  )
}

export default IndexPage
