import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import AddressImg from "./AddressImg";
import { Fade } from "react-awesome-reveal";
import "./ContactComponent.css";
import { greeting, contactPageData, isPortfolioDataLoaded, waitForDataLoad } from "../../portfolio.js";

class Contact extends Component {
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

  // Safe image loader helper
  getImageSrc = (imagePath) => {
    if (!imagePath || imagePath === "") {
      // Return a default/placeholder image or null
      return null;
    }
    try {
      return require(`../../assets/images/${imagePath}`);
    } catch (error) {
      console.warn(`Image not found: ${imagePath}`);
      return null;
    }
  }

  render() {
    // Show loading state while data is being fetched
    if (!this.state.isDataLoaded) {
      return (
          <div className="contact-main" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}>
            <div>Loading contact information...</div>
          </div>
      );
    }

    const theme = this.props.theme;

    // Safe data extraction with fallbacks
    const ContactData = contactPageData?.contactSection || {};
    const addressSection = contactPageData?.addressSection || {};
    const phoneSection = contactPageData?.phoneSection || {};

    return (
        <div className="contact-main">
          <Header theme={theme} />
          <div className="basic-contact">
            <Fade bottom duration={1000} distance="40px">
              <div className="contact-heading-div">
                <div className="contact-heading-img-div">
                  {ContactData.profile_image_path && (
                      <img
                          src={this.getImageSrc(ContactData.profile_image_path)}
                          alt="Profile"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                      />
                  )}
                </div>
                <div className="contact-heading-text-div">
                  <h1
                      className="contact-heading-text"
                      style={{ color: theme.text }}
                  >
                    {ContactData.title || "Contact Me"}
                  </h1>
                  <p
                      className="contact-header-detail-text subTitle"
                      style={{ color: theme.secondaryText }}
                  >
                    {ContactData.description || ""}
                  </p>
                  <SocialMedia theme={theme} />
                  <div className="resume-btn-div">
                    {greeting?.resumeLink && (
                        <Button
                            text="See My Resume"
                            newTab={true}
                            href={greeting.resumeLink}
                            theme={theme}
                        />
                    )}
                  </div>
                </div>
              </div>
            </Fade>
            <Fade bottom duration={1000} distance="40px">
              <div className="address-heading-div">
                <div className="contact-heading-img-div">
                  <AddressImg theme={theme} />
                </div>
                <div className="address-heading-text-div">
                  <h1
                      className="address-heading-text"
                      style={{ color: theme.text }}
                  >
                    {addressSection.title || "Address"}
                  </h1>
                  <p
                      className="contact-header-detail-text subTitle"
                      style={{ color: theme.secondaryText }}
                  >
                    {addressSection.subtitle || ""}
                  </p>
                  {phoneSection.title && (
                      <h1
                          className="address-heading-text"
                          style={{ color: theme.text }}
                      >
                        {phoneSection.title}
                      </h1>
                  )}
                  {phoneSection.subtitle && (
                      <p
                          className="contact-header-detail-text subTitle"
                          style={{ color: theme.secondaryText }}
                      >
                        {phoneSection.subtitle}
                      </p>
                  )}
                  <div className="address-btn-div">
                    {addressSection.location_map_link && (
                        <Button
                            text="Visit on Google Maps"
                            newTab={true}
                            href={addressSection.location_map_link}
                            theme={theme}
                        />
                    )}
                  </div>
                </div>
              </div>
            </Fade>
          </div>
          <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
          <TopButton theme={this.props.theme} />
        </div>
    );
  }
}

export default Contact;