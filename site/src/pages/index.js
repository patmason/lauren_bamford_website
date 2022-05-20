import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useReducer,
} from "react"
import { useStaticQuery, graphql } from "gatsby"
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"
import { Transition } from "react-transition-group"

//Components
import Seo from "../components/seo"
import Intro from "../components/Intro"
import Header from "../components/Header"
import Slides from "../components/Slides"
import Grid from "../components/Grid"
import Footer from "../components/Footer"

//styles
import * as styles from "../styles/component_styles/index.module.scss"

gsap.registerPlugin(Flip)

//reducer code
//Actions object just makes it easier for auto complete and avoid typos
function swapSelected(array, current, selected) {
  let newArray = [...array]
  ;[newArray[current], newArray[selected]] = [
    newArray[selected],
    newArray[current],
  ]
  return newArray
}

const ACTIONS = {
  FINISH_INTRO: "finish_intro",
  NEXT_SLIDE: "next_slide",
  PREV_SLIDE: "prev_slide",
  SHOW_GRID: "show_grid",
  SHOW_SLIDES: "show_slides",
  SELECT_FROM_GRID: "select_from_grid",
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FINISH_INTRO:
      return {
        ...state,
        intro: false,
      }
    case ACTIONS.NEXT_SLIDE:
      return {
        ...state,
        previous: state.current,
        current: state.current === state.images.length ? 0 : state.current + 1,
        flipState: action.payload.flipState,
      }
    case ACTIONS.PREV_SLIDE:
      return {
        ...state,
        previous: state.current,
        current: state.current === 0 ? state.images.length : state.current - 1,
        flipState: action.payload.flipState,
      }
    case ACTIONS.SHOW_GRID:
      return {
        ...state,
        view: "grid",
        flipState: action.payload.flipState,
      }
    case ACTIONS.SHOW_SLIDES:
      return {
        ...state,
        view: "slides",
        flipState: action.payload.flipState,
      }
    case ACTIONS.SELECT_FROM_GRID:
      return {
        ...state,
        view: "slides",
        selected: action.payload.selectedImage,
        images: swapSelected(
          state.images,
          state.current,
          action.payload.selectedImage
        ),
        flipState: action.payload.flipState,
      }
  }
}

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

  const initialState = {
    images: [...imageData.allSanityPhoto.nodes],
    current: 1,
    previous: 1,
    selected: 1,
    view: "slides",
    flipState: null,
    intro: true,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const appRef = useRef(null)
  const q = gsap.utils.selector(appRef)

  //Event handlers
  const handleNext = () => {
    dispatch({
      type: ACTIONS.NEXT_SLIDE,
      payload: { flipState: Flip.getState(q(".flip_slide")) },
    })
  }

  const handlePrev = () => {
    dispatch({
      type: ACTIONS.PREV_SLIDE,
      payload: { flipState: Flip.getState(q(".flip_slide")) },
    })
  }

  const handleViewChange = () => {
    dispatch({
      type: state.view === "slides" ? ACTIONS.SHOW_GRID : ACTIONS.SHOW_SLIDES,
      payload: {
        flipState: Flip.getState(q(".current")),
      },
    })
  }

  //Effects
  useEffect(() => {
    // Slides loop logic
    if (state.current === state.images.length) {
      if (state.previous === 0) {
        handlePrev()
      }
    }
  }, [state.current])

  //Slide change effect
  useLayoutEffect(() => {
    if (!state.flipState) return
    Flip.from(state.flipState, {
      absolute: true,
      duration: 1,
      ease: "expo.inOut",
    })
  }, [state.current])

  //View change effect
  useLayoutEffect(() => {
    if (!state.flipState) return
    Flip.from(state.flipState, {
      targets:
        state.view === "slides" ? q(".current_slide") : q(".grid_current"),
      scale: true,
      duration: 1,
      ease: "expo.inOut",
    })
  }, [state.view])

  return (
    <>
      <Seo title="Home" />
      <div className={styles.app_wrapper} ref={appRef}>
        {!state.intro ? (
          <Header handleViewChange={handleViewChange} view={state.view} />
        ) : null}
        {state.intro ? (
          <Intro
            intro={state.intro}
            images={state.images}
            current={state.current}
            dispatch={dispatch}
            ACTIONS={ACTIONS}
          />
        ) : null}
        {state.view === "grid" ? (
          <Grid
            images={state.images}
            current={state.current}
            dispatch={dispatch}
            ACTIONS={ACTIONS}
          />
        ) : null}
        <Transition
          in={state.view === "slides"}
          timeout={2000}
          mountOnEnter={true}
          //Maybe dont unmount to save on CDN requests?
          // unmountOnExit={true}
        >
          {transitionState => (
            <Slides
              images={state.images}
              current={state.current}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          )}
        </Transition>
        {}
        {!state.intro ? <Footer /> : null}
      </div>
    </>
  )
}

export default IndexPage
