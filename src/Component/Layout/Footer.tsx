import styles from "../../styles/mystyle.module.css"
export function Footer () {
    return (
        <footer className="bg-light text-center text-lg-start">
            <div className={`text-center p-3 ${styles.footer}`}>
                <h1 className="text-dark">This is footer</h1>
            </div>
        </footer>
    )
}

