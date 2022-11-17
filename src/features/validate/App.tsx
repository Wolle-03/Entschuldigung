import { ThemeProvider } from '@emotion/react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AppBar, Box, Container, createTheme, Grid, Paper, Slider, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { SHA1 } from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

type Props = {
	signature: string
}

type State = {
	vorname: string,
	nachname: string,
	days: string,
	at: string,
	date: string,
	classes: [number, number],
	from: string,
	till: string,
	valid: boolean
}

class App extends Component<Props, State> {

	state: State = {
		vorname: "",
		nachname: "",
		days: "",
		at: "",
		date: "",
		classes: [1, 11],
		from: "",
		till: "",
		valid: false
	}

	validate = () => {
		const jse = new JSEncrypt();
		jse.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA+NpqLCbXcXyQg9ntJUs9
C4+enL2GKXUy0DKoIJyawqMuTo9JbNUCyRLHWkGtgSoKVNVY8yLn39nnPZwUAvaK
F1D9X7OH1LUTx3/oYDNAnnXH/UXsSIgt0L5oA7UGXOgiBVUUzdCtLAh0KaRjYodC
ZBv3rgGdrix7DySwEYXDWJS3E6/jy9w1HpDI4lNwSpdTcWsxDq9RfeUfh4bvKQj9
XU4sNRtWezETHKApzjIeiOUrDU8FEWrwe6n2p2gyFOfgd2X1cQR4wTvUOHoubkJw
/ZnjF9B3AjymyzuxQZz2pDbtKt7TaKs7lrjm+5WQV3k3meOIAHFO4D61Qw7nfyqM
btV7hbOXMg2RZh925tf8onZ4FB92XO2OZJflN+1sy8caJX7KMITQtUG88VxgvM4t
sRN6S7lAVprK/ccO5pEW2RXj6J+NPk1NNdVVaeH3yiwWEN6thCQ6ub1wbXhQu8R0
isAfPbaFj8rP10P1mHIhl9jVFS3aB7u5W3i73cd6PQZYbUh81N3NMOpLbhXF6KvX
vNDGw7FKDt2RMhAqDlX8y708t02oHicJ3b/qkPQgbH47vNho46A6IhHgyHVIcj82
bYKMTC4gcQxIXURQ7NXrmv7CL9yJZZkoGbQ6GmqrLTkkNKEi+ik3HgXZxB6J/J5w
WK0cqXlsFBpyvMUFHfstrQMCAwEAAQ==
-----END PUBLIC KEY-----`)
		let data;
		if (this.state.days === "single")
			if (this.state.at === "today")
				data = JSON.stringify({
					"name": this.state.vorname + " " + this.state.nachname,
					"time": new Date().toLocaleDateString() + ": (" + this.state.classes.join(". - ") + ".)"
				})
			else if (this.state.at === "another_day")
				data = JSON.stringify({
					"name": this.state.vorname + " " + this.state.nachname,
					"time": new Date(this.state.date).toLocaleDateString() + ": (" + this.state.classes.join(". - ") + ".)"
				})
			else
				return
		else if (this.state.days === "multiple")
			data = JSON.stringify({
				"name": this.state.vorname + " " + this.state.nachname,
				"time": new Date(this.state.from).toLocaleDateString() + " bis zum " + new Date(this.state.till).toLocaleDateString()
			})
		else
			return
		if (jse.verify(data, this.props.signature, (str: string) => SHA1(str).toString()))
			this.setState({ valid: true });
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
		if (prevState.valid == false)
			this.validate();
	}

	render() {
		return (
			<ThemeProvider theme={createTheme()}>
				<Container maxWidth="sm" sx={{ mb: 8 }}>
					<Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
						<Typography component="h1" variant="h3" align="center">
							{`${process.env.REACT_APP_NAME}`[0].toUpperCase() + `${process.env.REACT_APP_NAME}`.slice(1)}
						</Typography>
						{this.state.valid ?
							<Box>
								<CheckCircleIcon sx={{ fontSize: 400, width: "100%", color: "green" }} />
							</Box> :
							<Box>
								<Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>Name</Typography>
								<Grid container spacing={3}>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											id="firstName"
											name="firstName"
											label="Vorname"
											fullWidth
											placeholder="Max"
											onChange={(e) => this.setState({ vorname: e.target.value })}
											value={this.state.vorname}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											id="lastName"
											name="lastName"
											label="Nachname"
											fullWidth
											placeholder="Mustermann"
											onChange={(e) => this.setState({ nachname: e.target.value })}
											value={this.state.nachname}
										/>
									</Grid>
								</Grid>
								<Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>Time</Typography>
								<Grid container spacing={3}>
									<Grid item xs={12} sm={12}>
										<ToggleButtonGroup
											fullWidth
											value={this.state.days}
											exclusive
										>
											<ToggleButton
												value="single"
												onClick={() => this.setState({ days: "single" })}
											>Einen Tag</ToggleButton>
											<ToggleButton
												value="multiple"
												onClick={() => this.setState({ days: "multiple" })}
											>Mehrere Tage</ToggleButton>
										</ToggleButtonGroup>
									</Grid>
									{this.state.days === "single" &&
										<Grid item xs={12} sm={12}>
											<ToggleButtonGroup
												fullWidth
												value={this.state.at}
												exclusive
											>
												<ToggleButton
													value="today"
													onClick={() => this.setState({ at: "today" })}
												>Heute</ToggleButton>
												<ToggleButton
													value="another_day"
													onClick={() => this.setState({ at: "another_day" })}
												>Einen anderen Tag</ToggleButton>
											</ToggleButtonGroup>
										</Grid>}
									{this.state.days === "single" && this.state.at !== "today" && this.state.at !== "" &&
										<Grid item xs={12} sm={12}>
											<TextField
												required
												id="date"
												type="date"
												name="date"
												label="Datum"
												fullWidth
												onChange={(e) => this.setState({ date: e.target.value })}
												defaultValue={this.state.date} />
										</Grid>}
									{this.state.days === "single" && this.state.at !== "" &&
										<Grid item xs={12} sm={12}>
											<label>Stunden</label>
											<Slider
												value={this.state.classes}
												onChange={(e, value) => this.setState({ classes: value as [number, number] })}
												min={1}
												max={11}
												marks={[
													{ value: 1, label: "1." },
													{ value: 2, label: "2." },
													{ value: 3, label: "3." },
													{ value: 4, label: "4." },
													{ value: 5, label: "5." },
													{ value: 6, label: "6." },
													{ value: 7, label: "7." },
													{ value: 8, label: "8." },
													{ value: 9, label: "9." },
													{ value: 10, label: "10." },
													{ value: 11, label: "11." }
												]} />
										</Grid>
									}
									{this.state.days === "multiple" &&
										<React.Fragment>
											<Grid item xs={12} sm={6}>
												<TextField
													required
													id="from"
													type="date"
													name="from"
													label="Von"
													fullWidth
													onChange={(e) => this.setState({ from: e.target.value })}
													defaultValue={this.state.from} />
											</Grid>
											<Grid item xs={12} sm={6}>
												<TextField
													required
													id="till"
													type="date"
													name="till"
													label="Bis"
													fullWidth
													onChange={(e) => this.setState({ till: e.target.value })}
													defaultValue={this.state.till} />
											</Grid>
										</React.Fragment>
									}
								</Grid>
							</Box>
						}
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

export default function Wrapper() {
	const params = useParams<{ signature: string }>();
	return (
		<App
			signature={params.signature!}
		/>
	)
}