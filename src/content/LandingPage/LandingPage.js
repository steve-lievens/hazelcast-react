import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
} from 'carbon-components-react';

const props = {
  tabs: {
    selected: 0,
    triggerHref: '#',
    role: 'navigation',
  },
  tab: {
    href: '#',
    role: 'presentation',
    tabIndex: 0,
  },
};

const LandingPage = () => {
  return (
    <div className="bx--grid bx--grid--full-width landing-page">
      <div className="bx--row landing-page__banner">
        <div className="bx--col-lg-16">
          <Breadcrumb noTrailingSlash aria-label="Page navigation">
            <BreadcrumbItem>
              <a href="/">Welcome</a>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="landing-page__heading">Get your free Account</h1>
        </div>
      </div>
      <div className="bx--row landing-page__r2">
        <div className="bx--col bx--no-gutter">
          <Tabs {...props.tabs} aria-label="Tab navigation">
            <Tab {...props.tab} label="About">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-md-4 bx--col-lg-7">
                    <h2 className="landing-page__subheading">
                      Free basic services
                    </h2>
                    <p className="landing-page__p">
                      This current account is free of charge. Add optional
                      extras if you need them. Pay only for what you use.
                    </p>
                    <Button>Learn more</Button>
                  </div>
                  <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
                    <img
                      className="landing-page__illo"
                      src={`${process.env.PUBLIC_URL}/banking-home.png`}
                      alt="Carbon illustration"
                    />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab {...props.tab} label="What's included ?">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-lg-16">
                    Included with our free current account Free current account
                    online.<br /> All these standard services are free of
                    charge:
                    <ul>
                      <li>
                        - A debit card for making secure, fast payments in
                        Europe
                      </li>
                      <li>- Contactless payments with your card</li>
                      <li>- Online banking on your PC and tablet</li>
                      <li>- Mobile banking on your smartphone</li>
                      <li>- Cash withdrawals in euro at all ATMs</li>
                      <li>- Banking at ACME self-service terminals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab {...props.tab} label="PayPal">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-lg-16">
                    You can link your PayPal account with ACME Mobile and get a
                    24/7 view – no matter where you are – of what you've spent
                    and what's been paid into that account. Now that's even more
                    all-in-one convenience.
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <div className="bx--row landing-page__r3">
        <div className="bx--col-md-4 bx--col-lg-4">
          <h3 className="landing-page__label">More information</h3>
        </div>
        <div className="bx--col-md-4 bx--col-lg-4">Bank Card Regulations</div>
        <div className="bx--col-md-4 bx--col-lg-4">
          General Banking Terms and Conditions
        </div>
        <div className="bx--col-md-4 bx--col-lg-4">
          Fee Information Document
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
