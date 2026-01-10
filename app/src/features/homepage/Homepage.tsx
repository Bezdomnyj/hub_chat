import styles from './Homepage.module.scss'
import img from 'images/test.png'

const Homepage = () => {

    return <div className={styles.container}>
        <img src={img} alt="" />
    </div>
}

export default Homepage;