import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API_BASE_URL } from '../../..';
import { RootState } from '../store';
import { reducers, loginStateType } from "./LoginSlice";

type Props = loginStateType & typeof reducers

export class Login extends Component<Props>  {

	render() {
		const user = localStorage.getItem("mcs_entschuldigung_user");
		var loggedIn: boolean = false;
		if (user) {
			const userJSON = JSON.parse(user);
			this.props.setVorname(userJSON.vorname);
			this.props.setNachname(userJSON.nachname);
			this.props.setKlasse(userJSON.klasse);
			this.props.setGebDat(userJSON.geb_dat);
			loggedIn = true;
		}
		return (
			<React.Fragment >
				<Typography variant="h6" gutterBottom>
					Anmeldedaten
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="firstName"
							name="firstName"
							label="Vorname"
							fullWidth
							autoComplete="given-name"
							placeholder="Max"
							onChange={(e) => this.props.setVorname(e.target.value)}
							value={this.props.vorname}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="lastName"
							name="lastName"
							label="Nachname"
							fullWidth
							autoComplete="family-name"
							placeholder="Mustermann"
							onChange={(e) => this.props.setNachname(e.target.value)}
							value={this.props.nachname}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<InputLabel id="klasse-label">Klasse *</InputLabel>
							<Select
								required
								labelId="klasse-label"
								id="klasse"
								name="klasse"
								value={this.props.klasse}
								fullWidth
								label="Klasse"
								onChange={(e) => this.props.setKlasse(e.target.value)}
							>
								<MenuItem value="E1">E1</MenuItem>
								<MenuItem value="E2">E2</MenuItem>
								<MenuItem value="E3">E3</MenuItem>
								<MenuItem value="E4">E4</MenuItem>
								<MenuItem value="E5">E5</MenuItem>
								<MenuItem value="Q">Q</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="geb_dat"
							name="geb_dat"
							label="Geburtsdatum"
							fullWidth
							placeholder="01.01.2003"
							onChange={(e) => this.props.setGebDat(e.target.value)}
							value={this.props.geb_dat}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<FormControl fullWidth variant="outlined">
							<InputLabel htmlFor="password">Password *</InputLabel>
							<OutlinedInput
								required
								id="password"
								type="password"
								name="password"
								label="Passwort"
								fullWidth
								placeholder="12345"
								onChange={(e) => this.props.setPasswort(e.target.value)}
								value={this.props.passwort}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={12}>
						{loggedIn ?
							<Button
								variant="contained"
								onClick={() => {
									localStorage.removeItem("mcs_entschuldigung_user");
									this.props.setSaveData(false);
									this.props.setVorname("");
									this.props.setNachname("");
									this.props.setKlasse("");
									this.props.setGebDat("");
								}} sx={{ mt: 3, ml: 1 }}>
								Daten löschen
							</Button>
							:
							<FormControlLabel control={
								<Checkbox
									id="saveData"
									name="saveData"
									onChange={(e, checked) => this.props.setSaveData(checked)}
									value={this.props.saveData ? "checked" : "unchecked"}
								/>} label="Daten für die Zukunft speichern" />
						}
					</Grid>
				</Grid>
			</React.Fragment >
		);
	}
}


export async function validateLogin(props: loginStateType): Promise<string | undefined> {
	if (props.vorname === "")
		return "Bitte den Vornamen angeben";
	else if (props.nachname === "")
		return "Bitte den Nachnamen angeben";
	else if (props.klasse === "")
		return "Bitte die Klasse auswählen";
	else if (props.geb_dat === "")
		return "Bitte das Geburtsdatum angeben";
	else if (props.passwort === "")
		return "Bitte das Passwort eingeben";
	var requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(props)
	};
	return fetch(API_BASE_URL + "/login.php", requestOptions)
		.then(response => response.json()).then(data => {
			if ("error" in data)
				return data.error;
			else {
				if (props.saveData)
					localStorage.setItem("mcs_entschuldigung_user", JSON.stringify({
						vorname: props.vorname,
						nachname: props.nachname,
						klasse: props.klasse,
						geb_dat: props.geb_dat
					}))
				return undefined;
			}
		});

}

const mapStateToProps = (state: RootState) => ({ ...state.login })

const mapDispatchToProps = { ...reducers }

export default connect(mapStateToProps, mapDispatchToProps)(Login)