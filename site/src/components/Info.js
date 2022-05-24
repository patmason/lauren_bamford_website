import React from "react"

//styles
import * as styles from "../styles/component_styles/info.module.scss"
const Info = ({ images, current }) => {
  return (
    <div className={styles.info_wrapper}>
      <div className={styles.about_wrapper}>
        <span className={styles.info_item}>
          <h2>ABOUT</h2>
        </span>
        <span className={styles.info_item}>
          <h2>SELECT CLIENTS</h2>
        </span>
        <span className={styles.info_item}>
          <h2>CONTACT</h2>
        </span>
        <span className={styles.info_item}>
          <button>( CLOSE )</button>
        </span>
      </div>
      <div className={styles.image_detail_wrapper}>
        <span className={styles.info_item}>
          <h2>CLIENT</h2>
          <span>{images[current].client}</span>
        </span>
        <span className={styles.info_item}>
          <h2>PROJECT INFO</h2>
          <span>{images[current].projectInfo}</span>
        </span>
        <span className={styles.info_item}>
          <h2>CREDITS</h2>
        </span>
        <span className={styles.info_item}>
          <button>( CLOSE )</button>
        </span>
      </div>
    </div>
  )
}

export default Info
