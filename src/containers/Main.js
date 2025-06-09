import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom"; // Keep this for compatibility
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
        const containerStyle = {
            width: '100%',
            overflowX: 'hidden'
        };

        const sectionStyle = {
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 0,
            margin: 0
        };

        return (
            <BrowserRouter basename="/">
                <div className="single-page-container" style={containerStyle}>
                    {/* Splash section - only show if enabled in settings */}
                    {settings.isSplash && (
                        <section id="splash" className="page-section" style={sectionStyle}>
                            <Splash theme={this.props.theme} />
                        </section>
                    )}

                    {/* Home section */}
                    <section id="home" className="page-section" style={sectionStyle}>
                        <Home theme={this.props.theme} />
                    </section>

                    {/* Experience section */}
                    <section id="experience" className="page-section" style={sectionStyle}>
                        <Experience theme={this.props.theme} />
                    </section>

                    {/* Education section */}
                    <section id="education" className="page-section" style={sectionStyle}>
                        <Education theme={this.props.theme} />
                    </section>

                    {/* Projects section */}
                    <section id="projects" className="page-section" style={sectionStyle}>
                        <Projects theme={this.props.theme} />
                    </section>

                    {/* Open Source section */}
                    <section id="opensource" className="page-section" style={sectionStyle}>
                        <Opensource theme={this.props.theme} />
                    </section>

                    {/* Contact section */}
                    <section id="contact" className="page-section" style={sectionStyle}>
                        <Contact theme={this.props.theme} />
                    </section>
                </div>
            </BrowserRouter>
        );
    }
}