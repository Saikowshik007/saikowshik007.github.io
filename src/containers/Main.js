import React, { Component } from "react";
import "./Main.css"; // Add this line to import the CSS
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Education from "../pages/education/EducationComponent";
import Experience from "../pages/experience/Experience";
import Opensource from "../pages/opensource/Opensource";
import Contact from "../pages/contact/ContactComponent";
import Projects from "../pages/projects/Projects";
import { settings } from "../portfolio.js";

export default class Main extends Component {
    render() {
        return (
            <div className="single-page-container">
                {/* Splash section - only show if enabled in settings */}
                {settings.isSplash && (
                    <section id="splash" className="page-section">
                        <Splash theme={this.props.theme} />
                    </section>
                )}

                {/* Home section */}
                <section id="home" className="page-section">
                    <Home theme={this.props.theme} />
                </section>

                {/* Experience section */}
                <section id="experience" className="page-section">
                    <Experience theme={this.props.theme} />
                </section>

                {/* Education section */}
                <section id="education" className="page-section">
                    <Education theme={this.props.theme} />
                </section>

                {/* Projects section */}
                <section id="projects" className="page-section">
                    <Projects theme={this.props.theme} />
                </section>

                {/* Open Source section */}
                <section id="opensource" className="page-section">
                    <Opensource theme={this.props.theme} />
                </section>

                {/* Contact section */}
                <section id="contact" className="page-section">
                    <Contact theme={this.props.theme} />
                </section>
            </div>
        );
    }
}