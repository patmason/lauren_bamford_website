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
import Info from "../components/Info"
import Cursor from "../components/Cursor"

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
  CHANGE_BACKGROUND: "change_background",
  TOGGLE_INFO: "toggle_info",
  TOGGLE_IMAGE_DETAILS: "toggle_image_details",
  UPDATE_CURSOR: "update_cursor",
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
        current: action.payload.next,
        flipState: action.payload.flipState,
      }
    case ACTIONS.PREV_SLIDE:
      return {
        ...state,
        previous: state.current,
        current: action.payload.prev,
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
    case ACTIONS.CHANGE_BACKGROUND:
      return {
        ...state,
        background: action.payload.background,
      }
    case ACTIONS.TOGGLE_INFO:
      return {
        ...state,
        showInfo: !state.showInfo,
        showImageDetails: false,
      }
    case ACTIONS.TOGGLE_IMAGE_DETAILS:
      return {
        ...state,
        showInfo: false,
        showImageDetails: !state.showImageDetails,
      }
    case ACTIONS.UPDATE_CURSOR:
      return {
        ...state,
        cursorContent: action.payload.cursorContent,
      }
  }
}

const IndexPage = () => {
  console.log("render")
  const data = useStaticQuery(graphql`
    {
      allSanityPhoto(sort: { fields: order, order: ASC }) {
        nodes {
          client
          projectInfo
          credits
          image {
            asset {
              gatsbyImageData(width: 3000)
              width
              height
              assetId
            }
          }
        }
      }
      sanityInfo {
        selectClients
        phoneNumber
        instagram
        emailAddress
        agents {
          agentContact
          agentRegion
          agentLink
        }
        about
      }
    }
  `)

  const initialState = {
    images: [...data.allSanityPhoto.nodes],
    current: 1,
    previous: 1,
    selected: 1,
    view: "slides",
    flipState: null,
    intro: true,
    background: "photo",
    showInfo: false,
    showImageDetails: false,
    cursorContent: "FOO",
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const appRef = useRef(null)
  const q = gsap.utils.selector(appRef)

  //Event handlers
  const handleNext = () => {
    let next
    if (state.background !== "photo") {
      next = state.current === state.images.length - 1 ? 0 : state.current + 1
    } else if (state.background === "photo") {
      next = state.current === state.images.length ? 0 : state.current + 1
    }
    dispatch({
      type: ACTIONS.NEXT_SLIDE,
      payload: { flipState: Flip.getState(q(".flip_slide")), next: next },
    })
  }

  const handlePrev = () => {
    let prev
    if (state.background !== "photo") {
      prev = state.current === 0 ? state.images.length - 1 : state.current - 1
    } else if (state.background === "photo") {
      prev = state.current === 0 ? state.images.length : state.current - 1
    }
    dispatch({
      type: ACTIONS.PREV_SLIDE,
      payload: { flipState: Flip.getState(q(".flip_slide")), prev: prev },
    })
  }

  const handleViewChange = () => {
    dispatch({
      type: state.view === "slides" ? ACTIONS.SHOW_GRID : ACTIONS.SHOW_SLIDES,
      payload: {
        flipState: Flip.getState(q(".current_slide")),
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
    if (!state.flipState || state.background !== "photo") return
    Flip.from(state.flipState, {
      absolute: true,
      duration: 0.75,
      toggleClass: "flipping",
      ease: "expo.inOut",
      onComplete: () => {
        // THIS IS A BIT DODGY
        // console.log(prevRef.current);
        if (
          state.current === state.images.length &&
          state.previous === state.images.length - 1
        ) {
          console.log("loop next")
          handleNext()
        }
      },
    })
  }, [state.current])

  //View change effect
  useLayoutEffect(() => {
    if (!state.flipState) return
    console.log("view change")
    Flip.from(state.flipState, {
      targets:
        state.view === "slides" ? q(".current_slide") : q(".grid_current"),
      scale: true,
      duration: 0.75,
      ease: "expo.inOut",
    })
  }, [state.view])

  return (
    <>
      <Seo title="Home" />
      <div
        className={`${styles.app_wrapper} ${
          state.showInfo || state.showImageDetails ? "app_wrapper_info" : ""
        }`}
        ref={appRef}
      >
        {/* <Cursor content={state.cursorContent} /> */}
        {!state.intro ? (
          <Header
            handleViewChange={handleViewChange}
            view={state.view}
            showInfo={state.showInfo}
            showImageDetails={state.showImageDetails}
            dispatch={dispatch}
            ACTIONS={ACTIONS}
          />
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
            background={state.background}
          />
        ) : null}
        <Slides
          images={state.images}
          current={state.current}
          dispatch={dispatch}
          ACTIONS={ACTIONS}
          handleNext={handleNext}
          handlePrev={handlePrev}
          background={state.background}
        />
        {/* <Transition
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
              background={state.background}
            />
          )}
        </Transition> */}
        {state.showInfo || state.showImageDetails ? (
          <Info
            images={state.images}
            current={state.current}
            info={data.sanityInfo}
            dispatch={dispatch}
            ACTIONS={ACTIONS}
            showImageDetails={state.showImageDetails}
            showInfo={state.showInfo}
          />
        ) : null}
        {!state.intro ? (
          <Footer
            background={state.background}
            dispatch={dispatch}
            ACTIONS={ACTIONS}
          />
        ) : null}
        {!state.intro ? <Cursor view={state.view} /> : null}
      </div>
    </>
  )
}

export default IndexPage
