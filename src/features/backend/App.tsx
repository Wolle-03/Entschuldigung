import { ThemeProvider } from '@emotion/react';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Container, createTheme, Grid, IconButton, Input, Paper, Slider, Switch, Tooltip, Typography } from '@mui/material';
import { Component } from 'react';
import { connect } from 'react-redux';
import { appStateType, reducers } from './AppSlice';
import Home from './home/Home';
import { reducers as homeReducers } from './home/HomeSlice';
import Login from './login/Login';
import { RootState } from './store';

type Props = appStateType & typeof reducers & {
	setEntries: typeof homeReducers.setEntries
}

export class App extends Component<Props> {
	render() {
		return (
			<ThemeProvider theme={createTheme({
				typography: {
					fontSize: this.props.fontSize,
				}
			})}>
				<AppBar
					position="relative"
					color="default"
					sx={{
						width: '100%',
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						p: 0,
						borderTop: (theme) => `1px solid ${theme.palette.divider}`,
					}}
				>
					<Grid sx={{ display: 'flex' }}>
						<Tooltip title="Logout">
							<IconButton onClick={() => this.props.logout()}>
								<LogoutIcon sx={{ color: "#ff0000" }} />
							</IconButton>
						</Tooltip>
						<Grid container mx={20} spacing={2} alignItems="center">
							<Grid item>
								<FormatSizeIcon />
							</Grid>
							<Grid item xs>
								<Slider
									value={this.props.fontSize}
									onChange={(_e, v) => this.props.setFontSize(Number(v))}
									step={1}
									min={8}
									max={30}
								/>
							</Grid>
							<Grid item>
								<Input
									value={this.props.fontSize}
									size="small"
									onChange={(e) => this.props.setFontSize(Number(e.target.value))}
									inputProps={{
										step: 1,
										min: 8,
										max: 30,
										type: 'number',
									}}
								/>
							</Grid>
						</Grid>
						<Tooltip title="Archiv">
							<Switch
								checked={this.props.archive}
								onChange={(_e, c) => {
									this.props.setShowArchieve(c);
									this.props.setEntries(null);
								}}
							/>
						</Tooltip>
					</Grid>
				</AppBar>
				<Container maxWidth="xl" sx={{ mb: 8 }}>
					<Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
						<Typography variant="h2" align="center">
							{`${process.env.REACT_APP_NAME}`[0].toUpperCase() + `${process.env.REACT_APP_NAME}`.slice(1)}
						</Typography>
						{this.props.rsa_private_key === null ? <Login /> : <Home />}
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
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	...state.app
})

const mapDispatchToProps = { ...reducers, setEntries: homeReducers.setEntries }

export default connect(mapStateToProps, mapDispatchToProps)(App)