/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Intro from './content/intro';
import { Scripts } from './scripts';
import { submitUserInfo, getUserId } from '../../../actions/userinfo';
import Globe from './globe';
import Progress from './progress';
import { SurveyProvider } from '../../../pushkin-react/index';
import ResultsContainer from '../../containers/ResultsContainer';

import { nextPage, progressPrecent } from '../../../actions/nextpage';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gatheringInfo: true, infoPage: 1 };
  }
  componentWillMount() {
    this.props.dispatch(getUserId());
  }
  dispatchUserInfo(state) {
    this.props.dispatch(submitUserInfo(state));
  }
  handleStateChange = (key, value) => {
    const state = this.state;
    state[key] = value;
    this.setState(state);
  };
  handleDisable() {
    if (this.state.infoPage === 3) {
      if (this.state.gender && this.state.age) {
        return false;
      }
      return true;
    }
    if (this.state.infoPage === 4) {
      if (
        this.state.takenBefore &&
          this.state.education &&
          this.state.languageDisorder
      ) {
        return false;
      }
      return true;
    }
    return null;
  }
  dispatchNextPage = () => {
    const props = this.props;
    props.dispatch(
      nextPage({
        page: parseInt(this.props.nextpage.page, 10) + 1,
        content: Scripts[parseInt(this.props.nextpage.page, 10) + 1]
      })
    );
    if(this.state.age && this.state.education && this.state.gender && this.state.languageDisorder && this.state.takenBefore) {
      this.dispatchUserInfo(this.state);
    }
    this.dispatchProgress();
  };
  dispatchProgress = () => {
    const props = this.props;
    props.dispatch(progressPrecent(Math.round((parseFloat(props.nextpage.precent) + 2.725) * 100) / 100));
  };
  handleTextChange() {
    if (this.state.gatheringInfo) {
      return (
        <div>
          <Intro
            handleStateChange={this.handleStateChange}
            content={Scripts[this.state.infoPage]}
            page={this.state.infoPage}
          />
          <button 
          disabled={this.handleDisable()}
          onClick={() => 
            this.setState((state) => {
              return {
                ...state,
                infoPage: state.infoPage + 1,
                gatheringInfo: state.infoPage != 4
              };
            }, () => {
              if (this.state.age && this.state.education && this.state.gender && this.state.languageDisorder && this.state.takenBefore) {
                const { age, education, gender, languageDisorder, takenBefore } = this.state;
                this.dispatchUserInfo({
                  age,
                  education,
                  gender,
                  languageDisorder,
                  takenBefore
                });
              }
            })
          }>Next</button>
        </div>
      );
    }
      let buttonText = 'Next';
      return (
        <SurveyProvider 
          progress={this.dispatchProgress}
          instructions={Scripts}
          resultsContainer={(results) => (
            <ResultsContainer results={results} />
          )}
        />
      )
  }
  handleLogo() {
    if (this.props.nextpage.page < 3) {
      const logo = require('../../../public/img/globe.jpg');
      return <Globe logo={logo} content={Scripts[0]} />;
    }
    if (this.props.questionque.current) {
      if (this.props.questionque.current.type === 'survey-multi-choice' || this.props.questionque.current.type === 'survey-multi-select') {
        return <Globe logo={this.props.questionque.current.choices[0].imageUrl} content={null} />;
      }
    }
    return null;
  }
  handleProgressBar() {
    if( this.props.nextpage.page >=3 ) {
      return (
        <Progress strokeWidth="1" precent={this.props.nextpage.precent} />
      )
    }
  }
  render() {
    return (
      <div className="container row">
        <div className="col-xs-8">
          <h5 >Which English?</h5>
          {this.handleTextChange()}
        </div>
      </div>
    );
  }
}
StartPage.propTypes = { dispatch: React.PropTypes.func };

export default connect(state => state)(StartPage);
