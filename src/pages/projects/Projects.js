import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import GithubRepoCard from "../../components/githubRepoCard/GithubRepoCard";
import PublicationCard from "../../components/publicationsCard/PublicationCard";
import Button from "../../components/button/Button";
import TopButton from "../../components/topButton/TopButton";
import { Fade } from "react-awesome-reveal";
import {
    greeting,
    projectsHeader,
    publicationsHeader,
    publications,
    projects,
    isPortfolioDataLoaded,
    waitForDataLoad
} from "../../portfolio.js";
import "./Projects.css";
import ProjectsImg from "./ProjectsImg";

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDataLoaded: isPortfolioDataLoaded()
        };
    }

    async componentDidMount() {
        if (!this.state.isDataLoaded) {
            await waitForDataLoad();
            this.setState({ isDataLoaded: true });
        }
    }

    render() {
        const theme = this.props.theme;

        // Show loading state while data is being fetched
        if (!this.state.isDataLoaded) {
            return (
                <div className="projects-main" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #3498db',
                        borderRadius: '50%',
                        animation: 'spin 2s linear infinite',
                        marginBottom: '20px'
                    }}></div>
                    <div style={{ color: theme.text }}>Loading projects...</div>
                    <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
                </div>
            );
        }

        // Safe data extraction - FIX: projects.data is already the array, don't access .data again
        const ProjectsData = projects?.data || [];
        const publicationsData = publications?.data || [];
        const projectsHeaderData = projectsHeader || {};
        const publicationsHeaderData = publicationsHeader || {};
        const greetingData = greeting || {};

        return (
            <div className="projects-main">
                <Header theme={theme} />
                <div className="basic-projects">
                    <Fade bottom duration={2000} distance="40px">
                        <div className="projects-heading-div">
                            <div className="projects-heading-img-div">
                                <ProjectsImg theme={theme} />
                            </div>
                            <div className="projects-heading-text-div">
                                <h1
                                    className="projects-heading-text"
                                    style={{ color: theme.text }}
                                >
                                    {projectsHeaderData.title || "Projects"}
                                </h1>
                                <p
                                    className="projects-header-detail-text subTitle"
                                    style={{ color: theme.secondaryText }}
                                >
                                    {projectsHeaderData.description || "Here are some of my projects"}
                                </p>
                            </div>
                        </div>
                    </Fade>
                </div>

                <div className="repo-cards-div-main">
                    {ProjectsData.length > 0 ? (
                        ProjectsData.map((repo, index) => {
                            return (
                                <GithubRepoCard
                                    key={repo.id || repo.name || index}
                                    repo={repo}
                                    theme={theme}
                                />
                            );
                        })
                    ) : (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '50px',
                                color: theme.secondaryText
                            }}
                        >
                            <p>No projects found. Please check your Firebase configuration.</p>
                        </div>
                    )}
                </div>

                {greetingData.githubProfile && (
                    <Button
                        text={"More Projects"}
                        className="project-button"
                        href={greetingData.githubProfile}
                        newTab={true}
                        theme={theme}
                    />
                )}

                {/* Publications */}
                {publicationsData.length > 0 ? (
                    <div className="basic-projects">
                        <Fade bottom duration={2000} distance="40px">
                            <div className="publications-heading-div">
                                <div className="publications-heading-text-div">
                                    <h1
                                        className="publications-heading-text"
                                        style={{ color: theme.text }}
                                    >
                                        {publicationsHeaderData.title || "Publications"}
                                    </h1>
                                    <p
                                        className="projects-header-detail-text subTitle"
                                        style={{ color: theme.secondaryText }}
                                    >
                                        {publicationsHeaderData.description || "Published articles and research"}
                                    </p>
                                </div>
                            </div>
                        </Fade>
                    </div>
                ) : null}

                <div className="repo-cards-div-main">
                    {publicationsData.map((pub, index) => {
                        return (
                            <PublicationCard
                                key={pub.id || pub.title || index}
                                pub={pub}
                                theme={theme}
                            />
                        );
                    })}
                </div>

                <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
                <TopButton theme={this.props.theme} />
            </div>
        );
    }
}

export default Projects;