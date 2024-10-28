import styles from './Card.module.css';

export default function Card({ item }) {
    return (
        <>
            <div className={styles.card}>
                <h3 className={styles.title}>{item.name}</h3>
                <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${item.id}.jpg`}
                    alt={item.name}
                    className={styles.img}
                />
            </div>
        </>
    )
}