import React from 'react';
import Card from "../Card/Card.jsx";
import {Link} from "react-router-dom";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import styles from './CardList.module.css';

export default function CardList({items = []}) {

    //use auto-animate library for simple card animation
    const [parent] = useAutoAnimate();

    return (
    <>
        <div ref={parent} className={styles.cards}>
            {items.length > 0 ? (
                items.map((item) => (
                    <Link
                        to={`/hero/${item.id}`}
                        key={item.id}
                        state={{item}}
                    >
                        <Card item={item} />
                    </Link>
                ))
            ) : (<p>Loading ...</p>)}
        </div>
    </>
    )
}