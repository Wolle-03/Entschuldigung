import { ThemeProvider } from '@emotion/react';
import { Alert, AppBar, Box, Button, Container, createTheme, Grid, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { RootState, store } from './store';
import { appStateType, reducers } from "./AppSlice";
import Login, { validateLogin } from './login/Login';
import { loginStateType } from './login/LoginSlice';
import Reason, { validateReason } from './reason/Reason';
import { reasonStateType } from './reason/ReasonSlice';
import Review, { validateReview } from './review/Review';
import Success from './success/Success';
import Time, { validateTime } from './time/Time';
import { timeStateType } from './time/TimeSlice';

type Props = appStateType & typeof reducers & {
	login: loginStateType,
	time: timeStateType,
	reason: reasonStateType
}

class App extends Component<Props> {

	steps = ["Login", "Zeit", "Grund", "Überblick"];

	getStepContent() {
		switch (this.props.step) {
			case 0:
				return <Login />
			case 1:
				return <Time />
			case 2:
				return <Reason />
			case 3:
				return <Review />
			case 4:
				return <Success />
		}
	}

	async nextStep() {
		let error: Promise<string | undefined>;
		switch (this.props.step) {
			case 0:
				error = validateLogin(this.props.login);
				break;
			case 1:
				error = validateTime(this.props.time);
				break;
			case 2:
				error = validateReason(this.props.reason);
				break;
			case 3:
				error = validateReview({ login: this.props.login, time: this.props.time, reason: this.props.reason });
				break;
			default:
				throw new Error("Unknown step");
		}
		console.log(error)
		this.props.setError(await error);
		if (await error === undefined)
			this.props.nextStep()
	}

	render() {
		return (
			<Provider store={store}>
				<ThemeProvider theme={createTheme()}>
					<Container maxWidth="sm" sx={{ mb: 8 }}>
						<Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
							<Typography component="h1" variant="h4" align="center">
								{`${process.env.REACT_APP_NAME}`[0].toUpperCase() + `${process.env.REACT_APP_NAME}`.slice(1)}
							</Typography>
							<Stepper activeStep={this.props.step} sx={{ pt: 3, pb: 5 }} alternativeLabel>
								{this.steps.map((label) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
							<React.Fragment>
								{this.getStepContent()}
								<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
									{this.props.error === undefined && this.props.step < 4 ?
										<React.Fragment>
											{this.props.step !== 0 &&
												<Button onClick={() => this.props.prevStep()} sx={{ mt: 3, ml: 1 }}>
													Zurück
												</Button>
											}
											<Button
												variant="contained"
												onClick={() => this.nextStep()}
												sx={{ mt: 3, ml: 1 }}
											>
												{this.props.step === this.steps.length - 1 ? "Abschicken" : "Weiter"}
											</Button>
										</React.Fragment>
										: this.props.error !== undefined &&
										<Alert sx={{ mt: 3, width: "100%" }} severity="error">{this.props.error}</Alert>
									}
								</Box>
							</React.Fragment>
						</Paper>
					</Container>
					<AppBar
						position="relative"
						color="default"
						sx={{
							width: '100%',
							position: 'fixed',
							bottom: 0,
							left: 0,
							right: 0,
							p: 0,
							borderTop: (theme) => `1px solid ${theme.palette.divider}`,
						}}
					>
						<Grid sx={{ display: 'flex' }}>
							<Typography sx={{
								position: 'relative',
								left: 5,
							}} variant="h6" color="rgba(0, 0, 0, 0.5)">
								by {`${process.env.REACT_APP_AUTHOR}`}
							</Typography>
							<Typography sx={{
								position: 'fixed',
								right: 5,
							}} variant="h6" color="rgba(0, 0, 0, 0.5)">
								v{`${process.env.REACT_APP_VERSION}`}
							</Typography>
						</Grid>
					</AppBar>
				</ThemeProvider>
			</Provider>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	...state.app,
	...state
})

const mapDispatchToProps = { ...reducers }

export default connect(mapStateToProps, mapDispatchToProps)(App)