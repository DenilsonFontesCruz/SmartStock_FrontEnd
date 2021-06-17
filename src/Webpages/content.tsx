import React from "react";
import '../Styles/content.css';
import HeaderComp from '../components/Header';
import NavComp from '../components/Nav';
import ContentContainer from '../components/ContentContainer';

export default function ContentPage() {
    return (
        <div className="layout">
                <HeaderComp />
                <NavComp />
                <ContentContainer />
        </div>
    )
}
