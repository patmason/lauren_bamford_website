import React from "react"

//styles
import * as styles from "../styles/component_styles/info.module.scss"
const Info = ({
  images,
  current,
  info,
  dispatch,
  ACTIONS,
  showImageDetails,
  showInfo,
}) => {
  return (
    <div className={styles.info_wrapper}>
      <br />
      <br />
      <div
        className={`${styles.about_wrapper} ${showInfo ? styles.visible : ""}`}
      >
        <span className={styles.info_item}>
          <h2 className={styles.info_heading}>ABOUT</h2>
          <div className={styles.about}>
            {info.about.split(/[\r\n]+/).map((para, i) => {
              return <p key={i}>{para}</p>
            })}
          </div>
        </span>
        <span className={styles.info_item}>
          <h2 className={styles.info_heading}>SELECT CLIENTS</h2>
          <ul className={styles.client_list}>
            {info.selectClients.map(client => {
              return <li key={client}>{client}</li>
            })}
          </ul>
        </span>
        <span className={styles.info_item}>
          <h2 className={styles.info_heading}>CONTACT</h2>
          <div className={styles.contact_info}>
            <span>T. {info.phoneNumber}</span>
            <span>
              <a href={`mailto:${info.emailAddress.toLowerCase()}`}>
                E: {info.emailAddress.toLowerCase()}
              </a>{" "}
            </span>
            <span>
              <a
                href={info.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                I: @laurenbamford
              </a>
            </span>
            <br />
            <span>For commercial enquiries please contact:</span>
            <br />
            {info.agents.map(agent => {
              return (
                <>
                  <span className={styles.agents} key={agent.agentContact}>
                    <a
                      href={agent.agentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${agent.agentRegion.toUpperCase()}: ${agent.agentContact.toLowerCase()}`}
                    </a>
                  </span>
                </>
              )
            })}
          </div>
        </span>
        <span className={styles.info_item}>
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.TOGGLE_INFO,
              })
            }
          >
            ( CLOSE )
          </button>
        </span>
      </div>
      <div
        className={`${styles.image_detail_wrapper} ${
          showImageDetails ? styles.visible : ""
        }`}
      >
        <span className={styles.info_item}>
          <h2 className={styles.info_heading}>CLIENT</h2>
          <span>
            {images[current].client ? images[current].client : "N / A"}
          </span>
        </span>
        <span className={styles.info_item}>
          <h2 className={styles.info_heading}>PROJECT INFO</h2>
          <span>
            {images[current].projectInfo
              ? images[current].projectInfo
              : "N / A"}
          </span>
        </span>
        <span className={styles.info_item}>
          <h2 className={styles.info_heading}>CREDITS</h2>
          {images[current].credits.length === 0 ? (
            <span>N / A</span>
          ) : (
            <ul>
              {images[current].credits.map(credit => {
                return (
                  <li key={`${images[current].image.asset.assetId}_${credit}`}>
                    {credit}
                  </li>
                )
              })}
            </ul>
          )}
        </span>
        <span className={styles.info_item}>
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.TOGGLE_IMAGE_DETAILS,
              })
            }
          >
            ( CLOSE )
          </button>
        </span>
      </div>
    </div>
  )
}

export default Info
