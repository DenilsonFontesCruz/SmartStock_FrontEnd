import React from "react";
import styles from '../Styles/ContentStyle/content.module.css';
import HeaderComp from '../components/Header';
import NavComp from '../components/Nav';
import ContentContainer from '../components/ContentContainer';

export default function ContentPage() {
    return (
        <div className={styles.layout}>
                <HeaderComp />
                <NavComp />
                <ContentContainer />
        </div>
    )
}
