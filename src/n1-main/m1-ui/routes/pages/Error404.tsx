import React from 'react'
import s from './Error404.module.css'
import error404 from './404.svg'
const Error404 = () => {
    return (
        <div>
            <div className={s.wrapper}>
                <img src={error404} alt={'404'} className={s.error404} />
            </div>
        </div>
    )
}

export default Error404
