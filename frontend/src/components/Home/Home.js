import React from "react"
import s from "./Home.module.css"

const Home = () => {
  return (
    <section className={s.home_section}>
      <div>
        <div className={s.text}>
          <p>Alumni Portal</p>
        </div>
        <div className={s.small_text}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Laboriosam, illum sed commodi nemo vel, aspernatur, reiciendis nisi
            ratione deserunt quod laborum maiores! Doloribus ipsam, libero
            voluptatum sapiente numquam placeat dolorem!
          </p>
        </div>
      </div>
    </section>
  )
}

export default Home
