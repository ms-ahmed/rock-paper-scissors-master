import React, { Fragment, useState, useEffect, useRef } from 'react';
import Logo from './svg/logo';
import BgTriangle from './svg/bg-triangle';
import IconRock from './svg/icon-rock';
import IconScissors from './svg/icon-scissors';
import IconPaper from './svg/icon-paper';
import RockIcon from './butons/rock-icon';
import ScissorsIcon from './butons/scissors-icon';
import PaperIcon from './butons/paper-icon';
import ResultsRegular from './results-page/results-regular';
import { useDispatch, useSelector } from 'react-redux';
import ButonRegular from './butons/buton-regular';
import ModalRegular from './modals/modal-regular';
import FALSE from '../actions/false';
function Regular(props) {
	const [toggleRegular, setToggleRegular] = useState(false);
	const paper = useRef(null);
	const rock = useRef(null);
	const scissors = useRef(null);
	let displayResult = {};
	let displayTriangle = {};
	let showResult = useSelector((state) => state.score);
	const dispatch = useDispatch();
	const playAgain = () => {
		dispatch(FALSE());
		setToggleRegular((state) => !state);
	};
	const computerPlay = () => {
		let choice = props.referee.getChoices();
		props.setcomputerchoice(choice[Math.floor(Math.random() * choice.length)]);
	};
	const paperChoice = (e) => {
		setToggleRegular((state) => !state);
		scissors.current.style.zIndex = '0';
		rock.current.style.zIndex = '0';
		paper.current.style.zIndex = '3';
		props.setuserchoice('paper');
		computerPlay();
	};
	const rockChoice = (e) => {
		paper.current.style.zIndex = '0';
		scissors.current.style.zIndex = '0';
		rock.current.style.zIndex = '3';
		setToggleRegular((state) => !state);
		props.setuserchoice('rock');
		computerPlay();
	};
	const scissorsChoice = (e) => {
		setToggleRegular((state) => !state);
		paper.current.style.zIndex = '0';
		rock.current.style.zIndex = '0';
		scissors.current.style.zIndex = '3';
		props.setuserchoice('scissors');
		computerPlay();
	};

	const bgTriangleFunction = () => {
		if (!toggleRegular) {
			return (displayTriangle = { display: 'block' });
		} else {
			return (displayTriangle = { display: 'none' });
		}
	};
	bgTriangleFunction();

	const resultFunction = () => {
		if (!toggleRegular) {
			return (displayResult = { display: 'none' });
		} else {
			return (displayResult = { display: 'block' });
		}
	};

	resultFunction();
	let style = {};
	let regularWinDisplay = useSelector((state) => state.regularWinDisplay);
	let styleFunction = () => {
		if (regularWinDisplay == true) {
			return (style = { display: 'block' });
		} else {
			return (style = { display: 'none' });
		}
	};
	styleFunction();
	return (
		<Fragment>
			<section className={'common-style'}>
				<div className={'logo-score'}>
					<div className={'logo'}>
						<a href={'/'}>
							<Logo />
						</a>
					</div>
					<div className={'score'}>
						<p>{showResult}</p>
					</div>
				</div>
				<div className={'bg-triangle'} style={displayTriangle}>
					<BgTriangle />
					<RockIcon rockchoice={rockChoice} toggleRegular={toggleRegular} />
					<ScissorsIcon scissorschoice={scissorsChoice} toggleRegular={toggleRegular} />
					<PaperIcon paperchoice={paperChoice} toggleRegular={toggleRegular} />
				</div>
				<div className={'regular-result'} style={displayResult}>
					<div className={'container-icons'}>
						<div className={'user-choice'}>
							<div className={'win-background-div loose-win-same'} style={style} />
							<PaperIcon ref={paper} />
							<RockIcon ref={rock} />
							<ScissorsIcon ref={scissors} />
						</div>
						<ResultsRegular computerchoice={props.computerchoice} />
					</div>
					<div className={'play-again'}>
						{/* 	<p>{'YOU WIN'}</p>
						<p>{'YOU LOSE'}</p> */}
						<p onClick={playAgain}>{'Play again'}</p>
					</div>
					<ButonRegular />
				</div>

				<ModalRegular />
			</section>
		</Fragment>
	);
}
export default Regular;
