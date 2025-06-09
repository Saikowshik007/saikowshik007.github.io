import React, { Component } from "react";
import ExperienceAccordion from "../../containers/experienceAccordion/ExperienceAccordion.js";
import "./Experience.css";
import { experience } from "../../portfolio.js";
import { Fade } from "react-awesome-reveal";
import ExperienceImg from "./ExperienceImg";
import Type from "../../containers/greeting/Type";

class Experience extends Component {
  render() {
    const theme = this.props.theme;
    const imageUri = "../../assets/images/" + experience.header_image_path;
    console.log("Current theme:", imageUri);
    return (
      <div className="experience-main">
        <div className="basic-experience">
          <Fade bottom duration={2000} distance="40px">
            <div className="experience-heading-div">
              <div className="experience-heading-img-div">
                {<img src={imageUri} alt="" />}
                <ExperienceImg theme={theme} />
              </div>
              <div className="experience-heading-text-div">
                <h1
                  className="experience-heading-text"
                  style={{ color: theme.text }}
                >
                  {experience.title}
                </h1>
                <h3
                  className="experience-heading-sub-text"
                  style={{ color: theme.text }}
                >
                  {experience["subtitle"]}
                </h3>
                <p
                  className="experience-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  <br />
                  <Type theme={theme} string={experience.description} />
                  <br />
                </p>
              </div>
            </div>
          </Fade>
        </div>
        <ExperienceAccordion sections={experience["sections"]} theme={theme} />
      </div>
    );
  }
}

export default Experience;
